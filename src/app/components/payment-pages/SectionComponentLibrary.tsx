import { useState } from "react";
import {
  Image, Type, AlignLeft, Video, Package, CreditCard,
  Heart, Target, Phone, Mail, MapPin, ChevronDown, MousePointer,
  Receipt, Plus, ContactRound,
} from "lucide-react";
import type { SectionId, SectionComponentDef, BrandingData, ProductData } from "./builder-types";
import { SECTION_COMPONENTS, SECTION_META, SECTION_ORDER } from "./builder-types";

const iconMap: Record<string, typeof Type> = {
  image: Image,
  type: Type,
  "align-left": AlignLeft,
  video: Video,
  package: Package,
  "credit-card": CreditCard,
  heart: Heart,
  target: Target,
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
  "chevron-down": ChevronDown,
  "mouse-pointer": MousePointer,
  receipt: Receipt,
  "contact-round": ContactRound,
};

const BRANDING_TOGGLE_MAP: Record<string, keyof Pick<BrandingData, "coverEnabled" | "logoEnabled" | "descriptionEnabled" | "businessDetailsEnabled" | "videoEnabled">> = {
  cover_image: "coverEnabled",
  logo: "logoEnabled",
  brand_description: "descriptionEnabled",
  business_details: "businessDetailsEnabled",
  brand_video: "videoEnabled",
};

const PRODUCT_TOGGLE_MAP: Record<string, keyof Pick<ProductData, "itemCardEnabled" | "pricingPlanEnabled" | "donationAmountEnabled" | "donationGoalEnabled">> = {
  item_card: "itemCardEnabled",
  pricing_plan: "pricingPlanEnabled",
  donation_amount: "donationAmountEnabled",
  donation_goal: "donationGoalEnabled",
};

interface SectionComponentLibraryProps {
  selectedSection: SectionId | null;
  onSelectSection: (id: SectionId) => void;
  onAddComponent: (componentDef: SectionComponentDef) => void;
  brandingData?: BrandingData;
  onBrandingToggle?: (field: keyof BrandingData, value: boolean) => void;
  productData?: ProductData;
  onProductToggle?: (field: keyof ProductData, value: boolean) => void;
}

export function SectionComponentLibrary({
  selectedSection,
  onSelectSection,
  onAddComponent,
  brandingData,
  onBrandingToggle,
  productData,
  onProductToggle,
}: SectionComponentLibraryProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCollapse = (key: string) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  const grouped = SECTION_ORDER.reduce<Record<SectionId, SectionComponentDef[]>>((acc, s) => {
    acc[s] = SECTION_COMPONENTS.filter((c) => c.section === s);
    return acc;
  }, {} as Record<SectionId, SectionComponentDef[]>);

  return (
    <div className="flex w-[260px] shrink-0 flex-col overflow-hidden border-r border-[#e0e0e0] bg-white">
      {/* Header */}
      <div className="shrink-0 border-b border-[#e0e0e0] px-4 pb-3 pt-4">
        <h3 className="text-[13px] font-semibold text-[#101010]">Components</h3>
        <p className="text-[11px] text-[#acacac]">
          Toggle or add components to your page
        </p>
      </div>

      {/* Component list — all sections as accordion */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {SECTION_ORDER.map((sectionId) => {
          const items = grouped[sectionId];
          if (!items || items.length === 0) return null;
          const isCollapsed = collapsed[sectionId];
          const isBranding = sectionId === "branding";
          const isProduct = sectionId === "product";

          return (
            <div key={sectionId} className="mb-1">
              <button
                onClick={() => toggleCollapse(sectionId)}
                className="flex w-full items-center justify-between px-1 py-2"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#acacac]">
                  {SECTION_META[sectionId].label}
                </span>
                <ChevronDown
                  className={`size-3.5 text-[#ccc] transition-transform ${isCollapsed ? "-rotate-90" : ""}`}
                />
              </button>
              {!isCollapsed && (
                <div className="flex flex-col gap-0.5">
                  {items.map((comp) => {
                    const Icon = iconMap[comp.icon] || Type;

                    if (isBranding) {
                      return (
                        <BrandingToggleRow
                          key={comp.id}
                          comp={comp}
                          Icon={Icon}
                          brandingData={brandingData}
                          onBrandingToggle={onBrandingToggle}
                        />
                      );
                    }

                    if (isProduct) {
                      return (
                        <ProductToggleRow
                          key={comp.id}
                          comp={comp}
                          Icon={Icon}
                          productData={productData}
                          onProductToggle={onProductToggle}
                        />
                      );
                    }

                    return (
                      <button
                        key={comp.id}
                        type="button"
                        onClick={() => onAddComponent(comp)}
                        className="flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-left transition-colors hover:bg-[#f5f9fe]"
                      >
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-[6px] bg-[#f5f5f5]">
                          <Icon className="size-3.5 text-[#7e7e7e]" />
                        </div>
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate text-[12px] font-medium text-[#101010]">
                            {comp.label}
                          </span>
                          <span className="truncate text-[10px] text-[#acacac]">
                            {comp.description}
                          </span>
                        </div>
                        <Plus className="ml-auto size-3.5 shrink-0 text-[#ccc]" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BrandingToggleRow({
  comp,
  Icon,
  brandingData,
  onBrandingToggle,
}: {
  comp: SectionComponentDef;
  Icon: typeof Type;
  brandingData?: BrandingData;
  onBrandingToggle?: (field: keyof BrandingData, value: boolean) => void;
}) {
  const toggleKey = BRANDING_TOGGLE_MAP[comp.id];
  const isBusinessName = comp.id === "business_name";
  const isEnabled = isBusinessName
    ? true
    : toggleKey && brandingData
      ? (brandingData[toggleKey] as boolean)
      : true;

  return (
    <div className="flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 transition-colors hover:bg-[#f5f9fe]">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-[6px] bg-[#f5f5f5]">
        <Icon className="size-3.5 text-[#7e7e7e]" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className={`truncate text-[12px] font-medium ${isBusinessName ? "text-[#acacac]" : "text-[#101010]"}`}>
          {comp.label}
        </span>
      </div>
      <button
        type="button"
        disabled={isBusinessName}
        onClick={() => {
          if (toggleKey && onBrandingToggle) {
            onBrandingToggle(toggleKey, !isEnabled);
          }
        }}
        className={`relative h-[18px] w-[32px] shrink-0 rounded-full transition-colors ${
          isBusinessName
            ? "bg-[#004299]/50 cursor-not-allowed"
            : isEnabled
              ? "bg-[#004299]"
              : "bg-[#e0e0e0]"
        }`}
      >
        <div
          className={`absolute top-[2px] size-[14px] rounded-full bg-white shadow-sm transition-transform ${
            isEnabled ? "translate-x-[16px]" : "translate-x-[2px]"
          }`}
        />
      </button>
    </div>
  );
}

function ProductToggleRow({
  comp,
  Icon,
  productData,
  onProductToggle,
}: {
  comp: SectionComponentDef;
  Icon: typeof Type;
  productData?: ProductData;
  onProductToggle?: (field: keyof ProductData, value: boolean) => void;
}) {
  const toggleKey = PRODUCT_TOGGLE_MAP[comp.id];
  const isEnabled = toggleKey && productData
    ? (productData[toggleKey] as boolean)
    : false;

  return (
    <div className="flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 transition-colors hover:bg-[#f5f9fe]">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-[6px] bg-[#f5f5f5]">
        <Icon className="size-3.5 text-[#7e7e7e]" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[12px] font-medium text-[#101010]">
          {comp.label}
        </span>
      </div>
      <button
        type="button"
        onClick={() => {
          if (toggleKey && onProductToggle) {
            onProductToggle(toggleKey, !isEnabled);
          }
        }}
        className={`relative h-[18px] w-[32px] shrink-0 rounded-full transition-colors ${
          isEnabled ? "bg-[#004299]" : "bg-[#e0e0e0]"
        }`}
      >
        <div
          className={`absolute top-[2px] size-[14px] rounded-full bg-white shadow-sm transition-transform ${
            isEnabled ? "translate-x-[16px]" : "translate-x-[2px]"
          }`}
        />
      </button>
    </div>
  );
}
