import { StepWizard } from "./StepWizard";
import { PageLevelMenu } from "./PageLevelMenu";
import { TextField } from "../TextField";
import type { BuilderStep, PageInfo } from "./types";

interface PageInfoFormProps {
  currentStep: BuilderStep;
  onBack: () => void;
  onNext: () => void;
  pageInfo: PageInfo;
  onPageInfoChange: (info: PageInfo) => void;
}

const PAGE_CATEGORIES = [
  "Education",
  "Donations",
  "Events",
  "eCommerce",
  "Services",
  "Subscriptions",
  "Other",
];

export function PageInfoForm({ currentStep, onBack, onNext, pageInfo, onPageInfoChange }: PageInfoFormProps) {
  const form = pageInfo;

  const update = (field: keyof PageInfo, value: string) =>
    onPageInfoChange({ ...form, [field]: value });

  const isValid =
    form.pageName.trim() &&
    form.pageCategory.trim() &&
    form.businessEmail.trim() &&
    form.businessPhone.trim() &&
    form.browserTabTitle.trim();

  return (
    <div className="flex min-h-full min-h-0 flex-col bg-[#ffffff]">
      <StepWizard currentStep={currentStep} />

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 px-[32px] pt-0 pb-4">
          <div className="flex w-full min-w-0 flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-[24px] font-semibold text-[#101010]">Page Information</h2>
              <p className="text-[14px] font-normal leading-[20px] text-[#7e7e7e]">
                Provide basic details about your payment page.
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-6 md:gap-y-5">
              <div className="min-w-0">
                <TextField
                  label="Payment Page Name"
                  required
                  value={form.pageName}
                  onChange={(v) => update("pageName", v)}
                  assistiveText="e.g. Spring Semester Fees 2026"
                />
              </div>
              <div className="min-w-0">
                <CategorySelect
                  value={form.pageCategory}
                  onChange={(v) => update("pageCategory", v)}
                />
              </div>
              <div className="min-w-0">
                <TextField
                  label="Business Email"
                  required
                  type="email"
                  value={form.businessEmail}
                  onChange={(v) => update("businessEmail", v)}
                  assistiveText="Displayed on the payment page"
                />
              </div>
              <div className="min-w-0">
                <TextField
                  label="Business Phone Number"
                  required
                  value={form.businessPhone}
                  onChange={(v) => update("businessPhone", v)}
                  assistiveText="Contact number for customer queries"
                />
              </div>
              <div className="min-w-0">
                <TextField
                  label="Payment Page Expiry Date"
                  type="date"
                  value={form.expiryDate}
                  onChange={(v) => update("expiryDate", v)}
                  assistiveText="Leave empty for no expiry"
                />
              </div>
              <div className="min-w-0">
                <TextField
                  label="Browser Tab Display Name"
                  required
                  value={form.browserTabTitle}
                  onChange={(v) => update("browserTabTitle", v)}
                  assistiveText="Title shown in the browser tab"
                />
              </div>
            </div>
          </div>
        </div>

        <PageLevelMenu
          showClearAll={false}
          assistiveText="Fill all required fields to continue."
          secondaryLabel="Cancel"
          onSecondary={onBack}
          primaryLabel="Continue to Page Builder"
          onPrimary={onNext}
          primaryDisabled={!isValid}
          ariaLabel="Page information actions"
        />
      </div>
    </div>
  );
}

function CategorySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={[
          "relative flex h-[56px] items-center rounded-[4px] border transition-colors",
          value
            ? "border-[#e0e0e0] hover:border-[#004299]"
            : "border-[#e0e0e0] hover:border-[#004299]",
        ].join(" ")}
      >
        <div className="relative flex-1 h-full px-[16px]">
          <label
            className={[
              "absolute left-[16px] right-[16px] transition-all duration-150 pointer-events-none select-none truncate",
              value
                ? "top-[8px] text-[12px] font-normal leading-[16px] text-[#7e7e7e]"
                : "top-1/2 -translate-y-1/2 text-[14px] font-semibold text-[#7e7e7e]",
            ].join(" ")}
          >
            Payment Page Category<span className="text-[#fd5154] ml-0.5">*</span>
          </label>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={[
              "w-full h-full bg-transparent outline-none text-[14px] text-[#101010] appearance-none cursor-pointer",
              value ? "pt-[24px] pb-[8px]" : "",
            ].join(" ")}
          >
            <option value="" disabled hidden />
            {PAGE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="pr-[16px] pointer-events-none">
          <svg className="size-4 text-[#7e7e7e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <p className="text-[12px] leading-[16px] text-[#acacac]">Select the type of payment page</p>
    </div>
  );
}
