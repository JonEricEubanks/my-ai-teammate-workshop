#  TaskMango Seeded Issue Backlog

Copy-paste-ready issue bodies for your own copy of this repo. **Write the
acceptance criteria yourself** where marked — that's the skill.

---

## #1 · Show task counts in the filter bar

> Used in Module 02 — full text provided there.

## #2 · Deleting a task in a filtered view removes the wrong task

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

## #3 · Reject empty or whitespace-only tasks

```markdown
## Enhancement

The add form currently accepts empty and whitespace-only input, creating
blank tasks.

## Acceptance criteria

- [ ] <write them yourself>
- [ ] Hint: also consider disabling the Add button for invalid input
- [ ] Unit test covers the rejection
```

## #4 · Add a "Clear completed" button

```markdown
## User story

As a user, I want to remove all completed tasks at once so I can clean up
my list after a productive day.

## Acceptance criteria

- [ ] <write them yourself>
- [ ] Button only appears when at least one completed task exists
```

## #5 · Add a due-date field to tasks

```markdown
## User story

As a user, I want to optionally set a due date on a task so I can see
what's urgent.

## Acceptance criteria

- [ ] <write them yourself>
- [ ] Existing tasks without dates keep working (storage migration!)
- [ ] Overdue tasks are visually distinct
```

## #6 · Add a dark mode toggle

```markdown
## User story

As a user, I want to switch TaskMango to dark mode so I can use it at night.

## Acceptance criteria

- [ ] <write them yourself>
- [ ] Preference persists across reloads
- [ ] Respects `prefers-color-scheme` as the default
```

## #7 · Test coverage for TaskFilter and TaskList

```markdown
## Task

`src/components/TaskFilter.tsx` and `src/components/TaskList.tsx` have no
unit tests. Add meaningful behavioral tests (not snapshot filler).

## Acceptance criteria

- [ ] <write them yourself>
- [ ] Follow the patterns in `src/components/AddTaskForm.test.tsx`
```

## #8 · Docs: real README with screenshots + CONTRIBUTING.md

```markdown
## Task

TaskMango's README should show the app, not just describe it. Add
screenshots and write a short CONTRIBUTING.md explaining how to run tests
and the conventions used in `src/`.

## Acceptance criteria

- [ ] <write them yourself>
```

---

**Capstone rule reminder:** issues #4 and #6 are good capstone picks. For your
second capstone task, invent your own — the best delegates write their own specs.
