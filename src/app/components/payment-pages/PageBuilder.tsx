import { useState, useCallback, useEffect, useRef } from "react";
import { StepWizard } from "./StepWizard";
import { BuilderTopBar } from "./BuilderTopBar";
import { SectionComponentLibrary } from "./SectionComponentLibrary";
import { BuilderCanvas } from "./BuilderCanvas";
import { PropertyPanel } from "./PropertyPanel";
import { GuidedOverlay } from "./GuidedOverlay";
import type {
  SectionId,
  StructuredPageState,
  DevicePreview,
  SectionComponentDef,
  BrandingData,
  ProductData,
  CustomerData,
  CTAData,
  CustomerField,
  ProductItem,
} from "./builder-types";
import {
  DEFAULT_PAGE_STATE,
  SECTION_ORDER,
  isSectionComplete,
  isPageValid,
} from "./builder-types";
import type { BuilderStep } from "./types";

interface PageBuilderProps {
  currentStep: BuilderStep;
  onBack: () => void;
  onNext: () => void;
}

export function PageBuilder({ currentStep, onBack, onNext }: PageBuilderProps) {
  const [pageState, setPageState] = useState<StructuredPageState>(DEFAULT_PAGE_STATE);
  const [selectedSection, setSelectedSection] = useState<SectionId | null>(null);
  const [previewMode, setPreviewMode] = useState<DevicePreview>("desktop");
  const [showGuide, setShowGuide] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [pageTitle, setPageTitle] = useState("Untitled Payment Page");

  const autosaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  /* Determine guide progress */
  const firstIncomplete = SECTION_ORDER.find((s) => !isSectionComplete(s, pageState));
  const currentGuideSection: SectionId = firstIncomplete ?? "cta";
  const valid = isPageValid(pageState);

  /* Autosave draft (debounced) */
  useEffect(() => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      // In production: persist to API
    }, 2000);
    return () => { if (autosaveTimer.current) clearTimeout(autosaveTimer.current); };
  }, [pageState]);

  /* State updater */
  const updatePageState = useCallback((patch: Partial<StructuredPageState>) => {
    setPageState((prev) => ({ ...prev, ...patch }));
  }, []);

  /* Handle adding a component from the left panel */
  const handleAddComponent = useCallback((def: SectionComponentDef) => {
    setSelectedSection(def.section);

    setPageState((prev) => {
      const next = { ...prev };
      switch (def.section) {
        case "branding":
          if (def.id === "logo" && !prev.branding.logo) next.branding = { ...prev.branding };
          if (def.id === "brand_video") next.branding = { ...prev.branding, videoUrl: prev.branding.videoUrl || "https://" };
          break;
        case "product":
          if (def.id === "item_card") {
            const id = `item_${Date.now()}`;
            next.product = {
              ...prev.product,
              items: [...prev.product.items, { id, image: "", title: "", description: "", price: 0, enableQuantity: false, quantity: 1 }],
            };
          }
          if (def.id === "donation_goal") {
            next.product = { ...prev.product, showDonationGoal: true, pricingType: "donation" };
          }
          break;
        case "customer": {
          const fieldId = `f_${Date.now()}`;
          const fieldTypeMap: Record<string, string> = {
            text_field: "text",
            email_field: "email",
            phone_field: "phone",
            address_field: "text",
            textarea_field: "textarea",
            select_field: "select",
          };
          const ft = fieldTypeMap[def.id] || "text";
          next.customer = {
            ...prev.customer,
            fields: [
              ...prev.customer.fields,
              {
                id: fieldId,
                label: def.label,
                fieldType: ft as CustomerField["fieldType"],
                required: false,
                placeholder: "",
                colSpan: def.id === "address_field" || def.id === "textarea_field" ? 2 : 1,
                isDefault: false,
              },
            ],
          };
          break;
        }
        case "cta":
          break;
      }
      return next;
    });
  }, []);

  const handleSaveDraft = useCallback(() => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1200);
  }, []);

  const handleContinue = useCallback(() => {
    if (valid) onNext();
  }, [valid, onNext]);

  const handleGuideSelectSection = useCallback((id: SectionId) => {
    setSelectedSection(id);
    setShowGuide(false);
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#fafafa]">
      {/* Step wizard */}
      <StepWizard currentStep={currentStep} />

      {/* Builder workspace */}
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <BuilderTopBar
          title={pageTitle}
          onTitleChange={setPageTitle}
          previewMode={previewMode}
          onPreviewModeChange={setPreviewMode}
          onSaveDraft={handleSaveDraft}
          onContinue={handleContinue}
          onPreview={() => {}}
          onFitToScreen={() => {}}
          continueDisabled={!valid}
          isSaving={isSaving}
        />

        {/* Three-panel layout */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Left: section-aware component library */}
          <SectionComponentLibrary
            selectedSection={selectedSection}
            onSelectSection={setSelectedSection}
            onAddComponent={handleAddComponent}
          />

          {/* Center: dotted canvas with artboard */}
          <BuilderCanvas
            pageState={pageState}
            previewMode={previewMode}
            selectedSection={selectedSection}
            onSelectSection={setSelectedSection}
            onFitToScreen={() => {}}
          />

          {/* Right: contextual property panel */}
          <PropertyPanel
            selectedSection={selectedSection}
            pageState={pageState}
            onUpdate={updatePageState}
          />
        </div>

        {/* Guided overlay */}
        {showGuide && (
          <GuidedOverlay
            pageState={pageState}
            currentGuideSection={currentGuideSection}
            onSelectSection={handleGuideSelectSection}
            onDismiss={() => setShowGuide(false)}
          />
        )}
      </div>
    </div>
  );
}
