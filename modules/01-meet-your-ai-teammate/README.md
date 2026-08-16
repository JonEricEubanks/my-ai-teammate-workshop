# 01 · Meet Your AI Teammate

**Time: ~15 minutes** · No hands-on yet — this module gives you the mental model the rest of the workshop builds on.

> **You'll leave this page able to:** place the Coding Agent on Copilot's "autonomy spectrum," describe the four phases of an agent run, and judge which tasks are safe to delegate.

---

## The autonomy spectrum

"GitHub Copilot" is really several different working relationships with an AI, and they differ in one dimension that matters: **who's driving.**

<p align="center">
  <img src="/ai-teammate-101/assets/diagram-spectrum.svg" alt="The autonomy spectrum from autocomplete to the Coding Agent" width="860" />
</p>

| Mode | Where it lives | You're… | Best for |
|---|---|---|---|
| Autocomplete | Your editor | Typing | The line you're already writing |
| Chat / Ask | Editor, GitHub.com | Conversing | Questions, explanations, small snippets |
| Agent mode | VS Code | Supervising each step | Multi-file changes you want to watch closely |
| **Coding Agent** | **GitHub.com** | **Delegating the whole task** | **Well-specified work you'd hand to a teammate** |

**The takeaway:** the Coding Agent is different in *kind*, not just degree. You stop supervising keystrokes and start managing **outcomes** — which is why this workshop frames it as a tech-lead skill. Because it is one.

## What a run looks like

Assign an issue to `@copilot` and four things happen — every one of them visible in the **session log** (every file read, every command run, every test result — nothing happens off-stage):

| Phase | What the agent does |
|---|---|
| **1 · Activation** | Reacts 👀 on the issue, spins up an isolated GitHub Actions runner, opens a draft PR on a `copilot/` branch |
| **2 · Exploration & planning** | Reads your codebase (retrieval over the whole repo, not just files you mentioned), writes its plan into the PR description as a checklist |
| **3 · Implementation** | Commits incrementally, runs your tests and linters, writes new tests, iterates when checks fail |
| **4 · Review loop** | Marks the PR ready, requests your review, and — crucially — **responds to your review comments** |

## Delegate it, or keep it human?

| ✅ Delegate freely | 🙅 Keep a human in the loop |
|---|---|
| Well-scoped features ("add X to page Y") | Architecture decisions ("how should auth work?") |
| Bug fixes with a clear repro | Vague asks ("make it faster", "improve UX") |
| Test coverage, docs, dependency bumps | Anything touching secrets, infra, or production data |
| Mechanical refactors, tech-debt paydown | Work where you couldn't review the output |

> **The one rule that matters most:** *if you can't tell whether the PR is right, you can't safely delegate the task.* Delegation shifts your job from writing code to specifying and reviewing it — Modules 02 and 03 train exactly those two skills.

## 🧠 Quick check

For each task, decide: *delegate to the Coding Agent, or keep it human?*

1. "Add a confirmation dialog before deleting a task."
2. "Should TaskMango move from localStorage to a real backend?"
3. "The delete button removes the wrong task when a filter is active. Repro: …"
4. "Make the app feel more polished."
5. "Write unit tests for `TaskFilter.tsx` to reach 80% coverage."

<details class="dive"><summary><strong>Check your answers</strong></summary>

1. **Delegate** — well-scoped, visible, testable.
2. **Human** — that's an architecture call. (You might ask Copilot *chat* for input, but you decide.)
3. **Delegate** — a clear bug with a repro is an ideal agent task. (It's also in your seeded backlog.)
4. **Human first** — too vague. Decompose it into specific tasks, *then* delegate those.
5. **Delegate** — the single best first real-world use of a coding agent.

</details>

## ✅ Checkpoint

- [ ] You can explain the difference between Agent mode (IDE) and the Coding Agent (GitHub.com) to a colleague in one sentence
- [ ] You can name the four phases of a run
- [ ] You scored at least 4/5 on the quick check

---

**Next →** [Module 02: Delegate Your First Task](../02-delegate-a-task/README.md) — run the full loop for real.
