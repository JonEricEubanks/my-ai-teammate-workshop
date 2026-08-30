import { useEffect, useState } from 'react';
import type { Filter, Task } from './types';
import { loadTasks, saveTasks } from './storage';
import { AddTaskForm } from './components/AddTaskForm';
import { TaskFilter } from './components/TaskFilter';
import { TaskList } from './components/TaskList';
import { maybeCelebrate } from './mangoRain';

const THEME_STORAGE_KEY = 'taskmango.theme';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [filter, setFilter] = useState<Filter>('all');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const addTask = (text: string) => {
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.done));
  };

  const visibleTasks = tasks.filter((t) =>
    filter === 'all' ? true : filter === 'active' ? !t.done : t.done,
  );
  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.done).length,
    completed: tasks.filter((t) => t.done).length,
  };

  useEffect(() => {
    maybeCelebrate(tasks);
  }, [tasks]);

  return (
    <main className="app">
      <div className="app-toolbar">
        <div>
          <h1>🥭 TaskMango</h1>
          <p className="tagline">Small tasks. Juicy productivity.</p>
        </div>
        <button
          type="button"
          className="theme-toggle"
          aria-pressed={isDarkMode}
          onClick={() => setIsDarkMode((current) => !current)}
        >
          Dark mode
        </button>
      </div>
      <AddTaskForm onAdd={addTask} />
      <TaskFilter current={filter} onChange={setFilter} counts={counts} />
      {counts.completed > 0 && (
        <button type="button" onClick={clearCompleted}>
          Clear completed
        </button>
      )}
      <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
    </main>
  );
}
