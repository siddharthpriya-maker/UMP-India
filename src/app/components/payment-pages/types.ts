export type PageStatus = "active" | "expired" | "draft";
export type CreationMode = "scratch" | "template" | "copy" | "ai";
export type BuilderStep = "info" | "builder" | "settings";

export interface PaymentPage {
  id: string;
  name: string;
  urlPath: string;
  htmlTitle: string;
  status: PageStatus;
  createdAt: string;
  totalPayments: number;
  totalAmount: number;
  supportContact?: string;
  supportEmail?: string;
  freezeDate?: string;
  coverImage?: string;
}

export interface ComponentProperty {
  key: string;
  label: string;
  type: "text" | "number" | "checkbox" | "select" | "condition" | "options";
  value: unknown;
  options?: string[];
}

export type ComponentCategory =
  | "display"
  | "layout"
  | "input"
  | "choices"
  | "date"
  | "pricing"
  | "verification"
  | "address"
  | "ecommerce"
  | "other";

export interface PaletteComponent {
  type: string;
  label: string;
  category: ComponentCategory;
  icon: string;
  defaultProperties: Record<string, unknown>;
}

export interface BuilderComponent {
  id: string;
  type: string;
  label: string;
  category: ComponentCategory;
  properties: Record<string, unknown>;
  order: number;
  pageIndex: number;
}

export interface BuilderPage {
  index: number;
  title: string;
  components: BuilderComponent[];
}

export interface PageInfo {
  pageName: string;
  pageCategory: string;
  businessEmail: string;
  businessPhone: string;
  expiryDate: string;
  browserTabTitle: string;
}

export interface NotificationSettings {
  sendSms: boolean;
  smsText: string;
  sendEmail: boolean;
  emailSubject: string;
  emailBody: string;
}

export interface PostTransactionSettings {
  redirectUrl: string;
  successMessage: string;
}

export interface AdditionalSettingsData {
  postTransaction: PostTransactionSettings;
  notifications: NotificationSettings;
}

export interface PageBuilderState {
  step: BuilderStep;
  creationMode: CreationMode | null;
  pageInfo: PageInfo;
  pages: BuilderPage[];
  activePageIndex: number;
  selectedComponentId: string | null;
  settings: AdditionalSettingsData;
  formCustomization: FormCustomization;
}

export interface FormCustomization {
  backgroundColor: string;
  ctaColor: string;
  fontFamily: string;
  isDarkMode: boolean;
  useGradient: boolean;
}
