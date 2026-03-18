import svgPaths from "../../imports/svg-9d73oqi9lc";

function SearchIcon() {
  return (
    <svg className="size-6 shrink-0" fill="none" viewBox="0 0 24 24">
      <path clipRule="evenodd" d={svgPaths.p38c95280} fill="#101010" fillRule="evenodd" />
      <path clipRule="evenodd" d={svgPaths.peea3f00} fill="#101010" fillRule="evenodd" />
    </svg>
  );
}

export function Header() {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full px-4 md:px-6 lg:px-8 py-3 shrink-0 gap-4">
      <div className="bg-[#f5f9fe] flex items-center gap-3 md:gap-4 max-h-[56px] overflow-clip p-3 md:p-4 rounded-[100px] w-full md:w-auto md:max-w-[560px] md:min-w-[300px] lg:w-[560px]">
        <SearchIcon />
        <div className="flex flex-1 flex-col justify-center min-h-px min-w-px">
          <input
            type="text"
            placeholder="Search for a Transaction"
            className="bg-transparent border-none outline-none text-[#7e7e7e] text-sm md:text-base font-medium leading-5 w-full placeholder:text-sm md:placeholder:text-base"
          />
        </div>
      </div>
      <div className="flex flex-1 gap-4 md:gap-6 lg:gap-8 items-center justify-end w-full md:w-auto py-2">
        <div className="hidden md:flex gap-4 lg:gap-8 items-center py-2">
          <button className="flex items-center justify-center py-0.5">
            <p className="text-[#444746] text-sm lg:text-base text-center leading-5">Whats New</p>
          </button>
          <button className="flex items-center justify-center py-0.5">
            <p className="text-[#444746] text-sm lg:text-base text-center leading-5">Contact Us</p>
          </button>
        </div>
        <div className="bg-[#f5f9fe] relative rounded-full shrink-0 size-9 md:size-10 border border-[#e0e0e0]">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-bold text-[#101010] text-sm md:text-base leading-5">SP</p>
          </div>
        </div>
      </div>
    </div>
  );
}