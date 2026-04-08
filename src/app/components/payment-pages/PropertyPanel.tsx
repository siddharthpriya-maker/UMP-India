import { useState } from "react";
import {
  X, ChevronDown, Upload, Plus, Trash2, Image, Type,
  Palette, Layout, CreditCard, Heart, Package,
} from "lucide-react";
import { TextField } from "../TextField";
import type {
  SectionId,
  StructuredPageState,
  BrandingData,
  ProductData,
  ProductItem,
  CustomerData,
  CustomerField,
  CTAData,
  PageCustomization,
  ProductMode,
  PricingType,
  FieldType,
  DevicePreview,
} from "./builder-types";
import { SECTION_META } from "./builder-types";

interface PropertyPanelProps {
  selectedSection: SectionId | null;
  pageState: StructuredPageState;
  onUpdate: (patch: Partial<StructuredPageState>) => void;
}

export function PropertyPanel({
  selectedSection,
  pageState,
  onUpdate,
}: PropertyPanelProps) {
  const [activeTab, setActiveTab] = useState<"properties" | "customize">("properties");

  if (!selectedSection) {
    return (
      <div className="flex w-[300px] shrink-0 flex-col items-center justify-center border-l border-[#e0e0e0] bg-white p-6 text-center">
        <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-[#f5f5f5]">
          <Layout className="size-5 text-[#ccc]" />
        </div>
        <p className="text-[13px] text-[#acacac]">
          Select a section on the artboard to edit its properties and customization.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-[300px] shrink-0 flex-col overflow-hidden border-l border-[#e0e0e0] bg-white">
      {/* Tab header */}
      <div className="flex shrink-0 border-b border-[#e0e0e0]">
        <button
          type="button"
          onClick={() => setActiveTab("properties")}
          className={[
            "flex-1 py-2.5 text-center text-[12px] font-semibold transition-colors",
            activeTab === "properties"
              ? "border-b-2 border-[#004299] text-[#004299]"
              : "text-[#acacac] hover:text-[#7e7e7e]",
          ].join(" ")}
        >
          {SECTION_META[selectedSection].label}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("customize")}
          className={[
            "flex-1 py-2.5 text-center text-[12px] font-semibold transition-colors",
            activeTab === "customize"
              ? "border-b-2 border-[#004299] text-[#004299]"
              : "text-[#acacac] hover:text-[#7e7e7e]",
          ].join(" ")}
        >
          Customize
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "properties" ? (
          <SectionProperties
            section={selectedSection}
            pageState={pageState}
            onUpdate={onUpdate}
          />
        ) : (
          <CustomizationPanel
            customization={pageState.customization}
            onChange={(c) => onUpdate({ customization: c })}
          />
        )}
      </div>
    </div>
  );
}

/* ─── Section-specific property editors ────────────────────────────────────── */

function SectionProperties({
  section,
  pageState,
  onUpdate,
}: {
  section: SectionId;
  pageState: StructuredPageState;
  onUpdate: (patch: Partial<StructuredPageState>) => void;
}) {
  switch (section) {
    case "branding":
      return (
        <BrandingProperties
          data={pageState.branding}
          onChange={(d) => onUpdate({ branding: d })}
        />
      );
    case "product":
      return (
        <ProductProperties
          data={pageState.product}
          onChange={(d) => onUpdate({ product: d })}
        />
      );
    case "customer":
      return (
        <CustomerProperties
          data={pageState.customer}
          onChange={(d) => onUpdate({ customer: d })}
        />
      );
    case "cta":
      return (
        <CTAProperties
          data={pageState.cta}
          onChange={(d) => onUpdate({ cta: d })}
        />
      );
  }
}

/* ─── Branding ─────────────────────────────────────────────────────────────── */

function BrandingProperties({
  data,
  onChange,
}: {
  data: BrandingData;
  onChange: (d: BrandingData) => void;
}) {
  const patch = (p: Partial<BrandingData>) => onChange({ ...data, ...p });

  return (
    <div className="flex flex-col gap-5 p-4">
      <FileUploadField
        label="Logo"
        value={data.logo}
        onChange={(v) => patch({ logo: v })}
        accept="image/*"
        hint="Square PNG or SVG recommended"
      />
      <TextField
        label="Business Name"
        value={data.businessName}
        onChange={(v) => patch({ businessName: v })}
        size="compact"
      />
      <FileUploadField
        label="Cover Image"
        value={data.coverImage}
        onChange={(v) => patch({ coverImage: v })}
        accept="image/*"
        hint="1200×400 recommended"
      />
      <TextField
        label="Description"
        value={data.description}
        onChange={(v) => patch({ description: v })}
        multiline
        rows={3}
        size="compact"
      />
      <TextField
        label="Video URL"
        value={data.videoUrl}
        onChange={(v) => patch({ videoUrl: v })}
        size="compact"
        assistiveText="YouTube or Vimeo link"
      />
    </div>
  );
}

/* ─── Product ──────────────────────────────────────────────────────────────── */

function ProductProperties({
  data,
  onChange,
}: {
  data: ProductData;
  onChange: (d: ProductData) => void;
}) {
  const patch = (p: Partial<ProductData>) => onChange({ ...data, ...p });
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const addItem = () => {
    const id = `item_${Date.now()}`;
    patch({
      items: [
        ...data.items,
        { id, image: "", title: "", description: "", price: 0, enableQuantity: false, quantity: 1 },
      ],
    });
    setExpandedItem(id);
  };

  const removeItem = (id: string) =>
    patch({ items: data.items.filter((i) => i.id !== id) });

  const updateItem = (id: string, p: Partial<ProductItem>) =>
    patch({ items: data.items.map((i) => (i.id === id ? { ...i, ...p } : i)) });

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Mode selector */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[12px] font-semibold text-[#7e7e7e]">Mode</span>
        <div className="flex gap-1.5">
          {(["single", "multiple", "catalog"] as ProductMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => patch({ mode: m })}
              className={[
                "flex-1 rounded-[8px] border py-1.5 text-[11px] font-semibold capitalize transition-colors",
                data.mode === m
                  ? "border-[#004299] bg-[#f5f9fe] text-[#004299]"
                  : "border-[#e0e0e0] text-[#7e7e7e] hover:border-[#ccc]",
              ].join(" ")}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing type */}
      <SelectField
        label="Pricing Type"
        value={data.pricingType}
        onChange={(v) => patch({ pricingType: v as PricingType })}
        options={[
          { value: "fixed", label: "Fixed Price" },
          { value: "subscription", label: "Subscription" },
          { value: "donation", label: "Donation" },
          { value: "custom_donation", label: "Custom Donation" },
          { value: "ecommerce", label: "eCommerce" },
        ]}
      />

      {/* Items */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[#7e7e7e]">Items</span>
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#004299] hover:underline"
          >
            <Plus className="size-3" /> Add
          </button>
        </div>
        {data.items.map((item) => (
          <div key={item.id} className="rounded-[10px] border border-[#f0f0f0] bg-[#fafafa]">
            <button
              type="button"
              onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
              className="flex w-full items-center justify-between px-3 py-2"
            >
              <span className="truncate text-[12px] font-medium text-[#101010]">
                {item.title || "Untitled Item"}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                  className="flex size-5 items-center justify-center rounded text-[#fd5154] hover:bg-[#ffebef]"
                >
                  <Trash2 className="size-3" />
                </button>
                <ChevronDown className={`size-3.5 text-[#ccc] transition-transform ${expandedItem === item.id ? "" : "-rotate-90"}`} />
              </div>
            </button>
            {expandedItem === item.id && (
              <div className="flex flex-col gap-3 border-t border-[#f0f0f0] p-3">
                <TextField
                  label="Title"
                  value={item.title}
                  onChange={(v) => updateItem(item.id, { title: v })}
                  size="compact"
                />
                <TextField
                  label="Description"
                  value={item.description}
                  onChange={(v) => updateItem(item.id, { description: v })}
                  size="compact"
                />
                <TextField
                  label="Price"
                  type="number"
                  value={String(item.price)}
                  onChange={(v) => updateItem(item.id, { price: parseFloat(v) || 0 })}
                  size="compact"
                  prefix={data.currency === "INR" ? "₹" : "$"}
                />
                <ToggleRow
                  label="Quantity selector"
                  checked={item.enableQuantity}
                  onChange={(v) => updateItem(item.id, { enableQuantity: v })}
                />
                <FileUploadField
                  label="Image"
                  value={item.image}
                  onChange={(v) => updateItem(item.id, { image: v })}
                  accept="image/*"
                  hint="Product image"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Donation goal */}
      {(data.pricingType === "donation" || data.pricingType === "custom_donation") && (
        <Collapsible title="Donation Goal">
          <ToggleRow
            label="Show donation goal"
            checked={data.showDonationGoal}
            onChange={(v) => patch({ showDonationGoal: v })}
          />
          {data.showDonationGoal && (
            <>
              <TextField
                label="Goal Amount"
                type="number"
                value={String(data.donationGoal)}
                onChange={(v) => patch({ donationGoal: parseFloat(v) || 0 })}
                size="compact"
                prefix="₹"
              />
              <TextField
                label="Current Amount"
                type="number"
                value={String(data.donationCurrent)}
                onChange={(v) => patch({ donationCurrent: parseFloat(v) || 0 })}
                size="compact"
                prefix="₹"
              />
            </>
          )}
        </Collapsible>
      )}
    </div>
  );
}

/* ─── Customer ─────────────────────────────────────────────────────────────── */

function CustomerProperties({
  data,
  onChange,
}: {
  data: CustomerData;
  onChange: (d: CustomerData) => void;
}) {
  const addField = () => {
    const id = `f_${Date.now()}`;
    onChange({
      fields: [
        ...data.fields,
        { id, label: "New Field", fieldType: "text", required: false, placeholder: "", colSpan: 1, isDefault: false },
      ],
    });
  };

  const removeField = (id: string) =>
    onChange({ fields: data.fields.filter((f) => f.id !== id) });

  const updateField = (id: string, p: Partial<CustomerField>) =>
    onChange({ fields: data.fields.map((f) => (f.id === id ? { ...f, ...p } : f)) });

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold text-[#7e7e7e]">Fields</span>
        <button
          type="button"
          onClick={addField}
          className="flex items-center gap-1 text-[11px] font-semibold text-[#004299] hover:underline"
        >
          <Plus className="size-3" /> Add Field
        </button>
      </div>
      {data.fields.map((field) => (
        <div key={field.id} className="rounded-[10px] border border-[#f0f0f0] bg-[#fafafa] p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-semibold text-[#101010]">
              {field.label}
              {field.isDefault && (
                <span className="ml-1 text-[10px] text-[#acacac]">(default)</span>
              )}
            </span>
            {!field.isDefault && (
              <button
                type="button"
                onClick={() => removeField(field.id)}
                className="flex size-5 items-center justify-center rounded text-[#fd5154] hover:bg-[#ffebef]"
              >
                <Trash2 className="size-3" />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            <TextField
              label="Label"
              value={field.label}
              onChange={(v) => updateField(field.id, { label: v })}
              size="compact"
            />
            <TextField
              label="Placeholder"
              value={field.placeholder}
              onChange={(v) => updateField(field.id, { placeholder: v })}
              size="compact"
            />
            <SelectField
              label="Type"
              value={field.fieldType}
              onChange={(v) => updateField(field.id, { fieldType: v as FieldType })}
              options={[
                { value: "text", label: "Text" },
                { value: "email", label: "Email" },
                { value: "phone", label: "Phone" },
                { value: "textarea", label: "Multiline" },
                { value: "select", label: "Dropdown" },
                { value: "number", label: "Number" },
              ]}
            />
            <div className="flex gap-3">
              <ToggleRow
                label="Required"
                checked={field.required}
                onChange={(v) => updateField(field.id, { required: v })}
              />
              <SelectField
                label="Width"
                value={String(field.colSpan)}
                onChange={(v) => updateField(field.id, { colSpan: parseInt(v) as 1 | 2 })}
                options={[
                  { value: "1", label: "Half" },
                  { value: "2", label: "Full" },
                ]}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── CTA ──────────────────────────────────────────────────────────────────── */

function CTAProperties({
  data,
  onChange,
}: {
  data: CTAData;
  onChange: (d: CTAData) => void;
}) {
  const patch = (p: Partial<CTAData>) => onChange({ ...data, ...p });

  return (
    <div className="flex flex-col gap-4 p-4">
      <SelectField
        label="CTA Label"
        value={data.label}
        onChange={(v) => patch({ label: v })}
        options={[
          { value: "Pay Now", label: "Pay Now" },
          { value: "Donate Now", label: "Donate Now" },
          { value: "Subscribe", label: "Subscribe" },
          { value: "Enrol Now", label: "Enrol Now" },
          { value: "Submit", label: "Submit" },
        ]}
      />
      <TextField
        label="Custom Label"
        value={typeof data.label === "string" ? data.label : ""}
        onChange={(v) => patch({ label: v })}
        size="compact"
        assistiveText="Override the preset label"
      />
      <ToggleRow
        label="Show amount summary"
        checked={data.showAmountSummary}
        onChange={(v) => patch({ showAmountSummary: v })}
      />
    </div>
  );
}

/* ─── Customization Panel ──────────────────────────────────────────────────── */

function CustomizationPanel({
  customization,
  onChange,
}: {
  customization: PageCustomization;
  onChange: (c: PageCustomization) => void;
}) {
  const patch = (p: Partial<PageCustomization>) => onChange({ ...customization, ...p });

  return (
    <div className="flex flex-col gap-5 p-4">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#acacac]">
        Theme
      </span>
      <ColorField label="Primary Color" value={customization.primaryColor} onChange={(v) => patch({ primaryColor: v })} />
      <ColorField label="Secondary Color" value={customization.secondaryColor} onChange={(v) => patch({ secondaryColor: v })} />
      <ColorField label="Background" value={customization.backgroundColor} onChange={(v) => patch({ backgroundColor: v })} />
      <SelectField
        label="Font Family"
        value={customization.fontFamily}
        onChange={(v) => patch({ fontFamily: v })}
        options={[
          { value: "Inter", label: "Inter" },
          { value: "Roboto", label: "Roboto" },
          { value: "Poppins", label: "Poppins" },
          { value: "Lato", label: "Lato" },
          { value: "Open Sans", label: "Open Sans" },
        ]}
      />
      <div className="flex flex-col gap-1.5">
        <span className="text-[12px] font-semibold text-[#7e7e7e]">Layout</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => patch({ layout: "single" })}
            className={[
              "flex-1 rounded-[8px] border py-2 text-[11px] font-semibold transition-colors",
              customization.layout === "single"
                ? "border-[#004299] bg-[#f5f9fe] text-[#004299]"
                : "border-[#e0e0e0] text-[#7e7e7e] hover:border-[#ccc]",
            ].join(" ")}
          >
            1 Column
          </button>
          <button
            type="button"
            onClick={() => patch({ layout: "two-column" })}
            className={[
              "flex-1 rounded-[8px] border py-2 text-[11px] font-semibold transition-colors",
              customization.layout === "two-column"
                ? "border-[#004299] bg-[#f5f9fe] text-[#004299]"
                : "border-[#e0e0e0] text-[#7e7e7e] hover:border-[#ccc]",
            ].join(" ")}
          >
            2 Column
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Shared small controls ────────────────────────────────────────────────── */

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[12px] font-semibold text-[#7e7e7e]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[36px] w-full rounded-[8px] border border-[#e0e0e0] bg-white px-2.5 text-[12px] text-[#101010] outline-none transition-colors hover:border-[#ccc] focus:border-[#004299]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] text-[#101010]">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-[18px] w-[32px] rounded-full transition-colors ${
          checked ? "bg-[#004299]" : "bg-[#e0e0e0]"
        }`}
      >
        <div
          className={`absolute top-[2px] size-[14px] rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-[16px]" : "translate-x-[2px]"
          }`}
        />
      </button>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <label
        className="flex size-8 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[6px] border border-[#e0e0e0]"
        style={{ backgroundColor: value }}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="invisible size-0"
        />
      </label>
      <div className="flex flex-col">
        <span className="text-[12px] font-semibold text-[#7e7e7e]">{label}</span>
        <span className="text-[11px] font-mono text-[#acacac]">{value}</span>
      </div>
    </div>
  );
}

function FileUploadField({
  label,
  value,
  onChange,
  accept,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  accept: string;
  hint?: string;
}) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => onChange(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[12px] font-semibold text-[#7e7e7e]">{label}</span>
      {value ? (
        <div className="relative">
          <img src={value} alt={label} className="h-[60px] w-full rounded-[8px] border border-[#f0f0f0] object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-white shadow"
          >
            <X className="size-3 text-[#101010]" />
          </button>
        </div>
      ) : (
        <label className="flex cursor-pointer items-center gap-2 rounded-[8px] border border-dashed border-[#e0e0e0] px-3 py-2.5 transition-colors hover:border-[#004299] hover:bg-[#f5f9fe]">
          <Upload className="size-4 text-[#acacac]" />
          <span className="text-[11px] text-[#acacac]">Upload {label.toLowerCase()}</span>
          <input type="file" accept={accept} onChange={handleFile} className="hidden" />
        </label>
      )}
      {hint && <span className="text-[10px] text-[#ccc]">{hint}</span>}
    </div>
  );
}

function Collapsible({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-[10px] border border-[#f0f0f0]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-3 py-2"
      >
        <span className="text-[12px] font-semibold text-[#7e7e7e]">{title}</span>
        <ChevronDown className={`size-3.5 text-[#ccc] transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && <div className="flex flex-col gap-3 border-t border-[#f0f0f0] p-3">{children}</div>}
    </div>
  );
}
