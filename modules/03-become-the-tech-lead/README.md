# 03 · Be the Tech Lead

**Time: ~30 minutes**

One delegated task is a demo. Three delegated tasks — running in parallel while you drink coffee — is a workflow. This module is about operating at that level.

> **You'll leave this page able to:** run multiple agent sessions in parallel, dispatch work from three different entry points, and review AI-generated PRs with a repeatable rubric — without becoming the bottleneck.

---

## Lab 3.1 — Fan out

You have a backlog. Pick **two issues** below (they're independent and intentionally sized for parallel sessions). Use the seeded text, but **write the acceptance criteria yourself** — that's the skill being trained.

<details><summary><strong>#2 · Deleting a task in a filtered view removes the wrong task</strong></summary>

**Title**
```
Deleting a task in a filtered view removes the wrong task
```

**Body**
```markdown
## Bug report

**Repro:**
1. Add three tasks: "one", "two", "three"
2. Complete "one"
3. Switch to the "Active" filter
4. Delete "two" (the first visible task)

**Expected:** "two" is deleted.
**Actual:** a different task disappears.

## Context

`deleteTask` in `src/App.tsx` receives an index into the *filtered* list but
applies it to the *full* list. Fix by deleting by task `id` instead.

## Acceptance criteria

- [ ] <write them yourself>
- [ ] Regression test: deleting from a filtered view removes the right task
```

</details>

<details><summary><strong>#3 · Reject empty or whitespace-only tasks</strong></summary>

**Title**
```
Reject empty or whitespace-only tasks
```

**Body**
```markdown
## Enhancement

The add form currently accepts empty and whitespace-only input, creating
blank tasks.

## Acceptance criteria

- [ ] <write them yourself>
- [ ] Hint: also consider disabling the Add button for invalid input
- [ ] Unit test covers the rejection
```

</details>

For each one:

1. Create the issue in your repo and paste in the text above.
2. Write your own acceptance criteria where marked.
3. Assign it to Copilot.

You now have (at least) two agent sessions running in parallel. Notice what just happened to your role: you're not implementing anything. You're **specifying, dispatching, and (soon) reviewing**. That inversion is the entire lesson.

> 🧠 **Tech-lead instinct to build:** before assigning, ask "can these two tasks conflict?" Two agents editing the same file can produce merge-conflicting PRs. Tasks #2 and #3 both touch nearby code — watch what happens when the second PR is merged after the first. Merge conflicts with agent PRs resolve exactly like human ones.

## Lab 3.2 — Two more doors into the same agent

The issue-assignee flow is not the only way to dispatch work:

**Option A — the Agents panel.** Go to [github.com/copilot/agents](https://github.com/copilot/agents) (or the Copilot icon, top-right of any GitHub page). Pick your repo, describe a task in plain language, and start it — no issue required. Use this for quick, informal tasks; use issues when you want the task tracked, discussed, and linked.

**Option B — VS Code handoff.** With the GitHub Pull Requests extension installed, you can hand a task to the Coding Agent without leaving your editor — the same way you'd stop writing a TODO comment and file the work instead. *(Optional here; try it later on your own project.)*

> **🆓 Free plan path:** in VS Code, Agent mode covers the same ground for this lab — run the two tasks sequentially in two chat sessions and compare how that feels against parallel delegation.

## Lab 3.3 — The review rubric (the real skill)

When the PRs land, review each with this rubric. Paste it into your review comment and fill it in — it takes two minutes per PR and scales to any AI-generated change:

```markdown
### Review rubric
- [ ] Correct: implements every acceptance criterion in the issue
- [ ] Verified: CI/tests ran and passed; new behavior has new tests
- [ ] Fits: follows existing patterns; no parallel structure invented
- [ ] Scoped: no unrelated edits, drive-by refactors, or reformatting
- [ ] Safe: no new injection surfaces, no secrets, no weakened validation
- [ ] Clear: I'd understand this code in six months
```

Then decide:

- **All checked →** approve & merge.
- **Fixable gaps →** one round of `@copilot` review feedback (Module 02 showed you how).
- **Fundamentally wrong approach →** close the PR, tighten the spec, redelegate. *Closing a bad agent PR costs nothing. Merging it costs you the codebase.*

**Also try this:** add **Copilot as a reviewer** on one of the PRs (Reviewers → Copilot). It will analyze the diff and leave comments — effectively a second opinion from another AI. Useful, with a caveat you'll discuss below.

> 💡 Once added, Copilot will automatically post a review comment on the PR — you don’t need to trigger it manually. You may also see a suggestion to "Add a `code-review` agent skill" for more context-aware reviews; ignore it for now. Read Copilot’s comments as part of your rubric, then proceed to approve and merge as normal.

<details class="shot"><summary>What you'll see — requesting a Copilot review</summary>
<img class="shot" src="/ai-teammate-101/assets/shots/m03-copilot-reviewer.gif" alt="Reviewers sidebar showing Copilot Lite with a Request link to add it as a reviewer" />
</details>

## ✅ Checkpoint

- [ ] You have run at least two agent sessions in parallel
- [ ] You assigned at least one task via the Agents panel *or* VS Code
- [ ] You reviewed at least one PR using the rubric, in writing
- [ ] You handled (or observed) a conflict/ordering issue between two agent PRs

<details class="dive"><summary><strong>💭 Reflection — three questions worth a minute each</strong></summary>

1. **Should Copilot be the only reviewer on a PR?** What do you lose when the author and reviewer are the same system? Where might an AI-only review loop be acceptable (docs? tests?) and where is human review non-negotiable?
2. Which of the three dispatch methods fit how you actually work? Why?
3. After three delegations: what's your hit rate — how many PRs merged with ≤1 round of feedback? What did the failures have in common: the task, or the spec?

</details>

---

**Next →** [Module 04: Security on Autopilot](../04-security-on-autopilot/README.md)
