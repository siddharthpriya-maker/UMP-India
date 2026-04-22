import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();
  const listboxId = useId();

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="flex flex-col gap-1">
      <div ref={rootRef} className={`relative ${open ? "z-30" : "z-0"}`}>
        <button
          id={triggerId}
          type="button"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? listboxId : undefined}
          className={[
            "flex h-[56px] w-full items-stretch rounded-[4px] border bg-white text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-0",
            open
              ? "border-[#004299]"
              : "border-[#e0e0e0] hover:border-[#004299]",
          ].join(" ")}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative min-w-0 flex-1 px-[16px]">
            <span
              id={`${triggerId}-label`}
              className={[
                "absolute left-[16px] right-[16px] select-none truncate transition-all duration-150",
                value
                  ? "top-[8px] text-[12px] font-normal leading-[16px] text-[#7e7e7e]"
                  : "top-1/2 -translate-y-1/2 text-[14px] font-semibold text-[#7e7e7e]",
              ].join(" ")}
            >
              Payment Page Category<span className="ml-0.5 text-[#fd5154]">*</span>
            </span>
            {value ? (
              <span className="absolute left-[16px] right-[16px] top-[24px] truncate text-[14px] font-semibold text-[#101010]">
                {value}
              </span>
            ) : null}
          </span>
          <span className="flex shrink-0 items-center pr-[16px]" aria-hidden>
            <ChevronDown
              className={`size-4 text-[#7e7e7e] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </span>
        </button>

        {open ? (
          <div
            id={listboxId}
            role="listbox"
            aria-labelledby={`${triggerId}-label`}
            className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-[#e0e0e0] bg-white shadow-lg"
          >
            <div className="max-h-[min(280px,50vh)] overflow-y-auto py-1">
              <div className="flex flex-col">
                {PAGE_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="option"
                    aria-selected={value === cat}
                    className={[
                      "w-full px-4 py-2.5 text-left text-[14px] text-[#101010] transition-colors hover:bg-[#EBEBEB]",
                      value === cat ? "bg-[#EBEBEB] font-semibold" : "",
                    ].join(" ")}
                    onClick={() => {
                      onChange(cat);
                      setOpen(false);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <p className="text-[12px] leading-[16px] text-[#acacac]">Select the type of payment page</p>
    </div>
  );
}
