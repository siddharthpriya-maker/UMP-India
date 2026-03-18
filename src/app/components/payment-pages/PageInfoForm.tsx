import { useState } from "react";
import { StepWizard } from "./StepWizard";
import { TextField } from "../TextField";
import type { BuilderStep, PageInfo } from "./types";

interface PageInfoFormProps {
  currentStep: BuilderStep;
  onBack: () => void;
  onNext: () => void;
}

const emptyPageInfo: Omit<PageInfo, "coverImage"> = {
  formName: "",
  urlPath: "",
  htmlTitle: "",
  supportContact: "",
  supportEmail: "",
  freezeDate: "",
};

export function PageInfoForm({ currentStep, onBack, onNext }: PageInfoFormProps) {
  const [form, setForm] = useState(emptyPageInfo);

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isValid = form.formName.trim() && form.urlPath.trim() && form.htmlTitle.trim();

  return (
    <div className="flex flex-col min-h-full bg-[#ffffff]">
      <StepWizard currentStep={currentStep} />

      <div className="flex-1 flex justify-center px-[32px] pb-[32px]">
        <div className="w-full max-w-[640px] flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-[24px] font-semibold text-[#101010]">Page Information</h2>
            <p className="text-[14px] text-[#7e7e7e] leading-[20px]">
              Provide basic details about your payment page.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <TextField
              label="Form Name"
              required
              value={form.formName}
              onChange={(v) => update("formName", v)}
              assistiveText="e.g. Spring Semester Fees 2026"
            />

            <TextField
              label="URL Path"
              required
              value={form.urlPath}
              onChange={(v) => update("urlPath", v)}
              prefix="paytm.com/"
            />

            <TextField
              label="HTML Title"
              required
              value={form.htmlTitle}
              onChange={(v) => update("htmlTitle", v)}
              assistiveText="Title displayed in browser tab"
            />

            <div className="grid grid-cols-2 gap-5">
              <TextField
                label="Support Contact"
                value={form.supportContact}
                onChange={(v) => update("supportContact", v)}
              />
              <TextField
                label="Support Email"
                type="email"
                value={form.supportEmail}
                onChange={(v) => update("supportEmail", v)}
              />
            </div>

            <TextField
              label="Freeze Date"
              type="date"
              value={form.freezeDate}
              onChange={(v) => update("freezeDate", v)}
            />
          </div>

          <div className="flex items-center gap-5 pt-4">
            <button
              onClick={onBack}
              className="flex items-center justify-center border border-[#004299] text-[#004299] hover:bg-[#e7f1f8] hover:border-[#009de5] hover:text-[#009de5] text-[14px] leading-[20px] font-semibold px-4 py-2.5 min-w-[120px] rounded-[8px] transition-colors"
            >
              Back
            </button>
            <button
              onClick={onNext}
              disabled={!isValid}
              className={`flex items-center justify-center flex-1 text-[14px] leading-[20px] font-semibold px-4 py-2.5 min-w-[120px] rounded-[8px] transition-colors ${
                isValid
                  ? "bg-[#004299] hover:bg-[#009de5] text-white"
                  : "bg-[#ebebeb] text-[#acacac] opacity-64 cursor-not-allowed"
              }`}
            >
              Continue to Page Builder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
