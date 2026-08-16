# 06 · New Game+: Govern Your Agents

**Time: ~40 minutes** · *Post-certification content — finish the capstone first.*

You can delegate. Now make delegation **safe at scale** — the difference between a demo and a production engineering practice, and the core of the [GH-600 Agentic AI Developer exam](../../GH600-MAP.md) (Domains 5 & 6).

> **You'll leave this page able to:** enforce a plan on every PR with a required check, route sensitive paths via CODEOWNERS, apply least-privilege + concurrency to workflows, and name the classic agent anti-patterns on sight.

---

## The governing idea: agents propose, policy accepts

Everything in this module is one principle, applied four ways:

> An agent may *prepare* any change. Whether that change is *accepted* is decided by GitHub-native controls — required checks, CODEOWNERS, rulesets — never by the agent itself.

Your repo already has the raw materials: TaskMango CI runs on every PR. This module turns those soft conventions into **hard gates**.

## Lab 6.1 — The Plan Gate

**The anti-pattern:** *planless execution* — a PR with a diff but no stated intent. Copilot's PRs usually include a plan; the point is to make "a plan exists" an **enforceable invariant** rather than a hopeful default.

1. This template ships [.github/pull_request_template.md](../../.github/pull_request_template.md) — look at it. Every PR now starts with a Goal / Scope / Success criteria / Rollback skeleton.
2. It also ships [.github/workflows/plan-gate.yml](../../.github/workflows/plan-gate.yml): a check that fails any PR whose description still contains the template's unfilled `**Goal:**` placeholder.
3. **Enable the gate:** Settings → Branches (or Rulesets) → add a rule for `main` requiring the `plan-gate` check to pass.
4. **Prove it bites:** open a throwaway PR with an empty description → the check fails, merge is blocked. Fill in the plan section → green. Close the PR.

> 💡 You just converted a *documented expectation* into a *system guarantee*. That's the whole discipline of agent governance in one move.

## Lab 6.2 — CODEOWNERS: route the risky stuff

Not all files are equal. A change to `App.css` and a change to `.github/workflows/` are different risk classes — the exam calls these *"small diff, big consequence"* areas.

1. Ship a `CODEOWNERS` file in your copy:

   ```
   # High-consequence paths route to you, the tech lead
   /.github/          @YOUR-USERNAME
   /taskmango/src/storage.ts  @YOUR-USERNAME
   *                  @YOUR-USERNAME
   ```

2. Turn on **Require review from Code Owners** in your branch rule.
3. Now delegate a task from the seeded backlog that touches a workflow file (e.g. "add a lint job to TaskMango CI"). Watch GitHub auto-request your review. That's **risk-based routing** — the agent can propose anything, but the blast-radius paths can't land without the right eyes.

## Lab 6.3 — Least privilege + concurrency: tame the automation itself

Two small workflow changes with outsized effect:

**Least privilege.** Open `.github/workflows/ci-taskmango.yml`. It runs with your repo's *default* token permissions. Add an explicit floor:

```yaml
permissions:
  contents: read
```

The rule of thumb: **default to read-only; elevate per-job only when a job must write.** If a compromised or misbehaving workflow can't write, it can't hurt you.

**Concurrency.** When Copilot iterates on review feedback, it pushes commits quickly — and each push retriggers CI. Stop stale runs from stacking up:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

Delegate a task, then leave review feedback immediately. Watch the Actions tab: the outdated run cancels itself. That's what **stable multi-session operation** looks like.

## Lab 6.4 — Spot the anti-patterns (theory check, exam-style)

Each of these is lifted from real failure modes. Name the anti-pattern and the GitHub control that kills it:

1. "The agent's PR was just a diff — no plan, no rationale. Reviewer merged anyway because CI was green."
2. "We gave the agent's workflow `write` on everything. It force-pushed to main during a bad run."
3. "Two Copilot PRs kept conflicting on the same file; whichever merged first won, the other rotted."
4. "The security fix passed CI, so we merged it. It fixed the linter warning but not the vulnerability."

<details class="dive"><summary><strong>Check your answers</strong></summary>

1. **Hidden reasoning** → PR template + plan gate + required review.
2. **Over-permissioned agent** → least-privilege `permissions:`, branch protection blocking force-push.
3. **No arbitration** → CODEOWNERS routing + merge-validation check + explicit escalation after two failed rebases.
4. **Blind trust in automation** → checks validate only what they're built to detect; vulnerability closure needs the *alert* to close (CodeQL re-scan), not just green tests.

</details>

## ✅ Checkpoint

- [ ] `plan-gate` is a required check and you've seen it block a plan-less PR
- [ ] CODEOWNERS routes `.github/` changes to you automatically
- [ ] CI workflow runs read-only by default
- [ ] Concurrency cancels stale runs (you watched it happen)
- [ ] You scored 4/4 on the anti-pattern drill

<details class="dive"><summary><strong>💭 Reflection — three questions worth a minute each</strong></summary>

1. Which of the four controls would survive contact with *your* real team's repos — and which would get bypassed within a week? Why?
2. The exam draws a hard line: *"controls in docs only"* is an anti-pattern. Look at your own projects — what governance lives only in a wiki page right now?
3. Progressive autonomy: which task class would you *first* trust an agent to merge without you — and what evidence would you demand before granting that?

</details>

---

**Next →** [Module 07: Multi-Agent Orchestration](../07-multi-agent-orchestration/README.md) — when one agent isn't enough: fan-out/fan-in, subagent handoffs, and conflict arbitration.

*(Yes, there's a 07. You didn't think the specialist agents from Module 05 stayed single-player, did you?)*
