import type { Filter } from '../types';

interface Props {
  current: Filter;
  onChange: (filter: Filter) => void;
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function TaskFilter({ current, onChange }: Props) {
  return (
    <nav className="filter-bar" aria-label="Task filters">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          className={current === f.value ? 'active' : ''}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </nav>
  );
}
