import { useState } from "react";
import { StepWizard } from "./StepWizard";
import { TextField } from "../TextField";
import type { BuilderStep, AdditionalSettingsData } from "./types";

interface AdditionalSettingsProps {
  currentStep: BuilderStep;
  onBack: () => void;
  onNext: () => void;
}

const defaultSettings: AdditionalSettingsData = {
  postTransaction: {
    redirectUrl: "",
    successMessage: "Thank you for your payment! Your transaction has been completed successfully.",
  },
  notifications: {
    sendSms: true,
    smsText: "Payment of ₹{amount} received successfully. Transaction ID: {txnId}. Thank you!",
    sendEmail: true,
    emailSubject: "Payment Confirmation - {pageName}",
    emailBody: "Dear {name},\n\nYour payment of ₹{amount} has been received successfully.\n\nTransaction ID: {txnId}\nDate: {date}\n\nThank you for your payment.\n\nRegards,\n{merchantName}",
  },
};

export function AdditionalSettings({ currentStep, onBack, onNext }: AdditionalSettingsProps) {
  const [activeTab, setActiveTab] = useState<"post" | "notifications">("post");
  const [settings, setSettings] = useState<AdditionalSettingsData>(defaultSettings);

  const updatePost = (key: keyof typeof settings.postTransaction, value: string) =>
    setSettings((prev) => ({
      ...prev,
      postTransaction: { ...prev.postTransaction, [key]: value },
    }));

  const updateNotif = (key: keyof typeof settings.notifications, value: unknown) =>
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }));

  return (
    <div className="flex flex-col min-h-full bg-[#ffffff]">
      <StepWizard currentStep={currentStep} />

      <div className="flex-1 flex justify-center px-[32px] pb-[32px]">
        <div className="w-full max-w-[640px] flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-[24px] font-semibold text-[#101010]">Additional Settings</h2>
            <p className="text-[14px] text-[#7e7e7e] leading-[20px]">
              Configure post-transaction behaviour and notification preferences.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-[32px] relative">
            {(
              [
                { key: "post" as const, label: "Post Transaction" },
                { key: "notifications" as const, label: "Notifications" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 text-[18px] transition-colors relative ${
                  activeTab === tab.key
                    ? "font-bold text-[#004299]"
                    : "font-normal text-[#101010] hover:text-[#004299]"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#004299] rounded-full" />
                )}
              </button>
            ))}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#e0e0e0]" />
          </div>

          {/* Tab content */}
          {activeTab === "post" && (
            <div className="flex flex-col gap-5">
              <TextField
                label="Redirect URL"
                type="url"
                value={settings.postTransaction.redirectUrl}
                onChange={(v) => updatePost("redirectUrl", v)}
                assistiveText="URL where users will be redirected after payment completion."
              />
              <TextField
                label="Success Message"
                value={settings.postTransaction.successMessage}
                onChange={(v) => updatePost("successMessage", v)}
                multiline
                rows={3}
                assistiveText="Message displayed to users after a successful transaction."
              />
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="flex flex-col gap-6">
              {/* SMS */}
              <div className="flex flex-col gap-4 p-5 border border-[#e0e0e0] rounded-[12px]">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-semibold text-[#101010]">SMS Notification</span>
                    <span className="text-[12px] text-[#7e7e7e]">Send SMS to users on successful payment.</span>
                  </div>
                  <ToggleSwitch
                    checked={settings.notifications.sendSms}
                    onChange={(v) => updateNotif("sendSms", v)}
                  />
                </div>
                {settings.notifications.sendSms && (
                  <TextField
                    label="SMS Text"
                    value={settings.notifications.smsText}
                    onChange={(v) => updateNotif("smsText", v)}
                    multiline
                    rows={2}
                    assistiveText="Variables: {amount}, {txnId}, {name}, {date}"
                  />
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-4 p-5 border border-[#e0e0e0] rounded-[12px]">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-semibold text-[#101010]">Email Notification</span>
                    <span className="text-[12px] text-[#7e7e7e]">Send email to users on successful payment.</span>
                  </div>
                  <ToggleSwitch
                    checked={settings.notifications.sendEmail}
                    onChange={(v) => updateNotif("sendEmail", v)}
                  />
                </div>
                {settings.notifications.sendEmail && (
                  <div className="flex flex-col gap-4">
                    <TextField
                      label="Email Subject"
                      value={settings.notifications.emailSubject}
                      onChange={(v) => updateNotif("emailSubject", v)}
                    />
                    <TextField
                      label="Email Body"
                      value={settings.notifications.emailBody}
                      onChange={(v) => updateNotif("emailBody", v)}
                      multiline
                      rows={6}
                      assistiveText="Variables: {amount}, {txnId}, {name}, {date}, {pageName}, {merchantName}"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center gap-5 pt-4">
            <button
              onClick={onBack}
              className="flex items-center justify-center border border-[#004299] text-[#004299] hover:bg-[#e7f1f8] hover:border-[#009de5] hover:text-[#009de5] text-[14px] leading-[20px] font-semibold px-4 py-2.5 min-w-[120px] rounded-[8px] transition-colors"
            >
              Back to Builder
            </button>
            <button
              onClick={onNext}
              className="flex items-center justify-center bg-[#21c179] hover:bg-[#1aa866] text-white text-[14px] leading-[20px] font-semibold px-4 py-2.5 min-w-[120px] rounded-[8px] transition-colors flex-1"
            >
              Save & Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-[44px] h-[24px] rounded-full transition-colors relative shrink-0 ${
        checked ? "bg-[#004299]" : "bg-[#e0e0e0]"
      }`}
    >
      <div
        className={`absolute top-[2px] size-[20px] rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-[2px]"
        }`}
      />
    </button>
  );
}
