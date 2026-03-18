/**
 * PAYTM BUSINESS DASHBOARD - CHART GUIDELINES & EXAMPLES
 * 
 * This component serves as a reference guide for implementing charts
 * consistently across the Paytm Business Dashboard design system.
 * 
 * All charts use the recharts library with specific design system colors,
 * spacing, typography, and interaction patterns.
 */

import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart } from "recharts";

// ============================================================================
// CHART COLOR SYSTEM
// ============================================================================

/**
 * Primary Chart Colors
 * Use these colors for chart elements in order of importance
 */
export const CHART_COLORS = {
  primary: "#1576DB",      // Chart 1: Sky Blue - Primary data series
  success: "#21C179",      // Chart 2: Green - Success/positive metrics
  warning: "#FF9D00",      // Chart 3: Orange - Warnings/notices
  error: "#FD5154",        // Chart 4: Red - Errors/negative metrics
  accent: "#FED533",       // Chart 5: Yellow - Accent/highlight
};

/**
 * Payment Sources Colors
 * Specific colors for payment method breakdowns
 */
export const PAYMENT_SOURCE_COLORS = {
  upi: "#4A90E2",          // Blue for UPI
  debitCard: "#FFD93D",    // Yellow for Debit Card
  creditCard: "#FF85C0",   // Pink for Credit Card
  netBanking: "#98D8C8",   // Teal for Net Banking
  emi: "#6DD4F2",          // Light blue for EMI
  other: "#FFB347",        // Orange for Other
};

/**
 * Neutral Colors
 * For grid lines, axes, and secondary elements
 */
export const CHART_NEUTRAL_COLORS = {
  gridLine: "#f0f0f0",     // Light gray for grid lines
  axisText: "#7e7e7e",     // Muted gray for axis labels
  tooltip: "#101010",      // Foreground color for tooltip text
};

// ============================================================================
// SAMPLE DATA STRUCTURES
// ============================================================================

/**
 * Bar + Line Composed Chart Data
 * Used for Payment Summary showing dual metrics (amount + count)
 */
const paymentSummaryData = [
  { date: "01", amount: 650, count: 550 },
  { date: "02", amount: 720, count: 600 },
  { date: "03", amount: 850, count: 680 },
  { date: "04", amount: 900, count: 700 },
  { date: "05", amount: 750, count: 620 },
  { date: "06", amount: 1050, count: 800 },
  { date: "07", amount: 880, count: 720 },
  { date: "08", amount: 950, count: 750 },
];

/**
 * Donut Chart Data
 * Used for Payment Sources breakdown with percentages
 */
const paymentSourcesData = [
  { name: "UPI", value: 3510000, color: PAYMENT_SOURCE_COLORS.upi, percentage: 39 },
  { name: "Debit Card", value: 2610000, color: PAYMENT_SOURCE_COLORS.debitCard, percentage: 29 },
  { name: "Credit Card", value: 360000, color: PAYMENT_SOURCE_COLORS.creditCard, percentage: 4 },
  { name: "Net Banking", value: 720000, color: PAYMENT_SOURCE_COLORS.netBanking, percentage: 8 },
  { name: "EMI", value: 900000, color: PAYMENT_SOURCE_COLORS.emi, percentage: 10 },
  { name: "Other", value: 900000, color: PAYMENT_SOURCE_COLORS.other, percentage: 10 },
];

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

/**
 * Format Y-Axis values in Indian currency format
 * Converts large numbers to K (thousands) or L (lakhs)
 * 
 * @example
 * formatYAxis(100000) => "₹1L"
 * formatYAxis(5000) => "₹5K"
 */
export const formatYAxis = (value: number) => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(0)}L`;
  } else if (value >= 1000) {
    return `₹${(value / 1000).toFixed(0)}K`;
  }
  return `₹${value}`;
};

/**
 * Format tooltip currency values
 * Shows precise values with 2 decimal places in lakhs
 * 
 * @example
 * formatTooltipCurrency(3510000) => "₹35.10L"
 */
export const formatTooltipCurrency = (value: number) => {
  return `₹${(value / 100000).toFixed(2)}L`;
};

// ============================================================================
// CHART COMPONENTS - GUIDELINES & EXAMPLES
// ============================================================================

/**
 * COMPOSED CHART (BAR + LINE)
 * 
 * Used for: Payment Summary showing dual metrics
 * 
 * Design Guidelines:
 * - Container: White background, rounded-2xl (16px), padding 24px
 * - Height: 280px for chart area
 * - Bars: Rounded top corners [4, 4, 0, 0], width 12px
 * - Line: Stroke width 2px, dots with radius 3px
 * - Grid: Horizontal only, dashed (3 3), no vertical lines
 * - Axes: No axis lines, no tick lines, fontSize 12px
 * - Tooltip: White background, 1px border, 8px radius
 * - Legend: Below chart with colored squares (12x12px)
 * - Margins: top:10, right:-20, left:-20, bottom:5
 */
export function PaymentSummaryChart() {
  return (
    <div className="bg-white rounded-2xl p-[24px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[20px] font-medium text-[#101010]">Payment Summary</h2>
        {/* Add date filter dropdown here */}
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart 
          data={paymentSummaryData} 
          margin={{ top: 10, right: -20, left: -20, bottom: 5 }}
        >
          {/* Grid: Horizontal only, dashed, light gray */}
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={CHART_NEUTRAL_COLORS.gridLine} 
            vertical={false} 
          />

          {/* X-Axis: Date labels, no lines */}
          <XAxis 
            dataKey="date" 
            stroke={CHART_NEUTRAL_COLORS.axisText}
            fontSize={12} 
            axisLine={false}
            tickLine={false}
          />

          {/* Y-Axis Left: Payment amounts */}
          <YAxis 
            yAxisId="left" 
            stroke={CHART_NEUTRAL_COLORS.axisText}
            fontSize={12}
            tickFormatter={formatYAxis}
            axisLine={false}
            tickLine={false}
          />

          {/* Y-Axis Right: Payment counts */}
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            stroke={CHART_NEUTRAL_COLORS.axisText}
            fontSize={12}
            axisLine={false}
            tickLine={false}
          />

          {/* Tooltip: White background with border */}
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "white", 
              border: "1px solid #e0e0e0", 
              borderRadius: "8px",
              fontSize: "12px"
            }}
            labelStyle={{ 
              color: CHART_NEUTRAL_COLORS.tooltip, 
              fontWeight: "600" 
            }}
            formatter={(value: number, name: string) => {
              if (name === "Payment Amount") {
                return [formatTooltipCurrency(value), name];
              }
              return [value, name];
            }}
          />

          {/* Bar: Primary blue, rounded top corners */}
          <Bar 
            yAxisId="left" 
            dataKey="amount" 
            fill={CHART_COLORS.primary}
            name="Payment Amount" 
            radius={[4, 4, 0, 0]}
            barSize={12}
          />

          {/* Line: Success green, dots */}
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="count" 
            stroke={CHART_COLORS.success}
            name="No of Payments" 
            strokeWidth={2} 
            dot={{ fill: CHART_COLORS.success, r: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Legend: Below chart */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-[14px] text-[#7e7e7e] px-[60px]">January 2026</div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: CHART_COLORS.primary }} />
            <span className="text-[12px] text-[#101010]">Payment Amount</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: CHART_COLORS.success }} />
            <span className="text-[12px] text-[#101010]">No of Payments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * DONUT CHART (PIE CHART)
 * 
 * Used for: Payment Sources breakdown showing proportions
 * 
 * Design Guidelines:
 * - Container: White background, rounded-2xl (16px), padding 24px
 * - Height: 300px (desktop: 350px)
 * - Inner Radius: 76px (desktop: 101px, large: 101-177px)
 * - Outer Radius: 127px (desktop: 152px, large: 152-177px)
 * - Padding Angle: 2px between segments
 * - Colors: Use PAYMENT_SOURCE_COLORS
 * - Layout: Grid with chart on left, legend list on right
 * - Legend: Rounded list items with colored dots and percentages
 */
export function PaymentSourcesChart() {
  return (
    <div className="bg-white rounded-2xl p-[24px]">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-[20px] font-medium text-[#101010]">Payment Sources</h2>
        {/* Add date filter dropdown here */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <div className="flex items-center justify-center min-h-[300px]">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={paymentSourcesData}
                cx="50%"
                cy="50%"
                innerRadius={76}
                outerRadius={127}
                paddingAngle={2}
                dataKey="value"
              >
                {paymentSourcesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "white", 
                  border: "1px solid #e0e0e0", 
                  borderRadius: "8px" 
                }}
                formatter={(value: number) => formatTooltipCurrency(value)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend List */}
        <div className="flex flex-col gap-3">
          {paymentSourcesData.map((source) => (
            <div 
              key={source.name} 
              className="flex items-center justify-between px-4 py-3 bg-[#fafafa] rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="size-3 rounded-full shrink-0" 
                  style={{ backgroundColor: source.color }} 
                />
                <span className="text-[14px] text-[#101010]">{source.name}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-[14px] font-semibold text-[#101010]">
                  {(source.value / 100000).toFixed(2)} L
                </span>
                <span className="text-[14px] font-semibold text-[#101010] w-12 text-right">
                  {source.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * SIMPLE BAR CHART
 * 
 * Used for: Single metric comparisons
 * 
 * Design Guidelines:
 * - Similar to Composed Chart but with single data series
 * - Rounded top corners on bars
 * - Use primary chart color for main metric
 * - Use success/error colors for positive/negative indicators
 */
export function SimpleBarChart() {
  const simpleData = [
    { category: "Jan", value: 1200 },
    { category: "Feb", value: 900 },
    { category: "Mar", value: 1500 },
    { category: "Apr", value: 1100 },
  ];

  return (
    <div className="bg-white rounded-2xl p-[24px]">
      <h2 className="text-[20px] font-medium text-[#101010] mb-6">Monthly Performance</h2>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart 
          data={simpleData}
          margin={{ top: 10, right: -20, left: -20, bottom: 5 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={CHART_NEUTRAL_COLORS.gridLine}
            vertical={false} 
          />
          <XAxis 
            dataKey="category" 
            stroke={CHART_NEUTRAL_COLORS.axisText}
            fontSize={12}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke={CHART_NEUTRAL_COLORS.axisText}
            fontSize={12}
            tickFormatter={formatYAxis}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "white", 
              border: "1px solid #e0e0e0", 
              borderRadius: "8px",
              fontSize: "12px"
            }}
          />
          <Bar 
            dataKey="value" 
            fill={CHART_COLORS.primary}
            radius={[4, 4, 0, 0]}
            barSize={16}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================================
// CHART DESIGN PRINCIPLES
// ============================================================================

/**
 * KEY DESIGN PRINCIPLES:
 * 
 * 1. COLORS
 *    - Always use design system chart colors (var(--chart-1) to var(--chart-5))
 *    - Primary blue (#1576DB) for main data series
 *    - Success green (#21C179) for positive metrics
 *    - Error red (#FD5154) for negative metrics
 *    - Warning orange (#FF9D00) for alerts
 * 
 * 2. TYPOGRAPHY
 *    - All text must use Inter font family
 *    - Axis labels: 12px, color #7e7e7e (muted)
 *    - Chart titles: 20px, medium weight, color #101010
 *    - Tooltip: 12px, white background, 8px border radius
 *    - Legend labels: 12px, color #101010
 * 
 * 3. SPACING & LAYOUT
 *    - Chart container: white background, rounded-2xl (16px)
 *    - Internal padding: 24px
 *    - Chart height: 240-350px depending on complexity
 *    - Gap between title and chart: 24px (mb-6)
 *    - Gap between chart and legend: 16px (mt-4)
 * 
 * 4. GRID & AXES
 *    - Grid: Horizontal lines only, dashed (3 3), color #f0f0f0
 *    - No vertical grid lines
 *    - No axis lines (axisLine={false})
 *    - No tick lines (tickLine={false})
 *    - Y-axis formatted with Indian currency (₹, K, L)
 * 
 * 5. BARS
 *    - Rounded top corners: radius={[4, 4, 0, 0]}
 *    - Bar width: 12-16px depending on data density
 *    - Use consistent colors from CHART_COLORS
 * 
 * 6. LINES
 *    - Stroke width: 2px
 *    - Dots: radius 3px, fill same as line color
 *    - Type: "monotone" for smooth curves
 * 
 * 7. TOOLTIPS
 *    - White background
 *    - 1px border with #e0e0e0
 *    - 8px border radius
 *    - 12px font size
 *    - Format currency with 2 decimal places
 * 
 * 8. LEGEND
 *    - Position: Below chart or to the right for donut charts
 *    - Colored squares/circles: 12x12px
 *    - Gap between icon and label: 8px (gap-2)
 *    - Label font size: 12px
 * 
 * 9. RESPONSIVE BEHAVIOR
 *    - Use ResponsiveContainer for all charts
 *    - Adjust inner/outer radius for donut charts on different screen sizes
 *    - Stack legend items vertically on mobile
 *    - Reduce chart height on mobile if needed
 * 
 * 10. ACCESSIBILITY
 *     - Provide descriptive chart titles
 *     - Ensure sufficient color contrast
 *     - Use semantic data labels in tooltips
 *     - Consider color-blind friendly palettes
 */

/**
 * COMMON MISTAKES TO AVOID:
 * 
 * ❌ Don't use arbitrary colors - always use design system colors
 * ❌ Don't show vertical grid lines
 * ❌ Don't use axis lines or tick lines
 * ❌ Don't forget to format currency with ₹ symbol
 * ❌ Don't use sharp corners on bars - always round the top
 * ❌ Don't forget responsive container wrapper
 * ❌ Don't use default tooltip styles - customize with white background
 * ❌ Don't mix font sizes - stick to 12px for axes, 20px for titles
 * 
 * ✅ Do use consistent spacing (24px padding)
 * ✅ Do format large numbers as K (thousands) or L (lakhs)
 * ✅ Do provide hover states on interactive elements
 * ✅ Do use proper margins to prevent clipping
 * ✅ Do align legends properly with chart
 * ✅ Do test on different screen sizes
 */

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * Example 1: Payment Summary Chart (Composed Bar + Line)
 * 
 * <PaymentSummaryChart />
 * 
 * Use case: Showing dual metrics like payment amounts and payment counts
 * over time. The bar shows amount, the line shows count.
 */

/**
 * Example 2: Payment Sources Chart (Donut)
 * 
 * <PaymentSourcesChart />
 * 
 * Use case: Showing proportional breakdown of categories like payment
 * methods, transaction types, or status distributions.
 */

/**
 * Example 3: Simple Bar Chart
 * 
 * <SimpleBarChart />
 * 
 * Use case: Showing single metric comparisons across categories or time
 * periods like monthly revenue, transaction counts, etc.
 */

export function ChartGuidelines() {
  return (
    <div className="flex flex-col gap-8 p-8 bg-[#fafafa] min-h-screen">
      <div className="flex flex-col gap-4">
        <h1 className="text-[32px] font-semibold text-[#101010]">
          Chart Guidelines & Examples
        </h1>
        <p className="text-[16px] text-[#7e7e7e]">
          Reference guide for implementing charts in the Paytm Business Dashboard design system.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Composed Chart Example */}
        <div>
          <h3 className="text-[24px] font-medium text-[#101010] mb-4">
            Composed Chart (Bar + Line)
          </h3>
          <PaymentSummaryChart />
        </div>

        {/* Donut Chart Example */}
        <div>
          <h3 className="text-[24px] font-medium text-[#101010] mb-4">
            Donut Chart (Payment Sources)
          </h3>
          <PaymentSourcesChart />
        </div>

        {/* Simple Bar Chart Example */}
        <div>
          <h3 className="text-[24px] font-medium text-[#101010] mb-4">
            Simple Bar Chart
          </h3>
          <SimpleBarChart />
        </div>

        {/* Color Reference */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-[20px] font-medium text-[#101010] mb-4">
            Chart Color System
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(CHART_COLORS).map(([name, color]) => (
              <div key={name} className="flex items-center gap-3">
                <div 
                  className="size-8 rounded-lg" 
                  style={{ backgroundColor: color }}
                />
                <div>
                  <div className="text-[14px] font-medium text-[#101010] capitalize">
                    {name}
                  </div>
                  <div className="text-[12px] text-[#7e7e7e] font-mono">
                    {color}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
