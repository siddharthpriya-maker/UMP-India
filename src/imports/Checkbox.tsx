import svgPaths from "./svg-e2uf1phpnz";

export default function Checkbox() {
  return (
    <div className="content-stretch flex items-start relative size-full" data-name="Checkbox">
      <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-start min-h-px min-w-px relative" data-name="Container">
        <div className="relative shrink-0 size-[24px]" data-name="checkboc_checked_outlined">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <g id="Vector">
                <path clipRule="evenodd" d={svgPaths.p1ef58700} fill="var(--fill-0, #004299)" fillRule="evenodd" />
                <path clipRule="evenodd" d={svgPaths.p125dd880} fill="var(--fill-0, #004299)" fillRule="evenodd" />
              </g>
            </svg>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[2px] relative" data-name="Label">
          <div className="flex flex-[1_0_0] flex-col font-['Inter_Subset:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#101010] text-[16px]">
            <p className="leading-[20px] whitespace-pre-wrap">Label</p>
          </div>
        </div>
      </div>
    </div>
  );
}