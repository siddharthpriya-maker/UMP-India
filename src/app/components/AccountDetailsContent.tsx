import { useState, useCallback, useRef } from "react";
import { PrimaryButton, TertiaryButton } from "./Button";
import { TextField } from "./TextField";

const initialForm = {
  displayName: "Tata cliq",
  businessEmail: "merchant@tatacliq.com",
  mobile: "+91 98765 43210",
  alternatePhone: "",
  website: "https://www.tatacliq.com",
  addressLine1: "Voltas House, Dr Babasaheb Ambedkar Road",
  addressLine2: "Chinchpokli",
  city: "Mumbai",
  state: "Maharashtra",
  pinCode: "400033",
  gstin: "27AAAAA0000A1Z5",
  businessCategory: "eCommerce",
};

export function AccountDetailsContent() {
  const baselineRef = useRef({ ...initialForm });
  const [form, setForm] = useState(() => ({ ...initialForm }));

  const set =
    (key: keyof typeof initialForm) => (value: string) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  const handleDiscard = useCallback(() => {
    setForm({ ...baselineRef.current });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[14px] leading-[20px] text-[#7e7e7e] max-w-[720px]">
        Keep your business and contact details up to date. These details appear on receipts and
        settlement communications.
      </p>

      {/* Business identity */}
      <div className="flex flex-col gap-4 rounded-[12px] border border-[#e0e0e0] bg-white p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div
            className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#e7f1f8] text-[20px] font-semibold text-[#004299] md:size-20 md:text-[24px]"
            aria-hidden
          >
            TC
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <div>
              <h2 className="text-[18px] font-semibold leading-[24px] text-[#101010]">
                {form.displayName}
              </h2>
              <p className="text-[12px] leading-[16px] text-[#7e7e7e]">Merchant ID</p>
              <p className="text-[14px] font-medium leading-[20px] text-[#101010]">
                Tatadelhi2345678987
              </p>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2 md:justify-end">
          <TertiaryButton type="button" size="medium" className="whitespace-nowrap">
            Change logo
          </TertiaryButton>
        </div>
      </div>

      {/* Contact */}
      <section className="overflow-hidden rounded-[12px] border border-[#e0e0e0] bg-white">
        <header className="border-b border-[#e0e0e0] bg-[#fafafa] px-6 py-4">
          <h3 className="text-[16px] font-semibold leading-[22px] text-[#101010]">
            Contact information
          </h3>
          <p className="mt-1 text-[12px] leading-[16px] text-[#7e7e7e]">
            Used for invoices, OTPs, and important account alerts.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 p-6 md:grid-cols-2">
          <div className="min-w-0">
            <TextField
              label="Display name"
              value={form.displayName}
              onChange={set("displayName")}
              required
            />
          </div>
          <div className="min-w-0">
            <TextField
              label="Business email"
              value={form.businessEmail}
              onChange={set("businessEmail")}
              type="email"
              required
            />
          </div>
          <div className="min-w-0">
            <TextField
              label="Registered mobile"
              value={form.mobile}
              onChange={set("mobile")}
              type="text"
              required
            />
          </div>
          <div className="min-w-0">
            <TextField
              label="Alternate phone (optional)"
              value={form.alternatePhone}
              onChange={set("alternatePhone")}
              type="text"
            />
          </div>
          <div className="min-w-0 md:col-span-2">
            <TextField label="Website" value={form.website} onChange={set("website")} type="url" />
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="overflow-hidden rounded-[12px] border border-[#e0e0e0] bg-white">
        <header className="border-b border-[#e0e0e0] bg-[#fafafa] px-6 py-4">
          <h3 className="text-[16px] font-semibold leading-[22px] text-[#101010]">
            Registered business address
          </h3>
          <p className="mt-1 text-[12px] leading-[16px] text-[#7e7e7e]">
            Must match your GST registration where applicable.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 p-6 md:grid-cols-2">
          <div className="min-w-0 md:col-span-2">
            <TextField
              label="Address line 1"
              value={form.addressLine1}
              onChange={set("addressLine1")}
              required
            />
          </div>
          <div className="min-w-0 md:col-span-2">
            <TextField
              label="Address line 2 (optional)"
              value={form.addressLine2}
              onChange={set("addressLine2")}
            />
          </div>
          <div className="min-w-0">
            <TextField label="City" value={form.city} onChange={set("city")} required />
          </div>
          <div className="min-w-0">
            <TextField label="State" value={form.state} onChange={set("state")} required />
          </div>
          <div className="min-w-0">
            <TextField label="PIN code" value={form.pinCode} onChange={set("pinCode")} required />
          </div>
          <div className="min-w-0">
            <TextField
              label="Business category"
              value={form.businessCategory}
              onChange={set("businessCategory")}
              required
            />
          </div>
        </div>
      </section>

      {/* Tax */}
      <section className="overflow-hidden rounded-[12px] border border-[#e0e0e0] bg-white">
        <header className="border-b border-[#e0e0e0] bg-[#fafafa] px-6 py-4">
          <h3 className="text-[16px] font-semibold leading-[22px] text-[#101010]">
            Tax &amp; compliance
          </h3>
          <p className="mt-1 text-[12px] leading-[16px] text-[#7e7e7e]">
            GSTIN is verified with the government directory. Contact support to update.
          </p>
        </header>
        <div className="p-6">
          <div className="max-w-full md:max-w-[calc(50%-12px)]">
            <TextField
              label="GSTIN"
              value={form.gstin}
              onChange={set("gstin")}
              disabled
              assistiveText="Locked after verification."
            />
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <PrimaryButton type="button" size="medium">
          Save changes
        </PrimaryButton>
        <TertiaryButton type="button" size="medium" onClick={handleDiscard}>
          Discard
        </TertiaryButton>
      </div>
    </div>
  );
}
