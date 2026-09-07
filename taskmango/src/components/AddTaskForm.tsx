import { useState } from 'react';

interface Props {
  onAdd: (text: string, dueDate?: string) => void;
}

export function AddTaskForm({ onAdd }: Props) {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (dueDate) {
      onAdd(text, dueDate);
    } else {
      onAdd(text);
    }
    setText('');
    setDueDate('');
  };

  return (
    <form className="add-task" onSubmit={submit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs doing?"
        aria-label="New task"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        aria-label="Due date"
      />
      <button type="submit">Add</button>
    </form>
  );
}
