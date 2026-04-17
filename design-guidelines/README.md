# Design guidelines — portable package

Single folder you can **zip, copy, or fork** into any new product or repo so layouts, tokens, and component behaviour stay consistent with the UMP merchant-dashboard visual system.

---

## What you are sharing

| Deliverable | In this folder? | Role |
|-------------|-----------------|------|
| **Visual system** (principles, tokens, typography, layout, component specs) | Yes — `OVERVIEW.md` + `rules/**/*.mdc` | Source of truth for *how* UI should look and behave |
| **Machine index** of every rule file | Yes — `INDEX.md` | Quick lookup / AI context lists |
| **React / production components** | No — they live in the UMP app repo under `src/app/components/` (and similar) | Reference implementation only; rebuild or copy code separately if you need the same widgets |

**Minimum share for “same rules, new project”:** the entire `design-guidelines/` directory (this README, `OVERVIEW.md`, `INDEX.md`, and `rules/`).

---

## File map (read in this order)

| Order | Path | Use |
|------:|------|-----|
| 1 | **`README.md`** (this file) | Onboarding, tooling, compliance workflow |
| 2 | **`OVERVIEW.md`** | Full system summary — principles, tokens, typography, layout, component index, anti-patterns |
| 3 | **`INDEX.md`** | Flat links to every granular `.mdc` under `rules/` |
| 4 | **`rules/`** | Deep specs: `color/`, `typography/`, `layout/`, `components/`, `icons/`, `interactions/` |

For a **new screen**, open `OVERVIEW.md` once, then the relevant files under `rules/components/` and `rules/layout/layout.mdc`.

---

## Start a new project (checklist)

Use this as a handoff list for designers, PMs, or engineers.

### 1. Copy the pack

- Copy the whole **`design-guidelines/`** folder into the new repository root (recommended so paths and mental model stay `design-guidelines/...`).
- Optionally add a one-line note in the new repo’s main `README` linking to `design-guidelines/README.md`.

### 2. Anchor the product

- If the new product has its own name or constraints, add a short **`PRODUCT.md`** (or equivalent) next to `design-guidelines/` and link it from the **Related** section at the top of **`OVERVIEW.md`** (adjust links that still point at UMP-only paths like `../.ai/`).

### 3. Make new work follow the same rules

- **Design / specs:** All new layouts and components must be traceable to **`OVERVIEW.md`** + the matching files under **`rules/`** (do not invent one-off tokens when a rule already exists).
- **Engineering:** Implement against the same hex, spacing, radii, and interaction notes as in `rules/color/colors.mdc`, `rules/typography/typography.mdc`, and the relevant `rules/components/*.mdc` files.
- **When code and docs disagree:** treat shipped UI as the bug to fix *or* consciously update **`rules/`** and **`OVERVIEW.md`** together so the pack stays the single source of truth.

### 4. Cursor / AI

- **This repo:** `.cursor/rules/entry.mdc` (always apply) and `.cursor/rules/design-guidelines.mdc` (scoped to `src/app/**/*.tsx` and `design-guidelines/**/*`). See [Cursor Rules](https://cursor.com/docs/rules) for frontmatter, globs, and rule types.
- **Another repo:** copy `design-guidelines/`, add a scoped rule with `globs: design-guidelines/**/*` (and your app paths if needed); point body at `@design-guidelines/OVERVIEW.md` — do not duplicate the spec pack into the rule file.
- In chat, **@-mention** `design-guidelines/OVERVIEW.md` or the specific `rules/...` files for the surface you are changing.

### 5. Reuse components (optional)

This folder does **not** contain source code. To reuse the **same** React patterns as UMP:

- Copy or adapt components from the UMP repository’s `src/app/components/` (and shared styles/tokens) **in addition** to this pack, **or**
- Rebuild primitives from scratch using only `rules/` — still compliant if visuals and behaviour match the specs.

If the new repo also uses Cursor with UMP’s engineering guardrails, copy **`.ai/`** (especially `refactor-policy.md`, `rules.md`, and relevant `projects/*.md`) and **`.cursor/skills/`** (Agent Skills per [Cursor Skills](https://cursor.com/docs/skills)) from the UMP monorepo so “safe refactors” and module patterns stay aligned.

---

## Roles

### Designers / PMs

1. Read **`OVERVIEW.md`** end to end once per product release train.
2. For each surface, pair **`rules/layout/layout.mdc`** with the right **`rules/components/*.mdc`** files.
3. Reference paths in Figma or tickets (e.g. `design-guidelines/rules/components/cards.mdc`).

### Engineers

1. Same reading order as above before building new modules.
2. Keep **token and component docs** in sync when you change production styles.
3. Prefer existing primitives in your app that already map to these rules rather than one-off duplicates.

### Anyone onboarding in one day

**`README.md` (this file) → `OVERVIEW.md` → `INDEX.md` → open only the `rules/` files you touch that week.**

---

## UMP monorepo (source of this pack)

If you are **inside** the UMP India repository:

- Canonical documentation lives at **`design-guidelines/`** (not under `.ai/core/`).
- **`.ai/projects/ump-design-guidelines.md`** is a stub that points here for backwards compatibility.
- **`.cursor/rules/entry.mdc`** routes agents to `.ai/` + this pack; optional router: **`.cursor/rules/design-guidelines.mdc`**. **`.cursor/skills/`** holds Agent Skills (e.g. dashboard modules).

---

## Versioning

When you fork this pack for another product, record a **snapshot date or tag** in `OVERVIEW.md` (or `PRODUCT.md`) so teams know which revision of the system they ship against.
