import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { DayPicker, type DateRange } from "react-day-picker";

import { cn } from "./ui/utils";

function formatDashDMY(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = String(d.getFullYear());
  return `${dd}-${mm}-${yyyy}`;
}

function DateReadout({
  label,
  value,
}: {
  label: string;
  value: Date | undefined;
}) {
  const filled = Boolean(value);
  return (
    <div
      className={cn(
        "box-border flex h-14 w-[240px] max-w-full shrink-0 flex-row items-center gap-2 rounded border border-[#E0E0E0] bg-white px-4 py-2",
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-0.5">
        <span className="w-full text-left text-[12px] font-normal leading-4 text-[#7E7E7E]">
          {label}
        </span>
        <span
          className={cn(
            "min-h-5 w-full text-left text-[14px] leading-5 tabular-nums",
            filled
              ? "font-semibold text-[#101010]"
              : "font-normal text-[#CACACA]",
          )}
        >
          {filled ? formatDashDMY(value!) : "DD-MM-YYYY"}
        </span>
      </div>
      <CalendarIcon
        className="pointer-events-none size-6 shrink-0 text-[#CACACA]"
        aria-hidden
      />
    </div>
  );
}

export interface BusinessOverviewCustomDateRangeProps {
  onBack: () => void;
  onConfirm: (from: Date, to: Date) => void;
}

/** Calendar shell per layout spec; CTAs + range endpoints use primary navy (`buttons.mdc`); in-range uses Primary Weak `#e0f5fd` (`colors.mdc`). */
export function BusinessOverviewCustomDateRange({
  onBack,
  onConfirm,
}: BusinessOverviewCustomDateRangeProps) {
  const [range, setRange] = useState<DateRange | undefined>();

  const from = range?.from;
  const to = range?.to;
  const rangeComplete = Boolean(from && to);

  const handleConfirm = () => {
    if (!from || !to) return;
    const start = from.getTime() <= to.getTime() ? from : to;
    const end = from.getTime() <= to.getTime() ? to : from;
    onConfirm(start, end);
  };

  return (
    <div className="flex w-[520px] max-w-[min(520px,calc(100vw-2rem))] flex-col items-stretch overflow-hidden rounded-[2px] bg-white">
      {/* Header — Confirm = UMP Primary small (`buttons.mdc`) */}
      <header className="relative flex h-16 shrink-0 items-center px-4">
        <button
          type="button"
          onClick={onBack}
          className="z-10 flex size-6 shrink-0 items-center justify-center rounded-sm text-[#101010] hover:bg-[#F5F9FE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2"
          aria-label="Back to presets"
        >
          <ChevronLeft className="size-6" strokeWidth={1.75} />
        </button>
        <h3 className="pointer-events-none absolute inset-x-0 text-center text-[14px] font-bold leading-5 text-[#101010]">
          Custom Date Range
        </h3>
        <div className="z-10 ml-auto flex shrink-0">
          <button
            type="button"
            disabled={!rangeComplete}
            onClick={handleConfirm}
            className={cn(
              "box-border inline-flex h-8 min-w-[80px] items-center justify-center rounded-[8px] px-4 py-2 text-center text-[12px] font-semibold leading-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2",
              rangeComplete
                ? "bg-[#004299] text-white hover:bg-[#012A72]"
                : "cursor-not-allowed bg-[#ebebeb] text-[#acacac]",
            )}
          >
            Confirm
          </button>
        </div>
      </header>

      {/* Date fields strip — 80px, #F5F9FE, fields 240×56 */}
      <div className="flex h-20 shrink-0 items-center gap-2 bg-[#F5F9FE] px-4 py-3">
        <DateReadout label="Start Date" value={from} />
        <DateReadout label="End Date" value={to} />
      </div>

      <div className="flex min-h-0 w-full flex-1 flex-col px-0 pb-4 pt-0">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          weekStartsOn={0}
          showOutsideDays
          defaultMonth={new Date()}
          className="flex w-full flex-col"
          formatters={{
            formatCaption: (date) =>
              date
                .toLocaleDateString("en-GB", { month: "short", year: "numeric" })
                .toUpperCase(),
          }}
          components={{
            IconLeft: ({ className, ...props }) => (
              <ChevronLeft className={cn("size-6", className)} strokeWidth={1.75} {...props} />
            ),
            IconRight: ({ className, ...props }) => (
              <ChevronRight className={cn("size-6", className)} strokeWidth={1.75} {...props} />
            ),
          }}
          classNames={{
            months: "flex w-full flex-col",
            month: "flex w-full flex-col gap-0",
            caption:
              "relative flex h-12 w-full shrink-0 items-center justify-center px-4 py-3",
            caption_label:
              "relative z-10 text-center text-[12px] font-bold uppercase leading-4 tracking-[0.6px] text-[#101010]",
            nav: "pointer-events-none absolute inset-x-4 top-1/2 flex -translate-y-1/2 items-center justify-between",
            nav_button:
              "pointer-events-auto inline-flex size-6 items-center justify-center rounded-sm border-0 bg-transparent p-0 text-[#101010] hover:bg-[#F5F9FE]",
            nav_button_previous: "",
            nav_button_next: "",
            table: "w-full border-collapse table-fixed",
            head: "rdp-head",
            head_row: "",
            // Same top spacing as date cells (`!pt-3`) so header ↔ 1st row matches row ↔ row
            head_cell:
              "min-h-11 w-[14.285714%] px-0 !pt-3 !pb-0 align-middle text-center text-[12px] font-bold uppercase leading-4 tracking-[0.6px] text-[#7E7E7E]",
            tbody: "rdp-tbody w-full [&>tr>td]:!pt-3",
            row: "rdp-row h-7",
            cell: cn(
              "rdp-cell relative z-0 h-7 w-[14.285714%] !p-0 align-middle text-center",
            ),
            day: cn(
              "rdp-day relative z-[1] mx-auto inline-flex size-7 max-w-full shrink-0 items-center justify-center rounded-full p-0 text-[14px] font-normal leading-5 text-[#101010]",
              "hover:bg-[#F5F9FE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004299]",
            ),
            day_outside: "text-[#B0B0B0] opacity-60",
            day_disabled: "opacity-30",
            day_hidden: "invisible",
            // Full-width day buttons = continuous strip; UMP tokens on the control (always pairs bg + text)
            day_range_start: cn(
              "rdp-day_range_start",
              "!mx-0 !inline-flex !h-7 !min-h-7 !w-full !max-w-none !shrink-0 !items-center !justify-center !p-0 !text-[14px] !font-medium !leading-5",
              "!bg-[#004299] !text-white hover:!bg-[#012A72] hover:!text-white",
              // Rounded rectangle caps (`rounded-lg` = 8px) — not pills; same-day → full rounded-rect
              "!rounded-l-lg !rounded-r-none [&.rdp-day_range_end]:!rounded-lg",
            ),
            day_range_end: cn(
              "rdp-day_range_end",
              "!mx-0 !inline-flex !h-7 !min-h-7 !w-full !max-w-none !shrink-0 !items-center !justify-center !p-0 !text-[14px] !font-medium !leading-5",
              "!bg-[#004299] !text-white hover:!bg-[#012A72] hover:!text-white",
              "!rounded-r-lg !rounded-l-none [&.rdp-day_range_start]:!rounded-lg",
            ),
            day_range_middle: cn(
              "rdp-day_range_middle",
              "!mx-0 !inline-flex !h-7 !min-h-7 !w-full !max-w-none !shrink-0 !items-center !justify-center !rounded-none !p-0 !text-[14px] !font-normal !leading-5",
              "!bg-[#e0f5fd] !text-[#101010] hover:!bg-[#ccecf8] hover:!text-[#101010]",
            ),
            day_selected: "",
            day_today: "font-semibold text-[#004299]",
          }}
        />
      </div>
    </div>
  );
}
