# Refactor policy

**Canonical enforcement** for “safe refactor vs frozen UI/behaviour.” Other docs **point here** instead of repeating the full list.

**Also read:** `.ai/core/rules.md`, `.ai/skills/build-dashboard-module.md`, `.ai/projects/merchant-dashboard.md`, `.ai/prompts/concept-guidelines.md`.

---

## Frozen dimensions (quick reference)

Unless stakeholders **explicitly** scope that class of change, do **not** change:

- **Layout**
- **Spacing**
- **Typography**
- **Colours**
- **Responsive behaviour**
- **Interactions**
- **Business logic**
- **API contracts**

Detailed definitions and **allowed safe lanes** are below.

---

## Protected: do not change without explicit, in-scope approval

Treat the following as **frozen** unless stakeholders explicitly request that class of change and it is clearly in task scope.

### Visual and layout

- **Layout** — structure, alignment, grid/flex behaviour, stacking order, visibility of regions, and what appears where on the screen.
- **Spacing** — margins, padding, gaps, line breaks, min/max dimensions, and any value that affects whitespace or density.
- **Typography** — font family, sizes, weights, line heights, letter spacing, truncation, and text hierarchy.
- **Colours** — fills, strokes, borders, shadows, gradients, opacity, and semantic colours (success, error, etc.).

### Behaviour and system boundaries

- **Responsive behaviour** — breakpoints, reflow, hiding/showing elements, scroll behaviour, and anything that changes by viewport size.
- **Interactions** — hover, focus, active, disabled states; transitions; keyboard behaviour; click/touch targets; drag/drop; pan/zoom where present.
- **Business logic** — rules that encode product decisions, calculations, eligibility, validation beyond presentation, or domain workflows.
- **API contracts** — request/response shapes, field names, HTTP methods, status handling, error mapping, and versioning assumptions consumed by the client.

If a change would alter any of the above, **stop** and confirm scope or split the work.

---

## Allowed refactors (safe lanes)

**Only** when rendered UI, copy, responsiveness, interactions, business outcomes, and API usage stay **exactly** the same:

- **Extract constants** — same effective values to UI and APIs.
- **Extract helpers** — same inputs/outputs at call sites.
- **Extract repeated JSX** — identical output and props behaviour.
- **Split large files** — more modules, **zero** visual or behavioural drift.
- **Move data transformation into utils** — same displayed strings and wire payloads.

Prefer **small, incremental** steps; app stays buildable and user-equivalent after each.

---

## Escalation

If a change **might** touch a protected area, do **not** bundle it with “safe” extractions—ask or split the task.

---

*Product framing, module list, and high-sensitivity surfaces: `.ai/projects/merchant-dashboard.md`. This checklist is unchanged.*
