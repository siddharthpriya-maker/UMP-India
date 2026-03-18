import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Copy, Download, ChevronRight } from "lucide-react";
import { SecondaryButton } from "./Button";
import SuccessSmall from "../../imports/SuccessSmall";

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
  const [filterType, setFilterType] = useState("UTR");
  const [searchValue, setSearchValue] = useState("");
  const [isDurationDropdownOpen, setIsDurationDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const durationDropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (durationDropdownRef.current && !durationDropdownRef.current.contains(event.target as Node)) {
        setIsDurationDropdownOpen(false);
      }
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setIsFilterDropdownOpen(false);
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

        {/* Top Separator */}
        <div className="w-[calc(100%+64px)] h-[1px] bg-[#e0e0e0] mx-[-32px]" />

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row gap-[15px] md:gap-5 items-start md:items-center">
          {/* Duration Filter */}
          <div className="flex flex-col gap-[1px]">
            <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">DURATION</span>
            <div className="relative" ref={durationDropdownRef}>
              <button
                className={`flex items-center gap-2 text-[14px] text-[#101010] font-semibold hover:bg-[#f5f9fe] transition-colors ${isDurationDropdownOpen ? "bg-[#f5f9fe]" : ""}`}
                onClick={() => setIsDurationDropdownOpen(!isDurationDropdownOpen)}
              >
                <span>{durationFilter}</span>
                <ChevronDown className={`size-4 transition-transform ${isDurationDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isDurationDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-[#e0e0e0] rounded-lg shadow-lg w-[180px] z-10">
                  <div className="py-1">
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors"
                      onClick={() => {
                        setDurationFilter("Daily");
                        setIsDurationDropdownOpen(false);
                      }}
                    >
                      Daily
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors"
                      onClick={() => {
                        setDurationFilter("Weekly");
                        setIsDurationDropdownOpen(false);
                      }}
                    >
                      Weekly
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors"
                      onClick={() => {
                        setDurationFilter("Monthly");
                        setIsDurationDropdownOpen(false);
                      }}
                    >
                      Monthly
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors"
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

          {/* Select Filter */}
          <div className="flex flex-col gap-[1px]">
            <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">SELECT FILTER</span>
            <div className="relative" ref={filterDropdownRef}>
              <button
                className={`flex items-center gap-2 text-[14px] text-[#101010] font-semibold hover:bg-[#f5f9fe] transition-colors ${isFilterDropdownOpen ? "bg-[#f5f9fe]" : ""}`}
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              >
                <span>{filterType}</span>
                <ChevronDown className={`size-4 transition-transform ${isFilterDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isFilterDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-[#e0e0e0] rounded-lg shadow-lg w-[140px] z-10">
                  <div className="py-1">
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors"
                      onClick={() => {
                        setFilterType("UTR");
                        setIsFilterDropdownOpen(false);
                      }}
                    >
                      UTR
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors"
                      onClick={() => {
                        setFilterType("Date");
                        setIsFilterDropdownOpen(false);
                      }}
                    >
                      Date
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors"
                      onClick={() => {
                        setFilterType("Amount");
                        setIsFilterDropdownOpen(false);
                      }}
                    >
                      Amount
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Field */}
          <div className="flex items-center bg-white border border-[#e0e0e0] rounded-lg h-[40px] px-3 ml-auto">
            <Search className="size-5 text-[#7e7e7e] mr-2" />
            <input
              type="text"
              placeholder="Enter Search Value"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-transparent text-[14px] text-[#101010] placeholder:text-[#7e7e7e] outline-none font-semibold w-[300px]"
            />
          </div>

          {/* Download Button */}
          <SecondaryButton icon={<Download />}>
            Download
          </SecondaryButton>
        </div>

        {/* Bottom Separator */}
        <div className="w-[calc(100%+64px)] h-[1px] bg-[#e0e0e0] mx-[-32px]" />
      </div>

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
                {/* Table Header */}
                <div className="grid grid-cols-[280px_1fr_140px_120px_120px_140px_40px] gap-8 px-6 py-3 border-b border-[#e0e0e0]">
                  <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold leading-[16px]">Time</span>
                  <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold leading-[16px] whitespace-nowrap">No. of Payments</span>
                  <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold leading-[16px] whitespace-nowrap text-right">Collection Amount</span>
                  <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold leading-[16px] whitespace-nowrap text-right">Investment</span>
                  <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold leading-[16px] whitespace-nowrap text-right">Deduction</span>
                  <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold leading-[16px] whitespace-nowrap text-right">Net Amount</span>
                  <span></span>
                </div>

                {/* Table Rows */}
                {dateGroup.settlements.map((settlement, index) => (
                  <div
                    key={settlement.id}
                    className={`grid grid-cols-[280px_1fr_140px_120px_120px_140px_40px] gap-8 px-6 py-4 hover:bg-[#f5f9fe] transition-colors cursor-pointer items-center ${
                      index < dateGroup.settlements.length - 1 ? "border-b border-[#e0e0e0]" : ""
                    }`}
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
                          className="text-[#00b8f5] hover:text-[#004299] transition-colors shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(settlement.utr);
                          }}
                        >
                          <Copy className="size-4" />
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

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <span className="text-[14px] text-[#7e7e7e]">PAGE 1 OF 12</span>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-[14px] text-[#101010] bg-white border border-[#e0e0e0] rounded-lg hover:bg-[#f5f9fe] transition-colors font-semibold">
            Prev
          </button>
          <button className="px-4 py-2 text-[14px] text-[#101010] bg-white border border-[#e0e0e0] rounded-lg hover:bg-[#f5f9fe] transition-colors font-semibold">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}