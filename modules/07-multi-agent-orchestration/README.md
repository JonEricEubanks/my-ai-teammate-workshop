# 07 · Multi-Agent Orchestration

**Time: ~45 minutes** · *Requires Module 06. This is the sequel.*

One specialist agent is a hire. A *team* of specialists — working in parallel without stepping on each other — is an engineering org. This module teaches you to build the second one, using TaskMango as the company.

> **You'll leave this page able to:** decompose a feature into non-overlapping agent assignments, orchestrate custom agents with subagent handoffs, and arbitrate conflicts between agent PRs with rules, not vibes.

---

## The governing idea: coordination through artifacts, not messages

Multi-agent systems fail in boring ways: two agents edit the same file, two PRs solve the same problem, nobody can reconstruct who did what. The fix is never "smarter agents" — it's **shared, reviewable artifacts**: issues define intent, PRs define proposals, checks define truth.

## Lab 7.1 — The partition test

Take this feature: **"TaskMango needs a stats bar: total tasks, completed %, and tasks added this week."**

Before touching anything, answer on paper (or in an issue): which files would a *tests* agent touch, which would a *feature* agent touch, and which would a *docs* agent touch? If any two columns contain the same file, your partition is wrong. Redraw it.

A good partition:

| Agent | Owns | Explicitly may NOT touch |
|---|---|---|
| `feature-dev` | `src/components/StatsBar.tsx` (new), `src/App.tsx` | tests, docs, workflows |
| `test-engineer` (you have this one!) | `src/components/StatsBar.test.tsx` | production source |
| `docs-writer` | `taskmango/README.md` | anything under `src/` |

> 💡 This is the exam's first multi-agent rule: **define responsibilities narrowly enough to enforce through path boundaries.** Parallelism without isolation is just a merge-conflict generator.

## Lab 7.2 — Fan out, for real

1. Author the two missing agents: `.github/agents/feature-dev.md` and `.github/agents/docs-writer.md`. Use your Module 05 pattern — but this time write the **may-not-touch** list into each agent's mandate. (You already know why: boundaries beat politeness.)
2. Create **three issues**, one per row of your partition table. Assign each to its specialist from the Agents panel.
3. You now have three agent sessions in flight. Your job is pure tech lead: watch the session logs, keep an eye on the PR list, think about merge *order*.

**The expected collision:** `feature-dev` and `test-engineer` both need `StatsBar.tsx` to exist. The feature agent creates it; the test agent — starting from `main` — may not find it. This is not a bug in your partition; it's the **dependency problem**. Watch how each agent copes, and note it for the retro.

## Lab 7.3 — Handoffs: agents calling agents

Custom agents can delegate. Add a `handoffs` section to your `feature-dev` agent:

```yaml
handoffs:
  - label: Get tests written
    agent: test-engineer
    prompt: Write behavioral tests for the component just implemented.
    send: true
```

Now re-dispatch the stats-bar feature to `feature-dev` alone — and watch it *hand off* to your test engineer when it's done. One task in, a coordinated two-agent pipeline out.

> ⚠️ **Honesty box:** subagent handoff support is one of the newest, fastest-moving parts of Copilot. If your environment doesn't surface it yet, Lab 7.2's parallel-issues approach achieves the same coordination with 2019-era GitHub primitives. Knowing *both* is the actual skill.

## Lab 7.4 — Arbitrate like a professional

Two agent PRs are open. Merge the feature PR first. Now the test PR probably conflicts or fails CI (it was written against a `main` that didn't have the component — or vice versa). Your arbitration playbook, in order:

1. **Update branch** on the surviving PR and let CI re-run — most "conflicts" are just staleness.
2. **If a real conflict:** leave `@copilot` feedback on the surviving PR explaining the merged state — agents rebase and adapt remarkably well when told what changed.
3. **If two PRs solve the same problem differently:** pick one, close the other with a kind comment. Rule: *escalate after two failed automated resolutions* — don't let agents thrash.

## ✅ Checkpoint

- [ ] Three specialists ran with zero overlapping file ownership
- [ ] You merged ≥2 agent PRs in a deliberate order and arbitrated the fallout
- [ ] You attempted (or read the session log of) a subagent handoff
- [ ] Every merged PR passed the plan gate from Module 06

<details class="dive"><summary><strong>💭 Reflection — three questions worth a minute each</strong></summary>

1. Which broke first under parallelism: the agents, or your partition? What does that tell you about scaling this to a real team?
2. When would you choose fan-out via issues vs. subagent handoffs? (Hint: which one leaves a better audit trail?)
3. Multi-agent systems are observability systems. What evidence would you need to reconstruct today's session in six months?

</details>

---

## 🎉 You finished the whole track

You went from *"assign an issue to a robot"* to *orchestrating a governed multi-agent team* — with the audit trail, the gates, and the certificate to prove it. What's next is yours: point this at a real codebase, write a talk about it, or go take GH-600 and make it official.

And if TaskMango ever gets a real backend… that sounds like Module 08. Contributions welcome. 
