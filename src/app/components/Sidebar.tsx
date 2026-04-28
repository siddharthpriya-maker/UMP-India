import { useState, useRef, useEffect, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronDown, Link2, FileText } from "lucide-react";
import { SidebarL1Rail } from "./sidebar/SidebarL1Rail";
import { TAB_ROUTES, ROUTE_TO_TAB } from "../App";
import { STORYBOOK_REGISTRY, canonicalStorybookPath, defaultStoryPath, findVariant } from "./storybook/storyRegistry";

const STORYBOOK_L2_VALUE_PREFIX = "__storybook__:";

function storybookL2Value(fullPath: string) {
  return `${STORYBOOK_L2_VALUE_PREFIX}${fullPath}`;
}

function buildStorybookL2Categories(): SubmenuCategory[] {
  return [...STORYBOOK_REGISTRY]
    .sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: "base" }))
    .map((cat) => ({
      title: cat.label,
      collapsible: true,
      items: cat.components.flatMap((comp) =>
        comp.variants.map((v) => ({
          label: comp.variants.length === 1 ? comp.label : `${comp.label}: ${v.label}`,
          value: storybookL2Value(`${cat.id}/${comp.id}/${v.id}`),
        }))
      ),
    }));
}

const storybookL2Categories = buildStorybookL2Categories();

function storybookPathFromLocation(pathname: string, search: string): string {
  if (pathname !== "/storybook") return defaultStoryPath();
  const raw = new URLSearchParams(search).get("p") ?? "";
  if (!findVariant(raw)) return defaultStoryPath();
  return canonicalStorybookPath(raw);
}

interface SubmenuItem {
  /** Omitted in Storybook L2 (`listVariant="storybook"`). */
  icon?: ReactNode;
  label: string;
  value?: string; // Added for routing/content control
}

interface SubmenuCategory {
  title: string;
  items: SubmenuItem[];
  collapsible?: boolean;
}

type L2SubmenuVariant = "default" | "storybook";

interface L2SubmenuProps {
  isOpen: boolean;
  categories: SubmenuCategory[];
  expandedCategory: string | null;
  onCategoryToggle: (category: string) => void;
  onItemClick: (value: string) => void; // Added to handle item selection
  selectedTab: string; // Added to show active state
  /** When set (e.g. Storybook variant rows), overrides `selectedTab` for L2 active styling. */
  activeSubmenuItemValue?: string | null;
  submenuHeader?: ReactNode;
  submenuFooter?: ReactNode;
  /** Storybook: hide row icons only (category titles unchanged). */
  listVariant?: L2SubmenuVariant;
}

function L2Submenu({
  isOpen,
  categories,
  expandedCategory,
  onCategoryToggle,
  onItemClick,
  selectedTab,
  activeSubmenuItemValue,
  submenuHeader,
  submenuFooter,
  listVariant = "default",
}: L2SubmenuProps) {
  if (!isOpen) return null;

  const isStorybookList = listVariant === "storybook";

  return (
    <div className="absolute bottom-0 left-[88px] top-0 z-10 flex max-h-full w-[252px] flex-col rounded-tr-[16px] border-l border-[#e0e0e0] bg-[#e7f1f8] pt-[22px] transition-transform">
      {submenuHeader != null ? <div className="w-full shrink-0 px-[8px]">{submenuHeader}</div> : null}
      <div className="flex min-h-0 flex-1 flex-col items-start overflow-y-auto px-[8px]">
      {categories.map((category) => {
        const isCollapsible = category.collapsible !== false;
        const isExpanded = !isCollapsible ? true : expandedCategory === category.title;
        return (
          <div key={category.title} className="w-full">
            <div className="flex w-full items-center justify-between px-[12px] py-[16px]">
              <p className="text-[12px] font-semibold uppercase leading-[16px] tracking-[0.6px] text-[#101010]">
                {category.title}
              </p>
              {isCollapsible && (
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => onCategoryToggle(category.title)}
                  className="rounded-full p-0.5 transition-colors hover:bg-[#e0e0e0]"
                >
                  <ChevronDown
                    className={`size-6 text-[#101010] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>
              )}
            </div>

            {isExpanded && (
              <div className="flex flex-col">
                {category.items.map((item) => {
                  const itemValue = item.value || item.label;
                  const isActive =
                    activeSubmenuItemValue != null && activeSubmenuItemValue !== ""
                      ? itemValue === activeSubmenuItemValue
                      : selectedTab === itemValue;
                  return (
                    <button
                      key={itemValue}
                      type="button"
                      onClick={() => onItemClick(itemValue)}
                      className={`flex items-start rounded-[12px] p-[12px] transition-colors ${
                        isStorybookList ? "gap-0" : "gap-[8px]"
                      } ${isActive ? "bg-[#b1e6fb]" : "hover:bg-[#e0e0e0]"}`}
                    >
                      {!isStorybookList && item.icon != null ? (
                        <div className="size-6 shrink-0 text-[#101010]">{item.icon}</div>
                      ) : null}
                      <div className="flex-1 py-[2px]">
                        <p className="text-left text-[14px] font-medium leading-[20px] text-[#101010]">
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
      {submenuFooter != null ? (
        <div className="w-full shrink-0 border-t border-[#e0e0e0] px-3 py-3">{submenuFooter}</div>
      ) : null}
    </div>
  );
}

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTab = ROUTE_TO_TAB[location.pathname] || "Home";
  const storybookL2ActiveValue =
    location.pathname === "/storybook"
      ? storybookL2Value(storybookPathFromLocation(location.pathname, location.search))
      : null;

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
    if (activeSubmenu === "Storybook") return storybookL2Categories;
    return acceptPaymentsCategories;
  };

  const handleCategoryToggle = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const submenuConfig: Record<string, string> = {
    "Accept Payments": "Accept Payments",
    Storybook: storybookL2Categories[0]?.title ?? "Actions",
  };

  const handleNavItemClick = (label: string) => {
    if (submenuConfig[label]) {
      setActiveSubmenu(label);
      setIsL2MenuOpen(true);
      setExpandedCategory(submenuConfig[label]);
      if (label === "Storybook") {
        const p = storybookPathFromLocation(location.pathname, location.search);
        navigate(`/storybook?p=${encodeURIComponent(p)}`);
      }
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
    if (value.startsWith(STORYBOOK_L2_VALUE_PREFIX)) {
      const path = value.slice(STORYBOOK_L2_VALUE_PREFIX.length);
      setIsL2MenuOpen(false);
      navigate(`/storybook?p=${encodeURIComponent(path)}`);
      return;
    }
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
      <SidebarL1Rail
        selectedTab={selectedTab}
        pathname={location.pathname}
        onItemClick={handleNavItemClick}
        onItemHover={handleNavItemHover}
        isAcceptPaymentsSubmenuActive={isSubmenuItemActive(acceptPaymentsCategories)}
      />
      
      {/* L2 Submenu Panel */}
      <L2Submenu
        isOpen={isL2MenuOpen}
        categories={getCurrentSubmenuCategories()}
        expandedCategory={expandedCategory}
        onCategoryToggle={handleCategoryToggle}
        onItemClick={handleSubmenuItemClick}
        selectedTab={selectedTab}
        activeSubmenuItemValue={activeSubmenu === "Storybook" ? storybookL2ActiveValue : undefined}
        listVariant={activeSubmenu === "Storybook" ? "storybook" : "default"}
        submenuFooter={
          activeSubmenu === "Storybook" ? (
            <p className="text-[11px] leading-[14px] text-[#7e7e7e]">
              Use <span className="font-medium text-[#101010]">Storybook</span> (L1) to browse every registered component;
              open a variant to preview it and capture learnings—specs, accessibility, and when to use—per component. Mirrors{" "}
              <span className="font-medium text-[#101010]">design-guidelines/</span>; extend the registry as primitives
              ship.
            </p>
          ) : undefined
        }
      />
    </div>
  );
}