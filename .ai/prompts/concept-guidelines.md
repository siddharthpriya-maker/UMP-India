# Concept guidelines — merchant dashboard (AI instructions)

Use with **`.ai/projects/merchant-dashboard.md`**. These guidelines **do not** relax **`.ai/core/refactor-policy.md`**.

## Product model

- **Merchant dashboard product** — operators work across **sidebar modules** (payments, settlements, refunds, disputes, transactions, reports, etc.) as **peers**.
- Modules may emphasize **monitoring**, **management**, **actions**, or mixes — **do not** assume “dashboard = analytics” or “module = report”.

## Defaults for AI assistance

- **Preserve** current design and behaviour unless the user explicitly scopes change.
- **Do not** encourage redesign, rebranding, or **trendy** UI patterns by default.
- Prefer **clarity, consistency, scanability**, and **workflow efficiency** over novelty.
- Respect **information density** suited to **business** operations.

## Relationship to implementation

- **Source of truth** for visuals: shipped UI and project doc — not aspirational Dribbble-style layouts.
- **Legacy token/component specs:** `.ai/core/legacy-cursor-rules/` — use when doing **explicit** design work only.

## When in doubt

- Split “safe refactor” from “design change”; use **`.ai/prompts/safe-restructure.md`** for the former.
