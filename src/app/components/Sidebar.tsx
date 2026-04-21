import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronDown, Link2, FileText } from "lucide-react";
import svgPaths from "../../imports/svg-9d73oqi9lc";
import RefundsDuo from "../../imports/RefundsDuo";
import SettingsDuo from "../../imports/SettingsDuo";
import Dev from "../../imports/Dev";
import ReportDuo from "../../imports/ReportDuo";
import { MyServicesIcon } from "./Icons";
import { TAB_ROUTES, ROUTE_TO_TAB } from "../App";

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
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
}

function NavItem({ icon, label, isActive, onClick, onMouseEnter }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className="flex w-[60px] flex-col items-center gap-1"
    >
      <div className={`flex h-8 w-[60px] items-center justify-center rounded-[32px] transition-colors ${isActive ? "bg-[#b1e6fb]" : "hover:bg-[#e0e0e0]"}`}>
        {icon}
      </div>
      <p className={`text-[10px] leading-[12px] text-center ${isActive ? "font-bold" : ""}`}>
        {label}
      </p>
    </button>
  );
}

interface SubmenuItem {
  icon: React.ReactNode;
  label: string;
  value?: string; // Added for routing/content control
}

interface SubmenuCategory {
  title: string;
  items: SubmenuItem[];
  collapsible?: boolean;
}

interface L2SubmenuProps {
  isOpen: boolean;
  categories: SubmenuCategory[];
  expandedCategory: string | null;
  onCategoryToggle: (category: string) => void;
  onItemClick: (value: string) => void; // Added to handle item selection
  selectedTab: string; // Added to show active state
}

function L2Submenu({ isOpen, categories, expandedCategory, onCategoryToggle, onItemClick, selectedTab }: L2SubmenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute left-[88px] top-0 bottom-0 flex flex-col items-start pt-[22px] px-[8px] w-[252px] bg-[#e7f1f8] transition-transform z-10 border-l border-[#e0e0e0] rounded-tr-[16px]">
      {categories.map((category) => {
        const isCollapsible = category.collapsible !== false;
        const isExpanded = isCollapsible ? expandedCategory === category.title : true;
        return (
          <div key={category.title} className="w-full">
            {/* Category Header */}
            <div className="flex items-center justify-between px-[12px] py-[16px] w-full">
              <p className="text-[12px] tracking-[0.6px] uppercase text-[#101010] font-semibold leading-[16px]">
                {category.title}
              </p>
              {isCollapsible && (
                <button
                  onClick={() => onCategoryToggle(category.title)}
                  className="rounded-full p-0.5 hover:bg-[#e0e0e0] transition-colors"
                >
                  <ChevronDown
                    className={`size-6 text-[#101010] transition-transform ${isExpanded ? "" : "rotate-180"}`}
                  />
                </button>
              )}
            </div>
            
            {/* Menu Options */}
            {isExpanded && (
              <div className="flex flex-col">
                {category.items.map((item) => {
                  const itemValue = item.value || item.label;
                  const isActive = selectedTab === itemValue;
                  return (
                    <button
                      key={item.label}
                      onClick={() => onItemClick(itemValue)}
                      className={`flex gap-[8px] items-start p-[12px] rounded-[12px] transition-colors ${
                        isActive ? "bg-[#b1e6fb]" : "hover:bg-[#e0e0e0]"
                      }`}
                    >
                      <div className="shrink-0 size-6 text-[#101010]">
                        {item.icon}
                      </div>
                      <div className="flex-1 py-[2px]">
                        <p className={`text-[14px] font-medium leading-[20px] text-left text-[#101010]`}>
                          {item.label}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTab = ROUTE_TO_TAB[location.pathname] || "Home";

  const [isL2MenuOpen, setIsL2MenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Business Services");
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsL2MenuOpen(false);
      }
    };

    if (isL2MenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isL2MenuOpen]);

  const menuItems = [
    { icon: <HomeIcon />, label: "Home" },
    { icon: <PaymentsIcon />, label: "Payments" },
    { icon: <SettlementIcon />, label: "Settlements" },
    { icon: <div className="size-6"><RefundsDuo /></div>, label: "Refunds" },
    { icon: <div className="size-6"><ReportDuo /></div>, label: "Reports" },
  ];

  const bottomItems = [
    { icon: <LabelIcon />, label: "Accept Payments" },
    { icon: <MyServicesIcon className="size-6" />, label: "My Services" },
    { icon: <div className="size-6"><SettingsDuo /></div>, label: "Settings" },
    { icon: <div className="size-6"><Dev /></div>, label: "Developer" },
  ];

  const acceptPaymentsCategories: SubmenuCategory[] = [
    {
      title: "Accept Payments",
      collapsible: false,
      items: [
        { icon: <Link2 className="size-6" />, label: "Payment Links", value: "Payment Links" },
        { icon: <FileText className="size-6" />, label: "Payment Pages", value: "Payment Pages" },
      ],
    },
  ];

  const isSubmenuItemActive = (categories: SubmenuCategory[]) => {
    const allItems = categories.flatMap(category =>
      category.items.map(item => item.value || item.label)
    );
    return allItems.includes(selectedTab);
  };

  const getCurrentSubmenuCategories = () => {
    return acceptPaymentsCategories;
  };

  const handleCategoryToggle = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const submenuConfig: Record<string, string> = {
    "Accept Payments": "Accept Payments",
  };

  const handleNavItemClick = (label: string) => {
    if (submenuConfig[label]) {
      setActiveSubmenu(label);
      setIsL2MenuOpen(true);
      setExpandedCategory(submenuConfig[label]);
    } else {
      setIsL2MenuOpen(false);
      setActiveSubmenu(null);
      navigate(TAB_ROUTES[label] || "/home");
    }
  };

  const handleNavItemHover = (label: string) => {
    if (submenuConfig[label]) {
      setActiveSubmenu(label);
      setIsL2MenuOpen(true);
      setExpandedCategory(submenuConfig[label]);
    } else {
      setIsL2MenuOpen(false);
      setActiveSubmenu(null);
    }
  };

  const handleSubmenuItemClick = (value: string) => {
    setIsL2MenuOpen(false);
    navigate(TAB_ROUTES[value] || "/home");
  };

  const handleSidebarMouseLeave = () => {
    // Close L2 submenu when mouse leaves the sidebar area
    setIsL2MenuOpen(false);
  };

  return (
    <div 
      ref={sidebarRef} 
      className={`bg-[#e7f1f8] relative z-20 flex h-full min-h-0 w-[88px] shrink-0 flex-col transition-shadow ${
        isL2MenuOpen ? "shadow-[0_0_10px_rgba(0,0,0,0.15)]" : ""
      }`}
      onMouseLeave={handleSidebarMouseLeave}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center gap-8 overflow-y-auto py-3 w-[88px]">
        <div className="flex w-full items-center justify-center">
          <PaytmLogo />
        </div>
        <div className="flex flex-col gap-4 items-center w-[60px]">
          {menuItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              isActive={selectedTab === item.label}
              onClick={() => handleNavItemClick(item.label)}
              onMouseEnter={() => handleNavItemHover(item.label)}
            />
          ))}
          <div className="py-2 rounded-[7px] flex items-center justify-center">
            <div className="bg-[#e0e0e0] h-1 rounded-[7px] w-8" />
          </div>
          {bottomItems.map((item) => {
            let isActive = selectedTab === item.label;
            if (item.label === "Accept Payments") {
              isActive = isSubmenuItemActive(acceptPaymentsCategories);
            }
            return (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                isActive={isActive}
                onClick={() => handleNavItemClick(item.label)}
                onMouseEnter={() => handleNavItemHover(item.label)}
              />
            );
          })}
        </div>
      </div>
      
      {/* L2 Submenu Panel */}
      <L2Submenu
        isOpen={isL2MenuOpen}
        categories={getCurrentSubmenuCategories()}
        expandedCategory={expandedCategory}
        onCategoryToggle={handleCategoryToggle}
        onItemClick={handleSubmenuItemClick}
        selectedTab={selectedTab}
      />
    </div>
  );
}