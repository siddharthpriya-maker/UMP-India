import { useState, useCallback } from "react";
import { StepWizard } from "./StepWizard";
import { ComponentPalette } from "./ComponentPalette";
import { BuilderCanvas } from "./BuilderCanvas";
import { PropertyPanel } from "./PropertyPanel";
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

  return (
    <div className="flex flex-col h-screen bg-white">
      <StepWizard currentStep={currentStep} />

      <div className="flex-1 flex overflow-hidden">
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

      {/* Footer */}
      <div className="flex items-center gap-5 px-[32px] py-4 border-t border-[#e0e0e0] bg-white">
        <button
          onClick={onBack}
          className="flex items-center justify-center border border-[#004299] text-[#004299] hover:bg-[#e7f1f8] hover:border-[#009de5] hover:text-[#009de5] text-[14px] leading-[20px] font-semibold px-4 py-2.5 min-w-[120px] rounded-[8px] transition-colors"
        >
          Back to Page Info
        </button>
        <button
          onClick={onNext}
          className="flex items-center justify-center bg-[#004299] hover:bg-[#009de5] text-white text-[14px] leading-[20px] font-semibold px-4 py-2.5 min-w-[120px] rounded-[8px] transition-colors flex-1"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}
