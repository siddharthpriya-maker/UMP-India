import { useState } from "react";
import { CreditCard, Building2, Link2, Bell, ArrowRight } from "lucide-react";
import svgPaths from "../../imports/svg-9d73oqi9lc";

function PaytmLogoWhite() {
  return (
    <div className="relative shrink-0 w-[100px] h-[34px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMinYMid meet" viewBox="0 0 49.6705 33.25">
        <g>
          <g>
            <path d={svgPaths.p370bedf0} fill="white" />
            <path d={svgPaths.p35d40e80} fill="white" />
            <path d={svgPaths.p25dac300} fill="white" />
            <path d={svgPaths.p2b4ab270} fill="white" />
            <path d={svgPaths.p116ac200} fill="white" />
            <path d={svgPaths.p1d8d6380} fill="white" />
            <path d={svgPaths.p3d6e7c00} fill="white" />
            <path d={svgPaths.p23188000} fill="white" />
          </g>
          <g>
            <path d={svgPaths.p3a680380} fill="white" />
            <path d={svgPaths.p33dadc00} fill="white" />
            <path d={svgPaths.p15cbca00} fill="white" />
          </g>
          <path d={svgPaths.pcd22300} fill="white" />
          <path d={svgPaths.p26180700} fill="white" />
          <path d={svgPaths.p2ec67400} fill="white" />
          <path d={svgPaths.p25908700} fill="white" />
          <g>
            <path d={svgPaths.p2cdf92f0} fill="white" />
            <path d={svgPaths.p11545700} fill="white" />
            <path d={svgPaths.pe3a700} fill="white" />
            <path d={svgPaths.p16ea4b00} fill="white" />
            <path d={svgPaths.p3ecb5300} fill="white" />
          </g>
        </g>
      </svg>
    </div>
  );
}

interface PermissionItemProps {
  icon: React.ReactNode;
  text: string;
}

function PermissionItem({ icon, text }: PermissionItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="size-10 rounded-[8px] bg-[#fafafa] flex items-center justify-center shrink-0 text-[#101010]">
        {icon}
      </div>
      <p className="text-[14px] leading-[20px] text-[#101010]">{text}</p>
    </div>
  );
}

function PopupFooterBar() {
  return (
    <div className="flex flex-col w-full overflow-hidden shrink-0">
      <div className="h-[8px] w-full bg-[#00b8f5]" />
      <div className="h-[8px] w-full bg-[#012a72]" />
    </div>
  );
}

interface AuthorizationPageProps {
  appName?: string;
  email?: string;
  onAuthorize?: () => void;
  onCancel?: () => void;
}

export function AuthorizationPage({
  appName = "Claude",
  email = "user@paytmpayments.com",
  onAuthorize,
  onCancel,
}: AuthorizationPageProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f9fe] p-6">
      <div className="bg-white flex flex-col w-[620px] relative rounded-[4px] overflow-hidden">
          {/* Branded header — #004299 (Primary Strong) */}
          <div className="relative bg-[#004299] overflow-hidden shrink-0">
            <div className="flex flex-col gap-[28px] px-8 pt-8 pb-6">
              <PaytmLogoWhite />

              <div className="flex flex-col gap-3">
                <h2 className="text-[24px] font-semibold leading-[32px]">
                  <span className="text-white">Connect </span>
                  <span className="text-[#00b8f5]">{appName}</span>
                  <span className="text-white"> to your Paytm Account</span>
                </h2>

                <div className="flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 w-fit">
                  <div className="size-2 rounded-full bg-[#21c179]" />
                  <span className="text-[14px] text-white leading-[20px]">{email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Body — white bg, px-8 per popup form spec */}
          <div className="flex flex-col gap-4 px-8 pt-4 pb-0">
            {/* Permissions list */}
            <div className="flex flex-col gap-3">
              <p className="text-[14px] font-semibold leading-[20px] text-[#101010]">
                This will allow {appName} to:
              </p>
              <div className="flex flex-col gap-3">
                <PermissionItem
                  icon={<CreditCard className="size-5" />}
                  text="View and manage payment orders"
                />
                <PermissionItem
                  icon={<Building2 className="size-5" />}
                  text="Monitor payments and settlements"
                />
                <PermissionItem
                  icon={<Link2 className="size-5" />}
                  text="View payment links"
                />
                <PermissionItem
                  icon={<Bell className="size-5" />}
                  text="Track refunds and related notifications"
                />
              </div>
            </div>

            {/* Separator — #e0e0e0 per design system border */}
            <div className="h-px bg-[#e0e0e0]" />

            {/* Disclaimer — text-[12px] text-[#7e7e7e] (XS muted) */}
            <div className="flex flex-col gap-0">
              <p className="text-[12px] leading-[18px] text-[#7e7e7e]">
                This connection uses secure OAuth 2.0. You can revoke access anytime from your settings.
              </p>
              <p className="text-[10px] leading-[18px] text-[#7e7e7e]">
                Standard Paytm payment transaction fees apply for all payments processed through this integration.
              </p>
            </div>

            {/* Checkbox consent — bg-[#f5f9fe] (Offset Weak) */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAgreed(!agreed)}
                className={`size-5 shrink-0 rounded-[4px] border-2 flex items-center justify-center transition-colors ${
                  agreed
                    ? "bg-[#004299] border-[#004299]"
                    : "bg-white border-[#e0e0e0]"
                }`}
              >
                {agreed && (
                  <svg className="size-3 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <p className="text-[12px] leading-[20px] text-[#101010]">
                I've read the{" "}
                <span className="text-[#004299] font-semibold cursor-pointer hover:underline">
                  Terms & Conditions
                </span>{" "}
                before granting access to my Paytm Account.
              </p>
            </div>

            {/* Buttons — Medium size, gap-5 per popup footer pattern */}
            <div className="flex items-center gap-5 pb-5">
              {/* Secondary (Medium emphasis) */}
              <button
                onClick={onCancel}
                className="flex items-center justify-center border border-[#004299] text-[#004299] hover:bg-[#f7f9fd] hover:border-[#012A72] hover:text-[#012A72] text-[14px] leading-[20px] font-semibold px-4 py-2.5 min-w-[120px] rounded-[8px] transition-colors flex-1"
              >
                Cancel
              </button>
              {/* Primary (High emphasis) */}
              <button
                onClick={onAuthorize}
                disabled={!agreed}
                className={`flex items-center justify-center gap-2 text-[14px] leading-[20px] font-semibold px-4 py-2.5 min-w-[120px] rounded-[8px] transition-colors flex-1 ${
                  agreed
                    ? "bg-[#004299] hover:bg-[#012A72] text-white"
                    : "bg-[#ebebeb] text-[#acacac] opacity-64 cursor-not-allowed"
                }`}
              >
                Authorize
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Footer bar — sky blue #00b8f5 (8px) + navy #012a72 (8px) */}
          <PopupFooterBar />
        </div>
      </div>
  );
}
