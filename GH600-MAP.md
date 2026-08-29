#  AI Teammate 101  GH-600 Certification Map

This workshop is not affiliated with the exam — but it *deliberately trains*
the skills GH-600 ("GitHub Certified: Agentic AI Developer", beta) assesses.
Here's the honest mapping.

| GH-600 domain | Weight | Where you practice it here |
|---|---|---|
| **1. Agent architecture & SDLC processes** | 15–20% | Module 01 (agent lifecycle, GitHub as control plane) · Module 06 (plan-first vs plan+execution, PR governance) |
| **2. Tool use & environment interaction** | 20–25% | Module 02 (full agent execution loop, session logs) · Module 03 (issue / Agents panel / VS Code entry points) · Module 05 (custom agent files, tool constraints) |
| **3. Memory, state & execution** | 10–15% | Module 02 (session logs as durable state) · Capstone retro (PR + issue + checks as the source of truth) · Module 07* |
| **4. Evaluation, error analysis & tuning** | 15–20% | Module 02 Lab 2.3 (reading session logs) · Module 03 (review rubric, hit-rate reflection) · Module 04 (verifying Autofix against the alert, not the vibes) |
| **5. Multi-agent coordination** | 15–20% | Module 03 (parallel delegation, PR conflicts, arbitration) · Module 05 (specialists) · Module 07* (fan-out/fan-in, handoffs) |
| **6. Guardrails & accountability** | 10–15% | Module 04 (CodeQL + Autofix, human-approved fixes) · **Module 06** (plan gate, CODEOWNERS, least privilege, concurrency) |

\* Module 07 is the sequel — see [modules/07-multi-agent-orchestration](../modules/07-multi-agent-orchestration/README.md).

## The exam vocabulary, translated to what your hands did

| Exam term | What you literally did in this workshop |
|---|---|
| plan  act  evaluate | wrote the issue  Copilot worked  you reviewed the PR |
| system of record | your repo: issue, session log, PR, checks, review — all in one place |
| control plane | Module 06: required checks, CODEOWNERS, rulesets |
| contributor model | Module 03 rubric — you judged the PR, not the author |
| hidden reasoning | Module 02 — you read the session log instead of trusting the diff |
| blind trust in automation | Module 04 — you verified the XSS was *actually* dead |
| risk-based autonomy | Module 06 — plan gate + CODEOWNERS + read-only tokens |
| escalation | Module 03 — you closed a bad PR and rewrote the spec |

## Recommended study path

1. This workshop, Modules 00–06 (hands-on muscle memory)
2. Microsoft Learn: *Developing in Agentic AI Systems* parts 1 & 2 (theory depth, MCP details, hook configuration)
3. Re-run your capstone repo with **all Module 06 gates enabled** — explain every control out loud. If you can teach it, you can pass it.
