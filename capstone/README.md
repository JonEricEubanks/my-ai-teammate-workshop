# 🏆 Capstone: Run the Loop Solo

**Time: ~45 minutes**

No more guided steps. You're the tech lead of TaskMango now, and the sprint ends in 45 minutes.

## The assignment

Ship **two** improvements to TaskMango, end to end, delegated to Copilot:

1. **One from the backlog** — pick from [`taskmango/docs/seeded-issues.md`](../taskmango/docs/seeded-issues.md) (#4 "Clear completed" button and #6 dark mode are good choices).
2. **One you invent** — any improvement you'd actually want. You write the entire spec from scratch.

## The rules

- **You may not edit application code directly.** Issues, review comments, and merge buttons only. (Docs and issue text are fine.)
- **At least one PR must go through a real review round** — leave `@copilot` feedback and make it iterate, even if the first draft was mergeable.
- **Use the rubric** from Module 03 on both PRs, in writing, in the PR thread.
- **Everything merges green.** Tests passing, no open CodeQL alerts you introduced.

## The deliverable: a retro

When both PRs are merged, create a new file called `RETRO.md` in the root of your repo. To do it on GitHub: navigate to your repo's **Code** tab → make sure you're at the root (no folder selected in the breadcrumb) → **Add file → Create new file** → type `RETRO.md` as the filename. Fill in the template below, then scroll down and click **Commit changes** to save it.

<details class="shot"><summary>What you'll see — creating RETRO.md from the repo root</summary>
<img class="shot" src="/ai-teammate-101/assets/shots/Retro_md.gif" alt="GitHub Code tab at the repo root with Add file menu open showing Create new file" />
</details>

> **How to link to a PR:** go to the PR on GitHub, copy the URL from your browser address bar (e.g. `https://github.com/your-username/your-repo/pull/3`), and paste it where it says `<link to PR>`.

```markdown
# TaskMango retro

## What I delegated
- Task 1: <link to PR> — merged after <n> review rounds
- Task 2: <link to PR> — merged after <n> review rounds

## Spec quality
What did my best issue have that my worst issue didn't?

## Review findings
What did the agent get wrong that I caught? What did it get right
that I wouldn't have thought of?

## My delegation policy going forward
For my real projects, I will delegate ______ but never ______.
```

<details><summary><strong>See a finished example</strong></summary>

```markdown
# TaskMango retro

## What I delegated
- Task 1: https://github.com/JonEricEubanks/my-ai-teammate-workshop/pull/13 — merged after 1 review round
- Task 2: https://github.com/JonEricEubanks/my-ai-teammate-workshop/pull/11 — merged after 2 review rounds

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
```

</details>

## How to use this artifact

> ⚠️ **Your scorecard won't update until you approve the progress bot workflow.** After committing `RETRO.md` (and after each PR merge), GitHub may show a yellow warning in the **Actions** tab saying "This workflow is awaiting approval from a maintainer." Go to **Actions** → click the pending **Workshop Progress Bot** run → click **Approve and run**. This only happens on the first run from each new branch/trigger. Once approved, the bot updates your scorecard issue automatically.

This capstone is deliberately portfolio-shaped. Your copy of the repo — with its PR threads, review comments, session logs, and retro — is something you can link from a resume, a blog post, or a talk proposal. "I managed an AI teammate through a full sprint" is a better story than "I completed a tutorial."

Hit 6/6 and the progress bot generates a personalized, downloadable certificate right into your repo (`CERTIFICATE.svg`) and embeds it in your scorecard issue:

<details class="shot"><summary>What you'll earn — the certificate the bot generates at 6/6</summary>
<img class="shot" src="/ai-teammate-101/assets/shots/certificate-sample.png" alt="A personalized AI Teammate 101 certificate of completion with the learner's name, repo, and date" />
</details>

Want to see a finished run end-to-end before you start? Here's a complete example: the [scorecard at 6/6](https://github.com/JonEricEubanks/ai-teammate-test-run/issues/1), the [generated certificate](https://github.com/JonEricEubanks/ai-teammate-test-run/blob/main/CERTIFICATE.svg), and the [retro](https://github.com/JonEricEubanks/ai-teammate-test-run/blob/main/RETRO.md) — all in one repo.

> 📣 **Facilitators:** the retro + two merged PRs are the completion evidence if you're running this as a graded workshop.

---

## 🎉 You're done

You've done the full loop: spec → delegate → observe → review → iterate → merge → reflect. Most working developers haven't. Take TaskMango's remaining backlog issues if you want reps — or better, point everything you learned at a project you actually care about.

**What's next: AI Architect 201**

Course 1 taught you to work with one agent. The next course teaches you to design systems *of* agents — multi-agent orchestration, MCP servers, governance policies, and trust boundaries. Same hands-on format, new app, higher stakes.

> :rocket: **Ready for Course 2?** [AI Architect 201](https://jonericeubanks.github.io/ai-architect-201/) is live — multi-agent orchestration, MCP servers, governance, and observability. Same format, higher stakes.
