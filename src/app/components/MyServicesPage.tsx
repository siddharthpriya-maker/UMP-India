import { useState, useEffect } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { ConnectPlusIcon } from "./Icons";
import { Popup } from "./Popup";

interface DeviceItem {
  name: string;
  serialNumber: string;
  status: "due" | "paid";
  amount?: number;
}

interface DeviceCardProps {
  title: string;
  icon: React.ReactNode;
  devices: DeviceItem[];
}

function DeviceCard({ title, icon, devices }: DeviceCardProps) {
  return (
    <div className="bg-white border border-[#e0e0e0] rounded-[12px] p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[12px] tracking-[0.6px] uppercase font-semibold text-[#101010]">
          {title}
        </p>
        <button className="text-[#004299] hover:underline font-semibold text-[12px]">
          View All
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {devices.map((device) => (
          <button key={device.name} className="flex items-center w-full p-3 gap-3 group bg-[#fafafa] hover:bg-accent/50 transition-colors rounded-[8px]">
            <div className="size-10 rounded-[8px] bg-[#e0f5fd] flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div className="flex flex-col items-start flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-[#101010]">{device.name}</p>
              <p className="text-[12px] text-[#7e7e7e]">Serial No. {device.serialNumber}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {device.status === "due" ? (
                <span className="text-[14px] font-semibold text-[#ff9d00]">
                  ₹{device.amount} Due
                </span>
              ) : (
                <span className="text-[14px] font-semibold text-[#21c179]">Paid</span>
              )}
              <ChevronRight className="size-4 text-[#7e7e7e]" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function CardMachineIcon() {
  return (
    <svg className="size-10" viewBox="0 0 32 32" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M20.8 27.49H11.06c-1.29 0-2.29-1.08-2.29-2.36V9.92c0-1.28.99-2.36 2.29-2.36h9.84c1.29 0 2.29 1.08 2.29 2.36v15.2c0 1.38-1.1 2.37-2.39 2.37Z" fill="white" />
      <path d="M20.8 27.49H11.06c-1.29 0-2.29-1.08-2.29-2.36V9.92c0-1.28.99-2.36 2.29-2.36h9.84c1.29 0 2.29 1.08 2.29 2.36v15.2c0 1.38-1.1 2.37-2.39 2.37Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.14 20.21h1.4M17.33 20.21h1.39M13.14 24.04h1.4M17.33 24.04h1.39" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M19.61 17.15h-7.26c-.89 0-1.59-.79-1.59-1.67v-2.46c0-.88.69-1.67 1.59-1.67h7.26c.89 0 1.59.79 1.59 1.67v2.46c0 .88-.69 1.67-1.59 1.67Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M19.91 3.49l-1.99 1.08-1.99-1.08-1.99 1.08-1.99-1.08v5.84h7.96V3.49Z" fill="white" />
      <path d="M19.91 3.49l-1.99 1.08-1.99-1.08-1.99 1.08-1.99-1.08v5.84h7.96V3.49Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.46 9.33h8.95" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23.19 24.74h2.91V11.85h-2.91v12.89Z" fill="white" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SoundBoxIcon() {
  return (
    <svg className="size-10" viewBox="0 0 32 32" fill="none">
      <path d="M8.5 26.5h15a3 3 0 003-3v-15a3 3 0 00-3-3h-15a3 3 0 00-3 3v15a3 3 0 003 3Z" fill="white" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      {/* Left speaker dots */}
      {[9.3, 10.64, 11.99, 13.33, 14.68, 16.03, 17.37, 18.72, 20.06, 21.41, 22.75].map((cy) =>
        [8.41, 10.13].map((cx) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={0.43} fill="currentColor" />
        ))
      )}
      {/* Right speaker dots */}
      {[9.3, 10.64, 11.99, 13.33, 14.68, 16.03, 17.37, 18.72, 20.06, 21.41, 22.75].map((cy) =>
        [21.87, 23.59].map((cx) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={0.43} fill="currentColor" />
        ))
      )}
      {/* Display text "Paytm" */}
      <path fillRule="evenodd" clipRule="evenodd" d="M20.4 9.35c-.08-.23-.3-.39-.55-.39h-.01a.58.58 0 00-.42.18.58.58 0 00-.42-.18h-.01a.55.55 0 00-.38.14v-.04a.09.09 0 00-.09-.08h-.39a.09.09 0 00-.09.09v2.11c0 .05.04.09.09.09h.39a.09.09 0 00.08-.07V9.68c0-.07.05-.13.13-.13h.07c.03 0 .06.01.08.03a.13.13 0 01.05.11l.001 1.51c0 .05.04.09.09.09h.39a.09.09 0 00.08-.08V9.67c0-.05.02-.1.06-.12a.12.12 0 01.07-.02h.07c.08.01.14.07.14.15l.001 1.51c0 .05.04.09.09.09h.39a.09.09 0 00.09-.09V9.56c0-.11-.01-.16-.03-.21Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M17.77 8.99h-.22v-.36a.08.08 0 00-.08-.08.08.08 0 00-.01 0c-.25.07-.2.41-.65.44h-.04a.09.09 0 00-.08.1v.39c0 .05.04.09.09.09h.23v1.65c0 .05.04.09.09.09h.38a.09.09 0 00.09-.09V9.55h.22a.09.09 0 00.09-.09v-.39a.09.09 0 00-.09-.09Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M16.38 8.99h-.39a.09.09 0 00-.09.09v.8a.09.09 0 01-.09.09h-.16a.09.09 0 01-.09-.09V9.07a.09.09 0 00-.09-.09h-.39a.09.09 0 00-.09.09v.88c0 .34.24.57.57.57h.26a.09.09 0 01.08.09.09.09 0 01-.08.09h-.57a.09.09 0 00-.09.09v.39c0 .05.04.09.09.09h.64c.33 0 .57-.24.57-.57V9.07a.09.09 0 00-.09-.09Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.65 9.7v.24c0 .05-.04.09-.09.09h-.25V9.55h.25c.05 0 .09.04.09.09v.06Zm.03-.71h-.85a.09.09 0 00-.09.08v2.11c0 .05.04.09.08.09h.4a.09.09 0 00.09-.09v-.59h.37c.31 0 .53-.22.53-.53v-.55c0-.31-.22-.53-.53-.53Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M14.23 10.61v.06a.09.09 0 01-.09.09h-.16a.09.09 0 01-.09-.09v-.28c0-.05.04-.09.09-.09h.16c.05 0 .09.04.09.09v.27Zm-.06-1.62h-.54a.09.09 0 00-.09.08v.15l.001.004V9.43c0 .05.04.09.09.09l.51.001a.09.09 0 01.08.08v.05a.09.09 0 01-.08.08h-.25c-.34 0-.58.23-.58.54v.5c0 .31.21.53.54.53h.71a.19.19 0 00.19-.21V9.57c0-.36-.18-.58-.63-.58Z" fill="currentColor" />
      {/* QR code blocks */}
      <rect x="12.04" y="13.03" width="3.09" height="3.09" rx={0.36} fill="white" stroke="currentColor" strokeWidth={0.71} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="13.14" y="14.13" width="0.88" height="0.88" fill="currentColor" />
      <rect x="16.89" y="13.03" width="3.09" height="3.09" rx={0.36} fill="white" stroke="currentColor" strokeWidth={0.71} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="18" y="14.13" width="0.88" height="0.88" fill="currentColor" />
      <rect x="12.04" y="17.88" width="3.09" height="3.09" rx={0.36} fill="white" stroke="currentColor" strokeWidth={0.71} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="13.14" y="18.99" width="0.88" height="0.88" fill="currentColor" />
      <rect x="18" y="18.99" width="0.88" height="0.88" fill="currentColor" />
      {/* Bottom bars */}
      <rect x="11.62" y="22.11" width="8.75" height="0.53" fill="currentColor" />
      <rect x="11.62" y="22.92" width="8.75" height="0.14" fill="currentColor" />
    </svg>
  );
}

function EMIIcon() {
  return (
    <svg className="size-10" viewBox="0 0 32 32" fill="none">
      <rect x="5.75" y="6.71" width="20.5" height="18.83" rx="2" fill="white" stroke="currentColor" />
      <line x1="10.7" y1="5.1" x2="10.7" y2="7.82" stroke="currentColor" strokeLinecap="round" />
      <line x1="21.92" y1="5.1" x2="21.92" y2="7.82" stroke="currentColor" strokeLinecap="round" />
      <line x1="6.05" y1="10.44" x2="26.18" y2="10.44" stroke="currentColor" strokeLinecap="round" />
      <g transform="translate(9.31, 15.08)">
        <path d="M3.86 4.787H1.22V3.369H3.71V2.404H1.22V1.042H3.86V0H0V5.829H3.86V4.787Z" fill="currentColor" />
        <path d="M11.04 5.829V0H9.6L7.99 3.919H7.91L6.3 0H4.86V5.829H5.99V1.931H6.06L7.55 5.494H8.36L9.84 1.931H9.91V5.829H11.04Z" fill="currentColor" />
        <path d="M13.39 5.829V0H12.17V5.829H13.39Z" fill="currentColor" />
      </g>
    </svg>
  );
}

function AMCIcon() {
  return (
    <svg className="size-10" viewBox="-6.75 -6.75 37.5 37.5" fill="none">
      <path d="M12 23.25C18.213 23.25 23.25 18.213 23.25 12C23.25 5.787 18.213.75 12 .75 5.787.75.75 5.787.75 12c0 6.213 5.037 11.25 11.25 11.25Z" fill="white" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.17 7.83c-.2 0-.36-.05-.46-.16a.47.47 0 01-.14-.37c0-.14.05-.26.14-.36.1-.1.26-.16.46-.16h5.67c.2 0 .35.05.44.16.1.11.15.23.15.37s-.05.26-.15.37c-.09.1-.24.15-.44.15h-.83c-.36 0-.66 0-.9-.01-.25-.01-.4-.02-.45-.03v.06c.21.09.42.24.63.45.2.21.36.47.46.79h1.09c.2 0 .35.05.44.16.1.11.15.23.15.37s-.05.26-.15.37c-.09.1-.24.15-.44.15h-1.01c-.05.46-.18.85-.38 1.18-.2.32-.46.58-.75.79-.29.21-.61.37-.97.48-.35.11-.69.18-1.03.21l3.46 3.23c.16.16.25.34.25.54 0 .19-.06.35-.19.48-.12.13-.29.19-.5.19-.11 0-.23-.01-.34-.05-.1-.04-.21-.11-.32-.22l-4.08-3.87a.72.72 0 01-.24-.3.82.82 0 01-.08-.33c0-.19.06-.34.18-.46.13-.13.29-.19.48-.19h.2c.32 0 .63-.02.94-.07.32-.06.6-.15.84-.28.26-.14.47-.31.65-.52.17-.21.29-.47.34-.79H9.17c-.2 0-.36-.05-.46-.16a.47.47 0 01-.14-.37c0-.14.05-.26.14-.36.1-.1.26-.16.46-.16h3.03c-.27-.83-1.05-1.25-2.34-1.25h-.69Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M18.24 14.55c.59-.24 1.22-.03 1.57.42l.07.1.01.01c0-.01 0-.01.01-.01.33-.47.93-.69 1.49-.52l.11.04.01.01.86.35.05.02c.55.26.88.87.74 1.5.54-.09 1.01.14 1.29.48l.11.16.06.13.34.85c.27.68-.07 1.32-.54 1.62l-.01.01c.5.36.68 1.02.43 1.6l.002.001-.37.85c-.25.56-.82.87-1.41.8.05.57-.27 1.15-.84 1.38l-.87.35c-.57.23-1.24.04-1.6-.48l-.02.03-.001-.001c-.36.58-1.07.76-1.63.53l-.01-.002-.86-.35c-.02-.01-.03-.01-.05-.02-.47-.22-.88-.76-.77-1.43h-.01c-.56.1-1.24-.16-1.5-.82l-.34-.85c-.23-.57-.05-1.23.48-1.6-.53-.35-.75-1.04-.49-1.64l.37-.85.01-.02c.25-.53.8-.83 1.37-.78l.11.02h.02l.15.03-.03-.13.001-.001c-.13-.65.25-1.26.82-1.49l.87-.35Z" fill="white" />
      <path d="M23.29 17.47l-.49.1c-.23.05-.45-.02-.61-.19a.58.58 0 01-.15-.61l.13-.5c.04-.16-.04-.32-.19-.39l-.86-.35c-.15-.06-.32-.01-.42.14l-.28.41c-.08.11-.18.2-.3.25-.26.11-.64.05-.83-.27l-.26-.44c-.09-.14-.26-.2-.42-.13l-.87.35c-.15.06-.24.22-.21.37l.12.62c.07.35-.16.64-.41.74-.12.05-.26.06-.39.04l-.63-.13c-.16-.03-.32.05-.39.2l-.37.85c-.07.15-.01.33.13.41l.44.26c.2.12.31.32.31.55s-.11.44-.31.56l-.42.27c-.14.09-.19.26-.13.41l.34.85c.06.15.23.23.39.2l.5-.12c.23-.05.45.01.62.16.17.16.23.38.18.6l-.11.48c-.04.16.05.31.2.38l.86.35c.15.06.33.01.42-.14l.28-.44c.08-.12.19-.21.32-.26.26-.1.62-.05.81.24l.27.41c.09.13.26.18.42.12l.87-.35c.15-.06.24-.22.21-.38l-.08-.35c-.08-.36.15-.66.42-.77.13-.05.27-.06.41-.03l.35.09c.16.04.33-.04.4-.2l.37-.85c.07-.15.02-.32-.14-.41l-.41-.27c-.19-.13-.3-.33-.29-.56.01-.23.13-.43.33-.55l.45-.26c.14-.09.21-.26.15-.41l-.34-.85c-.07-.12-.23-.21-.39-.17Z" fill="currentColor" />
      <path d="M19.74 21.16c.82 0 1.48-.66 1.48-1.48s-.66-1.48-1.48-1.48-1.48.66-1.48 1.48.66 1.48 1.48 1.48Z" fill="white" />
    </svg>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  body: string;
  linkLabel: string;
  linkHref?: string;
  statusChip?: { label: string; color: string; bg: string };
  onClick?: () => void;
}

function ServiceCard({ icon, title, body, linkLabel, linkHref = "#", statusChip, onClick }: ServiceCardProps) {
  return (
    <div className="bg-white border border-[#e0e0e0] rounded-[12px] p-5 flex flex-col gap-4 hover:bg-[#f5f9fe] transition-colors">
      <div className="size-10 rounded-[8px] bg-[#e0f5fd] flex items-center justify-center">
        {icon}
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-3">
          <h3 className="text-[14px] font-semibold text-[#101010]">{title}</h3>
          {statusChip && (
            <span
              className="px-2.5 py-0.5 rounded-full text-[12px] font-semibold"
              style={{ backgroundColor: statusChip.bg, color: statusChip.color }}
            >
              {statusChip.label}
            </span>
          )}
        </div>
        <p className="text-[12px] text-[#7e7e7e] leading-[18px]">{body}</p>
      </div>
      <button
        onClick={onClick}
        className="border border-[#004299] text-[#004299] px-4 py-2 rounded-[8px] text-[12px] font-semibold hover:bg-[#e7f1f8] hover:border-[#009de5] hover:text-[#009de5] transition-colors self-start flex items-center gap-1.5"
      >
        {linkLabel}
        <ArrowRight className="size-3.5" />
      </button>
    </div>
  );
}

export function MyServicesPage() {
  const [showConnectPlusPopup, setShowConnectPlusPopup] = useState(false);
  const [showConnectPlusLoader, setShowConnectPlusLoader] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [connectPlusEnabled, setConnectPlusEnabled] = useState(false);

  useEffect(() => {
    if (!showConnectPlusLoader) return;
    const timer = setTimeout(() => {
      setShowConnectPlusLoader(false);
      setConnectPlusEnabled(true);
      window.open("#connect-plus", "_blank");
    }, 6000);
    return () => clearTimeout(timer);
  }, [showConnectPlusLoader]);

  const cardMachineDevices: DeviceItem[] = [
    { name: "Card Machine 1", serialNumber: "1234-5678-9012", status: "due", amount: 300 },
    { name: "Card Machine 2", serialNumber: "1234-5678-9012", status: "due", amount: 300 },
  ];

  const soundBoxDevices: DeviceItem[] = [
    { name: "Sound Box 1", serialNumber: "1234-5678-9012", status: "due", amount: 300 },
    { name: "Sound Box 2", serialNumber: "1234-5678-9012", status: "paid" },
  ];

  return (
    <div className="flex flex-col min-h-full bg-white">
      <div className="px-[32px] pt-[12px] pb-[32px] flex flex-col gap-6">
        {/* Page Title */}
        <h1 className="text-[32px] font-semibold text-[#101010]">My Services</h1>

        {/* Device Cards Row */}
        <div className="grid grid-cols-2 gap-6">
          <DeviceCard
            title="Paytm Card Machine"
            icon={<CardMachineIcon />}
            devices={cardMachineDevices}
          />
          <DeviceCard
            title="Paytm Sound Box"
            icon={<SoundBoxIcon />}
            devices={soundBoxDevices}
          />
        </div>

        {/* Connect Plus Enabled Card - shown in My Services section */}
        {connectPlusEnabled && (
          <div className="grid grid-cols-2 gap-6">
            <ServiceCard
              icon={<ConnectPlusIcon className="size-8 text-[#101010]" />}
              title="Connect Plus"
              body="Scale your business with automated WhatsApp campaigns and CTWA ads, right from your dashboard."
              linkLabel="Open Connect Plus"
              statusChip={{ label: "Enabled", color: "#21c179", bg: "#e3f6ec" }}
              onClick={() => window.open("#connect-plus", "_blank")}
            />
          </div>
        )}

        {/* Grow your Business Section */}
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[20px] font-medium text-[#101010]">Grow your Business</h2>
          <p className="text-[12px] text-[#7e7e7e]">with our products and services</p>
        </div>

        {/* Service Cards Grid - 2 per row */}
        <div className="grid grid-cols-2 gap-6">
          {!connectPlusEnabled && (
            <ServiceCard
              icon={<ConnectPlusIcon className="size-8 text-[#101010]" />}
              title="Connect Plus"
              body="Scale your business with automated WhatsApp campaigns and CTWA ads, right from your dashboard."
              linkLabel="Get Started"
              onClick={() => setShowConnectPlusPopup(true)}
            />
          )}
          <ServiceCard
            icon={<CardMachineIcon />}
            title="Paytm Card Machine"
            body="Accept payments instantly with our reliable, all-in-one POS solution."
            linkLabel="Explore Card Machine"
          />
          <ServiceCard
            icon={<SoundBoxIcon />}
            title="Paytm Sound Box"
            body="Seamless audio alerts for all your UPI and QR payments."
            linkLabel="Explore Sound Box"
          />
          <ServiceCard
            icon={<EMIIcon />}
            title="Activate EMI on Card Machine"
            body="Affordable payments made simple with seamless EMI on your card machine."
            linkLabel="Activate EMI"
          />
          <ServiceCard
            icon={<AMCIcon />}
            title="AMC for Devices"
            body="Scale without interruptions with proactive device maintenance and priority merchant support."
            linkLabel="Explore AMC"
          />
        </div>
      </div>

      {/* Connect Plus Enable Popup */}
      <Popup
        visible={showConnectPlusPopup}
        onClose={() => {
          setShowConnectPlusPopup(false);
          setTermsAccepted(false);
        }}
        type="form"
        title="Enable Connect Plus"
        subtext="By activating Connect Plus services, you agree to our specialized CPaaS messaging terms."
      >
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="size-[18px] rounded-[4px] border-[#e0e0e0] accent-[#004299] shrink-0 cursor-pointer"
            />
            <span className="text-[12px] leading-[18px] text-[#101010]">
              I accept the{" "}
              <a href="#" className="text-[#004299] hover:underline font-semibold">
                Terms and Conditions
              </a>{" "}
              and the{" "}
              <a href="#" className="text-[#004299] hover:underline font-semibold">
                Privacy Policy
              </a>{" "}
              for Connect Plus services.
            </span>
          </label>
          <button
            onClick={() => {
              setShowConnectPlusPopup(false);
              setTermsAccepted(false);
              setShowConnectPlusLoader(true);
            }}
            disabled={!termsAccepted}
            className={`px-4 py-2.5 min-w-[120px] rounded-[8px] text-[14px] leading-[20px] font-semibold transition-colors self-start ${
              termsAccepted
                ? "bg-[#004299] text-white hover:bg-[#009de5]"
                : "bg-[#ebebeb] text-[#acacac] opacity-64 cursor-not-allowed"
            }`}
          >
            Accept and Continue
          </button>
        </div>
      </Popup>

      {/* Connect Plus Loader Popup */}
      <Popup
        visible={showConnectPlusLoader}
        onClose={() => {}}
        type="loader"
        title="Please wait, we are redirecting you to the Connect Plus dashboard."
        showCloseButton={false}
      />

    </div>
  );
}