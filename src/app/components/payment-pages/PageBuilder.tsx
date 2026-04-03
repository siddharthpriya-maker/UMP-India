import { useState, useCallback } from "react";
import { StepWizard } from "./StepWizard";
import { PageTabsBar } from "./PageTabsBar";
import { ComponentPalette } from "./ComponentPalette";
import { BuilderCanvas } from "./BuilderCanvas";
import { PropertyPanel } from "./PropertyPanel";
import { PageLevelMenu } from "./PageLevelMenu";
import type { BuilderStep, BuilderComponent, BuilderPage, PaletteComponent } from "./types";

interface PageBuilderProps {
  currentStep: BuilderStep;
  onBack: () => void;
  onNext: () => void;
}

let nextId = 1;
function generateId() {
  return `comp_${nextId++}`;
}

export function PageBuilder({ currentStep, onBack, onNext }: PageBuilderProps) {
  const [pages, setPages] = useState<BuilderPage[]>([
    { index: 0, title: "Page 1", components: [] },
  ]);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"web" | "mobile">("web");

  const selectedComponent =
    pages[activePageIndex]?.components.find((c) => c.id === selectedComponentId) || null;

  const handleDropComponent = useCallback(
    (paletteComp: PaletteComponent) => {
      const newComp: BuilderComponent = {
        id: generateId(),
        type: paletteComp.type,
        label: paletteComp.label,
        category: paletteComp.category,
        properties: { ...paletteComp.defaultProperties },
        order: pages[activePageIndex].components.length,
        pageIndex: activePageIndex,
      };
      setPages((prev) =>
        prev.map((p, i) =>
          i === activePageIndex ? { ...p, components: [...p.components, newComp] } : p
        )
      );
      setSelectedComponentId(newComp.id);
    },
    [activePageIndex, pages]
  );

  const handleDeleteComponent = useCallback(
    (id: string) => {
      setPages((prev) =>
        prev.map((p, i) =>
          i === activePageIndex
            ? { ...p, components: p.components.filter((c) => c.id !== id) }
            : p
        )
      );
      if (selectedComponentId === id) setSelectedComponentId(null);
    },
    [activePageIndex, selectedComponentId]
  );

  const handleReorderComponent = useCallback(
    (id: string, newOrder: number) => {
      setPages((prev) =>
        prev.map((p, i) => {
          if (i !== activePageIndex) return p;
          return {
            ...p,
            components: p.components.map((c) =>
              c.id === id ? { ...c, order: newOrder } : c
            ),
          };
        })
      );
    },
    [activePageIndex]
  );

  const handleUpdateProperty = useCallback(
    (componentId: string, key: string, value: unknown) => {
      setPages((prev) =>
        prev.map((p, i) => {
          if (i !== activePageIndex) return p;
          return {
            ...p,
            components: p.components.map((c) =>
              c.id === componentId
                ? { ...c, properties: { ...c.properties, [key]: value } }
                : c
            ),
          };
        })
      );
    },
    [activePageIndex]
  );

  const handleAddPage = () => {
    const newPage: BuilderPage = {
      index: pages.length,
      title: `Page ${pages.length + 1}`,
      components: [],
    };
    setPages((prev) => [...prev, newPage]);
    setActivePageIndex(pages.length);
    setSelectedComponentId(null);
  };

  const handleDeletePage = useCallback(
    (idx: number) => {
      if (pages.length <= 1) return;
      setPages((prev) => {
        const next = prev.filter((_, i) => i !== idx);
        return next.map((p, i) => ({ ...p, index: i }));
      });
      if (activePageIndex >= pages.length - 1) {
        setActivePageIndex(Math.max(0, pages.length - 2));
      } else if (idx < activePageIndex) {
        setActivePageIndex((i) => i - 1);
      }
      setSelectedComponentId(null);
    },
    [activePageIndex, pages.length]
  );

  const handleRenamePage = useCallback((idx: number, title: string) => {
    setPages((prev) => prev.map((p, i) => (i === idx ? { ...p, title } : p)));
  }, []);

  const handleClearAll = useCallback(() => {
    setPages((prev) => prev.map((p) => ({ ...p, components: [] })));
    setSelectedComponentId(null);
  }, []);

  const activeComponentCount = pages[activePageIndex]?.components.length ?? 0;
  const totalComponentCount = pages.reduce((n, p) => n + p.components.length, 0);
  const builderAssistiveText =
    activeComponentCount === 0
      ? "no components added to the page"
      : `${activeComponentCount} component${activeComponentCount === 1 ? "" : "s"} added to the page`;

  const usedComponents = pages[activePageIndex]?.components ?? [];

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      {/* Frame 1: Step Wizard */}
      <StepWizard currentStep={currentStep} />

      {/* Frame 2: Builder workspace */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {/* Browser-style page tabs */}
        <PageTabsBar
          pages={pages}
          activePageIndex={activePageIndex}
          onSwitchPage={(idx) => {
            setActivePageIndex(idx);
            setSelectedComponentId(null);
          }}
          onAddPage={handleAddPage}
          onDeletePage={handleDeletePage}
          onRenamePage={handleRenamePage}
        />

        {/* Three-panel layout */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Left: component menu */}
          <ComponentPalette
            onDragStart={() => {}}
            usedComponents={usedComponents}
          />

          {/* Center: canvas */}
          <BuilderCanvas
            sortedComponents={[...(pages[activePageIndex]?.components || [])].sort(
              (a, b) => a.order - b.order
            )}
            selectedComponentId={selectedComponentId}
            onSelectComponent={setSelectedComponentId}
            onDropComponent={handleDropComponent}
            onDeleteComponent={handleDeleteComponent}
            onReorderComponent={handleReorderComponent}
            onUpdateProperty={handleUpdateProperty}
            previewMode={previewMode}
          />

          {/* Right: customization + preview + properties */}
          <PropertyPanel
            component={selectedComponent}
            onClose={() => setSelectedComponentId(null)}
            onUpdateProperty={handleUpdateProperty}
            previewMode={previewMode}
            onPreviewModeChange={setPreviewMode}
          />
        </div>
      </div>

      <PageLevelMenu
        assistiveText={builderAssistiveText}
        onClearAll={handleClearAll}
        clearAllDisabled={totalComponentCount === 0}
        secondaryLabel="Back to Page Info"
        onSecondary={onBack}
        primaryLabel="Save & Continue"
        onPrimary={onNext}
        ariaLabel="Page builder actions"
      />
    </div>
  );
}
