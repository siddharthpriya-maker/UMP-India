import type { ReactNode } from "react";

export interface PageLevelMenuProps {
  /** Muted line above the clear action (e.g. helper copy). */
  assistiveText?: ReactNode;
  /** Called when the user clicks “Clear all”. */
  onClearAll: () => void;
  /** Outline / secondary CTA (e.g. back). */
  secondaryLabel: string;
  onSecondary: () => void;
  /** Primary filled CTA (e.g. save & continue). */
  primaryLabel: string;
  onPrimary: () => void;
  /** Accessible label for the footer landmark. */
  ariaLabel?: string;
}

/**
 * Sticky bottom bar for full-page flows (e.g. Payment Page Builder).
 * Left: assistive text + “Clear all”; right: secondary + primary buttons (UMP button styles).
 */
export function PageLevelMenu({
  assistiveText = "Assistive text",
  onClearAll,
  secondaryLabel,
  onSecondary,
  primaryLabel,
  onPrimary,
  ariaLabel = "Page actions",
}: PageLevelMenuProps) {
  return (
    <footer
      aria-label={ariaLabel}
      className="sticky bottom-0 z-20 flex shrink-0 items-center justify-between gap-6 border-t border-[#e0e0e0] bg-[#f5f9fe] px-[32px] py-4 shadow-[0_-2px_12px_rgba(16,16,16,0.06)]"
    >
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-[12px] leading-[16px] text-[#7e7e7e]">
          {assistiveText}
        </span>
        <button
          type="button"
          onClick={onClearAll}
          className="w-fit text-left text-[14px] font-semibold leading-[20px] text-[#004299] hover:underline"
        >
          Clear all
        </button>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={onSecondary}
          className="flex min-w-[120px] items-center justify-center rounded-[8px] border border-[#004299] px-4 py-2.5 text-[14px] font-semibold leading-[20px] text-[#004299] transition-colors hover:border-[#009de5] hover:bg-[#e7f1f8] hover:text-[#009de5]"
        >
          {secondaryLabel}
        </button>
        <button
          type="button"
          onClick={onPrimary}
          className="flex min-w-[120px] items-center justify-center rounded-[8px] bg-[#004299] px-4 py-2.5 text-[14px] font-semibold leading-[20px] text-white transition-colors hover:bg-[#009de5]"
        >
          {primaryLabel}
        </button>
      </div>
    </footer>
  );
}
