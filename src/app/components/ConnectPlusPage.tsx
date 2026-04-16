import { useState } from "react";
import { CheckCircle, ShieldCheck, ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { PrimaryButton } from "./Button";

export function ConnectPlusPage() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleAcceptAndContinue = () => {
    if (termsAccepted) {
      setIsAccepted(true);
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Main Container with horizontal padding */}
      <div className="px-[32px] pt-[12px] pb-[32px] flex flex-col gap-6">
        {/* Page Title Section */}
        <div className="flex flex-col">
          <h1 className="text-[32px] text-[#101010]" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
            Connect Plus
          </h1>
          <p className="text-[#7e7e7e] text-[12px]">
            Scale your communications and drive growth with our premium selection of messaging tools and customer acquisition services.
          </p>
        </div>

        {/* Consent Card (Before Acceptance) */}
        {!isAccepted && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1: Consent & Agreement Card */}
            <div className="bg-white border border-[#e0e0e0] rounded-[12px] p-6 flex flex-col gap-4">
              {/* Top Section: Content on left, Logo on right */}
              <div className="flex items-start justify-between gap-4 flex-1">
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="font-semibold text-[#101010] text-[20px]">Consent & Agreement</h3>
                  <p className="text-[14px] text-[#7e7e7e] pl-[0px] pr-[32px] py-[0px]">
                    By activating Connect Plus services, you agree to our specialized CPaaS messaging terms.
                  </p>
                </div>
                <div className="size-10 rounded-[12px] bg-[#00b8f5] flex items-center justify-center shrink-0">
                  <ShieldCheck className="size-5 text-white" />
                </div>
              </div>

              {/* Checkbox Section */}
              <div className="flex items-center gap-3 mt-auto">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="size-4 border-[#e0e0e0] rounded accent-[#004299] cursor-pointer"
                />
                <label htmlFor="terms" className="text-[#101010] cursor-pointer text-[12px]">
                  I accept the{" "}
                  <a href="#" className="text-[#004299] hover:underline font-semibold text-[12px]">
                    Terms and Conditions
                  </a>{" "}
                  and the{" "}
                  <a href="#" className="text-[#004299] hover:underline font-semibold text-[12px]">
                    Privacy Policy
                  </a>{" "}
                  for Connect Plus services.
                </label>
              </div>

              {/* CTA Button at bottom, left-aligned */}
              <button
                onClick={handleAcceptAndContinue}
                disabled={!termsAccepted}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors self-start ${
                  termsAccepted
                    ? "bg-[#004299] text-white hover:bg-[#003377]"
                    : "bg-[#e0e0e0] text-[#7e7e7e] cursor-not-allowed"
                }`}
              >
                <span className="text-[14px] font-semibold">Accept & Continue</span>
                <ArrowRight className="size-4" />
              </button>
            </div>

            {/* Column 2: Service Cards (Neutral, No Stroke) */}
            <div className="bg-[#fafafa] rounded-[12px] p-6 flex flex-col gap-4">
              {/* Row 1: Messaging Services */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="font-semibold text-[#101010] text-[14px]">Messaging Services</h3>
                  <p className="text-[#7e7e7e] leading-[1.5] text-[12px]">
                    Connect with customers on their preferred platform. Use WhatsApp to deliver rich, interactive messages that drive engagement.
                  </p>
                </div>
                <div className="size-12 rounded-[12px] bg-[#e0f5fd] flex items-center justify-center shrink-0">
                  <MessageCircle className="size-6 text-[#00b8f5]" />
                </div>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-[#e0e0e0]" />

              {/* Row 2: Ad Manager */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="font-semibold text-[#101010] text-[14px]">Ad Manager</h3>
                  <p className="text-[#7e7e7e] leading-[1.5] text-[12px]">
                    Launch high-conversion "Click to WhatsApp" ads. Acquire new customers directly from Meta feeds and stories into a personalized chat experience.
                  </p>
                  
                </div>
                <div className="size-12 rounded-[12px] bg-[#fff8e1] flex items-center justify-center shrink-0">
                  <Sparkles className="size-6 text-[#ff9d00]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Confirmation Card (After Acceptance) */}
        {isAccepted && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1: Success & Confirmation Card */}
            <div className="bg-[#e3f6ec] rounded-[12px] p-6 flex flex-col gap-4">
              {/* Top Section: Content on left, Icon on right */}
              <div className="flex items-start justify-between gap-4 flex-1">
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="font-semibold text-[#101010] text-[20px]">Start Your Growth Journey</h3>
                  <p className="text-[14px] text-[#101010] pl-[0px] pr-[4px] pt-[8px] pb-[0px]">Elevate your brand using CPaaS. Combine impactful WhatsApp messaging with Click-to-WhatsApp Ads to speed up customer acquisition and drive unmatched business growth.</p>
                </div>
                <div className="size-10 rounded-[12px] bg-[#21c179] flex items-center justify-center shrink-0">
                  <CheckCircle className="size-5 text-white" />
                </div>
              </div>

              {/* CTA Button at bottom, left-aligned */}
              <PrimaryButton
                size="medium"
                type="button"
                icon={<ArrowRight className="size-4" />}
                iconPosition="right"
                className="self-start mt-auto px-6 py-3"
              >
                Go to Connect Plus Dashboard
              </PrimaryButton>
            </div>

            {/* Column 2: Service Cards (Neutral, No Stroke) */}
            <div className="bg-[#fafafa] rounded-[12px] p-6 flex flex-col gap-4">
              {/* Row 1: Messaging Services */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="font-semibold text-[#101010] text-[14px]">Messaging Services</h3>
                  <p className="text-[#7e7e7e] leading-[1.5] text-[12px]">
                    Connect with customers on their preferred platform. Use WhatsApp to deliver rich, interactive messages that drive engagement.
                  </p>
                </div>
                <div className="size-12 rounded-[12px] bg-[#e0f5fd] flex items-center justify-center shrink-0">
                  <MessageCircle className="size-6 text-[#00b8f5]" />
                </div>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-[#e0e0e0]" />

              {/* Row 2: Ad Manager */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="font-semibold text-[#101010] text-[14px]">Ad Manager</h3>
                  <p className="text-[#7e7e7e] leading-[1.5] text-[12px]">
                    Launch high-conversion "Click to WhatsApp" ads. Acquire new customers directly from Meta feeds and stories into a personalized chat experience.
                  </p>
                  
                </div>
                <div className="size-12 rounded-[12px] bg-[#fff8e1] flex items-center justify-center shrink-0">
                  <Sparkles className="size-6 text-[#ff9d00]" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}