# Prompt template: Safe UI restructure (no design change)

Copy everything below the line into chat, fill the bracketed fields, and send.

---

## Context

- **Repo / product:** [PRODUCT_OR_REPO_NAME]  
- **Relevant project doc (if any):** [.ai/projects/FILE.md or “none”]  
- **Scope (files or area):** [PATHS_OR_COMPONENT_NAMES]  
- **Goal:** Refactor for **maintainability only**.

## Non-negotiables

1. Follow **`.ai/core/refactor-policy.md`** — it is the **canonical** list of frozen UI/behaviour/API boundaries and allowed safe lanes. Do not violate it.  
2. Follow **`.ai/core/rules.md`** for orchestration and extraction habits.  
3. **Business logic** and **API contracts** — default **unchanged** unless listed under optional scope below.

## What I want you to do

1. **Scan** scoped code. List **safe** extractions first (constants, pure helpers, repeated JSX with identical output, thin state hooks).  
2. List **risky / design-sensitive** zones (Tailwind clusters, grids, conditional layout, motion, z-index, scroll, focus, copy that affects layout). Do **not** refactor those in the same pass unless unavoidable—call them out.  
3. Propose a **minimal** file split (fewest new files, clear names); **one** focused step per change set.  
4. Implement **only** safe items, in **small, reviewable diffs**; after each step, UI and behaviour must match before.  
5. If ambiguous, **ask** before changing behaviour or visuals.

## Out of scope (unless I add below)

Visual redesign, tokens/theme, copy, UX flow, new dependencies, API/schema changes.

**Optional extra scope:** [NONE_OR_DESCRIPTION]

## Deliverables

- Plan: safe → risky → proposed file tree → patches (or patch descriptions) → short verification (what stayed identical).

---

*End of template*
