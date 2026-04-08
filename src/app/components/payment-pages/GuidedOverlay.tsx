import { Check, ArrowRight, X } from "lucide-react";
import type { SectionId, StructuredPageState } from "./builder-types";
import { SECTION_ORDER, SECTION_META, isSectionComplete } from "./builder-types";

interface GuidedOverlayProps {
  pageState: StructuredPageState;
  currentGuideSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onDismiss: () => void;
}

export function GuidedOverlay({
  pageState,
  currentGuideSection,
  onSelectSection,
  onDismiss,
}: GuidedOverlayProps) {
  const completedCount = SECTION_ORDER.filter((s) => isSectionComplete(s, pageState)).length;
  const progress = (completedCount / SECTION_ORDER.length) * 100;

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
      <div className="mx-4 w-full max-w-[440px] overflow-hidden rounded-[20px] bg-white shadow-2xl">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#004299] to-[#009de5] px-6 pb-6 pt-5 text-white">
          <button
            type="button"
            onClick={onDismiss}
            className="absolute right-4 top-4 flex size-7 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
          >
            <X className="size-3.5" />
          </button>
          <h2 className="text-[18px] font-bold leading-[24px]">Set up your payment page</h2>
          <p className="mt-1 text-[13px] leading-[18px] text-white/80">
            Complete each section to create your page.
          </p>
          {/* Progress bar */}
          <div className="mt-4 h-[4px] overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="mt-1 text-[11px] text-white/60">
            {completedCount} of {SECTION_ORDER.length} sections complete
          </span>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-1 p-3">
          {SECTION_ORDER.map((sectionId, idx) => {
            const done = isSectionComplete(sectionId, pageState);
            const isCurrent = sectionId === currentGuideSection;
            const meta = SECTION_META[sectionId];

            return (
              <button
                key={sectionId}
                type="button"
                onClick={() => onSelectSection(sectionId)}
                className={[
                  "flex items-center gap-3 rounded-[12px] px-4 py-3 text-left transition-all",
                  isCurrent && !done
                    ? "bg-[#f5f9fe] shadow-[0_0_0_2px_#004299]"
                    : "hover:bg-[#fafafa]",
                ].join(" ")}
              >
                {/* Step indicator */}
                <div
                  className={[
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold transition-colors",
                    done
                      ? "bg-[#22C55E] text-white"
                      : isCurrent
                        ? "border-2 border-[#004299] text-[#004299]"
                        : "border-2 border-[#e0e0e0] text-[#ccc]",
                  ].join(" ")}
                >
                  {done ? <Check className="size-4" strokeWidth={2.5} /> : idx + 1}
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <span
                    className={[
                      "text-[13px] font-semibold",
                      done ? "text-[#22C55E]" : isCurrent ? "text-[#101010]" : "text-[#7e7e7e]",
                    ].join(" ")}
                  >
                    {meta.label}
                  </span>
                  <span className="text-[11px] text-[#acacac]">{meta.guideCopy}</span>
                </div>

                {isCurrent && !done && (
                  <ArrowRight className="size-4 shrink-0 text-[#004299]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom action */}
        <div className="border-t border-[#f0f0f0] px-6 py-4">
          <button
            type="button"
            onClick={onDismiss}
            className="w-full rounded-[10px] bg-[#004299] py-2.5 text-center text-[13px] font-semibold text-white transition-colors hover:bg-[#003580]"
          >
            {completedCount === 0 ? "Get Started" : completedCount === SECTION_ORDER.length ? "Done — Continue" : "Continue Building"}
          </button>
        </div>
      </div>
    </div>
  );
}
