import type { Task } from '../types';

interface Props {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export function TaskItem({ task, onToggle, onDelete }: Props) {
  const isOverdue = Boolean(task.dueDate && !task.done && task.dueDate < new Date().toISOString().slice(0, 10));

  return (
    <li className={`task-item${task.done ? ' done' : ''}${isOverdue ? ' overdue' : ''}`}>
      <label>
        <input type="checkbox" checked={task.done} onChange={onToggle} />
        <span>
          {task.text}
          {task.dueDate && <time className="due-date" dateTime={task.dueDate}>Due: {task.dueDate}</time>}
        </span>
      </label>
      <button className="delete" onClick={onDelete} aria-label="Delete task">
        ✕
      </button>
    </li>
  );
}
