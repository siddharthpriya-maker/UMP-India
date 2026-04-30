import type { ReactNode } from "react";
import chevronLeftOutlinedUrl from "../../../assets/icons/chevron_left_outlined.svg";

export interface WizardStepHeaderProps {
  title: string;
  /** Supporting line under the title; omit for title-only headers (e.g. Page builder). */
  description?: string;
  /** When set, shows a back control to the left of the title inside the same horizontal padding. */
  onBack?: () => void;
  /** Omit horizontal padding (e.g. Page builder aligns with full-width chrome below). */
  flushHorizontal?: boolean;
  /** Right-side actions on the same row (e.g. Page builder preview controls). */
  trailing?: ReactNode;
  /** Bottom rule under the header row (e.g. when `trailing` separates from canvas). */
  borderBottom?: boolean;
}

/**
 * Page title and optional supporting line below the step progress bar, aligned with
 * module headers such as **Payment Pages** (`text-[20px] font-semibold` + optional `text-[#7e7e7e]` body). When both title and description are shown, use **`gap-2`** between lines, matching **Reports** section intro stacks.
 */
export function WizardStepHeader({
  title,
  description,
  onBack,
  flushHorizontal,
  trailing,
  borderBottom,
}: WizardStepHeaderProps) {
  const trimmedDescription = description?.trim() ?? "";
  const showDescription = trimmedDescription.length > 0;

  const titleColumn = (
    <div
      className={`flex min-w-0 flex-col ${showDescription ? "gap-2" : ""} ${trailing ? "min-w-0 flex-1" : "max-w-[720px] flex-1"}`}
    >
      <h1 className="min-w-0 truncate text-[20px] font-semibold leading-[28px] text-[#101010]">{title}</h1>
      {showDescription ? (
        <p className="text-[12px] leading-[20px] text-[#7e7e7e]">{trimmedDescription}</p>
      ) : null}
    </div>
  );

  const backButton = onBack ? (
    <button
      type="button"
      onClick={onBack}
      className="shrink-0 rounded-sm p-1 text-[#101010] transition-colors hover:bg-[#f5f9fe] hover:text-[#004299] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      aria-label="Back to previous step"
    >
      <img src={chevronLeftOutlinedUrl} alt="" width={24} height={24} className="block size-6" />
    </button>
  ) : null;

  return (
    <div
      className={`w-full shrink-0 bg-white pb-4 pt-0 ${flushHorizontal ? "" : "px-[32px]"} ${borderBottom ? "border-b border-[#e0e0e0]" : ""}`}
    >
      {trailing ? (
        <div className="flex min-w-0 items-center justify-between gap-3 pr-8">
          <div className="flex min-w-0 flex-1 items-center gap-0">
            {backButton}
            {titleColumn}
          </div>
          <div className="shrink-0">{trailing}</div>
        </div>
      ) : (
        <div className="flex min-w-0 items-center gap-2">
          {backButton}
          {titleColumn}
        </div>
      )}
    </div>
  );
}
