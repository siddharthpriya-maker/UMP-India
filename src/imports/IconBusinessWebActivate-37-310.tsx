import svgPaths from "./svg-tohpxomzsw";

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
    <div className="absolute contents inset-[15.87%_15.62%_15.08%_18.88%]" data-name="Group">
      <div className="absolute left-[5.73px] size-[12.549px] top-[5.73px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5487 12.5487">
          <circle cx="6.27436" cy="6.27436" fill="var(--fill-0, white)" id="Ellipse 3971" r="6.27436" />
        </svg>
      </div>
      <div className="absolute inset-[15.87%_15.62%_15.08%_18.88%]" data-name="Vector">
        <div className="absolute inset-[-4.53%_-4.77%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.2202 18.07">
            <path d={svgPaths.p129207c0} id="Vector" stroke="var(--stroke-0, #101010)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.04%_66.04%_65.04%_18.88%]" data-name="Vector">
        <div className="absolute inset-[-20.95%_-20.72%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.12 5.08">
            <path d={svgPaths.p123a7280} id="Vector" stroke="var(--stroke-0, #101010)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[34.96%_39.55%_31.71%_39.55%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.01587 8">
          <path d={svgPaths.p33c4a800} fill="var(--fill-0, #101010)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Refund() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Refund">
      <Component24X />
      <Group />
    </div>
  );
}

export default function IconBusinessWebActivate() {
  return (
    <div className="relative size-full" data-name="icon/business_web/activate">
      <Refund />
    </div>
  );
}