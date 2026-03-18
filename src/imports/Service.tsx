import svgPaths from "./svg-lzltsnayws";

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-[#d9d9d9] left-0 opacity-0 size-[24px] top-0" />
      <div className="absolute bg-[#fddada] left-[2px] opacity-0 size-[20px] top-[2px]" />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute h-[15.508px] left-[3.75px] top-[4.75px] w-[16.5px]">
      <div className="absolute inset-[-4.84%_-4.55%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 17.0078">
          <g id="Group 1597880206">
            <path d={svgPaths.p3c8ed8b2} fill="var(--fill-0, white)" id="Rectangle 829108" stroke="var(--stroke-0, #101010)" strokeWidth="1.5" />
            <path d={svgPaths.p65ea900} fill="var(--fill-0, white)" id="Rectangle 829112" stroke="var(--stroke-0, #101010)" strokeWidth="1.5" />
            <path d={svgPaths.p13882200} fill="var(--fill-0, white)" id="Rectangle 829111" stroke="var(--stroke-0, #101010)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function Service() {
  return (
    <div className="relative size-full" data-name="Service">
      <Group1 />
      <Group />
    </div>
  );
}