import { Plus, User, Trash2, GripVertical } from "lucide-react";
import type { CustomerData, CustomerField, PageCustomization, DevicePreview } from "./builder-types";

interface CustomerDetailsSectionProps {
  data: CustomerData;
  customization: PageCustomization;
  previewMode: DevicePreview;
  isSelected: boolean;
  onSelect: () => void;
}

export function CustomerDetailsSection({
  data,
  customization,
  previewMode,
  isSelected,
  onSelect,
}: CustomerDetailsSectionProps) {
  const isMobile = previewMode === "mobile";
  const useTwoCol = !isMobile && customization.layout === "two-column";

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      className={[
        "group relative rounded-[16px] border-2 p-5 transition-all cursor-pointer",
        isSelected
          ? "border-[#004299] shadow-[0_0_0_3px_rgba(0,66,153,0.12)]"
          : "border-transparent hover:border-[#e0e0e0]",
      ].join(" ")}
      style={{ backgroundColor: customization.backgroundColor, fontFamily: customization.fontFamily }}
    >
      <div
        className={[
          "absolute -top-3 left-4 z-10 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider transition-opacity",
          isSelected
            ? "bg-[#004299] text-white opacity-100"
            : "bg-[#f0f0f0] text-[#7e7e7e] opacity-0 group-hover:opacity-100",
        ].join(" ")}
      >
        Customer Details
      </div>

      {data.fields.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={`grid gap-x-4 gap-y-3 ${useTwoCol ? "grid-cols-2" : "grid-cols-1"}`}>
          {data.fields.map((field) => (
            <div
              key={field.id}
              className={field.colSpan === 2 && useTwoCol ? "col-span-2" : ""}
            >
              <FieldPreview field={field} primaryColor={customization.primaryColor} />
            </div>
          ))}
        </div>
      )}

      {/* Quick add field hint */}
      <div className="mt-3 flex items-center justify-center">
        <span className="flex items-center gap-1 text-[12px] font-medium text-[#acacac] transition-colors group-hover:text-[#004299]">
          <Plus className="size-3" />
          Add field
        </span>
      </div>
    </div>
  );
}

function FieldPreview({
  field,
  primaryColor,
}: {
  field: CustomerField;
  primaryColor: string;
}) {
  const isTextarea = field.fieldType === "textarea";
  const height = isTextarea ? "h-[80px] items-start pt-3" : "h-[48px] items-center";

  return (
    <div
      className={`flex ${height} rounded-[8px] border border-[#e5e5e5] bg-white px-3 transition-colors hover:border-[#d0d0d0]`}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-[11px] font-medium text-[#999]">
          {field.label}
          {field.required && <span className="ml-0.5 text-[#fd5154]">*</span>}
        </span>
        <span className="truncate text-[13px] text-[#ccc]">{field.placeholder || "Enter value"}</span>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-6">
      <div className="flex size-10 items-center justify-center rounded-full bg-[#f5f9fe]">
        <User className="size-5 text-[#7e7e7e]" />
      </div>
      <p className="text-center text-[13px] text-[#acacac]">
        Collect customer details — name, contact &amp; custom fields
      </p>
    </div>
  );
}
