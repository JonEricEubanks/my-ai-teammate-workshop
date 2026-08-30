# TaskMango retro

## What I delegated
- Task 1: https://github.com/JonEricEubanks/my-ai-teammate-workshop/pull/13 — merged after 1 review round
- Task 2: https://github.com/JonEricEubanks/my-ai-teammate-workshop/pull/09 — merged after 2 review rounds

## Spec quality
The dark-mode issue had clear acceptance criteria with edge cases (persists across reloads,
respects prefers-color-scheme). The filter-count issue just said "show counts" — Copilot had
to guess at the details and got the disabled-state wrong on the first pass.

## Review findings
Copilot got the CSS variable scoping right without being asked — I wouldn’t have thought
to use prefers-color-scheme as the default. It got the localStorage key wrong on the first
attempt (used a generic key that collided with existing storage).

## My delegation policy going forward
For my real projects, I will delegate well-scoped UI features and test coverage,
but never security-sensitive logic or anything touching auth without a very tight spec.
