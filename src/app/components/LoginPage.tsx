import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, ArrowRight, QrCode, Eye, EyeOff } from "lucide-react";
import svgPaths from "../../imports/svg-9d73oqi9lc";
import { TextField } from "./TextField";

function PaytmLogoWhite() {
  return (
    <div className="relative shrink-0 w-[140px] h-[48px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 49.6705 33.25">
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

function PhoneMockup() {
  return (
    <div className="relative w-[240px] mx-auto">
      <div className="bg-white rounded-[24px] shadow-2xl overflow-hidden border-[6px] border-white/20">
        {/* Status bar */}
        <div className="bg-white px-4 py-2 flex items-center justify-between">
          <span className="text-[10px] text-[#101010] font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-[16px] h-[10px] border border-[#101010] rounded-[2px] relative">
              <div className="absolute inset-[1px] right-[3px] bg-[#101010] rounded-[1px]" />
            </div>
          </div>
        </div>
        {/* App header */}
        <div className="bg-[#004299] px-4 py-3 flex items-center justify-center">
          <div className="flex items-center gap-1.5">
            <div className="w-[60px] h-[20px]">
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
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-[#004299] px-4 pb-3">
          <p className="text-white text-[11px] font-semibold text-center">Payment Link</p>
        </div>
        {/* Payment items */}
        <div className="bg-[#f5f9fe] px-3 py-3 flex flex-col gap-2">
          {[
            { name: "Mrs. Bina Sharma", amount: "₹3,240", color: "bg-[#00b8f5]" },
            { name: "Dr. Rakesh Sharma", amount: "₹2,300", color: "bg-[#00b8f5]" },
            { name: "Dr. Rakesh Sharma", amount: "₹2,300", color: "bg-[#00b8f5]" },
          ].map((item, i) => (
            <div key={i} className={`bg-white rounded-[8px] p-2.5 flex items-center gap-2 ${i === 0 ? "shadow-sm border border-[#e0e0e0]" : "opacity-60"}`}>
              <div className="size-7 rounded-full bg-[#e0f5fd] flex items-center justify-center shrink-0">
                <span className="text-[10px] text-[#004299] font-semibold">{item.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[#7e7e7e]">Payment Request</p>
                <p className="text-[11px] text-[#101010] font-semibold truncate">{item.name}</p>
              </div>
              <span className={`${item.color} text-white text-[10px] font-semibold px-2 py-0.5 rounded-full`}>
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const carouselSlides = [
  {
    title: "Paytm Payment Links",
    description: "Accept payments via WhatsApp/SMS/Email.\nNo coding required.",
  },
  {
    title: "QR Code Payments",
    description: "Generate QR codes instantly.\nAccept contactless payments.",
  },
  {
    title: "Card Machine",
    description: "Accept card payments anywhere.\nFast and secure transactions.",
  },
  {
    title: "Payment Pages",
    description: "Create custom payment pages.\nCollect fees, donations & more.",
  },
];

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const isDisabled = !email.trim() || !password.trim();

  return (
    <div className="flex min-h-screen">
      {/* Left panel — Branded */}
      <div className="hidden lg:flex w-[480px] bg-[#004299] flex-col items-center justify-between py-12 px-10 shrink-0 relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#004299] via-[#003580] to-[#002a66]" />

        <div className="relative z-10 flex flex-col items-center gap-10 flex-1 justify-center">
          {/* Logo */}
          <PaytmLogoWhite />

          {/* Phone mockup */}
          <PhoneMockup />

          {/* Carousel text */}
          <div className="flex flex-col items-center gap-3 text-center">
            <h3 className="text-[20px] font-semibold text-white">
              {carouselSlides[activeSlide].title}
            </h3>
            <p className="text-[14px] text-white/80 leading-[22px] whitespace-pre-line">
              {carouselSlides[activeSlide].description}
            </p>
            <a href="#" className="text-[14px] text-[#00b8f5] font-semibold hover:underline flex items-center gap-1 mt-1">
              Learn More <ArrowRight className="size-3.5" />
            </a>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {carouselSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`rounded-full transition-all ${
                  i === activeSlide
                    ? "size-2.5 bg-white"
                    : "size-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-[#fafafa] px-6 py-12">
        <div className="w-full max-w-[562px] flex flex-col gap-4">
          {/* Login card */}
          <div className="bg-white rounded-[12px] p-8 flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-2">
              <h1 className="text-[32px] font-semibold text-[#101010] leading-[40px]">
                Login with your Paytm account
              </h1>
            <p className="text-[14px] text-[#7e7e7e] leading-[20px]">
              Paytm App user? No need to create a new account, use the same password for both.
            </p>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-5">
              <TextField
                label="Mobile Number or Email"
                value={email}
                onChange={setEmail}
              />
              <TextField
                label="Paytm Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={setPassword}
                trailingIcon={
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#7e7e7e] hover:text-[#101010] transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                }
              />
            </div>

            {/* CTA + Forgot */}
            <div className="flex items-center w-full">
              <button
                disabled={isDisabled}
                onClick={() => navigate("/home")}
                className={`flex items-center justify-center gap-2 text-[14px] leading-[20px] font-semibold px-6 py-3.5 rounded-[8px] transition-colors ${
                  isDisabled
                    ? "bg-[#ebebeb] text-[#acacac] opacity-64 cursor-not-allowed"
                    : "bg-[#004299] hover:bg-[#012A72] text-white"
                }`}
              >
                <Lock className="size-4" />
                Sign in Securely
                <ArrowRight className="size-4" />
              </button>
              <a href="#" className="text-[14px] text-[#004299] font-normal hover:underline shrink-0 ml-auto">
                Forgot Password
              </a>
            </div>

            {/* Terms */}
            <p className="text-[12px] text-[#7e7e7e] leading-[18px]">
              By creating this account, you agree to our{" "}
              <a href="#" className="text-[#004299] font-normal hover:underline">privacy policy</a>
              {" "}and{" "}
              <a href="#" className="text-[#004299] font-normal hover:underline">terms of use</a>.
            </p>

            {/* Divider */}
            <div className="h-[1px] bg-[#e0e0e0]" />

            {/* QR Login */}
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-[8px] bg-[#f5f9fe] flex items-center justify-center shrink-0">
                <QrCode className="size-6 text-[#101010]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] text-[#101010] font-semibold">OR Login through QR Code</span>
                <a href="#" className="text-[14px] text-[#004299] font-normal hover:underline">
                  Click here to expand
                </a>
              </div>
            </div>
          </div>

          {/* New to Paytm card */}
          <div className="bg-white rounded-[12px] px-8 py-5">
            <p className="text-[14px] text-[#101010] text-center">
              New to Paytm?{" "}
              <a href="#" className="text-[#004299] font-semibold hover:underline">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
