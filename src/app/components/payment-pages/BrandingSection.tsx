import { Upload, Play, ImageIcon, Mail, Phone } from "lucide-react";
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
  const hasCoverImage = !!data.coverImage;
  const hasCoverVideo = !!data.coverVideoUrl.trim();
  const hasCover = data.coverType === "image" ? hasCoverImage : hasCoverVideo;
  const hasName = !!data.businessName.trim();
  const hasDesc = !!data.description.trim();
  const hasVideo = !!data.videoUrl.trim();
  const hasEmail = !!data.businessEmail.trim();
  const hasPhone = !!data.businessPhone.trim();

  const showCover = data.coverEnabled;
  const showLogo = data.logoEnabled;
  const showDesc = data.descriptionEnabled;
  const showBusinessDetails = data.businessDetailsEnabled;
  const showVideo = data.videoEnabled;

  const isEmpty = !showCover && !showLogo && !hasName && !showDesc && !showBusinessDetails && !showVideo;

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
        {/* Cover area — only when enabled */}
        {showCover && (
          <>
            {data.coverType === "video" ? (
              <div
                className="relative flex items-center justify-center"
                style={{ height: isMobile ? 140 : 200 }}
              >
                {hasCoverVideo ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#101010]/5">
                    <div className="flex size-12 items-center justify-center rounded-full bg-white shadow-md">
                      <Play className="size-5 text-[#101010]" />
                    </div>
                  </div>
                ) : (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                    style={{ backgroundColor: customization.primaryColor + "1a" }}
                  >
                    <div className="flex size-10 items-center justify-center rounded-full bg-white/80 shadow-sm">
                      <Play className="size-5 text-[#7e7e7e]" />
                    </div>
                    <span className="text-[12px] font-medium text-[#7e7e7e]">Cover Video</span>
                  </div>
                )}
                {showLogo && (
                  <div className="absolute bottom-0 left-5 z-10 translate-y-[28px]">
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
                )}
              </div>
            ) : (
              <div
                className="relative flex items-end"
                style={{
                  height: isMobile ? 140 : 200,
                  backgroundColor: hasCoverImage ? undefined : customization.primaryColor + "1a",
                  backgroundImage: hasCoverImage ? `url(${data.coverImage})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!hasCoverImage && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded-full bg-white/80 shadow-sm">
                      <ImageIcon className="size-5 text-[#7e7e7e]" />
                    </div>
                    <span className="text-[12px] font-medium text-[#7e7e7e]">Cover</span>
                  </div>
                )}
                {showLogo && (
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
                )}
              </div>
            )}
          </>
        )}

        {/* Logo when cover is disabled but logo is enabled */}
        {!showCover && showLogo && (
          <div className="px-5 pt-5">
            {hasLogo ? (
              <img
                src={data.logo}
                alt="Logo"
                className="size-[56px] rounded-[12px] border-[3px] border-[#f0f0f0] bg-white object-cover shadow-sm"
              />
            ) : (
              <div className="flex size-[56px] items-center justify-center rounded-[12px] border-[3px] border-[#f0f0f0] bg-[#f5f5f5] shadow-sm">
                <Upload className="size-5 text-[#acacac]" />
              </div>
            )}
          </div>
        )}

        {/* Content below cover */}
        <div
          className={`px-5 pb-5 ${showCover && showLogo ? "pt-9" : showCover ? "pt-5" : showLogo ? "pt-4" : "pt-5"}`}
          style={{ backgroundColor: customization.backgroundColor, fontFamily: customization.fontFamily }}
        >
          {/* Business name — always shown */}
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

          {/* Description — only when enabled */}
          {showDesc && (
            hasDesc ? (
              <p className="mt-2 text-[14px] leading-[22px] text-[#444]">{data.description}</p>
            ) : (
              <div className="mt-2 space-y-1.5">
                <div className="h-[14px] w-full rounded-[4px] bg-[#f5f5f5]" />
                <div className="h-[14px] w-3/4 rounded-[4px] bg-[#f5f5f5]" />
              </div>
            )
          )}

          {/* Business Details — between description and video */}
          {showBusinessDetails && (
            <div className="mt-3 flex items-center gap-4">
              {(hasEmail || !hasPhone) && (
                <div className="flex items-center gap-1.5">
                  <Mail className="size-3.5 text-[#7e7e7e]" />
                  <span className="text-[13px] text-[#555]">
                    {hasEmail ? data.businessEmail : "email@example.com"}
                  </span>
                </div>
              )}
              {(hasPhone || !hasEmail) && (
                <div className="flex items-center gap-1.5">
                  <Phone className="size-3.5 text-[#7e7e7e]" />
                  <span className="text-[13px] text-[#555]">
                    {hasPhone ? data.businessPhone : "+91 XXXXX XXXXX"}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Embed Video — only when enabled */}
          {showVideo && (
            hasVideo ? (
              <div className="mt-4 flex h-[160px] items-center justify-center rounded-[12px] bg-[#101010]/5">
                <div className="flex size-12 items-center justify-center rounded-full bg-white shadow-md">
                  <Play className="size-5 text-[#101010]" />
                </div>
              </div>
            ) : (
              <div className="mt-4 flex h-[160px] items-center justify-center rounded-[12px] border border-dashed border-[#e0e0e0]">
                <span className="text-[12px] text-[#acacac]">Embed Video</span>
              </div>
            )
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
