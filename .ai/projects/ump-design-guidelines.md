# UMP Design Guidelines

**Scope:** Unified Paytm Merchant Platform (UMP) — visual system, layout, components, tokens, and interaction rules for this repository.

**Source of truth (precedence):**

1. **Shipped UI** in `src/` and the live product (correctness).
2. **CSS theme** — `src/styles/theme.css`; semantic tokens — `src/imports/SemanticsColorTokens.tsx` (where referenced in legacy rules).
3. **Granular rules** — `.ai/core/legacy-cursor-rules/` (`.mdc` per topic). This document **summarizes** those files; when in conflict, resolve against implementation + legacy file for that component.

**Related:** Product framing and module patterns — `.ai/projects/merchant-dashboard.md`. Safe refactors — `.ai/core/refactor-policy.md`.

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
13. [Module layout specs](#13-module-layout-specs)
14. [Content & formatting](#14-content--formatting)
15. [Anti-patterns](#15-anti-patterns)
16. [Legacy rule index](#16-legacy-rule-index)

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
| Secondary outline hover fill | `#f7f9fd` | Medium-emphasis outline buttons |
| Tertiary hover fill | `#e7eaf4` | Low-emphasis filled buttons |
| Foreground | `#101010` | Body, headings |
| Muted foreground | `#7e7e7e` | Labels, descriptions |
| Border | `#e0e0e0` | Dividers, inputs, cards |
| Background | `#ffffff` | Page surfaces |
| Surface L3 | `#fafafa` | Table headers, subtle fills |
| Offset weak | `#f5f9fe` | Search, row hover, light panels |
| Sidebar BG | `#e7f1f8` | L1/L2 nav |
| Disabled BG | `#ebebeb` | Disabled controls |
| Disabled text | `#acacac` | Disabled labels |
| Success strong | `#21c179` | Positive status |
| Success weak | `#e3f6ec` | Success chips / backgrounds |
| Warning strong | `#ff9d00` | Notice |
| Warning weak | `#fff8e1` | Notice backgrounds |
| Error strong | `#fd5154` | Errors, destructive |
| Error weak | `#ffebef` | Error backgrounds |

**Charts:** use `var(--chart-1)` … `var(--chart-5)` as in theme (see `colors.mdc`).

**Rules:** Hyperlinks default `#004299`; destructive actions use error/destructive tokens. Opacity modifiers allowed (e.g. `bg-[#ffebef]/60`). Do not mix arbitrary hex without aligning to this table.

*Detail:* `.ai/core/legacy-cursor-rules/color/colors.mdc`

---

## 3. Typography

| Use | Classes / tokens |
|-----|-------------------|
| Page title (h1) | `text-[32px] font-semibold text-[#101010]` |
| Section title (h2) | `text-[20px] font-medium text-[#101010]` |
| Card title (h3) | `text-[18px] font-semibold text-[#101010]` |
| Body / UI default | `text-[14px]` (weights per context) |
| Labels / meta | `text-[12px] text-[#7e7e7e]` |
| Section header strip | `text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold` |
| Caption | `text-[10px]` uppercase where specified |

**Font family:** Inter stack from `theme.css` (`'Inter_Subset', 'Inter', sans-serif`).

**Line height:** Prefer explicit `leading-[16px]`, `leading-[20px]`, `leading-[24px]` where legacy rules specify compact UI.

**Currency:** Indian Rupee `₹`, grouping per Indian locale in copy/formatters.

*Detail:* `.ai/core/legacy-cursor-rules/typography/typography.mdc`

---

## 4. Layout & shell

- **16:9 product frame:** App shell (sidebar + header + main) is letterboxed in the largest 16:9 rectangle; classes `.app-product-letterbox` / `.app-product-frame` (see `layout.mdc`).
- **Main scroll:** `flex-1 min-h-0 overflow-y-auto` on main canvas; sidebar inner stack scrolls independently.
- **Page container (typical dashboard page):** `flex flex-col gap-4 md:gap-6 bg-white min-h-full px-[32px] pt-[12px] pb-[32px]`.
- **Edge-to-edge separator:** full-width line escaping horizontal padding, e.g. `w-[calc(100%+64px)] h-[1px] bg-[#e0e0e0] mx-[-32px]`.
- **Responsive:** Mobile-first; common grids `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, stacks `flex-col sm:flex-row`.

*Detail:* `.ai/core/legacy-cursor-rules/layout/layout.mdc`

---

## 5. Spacing, radius, elevation

| Element | Value |
|---------|--------|
| Buttons | `rounded-[8px]` |
| Cards (default) | `rounded-[12px]` |
| Dashboard metric cards | `rounded-[20px]` |
| TextField | `rounded-[4px]` |
| Card / section padding | often `p-5` |
| Table header / row | `px-6 py-3` / `px-6 py-4` |
| Drawer / modal body | `px-8` |
| Small shadow | `shadow-elevation-sm` (see theme) |
| Drawer edge shadow | `shadow-[-4px_0_24px_rgba(0,0,0,0.08)]` |

**Scrollbar (optional pattern):** thin thumb, rounded — see `layout.mdc` snippet.

*Detail:* `.ai/core/legacy-cursor-rules/layout/layout.mdc`

---

## 6. Icons

- **Sizes:** Nav / L2 / actions `size-6` (24px); inline small `size-4`; inline medium `size-5`; product illustration `size-10`.
- **Color:** Parent sets `text-[…]`; SVG uses `stroke="currentColor"` / `fill="currentColor"` where appropriate; duo-tone product icons use `fill="white"` for bodies and `currentColor` for details → resolves to `#101010`.
- **Do not** embed `#004299` / `#00b8f5` inside SVG paths for generic icons.

*Detail:* `.ai/core/legacy-cursor-rules/icons/icons.mdc`

---

## 7. Interactions

| Pattern | Guidance |
|---------|----------|
| Table / list rows | `hover:bg-[#f5f9fe] transition-colors` |
| Sidebar L1 pill | `hover:bg-[#e0e0e0]`; active `bg-[#b1e6fb]` |
| Sidebar L2 | hover per `sidebar.mdc`; active `bg-[#b1e6fb]` |
| Primary buttons | `hover:bg-[#012A72]` |
| Secondary outline | `hover:bg-[#f7f9fd]`, border/text hover `#012A72` |
| Tertiary filled | `hover:bg-[#e7eaf4]` |
| Links | Strong / subtle patterns in `hyperlinks.mdc` |
| Focus | `focus-visible:ring-2 focus-visible:ring-[#004299] focus-visible:ring-offset-2` where custom chips |
| Disabled | `bg-[#ebebeb] text-[#acacac]`, `cursor-not-allowed`, no hover “lift” |
| Overlays | Click-outside + `mousedown` on `document`; Escape for modals/drawers recommended |

*Detail:* `.ai/core/legacy-cursor-rules/interactions/interactions.mdc`

---

## 8. Components

### 8.1 Buttons (`Button_v2`)

- All: `rounded-[8px] font-semibold transition-colors`.
- **High:** `bg-[#004299] text-white`, hover `#012A72`.
- **Medium:** `border border-[#004299] text-[#004299]`, hover fill `#f7f9fd`, border/text hover `#012A72`.
- **Low:** `bg-[#e7f1f8] text-[#004299]`, hover `#e7eaf4` / text `#012A72`.
- **Sizes:** Large 56px height / `text-[16px]`; Medium 40px / `text-[14px]`; Small 32px / `text-[12px]` — see `buttons.mdc` table.
- **Special:** Save & Publish green `#21c179`; disabled pattern shared.

*File:* `src/app/components/Button.tsx` · *Rule:* `legacy-cursor-rules/components/buttons.mdc`

### 8.2 TextField (`Text Field_v2`)

- **Single** shared text input component for forms (not search pills).
- Heights: default 56px, compact 44px; **fixed height across states**.
- Border `#e0e0e0` → `#004299` on hover/focus; error `#fd5154`; disabled `#ebebeb` / `#acacac`.
- Radius `rounded-[4px]`; horizontal padding 16px.

*File:* `src/app/components/TextField.tsx` · *Rule:* `legacy-cursor-rules/components/text-field.mdc`

### 8.3 Header

- Shell padding `px-4 md:px-6 lg:px-8 py-3`.
- Search: pill `rounded-[100px]`, `bg-[#f5f9fe]` — **not** `TextField`.

*Rule:* `legacy-cursor-rules/components/header.mdc`

### 8.4 Hyperlinks

- Strong: `text-[#004299] font-semibold hover:underline`.
- Subtle: `text-[#004299] font-normal hover:underline`.
- Sizes: default `text-[12px]` in dense UI; `text-[14px]` when prominent.

*Rule:* `legacy-cursor-rules/components/hyperlinks.mdc`

### 8.5 Tabs, pagination, filters, popups, drawers

Follow dedicated `.mdc` files: `tabs.mdc`, `pagination.mdc`, `filter-dropdown.mdc`, `popup.mdc`, `right-drawer.mdc`, `search-widget.mdc`, `page-level-menu.mdc`, `step-wizard.mdc`, `activation-popup.mdc`, `payment-limit-drawer.mdc`, `charts.mdc`, `login-page.mdc`, `authorization-page.mdc`, `paytm-logo.mdc`, etc. under `legacy-cursor-rules/components/`.

---

## 9. Tables & data

- Container: `overflow-x-auto border border-[#e0e0e0] rounded-[12px]`; inner `min-w-[700px]` or `min-w-[800px]` as needed.
- **Grid-based** rows (not `<table>`) unless legacy exception documented.
- Header: uppercase `text-[12px] font-semibold text-[#7e7e7e]`, bottom border.
- Rows: `text-[14px] text-[#101010]`, `hover:bg-[#f5f9fe]`, optional vertical separators per variant in rule file.

*Rule:* `legacy-cursor-rules/components/table.mdc`

---

## 10. Navigation

### L1 sidebar

- Width `88px`, `bg-[#e7f1f8]`, icon pills `rounded-[32px]`, active `bg-[#b1e6fb]`, labels `text-[10px]`.

### L2 submenu

- Width `236px`, same BG, `border-l`, shadow, items `rounded-[12px]`, active `bg-[#b1e6fb]`.

*Rule:* `legacy-cursor-rules/components/sidebar.mdc`

---

## 11. Cards & summaries

- **Metric cards:** tinted backgrounds (e.g. payments `#F5FBFE`), `rounded-[20px]`, `p-5`.
- **Action priority cards:** P0 `#ffebef/60`, P1 `#fff8e1/60`, hover solid weak fills.
- **Summary strip (e.g. Payments):** `flex gap-1`, cards `flex-1 rounded-[12px] p-5`, label `text-[14px] text-[#7e7e7e]`, amount `text-[20px] font-semibold`.
- **Feature cards:** white, border, icon in `bg-[#e0f5fd]` tile, secondary CTA with arrow.

*Rule:* `legacy-cursor-rules/components/cards.mdc`

---

## 12. Overlays & chrome

- Popups / modals: see `popup.mdc` (padding, actions, titles).
- Drawers: `right-drawer.mdc` (width, shadow, scroll).
- Page-level sticky footer menus: `page-level-menu.mdc` (primary/secondary placement, Clear all).

---

## 13. Module layout specs

Full-page flows live under `legacy-cursor-rules/layout/`:

| Document | Module |
|----------|--------|
| `layout/connect-plus.mdc` | Connect Plus activation |
| `layout/payment-pages.mdc` | Payment Pages / SwiftPay builder wizard |
| `layout/payment-settings.mdc` | Settings → Payment settings |

Use **layout** rules for shells and step flows; **components** rules for reusable controls inside them.

---

## 14. Content & formatting

- **Dates:** e.g. “Today, 24 Jan”; **times:** “7:30 AM, 23 Sep” — human-friendly patterns in `layout.mdc`.
- **Numbers / money:** INR conventions in UI copy and tables where specified.

---

## 15. Anti-patterns

- Raw hex without mapping to a token role above.
- Tailwind named font sizes for body (`text-lg`, etc.) where the system specifies px.
- Hardcoded navy/sky **inside** SVG icon paths.
- Removing keyboard focus styles with no replacement.
- One-off buttons that duplicate `Button` emphasis states incorrectly.
- Tables built as ad-hoc flex rows when the grid pattern + hover specs are required.

---

## 16. Legacy rule index

All paths relative to `.ai/core/legacy-cursor-rules/`:

| Area | Files |
|------|--------|
| Color | `color/colors.mdc` |
| Typography | `typography/typography.mdc` |
| Layout & spacing | `layout/layout.mdc`, `layout/payment-pages.mdc`, `layout/payment-settings.mdc`, `layout/connect-plus.mdc` |
| Interactions | `interactions/interactions.mdc` |
| Icons | `icons/icons.mdc` |
| Buttons, fields, links | `components/buttons.mdc`, `components/text-field.mdc`, `components/hyperlinks.mdc` |
| Nav & chrome | `components/sidebar.mdc`, `components/header.mdc`, `components/page-level-menu.mdc` |
| Data display | `components/table.mdc`, `components/pagination.mdc`, `components/filter-dropdown.mdc`, `components/charts.mdc` |
| Surfaces | `components/cards.mdc`, `components/popup.mdc`, `components/right-drawer.mdc`, `components/tabs.mdc` |
| Auth & brand | `components/login-page.mdc`, `components/authorization-page.mdc`, `components/paytm-logo.mdc` |
| Builder / menus | `components/step-wizard.mdc`, `components/report-menu.mdc`, … |

---

*Maintainers: when the product changes, update **`src/`** and the relevant **`legacy-cursor-rules/**/*.mdc`** first, then align this summary so agents and humans share one story.*
