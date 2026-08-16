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
        {/*
          🔓 SEEDED VULNERABILITY (Module 04):
          task.text is rendered as raw HTML — a task like
          <img src=x onerror=alert(1)> executes script.
          Do NOT fix this by hand before Module 04;
          CodeQL + Copilot Autofix will handle it.
        */}
        <span dangerouslySetInnerHTML={{ __html: task.text }} />
      </label>
      <button className="delete" onClick={onDelete} aria-label="Delete task">
        ✕
      </button>
    </li>
  );
}
