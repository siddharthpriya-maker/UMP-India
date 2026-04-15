import { CheckCircle, ArrowRight } from "lucide-react";
import { Overlay } from "./Overlay";

interface ActivationSuccessPopupProps {
  visible: boolean;
  onClose: () => void;
  onUpgradeLimit?: () => void;
  merchantId?: string;
  paymentLimit?: string;
  settlementCycle?: string;
}

export function ActivationSuccessPopup({
  visible,
  onClose,
  onUpgradeLimit,
  merchantId = "MQQVCS05838368647127",
  paymentLimit = "₹50,000 / month",
  settlementCycle = "T+2 days",
}: ActivationSuccessPopupProps) {
  if (!visible) return null;

  return (
    <Overlay visible={visible} strength="strong" onClose={onClose}>
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div
          className="bg-white flex flex-col w-[620px] max-h-[90vh] rounded-[4px] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-1 overflow-y-auto px-8 pt-8 pb-6 flex flex-col gap-5">
            {/* Hero */}
            <div className="flex items-start gap-4">
              <div className="size-10 rounded-full bg-[#e3f6ec] flex items-center justify-center shrink-0">
                <CheckCircle className="size-6 text-[#21c179]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <h2 className="text-[20px] font-bold text-[#101010] leading-[28px]">
                  Your account is now active
                </h2>
                <p className="text-[14px] text-[#7e7e7e]">
                  Merchant ID: {merchantId}
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
