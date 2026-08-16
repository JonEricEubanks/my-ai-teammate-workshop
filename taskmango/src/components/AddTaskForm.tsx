import { useState } from 'react';

interface Props {
  onAdd: (text: string) => void;
}

export function AddTaskForm({ onAdd }: Props) {
  const [text, setText] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedText = text.trim();
    if (!trimmedText) {
      return;
    }

    onAdd(trimmedText);
    setText('');
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
      <button type="submit">Add</button>
    </form>
  );
}
