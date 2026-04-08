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

export interface BrandingData {
  logo: string;
  businessName: string;
  coverImage: string;
  description: string;
  videoUrl: string;
}

export const DEFAULT_BRANDING: BrandingData = {
  logo: "",
  businessName: "",
  coverImage: "",
  description: "",
  videoUrl: "",
};

/* ─── Product / Items ──────────────────────────────────────────────────────── */

export type ProductMode = "single" | "multiple" | "catalog";

export interface ProductItem {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  enableQuantity: boolean;
  quantity: number;
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
    },
  ],
  showDonationGoal: false,
  donationGoal: 0,
  donationCurrent: 0,
  currency: "INR",
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
  { id: "cover_image", label: "Cover Image", icon: "image", section: "branding", description: "Hero banner image" },
  { id: "brand_description", label: "Description", icon: "align-left", section: "branding", description: "Short brand or page description" },
  { id: "brand_video", label: "Embed Video", icon: "video", section: "branding", description: "Optional video embed" },
  // Product
  { id: "item_card", label: "Item Card", icon: "package", section: "product", description: "Add a product or service item" },
  { id: "pricing_plan", label: "Pricing Plan", icon: "credit-card", section: "product", description: "Subscription or plan option" },
  { id: "donation_amount", label: "Donation Amount", icon: "heart", section: "product", description: "Custom or preset donation" },
  { id: "donation_goal", label: "Donation Goal", icon: "target", section: "product", description: "Progress toward a goal" },
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
