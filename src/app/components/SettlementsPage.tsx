import { useState, useRef, useEffect } from "react";
import { ChevronDown, Download, ChevronRight } from "lucide-react";
import { CopyIcon } from "./Icons";
import { SecondaryButton } from "./Button";
import { FilterBar } from "./FilterBar";
import { SearchWithDropdown } from "./SearchWithDropdown";
import SuccessSmall from "../../imports/SuccessSmall";
import { Pagination } from "./Pagination";

const settlementSearchOptions = [
  { label: "UTR", value: "utr" },
  { label: "Date", value: "date" },
  { label: "Amount", value: "amount" },
];

// Mock data for settlements
const mockSettlements = [
  {
    date: "28 AUG 2022",
    settlements: [
      {
        id: 1,
        time: "4:30 PM",
        utr: "UTR9876543210",
        paymentsCount: 2500,
        dateRange: "28 Aug, 12 AM to 11:10 AM",
        collectionAmount: 49200,
        investment: 51,
        deduction: 4000,
        netAmount: 45149,
      },
      {
        id: 2,
        time: "2:15 PM",
        utr: "UTR9876543211",
        paymentsCount: 1800,
        dateRange: "28 Aug, 8 AM to 2:00 PM",
        collectionAmount: 35000,
        investment: 40,
        deduction: 2500,
        netAmount: 32460,
      },
    ],
  },
  {
    date: "27 AUG 2022",
    settlements: [
      {
        id: 3,
        time: "5:00 PM",
        utr: "UTR9876543212",
        paymentsCount: 3200,
        dateRange: "27 Aug, 12 AM to 11:59 PM",
        collectionAmount: 78500,
        investment: 85,
        deduction: 6000,
        netAmount: 72415,
      },
      {
        id: 4,
        time: "11:30 AM",
        utr: "UTR9876543213",
        paymentsCount: 1500,
        dateRange: "27 Aug, 6 AM to 11:00 AM",
        collectionAmount: 28000,
        investment: 30,
        deduction: 1800,
        netAmount: 26170,
      },
    ],
  },
];

export function SettlementsPage() {
  const [durationFilter, setDurationFilter] = useState("Weekly");
  const [isDurationDropdownOpen, setIsDurationDropdownOpen] = useState(false);

  const durationDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (durationDropdownRef.current && !durationDropdownRef.current.contains(event.target as Node)) {
        setIsDurationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRowClick = (settlementId: number) => {
    console.log(`Navigate to /settlements/${settlementId}`);
    // In a real app: navigate(`/settlements/${settlementId}`);
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6 bg-[#ffffff] min-h-full px-[32px] pt-[12px] pb-[32px]">
      {/* Page Title and Filters */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[32px] font-semibold text-[#101010]">Settlements</h1>

        <FilterBar>
          {/* Duration Filter */}
          <div
            ref={durationDropdownRef}
            className={`flex w-full flex-col gap-[1px] px-5 py-5 transition-colors hover:bg-[#EBEBEB] md:h-full md:w-auto md:rounded-bl-[12px] md:rounded-tl-[12px] ${
              isDurationDropdownOpen ? "relative z-30 bg-[#EBEBEB]" : ""
            }`}
          >
            <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">DURATION</span>
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 text-[14px] text-[#101010] font-semibold"
                onClick={() => setIsDurationDropdownOpen(!isDurationDropdownOpen)}
              >
                <span>{durationFilter}</span>
                <ChevronDown className={`size-4 transition-transform ${isDurationDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isDurationDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-[#e0e0e0] rounded-lg shadow-lg w-[180px] z-50">
                  <div className="py-1">
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#EBEBEB] transition-colors"
                      onClick={() => {
                        setDurationFilter("Daily");
                        setIsDurationDropdownOpen(false);
                      }}
                    >
                      Daily
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#EBEBEB] transition-colors"
                      onClick={() => {
                        setDurationFilter("Weekly");
                        setIsDurationDropdownOpen(false);
                      }}
                    >
                      Weekly
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#EBEBEB] transition-colors"
                      onClick={() => {
                        setDurationFilter("Monthly");
                        setIsDurationDropdownOpen(false);
                      }}
                    >
                      Monthly
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#EBEBEB] transition-colors"
                      onClick={() => {
                        setDurationFilter("Custom Range");
                        setIsDurationDropdownOpen(false);
                      }}
                    >
                      Custom Range
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-end md:h-full md:w-auto md:flex-1">
            <SearchWithDropdown
              options={settlementSearchOptions}
              defaultOption="utr"
            />
            <SecondaryButton type="button" icon={<Download className="size-5" strokeWidth={2} />}>
              Download
            </SecondaryButton>
          </div>
        </FilterBar>
      </div>

      <div className="flex flex-col gap-0">
        {/* Settlements Table */}
        <div className="flex flex-col gap-6">
          {mockSettlements.map((dateGroup, dateIndex) => (
          <div key={dateIndex} className="flex flex-col gap-4">
            {/* Date Header */}
            <h3 className="text-[14px] text-[#7e7e7e] font-semibold uppercase tracking-[0.6px]">
              {dateGroup.date}
            </h3>

            {/* Settlements for this date */}
            <div className="overflow-x-auto border border-[#e0e0e0] rounded-[12px]">
              <div className="min-w-[960px]">
                {/* Table header — #EBEBEB bar + primary dark labels */}
                <div className="grid grid-cols-[280px_1fr_140px_120px_120px_140px_40px] gap-8 bg-[#EBEBEB] px-6 py-3 border-b border-[#e0e0e0]">
                  <span className="text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold leading-[16px]">Time</span>
                  <span className="text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold leading-[16px] whitespace-nowrap">No. of Payments</span>
                  <span className="text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold leading-[16px] whitespace-nowrap text-right">Collection Amount</span>
                  <span className="text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold leading-[16px] whitespace-nowrap text-right">Investment</span>
                  <span className="text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold leading-[16px] whitespace-nowrap text-right">Deduction</span>
                  <span className="text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold leading-[16px] whitespace-nowrap text-right">Net Amount</span>
                  <span></span>
                </div>

                {/* Rows: zebra #fff / #fafafa, no row borders (same as Reports) */}
                {dateGroup.settlements.map((settlement, index) => (
                  <div
                    key={settlement.id}
                    className={`grid grid-cols-[280px_1fr_140px_120px_120px_140px_40px] gap-8 px-6 py-4 transition-colors cursor-pointer items-center ${
                      index % 2 === 0 ? "bg-white" : "bg-[#fafafa]"
                    } hover:bg-[#f5f9fe]`}
                    onClick={() => handleRowClick(settlement.id)}
                  >
                    {/* Time Column with Status */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className="size-5 shrink-0">
                          <SuccessSmall />
                        </div>
                        <span className="text-[14px] text-[#101010] leading-[24px] whitespace-nowrap">
                          Settled at {settlement.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pl-7">
                        <span className="text-[14px] text-[#7e7e7e] leading-[24px] whitespace-nowrap">{settlement.utr}</span>
                        <button 
                          className="text-[#004299] hover:text-[#009de5] transition-colors shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(settlement.utr);
                          }}
                        >
                          <CopyIcon className="size-4" />
                        </button>
                      </div>
                    </div>

                    {/* No. of Payments */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] text-[#101010] leading-[24px] whitespace-nowrap">
                        {settlement.paymentsCount.toLocaleString('en-IN')} Payments Received
                      </span>
                      <span className="text-[14px] text-[#7e7e7e] leading-[24px] whitespace-nowrap">
                        {settlement.dateRange}
                      </span>
                    </div>

                    {/* Collection Amount */}
                    <div className="text-right">
                      <span className="text-[14px] text-[#101010] leading-[24px] font-semibold whitespace-nowrap">
                        ₹{settlement.collectionAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Investment */}
                    <div className="text-right">
                      <span className="text-[14px] text-[#101010] leading-[24px] font-semibold whitespace-nowrap">
                        ₹{settlement.investment.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Deduction */}
                    <div className="text-right">
                      <span className="text-[14px] text-[#101010] leading-[24px] font-semibold whitespace-nowrap">
                        ₹{settlement.deduction.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Net Amount */}
                    <div className="text-right">
                      <span className="text-[14px] text-[#21c179] leading-[24px] font-semibold whitespace-nowrap">
                        ₹{settlement.netAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Chevron */}
                    <div className="flex justify-end">
                      <ChevronRight className="size-5 text-[#7e7e7e]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          ))}
        </div>

        <Pagination currentPage={1} totalPages={12} />
      </div>
    </div>
  );
}