import svgPaths from "./svg-qyy0zx9tud";

function Grid() {
  return (
    <div className="absolute inset-[8.33%]" data-name="Grid">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Grid">
          <path d={svgPaths.p2c93ce00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeOpacity="0.3" strokeWidth="0.1" />
          <path d={svgPaths.p2a7a9480} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeOpacity="0.3" strokeWidth="0.1" />
          <path d={svgPaths.p33305000} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeOpacity="0.3" strokeWidth="0.1" />
          <path d={svgPaths.p5049000} id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeOpacity="0.3" strokeWidth="0.1" />
        </g>
      </svg>
    </div>
  );
}

function Component24X() {
  return (
    <div className="absolute inset-0 opacity-0" data-name="24x24">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group" opacity="0.6">
          <path d="M24 0H0V24H24V0Z" fill="var(--fill-0, #5B8DEF)" id="Vector" opacity="0.5" />
          <path d="M22 2H2V22H22V2Z" fill="var(--fill-0, #FFA4A4)" id="Vector_2" opacity="0.6" />
        </g>
      </svg>
      <Grid />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[15.63%]">
      <div className="absolute inset-[-4.55%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <g id="Group 1597880889">
            <rect fill="var(--fill-0, white)" height="16.5" id="Rectangle 188266" rx="2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="1.5" width="16.5" x="0.75" y="0.75" />
            <path d={svgPaths.p1735d330} id="Vector" stroke="var(--stroke-0, #101010)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
            <path d={svgPaths.p1cbf1880} id="Vector_2" stroke="var(--stroke-0, #101010)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
            <path d={svgPaths.p3494b200} id="Vector 4451" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function Dev() {
  return (
    <div className="relative size-full" data-name="dev">
      <Component24X />
      <Group />
    </div>
  );
}