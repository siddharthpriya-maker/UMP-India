import { useEffect, useMemo, useRef, useState } from "react";
import { Download } from "lucide-react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { SecondaryButton } from "./Button";
import { ActionsNotificationsWidget } from "./ActionsNotificationsWidget";
import {
  computeHomePaymentDailySeries,
  computePaymentSourceBreakdown,
  type HomePaymentDayPoint,
  type OverviewSelection,
} from "../data/businessOverviewDataset";
import { labelForSelection } from "../lib/businessOverviewRangeLabels";
import { BusinessOverviewDateRangePicker } from "./BusinessOverviewDateRangePicker";

const PAYMENT_SUMMARY_RESET_MS = 420;
const PAYMENT_SUMMARY_BAR_ANIM_MS = 400;
const PAYMENT_SUMMARY_LINE_ANIM_MS = 450;

function selectionKey(s: OverviewSelection): string {
  if (s.kind === "quick") return `q:${s.preset}`;
  return `c:${s.from.toISOString().slice(0, 10)}:${s.to.toISOString().slice(0, 10)}`;
}

function zeroSeries(points: HomePaymentDayPoint[]): HomePaymentDayPoint[] {
  return points.map((p) => ({ ...p, amount: 0, count: 0 }));
}

export interface Dashboard2Props {
  paymentSummarySelection: OverviewSelection;
  onPaymentSummarySelectionChange: (next: OverviewSelection) => void;
  paymentSourcesSelection: OverviewSelection;
  onPaymentSourcesSelectionChange: (next: OverviewSelection) => void;
}

export function Dashboard2({
  paymentSummarySelection,
  onPaymentSummarySelectionChange,
  paymentSourcesSelection,
  onPaymentSourcesSelectionChange,
}: Dashboard2Props) {
  const paymentSeries = useMemo(
    () => computeHomePaymentDailySeries(paymentSummarySelection),
    [paymentSummarySelection],
  );

  const [paymentChartDisplaySeries, setPaymentChartDisplaySeries] = useState<HomePaymentDayPoint[]>(
    () => paymentSeries,
  );
  const lastStableSeriesRef = useRef<HomePaymentDayPoint[]>(paymentSeries);
  const lastSelectionKeyRef = useRef<string>(selectionKey(paymentSummarySelection));
  const isPaymentChartInitialMount = useRef(true);
  const paymentChartTimersRef = useRef<{ timeout: ReturnType<typeof setTimeout> | null; raf1: number | null; raf2: number | null }>({
    timeout: null,
    raf1: null,
    raf2: null,
  });

  useEffect(() => {
    const key = selectionKey(paymentSummarySelection);
    if (isPaymentChartInitialMount.current) {
      isPaymentChartInitialMount.current = false;
      setPaymentChartDisplaySeries(paymentSeries);
      lastStableSeriesRef.current = paymentSeries;
      lastSelectionKeyRef.current = key;
      return;
    }
    if (key === lastSelectionKeyRef.current) {
      setPaymentChartDisplaySeries(paymentSeries);
      lastStableSeriesRef.current = paymentSeries;
      return;
    }
    lastSelectionKeyRef.current = key;

    const clearTimers = () => {
      const t = paymentChartTimersRef.current;
      if (t.timeout != null) {
        clearTimeout(t.timeout);
        t.timeout = null;
      }
      if (t.raf1 != null) {
        cancelAnimationFrame(t.raf1);
        t.raf1 = null;
      }
      if (t.raf2 != null) {
        cancelAnimationFrame(t.raf2);
        t.raf2 = null;
      }
    };
    clearTimers();

    const reduceMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setPaymentChartDisplaySeries(paymentSeries);
      lastStableSeriesRef.current = paymentSeries;
      return;
    }

    const previous = lastStableSeriesRef.current;
    setPaymentChartDisplaySeries(zeroSeries(previous));

    paymentChartTimersRef.current.timeout = setTimeout(() => {
      paymentChartTimersRef.current.timeout = null;
      setPaymentChartDisplaySeries(zeroSeries(paymentSeries));

      paymentChartTimersRef.current.raf1 = requestAnimationFrame(() => {
        paymentChartTimersRef.current.raf1 = null;
        paymentChartTimersRef.current.raf2 = requestAnimationFrame(() => {
          paymentChartTimersRef.current.raf2 = null;
          setPaymentChartDisplaySeries(paymentSeries);
          lastStableSeriesRef.current = paymentSeries;
        });
      });
    }, PAYMENT_SUMMARY_RESET_MS);

    return clearTimers;
  }, [paymentSummarySelection, paymentSeries]);

  const paymentSourcesData = useMemo(
    () => computePaymentSourceBreakdown(paymentSourcesSelection),
    [paymentSourcesSelection],
  );

  const chartRangeCaption = useMemo(
    () => labelForSelection(paymentSummarySelection),
    [paymentSummarySelection],
  );

  const formatYAxis = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(0)}L`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(0)}K`;
    }
    return `₹${value}`;
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
      <div className="bg-[var(--surface-level-3,#fafafa)] p-8 rounded-tl-[32px] rounded-tr-[32px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl h-auto p-[24px]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 md:mb-6 gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 relative">
                <h2 className="font-medium leading-[24px] text-foreground w-fit flex items-center h-[40px] text-[20px]">
                  Payment Summary
                </h2>
                <BusinessOverviewDateRangePicker
                  selection={paymentSummarySelection}
                  onSelectionChange={onPaymentSummarySelectionChange}
                  variant="compact"
                />
              </div>
              <SecondaryButton type="button" icon={<Download className="size-5" strokeWidth={2} />}>
                Download Report
              </SecondaryButton>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={paymentChartDisplaySeries} margin={{ top: 10, right: 30, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#21C179" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#21C179" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#7e7e7e"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="left-payments"
                  stroke="#7e7e7e"
                  fontSize={12}
                  tickFormatter={formatYAxis}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="right-count"
                  orientation="right"
                  stroke="#7e7e7e"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  labelStyle={{ color: "#101010", fontWeight: "600" }}
                  labelFormatter={(_label, payload) => {
                    if (payload?.[0]?.payload?.fullDate) {
                      return payload[0].payload.fullDate;
                    }
                    return _label;
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === "Payment Amount") {
                      return [`₹${(value / 100000).toFixed(2)}L`, name];
                    }
                    return [value, name];
                  }}
                />
                <Bar
                  key="payment-bar"
                  yAxisId="left-payments"
                  dataKey="amount"
                  fill="#1576DB"
                  name="Payment Amount"
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                  isAnimationActive
                  animationDuration={PAYMENT_SUMMARY_BAR_ANIM_MS}
                  animationEasing="ease-in-out"
                />
                <Line
                  key="payment-line"
                  yAxisId="right-count"
                  type="monotone"
                  dataKey="count"
                  stroke="#21C179"
                  name="No of Payments"
                  strokeWidth={2}
                  dot={{ fill: "#21C179", r: 3 }}
                  isAnimationActive
                  animationDuration={PAYMENT_SUMMARY_LINE_ANIM_MS}
                  animationEasing="ease-in-out"
                />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-between ml-[0px] mr-[60px] mt-[0px] mb-[0px]">
              <div className="text-sm text-muted-foreground px-[60px] py-[0px] min-w-0 truncate">
                {chartRangeCaption}
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#1576DB] rounded-sm" />
                  <span className="text-xs text-foreground">Payment Amount</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#21C179] rounded-sm" />
                  <span className="text-xs text-foreground">No of Payments</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 lg:row-span-2">
            <div className="h-full lg:h-[calc(100%)] flex flex-col">
              <ActionsNotificationsWidget />
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 md:mb-6 relative">
              <h2 className="text-[20px] font-medium leading-[24px] text-[#101010]">Payment Sources</h2>
              <BusinessOverviewDateRangePicker
                selection={paymentSourcesSelection}
                onSelectionChange={onPaymentSourcesSelectionChange}
                variant="compact"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div className="flex items-center justify-center min-h-[300px] md:min-h-[350px]">
                <ResponsiveContainer width="100%" height={300} className="md:!h-[350px]">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                      data={paymentSourcesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={76}
                      outerRadius={127}
                      paddingAngle={2}
                      dataKey="value"
                      className="md:!innerRadius-[101] md:!outerRadius-[152] lg:!innerRadius-[101] lg:!outerRadius-[177]"
                    >
                      {paymentSourcesData.map((entry) => (
                        <Cell key={entry.id} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => `₹${(value / 100000).toFixed(2)} L`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                {paymentSourcesData.map((source) => (
                  <div
                    key={source.id}
                    className="flex items-center justify-between px-4 py-3 bg-[var(--surface-level-3,#fafafa)] rounded-lg"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div
                        className="size-3 rounded-full shrink-0"
                        style={{ backgroundColor: source.color }}
                      />
                      <span className="text-xs md:text-sm text-[#101010]">{source.name}</span>
                    </div>
                    <div className="flex items-center gap-3 md:gap-6">
                      <span className="text-xs md:text-sm font-semibold text-[#101010]">
                        {(source.value / 100000).toFixed(2)} L
                      </span>
                      <span className="text-xs md:text-sm font-semibold text-[#101010] w-8 md:w-12 text-right">
                        {source.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
