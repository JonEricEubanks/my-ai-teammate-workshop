# 05 · Build a Specialist Agent

**Time: ~25 minutes**

So far, Copilot worked on your repo with its *default* personality: general-purpose software engineer. In this module you'll specialize it — defining a **custom agent** with a focused role, its own instructions, and its own toolset, using nothing but a Markdown file in your repo.

> **You'll leave this page able to:** explain what a custom agent is, write an agent definition with a focused mandate, and compare a specialist's output to the generalist's.

---

## The idea

Custom agents are **file-based specializations** of the Copilot coding agent. You drop a Markdown file with a small YAML frontmatter block into `.github/agents/`, and GitHub surfaces it anywhere you can dispatch work — the Agents panel, issue assignment, and beyond.

Why bother? The same reason teams have specialists:

- A **test engineer** that refuses to touch production code but writes relentless tests
- A **docs writer** tuned to your style guide
- A **janitor** that only does dependency bumps and dead-code removal

You're encoding *how* the work should be done, once, in version control — instead of repeating yourself in every prompt.

## Lab 5.1 — Meet the example

Your template ships with one: [`.github/agents/test-engineer.md`](../../.github/agents/test-engineer.md). Open it now and read it. Anatomy:

```markdown
---
name: test-engineer        # how you'll select it
description: >             # shown in pickers — write it for a human choosing an agent
  ...
tools: [...]               # optional: constrain what it may use
---

# Everything below the frontmatter is the system prompt.
# Role, rules, definition of done — written in plain language.
```

> ⚠️ **Format note:** the custom-agents file format is evolving. The lab below uses the `.github/agents/*.md` convention — if your picker doesn't pick the file up, check the current GitHub docs for the latest schema.

## Lab 5.2 — Ship it and use it

The repo's `main` branch already contains the test-engineer agent, so:

1. Go to the **Agents panel**: [github.com/copilot/agents](https://github.com/copilot/agents) → select your repo.
2. In the agent picker, you should see **test-engineer** alongside the default Copilot. Select it.

<details class="shot"><summary>What you'll see — test-engineer in the agent picker</summary>
<img class="shot" src="/ai-teammate-101/assets/shots/test-engineer.gif" alt="Agents panel showing test-engineer listed alongside the default Copilot agent" />
</details>

3. Give it this task:

   > TaskMango's `TaskFilter.tsx` and `TaskList.tsx` have no unit tests. Bring both under test with meaningful behavioral assertions (filtering logic, empty state, toggle/delete callbacks). Do not modify any component source. Follow the testing patterns already in `src/components/AddTaskForm.test.tsx`.

4. Start the task and watch the session log — look for moments where the agent's *mandate* visibly shaped its behavior (e.g. refusing to "fix" a component to make a test easier).
5. When the agent finishes, click **Create pull request** in the session panel — it won't open a PR automatically.

When the PR arrives, review it with the Module 03 rubric — plus one extra line: **did it stay in its lane?**

## Lab 5.3 — Write your own specialist

Now create one from scratch. Pick a role that fits *your* work. Ideas:

- `docs-writer` — only touches Markdown, follows your tone guide
- `bug-hunter` — only writes failing regression tests for reported bugs
- `a11y-reviewer` — only improves accessibility semantics

Create `.github/agents/<your-agent>.md` in your repo (edit directly on GitHub.com: **Add file → Create new file**), using the test-engineer file as your template.

<details class="shot"><summary>What you'll see — creating the agent file on GitHub</summary>
<img class="shot" src="/ai-teammate-101/assets/shots/Write your own specialist.gif" alt="GitHub file editor creating a new agent markdown file under .github/agents/" />
</details>

Rules of thumb:

- **One job.** If the description needs an "and", split it.
- **Write the definition of done into the prompt.** Specialists earn their keep by being *stricter* than the generalist, not looser.
- **Constrain tools when the role doesn't need them.** A docs agent doesn't need shell access.

Commit it, then run one real task through it from the Agents panel.

## ✅ Checkpoint

- [ ] You ran the seeded test-engineer agent on a real task
- [ ] Its PR contained only test files — zero component edits
- [ ] You authored and committed your own agent definition
- [ ] You can articulate one situation where a specialist beats the generalist

<details class="dive"><summary><strong>💭 Reflection — three questions worth a minute each</strong></summary>

1. How is a custom agent different from just writing better prompts each time? What do you gain by putting the persona in version control?
2. If your team had five custom agents, what would they be — and who on the team should own their definitions?
3. What happens when an agent's mandate conflicts with a task? (Did the test-engineer ever need to touch source to make something testable? What *should* it do then?)

</details>

---

**Next →** [🏆 Capstone](../../capstone/README.md)

**Going deeper:** custom agents can also be wired to **MCP servers** — external tools and data sources the agent can call. That's the natural "Module 06" of this workshop series.
