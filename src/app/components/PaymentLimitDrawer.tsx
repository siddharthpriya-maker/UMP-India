import { useState, useEffect } from "react";
import { Clock, Info } from "lucide-react";
import SuccessSmall from "../../imports/SuccessSmall";
import {
  RightDrawer,
  DrawerHeader,
  DrawerBody,
} from "./RightDrawer";

interface PaymentLimitDrawerProps {
  open: boolean;
  onClose: () => void;
}

type DrawerState = "form" | "processing" | "success";

const checklist = [
  "Aadhaar number with linked mobile number for OTP",
  "PAN card",
  "A quiet, well-lit place for the call",
];

function LoaderDots() {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`rounded-full ${
            i <= 2 || i >= 4 ? "size-3 bg-[#012a72]" : "size-4 bg-[#00b8f5]"
          }`}
          style={{
            opacity: i === 1 || i === 5 ? 0.4 : i === 2 || i === 4 ? 0.7 : 1,
            animation: `pulse 1.4s ease-in-out ${(i - 1) * 0.15}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function PaymentLimitDrawer({ open, onClose }: PaymentLimitDrawerProps) {
  const [consented, setConsented] = useState(false);
  const [state, setState] = useState<DrawerState>("form");

  useEffect(() => {
    if (!open) {
      setState("form");
      setConsented(false);
    }
  }, [open]);

  useEffect(() => {
    if (state !== "processing") return;
    const timer = setTimeout(() => setState("success"), 3000);
    return () => clearTimeout(timer);
  }, [state]);

  const handleStartKYC = () => {
    setState("processing");
  };

  if (state === "processing") {
    return (
      <RightDrawer open={open} onClose={onClose}>
        <DrawerHeader onClose={onClose} />
        <DrawerBody>
          <div className="flex flex-col items-center justify-center flex-1 min-h-[400px] gap-6 px-8">
            <LoaderDots />
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-[20px] font-bold text-[#101010] leading-[28px]">
                VKYC in progress
              </h2>
              <p className="text-[14px] text-[#7e7e7e] leading-[20px] text-center">
                Your video KYC is in progress…
              </p>
            </div>
          </div>
        </DrawerBody>
      </RightDrawer>
    );
  }

  if (state === "success") {
    return (
      <RightDrawer open={open} onClose={onClose}>
        <DrawerHeader onClose={onClose} />
        <DrawerBody>
          <div className="flex flex-col items-center justify-center flex-1 min-h-[400px] gap-6 px-8">
            <div className="size-10 shrink-0" aria-hidden>
              <SuccessSmall />
            </div>
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-[20px] font-bold text-[#101010] leading-[28px]">
                Verification submitted
              </h2>
              <p className="text-[14px] text-[#7e7e7e] leading-[20px] text-center max-w-[360px]">
                All done from your side.
              </p>
            </div>
            <div className="bg-[#fafafa] rounded-[12px] px-5 py-4 w-full max-w-[400px] flex flex-col gap-2">
              <p className="text-[14px] text-[#7e7e7e] leading-[20px]">
                Your KYC will be reviewed shortly by our team.
              </p>
              <p className="text-[14px] text-[#7e7e7e] leading-[20px]">
                Limits will be upgraded once verification is complete.
              </p>
            </div>
          </div>
        </DrawerBody>
      </RightDrawer>
    );
  }

  return (
    <RightDrawer open={open} onClose={onClose}>
      <DrawerHeader onClose={onClose} />

      <DrawerBody>
        <h2 className="text-[24px] font-bold text-[#101010] leading-[32px] px-8 pb-4">
          Increase your payment limits
        </h2>
        <div className="flex flex-col gap-5 px-8 pb-6">
          {/* Value proposition */}
          <div className="bg-[#fafafa] rounded-[12px] px-5 py-4">
            <p className="text-[14px] text-[#101010] leading-[22px]">
              Accept higher-value payments by completing a quick video KYC.
            </p>
          </div>

          {/* Status indicator */}
          <div className="border border-[#e0e0e0] rounded-[12px] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Info className="size-5 text-[#004299]" />
              <span className="text-[14px] font-semibold text-[#101010]">
                Current status
              </span>
            </div>
            <span className="text-[14px] font-semibold text-[#ff9d00]">
              Pending verification
            </span>
          </div>

          {/* Preparation checklist */}
          <div className="border border-[#e0e0e0] rounded-[12px] p-5 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-[16px] font-semibold text-[#101010] leading-[24px]">
                Keep these ready for your video KYC
              </span>
              <span className="text-[14px] text-[#7e7e7e] leading-[20px]">
                This helps you complete the process smoothly in one go.
              </span>
            </div>

            <div className="flex flex-col gap-2.5 mt-1">
              {checklist.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="size-7 rounded-full bg-[#fafafa] border border-[#e0e0e0] flex items-center justify-center shrink-0 text-[12px] font-semibold text-[#101010]">
                    {i + 1}
                  </span>
                  <span className="text-[14px] text-[#101010] leading-[20px]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Estimated time */}
          <div className="bg-[#fafafa] rounded-[12px] px-5 py-4 flex items-center gap-3">
            <Clock className="size-5 text-[#7e7e7e] shrink-0" />
            <p className="text-[14px] leading-[20px]">
              <span className="font-semibold text-[#101010]">Estimated time:</span>{" "}
              <span className="text-[#7e7e7e]">Less than 5 minutes</span>
            </p>
          </div>
        </div>
      </DrawerBody>

      {/* Sticky footer */}
      <div className="border-t border-[#e0e0e0] px-8 pt-5 pb-6 shrink-0 flex flex-col gap-5">
        {/* Consent */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
            className="size-4 accent-[#004299] shrink-0"
          />
          <span className="text-[14px] text-[#101010] leading-[20px]">
            I consent to complete video KYC as per RBI guidelines.
          </span>
        </label>

        {/* CTA */}
        <button
          disabled={!consented}
          onClick={handleStartKYC}
          className={`w-full text-[16px] font-semibold py-4 rounded-[8px] transition-colors flex items-center justify-center ${
            consented
              ? "bg-[#004299] text-white hover:bg-[#012A72]"
              : "bg-[#ebebeb] text-[#acacac] cursor-not-allowed"
          }`}
        >
          Start video KYC
        </button>
      </div>
    </RightDrawer>
  );
}
