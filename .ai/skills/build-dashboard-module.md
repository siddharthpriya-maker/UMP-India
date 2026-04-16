# Skill: Build a dashboard module (sidebar module)

**When:** Work on **any merchant dashboard sidebar module** — overview, data-heavy views, operational screens, **action** flows (forms, drawers, confirmations), detail views, or list/table surfaces — including refactors that **must not** change look or behaviour.

**Product context:** `.ai/projects/merchant-dashboard.md`.  
**Visual system (tokens, components):** `design-guidelines/OVERVIEW.md` and `design-guidelines/rules/`.  
**Frozen vs allowed refactors:** **`.ai/core/refactor-policy.md`** (canonical).

---

## Goals

- **Maintainability** — thin route shell, clear section ownership, testable shaping away from markup.
- **No drift** — protected dimensions live only in **`refactor-policy.md`**; do not duplicate that checklist here.

---

## Typical module structure (adapt to the module)

Not every module uses every block; **mirror what sibling modules already do**.

1. **Route / page container** — data load, optional URL/query sync, composition only.
2. **Header / summary** (if present) — titles, KPIs, alerts; keep **proportions** stable.
3. **Filters / toolbar** (if present) — search, status, date, export; **align** with other modules in the same product.
4. **Primary surface** — table, cards, timeline, form steps, etc.; stable **classes** and density.
5. **Actions** — primary, row-level, bulk, overflow menus — preserve hierarchy and behaviour.
6. **Footer / pagination** (if present).
7. **Overlays** — drawers, modals; preserve interaction contracts.

Prefer **presentational leaves**; **wiring** in the page or thin hooks.

---

## Verification focus (after refactors)

Against **refactor-policy** + project doc, confirm unchanged: layout, spacing, typography, colours, responsive behaviour, interactions, business logic, API contracts — plus module-specific surfaces you touched (e.g. filters, primary surface, actions, overlays, scroll).

---

## Safe extraction order

Aligns with **allowed lanes** in `refactor-policy.md`; one step at a time; verify after each:

1. Constants — options, column defs, format strings, fragile `min-w` / grid strings.  
2. Pure utils — formatters, DTO → view model (same on-screen strings and payloads).  
3. Presentational subcomponents — identical classes/markup.  
4. Hooks — filters, pagination, **action** state (same transitions and side effects).  
5. File splits — only after 1–4; never mix with API or copy changes in one step.

If Tailwind/class clusters are fragile, **mirror classes exactly** or keep wrappers unchanged.

---

## What to avoid

- Markup or class changes that alter visuals; **global** tokens unless in scope; **new deps** without agreement; **silent** API/field renames; **trendy** UI or redesign-by-default.

---

## Cross-links

- `.ai/core/rules.md`  
- `.ai/prompts/safe-restructure.md`  
- `.ai/prompts/concept-guidelines.md`
