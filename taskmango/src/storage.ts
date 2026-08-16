import type { Task } from './types';

const STORAGE_KEY = 'taskmango.tasks';

const SEED_TASKS: Task[] = [
  { id: 1, text: 'Water the plants', done: false },
  { id: 2, text: 'Finish Module 02 of AI Teammate 101', done: false },
  { id: 3, text: 'Review a pull request like a tech lead', done: true },
];

export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_TASKS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_TASKS;
  } catch {
    return SEED_TASKS;
  }
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
