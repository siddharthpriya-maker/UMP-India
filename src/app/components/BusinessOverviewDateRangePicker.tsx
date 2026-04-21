import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import type { OverviewSelection } from "../data/businessOverviewDataset";
import {
  formatOverviewDate,
  labelForSelection,
  startOfWeekMonday,
} from "../lib/businessOverviewRangeLabels";
import { BusinessOverviewCustomDateRange } from "./BusinessOverviewCustomDateRange";

type OverviewDatePreset = "today" | "yesterday" | "thisWeek" | "thisMonth" | "custom";
type OverviewDatePresetQuick = Exclude<OverviewDatePreset, "custom">;

interface BusinessOverviewDateRangePickerProps {
  selection: OverviewSelection;
  onSelectionChange: (next: OverviewSelection) => void;
  /** Wider trigger + label truncation (Business Overview). Narrower variant for chart rows. */
  variant?: "default" | "compact";
}

export function BusinessOverviewDateRangePicker({
  selection,
  onSelectionChange,
  variant = "default",
}: BusinessOverviewDateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [panel, setPanel] = useState<"presets" | "custom">("presets");
  const rootRef = useRef<HTMLDivElement>(null);

  const rangeLabel = useMemo(() => labelForSelection(selection), [selection]);

  useEffect(() => {
    if (isOpen) setPanel("presets");
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const applyQuickPreset = (preset: OverviewDatePresetQuick) => {
    onSelectionChange({ kind: "quick", preset });
    setIsOpen(false);
  };

  const handleCustomRangeConfirm = (from: Date, to: Date) => {
    onSelectionChange({ kind: "custom", from, to });
    setPanel("presets");
    setIsOpen(false);
  };

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekStart = startOfWeekMonday(now);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const options = [
    { preset: "today" as const, title: "Today", subtitle: formatOverviewDate(now) },
    { preset: "yesterday" as const, title: "Yesterday", subtitle: formatOverviewDate(yesterday) },
    {
      preset: "thisWeek" as const,
      title: "This week",
      subtitle: `${formatOverviewDate(weekStart)} – ${formatOverviewDate(now)}`,
    },
    {
      preset: "thisMonth" as const,
      title: "This month",
      subtitle: `${formatOverviewDate(monthStart)} – ${formatOverviewDate(now)}`,
    },
    { preset: "custom" as const, title: "Custom range", subtitle: "Choose dates" },
  ];

  const triggerClass =
    variant === "default"
      ? "flex min-w-0 max-w-[min(100vw-8rem,22rem)] items-center gap-2 text-sm text-[#101010] bg-[#f5f9fe] rounded-lg px-3 py-1.5 hover:bg-gray-50 h-[40px]"
      : "flex min-w-0 max-w-[min(100vw-8rem,20rem)] items-center gap-2 text-[14px] text-[#101010] bg-[#f5f9fe] rounded-lg px-3 py-1.5 hover:bg-[#f5f9fe]/80 h-[40px] self-start transition-colors";

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${triggerClass} ${isOpen && variant === "compact" ? "bg-[#f5f9fe]/80" : ""}`}
      >
        <span className="min-w-0 truncate text-left">{rangeLabel}</span>
        <ChevronDown className={`size-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className={
            panel === "custom"
              ? "absolute left-0 top-full z-10 mt-2 w-[min(100vw-2rem,520px)] overflow-hidden rounded-[2px] border border-[#E0E0E0] bg-white shadow-lg"
              : "absolute left-0 top-full z-10 mt-2 w-[min(100vw-2rem,280px)] min-w-[240px] overflow-hidden rounded-lg border border-border bg-white shadow-lg"
          }
        >
          {panel === "custom" ? (
            <BusinessOverviewCustomDateRange
              onBack={() => setPanel("presets")}
              onConfirm={handleCustomRangeConfirm}
            />
          ) : (
            options.map(({ preset, title, subtitle }) => (
              <button
                key={preset}
                type="button"
                onClick={() =>
                  preset === "custom" ? setPanel("custom") : applyQuickPreset(preset)
                }
                className="flex w-full flex-col gap-0.5 px-4 py-3 text-left text-foreground transition-colors hover:bg-[#f5f9fe]"
              >
                <span className="text-sm font-medium">{title}</span>
                <span className="text-xs text-muted-foreground">{subtitle}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
