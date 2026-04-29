/* ─── Structured Payment Page Builder Types ───────────────────────────────── */

export type DevicePreview = "desktop" | "mobile";

/* ─── Sections ─────────────────────────────────────────────────────────────── */

export type SectionId = "branding" | "product" | "customer" | "cta";

export const SECTION_ORDER: SectionId[] = ["branding", "product", "customer", "cta"];

export const SECTION_META: Record<SectionId, { label: string; description: string; guideCopy: string }> = {
  branding: {
    label: "Branding",
    description: "Logo, business name, cover image & description",
    guideCopy: "Start by adding your branding — logo, business name, and cover image.",
  },
  product: {
    label: "Product / Items",
    description: "What you're selling, pricing plans, or donation setup",
    guideCopy: "Add what you're selling — items, plans, or donation goals.",
  },
  customer: {
    label: "Customer Details",
    description: "Collect name, contact, address & custom fields",
    guideCopy: "Collect customer details — name, contact, and any custom fields.",
  },
  cta: {
    label: "Call to Action",
    description: "Payment button, amount summary & CTA label",
    guideCopy: "Configure your CTA — button label and payment summary.",
  },
};

/* ─── Branding ─────────────────────────────────────────────────────────────── */

export type CoverType = "image" | "video";

export interface BrandingData {
  logo: string;
  businessName: string;
  coverImage: string;
  coverType: CoverType;
  coverVideoUrl: string;
  description: string;
  videoUrl: string;
  businessEmail: string;
  businessPhone: string;
  coverEnabled: boolean;
  logoEnabled: boolean;
  descriptionEnabled: boolean;
  businessDetailsEnabled: boolean;
  videoEnabled: boolean;
}

export const DEFAULT_BRANDING: BrandingData = {
  logo: "",
  businessName: "",
  coverImage: "",
  coverType: "image",
  coverVideoUrl: "",
  description: "",
  videoUrl: "",
  businessEmail: "",
  businessPhone: "",
  coverEnabled: true,
  logoEnabled: true,
  descriptionEnabled: true,
  businessDetailsEnabled: false,
  videoEnabled: false,
};

/* ─── Product / Items ──────────────────────────────────────────────────────── */

export type ProductMode = "single" | "multiple" | "catalog";

/** Optional paid extra tied to a main line item (e.g. warranty). Shown as checkboxes when add-ons are enabled. */
export interface ProductItemAddon {
  id: string;
  label: string;
  price: number;
  /** Pre-selected in the builder preview (buyer can still change at checkout). */
  defaultSelected: boolean;
}

export interface ProductItem {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  enableQuantity: boolean;
  quantity: number;
  /** Add-on lines when `ProductData.itemAddonsEnabled` is on. */
  addons: ProductItemAddon[];
}

export type PricingType = "fixed" | "subscription" | "donation" | "custom_donation" | "ecommerce";

export interface ProductData {
  mode: ProductMode;
  pricingType: PricingType;
  items: ProductItem[];
  showDonationGoal: boolean;
  donationGoal: number;
  donationCurrent: number;
  currency: string;
  itemCardEnabled: boolean;
  /** Optional extras (checkbox list) for each item card. */
  itemAddonsEnabled: boolean;
  pricingPlanEnabled: boolean;
  donationAmountEnabled: boolean;
  donationGoalEnabled: boolean;
}

export const DEFAULT_PRODUCT: ProductData = {
  mode: "single",
  pricingType: "fixed",
  items: [
    {
      id: "item_1",
      image: "",
      title: "",
      description: "",
      price: 0,
      enableQuantity: false,
      quantity: 1,
      addons: [],
    },
  ],
  showDonationGoal: false,
  donationGoal: 0,
  donationCurrent: 0,
  currency: "INR",
  itemCardEnabled: true,
  itemAddonsEnabled: false,
  pricingPlanEnabled: false,
  donationAmountEnabled: false,
  donationGoalEnabled: false,
};

/* ─── Customer Details ─────────────────────────────────────────────────────── */

export type FieldType = "text" | "email" | "phone" | "textarea" | "select" | "number";

export interface CustomerField {
  id: string;
  label: string;
  fieldType: FieldType;
  required: boolean;
  placeholder: string;
  colSpan: 1 | 2;
  isDefault: boolean;
}

export interface CustomerData {
  fields: CustomerField[];
}

export const DEFAULT_CUSTOMER: CustomerData = {
  fields: [
    { id: "f_name", label: "Full Name", fieldType: "text", required: true, placeholder: "Enter your name", colSpan: 1, isDefault: true },
    { id: "f_phone", label: "Contact Number", fieldType: "phone", required: true, placeholder: "+91 XXXXX XXXXX", colSpan: 1, isDefault: true },
  ],
};

/* ─── CTA ──────────────────────────────────────────────────────────────────── */

export type CTALabel = "Pay Now" | "Donate Now" | "Subscribe" | "Enrol Now" | "Submit" | string;

export interface CTAData {
  label: CTALabel;
  showAmountSummary: boolean;
}

export const DEFAULT_CTA: CTAData = {
  label: "Pay Now",
  showAmountSummary: true,
};

/* ─── Customization ────────────────────────────────────────────────────────── */

export interface PageCustomization {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  fontFamily: string;
  layout: "single" | "two-column";
}

export const DEFAULT_CUSTOMIZATION: PageCustomization = {
  primaryColor: "#004299",
  secondaryColor: "#009de5",
  backgroundColor: "#ffffff",
  fontFamily: "Inter",
  layout: "single",
};

/* ─── Full Page State ──────────────────────────────────────────────────────── */

export interface StructuredPageState {
  branding: BrandingData;
  product: ProductData;
  customer: CustomerData;
  cta: CTAData;
  customization: PageCustomization;
}

export const DEFAULT_PAGE_STATE: StructuredPageState = {
  branding: DEFAULT_BRANDING,
  product: DEFAULT_PRODUCT,
  customer: DEFAULT_CUSTOMER,
  cta: DEFAULT_CTA,
  customization: DEFAULT_CUSTOMIZATION,
};

/* ─── Section completion logic ─────────────────────────────────────────────── */

export function isSectionComplete(section: SectionId, state: StructuredPageState): boolean {
  switch (section) {
    case "branding":
      return !!state.branding.businessName.trim();
    case "product":
      return state.product.items.length > 0 && state.product.items.some((i) => i.title.trim() && i.price > 0);
    case "customer":
      return state.customer.fields.filter((f) => f.required).length >= 1;
    case "cta":
      return !!state.cta.label.trim();
  }
}

export function isPageValid(state: StructuredPageState): boolean {
  return SECTION_ORDER.every((s) => isSectionComplete(s, state));
}

/* ─── Category-based product defaults ──────────────────────────────────────── */

export function getProductDefaultsForCategory(category: string): Pick<
  ProductData,
  "itemCardEnabled" | "itemAddonsEnabled" | "pricingPlanEnabled" | "donationAmountEnabled" | "donationGoalEnabled"
> {
  switch (category) {
    case "Donations":
      return {
        itemCardEnabled: true,
        itemAddonsEnabled: false,
        pricingPlanEnabled: false,
        donationAmountEnabled: true,
        donationGoalEnabled: true,
      };
    case "Subscriptions":
      return {
        itemCardEnabled: true,
        itemAddonsEnabled: false,
        pricingPlanEnabled: true,
        donationAmountEnabled: false,
        donationGoalEnabled: false,
      };
    default:
      return {
        itemCardEnabled: true,
        itemAddonsEnabled: false,
        pricingPlanEnabled: false,
        donationAmountEnabled: false,
        donationGoalEnabled: false,
      };
  }
}

/* ─── Section component library definitions ────────────────────────────────── */

export interface SectionComponentDef {
  id: string;
  label: string;
  icon: string;
  section: SectionId;
  description: string;
}

export const SECTION_COMPONENTS: SectionComponentDef[] = [
  // Branding
  { id: "logo", label: "Logo", icon: "image", section: "branding", description: "Upload your brand logo" },
  { id: "business_name", label: "Business Name", icon: "type", section: "branding", description: "Your business or merchant name" },
  { id: "cover_image", label: "Cover", icon: "image", section: "branding", description: "Hero banner image" },
  { id: "brand_description", label: "Description", icon: "align-left", section: "branding", description: "Short brand or page description" },
  { id: "business_details", label: "Business Details", icon: "contact-round", section: "branding", description: "Email and phone number" },
  { id: "brand_video", label: "Embed Video", icon: "video", section: "branding", description: "Optional video embed" },
  // Product — item card + optional add-ons only (other flows use Properties)
  { id: "item_card", label: "Item card", icon: "package", section: "product", description: "Main product or service line item" },
  {
    id: "item_addon",
    label: "Item add-on",
    icon: "check-square",
    section: "product",
    description: "Optional extras buyers can add with the main item",
  },
  // Customer
  { id: "text_field", label: "Text Field", icon: "type", section: "customer", description: "Single-line text input" },
  { id: "email_field", label: "Email Field", icon: "mail", section: "customer", description: "Email address input" },
  { id: "phone_field", label: "Phone Field", icon: "phone", section: "customer", description: "Phone number input" },
  { id: "address_field", label: "Address", icon: "map-pin", section: "customer", description: "Full address block" },
  { id: "textarea_field", label: "Multiline Text", icon: "align-left", section: "customer", description: "Multi-line text area" },
  { id: "select_field", label: "Dropdown", icon: "chevron-down", section: "customer", description: "Dropdown select field" },
  // CTA
  { id: "cta_button", label: "CTA Button", icon: "mouse-pointer", section: "cta", description: "Payment action button" },
  { id: "amount_summary", label: "Amount Summary", icon: "receipt", section: "cta", description: "Order total breakdown" },
];
