# Subagents (project reference)

Canonical documentation: [Cursor Subagents](https://cursor.com/docs/subagents).

## What they are

Specialized assistants the main Agent can delegate to. Each runs in its **own context** (isolation from the parent thread), can run in **parallel**, and returns a **summary** to the parent.

## Built-in (no repo files)

| Subagent | Role |
|----------|------|
| Explore | Codebase search/analysis (noisy output isolated) |
| Bash | Shell command sequences (logs isolated) |
| Browser | Browser MCP automation (DOM noise isolated) |

## Custom agents in this repo

| Location | Scope |
|----------|--------|
| `.cursor/agents/*.md` | This project only |

**Format:** Markdown with YAML frontmatter (`name`, `description`, optional `model`, `readonly`, `is_background`). See the official doc for field defaults and [model configuration](https://cursor.com/docs/subagents.md#model-configuration).

## When to delegate vs use a Skill

| Prefer **subagents** | Prefer **Skills** (e.g. `.cursor/skills/`) |
|----------------------|---------------------------------------------|
| Long research, parallel workstreams | Single-shot, repeatable recipes |
| Independent verification pass | No separate context needed |

## Project-defined agents

See **`.cursor/agents/README.md`** for the list of files and when to invoke them (including `/name` style prompts).
