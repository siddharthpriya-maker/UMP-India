import svgPaths from "./svg-0lurqyzj8e";

function Sync() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="sync">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="sync">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.p1ee5afa0} fill="#004299" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p18874780} fill="#004299" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p176d3b00} fill="#004299" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.pde8a080} fill="#004299" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Liquid() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Liquid">
      <Sync />
      <p className="font-['Inter_Subset:SemiBold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#004299] text-[12px] text-center">Refresh</p>
    </div>
  );
}

export default function Button() {
  return (
    <div className="bg-[#e7f1f8] content-stretch flex items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[8px] size-full" data-name="Button">
      <Liquid />
    </div>
  );
}