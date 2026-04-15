# Skill: Report & dashboard list pages

**When:** Merchant-style **report** or **dashboard list** screens: filters, optional summary, primary grid/table, actions, pagination or infinite scroll — or splitting an oversized page **without** changing look or behaviour.

**Product facts:** `.ai/projects/<project>.md` (e.g. `ump-india.md`).  
**Frozen vs allowed refactors:** **`.ai/core/refactor-policy.md`** (canonical).

---

## Goals

- **Maintainability** — thin page shell, clear section ownership, testable data shaping away from markup.
- **No drift** — all protected dimensions and safe lanes are defined in **`refactor-policy.md`**; do not duplicate that checklist here.

---

## Preferred structure (orchestration)

1. Page / route container — load data, optional URL/query sync, compose only.
2. Filter / toolbar — duration, status, search, export; **match** other dashboard pages in the same product.
3. Optional summary — KPIs / charts; keep **proportions** stable.
4. Primary grid — table or cards; stable column/grid **classes** and density.
5. Footer — pagination, totals, bulk actions.
6. Overlays — drawers/modals; same interaction contract.

Prefer **presentational leaves**; **wiring** in the page or thin hooks.

---

## Verification focus (list/report pages)

After a refactor, explicitly confirm (against **refactor-policy** + project doc): filter strip, primary grid, pagination/footer, overlays, and **responsive** table/scroll behaviour.

---

## Safe extraction order (typical for this pattern)

Aligns with **allowed lanes** in `refactor-policy.md`; apply **one step** at a time, verify UI/behaviour after each:

1. Constants — column defs, options, `min-w` grid strings, format strings.  
2. Pure utils — formatters, DTO → row (same strings/values on screen and wire).  
3. Presentational subcomponents — header row, empty state, pagination (props-only, **identical** classes/markup).  
4. Hooks — filters, pagination state (same transitions and side effects).  
5. File splits — only after 1–4; never mix with API or copy changes in one step.

If Tailwind/class clusters are fragile, **mirror classes exactly** or keep wrappers unchanged.

---

## What to avoid

- “Cleaner” markup that changes visuals; **global** style/token edits unless in scope; **new deps** without agreement; **cross-domain** hooks; **silent** API/field renames.

---

## Cross-links

- `.ai/core/rules.md` — habits & orchestration.  
- `.ai/prompts/safe-restructure.md` — pasteable agent prompt for the same constraints.
