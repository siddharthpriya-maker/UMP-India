# UMP India — merchant dashboard (UI)

Vite + React + TypeScript + Tailwind. Product shell, sidebar modules, and shared patterns for the UMP merchant dashboard.

## Clone and run

```bash
git clone <your-repo-url>
cd "UMP - India"
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Where things live

| Area | Path |
|------|------|
| App routes and shell | `src/app/App.tsx`, `src/app/components/` |
| Figma-derived SVG widgets (icons) | `src/imports/` — only files still imported by the app are needed; prefer `@/app/components` for new UI |
| Visual system (tokens, layout, components) | `design-guidelines/` — start with `OVERVIEW.md` and `INDEX.md` |
| Refactor / behaviour guardrails | `.ai/core/refactor-policy.md` |
| Product + engineering context | `.ai/projects/merchant-dashboard.md`, `.ai/core/rules.md` |
| Cursor rules (optional) | `.cursor/rules/` |

Collaborators: use **branches and pull requests** on GitHub; avoid sharing a single working copy on a shared drive.

## Stack notes

- UI primitives from shadcn-style `src/app/components/ui/` where used; merchant-specific controls (for example table pagination) live next to pages under `src/app/components/`.
