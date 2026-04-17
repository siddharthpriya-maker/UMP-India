# UMP Design Guidelines

**Scope:** Unified Paytm Merchant Platform (UMP) — visual system, layout, components, tokens, and interaction rules. This file lives in **`design-guidelines/`** at the repo root so the **whole folder** can be copied into other products; see `README.md` in this folder.

**Source of truth (precedence):**

1. **Shipped UI** in `src/` and the live product (correctness).
2. **CSS theme** — `src/styles/theme.css`; semantic tokens — `src/imports/SemanticsColorTokens.tsx` (where referenced in granular rules).
3. **Granular rules** — `./rules/` (`.mdc` per topic). This document **summarizes** those files; when in conflict, resolve against implementation + the matching file under `rules/`.

**Related (paths from this folder):** Product framing — `../.ai/projects/merchant-dashboard.md`. Safe refactors — `../.ai/core/refactor-policy.md`.

---

## Table of contents

1. [Principles](#1-principles)
2. [Color tokens](#2-color-tokens)
3. [Typography](#3-typography)
4. [Layout & shell](#4-layout--shell)
5. [Spacing, radius, elevation](#5-spacing-radius-elevation)
6. [Icons](#6-icons)
7. [Interactions](#7-interactions)
8. [Components](#8-components)
9. [Tables & data](#9-tables--data)
10. [Navigation](#10-navigation)
11. [Cards & summaries](#11-cards--summaries)
12. [Overlays & chrome](#12-overlays--chrome)
13. [Page screen specifications](#13-page-screen-specifications)
14. [Content & formatting](#14-content--formatting)
15. [Anti-patterns](#15-anti-patterns)
16. [Rule index](#16-rule-index)

---

## 1. Principles

- **Semantic naming** in docs and reviews; pair hex with token meaning (e.g. Primary Strong `#004299`).
- **Consistency:** Prefer existing components (`Button`, `TextField`, shared patterns) over one-off markup.
- **Explicit pixels** for type in Tailwind (`text-[14px]`), not ambiguous named text scales for body UI.
- **Accessibility:** Keyboard operable controls; do not remove focus outlines without a visible `focus-visible` ring replacement.
- **Icons:** `currentColor` only inside SVGs (no hardcoded brand blues inside icon paths) — see [§6](#6-icons).

---

## 2. Color tokens

| Role | Hex | Notes |
|------|-----|--------|
| Primary strong (navy) | `#004299` | CTAs, key links, focus borders |
| Primary hover (navy) | `#012A72` | Primary / outline button hover |
| Accent / sky strong | `#00b8f5` | Brand accent; chart; some interactive links |
| Primary weak (sky tint) | `#e0f5fd` | Icon containers, subtle highlights |
| Primary medium (sky) | `#b1e6fb` | Sidebar L2 selected |
| Offset strong (pale blue) | `#e7f1f8` | Sidebar wash; **medium-emphasis outline button hover**; **button loading** surface |
| Secondary outline hover fill | `#f7f9fd` | Table row chrome, generic light hovers |
| Tertiary / low-emphasis hover fill | `#f5f9fe` | **Low-emphasis (tertiary) button hover**; search pills, light panels |
| Foreground | `#101010` | Body, headings |
| Muted foreground | `#7e7e7e` | Labels, descriptions |
| Border | `#e0e0e0` | Dividers, inputs, cards |
| Background | `#ffffff` | Page surfaces |
| Surface L3 | `#fafafa` | Zebra / subtle fills, notification read bg |
| Listing column header | `#EBEBEB` | Bar behind in-table column titles; labels use `#101010` |
| Offset weak | `#f5f9fe` | Search, row hover, light panels |
| Sidebar BG | `#e7f1f8` | L1/L2 nav |
| Disabled BG | `#ebebeb` | Disabled controls |
| Disabled text | `#acacac` | Disabled labels |
| Success strong | `#21c179` | Positive status, success chips |
| Success weak | `#e3f6ec` | Success chips / backgrounds |
| Warning strong | `#ff9d00` | Notice, warning labels |
| Warning weak | `#fff8e1` | Notice backgrounds, P1 action cards |
| Error strong | `#fd5154` | Errors, destructive |
| Error weak | `#ffebef` | Error backgrounds, P0 action cards |
| Callout / note bg | `#fff4e0` | Report callout box |

**Charts:** use `var(--chart-1)` … `var(--chart-5)` as in theme (see `colors.mdc`). Dashboard bar: `#1576DB`, line: `#21C179`.

**Rules:** Hyperlinks default `#004299`; destructive actions use error/destructive tokens. Opacity modifiers allowed (e.g. `bg-[#ffebef]/60`). Do not mix arbitrary hex without aligning to this table.

*Detail:* `./rules/color/colors.mdc`

---

## 3. Typography

| Use | Classes / tokens |
|-----|-------------------|
| Page title (h1) | `text-[32px] font-semibold text-[#101010]` |
| Section title (h2) | `text-[20px] font-medium text-[#101010]` |
| Card title (h3) | `text-[18px] font-semibold text-[#101010]` |
| Body / UI default | `text-[14px]` (weights per context) |
| Labels / meta | `text-[12px] text-[#7e7e7e]` |
| Filter / field label (above table) | `text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold` |
| Listing column header (in-table row) | `bg-[#EBEBEB]` + `text-[12px] text-[#101010] uppercase tracking-[0.6px] font-semibold` |
| Caption | `text-[10px]` uppercase where specified |
| Sidebar L1 label | `text-[10px]` |
| Metric card amount | `text-[32px] font-semibold` |
| Summary card amount | `text-[20px] font-semibold` |
| Limit card values | `text-[16px] font-semibold` |

**Font family:** Inter stack from `theme.css` (`'Inter_Subset', 'Inter', sans-serif`).

**Line height:** Prefer explicit `leading-[16px]`, `leading-[20px]`, `leading-[24px]` where legacy rules specify compact UI.

**Currency:** Indian Rupee `₹`, grouping per Indian locale in copy/formatters.

*Detail:* `./rules/typography/typography.mdc`

---

## 4. Layout & shell

- **16:9 product frame:** App shell (sidebar + header + main) is letterboxed in the largest 16:9 rectangle; classes `.app-product-letterbox` / `.app-product-frame`.
- **Main scroll:** `flex-1 min-h-0 overflow-y-auto` on `.shell-main-canvas`; max-width `1440px` centered; sidebar inner stack scrolls independently.
- **Page container (standard):** `flex flex-col gap-4 md:gap-6 bg-white min-h-full px-[32px] pt-[12px] pb-[32px]`. Exception: Settings uses `pt-[20px]`.
- **Page titles:** no horizontal rule or `border-b` under the `h1` unless a module is explicitly spec’d with one (`layout.mdc` — **Page titles**).
- **Edge-to-edge separator:** `w-[calc(100%+64px)] h-[1px] bg-[#e0e0e0] mx-[-32px]` (use where a full-bleed rule is intended; **Payments**, **Settlements**, and **Payment Pages** list filters use **`FilterBar`** (`FilterBar.tsx`): an inset `rounded-[12px] bg-[#fafafa] p-0` strip with **no** bleed lines above/below; filter columns use **flush** hover fill (`#EBEBEB`) to the strip edges with uniform **`px-5 py-5`** on every segment and **`gap-0`** between columns (no vertical divider) — see `layout.mdc` and `filter-dropdown.mdc`.
- **Dashboard surface:** `bg-[var(--surface-level-3,#fafafa)] p-8 rounded-tl-[32px] rounded-tr-[32px]`.
- **Responsive:** Mobile-first; common grids `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, stacks `flex-col sm:flex-row`.

All per-screen layout specifications (every L1 and L2 sidebar route) live in a **single comprehensive** layout rule file.

*Detail:* `./rules/layout/layout.mdc`

---

## 5. Spacing, radius, elevation

| Element | Value |
|---------|--------|
| Buttons | `rounded-[8px]` |
| Cards (default) | `rounded-[12px]` |
| Dashboard metric cards | `rounded-[20px]` |
| Dashboard chart surface (top) | `rounded-tl-[32px] rounded-tr-[32px]` |
| TextField | `rounded-[4px]` |
| Card / section padding | `p-5` (20px) or `p-6` (24px consent) |
| Chart container padding | `p-[24px]` |
| Table header / row | `px-6 py-3` / `px-6 py-4` |
| Drawer / modal body | `px-8` |
| Small shadow | `shadow-elevation-sm` (see theme) |
| Drawer edge shadow | `shadow-[-4px_0_24px_rgba(0,0,0,0.08)]` |
| Sticky footer shadow | `shadow-[0_-2px_12px_rgba(16,16,16,0.06)]` |

**Scrollbar (optional pattern):** thin thumb, rounded — see `layout.mdc` snippet.

*Detail:* `./rules/layout/layout.mdc`

---

## 6. Icons

- **Sizes:** Nav / L2 / actions `size-6` (24px); inline small `size-4`; inline medium `size-5`; product illustration `size-10`; promo tile `size-10`–`size-12`; inline tiny `size-3.5`.
- **Color:** Parent sets `text-[…]`; SVG uses `stroke="currentColor"` / `fill="currentColor"`; duo-tone product icons use `fill="white"` for bodies and `currentColor` for details → resolves to `#101010`.
- **Sources (priority):** 1) Figma export 2) `Icons.tsx` (90+ components) 3) Lucide React 4) `src/imports/` 5) inline SVG.
- Only **10 named exports** from `Icons.tsx` are actually imported in `src/` (see `icons.mdc` for the complete map).
- **Do not** embed `#004299` / `#00b8f5` inside SVG paths for generic icons (brand exceptions documented).
- **Dead imports** to clean up: `Dashboard.tsx`, `Dashboard1.tsx`, `Dashboard2.tsx` have unused Lucide imports.

*Detail:* `./rules/icons/icons.mdc`

---

## 7. Interactions

| Pattern | Guidance |
|---------|----------|
| Table / list rows | `hover:bg-[#f5f9fe] transition-colors` |
| Sidebar L1 pill | `hover:bg-[#e0e0e0]`; active `bg-[#b1e6fb]` |
| Sidebar L2 | hover per `sidebar.mdc`; active `bg-[#b1e6fb]` |
| Primary buttons (high) | `enabled:hover:bg-[#012A72]` |
| Secondary outline (medium) | `enabled:hover:bg-[#e7f1f8]`, `enabled:hover:border-[#012A72]`, `enabled:hover:text-[#012A72]` |
| Tertiary filled (low) | `enabled:hover:bg-[#f5f9fe]`, `enabled:hover:text-[#012A72]` |
| Button loading | Container `#e7f1f8`; five-dot loader; content row hidden |
| Action cards | `bg-[#ffebef]/60 → hover:bg-[#ffebef]` (P0); `bg-[#fff8e1]/60 → hover:bg-[#fff8e1]` (P1) |
| Feature/service cards | `hover:bg-[#f5f9fe]` |
| Links | Strong / subtle patterns in `hyperlinks.mdc` |
| Focus | `focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2` |
| Disabled | `bg-[#ebebeb] text-[#acacac]`, `cursor-not-allowed`, no hover |
| Overlays | Click-outside + `mousedown` on `document`; Escape for modals/drawers |

*Detail:* `./rules/interactions/interactions.mdc`

---

## 8. Components

### 8.1 Buttons (`Button_v2` + variant sheet)

Full matrix (emphasis × size × content × states) lives in **`./rules/components/buttons.mdc`**.

**Summary**

- **Radius:** `rounded-[8px]` everywhere.
- **Sizes:** Large 56px / `text-[16px]`; Medium 40px / `text-[14px]`; Small 32px / `text-[12px]`; icon-only squares.
- **Hovers:** Use **`enabled:hover:`** so disabled rows do not pick up hover colours.
- **Loading:** `#e7f1f8` surface, border cleared; five-dot loader centered; content `opacity-0`.
- **Focus:** `focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2`.
- **Exports:** `Button`, `PrimaryButton`, `SecondaryButton`, `TertiaryButton` from `Button.tsx`.

*File:* `src/app/components/Button.tsx` · *Rule:* `./rules/components/buttons.mdc`

### 8.2 TextField (`Text Field_v2`)

- Heights: default 56px, compact 44px; fixed height across states.
- Border `#e0e0e0` → `#004299` on hover/focus; error `#fd5154`; disabled `#ebebeb` / `#acacac`.
- Radius `rounded-[4px]`; horizontal padding 16px.

*File:* `src/app/components/TextField.tsx` · *Rule:* `./rules/components/text-field.mdc`

### 8.3 Header

- Shell padding `px-4 md:px-6 lg:px-8 py-3`.
- Search: pill `rounded-[100px]`, `bg-[#f5f9fe]` — **not** `TextField`.
- Profile: text initials "SP", not icon component; `size-9 md:size-10 border border-[#e0e0e0]`.

*Rule:* `./rules/components/header.mdc`

### 8.4 Hyperlinks

- Strong: `text-[#004299] font-semibold hover:underline`.
- Subtle: `text-[#004299] font-normal hover:underline`.
- Sizes: default `text-[12px]` in dense UI; `text-[14px]` when prominent.
- Accent variant: `text-[#00b8f5] font-semibold hover:underline` (consent card labels).

*Rule:* `./rules/components/hyperlinks.mdc`

### 8.5 Tabs, pagination, filters, popups, drawers

Follow dedicated `.mdc` files: `tabs.mdc`, `pagination.mdc`, `filter-dropdown.mdc`, `popup.mdc`, `right-drawer.mdc`, `search-widget.mdc`, `page-level-menu.mdc`, `step-wizard.mdc`, `activation-popup.mdc`, `payment-limit-drawer.mdc`, `charts.mdc`, `login-page.mdc`, `authorization-page.mdc`, `paytm-logo.mdc`, etc. under `./rules/components/`.

---

## 9. Tables & data

- Container: `overflow-x-auto border border-[#e0e0e0] rounded-[12px]`; inner `min-w-[700px]`–`min-w-[960px]` depending on page. **Inside a bordered card:** do not pad the whole card (`p-6`) around the grid — keep the list flush to the card stroke; optional h2 uses horizontal + top padding only (see `table.mdc`).
- **Grid-based** rows (not `<table>`) unless legacy exception documented.
- Column header row: `bg-[#EBEBEB]`, uppercase `text-[12px] font-semibold text-[#101010]`, `border-b border-[#e0e0e0]` to the first data row.
- Rows: zebra `bg-white` / `bg-[#fafafa]` by index, `text-[14px] text-[#101010]`, `hover:bg-[#f5f9fe]`; no `border-b` between data rows; vertical separators (`border-r`) only where the Settings-style variant applies.
- Status chips: Active/Success `text-[#21c179] bg-[#e3f6ec]`, Failed/Expired `text-[#fd5154] bg-[#ffebef]`, Draft/Pending `text-[#7e7e7e] bg-[#fafafa]`.
- Copy controls: `CopyIcon` `size-4` with parent `text-[#004299]`.

*Rule:* `./rules/components/table.mdc`

---

## 10. Navigation

### L1 sidebar

- Width `88px`, `bg-[#e7f1f8]`, icon pills `rounded-[32px]` (`h-8 w-[60px]`), active `bg-[#b1e6fb]`, labels `text-[10px]`.
- Menu items: Home, Payments, Settlements, Accept Payments, My Services, Reports, Settings (L1-only: Developer — placeholder route). **Refunds** is implemented (`/refunds`).

### L2 submenu

- Width `252px`, same BG, `border-l border-[#e0e0e0]`, `rounded-tr-[16px]`, `pt-[22px] px-[8px]`.
- Currently wired: Accept Payments → Payment Links | Payment Pages.
- Items: `rounded-[12px]`, active `bg-[#b1e6fb]`.

*Rule:* `./rules/components/sidebar.mdc`

---

## 11. Cards & summaries

- **Metric cards:** tinted backgrounds (payments `#F5FBFE`, settlement `#F0FDF4`, refunds `#FEF2F2`), `rounded-[20px]`, `p-5`.
- **Action priority cards:** P0 `#ffebef/60`, P1 `#fff8e1/60`, hover to solid weak fills.
- **Summary strip (Payments):** `flex gap-1`, cards `flex-1 rounded-[12px] p-5`, math operator symbols between cards.
- **Feature/service cards:** white, border, icon in `bg-[#e0f5fd]` tile, `hover:bg-[#f5f9fe]`, secondary CTA with arrow.
- **Device cards:** white, border, sub-items in `bg-[#fafafa]` rows, icon in `bg-[#e0f5fd]` tile.
- **Consent/agreement cards:** white, border, `p-6`, checkbox + T&C links, disabled CTA state.
- **Payment limit card:** `bg-[#fafafa]`, `rounded-[12px]`, metrics with vertical dividers, footer warning.
- **Chart containers:** `bg-white rounded-2xl p-[24px]` on `bg-[var(--surface-level-3,#fafafa)]` surface.
- **Notification cards:** read `#fafafa`, unread `#F5F9FE`, `rounded-[16px]`, blue dot indicator.
- **Callout/note box:** `bg-[#fff4e0] rounded-[8px] px-4 py-3` (Reports page).

*Rule:* `./rules/components/cards.mdc`

---

## 12. Overlays & chrome

- Popups / modals: see `popup.mdc` (padding, actions, titles).
- Drawers: `right-drawer.mdc` (width, shadow, scroll).
- Page-level sticky footer menus: `page-level-menu.mdc` (primary/secondary placement, Clear all, success variant).
- Activation popup: `activation-popup.mdc` (session-gated, single-show).
- Payment limit drawer: `payment-limit-drawer.mdc`.

---

## 13. Page screen specifications

All per-screen layout specifications now live in a **single comprehensive** layout rule file covering every L1 and L2 sidebar route:

| Route | Page | Status |
|-------|------|--------|
| `/home` | Dashboard (Business Overview + Charts + Actions Widget) | Implemented |
| `/payments` | Payments (filters, summary strip, table, drawer) | Implemented |
| `/settlements` | Settlements (date-grouped tables) | Implemented |
| `/reports` | Reports (split layout: menu + config + recent table) | Implemented |
| `/settings` | Settings (tabs, payment limit card, instruments table) | Implemented (Payment Settings tab only) |
| `/payment-pages` | Payment Pages (list + 3-step builder wizard) | Implemented |
| `/my-services` | My Services (device cards + service cards) | Implemented |
| `/connect-plus` | Connect Plus (consent → loader → success flow) | Implemented |
| `/refunds` | Refunds (FilterBar, summary card, empty state) | Implemented |
| `/payment-links` | Payment Links | Design in Progress |
| `/developer` | Developer | Design in Progress |
| `/login` | Login (outside shell, split layout) | Implemented |
| `/authorize` | Authorization popup demo (outside shell) | Implemented |

*Detail:* `./rules/layout/layout.mdc` (single file — all screens)

---

## 14. Content & formatting

- **Dates:** e.g. "Today, 24 Jan"; chart tooltips: full date "06 January 2026" (DD MMMM YYYY).
- **Times:** "7:30 AM, 23 Sep" — human-friendly patterns.
- **Numbers / money:** INR conventions (`₹`), Indian locale grouping.

---

## 15. Anti-patterns

- Raw hex without mapping to a token role above.
- Tailwind named font sizes for body (`text-lg`, etc.) where the system specifies px.
- Hardcoded navy/sky **inside** SVG icon paths.
- Removing keyboard focus styles with no replacement.
- One-off buttons that duplicate `Button` emphasis states incorrectly.
- Tables built as ad-hoc flex rows when the grid pattern + hover specs are required.
- CSS class ordering that causes unread notification cards to show as read (`bg-[#fafafa]` after `bg-[#F5F9FE]`).
- Using `font-semibold` in charges column (only hyperlinks may be bold there).
- Unused icon imports left in component files.

---

## 16. Rule index

All paths below are relative to **`./rules/`** (inside this `design-guidelines/` folder):

| Area | Files |
|------|--------|
| Color | `color/colors.mdc` |
| Typography | `typography/typography.mdc` |
| Layout & all screens | `layout/layout.mdc` |
| Interactions | `interactions/interactions.mdc` |
| Icons | `icons/icons.mdc` |
| Buttons, fields, links | `components/buttons.mdc`, `components/text-field.mdc`, `components/hyperlinks.mdc` |
| Nav & chrome | `components/sidebar.mdc`, `components/header.mdc`, `components/page-level-menu.mdc` |
| Data display | `components/table.mdc`, `components/pagination.mdc`, `components/filter-dropdown.mdc`, `components/charts.mdc` |
| Surfaces | `components/cards.mdc`, `components/popup.mdc`, `components/right-drawer.mdc`, `components/tabs.mdc` |
| Auth & brand | `components/login-page.mdc`, `components/authorization-page.mdc`, `components/paytm-logo.mdc` |
| Builder / menus | `components/step-wizard.mdc`, `components/report-menu.mdc`, `components/search-widget.mdc` |
| Overlays | `components/activation-popup.mdc`, `components/payment-limit-drawer.mdc` |

---

*Maintainers: when the product changes, update **`src/`** and the relevant **`./rules/**/*.mdc`** first, then align this summary so agents and humans share one story.*
