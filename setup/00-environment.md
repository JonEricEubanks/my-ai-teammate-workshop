# 00 · Environment Setup

**Time: ~15 minutes**

Everything in this workshop happens on GitHub.com, in *your own copy* of this repository. No local tooling required (though Module 03 shows an optional VS Code path).

> :sparkle: **Best experience — use two screens (or split your browser window).**
> Keep your **GitHub repo** open on one side and **this workshop site** open on the other.
> You'll constantly switch between reading instructions and acting on your repo — side-by-side eliminates the tab-switching friction.
>
> <img src="/ai-teammate-101/assets/shots/two-screens.png" alt="GitHub repo on the left, workshop site on the right" style="border-radius:8px;margin-top:8px" />

---

## 1. Check your Copilot access

The Coding Agent is available on these plans:

| Plan | Coding Agent? | Notes |
|---|---|---|
| Copilot Pro / Pro+ | **Yes** | Includes monthly agent allowances |
| Copilot Business / Enterprise | **Yes** | Your org admin may need to enable the policy |
| Copilot Free | Limited | See the fallback below |
| **Verified students** | **Free Pro** | Via [GitHub Education](https://education.github.com) — if you're a student, claim this first |

**How to check:** go to [github.com/settings/copilot](https://github.com/settings/copilot) and look at your plan.

> **On the Free plan?** You can still learn every concept in this workshop: instead of assigning issues to Copilot on GitHub.com, use **Agent mode in VS Code** (free tier includes monthly agent requests) and compare the experience. Each module has a "Free plan path" callout where the steps differ.

## 2. Verify your own copy of this repo

You should already have your own copy from the README. If you don't, go back and do steps 1–5 first.

**Quick check:** look at the URL in your browser. It should be `github.com/<your-username>/my-ai-teammate-workshop`, not `github.com/JonEricEubanks/ai-teammate-101`.

> **Don't know your username?** Click your profile picture in the top-right of GitHub — your username is right there in the dropdown menu. It's also in the URL when you visit your profile page.

> **Don't have your own copy yet?** Stop here and do the [README quick-start](../README.md#how-to-take-this-workshop) first. You'll create the repo, name it, make it public, and turn on Pages. Then come back.

**If you already have your copy:** you're done with this section. Move on to Section 3.

## 3. Meet the sample app

Your copy contains a folder called [`taskmango/`](../taskmango) — a small React + TypeScript task tracker. It runs entirely in the browser (no backend, no database), stores tasks in `localStorage`, and — by design — ships with:

- 🐛 A couple of real bugs
- 🧪 Incomplete test coverage
- 🔓 One genuine security vulnerability (you'll fix it with AI in Module 04)
- 📋 A [seeded issue backlog](../taskmango/docs/seeded-issues.md) of tasks ready to delegate

<details class="dive"><summary><strong>Optional — run TaskMango locally</strong></summary>

You don't need to run TaskMango locally for this workshop — but if you want to see it live:

```bash
cd taskmango
npm install
npm run dev
```

Then open [localhost:5173](http://localhost:5173). Here's what you'll see:

| All tasks | Completed filter |
|:---:|:---:|
| <img class="shot" src="/ai-teammate-101/assets/shots/taskmango-all.png" alt="TaskMango All view — two active tasks and one completed with strikethrough" width="340" /> | <img class="shot" src="/ai-teammate-101/assets/shots/taskmango-completed.png" alt="TaskMango Completed filter — only the done task is visible" width="340" /> |

_Your job in this workshop is to delegate improvements to this app — you won't be writing the code yourself._

</details>

## 4. Publish your copy as a GitHub Pages site

This template is a [Docsify](https://docsify.js.org) site. To read it as a website instead of raw Markdown:

<details class="dive"><summary><strong>📹 Walkthrough: publish the site</strong></summary>
<br/>

<p align="center">
  <img src="/ai-teammate-101/assets/shots/github-pages-settings.gif" alt="Open Settings and Pages to publish the workshop as a website" width="640" />
</p>

</details>

1. In your repo, go to **Settings &rarr; Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
3. Wait a minute, then visit `https://<your-username>.github.io/my-ai-teammate-workshop/`.

> **Already did this in the README?** Skip ahead — you're all set.

## 5. Sanity check

✅ **You're ready for Module 01 when:**

- [ ] You've confirmed your Copilot plan (or chosen the Free-plan path)
- [ ] You have your own public copy of this repository (check the URL — it should have your username, not JonEricEubanks)
- [ ] Your copy is live on GitHub Pages (Settings &rarr; Pages)
- [ ] You've skimmed [`taskmango/docs/seeded-issues.md`](../taskmango/docs/seeded-issues.md)

---

**Next →** [Module 01: Meet Your AI Teammate](../modules/01-meet-your-ai-teammate/README.md)
