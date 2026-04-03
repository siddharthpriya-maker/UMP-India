import { X, Plus, Trash2, Monitor, Smartphone } from "lucide-react";
import { TextField } from "../TextField";
import type { BuilderComponent } from "./types";

interface PropertyPanelProps {
  component: BuilderComponent | null;
  onClose: () => void;
  onUpdateProperty: (componentId: string, key: string, value: unknown) => void;
  previewMode: "web" | "mobile";
  onPreviewModeChange: (mode: "web" | "mobile") => void;
}

export function PropertyPanel({
  component,
  onClose,
  onUpdateProperty,
  previewMode,
  onPreviewModeChange,
}: PropertyPanelProps) {
  return (
    <div className="w-[320px] border-l border-[#e0e0e0] bg-white flex flex-col overflow-hidden shrink-0">
      {/* Preview mode toggle */}
      <div className="flex shrink-0 items-center justify-between border-b border-[#e0e0e0] px-4 py-2.5">
        <span className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#7e7e7e]">
          Preview
        </span>
        <div className="flex items-center rounded-[8px] border border-[#e0e0e0] p-0.5">
          <button
            type="button"
            onClick={() => onPreviewModeChange("web")}
            className={[
              "flex items-center gap-1.5 rounded-[6px] px-2.5 py-1 text-[12px] font-semibold transition-colors",
              previewMode === "web"
                ? "bg-[#004299] text-white"
                : "text-[#7e7e7e] hover:text-[#101010]",
            ].join(" ")}
          >
            <Monitor className="size-3.5" />
            Web
          </button>
          <button
            type="button"
            onClick={() => onPreviewModeChange("mobile")}
            className={[
              "flex items-center gap-1.5 rounded-[6px] px-2.5 py-1 text-[12px] font-semibold transition-colors",
              previewMode === "mobile"
                ? "bg-[#004299] text-white"
                : "text-[#7e7e7e] hover:text-[#101010]",
            ].join(" ")}
          >
            <Smartphone className="size-3.5" />
            Mobile
          </button>
        </div>
      </div>

      {/* Component properties or empty state */}
      {component ? (
        <ComponentProperties
          component={component}
          onClose={onClose}
          onUpdateProperty={onUpdateProperty}
        />
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Customization hint */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <p className="text-[14px] text-[#7e7e7e]">
              Select a component on the canvas to edit its properties and rules.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ComponentProperties({
  component,
  onClose,
  onUpdateProperty,
}: {
  component: BuilderComponent;
  onClose: () => void;
  onUpdateProperty: (componentId: string, key: string, value: unknown) => void;
}) {
  const update = (key: string, value: unknown) =>
    onUpdateProperty(component.id, key, value);

  const hasOptions = ["dropdown", "radio_group", "checkbox"].includes(component.type);
  const options = (component.properties.options as string[]) || [];

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e0e0e0] shrink-0">
        <h3 className="text-[14px] font-semibold text-[#101010]">Properties</h3>
        <button
          onClick={onClose}
          className="size-6 flex items-center justify-center rounded-[4px] hover:bg-[#f5f9fe] transition-colors"
        >
          <X className="size-4 text-[#7e7e7e]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5">
        {/* Component type badge */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#f5f9fe] rounded-[8px]">
          <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">Type</span>
          <span className="text-[13px] font-semibold text-[#101010]">{component.label}</span>
        </div>

        {/* Label */}
        {component.properties.label !== undefined && (
          <TextField
            label="Label"
            size="compact"
            value={(component.properties.label as string) || ""}
            onChange={(v) => update("label", v)}
          />
        )}

        {/* Placeholder */}
        {component.properties.placeholder !== undefined && (
          <TextField
            label="Placeholder"
            size="compact"
            value={(component.properties.placeholder as string) || ""}
            onChange={(v) => update("placeholder", v)}
          />
        )}

        {/* Required */}
        <SelectField
          label="Require this field"
          value={(component.properties.required as string) || "always"}
          onChange={(v) => update("required", v)}
          options={[
            { value: "always", label: "Always" },
            { value: "never", label: "Never" },
            { value: "when", label: "When..." },
          ]}
        />

        {/* Show field */}
        <SelectField
          label="Show this field"
          value={(component.properties.showField as string) || "always"}
          onChange={(v) => update("showField", v)}
          options={[
            { value: "always", label: "Always" },
            { value: "never", label: "Never" },
            { value: "when", label: "When..." },
          ]}
        />

        {/* Toggles */}
        <div className="flex flex-col gap-3">
          <ToggleProperty
            label="Disable Field"
            checked={!!component.properties.disabled}
            onChange={(v) => update("disabled", v)}
          />
          <ToggleProperty
            label="Show Help Text"
            checked={!!component.properties.showHelp}
            onChange={(v) => update("showHelp", v)}
          />
          <ToggleProperty
            label="Enable Analytics"
            checked={!!component.properties.analytics}
            onChange={(v) => update("analytics", v)}
          />
          {hasOptions && (
            <ToggleProperty
              label="Allow Multi Select"
              checked={!!component.properties.allowMulti}
              onChange={(v) => update("allowMulti", v)}
            />
          )}
        </div>

        {/* Options list */}
        {hasOptions && (
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#101010]">Options</label>
            <div className="flex flex-col gap-2">
              {options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    value={opt}
                    onChange={(e) => {
                      const newOpts = [...options];
                      newOpts[idx] = e.target.value;
                      update("options", newOpts);
                    }}
                    placeholder={`Option ${idx + 1}`}
                    className="flex-1 h-[36px] px-3 border border-[#e0e0e0] rounded-[4px] text-[13px] text-[#101010] placeholder:text-[#7e7e7e] outline-none focus:border-[#004299] hover:border-[#004299] transition-colors bg-white"
                  />
                  <button
                    onClick={() => {
                      const newOpts = options.filter((_, i) => i !== idx);
                      update("options", newOpts);
                    }}
                    className="size-6 flex items-center justify-center rounded-[4px] text-[#fd5154] hover:bg-[#ffebef] transition-colors shrink-0"
                  >
                    <Trash2 className="size-3" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => update("options", [...options, `Option ${options.length + 1}`])}
                className="flex items-center gap-1 text-[12px] text-[#004299] font-semibold hover:underline self-start"
              >
                <Plus className="size-3" />
                Add Option
              </button>
            </div>
          </div>
        )}

        {/* Rules / Validation */}
        <div className="border-t border-[#e0e0e0] pt-4">
          <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">
            Rules &amp; Validation
          </span>
          <div className="flex flex-col gap-3 mt-3">
            {component.properties.minLength !== undefined && (
              <TextField
                label="Min Length"
                type="number"
                size="compact"
                value={String((component.properties.minLength as number) || 0)}
                onChange={(v) => update("minLength", parseInt(v) || 0)}
              />
            )}
            {component.properties.maxLength !== undefined && (
              <TextField
                label="Max Length"
                type="number"
                size="compact"
                value={String((component.properties.maxLength as number) || 255)}
                onChange={(v) => update("maxLength", parseInt(v) || 255)}
              />
            )}
            <TextField
              label="Regex Pattern"
              size="compact"
              value={(component.properties.regex as string) || ""}
              onChange={(v) => update("regex", v)}
              assistiveText="e.g. ^[A-Z]{5}[0-9]{4}[A-Z]$"
            />
          </div>
        </div>
      </div>
    </>
  );
}

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
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-[#101010]">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[44px] w-full px-3 border border-[#e0e0e0] rounded-[4px] text-[13px] text-[#101010] outline-none focus:border-[#004299] hover:border-[#004299] transition-colors bg-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ToggleProperty({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-[#101010]">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`w-[36px] h-[20px] rounded-full transition-colors relative ${
          checked ? "bg-[#004299]" : "bg-[#e0e0e0]"
        }`}
      >
        <div
          className={`absolute top-[2px] size-[16px] rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-[2px]"
          }`}
        />
      </button>
    </div>
  );
}
