# Merchant dashboard — project context (UMP India)

**Product:** A **merchant dashboard**: **sidebar modules** are peers — e.g. payments, settlements, refunds, disputes, transaction management, **reports**, and other operational areas. **Do not** treat Reports as a special product pillar; it is **one module** among others.

**What modules may include:** viewing, monitoring, managing, **and** taking actions — depending on domain. **Do not** assume every module is a report or a list page.

## Principles (instruction-level)

- **Clarity, consistency, scanability** — support busy operators.
- **Actionability & workflow efficiency** — favor clear **decision → action** paths where the product already does; do not invent flows.
- **Information density** — appropriate for **business** use; avoid empty “consumer app” layouts unless scoped.
- **No redesign by default** — preserve current design and behaviour unless explicitly requested.
- **No trendy UI** — do not suggest fashionable patterns that would change the existing system.

## Visual source of truth

- **Current implementation** and **live product** define correctness. Figma / sketches are **reference only** unless adopted as an explicit change request.

## Sensitivity (in addition to refactor policy)

Follow **`.ai/core/refactor-policy.md`** for all frozen dimensions. Be especially strict on: **in-module hierarchy** (toolbar / filters vs primary surface vs actions), **card / summary strips**, **filter row vs tables**, **chart size inside cards**, **table column density and scroll**, and **small-viewport stacking** — regressions are high-impact across modules.

## Code organisation (preferred)

- **Pages** = orchestration (data, composition, navigation, hand-offs to actions).
- **Sections** = tables, filter bars, charts, drawers — focused files, not monolithic pages.

## Stack (reference)

- Vite + React + TypeScript + Tailwind — `src/app/App.tsx`, `src/app/components/`.

---

*Module patterns: `.cursor/skills/build-dashboard-module/SKILL.md` (Agent Skill). Safe refactor prompt: `.ai/prompts/safe-restructure.md`. Concept framing: `.ai/prompts/concept-guidelines.md`. **Visual system (tokens, components, layouts):** `design-guidelines/OVERVIEW.md` (stub: `.ai/projects/ump-design-guidelines.md`).*
