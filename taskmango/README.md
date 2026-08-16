#  TaskMango

A small React + TypeScript task tracker. It's the teaching app for the
[AI Teammate 101](../README.md) workshop — it ships with **planted bugs, thin
tests, and one real (harmless-in-context) XSS vulnerability**, all on purpose,
so there's something meaningful to delegate to GitHub Copilot.

## Run it

```bash
npm install
npm run dev      # local dev server
npm test         # unit tests (vitest)
npm run build    # type-check + production build
```

## What's intentionally wrong with it

| # | Where | What |
|---|-------|------|
| 2 | `src/App.tsx` (`deleteTask`) | Deletes by *visible index* — wrong task disappears when a filter is active |
| 3 | `src/components/AddTaskForm.tsx` | Accepts empty/whitespace-only tasks |
| 4 | `src/components/TaskItem.tsx` | `dangerouslySetInnerHTML` on task text  DOM XSS (fixed by you via CodeQL + Copilot Autofix in Module 04) |
| — | `TaskFilter.tsx`, `TaskList.tsx` | No unit tests |

**Do not fix these by hand before the workshop tells you to.** They're the
curriculum. See [`docs/seeded-issues.md`](docs/seeded-issues.md) for the full
backlog of delegation-ready tasks.
