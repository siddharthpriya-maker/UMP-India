import type { ReactNode } from "react";

export interface PageLevelMenuProps {
  /** Muted helper line above optional “Clear all” (e.g. builder hint). */
  assistiveText?: ReactNode;
  /** Builder step: show “Clear all”. Hidden on Page Information / Additional Settings. Default `true`. */
  showClearAll?: boolean;
  /** Required when `showClearAll` is true. */
  onClearAll?: () => void;
  /** When true, “Clear all” is non-interactive (e.g. nothing to clear). */
  clearAllDisabled?: boolean;
  /** Outline / secondary CTA (back / previous stage). */
  secondaryLabel: string;
  onSecondary: () => void;
  /** Primary filled CTA (continue / save). */
  primaryLabel: string;
  onPrimary: () => void;
  /** Disable primary (e.g. form invalid). */
  primaryDisabled?: boolean;
  /** `success`: green primary (e.g. Save & Publish). */
  primaryEmphasis?: "default" | "success";
  /** Accessible label for the footer landmark. */
  ariaLabel?: string;
}

/**
 * Sticky bottom bar for full-page wizard flows (Payment Pages: Page Info, Builder, Additional Settings).
 * Left: assistive text + optional “Clear all”; right: secondary + primary (UMP button styles).
 */
export function PageLevelMenu({
  assistiveText = "Assistive text",
  showClearAll = true,
  onClearAll,
  clearAllDisabled = false,
  secondaryLabel,
  onSecondary,
  primaryLabel,
  onPrimary,
  primaryDisabled = false,
  primaryEmphasis = "default",
  ariaLabel = "Page actions",
}: PageLevelMenuProps) {
  const primaryClass =
    primaryEmphasis === "success"
      ? primaryDisabled
        ? "bg-[#ebebeb] text-[#acacac] opacity-64 cursor-not-allowed"
        : "bg-[#21c179] hover:bg-[#1aa866] text-white"
      : primaryDisabled
        ? "bg-[#ebebeb] text-[#acacac] opacity-64 cursor-not-allowed"
        : "bg-[#004299] hover:bg-[#012A72] text-white";

  return (
    <footer
      aria-label={ariaLabel}
      className="sticky bottom-0 z-20 flex shrink-0 items-center justify-between gap-6 border-t border-[#e0e0e0] bg-[#f5f9fe] px-[32px] py-4 shadow-[0_-2px_12px_rgba(16,16,16,0.06)]"
    >
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-[12px] leading-[16px] text-[#101010]">
          {assistiveText}
        </span>
        {showClearAll && onClearAll && (
          <button
            type="button"
            onClick={onClearAll}
            disabled={clearAllDisabled}
            className={[
              "w-fit text-left text-[14px] font-semibold leading-[20px]",
              clearAllDisabled
                ? "text-[#acacac] cursor-not-allowed"
                : "text-[#004299] hover:underline",
            ].join(" ")}
          >
            Clear all
          </button>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={onSecondary}
          className="flex min-w-[120px] items-center justify-center rounded-[8px] border border-[#004299] px-4 py-2.5 text-[14px] font-semibold leading-[20px] text-[#004299] transition-colors hover:border-[#012A72] hover:bg-[#f7f9fd] hover:text-[#012A72]"
        >
          {secondaryLabel}
        </button>
        <button
          type="button"
          onClick={onPrimary}
          disabled={primaryDisabled}
          className={`flex min-w-[120px] items-center justify-center rounded-[8px] px-4 py-2.5 text-[14px] font-semibold leading-[20px] transition-colors ${primaryClass}`}
        >
          {primaryLabel}
        </button>
      </div>
    </footer>
  );
}
