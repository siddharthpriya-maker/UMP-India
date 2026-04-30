import { Eye, Monitor, Smartphone } from "lucide-react";
import type { DevicePreview } from "./builder-types";

export interface BuilderPreviewControlsProps {
  previewMode: DevicePreview;
  onPreviewModeChange: (mode: DevicePreview) => void;
  onPreview: () => void;
}

/** Desktop / mobile preview toggle and Preview action — lives in the wizard header on Page builder. */
export function BuilderPreviewControls({
  previewMode,
  onPreviewModeChange,
  onPreview,
}: BuilderPreviewControlsProps) {
  return (
    <div className="flex shrink-0 items-center gap-2">
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
        onClick={onPreview}
        className="flex items-center gap-1.5 rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[13px] font-semibold text-[#101010] transition-colors hover:bg-[#f5f9fe]"
      >
        <Eye className="size-3.5" />
        Preview
      </button>
    </div>
  );
}
