import svgPaths from "./svg-7tphoz8bsk";

function DownloadOutlined() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="download_outlined">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="download_outlined">
          <path clipRule="evenodd" d={svgPaths.p32a3cb00} fill="var(--fill-0, #004299)" fillRule="evenodd" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Liquid() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Liquid">
      <DownloadOutlined />
      <p className="font-['Inter_Subset:SemiBold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#004299] text-[12px] text-center">Download</p>
    </div>
  );
}

export default function Button() {
  return (
    <div className="relative rounded-[8px] size-full" data-name="Button">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[inherit] size-full">
        <Liquid />
      </div>
      <div aria-hidden="true" className="absolute border border-[#004299] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}