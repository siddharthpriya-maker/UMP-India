import { useState, useRef, useEffect, type ReactNode } from "react";
import { ChevronDown, Download, Info } from "lucide-react";
import RefundsDuo from "../../imports/RefundsDuo";
import { FilterBar } from "./FilterBar";
import { SearchWithDropdown } from "./SearchWithDropdown";
import { SecondaryButton } from "./Button";

const MONTH_LONG: Record<string, string> = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

function formatEmptyStateDate(durationLabel: string): string {
  const parts = durationLabel.split(", ");
  if (parts.length < 2) return durationLabel;
  const tail = parts[1].trim();
  const [day, mon] = tail.split(/\s+/);
  if (day && mon) {
    const month = MONTH_LONG[mon] ?? mon;
    return `${day} ${month}`;
  }
  return tail;
}

function FilterLabel({
  children,
  infoAriaLabel,
}: {
  children: ReactNode;
  infoAriaLabel?: string;
}) {
  return (
    <span className="flex items-center gap-1.5 text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">
      {children}
      {infoAriaLabel != null && (
        <button
          type="button"
          className="inline-flex shrink-0 p-0 text-[#004299] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2"
          aria-label={infoAriaLabel}
        >
          <Info className="size-4" strokeWidth={2} />
        </button>
      )}
    </span>
  );
}

const searchFieldOptions = [
  { label: "Select Filter", value: "select" },
  { label: "Transaction ID", value: "transaction_id" },
  { label: "Promocode", value: "promocode" },
  { label: "Order ID", value: "order_id" },
  { label: "Customer ID", value: "customer_id" },
  { label: "Response Code", value: "response_code" },
];

export function RefundsPage() {
  const [durationFilter, setDurationFilter] = useState("Today, 17 Apr");
  const [statusFilter, setStatusFilter] = useState("Success");
  const [subStatusFilter, setSubStatusFilter] = useState("All");

  const [durationOpen, setDurationOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [subStatusOpen, setSubStatusOpen] = useState(false);

  const durationRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const subStatusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeAll = () => {
      setDurationOpen(false);
      setStatusOpen(false);
      setSubStatusOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const t = event.target as Node;
      if (durationRef.current?.contains(t)) return;
      if (statusRef.current?.contains(t)) return;
      if (subStatusRef.current?.contains(t)) return;
      closeAll();
    };

    if (durationOpen || statusOpen || subStatusOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [durationOpen, statusOpen, subStatusOpen]);

  const emptyDatePhrase = formatEmptyStateDate(durationFilter);

  return (
    <div className="flex flex-col gap-4 md:gap-6 bg-[#ffffff] min-h-full px-[32px] pt-[12px] pb-[32px]">
      <div className="flex flex-col gap-4 md:gap-6">
        <h1 className="text-[32px] font-semibold text-[#101010]">Refunds</h1>

        <FilterBar>
          <div
            ref={durationRef}
            className={`flex w-full flex-col gap-[1px] px-5 py-5 transition-colors hover:bg-[#EBEBEB] md:h-full md:w-auto md:rounded-bl-[12px] md:rounded-tl-[12px] ${
              durationOpen ? "relative z-30 bg-[#EBEBEB]" : ""
            }`}
          >
            <FilterLabel>DURATION</FilterLabel>
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 text-[14px] text-[#101010] font-semibold"
                onClick={() => {
                  setDurationOpen(!durationOpen);
                  setStatusOpen(false);
                  setSubStatusOpen(false);
                }}
              >
                <span>{durationFilter}</span>
                <ChevronDown className={`size-4 transition-transform ${durationOpen ? "rotate-180" : ""}`} />
              </button>
              {durationOpen && (
                <div className="absolute top-full left-0 z-50 mt-1 w-[180px] rounded-lg border border-[#e0e0e0] bg-white shadow-lg">
                  <div className="py-1">
                    {["Today, 17 Apr", "Yesterday, 16 Apr", "Last 7 Days", "Custom Range"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className="w-full px-4 py-2 text-left text-[14px] text-[#101010] transition-colors hover:bg-[#EBEBEB]"
                        onClick={() => {
                          setDurationFilter(opt);
                          setDurationOpen(false);
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            ref={statusRef}
            className={`flex w-full flex-col gap-[1px] px-5 py-5 transition-colors hover:bg-[#EBEBEB] md:h-full md:w-auto ${
              statusOpen ? "relative z-30 bg-[#EBEBEB]" : ""
            }`}
          >
            <FilterLabel infoAriaLabel="About status filter">STATUS</FilterLabel>
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 text-[14px] text-[#101010] font-semibold"
                onClick={() => {
                  setStatusOpen(!statusOpen);
                  setDurationOpen(false);
                  setSubStatusOpen(false);
                }}
              >
                <span>{statusFilter}</span>
                <ChevronDown className={`size-4 transition-transform ${statusOpen ? "rotate-180" : ""}`} />
              </button>
              {statusOpen && (
                <div className="absolute top-full left-0 z-50 mt-1 w-[140px] rounded-lg border border-[#e0e0e0] bg-white shadow-lg">
                  <div className="py-1">
                    {["All", "Success", "Pending", "Failed"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className="w-full px-4 py-2 text-left text-[14px] text-[#101010] transition-colors hover:bg-[#EBEBEB]"
                        onClick={() => {
                          setStatusFilter(opt);
                          setStatusOpen(false);
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            ref={subStatusRef}
            className={`flex w-full flex-col gap-[1px] px-5 py-5 transition-colors hover:bg-[#EBEBEB] md:h-full md:w-auto ${
              subStatusOpen ? "relative z-30 bg-[#EBEBEB]" : ""
            }`}
          >
            <FilterLabel infoAriaLabel="About sub-status filter">SUB-STATUS</FilterLabel>
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 text-[14px] text-[#101010] font-semibold"
                onClick={() => {
                  setSubStatusOpen(!subStatusOpen);
                  setDurationOpen(false);
                  setStatusOpen(false);
                }}
              >
                <span>{subStatusFilter}</span>
                <ChevronDown className={`size-4 transition-transform ${subStatusOpen ? "rotate-180" : ""}`} />
              </button>
              {subStatusOpen && (
                <div className="absolute top-full left-0 z-50 mt-1 w-[160px] rounded-lg border border-[#e0e0e0] bg-white shadow-lg">
                  <div className="py-1">
                    {["All", "Initiated", "Processed", "Failed"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className="w-full px-4 py-2 text-left text-[14px] text-[#101010] transition-colors hover:bg-[#EBEBEB]"
                        onClick={() => {
                          setSubStatusFilter(opt);
                          setSubStatusOpen(false);
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex w-full flex-1 items-center justify-end px-5 py-5 md:h-full md:w-auto">
            <SearchWithDropdown options={searchFieldOptions} defaultOption="select" />
          </div>
        </FilterBar>

        <div className="rounded-[12px] bg-[#fafafa] px-5 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-start gap-8 md:gap-12">
              <div className="flex min-w-0 flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.6px] text-[#7e7e7e]">
                  Total refund amount
                  <button
                    type="button"
                    className="inline-flex shrink-0 p-0 text-[#004299] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2"
                    aria-label="About total refund amount"
                  >
                    <Info className="size-4" strokeWidth={2} />
                  </button>
                </span>
                <span className="text-[20px] font-semibold text-[#101010]">0</span>
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <span className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#7e7e7e]">
                  Total refund transactions
                </span>
                <span className="text-[20px] font-semibold text-[#101010]">0</span>
              </div>
            </div>
            <SecondaryButton type="button" size="small" icon={<Download className="size-5" strokeWidth={2} />}>
              Download
            </SecondaryButton>
          </div>
        </div>

        <div className="flex min-h-[min(60vh,420px)] flex-col items-center justify-center gap-4 rounded-[12px] border border-[#e0e0e0] bg-white px-6 py-16">
          <div className="flex size-20 items-center justify-center rounded-full bg-[#e0f5fd]">
            <div className="size-10 shrink-0 text-[#101010]" aria-hidden>
              <RefundsDuo />
            </div>
          </div>
          <p className="max-w-md text-center text-[14px] text-[#101010]">
            No refunds available for {emptyDatePhrase}
          </p>
        </div>
      </div>
    </div>
  );
}
