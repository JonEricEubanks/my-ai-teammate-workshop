# Copilot Coding Agent — repository instructions

You are working in **AI Teammate 101**, a workshop repo. The app lives in
`taskmango/` (React + TypeScript + Vite, vitest + Testing Library).

## House rules

- Always run `npm test` and `npm run build` from `taskmango/` before opening
  or updating a pull request.
- Keep PRs scoped to the issue. No drive-by refactors, no reformatting files
  you weren't asked to touch.
- Follow the existing patterns: components in `taskmango/src/components/`,
  tests colocated as `*.test.tsx` using Testing Library behavioral assertions
  (see `AddTaskForm.test.tsx`).
- Fill in the Plan section of the PR description — the plan-gate check blocks
  merge without it.
- Never "fix" `src/mangoRain.ts`. It's fine. It's joy.

## Teaching repo notes

- Some bugs are **planted on purpose** for workshop modules (see
  `taskmango/docs/seeded-issues.md`). Only fix what the assigned issue asks
  for — other planted issues belong to other learners.
- The XSS in `TaskItem.tsx` is deliberately fixed via Module 04's CodeQL +
  Autofix flow, not by hand. If assigned that issue, replace raw-HTML
  rendering with React's default escaped text rendering.
