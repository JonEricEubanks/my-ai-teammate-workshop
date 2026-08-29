import { useEffect, useState } from 'react';
import type { Filter, Task } from './types';
import { loadTasks, saveTasks } from './storage';
import { AddTaskForm } from './components/AddTaskForm';
import { TaskFilter } from './components/TaskFilter';
import { TaskList } from './components/TaskList';
import { maybeCelebrate } from './mangoRain';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (text: string) => {
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  // NOTE: deletes by position in the *visible* (filtered) list.
  // This is seeded issue #2 — do not fix it yourself; delegate it. 🥭
  const deleteTask = (visibleIndex: number) => {
    setTasks(tasks.filter((_, i) => i !== visibleIndex));
  };

  const visibleTasks = tasks.filter((t) =>
    filter === 'all' ? true : filter === 'active' ? !t.done : t.done,
  );

  useEffect(() => {
    maybeCelebrate(tasks);
  }, [tasks]);

  return (
    <main className="app">
      <h1>🥭 TaskMango</h1>
      <p className="tagline">Small tasks. Juicy productivity.</p>
      <AddTaskForm onAdd={addTask} />
      <TaskFilter current={filter} onChange={setFilter} />
      <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
    </main>
  );
}
