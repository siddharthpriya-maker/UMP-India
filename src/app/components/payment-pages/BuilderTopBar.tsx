import { useState } from "react";
import { Eye, Save, ChevronRight, Monitor, Smartphone, Maximize } from "lucide-react";
import type { DevicePreview } from "./builder-types";

interface BuilderTopBarProps {
  title: string;
  onTitleChange: (title: string) => void;
  previewMode: DevicePreview;
  onPreviewModeChange: (mode: DevicePreview) => void;
  onSaveDraft: () => void;
  onContinue: () => void;
  onPreview: () => void;
  onFitToScreen: () => void;
  continueDisabled: boolean;
  isSaving: boolean;
}

export function BuilderTopBar({
  title,
  onTitleChange,
  previewMode,
  onPreviewModeChange,
  onSaveDraft,
  onContinue,
  onPreview,
  onFitToScreen,
  continueDisabled,
  isSaving,
}: BuilderTopBarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const commitTitle = () => {
    setIsEditing(false);
    const trimmed = editValue.trim();
    if (trimmed) onTitleChange(trimmed);
    else setEditValue(title);
  };

  return (
    <header className="flex h-[56px] shrink-0 items-center justify-between border-b border-[#e0e0e0] bg-white px-5">
      {/* Left: page title */}
      <div className="flex min-w-0 items-center gap-3">
        {isEditing ? (
          <input
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={commitTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitTitle();
              if (e.key === "Escape") { setEditValue(title); setIsEditing(false); }
            }}
            className="h-[32px] min-w-[200px] rounded-[6px] border border-[#004299] bg-white px-2 text-[15px] font-semibold text-[#101010] outline-none"
          />
        ) : (
          <button
            onClick={() => { setEditValue(title); setIsEditing(true); }}
            className="truncate text-[15px] font-semibold text-[#101010] hover:text-[#004299] transition-colors"
            title="Click to rename"
          >
            {title}
          </button>
        )}
        <span className="text-[12px] text-[#7e7e7e]">— Payment Page Builder</span>
      </div>

      {/* Center: device toggle + fit */}
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-[8px] border border-[#e0e0e0] p-0.5">
          <button
            type="button"
            onClick={() => onPreviewModeChange("desktop")}
            className={[
              "flex items-center gap-1.5 rounded-[6px] px-2.5 py-1.5 text-[12px] font-semibold transition-colors",
              previewMode === "desktop"
                ? "bg-[#004299] text-white"
                : "text-[#7e7e7e] hover:text-[#101010]",
            ].join(" ")}
          >
            <Monitor className="size-3.5" />
            Desktop
          </button>
          <button
            type="button"
            onClick={() => onPreviewModeChange("mobile")}
            className={[
              "flex items-center gap-1.5 rounded-[6px] px-2.5 py-1.5 text-[12px] font-semibold transition-colors",
              previewMode === "mobile"
                ? "bg-[#004299] text-white"
                : "text-[#7e7e7e] hover:text-[#101010]",
            ].join(" ")}
          >
            <Smartphone className="size-3.5" />
            Mobile
          </button>
        </div>
        <button
          type="button"
          onClick={onFitToScreen}
          className="flex items-center gap-1 rounded-[6px] px-2 py-1.5 text-[12px] font-semibold text-[#7e7e7e] transition-colors hover:bg-[#f5f9fe] hover:text-[#101010]"
          title="Fit to screen"
        >
          <Maximize className="size-3.5" />
        </button>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPreview}
          className="flex items-center gap-1.5 rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[13px] font-semibold text-[#101010] transition-colors hover:bg-[#f5f9fe]"
        >
          <Eye className="size-3.5" />
          Preview
        </button>
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={isSaving}
          className="flex items-center gap-1.5 rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[13px] font-semibold text-[#101010] transition-colors hover:bg-[#f5f9fe] disabled:opacity-50"
        >
          <Save className="size-3.5" />
          {isSaving ? "Saving…" : "Save Draft"}
        </button>
        <button
          type="button"
          onClick={onContinue}
          disabled={continueDisabled}
          className="flex items-center gap-1.5 rounded-[8px] bg-[#004299] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#003580] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
          <ChevronRight className="size-3.5" />
        </button>
      </div>
    </header>
  );
}
