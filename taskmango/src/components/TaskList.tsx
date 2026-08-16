import type { Task } from '../types';
import { TaskItem } from './TaskItem';

interface Props {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (visibleIndex: number) => void;
}

export function TaskList({ tasks, onToggle, onDelete }: Props) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks here. Go eat a mango. 🥭</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(index)}
        />
      ))}
    </ul>
  );
}
