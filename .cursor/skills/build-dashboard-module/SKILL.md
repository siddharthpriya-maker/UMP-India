---
name: build-dashboard-module
description: Merchant dashboard sidebar modules — structure, safe extraction, verification; use for any sidebar route (tables, actions, drawers) or refactors that must not change UI/behaviour.
---

# Build dashboard module

## When to use

- Work on **any** merchant dashboard **sidebar module**: overview, data-heavy views, ops screens, action flows (forms, drawers, confirmations), detail views, list/table surfaces.
- Refactors that **must not** change look or behaviour (pair with `@.ai/core/refactor-policy.md`).

## Context (reference, do not duplicate)

- Product: `@.ai/projects/merchant-dashboard.md`
- Visual system: `@design-guidelines/OVERVIEW.md`, `design-guidelines/rules/`
- Frozen vs allowed: `@.ai/core/refactor-policy.md` (canonical)
- Habits: `@.ai/core/rules.md`
- Prompts: `@.ai/prompts/safe-restructure.md`, `@.ai/prompts/concept-guidelines.md`

## Goals

- **Maintainability** — thin route shell, clear section ownership; logic shaped away from markup where it helps.
- **No drift** — protected dimensions live only in **refactor-policy**; do not fork that checklist here.

## Typical module structure (adapt)

Mirror sibling modules; not every block applies everywhere.

1. Route / page — load, optional URL/query sync, composition only.
2. Header / summary — titles, KPIs, alerts; stable proportions.
3. Filters / toolbar — align with sibling modules.
4. Primary surface — table, cards, timeline, forms; stable density and classes.
5. Actions — hierarchy: primary, row, bulk, overflow.
6. Footer / pagination.
7. Overlays — drawers, modals; preserve contracts.

Prefer **presentational leaves**; **wiring** in the page or thin hooks.

## After refactors (verify)

Against **refactor-policy** + product doc: layout, spacing, typography, colours, responsive behaviour, interactions, business logic, API contracts — plus module surfaces you touched.

## Safe extraction order

One step at a time; verify after each (lanes in **refactor-policy**):

1. Constants — options, column defs, format strings, fragile `min-w` / grid strings.
2. Pure utils — formatters, DTO → view model (same visible strings).
3. Presentational subcomponents — identical classes/markup.
4. Hooks — filters, pagination, action state (same transitions / side effects).
5. File splits — only after 1–4; never mix with API or copy changes in one step.

If class clusters are fragile, **mirror exactly** or leave wrappers unchanged.

## Avoid

Markup/class tweaks that change visuals; **global** tokens out of scope; **new deps** without agreement; **silent** API renames; redesign-by-default.

Skill format & discovery: [cursor.com/docs/skills](https://cursor.com/docs/skills).
