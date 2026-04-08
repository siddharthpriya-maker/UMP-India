import { Upload, X, Play, ImageIcon } from "lucide-react";
import type { BrandingData, PageCustomization, DevicePreview } from "./builder-types";

interface BrandingSectionProps {
  data: BrandingData;
  customization: PageCustomization;
  previewMode: DevicePreview;
  isSelected: boolean;
  onSelect: () => void;
}

export function BrandingSection({
  data,
  customization,
  previewMode,
  isSelected,
  onSelect,
}: BrandingSectionProps) {
  const isMobile = previewMode === "mobile";
  const hasLogo = !!data.logo;
  const hasCover = !!data.coverImage;
  const hasName = !!data.businessName.trim();
  const hasDesc = !!data.description.trim();
  const hasVideo = !!data.videoUrl.trim();

  const isEmpty = !hasLogo && !hasCover && !hasName && !hasDesc && !hasVideo;

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      className={[
        "group relative rounded-[16px] border-2 transition-all cursor-pointer",
        isSelected
          ? "border-[#004299] shadow-[0_0_0_3px_rgba(0,66,153,0.12)]"
          : "border-transparent hover:border-[#e0e0e0]",
      ].join(" ")}
    >
      {/* Section label badge */}
      <div
        className={[
          "absolute -top-3 left-4 z-10 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider transition-opacity",
          isSelected
            ? "bg-[#004299] text-white opacity-100"
            : "bg-[#f0f0f0] text-[#7e7e7e] opacity-0 group-hover:opacity-100",
        ].join(" ")}
      >
        Branding
      </div>

      <div className="overflow-hidden rounded-[14px]">
        {/* Cover image area */}
        <div
          className="relative flex items-end"
          style={{
            height: isMobile ? 140 : 200,
            backgroundColor: hasCover ? undefined : customization.primaryColor + "1a",
            backgroundImage: hasCover ? `url(${data.coverImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!hasCover && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-full bg-white/80 shadow-sm">
                <ImageIcon className="size-5 text-[#7e7e7e]" />
              </div>
              <span className="text-[12px] font-medium text-[#7e7e7e]">Cover Image</span>
            </div>
          )}
          {/* Logo */}
          <div className="relative z-10 ml-5 mb-[-28px]">
            {hasLogo ? (
              <img
                src={data.logo}
                alt="Logo"
                className="size-[56px] rounded-[12px] border-[3px] border-white bg-white object-cover shadow-md"
              />
            ) : (
              <div className="flex size-[56px] items-center justify-center rounded-[12px] border-[3px] border-white bg-[#f5f5f5] shadow-md">
                <Upload className="size-5 text-[#acacac]" />
              </div>
            )}
          </div>
        </div>

        {/* Content below cover */}
        <div
          className="px-5 pb-5 pt-9"
          style={{ backgroundColor: customization.backgroundColor, fontFamily: customization.fontFamily }}
        >
          {hasName ? (
            <h2
              className="text-[20px] font-bold leading-[28px]"
              style={{ color: customization.primaryColor }}
            >
              {data.businessName}
            </h2>
          ) : (
            <div className="h-[28px] w-[180px] rounded-[6px] bg-[#f0f0f0]" />
          )}

          {hasDesc ? (
            <p className="mt-2 text-[14px] leading-[22px] text-[#444]">{data.description}</p>
          ) : (
            <div className="mt-2 space-y-1.5">
              <div className="h-[14px] w-full rounded-[4px] bg-[#f5f5f5]" />
              <div className="h-[14px] w-3/4 rounded-[4px] bg-[#f5f5f5]" />
            </div>
          )}

          {hasVideo && (
            <div className="mt-4 flex h-[160px] items-center justify-center rounded-[12px] bg-[#101010]/5">
              <div className="flex size-12 items-center justify-center rounded-full bg-white shadow-md">
                <Play className="size-5 text-[#101010]" />
              </div>
            </div>
          )}

          {isEmpty && (
            <p className="mt-3 text-center text-[13px] text-[#acacac]">
              Click to add your branding — logo, name &amp; cover image
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
