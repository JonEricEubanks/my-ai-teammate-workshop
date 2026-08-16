# 04 · Security on Autopilot

**Time: ~25 minutes**

So far you've delegated *features*. Now you'll delegate a *vulnerability fix* — and TaskMango ships with a real one for exactly this purpose.

> **You'll leave this page able to:** enable CodeQL code scanning, read an alert like an engineer, and ship a fix with Copilot Autofix.

---

## 🎯 The planted vulnerability

**Just look — do not edit anything.**

Open [`taskmango/src/components/TaskItem.tsx`](../../taskmango/src/components/TaskItem.tsx) and find line 21:

```tsx
<span dangerouslySetInnerHTML={{ __html: task.text }} />
```

This line renders every task's text as raw HTML instead of plain text. That means if someone types `<img src=x onerror=alert('xss')>` as a task, the browser executes the script — a classic **DOM-based XSS** vulnerability.

This bug is planted here on purpose. **Do not fix it by hand.** In the next two labs, you'll let the scanner find it and let Copilot Autofix generate the fix as a PR.

<details class="shot"><summary>What you'll see — the vulnerable line and its effect in the app</summary>
<img class="shot" src="/ai-teammate-101/assets/shots/m04-xss-sidebyside.png" alt="Side by side: TaskItem.tsx on GitHub with line 21 highlighted on the left, and the TaskMango app showing a broken image in the task list on the right" />
</details>

## Lab 4.1 — Turn on the scanner

Code scanning is **free for public repositories** (this is why your copy is public — on private repos it requires GitHub Advanced Security).

1. In your repo: **Settings → Security and quality → Advanced Security** (left nav).
2. Scroll to **Code scanning**, find **CodeQL analysis**, click **Set up → Default**.
3. Review the dialog (it scans on every push/PR to `main`) and click **Enable CodeQL**.

CodeQL now runs on your code. The first scan takes a few minutes — it builds a semantic model of the codebase, then queries it for known vulnerability patterns.

<details class="shot"><summary>What you'll see — Code scanning section in Settings</summary>
<img class="shot" src="/ai-teammate-101/assets/shots/m04-codeql-settings.png" alt="GitHub Advanced Security settings page showing CodeQL analysis enabled with last scan date" />
</details>

## Lab 4.2 — Read the alert like an engineer

1. Go to the **Security** tab → **Code scanning** (under *Findings*).
2. Find the alert for the TaskItem sink — titled something like **"DOM text reinterpreted as HTML"** (query `js/xss-through-dom`).
3. Open it and actually read it:
   - **The data-flow path**: user input (`task.text`, from `localStorage` + the add form) → the `dangerouslySetInnerHTML` sink. CodeQL shows you each hop.
   - **Severity & the "Show paths" view**: why this is exploitable, not theoretical.

> 💡 If CodeQL finds *only* this one alert on an app this size, that's the planted seed working as intended — deterministic lab outcomes are a feature.

<details class="shot"><summary>What you'll see — the XSS alert in Code scanning</summary>
<img class="shot" src="/ai-teammate-101/assets/shots/m04-codeql-alert-list.png" alt="Code scanning alerts page showing DOM text reinterpreted as HTML alert rated High" />
</details>

<details class="shot"><summary>What you'll see — alert detail with data-flow path</summary>
<img class="shot" src="/ai-teammate-101/assets/shots/m04-codeql-alert-detail.png" alt="Alert detail page showing the dangerouslySetInnerHTML sink on line 21, severity High, and the fix PR in the sidebar" />
</details>

## Lab 4.3 — Autofix it

1. In the alert, look for **"Speed up the remediation of this alert with Copilot Autofix"** → click **Generate fix**.
2. Read the proposed change before touching anything. For this alert you'll likely see the raw-HTML sink replaced with plain text rendering (React escapes text content by default — which is the correct fix here). Ask yourself: *does this close the data-flow path from the alert, or just shuffle it?*
3. Click **Commit to a new branch → Open a pull request → Commit change**.
4. You now have a PR for the fix — the same workflow as Modules 02–03. Run the rubric on it. Notice the bonus: **CodeQL re-scans the PR**, and the alert closes itself when the fix merges. The tooling verifies the tooling.

> 🆓 **Free plan path:** Autofix for code scanning alerts on public repos is available regardless of paid Copilot plans — this lab works for everyone.

<details class="dive"><summary><strong>Beyond one alert — paying down security debt at scale</strong></summary>

- **Security campaigns** let an org group alerts across many repos and drive bulk remediation — with Autofix generating candidate fixes en masse and humans approving.
- **PR-time scanning** (which you just enabled with the default setup) blocks *new* vulnerabilities from ever entering `main`.

The pattern to remember: **AI is very good at generating candidate fixes for well-understood vulnerability classes. Humans stay in charge of approving them.** Same delegation loop, higher stakes, better tooling.

</details>

## ✅ Checkpoint

- [ ] CodeQL default setup is enabled and has completed at least one scan
- [ ] You can explain the XSS data-flow path in your own words
- [ ] The Autofix PR merged and the alert shows as closed/fixed
- [ ] You verified by hand: the task `<img src=x onerror=...>` now renders as harmless text

<details class="dive"><summary><strong>🆘 Troubleshooting — if something's stuck, look here</strong></summary>

| Symptom | Fix |
|---|---|
| No alerts after the scan | Confirm the scan ran on a commit that contains `taskmango/`; check **Actions** tab for the CodeQL run log |
| No "Generate fix" button | Not all queries/languages support Autofix yet — but `js/xss-through-dom` does. Confirm you're on the alert page, not the alert list |
| Autofix change looks odd | Treat it like any agent PR: rubric, feedback, or close it. The alert stays open until a *merged* fix closes it |

</details>

<details class="dive"><summary><strong>💭 Reflection — two questions worth a minute each</strong></summary>

1. How does Autofix compare to how your team (or class) handles vulnerabilities today — triage meetings, backlog tickets, "we'll get to it"?
2. What's the risk of a one-click fix culture? What would you check before merging an Autofix PR for a *subtle* bug class (e.g. SSRF or a crypto misuse) versus a DOM XSS?

</details>

---

**Next →** [Module 05: Build a Specialist Agent](../05-customize-your-agent/README.md)
