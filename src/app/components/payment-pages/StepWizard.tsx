import type { BuilderStep } from "./types";

const steps: { key: BuilderStep; label: string }[] = [
  { key: "info", label: "Page information" },
  { key: "builder", label: "Page builder" },
  { key: "settings", label: "Additional settings" },
];

const stepOrder: BuilderStep[] = ["info", "builder", "settings"];

export interface StepWizardProps {
  currentStep: BuilderStep;
  /** Jump to a completed or current step. Upcoming steps are not interactive. */
  onStepSelect?: (step: BuilderStep) => void;
}

/**
 * Three-segment line progress (no step labels in the UI). Success green for
 * completed steps, brand blue for the current step, neutral track for upcoming.
 */
export function StepWizard({ currentStep, onStepSelect }: StepWizardProps) {
  const currentIdx = stepOrder.indexOf(currentStep);

  return (
    <nav
      aria-label="Create payment page steps"
      className="w-full min-w-0 shrink-0 bg-white px-[32px] py-4"
    >
      <ol className="m-0 flex w-full min-w-0 list-none items-stretch gap-2 p-0 sm:gap-3">
        {steps.map((step, idx) => {
          const isUpcoming = idx > currentIdx;
          const isCurrent = idx === currentIdx;
          const lineClass = isUpcoming
            ? "bg-[#e0e0e0]"
            : isCurrent
              ? "bg-[#004299]"
              : "bg-[#21c179]";

          const line = (
            <span
              aria-hidden
              className={`block h-1 w-full min-w-0 rounded-full transition-colors ${lineClass}`}
            />
          );

          if (isUpcoming) {
            return (
              <li key={step.key} className="min-w-0 flex-1">
                <div
                  className="flex w-full cursor-not-allowed flex-col justify-center"
                  title="Complete previous steps first"
                >
                  {line}
                </div>
                <span className="sr-only">
                  {step.label}, not yet available
                </span>
              </li>
            );
          }

          if (onStepSelect) {
            return (
              <li key={step.key} className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => onStepSelect(step.key)}
                  className="flex w-full min-w-0 flex-col justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  aria-current={idx === currentIdx ? "step" : undefined}
                  aria-label={
                    idx === currentIdx
                      ? `${step.label}, step ${idx + 1} of ${steps.length}, current`
                      : `${step.label}, step ${idx + 1} of ${steps.length}, go to this step`
                  }
                >
                  {line}
                </button>
              </li>
            );
          }

          return (
            <li
              key={step.key}
              className="min-w-0 flex-1"
              aria-current={idx === currentIdx ? "step" : undefined}
            >
              <div className="flex w-full flex-col justify-center">
                {line}
                <span className="sr-only">
                  {step.label}, step {idx + 1} of {steps.length}
                  {idx === currentIdx ? ", current" : ""}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
