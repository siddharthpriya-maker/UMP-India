/**
 * Synthetic business overview numbers for the merchant dashboard.
 * Each calendar month has an 8-digit INR payment total (10,000,000–99,999,999),
 * split across days with deterministic “shape” (weekday vs weekend).
 *
 * **App shell:** `MerchantReportingContext` holds **Business Overview** `OverviewSelection` (same as
 * Home **Payment Summary** chart and `/payments` DATE) and memoized `computeBusinessOverviewMetrics` /
 * `computePaymentsPageSummary`. Home **Payment Sources** uses separate selection in `Dashboard.tsx`.
 */

export type OverviewQuickPreset = "today" | "yesterday" | "thisWeek" | "thisMonth";

export type OverviewSelection =
  | { kind: "quick"; preset: OverviewQuickPreset }
  | { kind: "custom"; from: Date; to: Date };

export type BusinessOverviewMetrics = {
  paymentsTotalRupees: number;
  paymentsCount: number;
  successRatePercent: number;
  settlementTotalRupees: number;
  refundsTotalRupees: number;
  refundsPaymentCount: number;
};

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

function startOfWeekMonday(ref: Date): Date {
  const d = startOfDay(ref);
  const day = d.getDay();
  d.setDate(d.getDate() + (day === 0 ? -6 : 1 - day));
  return d;
}

function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

/** Deterministic PRNG in [0, 1) from a 32-bit seed */
function mulberry32(seed: number): () => number {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Strictly 8-digit rupee total for a calendar month (no leading-zero padding games). */
function monthlyPaymentTotalRupees(year: number, monthIndex: number): number {
  const seed = year * 100 + monthIndex + 1;
  const rnd = mulberry32(seed);
  return 10_000_000 + Math.floor(rnd() * 90_000_000);
}

const monthDailyCache = new Map<string, readonly number[]>();

function monthKey(year: number, monthIndex: number): string {
  return `${year}-${monthIndex}`;
}

/** Per-day INR for one calendar month; sums to `monthlyPaymentTotalRupees`. */
function dailyPaymentsForMonth(year: number, monthIndex: number): readonly number[] {
  const key = monthKey(year, monthIndex);
  const hit = monthDailyCache.get(key);
  if (hit) return hit;

  const total = monthlyPaymentTotalRupees(year, monthIndex);
  const dim = daysInMonth(year, monthIndex);
  const rnd = mulberry32(year * 10_000 + monthIndex * 100 + 7);

  const weights: number[] = [];
  for (let day = 1; day <= dim; day++) {
    const dow = new Date(year, monthIndex, day).getDay();
    const weekend = dow === 0 || dow === 6 ? 1.18 : 1;
    const noise = 0.55 + rnd() * 0.95;
    weights.push(weekend * noise);
  }
  const wSum = weights.reduce((a, b) => a + b, 0);
  const raw = weights.map((w) => (total * w) / wSum);
  const floors = raw.map((x) => Math.floor(x));
  let remainder = total - floors.reduce((a, b) => a + b, 0);
  const out = [...floors];
  let i = 0;
  while (remainder > 0) {
    const idx = i % dim;
    out[idx] += 1;
    remainder -= 1;
    i += 1;
  }

  const frozen = Object.freeze(out);
  monthDailyCache.set(key, frozen);
  return frozen;
}

function paymentRupeesForDate(d: Date): number {
  const y = d.getFullYear();
  const m = d.getMonth();
  const day = d.getDate();
  const series = dailyPaymentsForMonth(y, m);
  return series[day - 1] ?? 0;
}

function paymentCountForDayRupees(rupees: number): number {
  const avgTicket = 78_125 + (rupees % 5000);
  return Math.max(1, Math.round(rupees / avgTicket));
}

function successRateForRange(totalRupees: number, totalCount: number): number {
  const base = 97.2 + ((totalRupees + totalCount) % 180) / 100;
  return Math.min(99.4, Math.max(95.5, Math.round(base * 10) / 10));
}

export function rangeDatesForSelection(
  selection: OverviewSelection,
  now: Date = new Date(),
): { from: Date; to: Date } {
  switch (selection.kind) {
    case "quick": {
      const todayStart = startOfDay(now);
      switch (selection.preset) {
        case "today":
          return { from: todayStart, to: endOfDay(now) };
        case "yesterday": {
          const y = new Date(todayStart);
          y.setDate(y.getDate() - 1);
          return { from: startOfDay(y), to: endOfDay(y) };
        }
        case "thisWeek":
          return { from: startOfWeekMonday(now), to: endOfDay(now) };
        case "thisMonth":
          return {
            from: startOfDay(new Date(now.getFullYear(), now.getMonth(), 1)),
            to: endOfDay(now),
          };
      }
    }
    case "custom": {
      const a = startOfDay(selection.from);
      const b = startOfDay(selection.to);
      const last = b < a ? a : b;
      return { from: a < b ? a : b, to: endOfDay(last) };
    }
  }
  return { from: startOfDay(now), to: endOfDay(now) };
}

function eachCalendarDay(from: Date, to: Date): Date[] {
  const out: Date[] = [];
  const cur = startOfDay(from);
  const end = startOfDay(to);
  let guard = 0;
  while (cur <= end && guard++ < 400) {
    out.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

const MONTH_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

function fullDateLabelForChartDay(d: Date): string {
  const day = String(d.getDate()).padStart(2, "0");
  return `${day} ${MONTH_LONG[d.getMonth()]} ${d.getFullYear()}`;
}

/** Per-day points for home Payment Summary chart (same date logic as overview). */
export type HomePaymentDayPoint = {
  id: string;
  date: string;
  fullDate: string;
  /** INR for the day */
  amount: number;
  count: number;
};

export function computeHomePaymentDailySeries(
  selection: OverviewSelection,
  now: Date = new Date(),
): HomePaymentDayPoint[] {
  const { from, to } = rangeDatesForSelection(selection, now);
  const days = eachCalendarDay(from, to);
  return days.map((d) => {
    const amount = paymentRupeesForDate(d);
    const count = paymentCountForDayRupees(amount);
    const dd = String(d.getDate()).padStart(2, "0");
    return {
      id: `day-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
      date: dd,
      fullDate: fullDateLabelForChartDay(d),
      amount,
      count,
    };
  });
}

export type PaymentSourceBreakdownEntry = {
  id: string;
  name: string;
  /** INR volume for the range */
  value: number;
  color: string;
  percentage: number;
};

const PAYMENT_SOURCE_DEFS: readonly {
  id: string;
  name: string;
  color: string;
  baseWeight: number;
}[] = [
  { id: "upi", name: "UPI", color: "#4A90E2", baseWeight: 0.39 },
  { id: "debit-card", name: "Debit Card", color: "#FFD93D", baseWeight: 0.29 },
  { id: "credit-card", name: "Credit Card", color: "#FF85C0", baseWeight: 0.04 },
  { id: "net-banking", name: "Net Banking", color: "#98D8C8", baseWeight: 0.08 },
  { id: "emi", name: "EMI", color: "#6DD4F2", baseWeight: 0.1 },
  { id: "other", name: "Other", color: "#FFB347", baseWeight: 0.1 },
];

function overviewSelectionSeed(selection: OverviewSelection, now: Date): number {
  const t = now.getFullYear() * 400 + now.getMonth() * 31 + now.getDate();
  if (selection.kind === "quick") {
    const p = { today: 1, yesterday: 2, thisWeek: 3, thisMonth: 4 }[selection.preset];
    return t * 17 + p * 99_991;
  }
  return (
    t * 17 +
    selection.from.getFullYear() * 10_000 +
    selection.from.getMonth() * 100 +
    selection.from.getDate() +
    selection.to.getFullYear() * 10_000 +
    selection.to.getMonth() * 100 +
    selection.to.getDate()
  );
}

/**
 * Split overview payment volume by payment source for the selected range.
 * Shares total with `computeBusinessOverviewMetrics`; weights jitter slightly by selection so the pie changes when the filter changes.
 */
export function computePaymentSourceBreakdown(
  selection: OverviewSelection,
  now: Date = new Date(),
): PaymentSourceBreakdownEntry[] {
  const { paymentsTotalRupees } = computeBusinessOverviewMetrics(selection, now);
  const total = Math.max(0, paymentsTotalRupees);
  if (total === 0) {
    return PAYMENT_SOURCE_DEFS.map((d) => ({
      id: d.id,
      name: d.name,
      value: 0,
      color: d.color,
      percentage: 0,
    }));
  }

  const seed = overviewSelectionSeed(selection, now);
  const rnd = mulberry32(seed);
  const rawWeights = PAYMENT_SOURCE_DEFS.map((d) => d.baseWeight * (0.9 + rnd() * 0.2));
  const wSum = rawWeights.reduce((a, b) => a + b, 0);
  const weights = rawWeights.map((w) => w / wSum);

  const values = weights.map((w) => Math.floor(total * w));
  let rem = total - values.reduce((a, b) => a + b, 0);
  let i = 0;
  while (rem > 0) {
    values[i % values.length]! += 1;
    rem -= 1;
    i += 1;
  }

  const sumV = values.reduce((a, b) => a + b, 0);
  const percentages: number[] = values.map((v) => (sumV > 0 ? Math.round((100 * v) / sumV) : 0));
  let pctSum = percentages.reduce((a, b) => a + b, 0);
  if (percentages.length && pctSum !== 100) {
    percentages[percentages.length - 1]! += 100 - pctSum;
  }

  return PAYMENT_SOURCE_DEFS.map((d, idx) => ({
    id: d.id,
    name: d.name,
    value: values[idx]!,
    color: d.color,
    percentage: percentages[idx]!,
  }));
}

export function computeBusinessOverviewMetrics(
  selection: OverviewSelection,
  now: Date = new Date(),
): BusinessOverviewMetrics {
  const { from, to } = rangeDatesForSelection(selection, now);
  const days = eachCalendarDay(from, to);

  let paymentsTotalRupees = 0;
  let paymentsCount = 0;
  for (const d of days) {
    const r = paymentRupeesForDate(d);
    paymentsTotalRupees += r;
    paymentsCount += paymentCountForDayRupees(r);
  }

  const successRatePercent = successRateForRange(paymentsTotalRupees, paymentsCount);
  const settlementTotalRupees = Math.round(paymentsTotalRupees * 0.8778);
  const refundsTotalRupees = Math.max(0, Math.round(paymentsTotalRupees * 0.00011));
  const refundsPaymentCount = Math.max(1, Math.round(paymentsCount * 0.095));

  return {
    paymentsTotalRupees,
    paymentsCount,
    successRatePercent,
    settlementTotalRupees,
    refundsTotalRupees,
    refundsPaymentCount,
  };
}

export function formatInrRupees(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

/** Same as mock Payments summary cards (two decimal places). */
export function formatInrRupeesPrecise(amount: number): string {
  const n = Math.round(amount * 100) / 100;
  return `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export type PaymentsPageSummaryComputed = {
  overview: BusinessOverviewMetrics;
  /** Same as overview payments total — "Payments" line in collections breakdown */
  paymentsPrincipalRupees: number;
  paymentsCount: number;
  tipRupees: number;
  reversalRupees: number;
  bankCreditRupees: number;
  collectionsTotalRupees: number;
  /** Sum of `adjustmentsRows` — shown on the main Adjustments card */
  adjustmentsTotalRupees: number;
  adjustmentsRows: { label: string; amountRupees: number }[];
  deductionsTotalRupees: number;
  deductionsRows: { label: string; amountRupees: number }[];
  /** Reversal tooltip lines — sum ≈ `reversalRupees` */
  refundSubRows: { label: string; amountRupees: number }[];
  settlementProcessedRupees: number;
  availableForSettlementRupees: number;
};

/** Collections / adjustments / deductions / settlement cards — derived from `computeBusinessOverviewMetrics`. */
export function computePaymentsPageSummary(
  selection: OverviewSelection,
  now: Date = new Date(),
): PaymentsPageSummaryComputed {
  const overview = computeBusinessOverviewMetrics(selection, now);
  const principal = Math.max(0, overview.paymentsTotalRupees);
  const count = overview.paymentsCount;

  const tip = Math.round(principal * 0.01232);
  const reversal = Math.round(principal * 0.0096);
  const bankCredit = Math.round(principal * 0.08763);
  const collectionsTotal = principal + tip + reversal + bankCredit;

  const adjustmentsAnchor = Math.round(collectionsTotal * 0.09685);
  /** Breakdown lines: payment on hold, chargeback, advanced settlement — main card total = their sum */
  const adjShares = [0.38, 0.34, 0.28] as const;
  const adj0 = Math.round(adjustmentsAnchor * adjShares[0]);
  const adj1 = Math.round(adjustmentsAnchor * adjShares[1]);
  const adj2 = Math.max(0, adjustmentsAnchor - adj0 - adj1);
  const adjustmentsRows = [
    { label: "Payment on hold", amountRupees: adj0 },
    { label: "Chargeback", amountRupees: adj1 },
    { label: "Advanced settlement", amountRupees: adj2 },
  ];
  const adjustmentsTotalRupees = adjustmentsRows.reduce((s, r) => s + r.amountRupees, 0);

  const deductionsTotal = Math.max(500, Math.round(collectionsTotal * 0.00395));
  const dedShares = [2400 / 4000, 1200 / 4000, 400 / 4000] as const;
  const ded0 = Math.round(deductionsTotal * dedShares[0]);
  const ded1 = Math.round(deductionsTotal * dedShares[1]);
  const ded2 = Math.max(0, deductionsTotal - ded0 - ded1);
  const deductionsRows = [
    { label: "Platform fees", amountRupees: ded0 },
    { label: "Tax withheld", amountRupees: ded1 },
    { label: "Miscellaneous", amountRupees: ded2 },
  ];

  const refundBase = [700, 4000, 200, 3000, 600];
  const refundSum = refundBase.reduce((a, b) => a + b, 0);
  const refundSubRows = refundBase.map((b, i) => ({
    label: ["Chargebacks", "Refund", "Merchant Subvention", "Bill Advance Cash", "Payment Hold"][i]!,
    amountRupees: reversal > 0 ? Math.max(0, Math.round((b / refundSum) * reversal)) : 0,
  }));
  const refundSubTotal = refundSubRows.reduce((a, r) => a + r.amountRupees, 0);
  if (refundSubRows.length && refundSubTotal !== reversal) {
    const last = refundSubRows[refundSubRows.length - 1]!;
    last.amountRupees = Math.max(0, last.amountRupees + (reversal - refundSubTotal));
  }

  const settlementProcessedRupees = Math.round(collectionsTotal * 0.5045);
  const availableForSettlementRupees = Math.round(settlementProcessedRupees * 0.783);

  return {
    overview,
    paymentsPrincipalRupees: principal,
    paymentsCount: count,
    tipRupees: tip,
    reversalRupees: reversal,
    bankCreditRupees: bankCredit,
    collectionsTotalRupees: collectionsTotal,
    adjustmentsTotalRupees,
    adjustmentsRows,
    deductionsTotalRupees: deductionsTotal,
    deductionsRows,
    refundSubRows,
    settlementProcessedRupees,
    availableForSettlementRupees,
  };
}
