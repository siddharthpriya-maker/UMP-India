import svgPaths from "./svg-roryalsrlm";

function DownloadOutlined() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="download_outlined">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="download_outlined">
          <path clipRule="evenodd" d={svgPaths.p16a73d80} fill="var(--fill-0, #004299)" fillRule="evenodd" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Liquid() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Liquid">
      <DownloadOutlined />
      <p className="font-['Inter_Subset:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#004299] text-[14px] text-center">Download Report</p>
    </div>
  );
}

export default function ButtonV() {
  return (
    <div className="relative rounded-[8px] size-full" data-name="Button_v2">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit] size-full">
        <Liquid />
      </div>
      <div aria-hidden="true" className="absolute border border-[#004299] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}