/**
 * PAYTM BUSINESS DASHBOARD - CARD COMPONENT GUIDELINES
 * 
 * This component serves as a comprehensive reference guide for implementing
 * card components consistently across the Paytm Business Dashboard design system.
 * 
 * All cards follow specific design patterns for colors, spacing, typography,
 * borders, shadows, and interaction states.
 */

import { ArrowRight, AlertCircle, CreditCard, Shield, ChevronDown, ChevronRight } from "lucide-react";
import { PrimaryButton } from "./Button";
import Payments from "../../imports/Payments-41-36";
import Settlement from "../../imports/Settlement";
import Refunds from "../../imports/Refunds";

// ============================================================================
// CARD COLOR SYSTEM
// ============================================================================

/**
 * Business Overview Card Colors
 * Light backgrounds for metric cards showing key business data
 */
export const OVERVIEW_CARD_COLORS = {
  payments: "#F5FBFE",      // Light blue for payment metrics
  settlement: "#F0FDF4",    // Light green for settlement metrics
  refunds: "#FEF2F2",       // Light red for refund metrics
};

/**
 * Payment Summary Card Colors
 * Used in the Payments page for breakdown cards
 */
export const PAYMENT_SUMMARY_COLORS = {
  collections: "#F3F8FE", // Light blue (lighter strip)
  adjustments: "#FEF7F7", // Light pink/red
  deductions: "rgba(235,87,87,0.06)", // Red tint, softer
  settlementProcessed: "rgba(39,174,95,0.06)", // Green tint, softer
  availableForSettlement: "#EFF8FD", // Sky blue, lighter
};

/**
 * Action Card Colors
 * Priority-based backgrounds with opacity for hover effects
 */
export const ACTION_CARD_COLORS = {
  highPriority: {
    base: "#ffebef",        // Red 50
    opacity: 0.6,           // 60% opacity by default
    hover: 1,               // 100% opacity on hover
  },
  lowPriority: {
    base: "#fff8e1",        // Orange 50
    opacity: 0.6,           // 60% opacity by default
    hover: 1,               // 100% opacity on hover
  },
};

/**
 * Notification Card Colors
 * Different states for read/unread notifications
 */
export const NOTIFICATION_CARD_COLORS = {
  default: "#fafafa",       // Surface level 3
  unread: "#F5F9FE",        // Light blue background
};

// ============================================================================
// CARD SPACING & SIZING
// ============================================================================

/**
 * Card Border Radius
 * Different radius values for different card types
 */
export const CARD_RADIUS = {
  overview: "20px",         // Business overview cards
  summary: "12px",          // Payment summary cards
  action: "16px",           // Action and notification cards
  default: "16px",          // Default for most cards
};

/**
 * Card Padding
 * Internal spacing for card content
 */
export const CARD_PADDING = {
  small: "16px",            // p-4 - Action/notification cards
  medium: "20px",           // p-5 - Overview and summary cards
  large: "24px",            // p-6 - Chart cards
};

// ============================================================================
// CARD COMPONENT EXAMPLES
// ============================================================================

/**
 * BUSINESS OVERVIEW METRIC CARD
 * 
 * Used for: Main dashboard showing key business metrics
 * 
 * Design Guidelines:
 * - Background: Semantic light colors (payments: #F5FBFE, settlement: #F0FDF4, refunds: #FEF2F2)
 * - Border Radius: 20px (rounded-[20px])
 * - Padding: 20px (p-5)
 * - Gap: 12px between sections (gap-3)
 * - Divider: Border-t with border-border color, 12px padding-top
 * - Icon: White background with 16px border radius, contained in top-right
 * - Amount: 32px font size, default font weight
 * - Label: 14px (text-sm), muted-foreground color
 * - Arrow Icon: 20px (size-5), positioned next to amount
 * - Bottom Metrics: Two columns with 14px values and 12px labels
 */
export function OverviewMetricCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Payments Card */}
      <div className="bg-[#F5FBFE] rounded-[20px] p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[14px] text-[#7e7e7e]">Payments</p>
            <div className="flex items-center gap-2">
              <p className="text-[#101010] text-[32px]">₹90,00,000</p>
              <ArrowRight className="size-5 text-[#101010]" />
            </div>
          </div>
          <div className="bg-white rounded-[16px] p-0 flex items-center justify-center">
            <Payments />
          </div>
        </div>
        <div className="flex items-start justify-between pt-3 border-t border-[#e0e0e0]">
          <div>
            <p className="text-[14px] text-[#101010]">1152</p>
            <p className="text-[12px] text-[#7e7e7e]">Payments</p>
          </div>
          <div className="text-right">
            <p className="text-[14px] text-[#21c179]">98%</p>
            <p className="text-[12px] text-[#7e7e7e]">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Settlement Card */}
      <div className="bg-[#F0FDF4] rounded-[20px] p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[14px] text-[#7e7e7e]">Settlement</p>
            <div className="flex items-center gap-2">
              <p className="text-[#101010] text-[32px]">₹79,00,000</p>
              <ArrowRight className="size-5 text-[#101010]" />
            </div>
          </div>
          <div className="bg-white rounded-[16px] p-0 flex items-center justify-center">
            <Settlement />
          </div>
        </div>
        <div className="flex items-start justify-between pt-3 border-t border-[#e0e0e0]">
          <div>
            <p className="text-[14px] text-[#101010]">7:30 AM, 23 Sep</p>
            <p className="text-[12px] text-[#7e7e7e]">Last Settled</p>
          </div>
          <div className="text-right">
            <p className="text-[14px] text-[#101010]">8:00 AM Everyday</p>
            <p className="text-[12px] text-[#7e7e7e]">Scheduled</p>
          </div>
        </div>
      </div>

      {/* Refunds Card */}
      <div className="bg-[#FEF2F2] rounded-[20px] p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[14px] text-[#7e7e7e]">Refunds</p>
            <div className="flex items-center gap-2">
              <p className="text-[#101010] text-[32px]">₹10,000</p>
              <ArrowRight className="size-5 text-[#101010]" />
            </div>
          </div>
          <div className="bg-white rounded-[16px] p-0 flex items-center justify-center">
            <Refunds />
          </div>
        </div>
        <div className="pt-3 border-t border-[#e0e0e0]">
          <div>
            <p className="text-[14px] text-[#101010]">110</p>
            <p className="text-[12px] text-[#7e7e7e]">Payments</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * PAYMENT SUMMARY CARD
 * 
 * Used for: Detailed payment breakdown in Payments page
 * 
 * Design Guidelines:
 * - Background: Specific semantic colors (see PAYMENT_SUMMARY_COLORS)
 * - Border Radius: 12px (rounded-[12px])
 * - Padding: 20px (p-5)
 * - Layout: Flex column with auto width (flex-1)
 * - Title: 14px, default weight, foreground color
 * - Amount: 20px, semibold weight, foreground color
 * - Divider: Border-t with 12px top margin and padding
 * - Hyperlink: 12px, medium weight, #004299 color, with chevron icon
 * - Icon Size: 16px (size-4) for chevrons
 * - Text Truncation: Use truncate class for long titles
 */
export function PaymentSummaryCards() {
  return (
    <div className="flex items-center gap-1">
      {/* Collections Card */}
      <div className="bg-[#F3F8FE] rounded-[12px] p-5 flex flex-col flex-1">
        <span className="text-[14px] text-[#7e7e7e]">Collections</span>
        <span className="text-[20px] font-semibold text-[#101010]">₹10,12,950.60</span>
        <div className="border-t border-[#e0e0e0] pt-3 mt-3 flex items-center">
          <button className="flex items-center gap-1 text-[12px] text-[#004299] font-medium hover:underline">
            <span>View Breakdown</span>
            <ChevronDown className="size-4" />
          </button>
        </div>
      </div>

      {/* Math Symbol - Minus */}
      <div className="bg-white content-stretch flex flex-col items-center justify-center rounded-[12px] shrink-0 size-[16px]">
        <div className="bg-[#7e7e7e] h-[2px] shrink-0 w-[8px]" />
      </div>

      {/* Adjustments Card */}
      <div className="bg-[#FEF7F7] rounded-[12px] p-5 flex flex-col flex-1">
        <span className="text-[14px] text-[#7e7e7e]">Adjustments</span>
        <span className="text-[20px] font-semibold text-[#101010]">₹98,100.60</span>
        <div className="border-t border-[#e0e0e0] pt-3 mt-3 flex items-center">
          <button className="flex items-center gap-1 text-[12px] text-[#004299] font-medium hover:underline">
            <span>View Breakdown</span>
            <ChevronDown className="size-4" />
          </button>
        </div>
      </div>

      {/* Settlement Processed Card - with CTA button variant */}
      <div className="bg-[#EFF8FD] rounded-[12px] p-5 flex flex-col flex-1">
        <span className="text-[14px] text-[#7e7e7e] truncate">Available for Settlement</span>
        <span className="text-[20px] font-semibold text-[#101010]">₹4,00,000</span>
        <PrimaryButton size="small" type="button" fullWidth className="mt-2">
          Settle Now
        </PrimaryButton>
      </div>
    </div>
  );
}

/**
 * ACTION CARD (PRIORITY-BASED)
 * 
 * Used for: Actions requiring user attention in Actions tab
 * 
 * Design Guidelines:
 * - Background: Priority-based with opacity
 *   - P0 (High): #ffebef at 60% opacity, 100% on hover
 *   - P1 (Low): #fff8e1 at 60% opacity, 100% on hover
 * - Border Radius: 16px (rounded-[16px])
 * - Padding: 16px (p-4)
 * - Layout: Flex row with content on left, icon on right
 * - Title: 14px, semibold, foreground color
 * - Description: 12px, muted-foreground, with bold amount
 * - CTA Link: 12px, semibold, #004299 color, hover underline
 * - Icon: 20px (size-5), positioned top-right
 * - Icon Color: P0 = destructive red, P1 = warning orange
 * - Hover: Transition from 60% to 100% opacity
 * - Gap: 12px between content and icon (gap-3)
 */
export function ActionCards() {
  return (
    <div className="flex flex-col gap-4">
      {/* High Priority (P0) Action Card */}
      <div className="bg-[#ffebef]/60 hover:bg-[#ffebef] rounded-[16px] p-4 transition-colors">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-[#101010] mb-1 text-[14px]">
              New Dispute Raised
            </h4>
            <p className="text-[#7e7e7e] mb-2 text-[12px]">
              <span className="font-bold text-[#101010]">₹3,200</span> at risk — submit proof to avoid debit
            </p>
            <a href="#" className="text-[#004299] hover:underline font-semibold text-[12px]">
              Submit Proof
            </a>
          </div>
          <div className="shrink-0 text-[#fd5154]">
            <AlertCircle className="size-5" />
          </div>
        </div>
      </div>

      {/* Low Priority (P1) Action Card */}
      <div className="bg-[#fff8e1]/60 hover:bg-[#fff8e1] rounded-[16px] p-4 transition-colors">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-[#101010] mb-1 text-[14px]">
              Settlement On Hold
            </h4>
            <p className="text-[#7e7e7e] mb-2 text-[12px]">
              <span className="font-bold text-[#101010]">₹85,430</span> at risk — update bank details
            </p>
            <a href="#" className="text-[#004299] hover:underline font-semibold text-[12px]">
              Update Details
            </a>
          </div>
          <div className="shrink-0 text-[#ff9d00]">
            <CreditCard className="size-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * NOTIFICATION CARD
 * 
 * Used for: Notifications list showing recent activity
 * 
 * Design Guidelines:
 * - Background: 
 *   - Default (read): #fafafa (surface-level-3)
 *   - Unread: #F5F9FE (light blue)
 * - Border Radius: 16px (rounded-[16px])
 * - Padding: 16px (p-[16px])
 * - Hover: bg-accent/50, cursor-pointer
 * - Title: 14px, semibold, foreground color
 * - Message: 12px (text-xs), muted-foreground
 * - Time: 10px (text-[10px]), muted-foreground, 4px top margin
 * - Unread Indicator: 8px (size-2) blue dot, positioned next to title
 * - Layout: Flex column with 4px gap between elements
 * - Transition: transition-colors for smooth hover
 */
export function NotificationCards() {
  return (
    <div className="flex flex-col gap-3">
      {/* Unread Notification */}
      <div className="bg-[#F5F9FE] p-[16px] rounded-[16px] hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-[#101010] text-[14px]">
                Payment Received
              </p>
              <div className="size-2 bg-[#00b8f5] rounded-full shrink-0" />
            </div>
            <p className="text-[12px] text-[#7e7e7e]">
              ₹45,000 received from customer #12345
            </p>
            <p className="text-[10px] text-[#7e7e7e] mt-1">
              2 hours ago
            </p>
          </div>
        </div>
      </div>

      {/* Read Notification */}
      <div className="bg-[#fafafa] p-[16px] rounded-[16px] hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-[#101010] text-[14px]">
                Settlement Completed
              </p>
            </div>
            <p className="text-[12px] text-[#7e7e7e]">
              ₹2,50,000 settled to your account
            </p>
            <p className="text-[10px] text-[#7e7e7e] mt-1">
              5 hours ago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * MATH SYMBOL SEPARATORS
 * 
 * Used for: Visual calculation flow between payment summary cards
 * 
 * Design Guidelines:
 * - Size: 16x16px (size-[16px])
 * - Background: White
 * - Border Radius: 12px (rounded-[12px])
 * - Line Color: #7e7e7e (muted)
 * - Line Thickness: 1.33-2px depending on symbol
 * - Shrink: shrink-0 to prevent compression
 * 
 * Symbols:
 * - Minus (-): Single horizontal line, 8px wide, 2px thick
 * - Equals (=): Two horizontal lines, 8px wide, 1.33px thick, 2px gap
 * - Plus (+): Horizontal and vertical lines crossing, 8px length, 1.33px thick
 */
export function MathSymbolSeparators() {
  return (
    <div className="flex items-center gap-4">
      {/* Minus Symbol */}
      <div className="bg-white flex flex-col items-center justify-center rounded-[12px] shrink-0 size-[16px]">
        <div className="bg-[#7e7e7e] h-[2px] shrink-0 w-[8px]" />
      </div>

      {/* Equals Symbol */}
      <div className="bg-white flex flex-col items-center justify-center gap-[2px] rounded-[12px] shrink-0 size-[16px]">
        <div className="bg-[#7e7e7e] h-[1.33px] shrink-0 w-[8px]" />
        <div className="bg-[#7e7e7e] h-[1.33px] shrink-0 w-[8px]" />
      </div>

      {/* Plus Symbol */}
      <div className="bg-white flex items-center justify-center rounded-[12px] shrink-0 size-[16px] relative">
        <div className="bg-[#7e7e7e] h-[1.33px] absolute w-[8px]" />
        <div className="bg-[#7e7e7e] w-[1.33px] absolute h-[8px]" />
      </div>
    </div>
  );
}

// ============================================================================
// CARD DESIGN PRINCIPLES
// ============================================================================

/**
 * KEY DESIGN PRINCIPLES FOR CARDS:
 * 
 * 1. COLORS & BACKGROUNDS
 *    - Use semantic colors from design system
 *    - Light backgrounds for readability (#F5FBFE, #F0FDF4, #FEF2F2)
 *    - Opacity for hover effects (60% → 100%)
 *    - Unread states use light blue (#F5F9FE)
 *    - Action priority: P0 = red tint, P1 = orange tint
 * 
 * 2. SPACING & LAYOUT
 *    - Border radius: 12-20px depending on card type
 *    - Internal padding: 16-20px (p-4 to p-5)
 *    - Gap between elements: 8-12px (gap-2 to gap-3)
 *    - Divider spacing: 12px margin and padding (mt-3, pt-3)
 *    - Grid gaps: 16-24px (gap-4 to gap-6)
 * 
 * 3. TYPOGRAPHY
 *    - Card titles: 14px, semibold or medium weight
 *    - Large amounts: 32px for overview, 20px for summary
 *    - Small labels: 12px, muted-foreground (#7e7e7e)
 *    - Hyperlinks: 12px, semibold, #004299
 *    - Time stamps: 10px, muted-foreground
 *    - All text uses Inter font family
 * 
 * 4. ICONS
 *    - Overview card icons: Imported SVG components in white container
 *    - Action/notification icons: 20px (size-5)
 *    - Chevron icons: 16px (size-4)
 *    - Unread indicator: 8px dot (size-2)
 *    - Icon colors match semantic meaning (error=red, warning=orange)
 * 
 * 5. DIVIDERS
 *    - Border-t with border-[#e0e0e0] color
 *    - Padding-top: 12px (pt-3)
 *    - Margin-top: 12px (mt-3)
 *    - Used to separate card sections
 * 
 * 6. INTERACTIVE STATES
 *    - Hover: Background color change or opacity increase
 *    - Transitions: transition-colors for smooth effects
 *    - Cursor: cursor-pointer for clickable cards
 *    - Links: hover:underline for text links
 *    - Buttons: hover state with darker background
 * 
 * 7. RESPONSIVE BEHAVIOR
 *    - Flex-1 for equal width cards in grid
 *    - Min-w-0 to prevent overflow
 *    - Truncate class for long text
 *    - Shrink-0 for fixed-size elements (icons, symbols)
 *    - Grid: cols-1 on mobile, cols-2/3 on desktop
 * 
 * 8. BORDERS & SHADOWS
 *    - No borders on action/notification cards
 *    - Light border on overview cards when needed
 *    - Minimal shadows (use elevation-sm sparingly)
 *    - Focus on background colors over borders
 * 
 * 9. CONTENT HIERARCHY
 *    - Primary info (amount/title): Largest, bold/semibold
 *    - Secondary info (labels): Smaller, muted color
 *    - Tertiary info (time/metadata): Smallest, muted
 *    - CTAs: Prominent color (#004299), semibold
 * 
 * 10. ACCESSIBILITY
 *     - Sufficient color contrast (foreground vs background)
 *     - Semantic HTML (button, a, div)
 *     - Focus states on interactive elements
 *     - Readable font sizes (minimum 10px)
 */

/**
 * CARD TYPE MATRIX:
 * 
 * | Card Type           | Radius | Padding | Background      | Use Case                    |
 * |---------------------|--------|---------|-----------------|----------------------------|
 * | Overview Metric     | 20px   | p-5     | Semantic light  | Dashboard key metrics      |
 * | Payment Summary     | 12px   | p-5     | Semantic light  | Payment breakdown          |
 * | Action (P0)         | 16px   | p-4     | Red 60% opacity | High priority actions      |
 * | Action (P1)         | 16px   | p-4     | Orange 60% op.  | Low priority actions       |
 * | Notification (unread)| 16px  | p-[16px]| #F5F9FE         | New notifications          |
 * | Notification (read) | 16px   | p-[16px]| #fafafa         | Old notifications          |
 * | Chart Container     | 16px   | p-6     | White           | Chart/graph containers     |
 */

/**
 * COMMON MISTAKES TO AVOID:
 * 
 * ❌ Don't use arbitrary hex colors without design system reference
 * ❌ Don't add borders/strokes to action cards (use background only)
 * ❌ Don't use box shadows on hover for action cards (use opacity)
 * ❌ Don't forget hover states on interactive cards
 * ❌ Don't mix different border radius values within same section
 * ❌ Don't use padding less than 16px for cards
 * ❌ Don't forget truncate class for potentially long text
 * ❌ Don't use font sizes below 10px
 * ❌ Don't skip transition-colors on hover states
 * 
 * ✅ Do use semantic color names in code
 * ✅ Do maintain consistent spacing with design system
 * ✅ Do use flex-1 for equal-width cards
 * ✅ Do add gap-1 between payment summary cards for symbols
 * ✅ Do use shrink-0 on icons to prevent squishing
 * ✅ Do provide visual feedback on hover
 * ✅ Do use min-w-0 to allow text truncation
 * ✅ Do align text and icons properly with flexbox
 */

// ============================================================================
// COMPLETE CARD EXAMPLES SHOWCASE
// ============================================================================

export function CardGuidelines() {
  return (
    <div className="flex flex-col gap-8 p-8 bg-[#fafafa] min-h-screen">
      <div className="flex flex-col gap-4">
        <h1 className="text-[32px] font-semibold text-[#101010]">
          Card Component Guidelines
        </h1>
        <p className="text-[16px] text-[#7e7e7e]">
          Comprehensive reference for implementing card components in the Paytm Business Dashboard design system.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Business Overview Cards */}
        <div>
          <h2 className="text-[24px] font-medium text-[#101010] mb-4">
            Business Overview Metric Cards
          </h2>
          <p className="text-[14px] text-[#7e7e7e] mb-6">
            Large metric cards with icons, amounts, and bottom statistics. Border radius: 20px, Padding: 20px.
          </p>
          <OverviewMetricCard />
        </div>

        {/* Payment Summary Cards */}
        <div>
          <h2 className="text-[24px] font-medium text-[#101010] mb-4">
            Payment Summary Cards with Math Symbols
          </h2>
          <p className="text-[14px] text-[#7e7e7e] mb-6">
            Compact summary cards with hyperlinks and calculation flow separators. Border radius: 12px, Padding: 20px.
          </p>
          <PaymentSummaryCards />
        </div>

        {/* Action Cards */}
        <div>
          <h2 className="text-[24px] font-medium text-[#101010] mb-4">
            Action Cards (Priority-Based)
          </h2>
          <p className="text-[14px] text-[#7e7e7e] mb-6">
            Cards requiring user attention with opacity hover effects. Border radius: 16px, Padding: 16px.
          </p>
          <div className="max-w-md">
            <ActionCards />
          </div>
        </div>

        {/* Notification Cards */}
        <div>
          <h2 className="text-[24px] font-medium text-[#101010] mb-4">
            Notification Cards
          </h2>
          <p className="text-[14px] text-[#7e7e7e] mb-6">
            Activity notification cards with read/unread states. Border radius: 16px, Padding: 16px.
          </p>
          <div className="max-w-md">
            <NotificationCards />
          </div>
        </div>

        {/* Math Symbols */}
        <div>
          <h2 className="text-[24px] font-medium text-[#101010] mb-4">
            Math Symbol Separators
          </h2>
          <p className="text-[14px] text-[#7e7e7e] mb-6">
            Visual calculation flow indicators. Size: 16x16px, Border radius: 12px.
          </p>
          <MathSymbolSeparators />
        </div>

        {/* Color Reference */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-[20px] font-medium text-[#101010] mb-4">
            Card Color System
          </h2>
          
          <div className="flex flex-col gap-6">
            {/* Overview Card Colors */}
            <div>
              <h3 className="text-[16px] font-semibold text-[#101010] mb-3">
                Business Overview Cards
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-lg" style={{ backgroundColor: OVERVIEW_CARD_COLORS.payments }} />
                  <div>
                    <div className="text-[14px] font-medium text-[#101010]">Payments</div>
                    <div className="text-[12px] text-[#7e7e7e] font-mono">{OVERVIEW_CARD_COLORS.payments}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-lg" style={{ backgroundColor: OVERVIEW_CARD_COLORS.settlement }} />
                  <div>
                    <div className="text-[14px] font-medium text-[#101010]">Settlement</div>
                    <div className="text-[12px] text-[#7e7e7e] font-mono">{OVERVIEW_CARD_COLORS.settlement}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-lg" style={{ backgroundColor: OVERVIEW_CARD_COLORS.refunds }} />
                  <div>
                    <div className="text-[14px] font-medium text-[#101010]">Refunds</div>
                    <div className="text-[12px] text-[#7e7e7e] font-mono">{OVERVIEW_CARD_COLORS.refunds}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Card Colors */}
            <div>
              <h3 className="text-[16px] font-semibold text-[#101010] mb-3">
                Action Cards (with 60% opacity)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-lg" style={{ backgroundColor: `${ACTION_CARD_COLORS.highPriority.base}` }} />
                  <div>
                    <div className="text-[14px] font-medium text-[#101010]">High Priority (P0)</div>
                    <div className="text-[12px] text-[#7e7e7e] font-mono">{ACTION_CARD_COLORS.highPriority.base}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-lg" style={{ backgroundColor: `${ACTION_CARD_COLORS.lowPriority.base}` }} />
                  <div>
                    <div className="text-[14px] font-medium text-[#101010]">Low Priority (P1)</div>
                    <div className="text-[12px] text-[#7e7e7e] font-mono">{ACTION_CARD_COLORS.lowPriority.base}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Typography Reference */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-[20px] font-medium text-[#101010] mb-4">
            Card Typography Scale
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline gap-4">
              <span className="text-[32px] text-[#101010]">₹90,00,000</span>
              <span className="text-[14px] text-[#7e7e7e]">32px - Large amounts (overview cards)</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-[20px] font-semibold text-[#101010]">₹10,12,950.60</span>
              <span className="text-[14px] text-[#7e7e7e]">20px semibold - Summary amounts</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-[14px] font-semibold text-[#101010]">Card Title</span>
              <span className="text-[14px] text-[#7e7e7e]">14px semibold - Titles</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-[12px] text-[#004299] font-medium">View Breakdown</span>
              <span className="text-[14px] text-[#7e7e7e]">12px medium - Hyperlinks</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-[12px] text-[#7e7e7e]">Label Text</span>
              <span className="text-[14px] text-[#7e7e7e]">12px - Small labels</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-[10px] text-[#7e7e7e]">2 hours ago</span>
              <span className="text-[14px] text-[#7e7e7e]">10px - Timestamps</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}