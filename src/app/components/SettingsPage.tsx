import { useState } from "react";
import { Info } from "lucide-react";
import { PrimaryTabs } from "./Tabs";
import { SecondaryTabs } from "./Tabs";
import { DesignInProgress } from "./DesignInProgress";
import { UPIIcon } from "./Icons";

interface PaymentInstrument {
  icon: React.ReactNode;
  name: string;
  charges: React.ReactNode;
  status: string;
  hasActivateButton?: boolean;
  subLabel?: string;
  link?: string;
}


function CreditCardIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="#101010" strokeWidth="1.5" />
      <path d="M2 10H22" stroke="#101010" strokeWidth="1.5" />
      <path d="M6 14H10" stroke="#101010" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ToggleSwitch({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-[40px] h-[24px] rounded-full transition-colors ${
        active ? "bg-[#004299]" : "bg-[#cacaca]"
      }`}
    >
      <div
        className={`absolute top-[4px] size-[16px] rounded-full bg-white transition-transform ${
          active ? "left-[20px]" : "left-[4px]"
        }`}
      />
    </button>
  );
}

function PaymentSettingsContent() {
  const [activePaymentType, setActivePaymentType] = useState("qr");
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    rupay_upi_toggle: true,
    "Credit Card": false,
    "Debit Card": true,
    "Corporate Credit Card": true,
    "NEFT/ RTGS/ IMPS": true,
    "Brand EMI": true,
    "International Debit Card": true,
    "International Credit Card": true,
  });

  const paymentTypeTabs = [
    { label: "QR", value: "qr" },
    { label: "Card Machine", value: "card_machine" },
    { label: "Payment Links", value: "payment_links" },
  ];

  const qrInstruments: PaymentInstrument[] = [
    {
      icon: <UPIIcon />,
      name: "UPI",
      charges: <span className="text-[#21c179]">Free</span>,
      status: "Active",
    },
    {
      icon: <CreditCardIcon />,
      name: "Rupay Credit Card via UPI",
      charges: <></>,
      status: "Active",
    },
  ];

  const cardMachineInstruments: PaymentInstrument[] = [
    {
      icon: <CreditCardIcon />,
      name: "Credit Card",
      charges: (
        <div className="flex flex-col gap-1">
          <p className="text-[14px] leading-[24px]">
            <span className="text-[#7e7e7e]">Up to ₹20,000 / month : </span>
            <span className="text-[#101010]">3% + GST</span>
          </p>
          <p className="text-[14px] leading-[24px]">
            <span className="text-[#7e7e7e]">Between ₹20,000 to ₹40,000 / month : </span>
            <span className="text-[#101010]">4% + GST</span>
          </p>
          <p className="text-[14px] leading-[24px]">
            <span className="text-[#7e7e7e]">More than ₹40,000 / month : </span>
            <span className="text-[#101010]">5% + GST</span>
          </p>
          <a href="#" className="text-[#004299] text-[12px] font-semibold hover:underline mt-1">
            View Special Cards - Amex, Diners and Rupay
          </a>
        </div>
      ),
      status: "Inactive",
      hasActivateButton: true,
    },
    {
      icon: <CreditCardIcon />,
      name: "Debit Card",
      charges: (
        <div className="flex flex-col gap-1">
          <p className="text-[14px] leading-[24px] text-[#7e7e7e]">Up to ₹10,000 / month</p>
          <p className="text-[14px] leading-[24px] ml-4">
            <span className="text-[#7e7e7e]">Payment amount up to ₹5,000 : </span>
            <span className="text-[#101010]">₹3</span>
          </p>
          <p className="text-[14px] leading-[24px] ml-4">
            <span className="text-[#7e7e7e]">Payment amount more than ₹5,000 : </span>
            <span className="text-[#101010]">2% + GST</span>
          </p>
          <p className="text-[14px] leading-[24px]">
            <span className="text-[#7e7e7e]">More than ₹10,000 : </span>
            <span className="text-[#101010]">3.2% + GST</span>
          </p>
          <a href="#" className="text-[#004299] text-[12px] font-semibold hover:underline mt-1">
            View Special Cards - Amex, Diners and Rupay
          </a>
        </div>
      ),
      status: "Active",
    },
    {
      icon: <CreditCardIcon />,
      name: "Corporate Credit Card",
      charges: <span className="text-[14px] text-[#101010]">1.99% + GST</span>,
      status: "Active",
    },
    {
      icon: <CreditCardIcon />,
      name: "NEFT/ RTGS/ IMPS",
      charges: (
        <div className="flex flex-col gap-1">
          <p className="text-[14px] leading-[24px]">
            <span className="text-[#7e7e7e]">Up to ₹10,000 / month : </span>
            <span className="text-[#101010]">1% + GST / ₹10</span>
          </p>
          <p className="text-[14px] leading-[24px]">
            <span className="text-[#7e7e7e]">More than ₹10,000 / month : </span>
            <span className="text-[#101010]">0.5% + GST / ₹100</span>
          </p>
        </div>
      ),
      status: "Active",
      link: "Know More",
    },
    {
      icon: <CreditCardIcon />,
      name: "Brand EMI",
      subLabel: "Explore EMI offers by popular brands",
      charges: (
        <div className="flex flex-col gap-1">
          <p className="text-[14px] leading-[24px]">
            <span className="text-[#7e7e7e]">Up to ₹20,000 / month : </span>
            <span className="text-[#101010]">3% + GST</span>
          </p>
          <p className="text-[14px] leading-[24px]">
            <span className="text-[#7e7e7e]">Between ₹20,000 to ₹40,000 / month : </span>
            <span className="text-[#101010]">4% + GST</span>
          </p>
        </div>
      ),
      status: "Active",
    },
    {
      icon: <CreditCardIcon />,
      name: "International Debit Card",
      charges: (
        <div className="flex flex-col gap-1">
          <p className="text-[14px] leading-[24px] text-[#101010]">3% + GST non Currency Conversion</p>
          <p className="text-[14px] leading-[24px] text-[#101010]">2% + GST Currency Conversion</p>
        </div>
      ),
      status: "Active",
      link: "Know More",
    },
    {
      icon: <CreditCardIcon />,
      name: "International Credit Card",
      charges: (
        <div className="flex flex-col gap-1">
          <p className="text-[14px] leading-[24px] text-[#101010]">3% + GST non Currency Conversion</p>
          <p className="text-[14px] leading-[24px] text-[#101010]">2% + GST Currency Conversion</p>
        </div>
      ),
      status: "Active",
      link: "Know More",
    },
  ];

  const paymentInstruments =
    activePaymentType === "qr" ? qrInstruments : cardMachineInstruments;

  const handleToggle = (key: string) => {
    setToggleStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Payment Acceptance Limit Card */}
      <div className="rounded-[12px] overflow-hidden">
        <div className="bg-[#fafafa] p-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Limit */}
            <div className="flex flex-col gap-1">
              <p className="text-[14px] text-[#7e7e7e] leading-[20px]">
                Payment Acceptance Limit
              </p>
              <p className="text-[16px] font-semibold text-[#101010] leading-[24px]">
                ₹1,00,00,000 / month
              </p>
            </div>

            {/* Vertical Separator */}
            <div className="w-px h-[40px] bg-[#e0e0e0]" />

            {/* Remaining */}
            <div className="flex flex-col gap-1">
              <p className="text-[14px] text-[#7e7e7e] leading-[20px]">
                Remaining for this month
              </p>
              <p className="text-[16px] font-semibold text-[#21c179] leading-[24px]">
                ₹75,00,000
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-[12px] text-[#7e7e7e] leading-[16px] text-right max-w-[200px]">
              Collect payments from your customers without any limits
            </p>
            <button className="bg-[#004299] hover:bg-[#009de5] text-white text-[14px] font-semibold px-4 py-2.5 rounded-[8px] whitespace-nowrap transition-colors">
              Upgrade Account
            </button>
          </div>
        </div>

        <div className="h-px bg-[#e0e0e0]" />

        <div className="bg-[#fafafa] px-6 py-3">
          <p className="text-[12px] text-[#ff9d00] leading-[20px]">
            Acceptance limits for all types of methods is common.
          </p>
        </div>
      </div>

      {/* Payment Type Tabs */}
      <SecondaryTabs
        tabs={paymentTypeTabs}
        activeTab={activePaymentType}
        onTabChange={setActivePaymentType}
        variant="outlined"
        gap={16}
      />

      {/* Payment Instruments Table */}
      <div className="overflow-x-auto border border-[#e0e0e0] rounded-[12px]">
        <div className="min-w-[700px]">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_1.5fr_0.5fr] border-b border-[#e0e0e0]">
            <p className="text-[12px] uppercase tracking-[0.6px] font-semibold text-[#7e7e7e] leading-[16px] px-6 py-3 border-r border-[#e0e0e0]">
              Payment Instrument
            </p>
            <p className="text-[12px] uppercase tracking-[0.6px] font-semibold text-[#7e7e7e] leading-[16px] px-6 py-3 border-r border-[#e0e0e0]">
              Charges
            </p>
            <p className="text-[12px] uppercase tracking-[0.6px] font-semibold text-[#7e7e7e] leading-[16px] text-right px-6 py-3">
              Status
            </p>
          </div>

          {/* Table Rows */}
          {paymentInstruments.map((instrument, index) => {
            const isLastRow = index === paymentInstruments.length - 1;
            const borderClass = !isLastRow ? "border-b border-[#e0e0e0]" : "";

            if (instrument.name === "Rupay Credit Card via UPI") {
              return (
                <div
                  key={index}
                  className={`grid grid-cols-[1fr_1.5fr_0.5fr] grid-rows-[auto_1px_auto] hover:bg-[#f5f9fe] transition-colors ${borderClass}`}
                >
                  {/* Payment Instrument — merged cell spanning both sub-rows */}
                  <div className="row-span-3 flex items-center gap-3 px-6 py-4 border-r border-[#e0e0e0]">
                    <div className="shrink-0">{instrument.icon}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] text-[#101010] leading-[24px]">
                        {instrument.name}
                      </span>
                      <Info className="size-[18px] text-[#004299] shrink-0" />
                    </div>
                  </div>

                  {/* Sub-row 1: Charges */}
                  <div className="text-[14px] leading-[24px] px-6 py-4 border-r border-[#e0e0e0] flex items-center">
                    <p>
                      <span className="text-[#7e7e7e]">Up to ₹2,000 : </span>
                      <span className="text-[#21c179]">Free</span>
                    </p>
                  </div>
                  {/* Sub-row 1: Status */}
                  <div className="flex items-center justify-end px-6 py-4">
                    <span className="text-[14px] text-[#101010] leading-[24px]">Active</span>
                  </div>

                  {/* Separator — only spans Charges & Status columns */}
                  <div className="col-span-2 bg-[#e0e0e0]" />

                  {/* Sub-row 2: Charges */}
                  <div className="text-[14px] leading-[24px] px-6 py-4 border-r border-[#e0e0e0] flex items-center">
                    <p>
                      <span className="text-[#7e7e7e]">More than ₹2,000 : </span>
                      <span className="text-[#101010] line-through">1.99% + GST</span>
                      <span className="text-[#21c179] ml-2">Free</span>
                    </p>
                  </div>
                  {/* Sub-row 2: Status */}
                  <div className="flex items-center justify-end px-6 py-4">
                    <ToggleSwitch
                      active={toggleStates.rupay_upi_toggle}
                      onToggle={() => handleToggle("rupay_upi_toggle")}
                    />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={index}
                className={`grid grid-cols-[1fr_1.5fr_0.5fr] hover:bg-[#f5f9fe] transition-colors ${borderClass}`}
              >
                {/* Payment Instrument */}
                <div className="flex items-center gap-3 px-6 py-4 border-r border-[#e0e0e0]">
                  <div className="shrink-0">{instrument.icon}</div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] text-[#101010] leading-[24px]">
                        {instrument.name}
                      </span>
                    </div>
                    {instrument.subLabel && (
                      <span className="text-[12px] text-[#7e7e7e] leading-[16px]">
                        {instrument.subLabel}
                      </span>
                    )}
                    {instrument.link && (
                      <a href="#" className="text-[12px] text-[#004299] font-semibold hover:underline leading-[16px] mt-0.5">
                        {instrument.link}
                      </a>
                    )}
                  </div>
                </div>

                {/* Charges */}
                <div className="text-[14px] leading-[24px] px-6 py-4 border-r border-[#e0e0e0]">
                  {instrument.charges}
                </div>

                {/* Status */}
                <div className="flex items-center justify-end gap-3 px-6 py-4">
                  {activePaymentType === "qr" ? (
                    <span className="text-[14px] text-[#101010] leading-[24px]">
                      {instrument.status}
                    </span>
                  ) : instrument.hasActivateButton ? (
                    <button className="bg-[#e7f1f8] text-[#004299] hover:bg-[#f5f9fe] hover:text-[#009de5] text-[12px] leading-[16px] font-semibold px-4 py-2 min-w-[80px] rounded-[8px] whitespace-nowrap transition-colors">
                      Activate Now
                    </button>
                  ) : (
                    <ToggleSwitch
                      active={toggleStates[instrument.name] ?? true}
                      onToggle={() => handleToggle(instrument.name)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("payment_settings");

  const settingsTabs = [
    { label: "Payment settings", value: "payment_settings" },
    { label: "Payout settings", value: "payout_settings" },
    { label: "Account Details", value: "account_details" },
    { label: "Notifications", value: "notifications" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "payment_settings":
        return <PaymentSettingsContent />;
      case "payout_settings":
        return <DesignInProgress pageName="Payout Settings" />;
      case "account_details":
        return <DesignInProgress pageName="Account Details" />;
      case "notifications":
        return <DesignInProgress pageName="Notifications" />;
      default:
        return <PaymentSettingsContent />;
    }
  };

  return (
    <div className="flex flex-col gap-4 md:gap-8 bg-[#ffffff] min-h-full px-[32px] pt-[20px] pb-[32px]">
      {/* Page Title */}
      <h1 className="text-[32px] font-semibold text-[#101010] leading-[36px]">
        Settings
      </h1>

      {/* Primary Tabs */}
      <PrimaryTabs
        tabs={settingsTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}
