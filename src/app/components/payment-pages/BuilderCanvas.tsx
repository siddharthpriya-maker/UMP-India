import { useState, useRef, useEffect, useCallback } from "react";
import { ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { BuilderArtboard } from "./BuilderArtboard";
import type { SectionId, StructuredPageState, DevicePreview } from "./builder-types";

interface BuilderCanvasProps {
  pageState: StructuredPageState;
  previewMode: DevicePreview;
  selectedSection: SectionId | null;
  onSelectSection: (id: SectionId | null) => void;
  onFitToScreen: () => void;
}

const MIN_ZOOM = 0.4;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.1;

export function BuilderCanvas({
  pageState,
  previewMode,
  selectedSection,
  onSelectSection,
  onFitToScreen,
}: BuilderCanvasProps) {
  const [zoom, setZoom] = useState(0.85);
  const [isPanning, setIsPanning] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const clampZoom = useCallback((z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z)), []);

  /* Wheel zoom (ctrl/meta + scroll or trackpad pinch) */
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const factor = Math.exp(e.deltaY * -0.008);
      setZoom((prev) => clampZoom(prev * factor));
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [clampZoom]);

  /* Middle-click or space+drag to pan */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      e.preventDefault();
      setIsPanning(true);
      panStart.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
    }
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning) return;
      setPanOffset({
        x: e.clientX - panStart.current.x,
        y: e.clientY - panStart.current.y,
      });
    },
    [isPanning]
  );

  const handleMouseUp = () => setIsPanning(false);

  const handleFitToScreen = () => {
    setZoom(0.85);
    setPanOffset({ x: 0, y: 0 });
    onFitToScreen();
  };

  const handleResetPan = () => setPanOffset({ x: 0, y: 0 });

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      {/* Canvas surface with dot grid */}
      <div
        ref={canvasRef}
        className="flex-1 overflow-hidden"
        style={{
          cursor: isPanning ? "grabbing" : "default",
          backgroundImage: `radial-gradient(circle, #d4d4d4 1px, transparent 1px)`,
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
          backgroundPosition: `${panOffset.x}px ${panOffset.y}px`,
          backgroundColor: "#fafafa",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="flex min-h-full items-start justify-center px-8 py-12"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
            transformOrigin: "top center",
          }}
        >
          <BuilderArtboard
            pageState={pageState}
            previewMode={previewMode}
            selectedSection={selectedSection}
            onSelectSection={onSelectSection}
          />
        </div>
      </div>

      {/* Floating zoom controls */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-[10px] border border-[#e0e0e0] bg-white px-1 py-1 shadow-lg">
        <button
          type="button"
          onClick={() => setZoom((z) => clampZoom(z - ZOOM_STEP))}
          disabled={zoom <= MIN_ZOOM}
          className="flex size-7 items-center justify-center rounded-[6px] text-[#7e7e7e] transition-colors hover:bg-[#f5f5f5] hover:text-[#101010] disabled:opacity-30"
          aria-label="Zoom out"
        >
          <ZoomOut className="size-3.5" />
        </button>
        <span className="min-w-[3.5rem] select-none text-center text-[12px] font-semibold tabular-nums text-[#101010]">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          onClick={() => setZoom((z) => clampZoom(z + ZOOM_STEP))}
          disabled={zoom >= MAX_ZOOM}
          className="flex size-7 items-center justify-center rounded-[6px] text-[#7e7e7e] transition-colors hover:bg-[#f5f5f5] hover:text-[#101010] disabled:opacity-30"
          aria-label="Zoom in"
        >
          <ZoomIn className="size-3.5" />
        </button>
        <div className="mx-0.5 h-4 w-px bg-[#e0e0e0]" />
        <button
          type="button"
          onClick={handleFitToScreen}
          className="flex size-7 items-center justify-center rounded-[6px] text-[#7e7e7e] transition-colors hover:bg-[#f5f5f5] hover:text-[#101010]"
          aria-label="Fit to screen"
          title="Fit to screen"
        >
          <Maximize className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
