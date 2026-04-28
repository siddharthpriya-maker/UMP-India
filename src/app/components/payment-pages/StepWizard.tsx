import { Check } from "lucide-react";
import type { BuilderStep } from "./types";

const steps: { key: BuilderStep; label: string }[] = [
  { key: "info", label: "Page Information" },
  { key: "builder", label: "Page Builder" },
  { key: "settings", label: "Additional Settings" },
];

const stepOrder: BuilderStep[] = ["info", "builder", "settings"];

interface StepWizardProps {
  currentStep: BuilderStep;
}

function StepIndicator({
  index,
  isCompleted,
  isActive,
}: {
  index: number;
  isCompleted: boolean;
  isActive: boolean;
}) {
  if (isCompleted) {
    return (
      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#22C55E] text-white shadow-sm"
        aria-hidden
      >
        <Check className="size-[18px]" strokeWidth={2.5} />
      </div>
    );
  }
  if (isActive) {
    return (
      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-[#22C55E] bg-transparent text-[14px] font-semibold leading-none text-[#22C55E]"
        aria-hidden
      >
        {index + 1}
      </div>
    );
  }
  return (
    <div
      className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-[#e0e0e0] bg-[#ffffff] text-[14px] font-semibold leading-none text-[#7e7e7e]"
      aria-hidden
    >
      {index + 1}
    </div>
  );
}

export function StepWizard({ currentStep }: StepWizardProps) {
  const currentIdx = stepOrder.indexOf(currentStep);

  return (
    <nav
      aria-label="Create payment page steps"
      className="w-full shrink-0 bg-[#ffffff] px-[32px] pb-5 pt-0"
    >
      <div className="w-full rounded-[12px] border border-[#e0e0e0] bg-white px-6 py-5 shadow-[0_1px_3px_rgba(16,16,16,0.06)] sm:px-8">
        <ul className="flex w-full list-none flex-wrap items-center justify-center gap-y-4 p-0">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentIdx;
          const isActive = idx === currentIdx;
          const segmentCompleted = idx < currentIdx;

          return (
            <li key={step.key} className="flex items-center">
              <div className="flex items-center gap-3">
                <StepIndicator index={idx} isCompleted={isCompleted} isActive={isActive} />
                <span
                  className={`max-w-[200px] text-left text-[13px] leading-5 sm:max-w-[260px] sm:text-[14px] ${
                    isCompleted
                      ? "font-semibold text-[#22C55E]"
                      : isActive
                        ? "font-semibold text-[#101010]"
                        : "font-medium text-[#7e7e7e]"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {idx < steps.length - 1 && (
                <div
                  className={`mx-3 h-0 w-12 shrink-0 border-t-2 border-dashed sm:mx-4 sm:w-20 md:w-24 ${
                    segmentCompleted ? "border-[#22C55E]" : "border-[#e0e0e0]"
                  }`}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
        </ul>
      </div>
    </nav>
  );
}
