import { useState, useCallback } from "react";
import { StepWizard } from "./StepWizard";
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
  const [showCustomization, setShowCustomization] = useState(false);

  const selectedComponent = pages[activePageIndex]?.components.find(
    (c) => c.id === selectedComponentId
  ) || null;

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
          i === activePageIndex
            ? { ...p, components: [...p.components, newComp] }
            : p
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

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <StepWizard currentStep={currentStep} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <ComponentPalette onDragStart={() => {}} />

        <BuilderCanvas
          pages={pages}
          activePageIndex={activePageIndex}
          selectedComponentId={selectedComponentId}
          onSelectComponent={setSelectedComponentId}
          onAddPage={handleAddPage}
          onSwitchPage={(idx) => {
            setActivePageIndex(idx);
            setSelectedComponentId(null);
          }}
          onDropComponent={handleDropComponent}
          onDeleteComponent={handleDeleteComponent}
          onReorderComponent={handleReorderComponent}
          onOpenCustomization={() => setShowCustomization(!showCustomization)}
          onUpdateProperty={handleUpdateProperty}
        />

        <PropertyPanel
          component={selectedComponent}
          onClose={() => setSelectedComponentId(null)}
          onUpdateProperty={handleUpdateProperty}
        />
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
