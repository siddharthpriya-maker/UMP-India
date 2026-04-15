# UMP India — project context

**Product:** Merchant **dashboard** and **reports** (payments, settlements, and related operational views).

## Visual source of truth

- **Current implementation** and **live product** define correctness. Figma / sketches are **reference only** unless adopted as an explicit change request.

## Sensitivity (in addition to refactor policy)

Obey **`.ai/core/refactor-policy.md`** for all frozen dimensions. For **UMP India**, be especially strict on: **dashboard and reports section hierarchy**, **card / summary strips**, **filter row layout vs tables**, **chart size inside cards**, **table column density and scroll**, and **small-viewport stacking** — regressions there are high-impact.

## Code organisation (preferred)

- **Pages** = orchestration (data, composition, navigation).
- **Sections** = tables, filter bars, charts, drawers — focused files, not monolithic pages.

## Stack (reference)

- Vite + React + TypeScript + Tailwind — `src/app/App.tsx`, `src/app/components/`.

---

*Workflow detail: `.ai/skills/build-report-page.md`. Chat template: `.ai/prompts/safe-restructure.md`.*
