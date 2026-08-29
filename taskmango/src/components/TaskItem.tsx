import type { Task } from '../types';

interface Props {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <li className={`task-item${task.done ? ' done' : ''}`}>
      <label>
        <input type="checkbox" checked={task.done} onChange={onToggle} />
        <span>{task.text}</span>
      </label>
      <button className="delete" onClick={onDelete} aria-label="Delete task">
        ✕
      </button>
    </li>
  );
}
