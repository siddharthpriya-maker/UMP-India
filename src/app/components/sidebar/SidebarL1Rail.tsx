import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import Book from "@mui/icons-material/Book";
import svgPaths from "../../../imports/svg-9d73oqi9lc";
import RefundsDuo from "../../../imports/RefundsDuo";
import SettingsDuo from "../../../imports/SettingsDuo";
import Dev from "../../../imports/Dev";
import ReportDuo from "../../../imports/ReportDuo";
import { MyServicesIcon } from "../Icons";
import aiAgentStudioIconUrl from "../../../assets/icons/ai_agent_studio.svg";

/** Same `d` as `src/assets/icons/symbol.svg` — keep in sync with `storybook/storyRegistry.tsx` SYMBOL_PATH_FROM_ASSET. */
const RAIL_SYMBOL_PATH =
  "M15.5172 16.2751H21.0126C21.7681 16.2751 22.2428 15.4603 21.8704 14.8031L15.1819 2.99985C14.8042 2.33338 13.844 2.33338 13.4663 2.99986L10.819 7.67158C10.2102 7.49586 9.56688 7.4017 8.90151 7.4017C5.08991 7.4017 2 10.4916 2 14.3032C2 18.1148 5.08991 21.2047 8.90151 21.2047C12.0279 21.2047 14.6688 19.1259 15.5172 16.2751ZM14.302 14.7962H8.48159L11.4684 9.52541C13.1685 10.4407 14.3241 12.237 14.3241 14.3032C14.3241 14.4694 14.3167 14.6338 14.302 14.7962ZM13.9545 16.2751H7.63563C6.88018 16.2751 6.4054 15.4603 6.77785 14.8031L10.0632 9.00533C9.68898 8.92364 9.30027 8.8806 8.90151 8.8806C5.90668 8.8806 3.4789 11.3084 3.4789 14.3032C3.4789 17.298 5.90668 19.7258 8.90151 19.7258C11.2007 19.7258 13.1656 18.2949 13.9545 16.2751ZM15.7857 14.7962C15.7972 14.6334 15.803 14.469 15.803 14.3032C15.803 11.6854 14.3455 9.40802 12.1978 8.23825L14.3241 4.48584L20.1667 14.7962H15.7857Z";

function RailSymbolMark() {
  return (
    <div className="flex size-6 shrink-0 items-center justify-center text-[#101010]">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="block size-6">
        <path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d={RAIL_SYMBOL_PATH} />
      </svg>
    </div>
  );
}

function PaytmLogo() {
  return (
    <div className="relative shrink-0 size-[56px]">
      <div className="absolute inset-[20.31%_5.05%_20.31%_6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.6705 33.25">
          <g>
            <g>
              <path d={svgPaths.p370bedf0} fill="#002970" />
              <path d={svgPaths.p35d40e80} fill="#002970" />
              <path d={svgPaths.p25dac300} fill="#002970" />
              <path d={svgPaths.p2b4ab270} fill="#002970" />
              <path d={svgPaths.p116ac200} fill="#002970" />
              <path d={svgPaths.p1d8d6380} fill="#002970" />
              <path d={svgPaths.p3d6e7c00} fill="#002970" />
              <path d={svgPaths.p23188000} fill="#002970" />
            </g>
            <g>
              <path d={svgPaths.p3a680380} fill="#002970" />
              <path d={svgPaths.p33dadc00} fill="#002970" />
              <path d={svgPaths.p15cbca00} fill="#002970" />
            </g>
            <path d={svgPaths.pcd22300} fill="#002970" />
            <path d={svgPaths.p26180700} fill="#00BAF2" />
            <path d={svgPaths.p2ec67400} fill="#002970" />
            <path d={svgPaths.p25908700} fill="#00BAF2" />
            <g>
              <path d={svgPaths.p2cdf92f0} fill="#00BAF2" />
              <path d={svgPaths.p11545700} fill="#00BAF2" />
              <path d={svgPaths.pe3a700} fill="#002970" />
              <path d={svgPaths.p16ea4b00} fill="#002970" />
              <path d={svgPaths.p3ecb5300} fill="#002970" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg className="size-6" fill="none" viewBox="0 0 24 24">
      <path d={svgPaths.pfb20100} fill="white" />
      <path d={svgPaths.p21b069d0} stroke="#101010" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.p3e888740} stroke="#101010" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.p1e1b900} stroke="#101010" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M9.87016 6.62636H12.1855" stroke="#101010" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function PaymentsIcon() {
  return (
    <svg className="size-6" fill="none" viewBox="0 0 20 15.2325">
      <path d={svgPaths.p1cef7a00} fill="white" />
      <path d={svgPaths.p1afcfc70} stroke="#101010" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <g>
        <path d={svgPaths.p1e515c40} fill="#101010" />
        <path d={svgPaths.p1513b500} fill="#101010" />
        <path d={svgPaths.p3cec5700} fill="#101010" stroke="#101010" strokeWidth="0.15" />
      </g>
      <path d={svgPaths.p108f1780} stroke="#101010" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function SettlementIcon() {
  return (
    <svg className="size-6" fill="none" viewBox="0 0 24 24">
      <path d={svgPaths.p650be80} fill="#101010" />
      <path d={svgPaths.p12edf180} fill="#101010" />
      <path d={svgPaths.p27c34000} fill="#101010" />
      <path d={svgPaths.p3d263600} fill="#101010" />
      <path d={svgPaths.p1ef2f600} fill="white" />
      <path d={svgPaths.pfdb9400} fill="#101010" />
      <path d={svgPaths.pdcf8900} fill="#101010" />
      <path d={svgPaths.p3f81f8e0} fill="#101010" />
      <path d={svgPaths.pf201f00} fill="white" />
      <path d={svgPaths.p9279700} fill="white" />
    </svg>
  );
}

/** AI Agent Studio — robot head with sparkles (matches `src/assets/icons/ai_agent_studio.svg`). */
function AiAgentStudioIcon() {
  return (
    <div className="flex size-6 shrink-0 items-center justify-center">
      <img src={aiAgentStudioIconUrl} alt="" width={24} height={24} className="block size-6" aria-hidden />
    </div>
  );
}

function RefundsIcon() {
  return (
    <svg className="size-6" fill="none" viewBox="0 0 24 24">
      <path clipRule="evenodd" d={svgPaths.p2a9f6d00} fill="#101010" fillRule="evenodd" />
      <path d={svgPaths.p3ca3e280} fill="#101010" />
      <path clipRule="evenodd" d={svgPaths.p1da1a000} fill="#101010" fillRule="evenodd" />
      <path d={svgPaths.p25101880} fill="#101010" />
    </svg>
  );
}

function ReportsIcon() {
  return (
    <svg className="size-6" fill="none" viewBox="0 0 24 24">
      <path clipRule="evenodd" d={svgPaths.p303fdc80} fill="#101010" fillRule="evenodd" />
      <path clipRule="evenodd" d={svgPaths.pef76b80} fill="#101010" fillRule="evenodd" />
      <path clipRule="evenodd" d={svgPaths.p2df0aa80} fill="#101010" fillRule="evenodd" />
      <path clipRule="evenodd" d={svgPaths.p3c05b200} fill="#101010" fillRule="evenodd" />
      <path clipRule="evenodd" d={svgPaths.p96480} fill="#101010" fillRule="evenodd" />
      <path clipRule="evenodd" d={svgPaths.p3b77c00} fill="#101010" fillRule="evenodd" />
    </svg>
  );
}

function LabelIcon() {
  return (
    <svg className="size-6" fill="none" viewBox="0 0 20.4668 20.1441">
      <path d={svgPaths.pe2f880} stroke="#101010" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
      <path d={svgPaths.p3f41600} stroke="#101010" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
      <path d={svgPaths.p34683880} fill="white" />
      <path d={svgPaths.p1db0ec00} stroke="#101010" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
      <path d={svgPaths.pceb32b2} fill="#101010" />
    </svg>
  );
}

function DeveloperIcon() {
  return (
    <svg className="size-6" fill="none" viewBox="0 0 24 24">
      <path clipRule="evenodd" d={svgPaths.pcaa8700} fill="#101010" fillRule="evenodd" />
      <path clipRule="evenodd" d={svgPaths.p472780} fill="#101010" fillRule="evenodd" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="#101010" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

interface NavItemProps {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
}

function NavItem({ icon, label, isActive, onClick, onMouseEnter }: NavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className="flex w-[60px] flex-col items-center gap-1"
    >
      <div
        className={`flex h-8 w-[60px] items-center justify-center rounded-[32px] transition-colors ${isActive ? "bg-[#b1e6fb]" : "hover:bg-[#e0e0e0]"}`}
      >
        {icon}
      </div>
      <p className={`max-w-[60px] text-center text-[10px] leading-[12px] ${isActive ? "font-bold" : ""}`}>{label}</p>
    </button>
  );
}

const menuItems = [
  { icon: <HomeIcon />, label: "Home" },
  { icon: <PaymentsIcon />, label: "Payments" },
  { icon: <SettlementIcon />, label: "Settlements" },
  { icon: <div className="size-6"><RefundsDuo /></div>, label: "Refunds" },
  { icon: <div className="size-6"><ReportDuo /></div>, label: "Reports" },
];

const bottomItems = [
  { icon: <LabelIcon />, label: "Accept Payments" },
  { icon: <AiAgentStudioIcon />, label: "AI Agent Studio" },
  { icon: <MyServicesIcon className="size-6" />, label: "My Services" },
  { icon: <div className="size-6"><SettingsDuo /></div>, label: "Settings" },
  { icon: <div className="size-6"><Dev /></div>, label: "Developer" },
  {
    icon: (
      <div className="flex size-6 shrink-0 items-center justify-center text-[#101010]">
        <Book sx={{ fontSize: 24 }} aria-hidden />
      </div>
    ),
    label: "Storybook",
  },
];

const STORYBOOK_CATALOG_LABEL = "label";

/** Sample L2 for `storybook-catalog`: accordion categories; rows use the same caption as L1 (`label`). */
const STORYBOOK_CATALOG_L2_CATEGORIES: { title: string; items: string[] }[] = [
  { title: "Category one", items: ["label", "label"] },
  { title: "Category two", items: ["label"] },
  { title: "Category three", items: ["label", "label", "label"] },
];

function storybookCatalogStableDomId(title: string): string {
  return title.replace(/\s+/g, "-");
}

function StorybookCatalogL2Panel({
  categories,
  expandedCategory,
  onCategoryToggle,
}: {
  categories: { title: string; items: string[] }[];
  expandedCategory: string | null;
  onCategoryToggle: (title: string) => void;
}) {
  return (
    <div
      className="absolute bottom-0 left-[88px] top-0 z-10 flex max-h-full w-[252px] flex-col rounded-tr-[16px] border-l border-[#e0e0e0] bg-[#e7f1f8] pt-[22px]"
      role="region"
      aria-label="Sample secondary navigation"
    >
      <div className="flex min-h-0 flex-1 flex-col items-start overflow-y-auto px-[8px]">
        {categories.map((category) => {
          const isExpanded = expandedCategory === category.title;
          return (
            <div key={category.title} className="w-full">
              <div className="flex w-full items-center justify-between px-[12px] py-[16px]">
                <p className="text-[12px] font-semibold uppercase leading-[16px] tracking-[0.6px] text-[#101010]">
                  {category.title}
                </p>
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={`storybook-l2-cat-${storybookCatalogStableDomId(category.title)}`}
                  id={`storybook-l2-trigger-${storybookCatalogStableDomId(category.title)}`}
                  onClick={() => onCategoryToggle(category.title)}
                  className="rounded-full p-0.5 transition-colors hover:bg-[#e0e0e0]"
                >
                  <ChevronDown
                    className={`size-6 text-[#101010] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
              </div>
              {isExpanded ? (
                <div
                  id={`storybook-l2-cat-${storybookCatalogStableDomId(category.title)}`}
                  role="region"
                  className="flex flex-col"
                  aria-labelledby={`storybook-l2-trigger-${storybookCatalogStableDomId(category.title)}`}
                >
                  {category.items.map((item, idx) => (
                    <button
                      key={`${category.title}-${idx}`}
                      type="button"
                      className="flex w-full items-start rounded-[12px] p-[12px] text-left transition-colors hover:bg-[#e0e0e0]"
                    >
                      <span className="flex-1 py-[2px] text-[14px] font-medium leading-[20px] text-[#101010]">
                        {item}
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export type SidebarL1RailPresentation = "merchant" | "storybook-catalog";

export interface SidebarL1RailProps {
  selectedTab: string;
  pathname: string;
  onItemClick: (label: string) => void;
  onItemHover: (label: string) => void;
  isAcceptPaymentsSubmenuActive: boolean;
  /** `storybook-catalog`: compact symbol rail for Storybook docs (production shell uses `merchant`). */
  presentation?: SidebarL1RailPresentation;
}

function SidebarL1RailStorybookCatalog({ onItemClick }: { onItemClick: (label: string) => void }) {
  const [catalogL2Open, setCatalogL2Open] = useState(false);
  const [catalogExpandedCategory, setCatalogExpandedCategory] = useState<string | null>(
    STORYBOOK_CATALOG_L2_CATEGORIES[0]?.title ?? null,
  );

  const dismissCatalogL2 = () => setCatalogL2Open(false);
  const openCatalogL2 = () => setCatalogL2Open(true);
  const toggleCatalogCategory = (title: string) => {
    setCatalogExpandedCategory((prev) => (prev === title ? null : title));
  };

  return (
    <div
      className="relative flex h-full min-h-[560px] w-[88px] shrink-0 flex-col bg-[#e7f1f8]"
      onMouseLeave={dismissCatalogL2}
    >
      {/* Same shell as `Sidebar`: fixed 88px column; L2 is absolutely positioned to the right (does not shrink L1). */}
      <div className="flex min-h-0 w-[88px] flex-1 flex-col items-center gap-8 overflow-y-auto py-3">
        <div className="flex w-full items-center justify-center" onMouseEnter={dismissCatalogL2}>
          <PaytmLogo />
        </div>
        <div className="flex w-[60px] flex-col items-center gap-4">
          {[0, 1, 2].map((i) => (
            <NavItem
              key={`storybook-l1-top-${i}`}
              icon={<RailSymbolMark />}
              label={STORYBOOK_CATALOG_LABEL}
              isActive={i === 0}
              onClick={() => onItemClick(STORYBOOK_CATALOG_LABEL)}
              onMouseEnter={dismissCatalogL2}
            />
          ))}
          <div className="flex items-center justify-center rounded-[7px] py-2" onMouseEnter={dismissCatalogL2}>
            <div className="h-1 w-8 rounded-[7px] bg-[#e0e0e0]" />
          </div>
          {[0, 1, 2].map((i) => (
            <NavItem
              key={`storybook-l1-bottom-${i}`}
              icon={<RailSymbolMark />}
              label={STORYBOOK_CATALOG_LABEL}
              isActive={false}
              onClick={() => onItemClick(STORYBOOK_CATALOG_LABEL)}
              onMouseEnter={openCatalogL2}
            />
          ))}
        </div>
      </div>
      {catalogL2Open ? (
        <StorybookCatalogL2Panel
          categories={STORYBOOK_CATALOG_L2_CATEGORIES}
          expandedCategory={catalogExpandedCategory}
          onCategoryToggle={toggleCatalogCategory}
        />
      ) : null}
    </div>
  );
}

/** 88px scrollable L1 column: logo, primary nav, divider, secondary nav — merchant shell pairs with `Sidebar` L2; `storybook-catalog` includes a sample L2 on hover (bottom three icons). */
export function SidebarL1Rail({
  selectedTab,
  pathname,
  onItemClick,
  onItemHover,
  isAcceptPaymentsSubmenuActive,
  presentation = "merchant",
}: SidebarL1RailProps) {
  if (presentation === "storybook-catalog") {
    return <SidebarL1RailStorybookCatalog onItemClick={onItemClick} />;
  }

  return (
    <div className="flex min-h-0 w-[88px] flex-1 flex-col items-center gap-8 overflow-y-auto py-3">
      <div className="flex w-full items-center justify-center">
        <PaytmLogo />
      </div>
      <div className="flex w-[60px] flex-col items-center gap-4">
        {menuItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isActive={selectedTab === item.label}
            onClick={() => onItemClick(item.label)}
            onMouseEnter={() => onItemHover(item.label)}
          />
        ))}
        <div className="flex items-center justify-center rounded-[7px] py-2">
          <div className="h-1 w-8 rounded-[7px] bg-[#e0e0e0]" />
        </div>
        {bottomItems.map((item) => {
          let isActive = selectedTab === item.label;
          if (item.label === "Accept Payments") {
            isActive = isAcceptPaymentsSubmenuActive;
          }
          if (item.label === "Storybook") {
            isActive = isActive || pathname === "/storybook";
          }
          return (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              isActive={isActive}
              onClick={() => onItemClick(item.label)}
              onMouseEnter={() => onItemHover(item.label)}
            />
          );
        })}
      </div>
    </div>
  );
}
