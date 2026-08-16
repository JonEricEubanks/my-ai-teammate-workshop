/* ============================================================
   AI Teammate 101 — progress tracking & "up next" nudges.
   Persists visited course pages in localStorage, renders a
   progress bar in the sidebar, checkmarks completed links,
   appends an "Up next" card to each module, and turns the
   cover CTA into a "Resume" button for returning learners.
   ============================================================ */
(function () {
  const KEY = "at101-progress-v1";

  // Canonical course track, in order (mirrors _sidebar.md).
  const TRACK = [
    "setup/00-environment.md",
    "modules/01-meet-your-ai-teammate/README.md",
    "modules/02-delegate-a-task/README.md",
    "modules/03-become-the-tech-lead/README.md",
    "modules/04-security-on-autopilot/README.md",
    "modules/05-customize-your-agent/README.md",
    "capstone/README.md",
    "modules/06-new-game-plus/README.md",
    "modules/07-multi-agent-orchestration/README.md",
  ];

  const norm = (p) =>
    decodeURIComponent(p || "")
      .replace(/^#?\/?/, "")
      .replace(/^\.\//, "")
      .replace(/#.*$/, "")
      .replace(/\.md$/, "");

  // Normalized once — Docsify routes and sidebar hrefs omit the .md suffix.
  const TRACK_N = TRACK.map(norm);

  const load = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch (e) {
      return [];
    }
  };
  const save = (list) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch (e) {
      /* storage unavailable — progress simply won't persist */
    }
  };

  const currentPath = () => norm(location.hash) || "README.md";

  function markVisited() {
    const p = currentPath();
    if (!TRACK_N.includes(p)) return;
    const list = load();
    if (!list.includes(p)) {
      list.push(p);
      save(list);
    }
  }

  const CHECK_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M20 6 9 17l-5-5"/></svg>';

  function sidebarLinks() {
    return Array.from(document.querySelectorAll(".sidebar-nav a[href]"))
      .map((a) => ({ a, path: norm(a.getAttribute("href")) }))
      .filter((x) => TRACK_N.includes(x.path));
  }

  const sidebarEntry = (path) => sidebarLinks().find((x) => x.path === path);

  const linkLabel = (path) => {
    const hit = sidebarEntry(path);
    return hit ? hit.a.textContent.trim() : path;
  };

  const linkHref = (path) => {
    const hit = sidebarEntry(path);
    return hit ? hit.a.getAttribute("href") : "#/" + path;
  };

  /* ---------- sidebar progress widget + checkmarks ---------- */
  function renderProgress() {
    const visited = load();
    const done = TRACK_N.filter((p) => visited.includes(p)).length;

    const search = document.querySelector(".search");
    if (search && !document.querySelector(".at-progress")) {
      const w = document.createElement("div");
      w.className = "at-progress";
      w.innerHTML =
        '<div class="at-progress-top"><span>Course progress</span>' +
        '<span class="at-progress-count"></span></div>' +
        '<div class="at-progress-bar"><div class="at-progress-fill"></div></div>';
      search.parentNode.insertBefore(w, search.nextSibling);
    }
    const w = document.querySelector(".at-progress");
    if (w) {
      const pct = Math.round((done / TRACK_N.length) * 100);
      w.querySelector(".at-progress-count").textContent =
        done + "/" + TRACK_N.length;
      const fill = w.querySelector(".at-progress-fill");
      requestAnimationFrame(() => {
        fill.style.width = pct + "%";
      });
      w.classList.toggle("complete", done === TRACK_N.length);
    }

    sidebarLinks().forEach(({ a, path }) => {
      let badge = a.querySelector(".at-check");
      if (visited.includes(path)) {
        if (!badge) {
          badge = document.createElement("span");
          badge.className = "at-check";
          badge.title = "Completed";
          badge.innerHTML = CHECK_SVG;
          a.appendChild(badge);
        }
      } else if (badge) {
        badge.remove();
      }
    });
  }

  /* ---------- "Up next" card at the end of each module ---------- */
  function renderUpNext() {
    const content = document.querySelector(".markdown-section");
    if (!content) return;
    const stale = content.querySelector(".at-up-next");
    if (stale) stale.remove();

    const p = currentPath();
    const idx = TRACK_N.indexOf(p);
    if (idx === -1) return;

    const card = document.createElement("div");

    if (idx === TRACK_N.length - 1) {
      const done = TRACK_N.filter((t) => load().includes(t)).length;
      if (done < TRACK_N.length) return;
      card.className = "at-up-next at-finish";
      card.innerHTML =
        '<div class="at-up-next-kicker">Course complete — nice work 🏆</div>';
    } else {
      const next = TRACK_N[idx + 1];
      card.className = "at-up-next";
      card.innerHTML =
        '<div class="at-up-next-kicker">Up next</div>' +
        '<a class="at-up-next-link" href="' + linkHref(next) + '">' +
        linkLabel(next) +
        '<span class="at-arrow">→</span></a>';
    }
    content.appendChild(card);
  }

  /* ---------- cover CTA becomes "Resume" for returning learners ---------- */
  function renderResume() {
    const cta = document.querySelector("section.cover .hero-cta");
    if (!cta) return;
    const visited = load();
    if (visited.length === 0) return;
    const next = TRACK_N.find((t) => !visited.includes(t));
    const primary = cta.querySelector(".btn-primary");
    if (!primary) return;
    if (!next) {
      primary.textContent = "Review the course";
      primary.setAttribute("href", "#/?id=ai-teammate-101");
      return;
    }
    primary.textContent = "Resume: " + linkLabel(next);
    primary.setAttribute("href", linkHref(next));
  }

  function update() {
    markVisited();
    renderProgress();
    renderUpNext();
    renderResume();
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(
    function (hook) {
      hook.doneEach(function () {
        setTimeout(update, 60);
      });
    },
  );
  window.addEventListener("load", () => setTimeout(update, 400));
})();
