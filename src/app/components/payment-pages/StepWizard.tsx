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

export function StepWizard({ currentStep }: StepWizardProps) {
  const currentIdx = stepOrder.indexOf(currentStep);

  return (
    <div className="flex items-center justify-center gap-0 py-6">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentIdx;
        const isActive = idx === currentIdx;

        return (
          <div key={step.key} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`size-8 rounded-full flex items-center justify-center text-[14px] font-semibold shrink-0 ${
                  isCompleted
                    ? "bg-[#21c179] text-white"
                    : isActive
                    ? "bg-[#004299] text-white"
                    : "bg-[#e0e0e0] text-white"
                }`}
              >
                {isCompleted ? <Check className="size-4" /> : idx + 1}
              </div>
              <span
                className={`text-[14px] whitespace-nowrap ${
                  isActive
                    ? "font-semibold text-[#004299]"
                    : isCompleted
                    ? "font-semibold text-[#21c179]"
                    : "text-[#7e7e7e]"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`w-[60px] h-[2px] mx-4 ${
                  idx < currentIdx ? "bg-[#21c179]" : "bg-[#e0e0e0]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
