# Paytm Business Dashboard Design System Guidelines

## General Guidelines

- **Responsive Design**: All components must be fully responsive across desktop, tablet, and mobile viewports
- **Design System First**: Always use CSS variables from `/src/styles/theme.css` for colors, spacing, typography, and borders
- **Typography**: Only use Inter font family (`Inter_Subset`, `Inter`) as defined in theme.css
- **Layout**: Prefer flexbox and grid for layouts. Avoid absolute positioning unless necessary for overlays
- **Code Organization**: Keep components modular and place helper functions in separate files
- **File Sizes**: Keep file sizes manageable by breaking down large components into smaller, reusable parts

---

## Color System

### Using Semantic Colors

All colors must use CSS variables defined in `/src/styles/theme.css`. Reference colors from the semantic color tokens in `/src/imports/SemanticsColorTokens.tsx`.

#### Primary Colors
- **Primary Brand Color**: `var(--primary)` or `text-primary` / `bg-primary` → `#00b8f5` (Sky Blue)
- **Primary Foreground**: `var(--primary-foreground)` → White text on primary backgrounds
- **Background Primary 1 Strong**: `#00b8f5` (sky_blue_400)
- **Background Primary 2 Strong**: `#004299` (navy_blue_650) - Use for hyperlinks
- **Background Primary Weak**: `#e0f5fd` (sky_blue_50)
- **Background Primary Medium**: `#b1e6fb` (sky_blue_100)

#### Semantic State Colors
- **Positive (Success/Green)**:
  - Strong: `#21c179` (green_400)
  - Weak: `#e3f6ec` (green_50)
  
- **Notice (Warning/Orange)**:
  - Strong: `#ff9d00` (orange_700)
  - Weak: `#fff8e1` (orange_50) - Use with 60% opacity for low priority cards
  
- **Negative (Error/Red)**:
  - Strong: `#fd5154` (red_400) or `var(--destructive)`
  - Weak: `#ffebef` (red_50) - Use with 60% opacity for high priority cards

#### Neutral Colors
- **Foreground**: `var(--foreground)` or `text-foreground` → `#101010`
- **Muted Foreground**: `var(--muted-foreground)` or `text-muted-foreground` → `#7e7e7e`
- **Border**: `var(--border)` or `border-border` → `#e0e0e0`
- **Background**: `var(--background)` or `bg-background` → `#ffffff`
- **Surface Level 3**: `var(--surface-level-3)` → `#fafafa`
- **Background Offset Weak**: `#f5f9fe` (slate_50) - Use for subtle backgrounds, search bars, input fields
- **Sidebar Background**: `#e7f1f8` (light blue-gray) - Use for navigation sidebars

#### Chart Colors
- **Chart 1**: `var(--chart-1)` → `#00b8f5` (Sky Blue)
- **Chart 2**: `var(--chart-2)` → `#21c179` (Green)
- **Chart 3**: `var(--chart-3)` → `#ff9d00` (Orange)
- **Chart 4**: `var(--chart-4)` → `#fd5154` (Red)
- **Chart 5**: `var(--chart-5)` → `#fed533` (Yellow)

### Color Usage Rules
- Use semantic color names (e.g., `background_negative_weak`) not hex codes in documentation
- For opacity, use Tailwind's `/60` syntax: `bg-[#ffebef]/60` (60% opacity)
- Hyperlinks default to `#004299` (background primary 2 strong)
- Destructive actions use `var(--destructive)` or `text-destructive`

---

## Typography System

### Font Family
All text must use **Inter** font family:
```css
font-family: 'Inter_Subset', 'Inter', sans-serif;
```

### Typography Scale
Use CSS variables for consistent sizing:

- **Caption**: `var(--text-caption)` → 10px (uppercase, medium weight)
- **Extra Small**: `var(--text-xs)` → 12px
- **Small**: `var(--text-sm)` → 14px (default for most UI text)
- **Base**: `var(--text-base)` → 16px
- **Large**: `var(--text-lg)` → 18px
- **Extra Large**: `var(--text-xl)` → 24px
- **2X Large**: `var(--text-2xl)` → 36px

### Font Weights
- **Regular**: `var(--font-weight-regular)` → 400
- **Medium**: `var(--font-weight-medium)` → 500
- **Semibold**: `var(--font-weight-semibold)` → 600
- **Bold**: `var(--font-weight-bold)` → 700

### Typography Rules
- **DO NOT** use Tailwind text size classes (e.g., `text-2xl`, `text-lg`) unless specifically requested
- **DO NOT** use Tailwind font weight classes (e.g., `font-bold`) unless specifically requested
- Use explicit pixel values in Tailwind: `text-[14px]`, `text-[12px]`
- Default heading styles are defined in theme.css (h1-h4, p, label, button, input)
- Line height is typically 1.5 for readability

---

## Spacing & Layout

### Border Radius
- **Default**: `var(--radius)` → 8px
- **Button**: `rounded-[8px]` → 8px (all button variants)
- **Card**: `var(--radius-card)` → 12px
- **Large Cards**: Use `rounded-[20px]` for dashboard metric cards
- **Small Elements**: Use `rounded-lg` (8px) for dropdowns, tabs, filters

### Shadows & Elevation
- **Small Elevation**: `var(--elevation-sm)` or `shadow-elevation-sm` → `0 8px 16px rgba(16, 16, 16, 0.07)`
- Use shadows sparingly for cards, dropdowns, and modals

### Spacing Patterns
- **Component Internal Padding**: `p-4` (16px) or `p-5` (20px)
- **Section Gaps**: `gap-4 md:gap-6` for responsive spacing
- **Grid Gaps**: `gap-4` between cards in grids

---

## Component Guidelines

### Navigation & Layout

#### Sidebar (L1 Navigation)
- **Background**: `bg-[#e7f1f8]` (light blue-gray)
- **Width**: `w-[88px]` fixed width
- **Layout**: Vertical flex column with `gap-8`
- **Logo**: 56px square at top
- **Nav Items**:
  - Width: `w-[60px]`
  - Icon container: `h-8 w-[60px]` with `rounded-[32px]`
  - Active state: `bg-[#b1e6fb]` (sky blue 100)
  - Hover state: `hover:bg-[#fafafa]`
  - Label: `text-[10px]` with `leading-[12px]`, bold when active
  - Spacing: `gap-4` between items
- **Divider**: Horizontal line between main and bottom nav items
  - Background: `bg-[#e0e0e0]`
  - Height: `h-1`, Width: `w-8`
  - Rounded: `rounded-[7px]`
- **Icons**: Use `lucide-react` or imported SVG components, `size-6`
- **Positioning**: `relative` to contain L2 submenu

#### L2 Submenu (Settings Panel)
- **Trigger**: Clicking "Settings" nav item opens the L2 submenu
- **Layout**: 
  - Absolute positioning: `left-[88px]` (adjacent to L1 sidebar)
  - Width: `w-[236px]`
  - Height: Full height matching parent
  - Background: `bg-[#e7f1f8]` (same as L1)
  - Border: `border-l border-border` (vertical separator from L1)
  - Padding top: `pt-[22px]`
  - **Horizontal Padding**: `px-2` (8px left and right padding to prevent hover pills from touching edges)
  - Z-index: `z-10`
- **Category Headers**:
  - Text: `text-[12px]` with `tracking-[0.6px]`, uppercase
  - Color: `text-[#7e7e7e]` (muted)
  - Font weight: `font-semibold`
  - Padding: `px-[12px] py-[16px]`
  - Hover: `hover:bg-[#b1e6fb]/30`
  - Icon: `ChevronDown` that rotates 180deg when collapsed
- **Menu Items**:
  - Layout: Flex row with `gap-[8px]`
  - Padding: `p-[12px]`
  - Border radius: `rounded-[12px]`
  - Hover: `hover:bg-[#b1e6fb]/50`
  - Icon: `size-6` in `text-[#7e7e7e]`
  - Label: `text-[14px]` semibold in `text-[#7e7e7e]`
- **Behavior**:
  - Click outside closes submenu (use `useRef` and `useEffect`)
  - Clicking other nav items closes submenu
  - First category expanded by default
  - Smooth transitions with `transition-colors` and `transition-transform`

#### Header
- **Layout**: Flex row with responsive stacking
- **Padding**: `px-4 md:px-6 lg:px-8 py-3`
- **Search Bar**:
  - Background: `bg-[#f5f9fe]`
  - Border radius: `rounded-[100px]` (fully rounded)
  - Padding: `p-3 md:p-4`
  - Max width: `md:max-w-[560px] lg:w-[560px]`
  - Icon: Search icon `size-6`
  - Input: Transparent background with placeholder styling
- **Actions**: "What's New" and "Contact Us" links (hidden on mobile)
- **Profile Avatar**:
  - Background: `bg-[#f5f9fe]`
  - Border: `border border-[#e0e0e0]`
  - Size: `size-9 md:size-10`
  - Border radius: `rounded-full`
  - Initials: Bold text centered

### Cards & Containers

#### Dashboard Metric Cards
- **Background Colors**:
  - Payments: `#F5FBFE` (light blue)
  - Settlement: `#F0FDF4` (light green)
  - Refunds: `#FEF2F2` (light red)
- **Border Radius**: `rounded-[20px]`
- **Padding**: `p-5` (20px)
- **Layout**: Flex column with `gap-3`
- **Divider**: Use `border-t border-border` with `pt-3`

#### Action Cards
- **Background Colors with Opacity**:
  - High Priority (P0): `bg-[#ffebef]/60` (red_50 at 60%)
  - Low Priority (P1): `bg-[#fff8e1]/60` (orange_50 at 60%)
- **Hover**: Change opacity from 60% to 100%: `hover:bg-[#ffebef]`
- **Border Radius**: `rounded-lg` (8px)
- **Padding**: `p-4`
- **No Borders**: Cards should not have strokes
- **Icon Position**: Icons on the right side
- **Transition**: `transition-colors` for smooth hover effects

#### Notification Cards
- **Background**: `bg-[#fafafa]` (surface-level-3)
- **Unread Background**: `bg-[#F5F9FE]`
- **Border Radius**: `rounded-[16px]`
- **Padding**: `p-[16px]`
- **Hover**: `hover:bg-accent/50`
- **Unread Indicator**: Blue dot (`bg-primary`) with `size-2`

#### Feature/Service Cards
Feature cards with icon, title, description, and CTA button.

**Layout Structure**:
- **Container**: White background with border, 12px border radius, padding 24px (p-6)
- **Gap**: 16px (gap-4) between content sections
- **Hover Effect**: `hover:shadow-elevation-sm transition-shadow`

**Top Section Layout**:
```tsx
<div className="flex items-start justify-between gap-4">
  {/* Content Left */}
  <div className="flex flex-col gap-2 flex-1">
    {/* Title, description, optional tags */}
  </div>
  {/* Icon Right */}
  <div className="size-12 rounded-full bg-[COLOR] flex items-center justify-center shrink-0">
    {/* Icon */}
  </div>
</div>
```

**Content Sections**:
- **Title**: 
  - Font Size: `text-[18px]`
  - Font Weight: `font-semibold`
  - Color: `text-[#101010]`
  
- **Description**:
  - Font Size: `text-[14px]`
  - Color: `text-[#7e7e7e]`
  - Line Height: `leading-[1.5]`
  
- **Optional Tags/Labels**:
  - Font Size: `text-[12px]`
  - Transform: `uppercase`
  - Tracking: `tracking-[0.6px]`
  - Color: `text-[#7e7e7e]`
  - Font Weight: `font-semibold`

**Icon Container**:
- **Size**: `size-12` (48px square)
- **Shape**: `rounded-full` (circular)
- **Background**: Semantic color with low opacity (e.g., `bg-[#e0f5fd]` for blue)
- **Icon Size**: `size-6` (24px)
- **Icon Color**: Matches semantic color strong variant
- **Positioning**: `shrink-0` to prevent compression

**CTA Button**:
- **Background**: `bg-[#004299]` (Primary Strong 2 - Navy Blue)
- **Text Color**: `text-white`
- **Font Size**: `text-[14px]`
- **Font Weight**: `font-semibold`
- **Padding**: `px-6 py-3`
- **Border Radius**: `rounded-lg` (8px)
- **Hover**: `hover:bg-[#003377]`
- **Transition**: `transition-colors`
- **Alignment**: `self-start` (left-aligned at bottom)

**Complete Card Example**:
```tsx
<div className="bg-white border border-[#e0e0e0] rounded-[12px] p-6 flex flex-col gap-4 hover:shadow-elevation-sm transition-shadow">
  {/* Top Section: Content on left, Icon on right */}
  <div className="flex items-start justify-between gap-4">
    <div className="flex flex-col gap-2 flex-1">
      <h3 className="text-[18px] font-semibold text-[#101010]">Card Title</h3>
      <p className="text-[14px] text-[#7e7e7e] leading-[1.5]">
        Description text that explains the feature or service.
      </p>
      <span className="text-[12px] uppercase tracking-[0.6px] text-[#7e7e7e] font-semibold mt-1">
        OPTIONAL TAG
      </span>
    </div>
    <div className="size-12 rounded-full bg-[#e0f5fd] flex items-center justify-center shrink-0">
      <IconComponent className="size-6 text-[#00b8f5]" />
    </div>
  </div>
  
  {/* CTA Button at bottom, left-aligned */}
  <button className="bg-[#004299] text-white text-[14px] font-semibold px-6 py-3 rounded-lg hover:bg-[#003377] transition-colors self-start">
    Button Label
  </button>
</div>
```

**Grid Layout for Multiple Cards**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Card 1 */}
  {/* Card 2 */}
</div>
```

#### Consent/Agreement Cards
Interactive cards for terms acceptance with checkbox and CTA button.

**Layout Structure**:
- **Container**: White background with border, 12px border radius, padding 24px (p-6)
- **Gap**: 16px (gap-4) between content sections
- **No Hover Effect**: Static card without hover state

**Top Section Layout**:
```tsx
<div className="flex items-start justify-between gap-4">
  {/* Content Left */}
  <div className="flex flex-col gap-2 flex-1">
    {/* Title and description */}
  </div>
  {/* Icon Right */}
  <div className="size-10 rounded-full bg-[COLOR] flex items-center justify-center shrink-0">
    {/* Icon */}
  </div>
</div>
```

**Content Sections**:
- **Title**: 
  - Font Size: `text-[16px]`
  - Font Weight: `font-semibold`
  - Color: `text-[#101010]`
  
- **Description**:
  - Font Size: `text-[14px]`
  - Color: `text-[#7e7e7e]`
  - Line Height: Default (1.5)

**Icon Container**:
- **Size**: `size-10` (40px square) - smaller than service cards
- **Shape**: `rounded-full` (circular)
- **Background**: Full opacity semantic color (e.g., `bg-[#00b8f5]` for primary)
- **Icon Size**: `size-5` (20px)
- **Icon Color**: `text-white`
- **Positioning**: `shrink-0` to prevent compression

**Checkbox Section**:
- **Layout**: `flex items-center gap-3` (vertically centered alignment)
- **Checkbox**:
  - Size: `size-4` (16px)
  - Border: `border-[#e0e0e0]`
  - Border radius: `rounded`
  - Accent color: `accent-[#004299]` (Primary Strong 2 - Navy Blue)
  - Cursor: `cursor-pointer`
  - **No margin-top**: Checkbox naturally aligns with text when using `items-center`
- **Label**:
  - Font Size: `text-[14px]`
  - Color: `text-[#101010]`
  - Cursor: `cursor-pointer`
  - Links within label: `text-[#00b8f5] font-semibold hover:underline`

**CTA Button**:
- **Background**: `bg-[#004299]` (Primary Strong 2 - Navy Blue) when enabled
- **Disabled Background**: `bg-[#e0e0e0]`
- **Text Color**: `text-white` when enabled, `text-[#7e7e7e]` when disabled
- **Font Size**: `text-[14px]`
- **Font Weight**: `font-semibold`
- **Padding**: `px-6 py-3`
- **Border Radius**: `rounded-lg` (8px)
- **Hover**: `hover:bg-[#003377]` (only when enabled)
- **Disabled Cursor**: `cursor-not-allowed`
- **Transition**: `transition-colors`
- **Alignment**: `self-start` (left-aligned at bottom)
- **Icon**: Optional arrow icon with `size-4`

**Complete Card Example**:
```tsx
<div className="bg-white border border-[#e0e0e0] rounded-[12px] p-6 flex flex-col gap-4">
  {/* Top Section: Content on left, Icon on right */}
  <div className="flex items-start justify-between gap-4">
    <div className="flex flex-col gap-2 flex-1">
      <h3 className="text-[16px] font-semibold text-[#101010]">Consent & Agreement</h3>
      <p className="text-[14px] text-[#7e7e7e]">
        By activating Connect Plus services, you agree to our specialized CPaaS messaging terms.
      </p>
    </div>
    <div className="size-10 rounded-full bg-[#00b8f5] flex items-center justify-center shrink-0">
      <ShieldCheck className="size-5 text-white" />
    </div>
  </div>

  {/* Checkbox Section */}
  <div className="flex items-center gap-3">
    <input
      type="checkbox"
      id="terms"
      checked={termsAccepted}
      onChange={(e) => setTermsAccepted(e.target.checked)}
      className="size-4 border-[#e0e0e0] rounded accent-[#004299] cursor-pointer"
    />
    <label htmlFor="terms" className="text-[14px] text-[#101010] cursor-pointer">
      I accept the{" "}
      <a href="#" className="text-[#00b8f5] font-semibold hover:underline">
        Terms and Conditions
      </a>{" "}
      and the{" "}
      <a href="#" className="text-[#00b8f5] font-semibold hover:underline">
        Privacy Policy
      </a>{" "}
      for Connect Plus services.
    </label>
  </div>

  {/* CTA Button at bottom, left-aligned */}
  <button
    onClick={handleAcceptAndContinue}
    disabled={!termsAccepted}
    className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors self-start ${
      termsAccepted
        ? "bg-[#004299] text-white hover:bg-[#003377]"
        : "bg-[#e0e0e0] text-[#7e7e7e] cursor-not-allowed"
    }`}
  >
    <span className="text-[14px] font-semibold">Accept & Continue</span>
    <ArrowRight className="size-4" />
  </button>
</div>
```

**State Management**:
```tsx
const [termsAccepted, setTermsAccepted] = useState(false);

const handleAcceptAndContinue = () => {
  if (termsAccepted) {
    // Handle acceptance logic
  }
};
```

### Interactive Elements

#### Buttons

**Default CTA Button (Primary Strong 2)**:
- **Background**: `bg-[#004299]` (Primary Strong 2 - Navy Blue)
- **Text Color**: `text-white`
- **Font Size**: `text-[14px]`
- **Font Weight**: `font-semibold`
- **Padding**: `px-6 py-3`
- **Border Radius**: `rounded-lg` (8px)
- **Hover**: `hover:bg-[#003377]` (Darker navy)
- **Transition**: `transition-colors`

**Other Button Variants**:
- **Primary Button**: `bg-primary text-primary-foreground`
- **Border Radius**: `var(--radius-button)` (4px)
- **Hover States**: Always include hover effects
- **Font**: Semibold weight, 14px size

**Disabled State**:
- **Background**: `bg-[#e0e0e0]`
- **Text Color**: `text-[#7e7e7e]`
- **Cursor**: `cursor-not-allowed`

#### Hyperlinks
- **Default Color**: `text-[#004299]` (background primary 2 strong)
- **Hover**: `hover:underline`
- **Font Weight**: `font-semibold`
- **Font Size**: `text-[12px]`

**Complete Hyperlink Styling:**
```tsx
<a href="#" className="text-[#004299] hover:underline font-semibold text-[12px]">
  Link Text
</a>
```

**Usage Notes:**
- Use 12px as the default size for hyperlinks in cards and compact layouts
- For hyperlinks within larger text (e.g., 14px paragraphs), match the parent text size
- Always maintain semibold weight and navy blue color (`#004299`)
- Underline appears only on hover for clean appearance

#### Tabs (Secondary Tab Component)
- **Border Radius**: `rounded-[8px]` (8px)
- **Active Tab**: Primary background with white text
- **Inactive Tab**: Transparent background with muted text
- **Padding**: Balanced internal padding for touch targets
- **Font Size**: 14px

#### Dropdowns
- **Trigger**: Background `bg-[#f5f9fe]`, height `h-[40px]`, padding `px-3 py-1.5`
- **Menu**: White background, shadow-lg, border-border
- **Border Radius**: `rounded-lg` (8px)
- **Options**: Full width, text-left, hover:bg-[#f5f9fe]
- **Z-index**: Use `z-10` for proper layering
- **Chevron**: Rotate 180deg when open

### Filters & Search Widget

#### Filter Bar Layout
The filter bar should contain filter dropdowns on the left and search widget on the right, all in one horizontal row.

**Layout Structure:**
```tsx
<div className="flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center">
  {/* Left-aligned filters */}
  {/* Right-aligned search widget with ml-auto */}
</div>
```

#### Filter Dropdowns

#### Primary Filter Dropdowns (DEFAULT)

**This is the default filter design for ALL modules unless specifically requested otherwise.**

**Design Principles:**
- **Vertical Layout**: Label on top, selected value below (no horizontal layout)
- **No Border on Trigger**: Clean, borderless trigger button
- **Minimal Spacing**: 1px gap between label and value
- **Hover Background**: Subtle hover state with `#f5f9fe` background

**Filter Spacing Between Filters:**
- Use `gap-5` (20px) between multiple filters on desktop
- Use `gap-[15px]` (15px) on mobile

**Common Filter Types:**
1. **Date Filter** - Width: 180px dropdown menu
2. **Status Filter** - Width: 140px dropdown menu
3. **Category Filter** - Adjust width based on content
4. **Type Filter** - Adjust width based on content

**Visual Styling:**
- **Label (Top)**:
  - Text: `text-[12px]`
  - Color: `text-[#7e7e7e]` (muted foreground)
  - Transform: `uppercase`
  - Letter spacing: `tracking-[0.6px]`
  - Font weight: `font-semibold`
  
- **Selected Value (Bottom)**:
  - Text: `text-[14px]`
  - Color: `text-[#101010]` (foreground)
  - Font weight: `font-semibold`
  
- **Trigger Button**:
  - Layout: `flex items-center gap-2`
  - Background: Transparent (no border)
  - Hover: `hover:bg-[#f5f9fe]`
  - Active: `bg-[#f5f9fe]` when dropdown is open
  - Transition: `transition-colors`
  
- **Icon (ChevronDown)**:
  - Size: `size-4` (16px)
  - Rotation: `rotate-180` when dropdown is open
  - Transition: `transition-transform`

- **Dropdown Menu**:
  - Background: `bg-white`
  - Border: `border border-[#e0e0e0]`
  - Border radius: `rounded-lg` (8px)
  - Shadow: `shadow-lg`
  - Width: Varies by filter type (140px - 180px)
  - Z-index: `z-10`
  - Padding: `py-1` wrapper
  
- **Dropdown Options**:
  - Layout: `w-full text-left`
  - Padding: `px-4 py-2`
  - Text: `text-[14px]`
  - Color: `text-[#101010]`
  - Hover: `hover:bg-[#f5f9fe]`
  - Transition: `transition-colors`

**Complete Filter Structure (PRIMARY DEFAULT):**
```tsx
{/* Filter Container - Vertical Layout with 1px gap */}
<div className="flex flex-col gap-[1px]">
  {/* Label */}
  <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">
    FILTER NAME
  </span>
  
  {/* Trigger Button */}
  <div className="relative" ref={dropdownRef}>
    <button
      className={`flex items-center gap-2 text-[14px] text-[#101010] font-semibold hover:bg-[#f5f9fe] transition-colors ${isOpen ? "bg-[#f5f9fe]" : ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span>{selectedValue}</span>
      <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>
    
    {/* Dropdown Menu */}
    {isOpen && (
      <div className="absolute top-full left-0 mt-1 bg-white border border-[#e0e0e0] rounded-lg shadow-lg w-[180px] z-10">
        <div className="py-1">
          <button
            className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors"
            onClick={() => {
              setSelectedValue("Option 1");
              setIsOpen(false);
            }}
          >
            Option 1
          </button>
          <button
            className="w-full text-left px-4 py-2 text-[14px] text-[#101010] hover:bg-[#f5f9fe] transition-colors"
            onClick={() => {
              setSelectedValue("Option 2");
              setIsOpen(false);
            }}
          >
            Option 2
          </button>
        </div>
      </div>
    )}
  </div>
</div>
```

**State Management Requirements:**
```tsx
// Required state for each filter
const [selectedValue, setSelectedValue] = useState("Default Option");
const [isOpen, setIsOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);

// Click outside handler (add to useEffect)
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
```

**Interaction Behavior:**
- Clicking trigger button toggles dropdown open/close
- Clicking outside dropdown closes it automatically
- Selecting an option updates the selected value and closes dropdown
- Chevron icon rotates 180 degrees when open
- Hover states provide visual feedback on trigger and options

**Date Filter:**
- **Label**: Uppercase text with 12px size, `#7e7e7e` color, tracking `0.6px`, semibold
- **Trigger**: White background with `#e0e0e0` border, 40px height, 8px border radius
- **Selected Value**: 14px, `#101010` color
- **Hover State**: Background changes to `#f5f9fe`
- **Active State**: Background `#f5f9fe` when dropdown is open
- **Icon**: `ChevronDown` size-4, rotates 180deg when open
- **Dropdown Menu**:
  - White background
  - Border: `#e0e0e0`
  - Border radius: 8px (`rounded-lg`)
  - Shadow: `shadow-lg`
  - Width: 180px
  - Z-index: 10
  - Options: 14px text, full width, left-aligned, hover `#f5f9fe`

**Status Filter:**
- Same styling as Date Filter
- Width: 140px for dropdown menu
- Options: All, Success, Pending, Failed

**Filter Structure:**
```tsx
<div className="flex items-center gap-2">
  <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">
    LABEL
  </span>
  <div className="relative" ref={dropdownRef}>
    <button
      className={`flex items-center gap-2 text-[14px] text-[#101010] bg-white border border-[#e0e0e0] rounded-lg px-3 py-2 hover:bg-[#f5f9fe] h-[40px] transition-colors ${isOpen ? "bg-[#f5f9fe]" : ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span>{selectedValue}</span>
      <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>
    {/* Dropdown menu */}
  </div>
</div>
```

#### Unified Search Widget

The search widget combines a dropdown selector and search input in a single bordered container.

**Design Guidelines:**
- **Container**: 
  - White background with `#e0e0e0` border
  - Border radius: 8px (`rounded-lg`)
  - Height: 40px
  - Width: 560px (fixed)
  - Overflow: hidden
  - Alignment: `ml-auto` to push to right
- **Layout**: Horizontal flex with two sections separated by a vertical divider

**Search Type Dropdown (Left Section):**
- **Trigger**: 
  - Transparent background, `#f5f9fe` on hover
  - Height: 40px (full height of container)
  - Padding: px-3 py-2
  - Text: 14px, semibold, `#101010`
  - Icon: `ChevronDown` size-4, rotates 180deg when open
  - Whitespace: nowrap to prevent text wrapping
- **Selected Options**: Transaction ID, Order ID, Refund ID, RRN
- **Dropdown Menu**:
  - Positioned absolute below trigger
  - White background with `#e0e0e0` border
  - Border radius: 8px
  - Shadow: `shadow-lg`
  - Width: 180px
  - Z-index: 10

**Vertical Divider:**
- Full height of container (`h-full`)
- Width: 1px (`w-[1px]`)
- Color: `#e0e0e0`

**Search Input (Right Section):**
- **Container**: 
  - Flex-1 to fill remaining space
  - Padding: px-3
  - Flex row layout
- **Search Icon**:
  - Size: 20px (size-5)
  - Color: `#7e7e7e` (muted)
  - Margin-right: 8px (mr-2)
- **Input Field**:
  - Flex-1 to fill space
  - Transparent background
  - Text: 14px, semibold, `#101010`
  - Placeholder: `#7e7e7e`, dynamic based on selected filter
  - No outline
  - No border

**Complete Widget Structure:**
```tsx
<div className="flex items-center bg-white border border-[#e0e0e0] rounded-lg h-[40px] w-[560px] overflow-hidden ml-auto">
  {/* Search Type Dropdown */}
  <div className="relative flex items-center" ref={searchDropdownRef}>
    <button
      className={`flex items-center gap-2 text-[14px] text-[#101010] px-3 py-2 hover:bg-[#f5f9fe] h-[40px] transition-colors whitespace-nowrap ${isSearchDropdownOpen ? "bg-[#f5f9fe]" : ""}`}
      onClick={() => setIsSearchDropdownOpen(!isSearchDropdownOpen)}
    >
      <span className="font-semibold">{searchFilter}</span>
      <ChevronDown className={`size-4 transition-transform ${isSearchDropdownOpen ? "rotate-180" : ""}`} />
    </button>
    {/* Dropdown menu */}
  </div>

  {/* Divider */}
  <div className="h-full w-[1px] bg-[#e0e0e0]" />

  {/* Search Input */}
  <div className="flex-1 flex items-center px-3">
    <Search className="size-5 text-[#7e7e7e] mr-2" />
    <input
      type="text"
      placeholder={`Search ${searchFilter}`}
      className="flex-1 bg-transparent text-[14px] text-[#101010] placeholder:text-[#7e7e7e] outline-none font-semibold"
    />
  </div>
</div>
```

**State Management:**
- Use `useState` for selected filter value and dropdown open states
- Use `useRef` for click-outside detection
- Use `useEffect` to handle click outside and close dropdowns

**Interaction Behavior:**
- Clicking dropdown trigger toggles open/close
- Clicking outside dropdown closes it
- Selecting an option updates the filter and closes dropdown
- Search placeholder updates dynamically based on selected filter type
- Hover states provide visual feedback

**Responsive Considerations:**
- On mobile, search widget can wrap to second row or reduce width
- Use `flex-col md:flex-row` for filter bar container
- Consider `max-w-[560px]` instead of fixed width for better mobile behavior

### Data Visualization

#### Charts (Recharts)
- Use `recharts` library for all charts
- Apply chart color variables: `var(--chart-1)` through `var(--chart-5)`
- Bar charts: Use rounded corners for bars
- Donut charts: Center text for metrics
- Responsive: Charts should resize with container

---

## Page Layout Structure

### Main Container
- **Padding**: `px-[32px]` for left and right padding (32px)
- **Vertical Spacing**: Use `gap-4` or `gap-6` between major sections
- **Background**: `bg-[#ffffff]` (white)
- **Min Height**: `min-h-full` to ensure full viewport coverage

### Edge-to-Edge Separators
Horizontal separators that span the full width of the frame, touching both left and right edges.

**Implementation:**
```tsx
<div className="w-[calc(100%+64px)] h-[1px] bg-[#e0e0e0] mx-[-32px]" />
```

**How it works:**
- `w-[calc(100%+64px)]` - Width is 100% plus 64px (32px left + 32px right)
- `mx-[-32px]` - Negative margin pulls the separator 32px outside on both sides
- `h-[1px]` - 1 pixel height
- `bg-[#e0e0e0]` - Border color from design system

**Usage:**
- Use above and below filter sections
- Use to separate major page sections
- Use to create visual hierarchy in content areas

---

## Page Components

### Page Title Section

**Main Container Padding**:
- **Horizontal Padding**: `px-[32px]` (32px left and right)
- **Top Padding**: `pt-[20px]` (20px top)
- **Bottom Padding**: `pb-[32px]` (32px bottom)
- **Full Class**: `px-[32px] pt-[20px] pb-[32px]`

**Page Title (H1)**:
- **Font Size**: `text-[32px]`
- **Font Weight**: `font-semibold`
- **Color**: `text-[#101010]` (foreground)
- **Margin Bottom**: `mb-0` (spacing controlled by parent gap)

**Page Subtitle/Description**:
- **Font Size**: `text-[12px]`
- **Color**: `text-[#7e7e7e]` (muted foreground)
- **Font Weight**: Regular (default)
- **Usage**: Optional descriptive text immediately below page title
- **Layout**: No gap between title and subtitle (direct stacking)

**Title + Subtitle Structure**:
```tsx
{/* Page Title with Optional Subtitle */}
<div className="flex flex-col">
  <h1 className="text-[32px] text-[#101010]" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
    Page Title
  </h1>
  <p className="text-[#7e7e7e] text-[12px]">
    Optional descriptive subtitle text that provides context about the page.
  </p>
</div>
```

**Section Title (H2)**:
- **Font Size**: `text-[20px]`
- **Font Weight**: `font-medium`
- **Color**: `text-[#101010]` (foreground)

**Title with Actions Layout**:
```tsx
<div className="flex items-center justify-between">
  <h2 className="text-[20px] font-medium text-[#101010]">Section Title</h2>
  <div className="flex items-center gap-2">
    {/* Action buttons */}
  </div>
</div>
```

**Complete Page Structure Example**:
```tsx
<div className="flex flex-col gap-4 md:gap-6 bg-[#ffffff] min-h-full px-[32px] pt-[20px] pb-[32px]">
  {/* Page Title and Filters */}
  <div className="flex flex-col gap-4">
    <h1 className="text-[32px] font-semibold text-[#101010]">Page Title</h1>
    {/* Other content */}
  </div>
</div>
```

---

## Summary Cards Section

### Card Grid Layout
Use flexbox with gap-1 (4px) between cards and operator symbols.

**Container Structure**:
```tsx
<div className="flex items-center gap-1">
  {/* Card 1 */}
  {/* Operator Symbol */}
  {/* Card 2 */}
  {/* Operator Symbol */}
  {/* Card 3 */}
  {/* Equals Symbol */}
  {/* Result Card */}
</div>
```

### Summary Card Design

**Card Structure**:
- **Border Radius**: `rounded-[12px]`
- **Padding**: `p-5` (20px)
- **Layout**: `flex flex-col`
- **Flex**: `flex-1` to distribute space equally

**Background Colors by Type**:
- **Collections (Blue)**: `bg-[#eaf2fd]`
- **Settlement Processed (Green)**: `bg-[rgba(39,174,95,0.1)]`
- **Adjustments (Light Red)**: `bg-[#fdeeee]`
- **Deductions (Red)**: `bg-[rgba(235,87,87,0.1)]`
- **Available for Settlement (Sky Blue)**: `bg-[#e0f5fd]`

**Card Content**:
```tsx
<div className="bg-[#eaf2fd] rounded-[12px] p-5 flex flex-col flex-1">
  {/* Label */}
  <span className="text-[14px] text-[#101010]">Collections</span>
  
  {/* Amount */}
  <span className="text-[20px] font-semibold text-[#101010]">₹10,12,950.60</span>
  
  {/* Divider + Link */}
  <div className="border-t border-[#e0e0e0] pt-3 mt-3 flex items-center">
    <button className="flex items-center gap-1 text-[12px] text-[#004299] font-medium hover:underline">
      <span>View Breakdown</span>
      <ChevronDown className="size-4" />
    </button>
  </div>
</div>
```

**Primary Action Card**:
Last card can include a primary action button:
```tsx
<button className="bg-[#004299] text-white text-[12px] font-semibold px-4 py-2 rounded-lg hover:bg-[#003377] transition-colors mt-2">
  Settle Now
</button>
```

### Mathematical Operator Symbols

**Minus Symbol** (-):
```tsx
<div className="bg-white content-stretch flex flex-col items-center justify-center rounded-[12px] shrink-0 size-[16px]">
  <div className="bg-[#7e7e7e] h-[2px] shrink-0 w-[8px]" />
</div>
```

**Equals Symbol** (=):
```tsx
<div className="bg-white content-stretch flex flex-col items-center justify-center gap-[2px] rounded-[12px] shrink-0 size-[16px]">
  <div className="bg-[#7e7e7e] h-[1.33px] shrink-0 w-[8px]" />
  <div className="bg-[#7e7e7e] h-[1.33px] shrink-0 w-[8px]" />
</div>
```

**Plus Symbol** (+):
```tsx
<div className="bg-white content-stretch flex items-center justify-center rounded-[12px] shrink-0 size-[16px] relative">
  <div className="bg-[#7e7e7e] h-[1.33px] absolute w-[8px]" />
  <div className="bg-[#7e7e7e] w-[1.33px] absolute h-[8px]" />
</div>
```

---

## Table/Listing Design

### Table Container
- **Background**: `bg-white`
- **Border Radius**: `rounded-[12px]`
- **Border**: `border border-[#e0e0e0]`
- **Overflow**: `overflow-hidden` (to maintain rounded corners)

### Table Header Row

**Styling**:
- **Background**: `bg-[#fafafa]` (surface-level-3)
- **Border Bottom**: `border-b border-[#e0e0e0]`
- **Padding**: `px-6 py-4`
- **Layout**: CSS Grid with custom columns

**Header Text**:
- **Font Size**: `text-[12px]`
- **Color**: `text-[#7e7e7e]` (muted)
- **Transform**: `uppercase`
- **Tracking**: `tracking-[0.6px]`
- **Font Weight**: `font-semibold`
- **No Wrap**: `whitespace-nowrap` for multi-word headers

### Table Data Rows

**Row Styling**:
- **Padding**: `px-6 py-4`
- **Border Bottom**: `border-b border-[#e0e0e0]`
- **Last Row**: `last:border-b-0` (remove border from last row)
- **Hover State**: `hover:bg-[#f5f9fe]`
- **Transition**: `transition-colors`
- **Cursor**: `cursor-pointer` (for clickable rows)
- **Alignment**: `items-center` (vertical centering)

**Data Text**:
- **Font Size**: `text-[16px]`
- **Color**: `text-[#101010]` (foreground)
- **No Wrap**: `whitespace-nowrap` to prevent text wrapping
- **Font Weight**: Regular (default), `font-semibold` for amounts

### Column Layout & Spacing

**CRITICAL**: Use equal spacing between all columns.

**Gap**: `gap-8` (32px between columns)

**Column Width Guidelines**:
- **Time Column**: Fixed width (e.g., `90px`) - includes icon + time
- **Text Columns**: Fixed width based on content (e.g., `110px`, `130px`, `140px`)
- **Flexible Columns**: Use `1fr` for columns that can grow (e.g., Customer Name)
- **Amount Column**: Fixed width, right-aligned (e.g., `130px`)
- **Icon Column**: Small fixed width (e.g., `40px`)

**Example Grid Template**:
```
grid-cols-[90px_1fr_110px_130px_140px_130px_40px]
```

**Column Sizing Rules**:
1. Measure the longest expected content
2. Add padding for comfortable spacing
3. Test with `whitespace-nowrap` to ensure no wrapping
4. Adjust widths to fit content without overflow

### Table Icons & Interactive Elements

**Status Icons** (left side):
- Use imported Figma components (e.g., `SuccessSmall`)
- Size: `size-5` (20px)
- Wrapper: `shrink-0` to prevent compression

**Copy Button**:
- **Icon Size**: `size-4` (16px)
- **Color**: `text-[#00b8f5]` (primary blue)
- **Hover**: `hover:text-[#004299]` (navy blue)
- **Transition**: `transition-colors`
- **Protection**: `shrink-0` to prevent compression

**Chevron Icon** (right side):
- **Icon**: `ChevronRight`
- **Size**: `size-5` (20px)
- **Color**: `text-[#7e7e7e]` (muted)
- **Alignment**: `flex justify-end`

### Table Example Structure

```tsx
<div className="bg-white rounded-[12px] border border-[#e0e0e0] overflow-hidden">
  {/* Table Header */}
  <div className="grid grid-cols-[90px_1fr_110px_130px_140px_130px_40px] gap-8 px-6 py-4 bg-[#fafafa] border-b border-[#e0e0e0]">
    <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">Time</span>
    <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">Customer Name</span>
    {/* More headers... */}
  </div>

  {/* Table Rows */}
  {data.map((item) => (
    <div
      key={item.id}
      className="grid grid-cols-[90px_1fr_110px_130px_140px_130px_40px] gap-8 px-6 py-4 border-b border-[#e0e0e0] last:border-b-0 hover:bg-[#f5f9fe] transition-colors cursor-pointer items-center"
    >
      <div className="flex items-center gap-3">
        <div className="size-5 shrink-0">
          <SuccessSmall />
        </div>
        <span className="text-[16px] text-[#101010] whitespace-nowrap">{item.time}</span>
      </div>
      <span className="text-[16px] text-[#101010] whitespace-nowrap">{item.name}</span>
      {/* More columns... */}
    </div>
  ))}
</div>
```

---

## Pagination

**Layout**:
- Flex container with `justify-between`
- Page info on left, navigation buttons on right

**Page Info**:
- **Font Size**: `text-[14px]`
- **Color**: `text-[#7e7e7e]` (muted)
- **Format**: "PAGE 1 OF 32" (all caps)

**Navigation Buttons**:
- **Style**: White background with border
- **Border**: `border border-[#e0e0e0]`
- **Border Radius**: `rounded-lg` (8px)
- **Padding**: `px-4 py-2`
- **Font Size**: `text-[14px]`
- **Font Weight**: `font-semibold`
- **Color**: `text-[#101010]`
- **Hover**: `hover:bg-[#f5f9fe]`
- **Transition**: `transition-colors`
- **Spacing**: `gap-2` between buttons

```tsx
<div className="flex items-center justify-between">
  <span className="text-[14px] text-[#7e7e7e]">PAGE 1 OF 32</span>
  <div className="flex items-center gap-2">
    <button className="px-4 py-2 text-[14px] text-[#101010] bg-white border border-[#e0e0e0] rounded-lg hover:bg-[#f5f9fe] transition-colors font-semibold">
      Prev
    </button>
    <button className="px-4 py-2 text-[14px] text-[#101010] bg-white border border-[#e0e0e0] rounded-lg hover:bg-[#f5f9fe] transition-colors font-semibold">
      Next
    </button>
  </div>
</div>
```

---

## Interaction Patterns

### Hover States
- **Cards**: Opacity change (60% → 100%) or background color change
- **Buttons**: Background color lightening/darkening
- **Links**: Underline appearance
- **Dropdowns**: Background highlight `bg-[#f5f9fe]`

### Click Outside Detection
- Use `useRef` and `useEffect` for dropdown/modal click-outside behavior
- Clean up event listeners in effect cleanup function

### Transitions
- Use `transition-colors` for color changes
- Use `transition-shadow` for elevation changes
- Use `transition-transform` for icon rotations
- Duration: Default Tailwind timing (150ms-200ms)

---

## Scrollbar Styling

For custom scrollbars on overflow containers:
```
[&::-webkit-scrollbar]:w-2
[&::-webkit-scrollbar-track]:bg-transparent
[&::-webkit-scrollbar-thumb]:bg-gray-300
[&::-webkit-scrollbar-thumb]:rounded-full
[&::-webkit-scrollbar-thumb]:hover:bg-gray-400
```

---

## Best Practices

### Accessibility
- Use semantic HTML elements (button, nav, main, etc.)
- Provide `alt` text for images
- Use `aria-hidden="true"` for decorative elements
- Ensure sufficient color contrast (foreground vs background)

### Performance
- Keep component re-renders minimal
- Use `useMemo` and `useCallback` for expensive computations
- Lazy load images when possible

### Code Style
- Use TypeScript for type safety
- Destructure props in function parameters
- Use functional components with hooks
- Keep components under 300 lines (split into smaller components)
- Use meaningful variable and function names

### Responsive Design
- Mobile-first approach with Tailwind breakpoints: `sm:`, `md:`, `lg:`
- Grid layouts: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Flex direction: `flex-col sm:flex-row`
- Spacing: `gap-4 md:gap-6`
- Padding: `p-4 md:p-6 lg:p-8`

---

## Date & Time Formatting
- Date format: "Today, 24 Jan" or "Yesterday, 23 Jan"
- Time format: "7:30 AM, 23 Sep" or "8:00 AM Everyday"
- Use descriptive relative dates when appropriate

---

## Icons

### Icon Sources

**Custom PODS Admin Icons** (Primary):
- Use icons from `/src/app/components/Icons.tsx` for design system consistency
- 90+ icons matching the PODS Admin design language
- All icons accept `className` prop for customization

**Lucide React** (Secondary):
- Use `lucide-react` package for icons not available in PODS library
- Import only needed icons to reduce bundle size

**Figma Imports** (Special Cases):
- Use imported Figma components for unique status indicators (e.g., `SuccessSmall`)
- Located in `/src/imports/` directory

### Icon Sizing
- **size-4** (16px) - Small inline icons, copy buttons
- **size-5** (20px) - Standard emphasis, status icons
- **size-6** (24px) - Default size, navigation icons

### Icon Colors
- **Default**: `currentColor` - inherits parent text color
- **Primary**: `text-[#00b8f5]` - primary actions, links
- **Success**: `text-[#21c179]` - positive states
- **Warning**: `text-[#ff9d00]` - notice states
- **Error**: `text-[#fd5154]` - error states
- **Muted**: `text-[#7e7e7e]` - secondary actions

### Usage Examples

**From PODS Icons Library**:
```tsx
import { CheckIcon, CopyIcon, SearchIcon } from './components/Icons';

<CheckIcon className="size-5 text-[#21c179]" />
<CopyIcon className="size-4 text-[#00b8f5]" />
```

**From Lucide React**:
```tsx
import { ChevronRight, Download } from 'lucide-react';

<ChevronRight className="size-5 text-[#7e7e7e]" />
```

**From Figma Imports**:
```tsx
import SuccessSmall from '../../imports/SuccessSmall';

<div className="size-5 shrink-0">
  <SuccessSmall />
</div>
```

---

## Currency Formatting
- Use Indian Rupee symbol: ₹
- Format large numbers with commas: ₹90,00,000
- Keep consistent spacing between symbol and number

---

## Common Mistakes to Avoid
❌ Don't use arbitrary hex colors without design system reference
❌ Don't use Tailwind text size classes (text-lg, text-xl) for body text
❌ Don't use Tailwind font weight classes (font-bold) unless requested
❌ Don't create borders/strokes on action cards
❌ Don't use box shadows on hover for action cards (use opacity instead)
❌ Don't hardcode spacing values - use Tailwind spacing scale
❌ Don't forget to add transitions for interactive elements
❌ Don't mix semantic color tokens with arbitrary hex values

✅ Do use CSS variables from theme.css
✅ Do use explicit pixel values: text-[14px]
✅ Do use semantic color names in documentation
✅ Do provide hover states for all interactive elements
✅ Do use opacity variants: bg-[#ffebef]/60
✅ Do ensure mobile responsiveness
✅ Do maintain consistent spacing and alignment