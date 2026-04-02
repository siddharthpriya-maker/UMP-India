import { useState, useRef, useEffect, useCallback } from "react";
import {
  Plus,
  Trash2,
  GripVertical,
  Palette,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { BuilderComponent, BuilderPage, PaletteComponent } from "./types";

interface BuilderCanvasProps {
  pages: BuilderPage[];
  activePageIndex: number;
  selectedComponentId: string | null;
  onSelectComponent: (id: string | null) => void;
  onAddPage: () => void;
  onSwitchPage: (index: number) => void;
  onDropComponent: (component: PaletteComponent) => void;
  onDeleteComponent: (id: string) => void;
  onReorderComponent: (id: string, newOrder: number) => void;
  onOpenCustomization: () => void;
  onUpdateProperty?: (componentId: string, key: string, value: unknown) => void;
}

export function BuilderCanvas({
  pages,
  activePageIndex,
  selectedComponentId,
  onSelectComponent,
  onAddPage,
  onSwitchPage,
  onDropComponent,
  onDeleteComponent,
  onReorderComponent,
  onOpenCustomization,
  onUpdateProperty,
}: BuilderCanvasProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const canvasScrollRef = useRef<HTMLDivElement>(null);

  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 2;

  const clampZoom = useCallback((z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z)), []);

  const handleWheelZoom = useCallback(
    (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const factor = Math.exp(e.deltaY * 0.01);
      setZoom((prev) => clampZoom(prev / factor));
    },
    [clampZoom]
  );

  useEffect(() => {
    const el = canvasScrollRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheelZoom, { passive: false });
    return () => el.removeEventListener("wheel", handleWheelZoom);
  }, [handleWheelZoom]);

  const activePage = pages[activePageIndex];
  const sortedComponents = [...(activePage?.components || [])].sort(
    (a, b) => a.order - b.order
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setDragOverIndex(null);
    const data = e.dataTransfer.getData("component");
    if (data) {
      try {
        const comp = JSON.parse(data) as PaletteComponent;
        onDropComponent(comp);
      } catch {}
    }
  };

  const handleComponentDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverIndex(index);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#fafafa]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#e0e0e0]">
        <div className="flex items-center gap-2">
          {pages.map((page, idx) => (
            <button
              key={idx}
              onClick={() => onSwitchPage(idx)}
              className={`px-3 py-1.5 rounded-[8px] text-[13px] font-semibold transition-colors ${
                idx === activePageIndex
                  ? "bg-[#004299] text-white"
                  : "bg-[#f5f9fe] text-[#101010] hover:bg-[#e0e0e0]"
              }`}
            >
              {page.title}
            </button>
          ))}
          <button
            onClick={onAddPage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-[8px] text-[13px] text-[#004299] hover:bg-[#f5f9fe] transition-colors"
          >
            <Plus className="size-3.5" />
            Add Page
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1 rounded-[8px] border border-[#e0e0e0] bg-[#fafafa] px-1 py-0.5"
            title="Pinch on trackpad or ⌃ + scroll to zoom"
          >
            <button
              type="button"
              onClick={() => setZoom((z) => clampZoom(z - 0.1))}
              disabled={zoom <= MIN_ZOOM}
              className="flex size-8 items-center justify-center rounded-[6px] text-[#004299] hover:bg-white disabled:pointer-events-none disabled:opacity-40"
              aria-label="Zoom out"
            >
              <ZoomOut className="size-4" />
            </button>
            <span className="min-w-[3rem] text-center text-[12px] font-semibold tabular-nums text-[#101010]">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => clampZoom(z + 0.1))}
              disabled={zoom >= MAX_ZOOM}
              className="flex size-8 items-center justify-center rounded-[6px] text-[#004299] hover:bg-white disabled:pointer-events-none disabled:opacity-40"
              aria-label="Zoom in"
            >
              <ZoomIn className="size-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setZoom(1)}
            className="text-[12px] font-semibold text-[#004299] hover:underline px-1"
          >
            Reset
          </button>
          <button
            onClick={onOpenCustomization}
            className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] text-[13px] text-[#004299] border border-[#004299] hover:bg-[#e7f1f8] transition-colors"
          >
            <Palette className="size-3.5" />
            Customise
          </button>
        </div>
      </div>

      {/* Canvas area — pinch / ⌃+scroll zoom; overflow both axes when zoomed */}
      <div ref={canvasScrollRef} className="flex-1 overflow-auto p-6">
        <div
          className="mx-auto w-full max-w-[600px] origin-top"
          style={{ zoom } as React.CSSProperties}
        >
        <div
          className={`min-h-[500px] rounded-[12px] border-2 transition-colors p-6 flex flex-col gap-3 ${
            isDragOver
              ? "border-[#004299] bg-[#f5f9fe]"
              : "border-dashed border-[#e0e0e0] bg-white"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => onSelectComponent(null)}
        >
          {/* Form header preview */}
          <div className="flex flex-col gap-2 pb-4 border-b border-[#e0e0e0]">
            <div className="w-[80px] h-[28px] bg-[#e0e0e0] rounded-[4px]" />
            <div className="w-[200px] h-[20px] bg-[#e0e0e0] rounded-[4px]" />
          </div>

          {/* Components */}
          {sortedComponents.map((comp, idx) => (
            <div
              key={comp.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent(comp.id);
              }}
              onDragOver={(e) => handleComponentDragOver(e, idx)}
              className={`group relative flex items-start gap-2 p-3 rounded-[8px] border transition-colors ${
                selectedComponentId === comp.id
                  ? "border-[#004299] bg-[#f5f9fe]"
                  : "border-transparent hover:border-[#e0e0e0] hover:bg-[#fafafa]"
              } ${dragOverIndex === idx ? "border-t-2 border-t-[#004299]" : ""}`}
            >
              <GripVertical className="size-4 text-[#e0e0e0] mt-1 shrink-0 opacity-0 group-hover:opacity-100 cursor-grab transition-opacity" />
              <div className="flex-1">
                <ComponentPreview component={comp} onUpdateProperty={onUpdateProperty} />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteComponent(comp.id);
                }}
                className="size-6 flex items-center justify-center rounded-[4px] text-[#fd5154] opacity-0 group-hover:opacity-100 hover:bg-[#ffebef] transition-all shrink-0"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}

          {sortedComponents.length === 0 && !isDragOver && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="size-12 rounded-full bg-[#f5f9fe] flex items-center justify-center">
                <Plus className="size-6 text-[#7e7e7e]" />
              </div>
              <p className="text-[14px] text-[#7e7e7e]">
                Drag components from the left panel to start building your page.
              </p>
            </div>
          )}

          {isDragOver && sortedComponents.length === 0 && (
            <div className="flex-1 flex items-center justify-center py-16">
              <p className="text-[14px] text-[#004299] font-semibold">Drop component here</p>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

interface ComponentPreviewProps {
  component: BuilderComponent;
  onUpdateProperty?: (componentId: string, key: string, value: unknown) => void;
}

function ComponentPreview({ component, onUpdateProperty }: ComponentPreviewProps) {
  const label = (component.properties.label as string) || component.label;

  switch (component.category) {
    case "layout":
      return <div className="h-[1px] bg-[#e0e0e0] w-full my-2" />;
    case "display":
      if (component.type === "cover_image")
        return (
          <CoverImagePreview
            src={(component.properties.src as string) || ""}
            onChangeSrc={(src) => onUpdateProperty?.(component.id, "src", src)}
          />
        );
      if (component.type === "image")
        return (
          <div className="w-full h-[80px] bg-[#fafafa] border border-dashed border-[#e0e0e0] rounded-[8px] flex items-center justify-center text-[12px] text-[#7e7e7e]">
            Image placeholder
          </div>
        );
      if (component.type === "video")
        return (
          <div className="w-full h-[80px] bg-[#fafafa] border border-dashed border-[#e0e0e0] rounded-[8px] flex items-center justify-center text-[12px] text-[#7e7e7e]">
            Video embed
          </div>
        );
      if (component.type === "goal_progress")
        return (
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-[#7e7e7e]">{label}</span>
            <div className="h-[8px] bg-[#e0e0e0] rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-[#21c179] rounded-full" />
            </div>
          </div>
        );
      return (
        <div className="p-3 bg-[#fafafa] rounded-[8px] text-[12px] text-[#7e7e7e]">
          {label}
        </div>
      );
    case "choices":
      if (component.type === "dropdown")
        return (
          <div className="h-[56px] border border-[#e0e0e0] rounded-[4px] px-4 flex items-center">
            <span className="text-[14px] font-semibold text-[#7e7e7e]">{label}</span>
          </div>
        );
      if (component.type === "radio_group") {
        const opts = (component.properties.options as string[]) || ["Option 1", "Option 2"];
        return (
          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] font-semibold text-[#101010]">{label}</span>
            <div className="flex flex-col gap-1">
              {opts.map((o, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="size-4 rounded-full border-2 border-[#e0e0e0]" />
                  <span className="text-[13px] text-[#101010]">{o}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }
      if (component.type === "checkbox" || component.type === "consent")
        return (
          <div className="flex items-center gap-2">
            <div className="size-4 rounded-[3px] border-2 border-[#e0e0e0]" />
            <span className="text-[13px] text-[#101010]">{label}</span>
          </div>
        );
      return <InputPreview label={label} />;
    case "pricing":
      return (
        <div className="h-[56px] border border-[#e0e0e0] rounded-[4px] px-4 flex items-center">
          <span className="text-[14px] font-semibold text-[#7e7e7e]">{label}</span>
        </div>
      );
    default:
      return <InputPreview label={label} />;
  }
}

function InputPreview({ label }: { label: string }) {
  return (
    <div className="h-[56px] border border-[#e0e0e0] rounded-[4px] px-4 flex items-center">
      <span className="text-[14px] font-semibold text-[#7e7e7e]">{label}</span>
    </div>
  );
}

function CoverImagePreview({
  src,
  onChangeSrc,
}: {
  src: string;
  onChangeSrc: (dataUrl: string) => void;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => onChangeSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (src) {
    return (
      <div className="relative w-full h-[160px] rounded-[8px] overflow-hidden border border-[#e0e0e0]">
        <img src={src} alt="Cover" className="w-full h-full object-cover" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChangeSrc("");
          }}
          className="absolute top-2 right-2 size-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#fafafa] transition-colors"
        >
          <X className="size-4 text-[#101010]" />
        </button>
      </div>
    );
  }

  return (
    <label
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col items-center justify-center gap-2 w-full h-[120px] border-2 border-dashed border-[#e0e0e0] rounded-[8px] cursor-pointer hover:border-[#004299] hover:bg-[#f5f9fe] transition-colors"
    >
      <Upload className="size-6 text-[#7e7e7e]" />
      <span className="text-[14px] text-[#7e7e7e]">Click to upload cover image</span>
      <span className="text-[12px] text-[#7e7e7e]">PNG, JPG up to 5MB</span>
      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
    </label>
  );
}
