interface Tab {
  label: string;
  value: string;
  badge?: number;
}

interface PrimaryTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function PrimaryTabs({ tabs, activeTab, onTabChange }: PrimaryTabsProps) {
  return (
    <div className="flex flex-col isolate items-start pb-px relative">
      <div className="flex gap-[32px] items-start mb-[-1px] relative z-[2]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              className="group flex flex-col items-start gap-[8px] transition-colors"
            >
              <div className="flex gap-[8px] items-center justify-center">
                <span
                  className={`text-[18px] leading-[24px] whitespace-nowrap ${
                    isActive
                      ? "font-bold text-[#004299]"
                      : "font-normal text-[#101010]"
                  }`}
                >
                  {tab.label}
                </span>
                {tab.badge !== undefined && (
                  <div className="flex items-center justify-center min-w-[16px] px-[4px] py-[2px] rounded-full bg-[#004299]">
                    <span className="text-[10px] font-medium leading-[12px] text-white text-center">
                      {tab.badge}
                    </span>
                  </div>
                )}
              </div>
              <div
                className={`w-full h-[4px] transition-colors ${
                  isActive
                    ? "bg-[#004299]"
                    : "bg-transparent group-hover:bg-[#e0e0e0]"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface SecondaryTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (value: string) => void;
  variant?: "flat" | "outlined";
  gap?: number;
}

export function SecondaryTabs({
  tabs,
  activeTab,
  onTabChange,
  variant = "flat",
  gap = 16,
}: SecondaryTabsProps) {
  return (
    <div className="flex items-center" style={{ gap: `${gap}px` }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;

        const activeClasses = "bg-[#004299]";
        const inactiveClasses =
          variant === "flat"
            ? "bg-[#f5f9fe] hover:bg-[#e0e0e0]"
            : "bg-white border border-[#cacaca] hover:border-[#7e7e7e]";

        return (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={`flex h-[32px] items-center justify-center px-[12px] py-[4px] rounded-[8px] transition-colors ${
              isActive ? activeClasses : inactiveClasses
            }`}
          >
            <div className="flex gap-[8px] items-center">
              <span
                className={`text-[14px] leading-[20px] whitespace-nowrap ${
                  isActive
                    ? "font-semibold text-white"
                    : "font-normal text-[#101010]"
                }`}
              >
                {tab.label}
              </span>
              {tab.badge !== undefined && (
                <div
                  className={`flex items-center justify-center min-w-[16px] px-[4px] py-[2px] rounded-full ${
                    isActive ? "bg-white" : "bg-[#004299]"
                  }`}
                >
                  <span
                    className={`text-[10px] font-medium leading-[12px] text-center ${
                      isActive ? "text-[#004299]" : "text-white"
                    }`}
                  >
                    {tab.badge}
                  </span>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
