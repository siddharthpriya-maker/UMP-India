function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter_Subset:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Label</p>
      </div>
    </div>
  );
}

function FlatSecondaryTab() {
  return (
    <div className="bg-[#004299] content-stretch flex flex-col h-[32px] items-center justify-center px-[12px] py-[4px] relative rounded-[18px] shrink-0" data-name=".Flat Secondary Tab">
      <Frame />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter_Subset:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7e7e7e] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Label</p>
      </div>
    </div>
  );
}

function FlatSecondaryTab1() {
  return (
    <div className="bg-[#f5f9fe] content-stretch flex flex-col h-[32px] items-center justify-center px-[12px] py-[4px] relative rounded-[18px] shrink-0" data-name=".Flat Secondary Tab">
      <Frame1 />
    </div>
  );
}

export default function SecondaryTabV() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative size-full" data-name="Secondary Tab_v2">
      <FlatSecondaryTab />
      <FlatSecondaryTab1 />
    </div>
  );
}