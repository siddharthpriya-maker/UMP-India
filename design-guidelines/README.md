# Design guidelines (portable package)

This folder is the **single place** for Paytm merchant-style UI rules used by UMP and shareable with **other products** (other repos, Figma handoffs, or agency work).

## What is inside

| Path | Purpose |
|------|---------|
| **`OVERVIEW.md`** | Executive summary — principles, tokens, typography, layout, components index, anti-patterns. Start here for humans and for AI context. |
| **`INDEX.md`** | Machine-friendly list of every granular rule file under `rules/`. |
| **`rules/`** | Topic `.mdc` files (color, typography, layout, components, interactions, icons). Cursor can attach them via `globs`; designers can open them as Markdown. |

## Using this folder in **another** repository

1. **Copy** the entire `design-guidelines/` directory into the other project (repo root is recommended so paths like `src/app/...` in frontmatter still make sense if you share components).
2. Open **`OVERVIEW.md`** in that repo and adjust the **Related** links at the top if your engineering docs live somewhere other than `../.ai/...` (or add a short `PRODUCT.md` next to this folder and link to it).
3. **Optional — Cursor:** add a rule file in the new repo, for example:

   ```text
   .cursor/rules/design-guidelines.mdc
   ```

   with `alwaysApply: false` and a short pointer to `design-guidelines/OVERVIEW.md`, or use `@`-mentions to `design-guidelines/rules/**/*.mdc` when editing UI.

4. **Shipped code** remains the final authority: when tokens in docs disagree with `Button.tsx`, theme CSS, or production, update **`rules/`** and **`OVERVIEW.md`** together.

## For designers

- Read **`OVERVIEW.md`** first for the full system at a glance.
- Deep dives: open files under **`rules/components/`** (buttons, tables, sidebar, etc.) while reviewing or speccing screens.
- File format is **Markdown with optional YAML frontmatter** (`.mdc`); any text editor and Figma comments can reference paths like `design-guidelines/rules/components/buttons.mdc`.

## For engineers (this monorepo)

- Canonical copy lives **here** at `design-guidelines/` (not under `.ai/core/`).
- `.ai/projects/ump-design-guidelines.md` is a **stub** that points back to this folder so older links keep working.

## Versioning

When you fork this pack for another product, consider tagging or noting the snapshot date in `OVERVIEW.md` so teams know which release of the system they carry.
