import type { Filter, Task } from '../types';

export interface TaskFilterCounts {
  all: number;
  active: number;
  completed: number;
}

interface Props {
  current: Filter;
  onChange: (filter: Filter) => void;
  counts: TaskFilterCounts;
}

export function getTaskCounts(tasks: Task[]): TaskFilterCounts {
  return {
    all: tasks.length,
    active: tasks.filter((task) => !task.done).length,
    completed: tasks.filter((task) => task.done).length,
  };
}

const FILTERS: { value: Filter; label: string; key: keyof TaskFilterCounts }[] = [
  { value: 'all', label: 'All', key: 'all' },
  { value: 'active', label: 'Active', key: 'active' },
  { value: 'completed', label: 'Completed', key: 'completed' },
];

export function TaskFilter({ current, onChange, counts }: Props) {
  return (
    <nav className="filter-bar" aria-label="Task filters">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          className={current === f.value ? 'active' : ''}
          onClick={() => onChange(f.value)}
        >
          {`${f.label} (${counts[f.key]})`}
        </button>
      ))}
    </nav>
  );
}
