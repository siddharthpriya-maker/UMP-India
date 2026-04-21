import { ArrowRight } from "lucide-react";
import activationHero from "../../assets/icons/activation.svg";
import { Overlay } from "./Overlay";

interface ActivationSuccessPopupProps {
  visible: boolean;
  onClose: () => void;
  onUpgradeLimit?: () => void;
  /** Plain headline; omit for default “Your account is **Activated !**” (green segment). */
  headline?: string;
  /** Line under headline; omit for `Merchant ID: …` using `merchantId`. */
  subheadline?: string;
  merchantId?: string;
  paymentLimit?: string;
  settlementCycle?: string;
}

export function ActivationSuccessPopup({
  visible,
  onClose,
  onUpgradeLimit,
  headline,
  subheadline,
  merchantId = "MQQVCS05838368647127",
  paymentLimit = "₹50,000 / month",
  settlementCycle = "T+2 days",
}: ActivationSuccessPopupProps) {
  if (!visible) return null;

  const subtext =
    subheadline != null && subheadline !== ""
      ? subheadline
      : `Merchant ID: ${merchantId}`;

  return (
    <Overlay visible={visible} strength="strong" onClose={onClose}>
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div
          className="bg-white flex flex-col w-[620px] max-h-[90vh] rounded-[4px] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-1 overflow-y-auto px-8 pt-8 pb-6 flex flex-col gap-5">
            {/* Hero — graphic + single text column, vertically centred as one row */}
            <div className="flex items-center gap-4">
              <img
                src={activationHero}
                alt=""
                width={63}
                height={63}
                decoding="async"
                className="h-[63px] w-[63px] shrink-0"
                aria-hidden
              />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                {headline ? (
                  <h2 className="text-[20px] font-bold leading-[28px] text-[#101010]">
                    {headline}
                  </h2>
                ) : (
                  <h2 className="text-[20px] font-bold leading-[28px] text-[#101010]">
                    Your account is{" "}
                    <span className="text-[#21C179]">Activated !</span>
                  </h2>
                )}
                <p className="text-[14px] leading-[20px] text-[#7e7e7e] tabular-nums">
                  {subtext}
                </p>
              </div>
            </div>

            {/* Info Card */}
            <div className="border border-[#e0e0e0] rounded-[12px] divide-y divide-[#e0e0e0]">
              {/* Payment instruments */}
              <div className="p-5 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] font-semibold text-[#101010] leading-[20px]">
                    Payment instruments enabled, start accepting payments
                  </span>
                  <span className="text-[14px] text-[#7e7e7e]">
                    Your payment acceptance limit is {paymentLimit}
                  </span>
                </div>
                <button
                  onClick={onUpgradeLimit}
                  className="border border-[#004299] text-[#004299] text-[14px] font-semibold px-4 py-2.5 rounded-[8px] hover:bg-[#f7f9fd] hover:border-[#012A72] hover:text-[#012A72] transition-colors whitespace-nowrap shrink-0"
                >
                  Upgrade limit
                </button>
              </div>

              {/* Settlement */}
              <div className="p-5">
                <span className="text-[14px] font-semibold text-[#101010] leading-[20px]">
                  Get automatic settlement to your bank
                </span>
                <p className="text-[14px] text-[#7e7e7e] mt-1">
                  Your settlement cycle is {settlementCycle}
                </p>
              </div>

              {/* Credentials */}
              <div className="p-5 flex flex-col gap-1.5">
                <span className="text-[14px] font-semibold text-[#101010] leading-[20px]">
                  Access your test and live credentials
                </span>
                <a
                  href="#"
                  className="text-[14px] text-[#004299] font-normal hover:underline"
                >
                  View credentials
                </a>
              </div>

              {/* Documentation */}
              <div className="p-5 flex flex-col gap-1.5">
                <span className="text-[14px] font-semibold text-[#101010] leading-[20px]">
                  Find a suitable solution for your platform
                </span>
                <a
                  href="#"
                  className="text-[14px] text-[#004299] font-normal hover:underline"
                >
                  View document
                </a>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-[#fafafa] rounded-[12px] px-5 py-4">
              <p className="text-[14px] text-[#7e7e7e] leading-[20px]">
                We'll schedule an address verification visit. Please ensure
                someone is available at your shop.
              </p>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="px-8 pb-6 shrink-0">
            <button
              onClick={onClose}
              className="w-full bg-[#004299] text-white text-[16px] font-semibold py-4 rounded-[8px] hover:bg-[#012A72] transition-colors flex items-center justify-center gap-2"
            >
              Explore Dashboard
              <ArrowRight className="size-5" />
            </button>
          </div>

          {/* Footer bar */}
          <div className="flex flex-col w-full shrink-0">
            <div className="h-[8px] w-full bg-[#00b8f5]" />
            <div className="h-[8px] w-full bg-[#012a72]" />
          </div>
        </div>
      </div>
    </Overlay>
  );
}
