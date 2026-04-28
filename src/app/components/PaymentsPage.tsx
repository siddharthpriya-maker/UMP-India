import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
  type CSSProperties,
  type Dispatch,
  type SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronUp, Download, RefreshCw, ChevronRight, Info } from "lucide-react";
import { CopyIcon } from "./Icons";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "./Button";
import { SearchWithDropdown } from "./SearchWithDropdown";
import { PaymentDetailDrawer, type PaymentTransaction } from "./PaymentDetailDrawer";
import { FilterBar } from "./FilterBar";
import { Pagination } from "./Pagination";
import { Overlay } from "./Overlay";
import SuccessSmall from "../../imports/SuccessSmall";
import {
  computeHomePaymentDailySeries,
  formatInrRupeesPrecise,
  type HomePaymentDayPoint,
  type OverviewSelection,
  type PaymentsPageSummaryComputed,
} from "../data/businessOverviewDataset";
import { useMerchantReporting } from "../context/MerchantReportingContext";
import {
  formatOverviewDate,
  labelForSelection,
  startOfWeekMonday,
} from "../lib/businessOverviewRangeLabels";
import { useAnimatedNumber } from "../hooks/useAnimatedNumber";
import { BusinessOverviewCustomDateRange } from "./BusinessOverviewCustomDateRange";

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Parse `day-YYYY-M-D` from `HomePaymentDayPoint.id` (same as dataset). */
function calendarDateFromDayPoint(dayPoint: HomePaymentDayPoint): Date | null {
  const m = /^day-(\d+)-(\d+)-(\d+)$/.exec(dayPoint.id);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

/** Split integer rupees across `parts` rows so the parts sum to `total`. */
function splitIntTotal(total: number, parts: number): number[] {
  if (parts <= 0) return [];
  const base = Math.floor(total / parts);
  const remainder = total - base * parts;
  return Array.from({ length: parts }, (_, i) => base + (i < remainder ? 1 : 0));
}

function maskTransactionIdDisplay(full: string): string {
  return `** ${full.slice(-4)}`;
}

function maskOrderIdDisplay(full: string): string {
  return `******${full.slice(-6)}`;
}

const PAYMENTS_LIST_PAGE_SIZE = 12;

const CUSTOMER_NAMES = ["Ritu Madan", "Manish Bisht", "Koushik Das", "Sneha Dey", "Asha Kapoor", "Vikram Mehta"];
const PAYMENT_OPTIONS = ["UPI", "Debit Card", "Credit Card", "UPI", "Net Banking"];
const COLLECTION_MODES = ["QR", "Card Machine", "Paytm Deals", "QR", "POS"];

/**
 * One listing row per payment in the selected range — same per-day counts as
 * `computeHomePaymentDailySeries` / Payments summary “Payments (N)”.
 */
function generatePaymentsTransactions(selection: OverviewSelection, now: Date): PaymentTransaction[] {
  const series = computeHomePaymentDailySeries(selection, now);
  const daysDesc = [...series].reverse();
  const rows: PaymentTransaction[] = [];
  let seq = 0;

  for (const dayPoint of daysDesc) {
    const n = dayPoint.count;
    if (n <= 0) continue;
    const cal = calendarDateFromDayPoint(dayPoint);
    if (!cal || !Number.isFinite(cal.getTime())) continue;
    const dkey = `${cal.getFullYear()}${pad2(cal.getMonth() + 1)}${pad2(cal.getDate())}`;
    const amounts = splitIntTotal(dayPoint.amount, n);

    for (let k = 0; k < n; k++) {
      const transactionIdFull = `PTM${dkey}${String(seq).padStart(5, "0")}${String(10000 + (seq * 7919) % 90000)}`;
      const orderIdFull = `ORD${dkey}${String(seq).padStart(5, "0")}${String(100000 + (seq * 317) % 900000)}`;
      const slot = n <= 1 ? 0.5 : k / (n - 1);
      const minStart = 10 * 60;
      const minEnd = 20 * 60;
      const minutesFromMidnight = minStart + slot * (minEnd - minStart);
      const h24 = Math.min(20, Math.floor(minutesFromMidnight / 60));
      const min = Math.round(minutesFromMidnight % 60);
      const hour12 = h24 > 12 ? h24 - 12 : h24 === 0 ? 12 : h24;
      const period = h24 >= 12 ? "PM" : "AM";
      const time = `${pad2(hour12)}:${pad2(min)} ${period}`;

      rows.push({
        id: transactionIdFull,
        time,
        dateLabel: dayPoint.fullDate,
        customerName: CUSTOMER_NAMES[seq % CUSTOMER_NAMES.length],
        paymentOption: PAYMENT_OPTIONS[seq % PAYMENT_OPTIONS.length],
        transactionIdMasked: maskTransactionIdDisplay(transactionIdFull),
        transactionIdFull,
        orderIdMasked: maskOrderIdDisplay(orderIdFull),
        orderIdFull,
        collectionMode: COLLECTION_MODES[seq % COLLECTION_MODES.length],
        amount: amounts[k] ?? 0,
        status: "success",
      });
      seq++;
    }
  }
  return rows;
}

type SummaryBreakdownKey = "collections" | "adjustments" | "deductions";

type PaymentsDatePreset = "today" | "yesterday" | "thisWeek" | "thisMonth" | "custom";
type PaymentsDatePresetQuick = Exclude<PaymentsDatePreset, "custom">;

function summaryBreakdownMeta(
  key: SummaryBreakdownKey,
  summary: PaymentsPageSummaryComputed,
): {
  title: string;
  total: string;
  surface: string;
  /** One step darker than the expanded panel’s parent fill (see `collectionsBg` for collections). */
  innerSurface: string;
  rows: { label: string; amount: string }[];
} {
  switch (key) {
    case "collections":
      return {
        title: "Collections",
        total: formatInrRupeesPrecise(summary.collectionsTotalRupees),
        surface: "bg-[#F3F8FE]",
        innerSurface: "bg-[#e3edf8]",
        rows: [],
      };
    case "adjustments":
      return {
        title: "Adjustments",
        total: formatInrRupeesPrecise(summary.adjustmentsTotalRupees),
        surface: "bg-[#FEF7F7]",
        innerSurface: "bg-[#f8efef]",
        rows: summary.adjustmentsRows.map((r) => ({
          label: r.label,
          amount: formatInrRupeesPrecise(r.amountRupees),
        })),
      };
    case "deductions":
      return {
        title: "Deductions",
        total: formatInrRupeesPrecise(summary.deductionsTotalRupees),
        surface: "bg-[#FEF7F7]",
        innerSurface: "bg-[#f8efef]",
        rows: summary.deductionsRows.map((r) => ({
          label: r.label,
          amount: formatInrRupeesPrecise(r.amountRupees),
        })),
      };
  }
}

type BreakdownAnchorRect = { top: number; left: number; width: number; height: number };

/** Expanded breakdown — width 320; height hugs content with a viewport cap. */
const PANEL_W = 320;
const PANEL_MAX_H = "min(360px, calc(100vh - 24px))";

function collectionsFigmaRowsFromSummary(summary: PaymentsPageSummaryComputed): {
  label: string;
  amount: string;
  count?: string;
  labelClass?: string;
  amountClass: string;
  info?: boolean;
}[] {
  const amountClass = "text-[14px] font-semibold leading-[20px] text-[#101010]";
  return [
    {
      label: "Payments",
      count: `(${summary.paymentsCount.toLocaleString("en-IN")})`,
      amount: formatInrRupeesPrecise(summary.paymentsPrincipalRupees),
      amountClass,
    },
    {
      label: "Tip",
      amount: formatInrRupeesPrecise(summary.tipRupees),
      amountClass,
    },
    {
      label: "Reversal",
      amount: formatInrRupeesPrecise(summary.reversalRupees),
      amountClass,
      info: true,
    },
    {
      label: "Bank Credit",
      amount: formatInrRupeesPrecise(summary.bankCreditRupees),
      amountClass,
    },
  ];
}

const REVERSAL_TOOLTIP_W = 200;
const REVERSAL_TOOLTIP_GAP = 8;

function PaymentsSummaryExpandedPanel({
  active,
  anchor,
  refundSubOpen,
  setRefundSubOpen,
  onClose,
  summary,
}: {
  active: SummaryBreakdownKey;
  anchor: BreakdownAnchorRect;
  refundSubOpen: boolean;
  setRefundSubOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  summary: PaymentsPageSummaryComputed;
}) {
  const meta = summaryBreakdownMeta(active, summary);
  const collectionsFigmaRows = useMemo(() => collectionsFigmaRowsFromSummary(summary), [summary]);
  const reversalInfoBtnRef = useRef<HTMLButtonElement>(null);
  const reversalTooltipHoverCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [reversalTooltipPos, setReversalTooltipPos] = useState<{ left: number; top: number } | null>(null);

  const clearReversalTooltipHoverCloseTimer = useCallback(() => {
    if (reversalTooltipHoverCloseTimerRef.current != null) {
      clearTimeout(reversalTooltipHoverCloseTimerRef.current);
      reversalTooltipHoverCloseTimerRef.current = null;
    }
  }, []);

  const scheduleReversalTooltipClose = useCallback(() => {
    clearReversalTooltipHoverCloseTimer();
    reversalTooltipHoverCloseTimerRef.current = setTimeout(() => {
      reversalTooltipHoverCloseTimerRef.current = null;
      setRefundSubOpen(false);
    }, 200);
  }, [clearReversalTooltipHoverCloseTimer, setRefundSubOpen]);

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

  useEffect(() => {
    return () => clearReversalTooltipHoverCloseTimer();
  }, [clearReversalTooltipHoverCloseTimer]);

  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const margin = 16;
  const panelLeft = Math.min(anchor.left, vw - PANEL_W - margin);
  const maxPanelHeightPx = Math.min(360, vh - margin * 2);
  const panelTop = Math.min(anchor.top, vh - margin - maxPanelHeightPx);

  /** Parent fill for collections breakdown — inner uses `meta.innerSurface` one notch darker. */
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
          maxHeight: PANEL_MAX_H,
          height: "auto",
          ...collectionsBg,
        }}
        className={`pointer-events-auto z-[1] flex w-full origin-top-left flex-col items-stretch gap-3 overflow-x-hidden overflow-y-auto rounded-[12px] px-5 py-3 shadow-[0_0_10px_rgba(0,0,0,0.15)] animate-in fade-in-0 zoom-in-95 duration-200 ${
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

        <div
          className={`w-full shrink-0 rounded-[10px] p-3 ${meta.innerSurface}`}
        >
          <div className="flex flex-col gap-1">
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
                    <div className="flex items-center justify-end gap-1">
                      {row.info && (
                        <button
                          ref={reversalInfoBtnRef}
                          type="button"
                          aria-expanded={refundSubOpen}
                          aria-label="Reversal breakdown"
                          onPointerEnter={() => {
                            clearReversalTooltipHoverCloseTimer();
                            setRefundSubOpen(true);
                          }}
                          onPointerLeave={() => scheduleReversalTooltipClose()}
                          onClick={(e) => {
                            e.stopPropagation();
                            clearReversalTooltipHoverCloseTimer();
                            setRefundSubOpen((o) => !o);
                          }}
                          className="inline-flex h-5 shrink-0 items-center justify-center p-0 leading-none text-[#004299] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#004299]"
                        >
                          <Info className="size-4" strokeWidth={2} />
                        </button>
                      )}
                      {row.count != null && (
                        <span
                          className={`shrink-0 tabular-nums leading-[16px] ${
                            row.label === "Payments"
                              ? "text-[14px] font-normal text-[#7e7e7e]"
                              : "text-[12px] font-normal text-[#101010]"
                          }`}
                        >
                          {row.count}
                        </span>
                      )}
                      <span className={`shrink-0 tabular-nums ${row.amountClass}`}>{row.amount}</span>
                    </div>
                  </div>
                ))
              : meta.rows.map((row) => (
                  <div
                    key={row.label}
                    className="grid w-full min-w-0 grid-cols-[1fr_auto] items-center gap-x-3 text-[12px] leading-[16px]"
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
        </div>

        <button
          type="button"
          className="inline-flex w-full shrink-0 items-center justify-start gap-1 text-[#004299]"
          onClick={() => {
            clearReversalTooltipHoverCloseTimer();
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
            onPointerEnter={() => clearReversalTooltipHoverCloseTimer()}
            onPointerLeave={() => scheduleReversalTooltipClose()}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-full top-1/2 mr-[-1px] h-0 w-0 -translate-y-1/2 border-y-[6px] border-r-[6px] border-y-transparent border-r-[#3a3a3a]" />
            <div className="flex flex-col gap-1.5">
              {summary.refundSubRows.map((sub) => (
                <div
                  key={sub.label}
                  className="flex justify-between gap-2 text-[11px] leading-[16px] text-white"
                >
                  <span className="min-w-0 shrink text-white/90">{sub.label}</span>
                  <span className="shrink-0 font-medium tabular-nums">
                    {formatInrRupeesPrecise(sub.amountRupees)}
                  </span>
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
  const {
    businessOverviewDateSelection,
    setBusinessOverviewDateSelection,
    paymentsPageSummary: paymentSummary,
  } = useMerchantReporting();
  const [paymentsDatePanel, setPaymentsDatePanel] = useState<"presets" | "custom">("presets");
  const [statusFilter, setStatusFilter] = useState("Success");
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [listingPage, setListingPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState<PaymentTransaction | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);
  const copiedToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [summaryBreakdown, setSummaryBreakdown] = useState<SummaryBreakdownKey | null>(null);
  const [breakdownAnchor, setBreakdownAnchor] = useState<BreakdownAnchorRect | null>(null);
  const [refundSubOpen, setRefundSubOpen] = useState(false);

  const showCopiedToast = useCallback(() => {
    setCopiedToast(true);
    if (copiedToastTimerRef.current != null) clearTimeout(copiedToastTimerRef.current);
    copiedToastTimerRef.current = setTimeout(() => {
      copiedToastTimerRef.current = null;
      setCopiedToast(false);
    }, 2200);
  }, []);

  useEffect(
    () => () => {
      if (copiedToastTimerRef.current != null) clearTimeout(copiedToastTimerRef.current);
    },
    [],
  );

  const allTransactionsForRange = useMemo(
    () => generatePaymentsTransactions(businessOverviewDateSelection, new Date()),
    [businessOverviewDateSelection],
  );

  const listingTransactions = useMemo(() => {
    if (statusFilter === "All") return allTransactionsForRange;
    return allTransactionsForRange.filter(
      (t) => t.status.toLowerCase() === statusFilter.toLowerCase(),
    );
  }, [allTransactionsForRange, statusFilter]);

  const listingTotalPages = Math.max(1, Math.ceil(listingTransactions.length / PAYMENTS_LIST_PAGE_SIZE));

  const paginatedListingTransactions = useMemo(
    () =>
      listingTransactions.slice(
        (listingPage - 1) * PAYMENTS_LIST_PAGE_SIZE,
        listingPage * PAYMENTS_LIST_PAGE_SIZE,
      ),
    [listingTransactions, listingPage],
  );

  useEffect(() => {
    setListingPage(1);
  }, [businessOverviewDateSelection, statusFilter]);

  useEffect(() => {
    setListingPage((p) => Math.min(p, listingTotalPages));
  }, [listingTotalPages]);

  const dateDropdownRef = useRef<HTMLDivElement>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const collectionsCardRef = useRef<HTMLDivElement>(null);
  const adjustmentsCardRef = useRef<HTMLDivElement>(null);
  const deductionsCardRef = useRef<HTMLDivElement>(null);

  const paymentRangeLabel = useMemo(
    () => labelForSelection(businessOverviewDateSelection),
    [businessOverviewDateSelection],
  );

  useEffect(() => {
    if (isDateDropdownOpen) {
      setPaymentsDatePanel("presets");
    }
  }, [isDateDropdownOpen]);

  const animCollections = useAnimatedNumber(Math.round(paymentSummary.collectionsTotalRupees), 520);
  const animAdjustments = useAnimatedNumber(Math.round(paymentSummary.adjustmentsTotalRupees), 520);
  const animDeductions = useAnimatedNumber(Math.round(paymentSummary.deductionsTotalRupees), 520);
  const animSettlementProcessed = useAnimatedNumber(Math.round(paymentSummary.settlementProcessedRupees), 520);
  const animAvailable = useAnimatedNumber(Math.round(paymentSummary.availableForSettlementRupees), 520);

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

    if (isDateDropdownOpen || isStatusDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDateDropdownOpen, isStatusDropdownOpen]);

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

  const applyPaymentsDatePreset = (preset: PaymentsDatePresetQuick) => {
    setBusinessOverviewDateSelection({ kind: "quick", preset });
    setIsDateDropdownOpen(false);
  };

  const handlePaymentsCustomRangeConfirm = (from: Date, to: Date) => {
    setBusinessOverviewDateSelection({ kind: "custom", from, to });
    setPaymentsDatePanel("presets");
    setIsDateDropdownOpen(false);
  };

  const paymentsNow = new Date();
  const paymentsYesterday = new Date(paymentsNow);
  paymentsYesterday.setDate(paymentsYesterday.getDate() - 1);
  const paymentsWeekStart = startOfWeekMonday(paymentsNow);
  const paymentsMonthStart = new Date(paymentsNow.getFullYear(), paymentsNow.getMonth(), 1);
  const paymentsDateOptions = [
    { preset: "today" as const, title: "Today", subtitle: formatOverviewDate(paymentsNow) },
    { preset: "yesterday" as const, title: "Yesterday", subtitle: formatOverviewDate(paymentsYesterday) },
    {
      preset: "thisWeek" as const,
      title: "This week",
      subtitle: `${formatOverviewDate(paymentsWeekStart)} – ${formatOverviewDate(paymentsNow)}`,
    },
    {
      preset: "thisMonth" as const,
      title: "This month",
      subtitle: `${formatOverviewDate(paymentsMonthStart)} – ${formatOverviewDate(paymentsNow)}`,
    },
    { preset: "custom" as const, title: "Custom range", subtitle: "Choose dates" },
  ];

  return (
    <div className="relative flex flex-col gap-4 md:gap-6 bg-[#ffffff] min-h-full px-[32px] pt-[12px] pb-[32px]">
      {copiedToast ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-4 left-1/2 z-[240] -translate-x-1/2 rounded-[8px] bg-[#101010] px-4 py-2 text-[14px] font-semibold text-white shadow-lg"
        >
          Copied
        </div>
      ) : null}
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
            <div className="relative min-w-0">
              <button
                type="button"
                className="flex min-w-0 max-w-[min(100vw-8rem,22rem)] items-center gap-2 text-left text-[14px] text-[#101010] font-semibold"
                onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              >
                <span className="min-w-0 truncate">{paymentRangeLabel}</span>
                <ChevronDown className={`size-4 shrink-0 transition-transform ${isDateDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isDateDropdownOpen && (
                <div
                  className={
                    paymentsDatePanel === "custom"
                      ? "absolute left-0 top-full z-50 mt-2 w-[min(100vw-2rem,520px)] overflow-hidden rounded-[2px] border border-[#E0E0E0] bg-white shadow-lg"
                      : "absolute left-0 top-full z-50 mt-2 w-[min(100vw-2rem,280px)] min-w-[240px] overflow-hidden rounded-lg border border-[#e0e0e0] bg-white shadow-lg"
                  }
                >
                  {paymentsDatePanel === "custom" ? (
                    <BusinessOverviewCustomDateRange
                      onBack={() => setPaymentsDatePanel("presets")}
                      onConfirm={handlePaymentsCustomRangeConfirm}
                    />
                  ) : (
                    paymentsDateOptions.map(({ preset, title, subtitle }) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() =>
                          preset === "custom"
                            ? setPaymentsDatePanel("custom")
                            : applyPaymentsDatePreset(preset)
                        }
                        className="flex w-full flex-col gap-0.5 px-4 py-3 text-left text-[#101010] transition-colors hover:bg-[#f5f9fe]"
                      >
                        <span className="text-sm font-medium">{title}</span>
                        <span className="text-xs text-[#7e7e7e]">{subtitle}</span>
                      </button>
                    ))
                  )}
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

      {/* Payments Summary — in-flow cards stay same size; expanded panel fixed at card top/left above Overlay */}
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
            className={`relative flex min-w-0 flex-1 flex-col rounded-[12px] bg-[#F3F8FE] p-5 ${
              summaryBreakdown === "collections" ? "ring-2 ring-inset ring-[#004299]/40" : ""
            }`}
          >
            <span className="text-[14px] text-[#7e7e7e]">Collections</span>
            <span className="min-w-0 break-words text-[20px] font-semibold leading-tight text-[#101010] tabular-nums">
              {formatInrRupeesPrecise(animCollections)}
            </span>
            <div className="mt-3 flex items-center">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-[12px] font-medium leading-4 text-[#004299] hover:underline"
                onClick={() => toggleBreakdown("collections")}
              >
                <span>View Breakdown</span>
                <ChevronDown className="size-4 shrink-0 transition-transform" aria-hidden />
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
            className={`relative flex min-w-0 flex-1 flex-col rounded-[12px] bg-[#FEF7F7] p-5 ${
              summaryBreakdown === "adjustments" ? "ring-2 ring-inset ring-[#004299]/40" : ""
            }`}
          >
            <span className="text-[14px] text-[#7e7e7e]">Adjustments</span>
            <span className="min-w-0 break-words text-[20px] font-semibold leading-tight text-[#101010] tabular-nums">
              {formatInrRupeesPrecise(animAdjustments)}
            </span>
            <div className="mt-3 flex items-center">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-[12px] font-medium leading-4 text-[#004299] hover:underline"
                onClick={() => toggleBreakdown("adjustments")}
              >
                <span>View Breakdown</span>
                <ChevronDown className="size-4 shrink-0 transition-transform" aria-hidden />
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
            className={`relative flex min-w-0 flex-1 flex-col rounded-[12px] bg-[#FEF7F7] p-5 ${
              summaryBreakdown === "deductions" ? "ring-2 ring-inset ring-[#004299]/40" : ""
            }`}
          >
            <span className="text-[14px] text-[#7e7e7e]">Deductions</span>
            <span className="min-w-0 break-words text-[20px] font-semibold leading-tight text-[#101010] tabular-nums">
              {formatInrRupeesPrecise(animDeductions)}
            </span>
            <div className="mt-3 flex items-center">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-[12px] font-medium leading-4 text-[#004299] hover:underline"
                onClick={() => toggleBreakdown("deductions")}
              >
                <span>View Breakdown</span>
                <ChevronDown className="size-4 shrink-0 transition-transform" aria-hidden />
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
            <span className="text-[20px] font-semibold text-[#101010] tabular-nums">
              {formatInrRupeesPrecise(animSettlementProcessed)}
            </span>
            <div className="mt-3 flex items-center">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-[12px] font-medium leading-4 text-[#004299] hover:underline"
              >
                <span>View Details</span>
                <ChevronRight className="size-4 shrink-0" aria-hidden />
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
            <span className="text-[20px] font-semibold text-[#101010] tabular-nums">
              {formatInrRupeesPrecise(animAvailable)}
            </span>
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
              <span className="text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold leading-[16px] whitespace-nowrap">Time</span>
              <span className="text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold leading-[16px]">Customer Name</span>
              <span className="text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold leading-[16px] whitespace-nowrap">Payment Option</span>
              <span className="text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold leading-[16px] whitespace-nowrap">Transaction ID</span>
              <span className="text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold leading-[16px] whitespace-nowrap">Collection Mode</span>
              <span className="text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold leading-[16px] text-right whitespace-nowrap">Amount Collected</span>
              <span></span>
            </div>

            {/* Rows: zebra #fff / #fafafa, no row borders (same as Reports) */}
            {paginatedListingTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                onClick={() => setSelectedTransaction(transaction)}
                className={`grid grid-cols-[90px_1fr_110px_130px_140px_130px_40px] gap-8 px-6 py-4 transition-colors cursor-pointer items-center ${
                  index % 2 === 0 ? "bg-white" : "bg-[#fafafa]"
                } hover:bg-[#f5f9fe]`}
              >
                <div className="flex items-center gap-3">
                  <div className="size-5 shrink-0">
                    {transaction.status === "success" ? (
                      <SuccessSmall />
                    ) : (
                      <div
                        className={`size-5 rounded-full ${
                          transaction.status === "pending"
                            ? "bg-[#ff9d00]"
                            : transaction.status === "failed"
                              ? "bg-[#d93025]"
                              : "bg-[#e0e0e0]"
                        }`}
                        aria-hidden
                      />
                    )}
                  </div>
                  <span className="text-[14px] text-[#101010] leading-[24px] whitespace-nowrap">{transaction.time}</span>
                </div>
                <span className="text-[14px] text-[#101010] leading-[24px] whitespace-nowrap">{transaction.customerName}</span>
                <span className="text-[14px] text-[#101010] leading-[24px] whitespace-nowrap">{transaction.paymentOption}</span>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[14px] text-[#101010] leading-[24px] whitespace-nowrap">
                    {transaction.transactionIdMasked}
                  </span>
                  <button
                    type="button"
                    aria-label="Copy transaction ID"
                    className="text-[#004299] hover:text-[#009de5] transition-colors shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      void navigator.clipboard
                        .writeText(transaction.transactionIdFull)
                        .then(() => showCopiedToast());
                    }}
                  >
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

        <Pagination
          currentPage={listingPage}
          totalPages={listingTotalPages}
          onPrevious={() => setListingPage((p) => Math.max(1, p - 1))}
          onNext={() => setListingPage((p) => Math.min(listingTotalPages, p + 1))}
        />
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
            summary={paymentSummary}
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
        onCopied={showCopiedToast}
      />
    </div>
  );
}