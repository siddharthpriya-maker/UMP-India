import { useState, useCallback, useEffect, useRef } from "react";
import { StepWizard } from "./StepWizard";
import { WizardStepHeader } from "./WizardStepHeader";
import { BuilderTopBar } from "./BuilderTopBar";
import { SectionComponentLibrary } from "./SectionComponentLibrary";
import { BuilderCanvas } from "./BuilderCanvas";
import { PropertyPanel } from "./PropertyPanel";
import { GuidedOverlay } from "./GuidedOverlay";
import { PageLevelMenu } from "./PageLevelMenu";
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
} from "./builder-types";
import {
  DEFAULT_PAGE_STATE,
  SECTION_ORDER,
  isSectionComplete,
  isPageValid,
  getProductDefaultsForCategory,
} from "./builder-types";
import type { BuilderStep } from "./types";

interface PageBuilderProps {
  currentStep: BuilderStep;
  onNext: () => void;
  onStepSelect?: (step: BuilderStep) => void;
  pageName?: string;
  pageCategory?: string;
  businessEmail?: string;
  businessPhone?: string;
}

export function PageBuilder({ currentStep, onNext, onStepSelect, pageName, pageCategory, businessEmail, businessPhone }: PageBuilderProps) {
  const [pageState, setPageState] = useState<StructuredPageState>(() => {
    const state = { ...DEFAULT_PAGE_STATE };
    if (pageCategory) {
      const productDefaults = getProductDefaultsForCategory(pageCategory);
      state.product = { ...state.product, ...productDefaults };
    }
    if (businessEmail || businessPhone) {
      state.branding = {
        ...state.branding,
        businessEmail: businessEmail || "",
        businessPhone: businessPhone || "",
      };
    }
    return state;
  });
  const [selectedSection, setSelectedSection] = useState<SectionId | null>(null);
  const [previewMode, setPreviewMode] = useState<DevicePreview>("desktop");
  const [showGuide, setShowGuide] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [pageTitle, setPageTitle] = useState(pageName || "Untitled Payment Page");

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

  /* State updater — item card is always enabled for the product section */
  const updatePageState = useCallback((patch: Partial<StructuredPageState>) => {
    setPageState((prev) => {
      const next = { ...prev, ...patch };
      if (patch.product !== undefined) {
        next.product = { ...prev.product, ...patch.product, itemCardEnabled: true };
      }
      return next;
    });
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
              items: [
                ...prev.product.items,
                {
                  id,
                  image: "",
                  title: "",
                  description: "",
                  price: 0,
                  enableQuantity: false,
                  quantity: 1,
                  addons: [],
                },
              ],
            };
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

  const handleClearAll = useCallback(() => {
    setPageState(() => {
      const state = { ...DEFAULT_PAGE_STATE };
      if (pageCategory) {
        state.product = { ...state.product, ...getProductDefaultsForCategory(pageCategory) };
      }
      if (businessEmail || businessPhone) {
        state.branding = {
          ...state.branding,
          businessEmail: businessEmail || "",
          businessPhone: businessPhone || "",
        };
      }
      return state;
    });
    setSelectedSection(null);
  }, [pageCategory, businessEmail, businessPhone]);

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
    <div className="flex min-h-0 flex-1 flex-col bg-[#fafafa]">
      <div className="shrink-0 bg-white">
        <StepWizard currentStep={currentStep} onStepSelect={onStepSelect} />
        <WizardStepHeader
          title="Page builder"
          description="Add sections, set up products, and customise how your payment page looks and reads for customers."
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <BuilderTopBar
            title={pageTitle}
            onTitleChange={setPageTitle}
            previewMode={previewMode}
            onPreviewModeChange={setPreviewMode}
            onPreview={() => {}}
          />

          <div className="flex min-h-0 flex-1 overflow-hidden">
            <SectionComponentLibrary
              selectedSection={selectedSection}
              onSelectSection={setSelectedSection}
              onAddComponent={handleAddComponent}
              brandingData={pageState.branding}
              onBrandingToggle={(field, value) => {
                setPageState((prev) => ({
                  ...prev,
                  branding: { ...prev.branding, [field]: value },
                }));
              }}
              productData={pageState.product}
              onProductToggle={(field, value) => {
                if (field === "itemCardEnabled" && value === false) return;
                setPageState((prev) => ({
                  ...prev,
                  product: { ...prev.product, [field]: value },
                }));
              }}
            />

            <BuilderCanvas
              pageState={pageState}
              previewMode={previewMode}
              selectedSection={selectedSection}
              onSelectSection={setSelectedSection}
              onFitToScreen={() => {}}
            />

            <PropertyPanel
              selectedSection={selectedSection}
              pageState={pageState}
              onUpdate={updatePageState}
            />
          </div>

          {showGuide && (
            <GuidedOverlay
              pageState={pageState}
              currentGuideSection={currentGuideSection}
              onSelectSection={handleGuideSelectSection}
              onDismiss={() => setShowGuide(false)}
            />
          )}
        </div>

        <PageLevelMenu
          assistiveText="Draft saves automatically while you edit. Finish all sections to continue."
          onClearAll={handleClearAll}
          midAction={{
            label: isSaving ? "Saving…" : "Save as draft",
            onClick: handleSaveDraft,
            disabled: isSaving,
          }}
          primaryLabel="Continue"
          onPrimary={handleContinue}
          primaryDisabled={!valid}
          ariaLabel="Page builder actions"
        />
      </div>
    </div>
  );
}
