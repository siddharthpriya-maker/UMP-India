export interface WizardStepHeaderProps {
  title: string;
  description: string;
}

/**
 * Page title and supporting line below the step progress bar, aligned with
 * module headers such as **Payment Pages** (`text-[32px] font-semibold` + `text-[#7e7e7e]` body on Reports / list patterns).
 */
export function WizardStepHeader({ title, description }: WizardStepHeaderProps) {
  return (
    <div className="w-full shrink-0 bg-white px-[32px] pb-4 pt-0">
      <h1 className="text-[32px] font-semibold leading-[40px] text-[#101010]">{title}</h1>
      <p className="mt-1 max-w-[720px] text-[14px] leading-[20px] text-[#7e7e7e]">{description}</p>
    </div>
  );
}
