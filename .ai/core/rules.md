# Core rules (multi-project)

For **what must never change** on a refactor (layout, spacing, type, colour, responsive, interactions, logic, API): use **`.ai/core/refactor-policy.md`** — that file is the **canonical checklist**.

Put **product- or stack-only** facts in `.ai/projects/<project>.md`, not here.

## Engineering habits

- **Incremental work** — small steps; app stays buildable; user-visible behaviour unchanged unless scoped (see refactor policy).
- **No drive-by edits** outside the files or concern you were given.
- **Tests** — add or extend when the repo uses them; do not delete tests to hide regressions.

## Page and route files: orchestration-focused

- **Pages / route containers** compose children, pass data, handle navigation — keep them thin.
- **Heavy logic** → hooks, utils, or domain modules as fits the stack.
- **Avoid** monolithic pages that mix orchestration, domain rules, and large markup in one file when splitting clarifies ownership **without** changing output.

## Extraction (philosophy)

- Extract **constants**, **pure helpers**, and **repeated presentational** pieces when duplication is real and names help — **only** when the refactor policy’s allowed lanes apply (identical UI and behaviour).
- Do **not** force abstractions for a single use; do **not** change effective literals, props contracts, or markup that defines layout/classes unless scoped as design work.

## What does not belong in this file

- **Business/domain rules** — live in product docs or `.ai/projects/`.
- **Long framework tutorials** — link to official docs.

## Instruction layout (convention)

| Folder | Role |
|--------|------|
| `.ai/core/` | Cross-repo rules + **refactor-policy** (enforcement) |
| `.ai/projects/` | One file per product (stack, paths, “what this UI is”) |
| `.ai/skills/` | Repeatable workflows (e.g. list/report pages) |
| `.ai/prompts/` | Pasteable agent prompts |

---

*Copy this file across repositories; only `.ai/projects/` and `.ai/skills/` are product-specific.*
