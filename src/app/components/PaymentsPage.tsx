import { useState, useRef, useEffect } from "react";
import { ChevronDown, Download, RefreshCw, ChevronRight } from "lucide-react";
import { CopyIcon } from "./Icons";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "./Button";
import { SearchWithDropdown } from "./SearchWithDropdown";
import { PaymentDetailDrawer } from "./PaymentDetailDrawer";
import { Pagination } from "./Pagination";
import SuccessSmall from "../../imports/SuccessSmall";

// Mock data for payments
const mockTransactions = [
  {
    id: 1,
    time: "06:15 PM",
    customerName: "Ritu Madan",
    paymentOption: "UPI",
    transactionId: "** 9090",
    collectionMode: "QR",
    amount: 800,
    status: "success",
  },
  {
    id: 2,
    time: "07:15 PM",
    customerName: "Manish Bisht",
    paymentOption: "Debit Card",
    transactionId: "** 2011",
    collectionMode: "Card Machine",
    amount: 800,
    status: "success",
  },
  {
    id: 3,
    time: "08:15 PM",
    customerName: "Koushik Das",
    paymentOption: "Credit Card",
    transactionId: "** 4444",
    collectionMode: "Paytm Deals",
    amount: 8800,
    status: "success",
  },
  {
    id: 4,
    time: "09:15 PM",
    customerName: "Sneha Dey",
    paymentOption: "UPI",
    transactionId: "** 4342",
    collectionMode: "QR",
    amount: 800,
    status: "success",
  },
];

export function PaymentsPage() {
  const [dateFilter, setDateFilter] = useState("Today, 28 Aug");
  const [statusFilter, setStatusFilter] = useState("Success");
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<(typeof mockTransactions)[number] | null>(null);

  const dateDropdownRef = useRef<HTMLDivElement>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target as Node)) {
        setIsDateDropdownOpen(false);
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setIsStatusDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchOptions = [
    { label: "Transaction ID", value: "transaction_id" },
    { label: "Order ID", value: "order_id" },
    { label: "Refund ID", value: "refund_id" },
    { label: "RRN", value: "rrn" },
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-6 bg-[#ffffff] min-h-full px-[32px] pt-[12px] pb-[32px]">
      {/* Page Title and Filters */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[32px] font-semibold text-[#101010]">Payments</h1>

        {/* Filters — strip flush top/left (p-0); row height matches strip; each filter hover fills strip height */}
        <div className="overflow-visible rounded-[12px] bg-[#fafafa] p-0">
        <div className="flex flex-col gap-0 md:flex-row md:items-stretch">
          {/* Date Filter — py-5 matches pl-5 so inset feels even vs summary cards */}
          <div
            ref={dateDropdownRef}
            className={`flex w-full flex-col gap-[1px] px-5 py-5 transition-colors hover:bg-[#EBEBEB] md:h-full md:w-auto md:rounded-bl-[12px] md:rounded-tl-[12px] ${
              isDateDropdownOpen ? "relative z-30 bg-[#EBEBEB]" : ""
            }`}
          >
            <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">DATE</span>
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 text-[14px] text-[#101010] font-semibold"
                onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              >
                <span>{dateFilter}</span>
                <ChevronDown className={`size-4 transition-transform ${isDateDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isDateDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-1 bg-white border border-[#e0e0e0] rounded-lg shadow-lg w-[180px] z-50">
                  <div className="py-1">
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#EBEBEB] transition-colors"
                      onClick={() => {
                        setDateFilter("Today");
                        setIsDateDropdownOpen(false);
                      }}
                    >
                      Today
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#EBEBEB] transition-colors"
                      onClick={() => {
                        setDateFilter("Yesterday");
                        setIsDateDropdownOpen(false);
                      }}
                    >
                      Yesterday
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#EBEBEB] transition-colors"
                      onClick={() => {
                        setDateFilter("Last 7 Days");
                        setIsDateDropdownOpen(false);
                      }}
                    >
                      Last 7 Days
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#EBEBEB] transition-colors"
                      onClick={() => {
                        setDateFilter("Custom Range");
                        setIsDateDropdownOpen(false);
                      }}
                    >
                      Custom Range
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status Filter */}
          <div
            ref={statusDropdownRef}
            className={`flex w-full flex-col gap-[1px] px-5 py-5 transition-colors hover:bg-[#EBEBEB] md:h-full md:w-auto ${
              isStatusDropdownOpen ? "relative z-30 bg-[#EBEBEB]" : ""
            }`}
          >
            <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">STATUS</span>
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 text-[14px] text-[#101010] font-semibold"
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              >
                <span>{statusFilter}</span>
                <ChevronDown className={`size-4 transition-transform ${isStatusDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isStatusDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-1 bg-white border border-[#e0e0e0] rounded-lg shadow-lg w-[140px] z-50">
                  <div className="py-1">
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#EBEBEB] transition-colors"
                      onClick={() => {
                        setStatusFilter("All");
                        setIsStatusDropdownOpen(false);
                      }}
                    >
                      All
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#EBEBEB] transition-colors"
                      onClick={() => {
                        setStatusFilter("Success");
                        setIsStatusDropdownOpen(false);
                      }}
                    >
                      Success
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#EBEBEB] transition-colors"
                      onClick={() => {
                        setStatusFilter("Pending");
                        setIsStatusDropdownOpen(false);
                      }}
                    >
                      Pending
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#EBEBEB] transition-colors"
                      onClick={() => {
                        setStatusFilter("Failed");
                        setIsStatusDropdownOpen(false);
                      }}
                    >
                      Failed
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Widget — py-5 matches filter columns */}
          <div className="flex w-full flex-1 items-center justify-end px-5 py-5 md:h-full md:w-auto">
            <SearchWithDropdown
              options={searchOptions}
              defaultOption="transaction_id"
            />
          </div>
        </div>
        </div>
      </div>

      {/* Payments Summary Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-medium text-[#101010]">Payments Summary</h2>
          <div className="flex items-center gap-2">
            <TertiaryButton size="small" type="button" icon={<RefreshCw />}>
              Refresh
            </TertiaryButton>
            <SecondaryButton size="small" type="button" icon={<Download />}>
              Download
            </SecondaryButton>
          </div>
        </div>

        {/* Summary Cards Grid */}
        <div className="flex items-center gap-1">
          {/* Collections Card */}
          <div className="bg-[#eaf2fd] rounded-[12px] p-5 flex flex-col flex-1">
            <span className="text-[14px] text-[#7e7e7e]">Collections</span>
            <span className="text-[20px] font-semibold text-[#101010]">₹10,12,950.60</span>
            <div className="border-t border-[#e0e0e0] pt-3 mt-3 flex items-center">
              <button className="flex items-center gap-1 text-[12px] text-[#004299] font-medium hover:underline">
                <span>View Breakdown</span>
                <ChevronDown className="size-4" />
              </button>
            </div>
          </div>

          {/* Minus Symbol */}
          <div className="bg-white content-stretch flex flex-col items-center justify-center rounded-[12px] shrink-0 size-[16px]">
            <div className="bg-[#7e7e7e] h-[2px] shrink-0 w-[8px]" />
          </div>

          {/* Adjustments Card */}
          <div className="bg-[#fdeeee] rounded-[12px] p-5 flex flex-col flex-1">
            <span className="text-[14px] text-[#7e7e7e]">Adjustments</span>
            <span className="text-[20px] font-semibold text-[#101010]">₹98,100.60</span>
            <div className="border-t border-[#e0e0e0] pt-3 mt-3 flex items-center">
              <button className="flex items-center gap-1 text-[12px] text-[#004299] font-medium hover:underline">
                <span>View Breakdown</span>
                <ChevronDown className="size-4" />
              </button>
            </div>
          </div>

          {/* Minus Symbol */}
          <div className="bg-white content-stretch flex flex-col items-center justify-center rounded-[12px] shrink-0 size-[16px]">
            <div className="bg-[#7e7e7e] h-[2px] shrink-0 w-[8px]" />
          </div>

          {/* Deductions Card */}
          <div className="bg-[rgba(235,87,87,0.1)] rounded-[12px] p-5 flex flex-col flex-1">
            <span className="text-[14px] text-[#7e7e7e]">Deductions</span>
            <span className="text-[20px] font-semibold text-[#101010]">₹4,000</span>
            <div className="border-t border-[#e0e0e0] pt-3 mt-3 flex items-center">
              <button className="flex items-center gap-1 text-[12px] text-[#004299] font-medium hover:underline">
                <span>View Breakdown</span>
                <ChevronDown className="size-4" />
              </button>
            </div>
          </div>

          {/* Equals Symbol */}
          <div className="bg-white content-stretch flex flex-col items-center justify-center gap-[2px] rounded-[12px] shrink-0 size-[16px]">
            <div className="bg-[#7e7e7e] h-[1.33px] shrink-0 w-[8px]" />
            <div className="bg-[#7e7e7e] h-[1.33px] shrink-0 w-[8px]" />
          </div>

          {/* Settlement Processed Card */}
          <div className="bg-[rgba(39,174,95,0.1)] rounded-[12px] p-5 flex flex-col flex-1">
            <span className="text-[14px] text-[#7e7e7e]">Settlement Processed</span>
            <span className="text-[20px] font-semibold text-[#101010]">₹5,10,850.60</span>
            <div className="border-t border-[#e0e0e0] pt-3 mt-3 flex items-center">
              <button className="flex items-center gap-1 text-[12px] text-[#004299] font-medium hover:underline">
                <span>View Details</span>
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Plus Symbol */}
          <div className="bg-white content-stretch flex items-center justify-center rounded-[12px] shrink-0 size-[16px] relative">
            <div className="bg-[#7e7e7e] h-[1.33px] absolute w-[8px]" />
            <div className="bg-[#7e7e7e] w-[1.33px] absolute h-[8px]" />
          </div>

          {/* Available for Settlement Card - Primary */}
          <div className="bg-[#e0f5fd] rounded-[12px] p-5 flex flex-col flex-1">
            <span className="text-[14px] text-[#7e7e7e] truncate">Available for Settlement</span>
            <span className="text-[20px] font-semibold text-[#101010]">₹4,00,000</span>
            <PrimaryButton size="small" type="button" fullWidth className="mt-2">
              Settle Now
            </PrimaryButton>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-0">
        {/* Transactions Table */}
        <div className="overflow-x-auto border border-[#e0e0e0] rounded-[12px]">
          <div className="min-w-[800px]">
            {/* Table header — #EBEBEB bar + primary dark labels */}
            <div className="grid grid-cols-[90px_1fr_110px_130px_140px_130px_40px] gap-8 bg-[#EBEBEB] px-6 py-3 border-b border-[#e0e0e0]">
              <span className="text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold leading-[16px]">Time</span>
              <span className="text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold leading-[16px]">Customer Name</span>
              <span className="text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold leading-[16px] whitespace-nowrap">Payment Option</span>
              <span className="text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold leading-[16px] whitespace-nowrap">Transaction ID</span>
              <span className="text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold leading-[16px] whitespace-nowrap">Collection Mode</span>
              <span className="text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold leading-[16px] text-right whitespace-nowrap">Amount Collected</span>
              <span></span>
            </div>

            {/* Rows: zebra #fff / #fafafa, no row borders (same as Reports) */}
            {mockTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                onClick={() => setSelectedTransaction(transaction)}
                className={`grid grid-cols-[90px_1fr_110px_130px_140px_130px_40px] gap-8 px-6 py-4 transition-colors cursor-pointer items-center ${
                  index % 2 === 0 ? "bg-white" : "bg-[#fafafa]"
                } hover:bg-[#f5f9fe]`}
              >
                <div className="flex items-center gap-3">
                  <div className="size-5 shrink-0">
                    <SuccessSmall />
                  </div>
                  <span className="text-[14px] text-[#101010] leading-[24px] whitespace-nowrap">{transaction.time}</span>
                </div>
                <span className="text-[14px] text-[#101010] leading-[24px] whitespace-nowrap">{transaction.customerName}</span>
                <span className="text-[14px] text-[#101010] leading-[24px] whitespace-nowrap">{transaction.paymentOption}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-[#101010] leading-[24px] whitespace-nowrap">{transaction.transactionId}</span>
                  <button className="text-[#004299] hover:text-[#009de5] transition-colors shrink-0">
                    <CopyIcon className="size-4" />
                  </button>
                </div>
                <span className="text-[14px] text-[#101010] leading-[24px] whitespace-nowrap">{transaction.collectionMode}</span>
                <span className="text-[14px] text-[#101010] leading-[24px] font-semibold text-right whitespace-nowrap">₹{transaction.amount.toLocaleString('en-IN')}</span>
                <div className="flex justify-end">
                  <ChevronRight className="size-5 text-[#7e7e7e]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Pagination currentPage={1} totalPages={32} />
      </div>

      {/* Payment Detail Drawer */}
      <PaymentDetailDrawer
        open={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        transaction={selectedTransaction}
      />
    </div>
  );
}