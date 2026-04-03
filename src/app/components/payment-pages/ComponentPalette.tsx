import { useState } from "react";
import {
  Image, Video, FileText, BarChart3, Minus,
  Type, Hash, AlignLeft, Lock, PenTool, SlidersHorizontal,
  List, CircleDot, CheckSquare, ShieldCheck,
  Calendar, CalendarRange, Timer, CalendarDays,
  DollarSign, Calculator, CreditCard, Banknote, Brain,
  Fingerprint, FileCheck, Building,
  MapPin, Globe, Map, Navigation,
  Phone, ShoppingCart, Package, Upload, Camera,
  ChevronDown, GripVertical,
} from "lucide-react";
import type { BuilderComponent, ComponentCategory, PaletteComponent } from "./types";

const categories: { key: ComponentCategory; label: string }[] = [
  { key: "display", label: "Display Content" },
  { key: "layout", label: "Layout" },
  { key: "input", label: "Input Fields" },
  { key: "choices", label: "Choices" },
  { key: "date", label: "Date Related" },
  { key: "pricing", label: "Pricing" },
  { key: "verification", label: "Verification" },
  { key: "address", label: "Address" },
  { key: "ecommerce", label: "eCommerce" },
  { key: "other", label: "Other" },
];

const iconMap: Record<string, typeof Type> = {
  cover_image: Image,
  image: Image, video: Video, html_notes: FileText, goal_progress: BarChart3,
  divider: Minus,
  text_field: Type, number_field: Hash, text_area: AlignLeft, password: Lock,
  digital_signature: PenTool, numeric_slider: SlidersHorizontal,
  dropdown: List, radio_group: CircleDot, checkbox: CheckSquare, consent: ShieldCheck,
  date_picker: Calendar, date_range: CalendarRange, num_days: Timer, today_date: CalendarDays,
  amount: DollarSign, formula: Calculator, pricing_dropdown: CreditCard,
  fixed_amount: Banknote, amount_logic: Brain,
  pan: Fingerprint, aadhaar: FileCheck, gst: Building,
  state_city: MapPin, countries: Globe, states: Map, pin_state_city: Navigation,
  address_line1: MapPin, address_line2: MapPin, contact: Phone,
  catalogue: ShoppingCart, product_box: Package,
  file_upload: Upload, photo_capture: Camera,
};

export const paletteComponents: PaletteComponent[] = [
  { type: "cover_image", label: "Cover Image", category: "display", icon: "cover_image", defaultProperties: { src: "", alt: "Cover image" } },
  { type: "image", label: "Image", category: "display", icon: "image", defaultProperties: { src: "", alt: "" } },
  { type: "video", label: "Embed Video", category: "display", icon: "video", defaultProperties: { url: "" } },
  { type: "html_notes", label: "HTML Notes", category: "display", icon: "html_notes", defaultProperties: { content: "" } },
  { type: "goal_progress", label: "Goal Progress Bar", category: "display", icon: "goal_progress", defaultProperties: { goal: 100, current: 0 } },
  { type: "divider", label: "Divider", category: "layout", icon: "divider", defaultProperties: {} },
  { type: "text_field", label: "Text Field", category: "input", icon: "text_field", defaultProperties: { label: "Text Field", placeholder: "", required: "always", minLength: 0, maxLength: 255 } },
  { type: "number_field", label: "Number Field", category: "input", icon: "number_field", defaultProperties: { label: "Number Field", placeholder: "", required: "always" } },
  { type: "text_area", label: "Text Area", category: "input", icon: "text_area", defaultProperties: { label: "Text Area", placeholder: "", rows: 4 } },
  { type: "password", label: "Password Field", category: "input", icon: "password", defaultProperties: { label: "Password", placeholder: "" } },
  { type: "digital_signature", label: "Digital Signature", category: "input", icon: "digital_signature", defaultProperties: { label: "Signature" } },
  { type: "numeric_slider", label: "Numeric Slider", category: "input", icon: "numeric_slider", defaultProperties: { label: "Slider", min: 0, max: 100, step: 1 } },
  { type: "dropdown", label: "Dropdown", category: "choices", icon: "dropdown", defaultProperties: { label: "Dropdown", options: ["Option 1", "Option 2"], allowMulti: false } },
  { type: "radio_group", label: "Radio Button Group", category: "choices", icon: "radio_group", defaultProperties: { label: "Radio Group", options: ["Option 1", "Option 2"] } },
  { type: "checkbox", label: "Checkbox", category: "choices", icon: "checkbox", defaultProperties: { label: "Checkbox", options: ["Option 1"] } },
  { type: "consent", label: "Capture Consent", category: "choices", icon: "consent", defaultProperties: { label: "I agree to the terms", required: "always" } },
  { type: "date_picker", label: "Date Picker", category: "date", icon: "date_picker", defaultProperties: { label: "Date" } },
  { type: "date_range", label: "Date Range Picker", category: "date", icon: "date_range", defaultProperties: { label: "Date Range" } },
  { type: "num_days", label: "Number of Days", category: "date", icon: "num_days", defaultProperties: { label: "Number of Days" } },
  { type: "today_date", label: "Today Date", category: "date", icon: "today_date", defaultProperties: { label: "Today's Date" } },
  { type: "amount", label: "Amount", category: "pricing", icon: "amount", defaultProperties: { label: "Amount", allowCustom: true } },
  { type: "formula", label: "Formula Field", category: "pricing", icon: "formula", defaultProperties: { label: "Calculated Amount", formula: "" } },
  { type: "pricing_dropdown", label: "Pricing Dropdown", category: "pricing", icon: "pricing_dropdown", defaultProperties: { label: "Select Plan", options: [{ name: "Basic", price: 500 }] } },
  { type: "fixed_amount", label: "Fixed Amount", category: "pricing", icon: "fixed_amount", defaultProperties: { label: "Amount", value: 0 } },
  { type: "amount_logic", label: "Amount Based on Logic", category: "pricing", icon: "amount_logic", defaultProperties: { label: "Calculated Amount", logic: "" } },
  { type: "pan", label: "PAN Number", category: "verification", icon: "pan", defaultProperties: { label: "PAN Number" } },
  { type: "aadhaar", label: "Aadhaar Number", category: "verification", icon: "aadhaar", defaultProperties: { label: "Aadhaar Number" } },
  { type: "gst", label: "GST Number", category: "verification", icon: "gst", defaultProperties: { label: "GST Number" } },
  { type: "state_city", label: "State & City", category: "address", icon: "state_city", defaultProperties: { label: "State & City" } },
  { type: "countries", label: "Countries", category: "address", icon: "countries", defaultProperties: { label: "Country" } },
  { type: "states", label: "States", category: "address", icon: "states", defaultProperties: { label: "State" } },
  { type: "pin_state_city", label: "PIN, State & City", category: "address", icon: "pin_state_city", defaultProperties: { label: "PIN Code" } },
  { type: "address_line1", label: "Address Line 1", category: "address", icon: "address_line1", defaultProperties: { label: "Address Line 1" } },
  { type: "address_line2", label: "Address Line 2", category: "address", icon: "address_line2", defaultProperties: { label: "Address Line 2" } },
  { type: "contact", label: "Contact Number", category: "address", icon: "contact", defaultProperties: { label: "Contact Number" } },
  { type: "catalogue", label: "Products from Catalogue", category: "ecommerce", icon: "catalogue", defaultProperties: {} },
  { type: "product_box", label: "Product Display Box", category: "ecommerce", icon: "product_box", defaultProperties: { label: "Product", image: "", name: "", description: "", price: 0 } },
  { type: "file_upload", label: "File Upload", category: "other", icon: "file_upload", defaultProperties: { label: "Upload File", accept: ".png,.jpg,.pdf,.xlsx,.doc,.docx" } },
  { type: "photo_capture", label: "Photo Capture", category: "other", icon: "photo_capture", defaultProperties: { label: "Capture Photo" } },
];

type PanelView = "all" | "used";

interface ComponentPaletteProps {
  onDragStart: (component: PaletteComponent) => void;
  usedComponents: BuilderComponent[];
}

export function ComponentPalette({ onDragStart, usedComponents }: ComponentPaletteProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [view, setView] = useState<PanelView>("all");

  const toggleCategory = (key: string) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="w-[280px] border-r border-[#e0e0e0] bg-white flex flex-col overflow-hidden shrink-0">
      {/* Toggle: All Components / Used Components */}
      <div className="flex shrink-0 border-b border-[#e0e0e0]">
        <button
          type="button"
          onClick={() => setView("all")}
          className={[
            "flex-1 py-2.5 text-center text-[13px] font-semibold transition-colors",
            view === "all"
              ? "text-[#004299] border-b-2 border-[#004299]"
              : "text-[#7e7e7e] hover:text-[#101010]",
          ].join(" ")}
        >
          All Components
        </button>
        <button
          type="button"
          onClick={() => setView("used")}
          className={[
            "flex-1 py-2.5 text-center text-[13px] font-semibold transition-colors",
            view === "used"
              ? "text-[#004299] border-b-2 border-[#004299]"
              : "text-[#7e7e7e] hover:text-[#101010]",
          ].join(" ")}
        >
          Used ({usedComponents.length})
        </button>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto py-2 pl-[32px] pr-3">
        {view === "all" ? (
          <AllComponentsList
            collapsed={collapsed}
            toggleCategory={toggleCategory}
            onDragStart={onDragStart}
          />
        ) : (
          <UsedComponentsList components={usedComponents} />
        )}
      </div>
    </div>
  );
}

function AllComponentsList({
  collapsed,
  toggleCategory,
  onDragStart,
}: {
  collapsed: Record<string, boolean>;
  toggleCategory: (key: string) => void;
  onDragStart: (component: PaletteComponent) => void;
}) {
  return (
    <>
      {categories.map((cat) => {
        const items = paletteComponents.filter((c) => c.category === cat.key);
        if (items.length === 0) return null;
        const isCollapsed = collapsed[cat.key];

        return (
          <div key={cat.key} className="mb-2">
            <button
              onClick={() => toggleCategory(cat.key)}
              className="flex items-center justify-between w-full py-2 px-1"
            >
              <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">
                {cat.label}
              </span>
              <ChevronDown
                className={`size-4 text-[#7e7e7e] transition-transform ${isCollapsed ? "-rotate-90" : ""}`}
              />
            </button>
            {!isCollapsed && (
              <div className="flex flex-col gap-0.5">
                {items.map((comp) => {
                  const Icon = iconMap[comp.icon] || Type;
                  return (
                    <div
                      key={comp.type}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("component", JSON.stringify(comp));
                        onDragStart(comp);
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-[8px] hover:bg-[#f5f9fe] cursor-grab active:cursor-grabbing transition-colors"
                    >
                      <Icon className="size-4 text-[#7e7e7e] shrink-0" />
                      <span className="text-[13px] text-[#101010]">{comp.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

function UsedComponentsList({ components }: { components: BuilderComponent[] }) {
  const sorted = [...components].sort((a, b) => a.order - b.order);

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-[13px] text-[#7e7e7e]">
          No components added yet.<br />
          Drag from "All Components" onto the canvas.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {sorted.map((comp, idx) => {
        const Icon = iconMap[comp.type] || Type;
        return (
          <div
            key={comp.id}
            className="flex items-center gap-3 p-2.5 rounded-[8px] hover:bg-[#f5f9fe] transition-colors"
          >
            <GripVertical className="size-3.5 text-[#e0e0e0] shrink-0" />
            <Icon className="size-4 text-[#7e7e7e] shrink-0" />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-[13px] text-[#101010]">
                {(comp.properties.label as string) || comp.label}
              </span>
              <span className="text-[11px] text-[#7e7e7e]">#{idx + 1}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
