import type { SectionId, StructuredPageState, DevicePreview } from "./builder-types";
import { SECTION_ORDER } from "./builder-types";
import { BrandingSection } from "./BrandingSection";
import { ProductSection } from "./ProductSection";
import { CustomerDetailsSection } from "./CustomerDetailsSection";
import { CTASection } from "./CTASection";

interface BuilderArtboardProps {
  pageState: StructuredPageState;
  previewMode: DevicePreview;
  selectedSection: SectionId | null;
  onSelectSection: (id: SectionId | null) => void;
}

export function BuilderArtboard({
  pageState,
  previewMode,
  selectedSection,
  onSelectSection,
}: BuilderArtboardProps) {
  const isMobile = previewMode === "mobile";
  const artboardWidth = isMobile ? "max-w-[390px]" : "max-w-[520px]";

  return (
    <div
      className={`mx-auto w-full ${artboardWidth} transition-[max-width] duration-300`}
      onClick={(e) => { e.stopPropagation(); onSelectSection(null); }}
    >
      {/* Artboard card */}
      <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)]">
        {/* Browser chrome bar */}
        <div className="flex h-[32px] items-center gap-1.5 bg-[#f5f5f5] px-3">
          <div className="size-[10px] rounded-full bg-[#ff5f57]" />
          <div className="size-[10px] rounded-full bg-[#ffbd2e]" />
          <div className="size-[10px] rounded-full bg-[#28ca41]" />
          <div className="mx-auto max-w-[200px] flex-1">
            <div className="mx-auto h-[16px] w-full rounded-[4px] bg-white/70" />
          </div>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-1 p-1.5">
          {SECTION_ORDER.map((sectionId) => (
            <SectionRenderer
              key={sectionId}
              sectionId={sectionId}
              pageState={pageState}
              previewMode={previewMode}
              isSelected={selectedSection === sectionId}
              onSelect={() => onSelectSection(sectionId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionRenderer({
  sectionId,
  pageState,
  previewMode,
  isSelected,
  onSelect,
}: {
  sectionId: SectionId;
  pageState: StructuredPageState;
  previewMode: DevicePreview;
  isSelected: boolean;
  onSelect: () => void;
}) {
  switch (sectionId) {
    case "branding":
      return (
        <BrandingSection
          data={pageState.branding}
          customization={pageState.customization}
          previewMode={previewMode}
          isSelected={isSelected}
          onSelect={onSelect}
        />
      );
    case "product":
      return (
        <ProductSection
          data={pageState.product}
          customization={pageState.customization}
          previewMode={previewMode}
          isSelected={isSelected}
          onSelect={onSelect}
        />
      );
    case "customer":
      return (
        <CustomerDetailsSection
          data={pageState.customer}
          customization={pageState.customization}
          previewMode={previewMode}
          isSelected={isSelected}
          onSelect={onSelect}
        />
      );
    case "cta":
      return (
        <CTASection
          data={pageState.cta}
          productData={pageState.product}
          customization={pageState.customization}
          previewMode={previewMode}
          isSelected={isSelected}
          onSelect={onSelect}
        />
      );
  }
}
