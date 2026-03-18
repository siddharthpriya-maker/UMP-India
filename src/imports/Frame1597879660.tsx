import svgPaths from "./svg-ww9to8l4y8";
import imgIcChevronDownUi from "figma:asset/96b4d7be1021e49365a1b4c5bdab554a099fc891.png";
import { imgFill1SolidDark1 } from "./svg-qsiq9";

function Fill1SolidDark() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[5.246px_6.912px] mask-size-[10px_6.175px]" data-name="fill/1.solid/dark_1" style={{ maskImage: `url('${imgFill1SolidDark1}')` }}>
      <div className="absolute bg-[#101010] inset-0" data-name="fill/1.solid/dark_1" />
    </div>
  );
}

function ColorFillBrand() {
  return (
    <div className="absolute contents inset-0" data-name="color/fill/brand1">
      <Fill1SolidDark />
    </div>
  );
}

function IconUiChevronDown() {
  return (
    <div className="absolute contents inset-0" data-name="icon/ui/chevron_down">
      <div className="absolute inset-0 opacity-0" data-name="ic_chevron_down_ui">
        <img alt="" className="block max-w-none size-full" height="20" src={imgIcChevronDownUi} width="20" />
      </div>
      <div className="absolute flex inset-[34.56%_23.77%_34.56%_26.23%] items-center justify-center">
        <div className="flex-none h-[10px] rotate-90 w-[6.175px]">
          <div className="relative size-full" data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.175 10">
              <path d={svgPaths.p26359200} fill="var(--fill-0, #29394F)" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
      <ColorFillBrand />
    </div>
  );
}

function IconUiDefault() {
  return (
    <div className="absolute inset-[44.44%_0_0_82.46%]" data-name="icon/ui/_default">
      <IconUiChevronDown />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <p className="absolute font-['Nunito_Sans:Bold',sans-serif] font-bold leading-[20px] left-0 right-[17.54%] text-[#101010] text-[14px] top-[calc(50%-2px)]" style={{ fontVariationSettings: "\'YTLC\' 500, \'wdth\' 100" }}>
        Today, 28 Aug
      </p>
      <IconUiDefault />
      <p className="absolute font-['Nunito_Sans:Regular',sans-serif] font-normal leading-[16px] left-0 right-[72.81%] text-[#7e7e7e] text-[12px] top-[calc(50%-18px)]" style={{ fontVariationSettings: "\'YTLC\' 500, \'wdth\' 100" }}>
        DATE
      </p>
    </div>
  );
}