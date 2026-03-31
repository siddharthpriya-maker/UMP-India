import { useState } from "react";
import { StepWizard } from "./StepWizard";
import { PageLevelMenu } from "./PageLevelMenu";
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
    <div className="flex min-h-full min-h-0 flex-col bg-[#ffffff]">
      <StepWizard currentStep={currentStep} />

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 px-[32px] pt-[32px] pb-4">
          <div className="flex w-full min-w-0 flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-[24px] font-semibold text-[#101010]">Page Information</h2>
              <p className="text-[14px] font-normal leading-[20px] text-[#7e7e7e]">
                Provide basic details about your payment page.
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-8 md:gap-y-5">
              <div className="min-w-0">
                <TextField
                  label="Form Name"
                  required
                  value={form.formName}
                  onChange={(v) => update("formName", v)}
                  assistiveText="e.g. Spring Semester Fees 2026"
                />
              </div>
              <div className="min-w-0">
                <TextField
                  label="HTML Title"
                  required
                  value={form.htmlTitle}
                  onChange={(v) => update("htmlTitle", v)}
                  assistiveText="Title displayed in browser tab"
                />
              </div>
              <div className="min-w-0 md:col-span-2">
                <TextField
                  label="URL Path"
                  required
                  value={form.urlPath}
                  onChange={(v) => update("urlPath", v)}
                  prefix="paytm.com/"
                />
              </div>
              <div className="min-w-0">
                <TextField
                  label="Support Contact"
                  value={form.supportContact}
                  onChange={(v) => update("supportContact", v)}
                />
              </div>
              <div className="min-w-0">
                <TextField
                  label="Support Email"
                  type="email"
                  value={form.supportEmail}
                  onChange={(v) => update("supportEmail", v)}
                />
              </div>
              <div className="min-w-0">
                <TextField
                  label="Freeze Date"
                  type="date"
                  value={form.freezeDate}
                  onChange={(v) => update("freezeDate", v)}
                />
              </div>
            </div>
          </div>
        </div>

        <PageLevelMenu
          showClearAll={false}
          assistiveText="Check required fields before continuing to the builder."
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
