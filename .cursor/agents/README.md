# Custom subagents (UMP India)

Official guide: [cursor.com/docs/subagents](https://cursor.com/docs/subagents).

Project overview: `@.cursor/docs/subagents.md`.

## Files

| File | `name` | When to use |
|------|--------|---------------|
| `verifier.md` | `verifier` | After a task is marked done: run checks/tests, be skeptical about “complete”. |
| `ump-refactor-audit.md` | `ump-refactor-audit` | Read-only pass: does the change respect frozen UI/API in refactor-policy? |

## Invocation

In chat, use `/verifier` or `/ump-refactor-audit` plus your question, or ask the main Agent to delegate to that subagent.
