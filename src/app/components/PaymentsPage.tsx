import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  type CSSProperties,
  type Dispatch,
  type SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronUp, Download, RefreshCw, ChevronRight, Info } from "lucide-react";
import { CopyIcon } from "./Icons";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "./Button";
import { SearchWithDropdown } from "./SearchWithDropdown";
import { PaymentDetailDrawer } from "./PaymentDetailDrawer";
import { FilterBar } from "./FilterBar";
import { Pagination } from "./Pagination";
import { Overlay } from "./Overlay";
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

type SummaryBreakdownKey = "collections" | "adjustments" | "deductions";

/** Collections expanded breakdown — copy aligned with UMP / Figma Payments summary */
const collectionsBreakdownRows: { label: string; amount: string }[] = [
  { label: "Payments (1145)", amount: "₹9,12,950.60" },
  { label: "Tip", amount: "₹11,240" },
  { label: "Reversal", amount: "₹8,760" },
  { label: "Bank Credit", amount: "₹80,000" },
];

const refundSubBreakdownRows: { label: string; amount: string }[] = [
  { label: "Chargebacks", amount: "₹700" },
  { label: "Refund", amount: "₹4,000" },
  { label: "Merchant Subvention", amount: "₹200" },
  { label: "Bill Advance Cash", amount: "₹3,000" },
  { label: "Payment Hold", amount: "₹600" },
];

const adjustmentsBreakdownRows: { label: string; amount: string }[] = [
  { label: "Credits applied", amount: "₹62,400.00" },
  { label: "Promotional adjustments", amount: "₹25,700.60" },
  { label: "Other", amount: "₹10,000.00" },
];

const deductionsBreakdownRows: { label: string; amount: string }[] = [
  { label: "Platform fees", amount: "₹2,400" },
  { label: "Tax withheld", amount: "₹1,200" },
  { label: "Miscellaneous", amount: "₹400" },
];

function summaryBreakdownMeta(key: SummaryBreakdownKey): {
  title: string;
  total: string;
  surface: string;
  rows: { label: string; amount: string }[];
} {
  switch (key) {
    case "collections":
      return {
        title: "Collections",
        total: "₹10,12,950.60",
        surface: "bg-[#F3F8FE]",
        rows: collectionsBreakdownRows,
      };
    case "adjustments":
      return {
        title: "Adjustments",
        total: "₹98,100.60",
        surface: "bg-[#FEF7F7]",
        rows: adjustmentsBreakdownRows,
      };
    case "deductions":
      return {
        title: "Deductions",
        total: "₹4,000",
        surface: "bg-[#FEF7F7]",
        rows: deductionsBreakdownRows,
      };
  }
}

type BreakdownAnchorRect = { top: number; left: number; width: number; height: number };

/** Figma Frame 1261156551 — 320×228, padding 12×20, inner column gap 12px, row gap 4px, shadow, blue tint on white */
const PANEL_W = 320;
const PANEL_H = 228;
const collectionsFigmaRows: {
  label: string;
  amount: string;
  labelClass?: string;
  amountClass: string;
  info?: boolean;
}[] = [
  {
    label: "Payments",
    amount: "(1145) ₹9,12,950.60",
    amountClass: "text-[14px] font-normal leading-[20px] text-[#7e7e7e]",
  },
  {
    label: "Tip",
    amount: "₹11,240",
    amountClass: "text-[14px] font-semibold leading-[20px] text-[#101010]",
  },
  {
    label: "Reversal",
    amount: "₹8,760",
    amountClass: "text-[14px] font-semibold leading-[20px] text-[#101010]",
    info: true,
  },
  {
    label: "Bank Credit",
    amount: "₹80,000",
    amountClass: "text-[14px] font-semibold leading-[20px] text-[#101010]",
  },
];

const REVERSAL_TOOLTIP_W = 200;
const REVERSAL_TOOLTIP_GAP = 8;

function PaymentsSummaryExpandedPanel({
  active,
  anchor,
  refundSubOpen,
  setRefundSubOpen,
  onClose,
}: {
  active: SummaryBreakdownKey;
  anchor: BreakdownAnchorRect;
  refundSubOpen: boolean;
  setRefundSubOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}) {
  const meta = summaryBreakdownMeta(active);
  const reversalInfoBtnRef = useRef<HTMLButtonElement>(null);
  const [reversalTooltipPos, setReversalTooltipPos] = useState<{ left: number; top: number } | null>(null);

  const updateReversalTooltipPosition = useCallback(() => {
    if (!refundSubOpen || active !== "collections") {
      setReversalTooltipPos(null);
      return;
    }
    const el = reversalInfoBtnRef.current;
    if (!el) {
      setReversalTooltipPos(null);
      return;
    }
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const left = Math.min(r.right + REVERSAL_TOOLTIP_GAP, vw - REVERSAL_TOOLTIP_W - 16);
    setReversalTooltipPos({ left, top: r.top + r.height / 2 });
  }, [refundSubOpen, active]);

  useLayoutEffect(() => {
    updateReversalTooltipPosition();
  }, [updateReversalTooltipPosition, anchor]);

  useEffect(() => {
    if (!refundSubOpen) return;
    window.addEventListener("scroll", updateReversalTooltipPosition, true);
    window.addEventListener("resize", updateReversalTooltipPosition);
    return () => {
      window.removeEventListener("scroll", updateReversalTooltipPosition, true);
      window.removeEventListener("resize", updateReversalTooltipPosition);
    };
  }, [refundSubOpen, updateReversalTooltipPosition]);

  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const margin = 16;
  const panelLeft = Math.min(anchor.left, vw - PANEL_W - margin);
  const panelTop = Math.min(anchor.top, vh - PANEL_H - margin);

  const collectionsBg: CSSProperties =
    active === "collections"
      ? {
          background:
            "linear-gradient(0deg, rgba(47, 129, 237, 0.1), rgba(47, 129, 237, 0.1)), #FFFFFF",
        }
      : {};

  return (
    <div className="pointer-events-none absolute inset-0 overflow-y-auto">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="payments-summary-breakdown-title"
        style={{
          position: "fixed",
          left: panelLeft,
          top: panelTop,
          width: PANEL_W,
          height: PANEL_H,
          ...collectionsBg,
        }}
        className={`pointer-events-auto z-[1] flex h-full w-full flex-col items-stretch gap-3 overflow-hidden rounded-[12px] px-5 py-3 shadow-[0_0_10px_rgba(0,0,0,0.15)] ${
          active === "collections" ? "" : meta.surface
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full shrink-0 flex-col gap-1">
          <span
            id="payments-summary-breakdown-title"
            className="text-[14px] font-normal leading-[20px] text-[#101010]"
          >
            {meta.title}
          </span>
          <span className="text-[20px] font-semibold leading-[24px] text-[#101010]">{meta.total}</span>
        </div>

        <div className="h-px w-full shrink-0 bg-[#e0e0e0]" />

        <div className="flex min-h-0 w-full flex-1 flex-col gap-1 overflow-y-auto">
            {active === "collections"
              ? collectionsFigmaRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid w-full grid-cols-[1fr_auto] items-center gap-x-3"
                  >
                    <span
                      className={
                        row.labelClass ??
                        "min-w-0 text-[12px] font-normal leading-[16px] text-[#101010]"
                      }
                    >
                      {row.label}
                    </span>
                    <div className="flex justify-end gap-1">
                      {row.info && (
                        <button
                          ref={reversalInfoBtnRef}
                          type="button"
                          aria-expanded={refundSubOpen}
                          aria-label="Reversal breakdown"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRefundSubOpen((o) => !o);
                          }}
                          className="inline-flex shrink-0 items-center justify-center p-0 text-[#004299] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#004299]"
                        >
                          <Info className="size-4" strokeWidth={2} />
                        </button>
                      )}
                      <span className={`tabular-nums ${row.amountClass}`}>{row.amount}</span>
                    </div>
                  </div>
                ))
              : meta.rows.map((row) => (
                  <div
                    key={row.label}
                    className="grid w-full grid-cols-[1fr_auto] items-center gap-x-3 text-[12px] leading-[16px]"
                  >
                    <span className="min-w-0 font-normal text-[#101010]">{row.label}</span>
                    <div className="flex justify-end">
                      <span className="text-[14px] font-semibold leading-[20px] tabular-nums text-[#101010]">
                        {row.amount}
                      </span>
                    </div>
                  </div>
                ))}
        </div>

        <div className="h-px w-full shrink-0 bg-[#e0e0e0]" />

        <button
          type="button"
          className="inline-flex w-full shrink-0 items-center justify-start gap-1 text-[#004299]"
          onClick={() => {
            setRefundSubOpen(false);
            onClose();
          }}
        >
          <span className="text-[12px] font-medium leading-[16px]">Hide Breakdown</span>
          <ChevronUp className="size-4 shrink-0" strokeWidth={2} aria-hidden />
        </button>
      </div>

      {refundSubOpen &&
        active === "collections" &&
        reversalTooltipPos &&
        createPortal(
          <div
            role="tooltip"
            style={{
              position: "fixed",
              left: reversalTooltipPos.left,
              top: reversalTooltipPos.top,
              transform: "translateY(-50%)",
              zIndex: 200,
              width: REVERSAL_TOOLTIP_W,
            }}
            className="pointer-events-auto rounded-[8px] bg-[#3a3a3a] px-3 py-2.5 text-left shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-full top-1/2 mr-[-1px] h-0 w-0 -translate-y-1/2 border-y-[6px] border-r-[6px] border-y-transparent border-r-[#3a3a3a]" />
            <div className="flex flex-col gap-1.5">
              {refundSubBreakdownRows.map((sub) => (
                <div
                  key={sub.label}
                  className="flex justify-between gap-2 text-[11px] leading-[16px] text-white"
                >
                  <span className="min-w-0 shrink text-white/90">{sub.label}</span>
                  <span className="shrink-0 font-medium tabular-nums">{sub.amount}</span>
                </div>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export function PaymentsPage() {
  const [dateFilter, setDateFilter] = useState("Today, 28 Aug");
  const [statusFilter, setStatusFilter] = useState("Success");
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<(typeof mockTransactions)[number] | null>(null);
  const [summaryBreakdown, setSummaryBreakdown] = useState<SummaryBreakdownKey | null>(null);
  const [breakdownAnchor, setBreakdownAnchor] = useState<BreakdownAnchorRect | null>(null);
  const [refundSubOpen, setRefundSubOpen] = useState(false);

  const dateDropdownRef = useRef<HTMLDivElement>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const collectionsCardRef = useRef<HTMLDivElement>(null);
  const adjustmentsCardRef = useRef<HTMLDivElement>(null);
  const deductionsCardRef = useRef<HTMLDivElement>(null);

  const toggleBreakdown = (key: SummaryBreakdownKey) => {
    setRefundSubOpen(false);
    setSummaryBreakdown((prev) => (prev === key ? null : key));
  };

  useLayoutEffect(() => {
    if (!summaryBreakdown) {
      setBreakdownAnchor(null);
      return;
    }
    const map = {
      collections: collectionsCardRef,
      adjustments: adjustmentsCardRef,
      deductions: deductionsCardRef,
    } as const;
    const update = () => {
      const el = map[summaryBreakdown].current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setBreakdownAnchor({ top: r.top, left: r.left, width: r.width, height: r.height });
    };
    update();
    const el = map[summaryBreakdown].current;
    const scrollRoot = el?.closest(".shell-main-canvas") as HTMLElement | null;
    window.addEventListener("resize", update);
    scrollRoot?.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      scrollRoot?.removeEventListener("scroll", update);
    };
  }, [summaryBreakdown]);

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

  useEffect(() => {
    if (!summaryBreakdown) setRefundSubOpen(false);
  }, [summaryBreakdown]);

  const searchOptions = [
    { label: "Select Filter", value: "select" },
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

        <FilterBar>
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
                <div className="absolute top-full left-0 mt-1 bg-white border border-[#e0e0e0] rounded-lg shadow-lg w-[180px] z-50">
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
                <div className="absolute top-full left-0 mt-1 bg-white border border-[#e0e0e0] rounded-lg shadow-lg w-[140px] z-50">
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
            <SearchWithDropdown options={searchOptions} defaultOption="select" />
          </div>
        </FilterBar>
      </div>

      {/* Payments Summary — in-flow cards stay same size (no layout shift); expanded panel is fixed at card top/left above Overlay */}
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

        <div className="flex items-center gap-1">
          {/* Collections Card — ref + ring mark slot; expanded panel is fixed at same top/left */}
          <div
            ref={collectionsCardRef}
            className={`relative flex flex-1 flex-col rounded-[12px] bg-[#F3F8FE] p-5 ${
              summaryBreakdown === "collections" ? "ring-2 ring-inset ring-[#004299]/40" : ""
            }`}
          >
            <span className="text-[14px] text-[#7e7e7e]">Collections</span>
            <span className="text-[20px] font-semibold text-[#101010]">₹10,12,950.60</span>
            <div className="mt-3 flex items-center border-t border-[#e0e0e0] pt-3">
              <button
                type="button"
                className="flex items-center gap-1 text-[12px] font-medium text-[#004299] hover:underline"
                onClick={() => toggleBreakdown("collections")}
              >
                <span>View Breakdown</span>
                <ChevronDown className="size-4" />
              </button>
            </div>
          </div>

          {/* Minus Symbol */}
          <div className="flex size-[16px] shrink-0 flex-col content-stretch items-center justify-center rounded-[12px] bg-white">
            <div className="h-[2px] w-[8px] shrink-0 bg-[#7e7e7e]" />
          </div>

          {/* Adjustments Card */}
          <div
            ref={adjustmentsCardRef}
            className={`relative flex flex-1 flex-col rounded-[12px] bg-[#FEF7F7] p-5 ${
              summaryBreakdown === "adjustments" ? "ring-2 ring-inset ring-[#004299]/40" : ""
            }`}
          >
            <span className="text-[14px] text-[#7e7e7e]">Adjustments</span>
            <span className="text-[20px] font-semibold text-[#101010]">₹98,100.60</span>
            <div className="mt-3 flex items-center border-t border-[#e0e0e0] pt-3">
              <button
                type="button"
                className="flex items-center gap-1 text-[12px] font-medium text-[#004299] hover:underline"
                onClick={() => toggleBreakdown("adjustments")}
              >
                <span>View Breakdown</span>
                <ChevronDown className="size-4" />
              </button>
            </div>
          </div>

          {/* Minus Symbol */}
          <div className="flex size-[16px] shrink-0 flex-col content-stretch items-center justify-center rounded-[12px] bg-white">
            <div className="h-[2px] w-[8px] shrink-0 bg-[#7e7e7e]" />
          </div>

          {/* Deductions Card */}
          <div
            ref={deductionsCardRef}
            className={`relative flex flex-1 flex-col rounded-[12px] bg-[#FEF7F7] p-5 ${
              summaryBreakdown === "deductions" ? "ring-2 ring-inset ring-[#004299]/40" : ""
            }`}
          >
            <span className="text-[14px] text-[#7e7e7e]">Deductions</span>
            <span className="text-[20px] font-semibold text-[#101010]">₹4,000</span>
            <div className="mt-3 flex items-center border-t border-[#e0e0e0] pt-3">
              <button
                type="button"
                className="flex items-center gap-1 text-[12px] font-medium text-[#004299] hover:underline"
                onClick={() => toggleBreakdown("deductions")}
              >
                <span>View Breakdown</span>
                <ChevronDown className="size-4" />
              </button>
            </div>
          </div>

          {/* Equals Symbol */}
          <div className="flex size-[16px] shrink-0 flex-col content-stretch items-center justify-center gap-[2px] rounded-[12px] bg-white">
            <div className="h-[1.33px] w-[8px] shrink-0 bg-[#7e7e7e]" />
            <div className="h-[1.33px] w-[8px] shrink-0 bg-[#7e7e7e]" />
          </div>

          {/* Settlement Processed Card */}
          <div className="flex flex-1 flex-col rounded-[12px] bg-[rgba(39,174,95,0.06)] p-5">
            <span className="text-[14px] text-[#7e7e7e]">Settlement Processed</span>
            <span className="text-[20px] font-semibold text-[#101010]">₹5,10,850.60</span>
            <div className="mt-3 flex items-center border-t border-[#e0e0e0] pt-3">
              <button type="button" className="flex items-center gap-1 text-[12px] font-medium text-[#004299] hover:underline">
                <span>View Details</span>
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Plus Symbol */}
          <div className="relative flex size-[16px] shrink-0 items-center justify-center rounded-[12px] bg-white content-stretch">
            <div className="absolute h-[1.33px] w-[8px] bg-[#7e7e7e]" />
            <div className="absolute h-[8px] w-[1.33px] bg-[#7e7e7e]" />
          </div>

          {/* Available for Settlement Card - Primary */}
          <div className="flex flex-1 flex-col rounded-[12px] bg-[#EFF8FD] p-5">
            <span className="truncate text-[14px] text-[#7e7e7e]">Available for Settlement</span>
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

      <Overlay
        visible={!!summaryBreakdown}
        strength="weak"
        className="!z-[100]"
        onClose={() => {
          setSummaryBreakdown(null);
          setRefundSubOpen(false);
        }}
      >
        {summaryBreakdown && breakdownAnchor ? (
          <PaymentsSummaryExpandedPanel
            active={summaryBreakdown}
            anchor={breakdownAnchor}
            refundSubOpen={refundSubOpen}
            setRefundSubOpen={setRefundSubOpen}
            onClose={() => {
              setSummaryBreakdown(null);
              setRefundSubOpen(false);
            }}
          />
        ) : null}
      </Overlay>

      {/* Payment Detail Drawer */}
      <PaymentDetailDrawer
        open={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        transaction={selectedTransaction}
      />
    </div>
  );
}