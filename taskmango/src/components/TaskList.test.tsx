import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Task } from '../types';
import { TaskList } from './TaskList';

describe('TaskList', () => {
  it('renders an empty state when there are no tasks', () => {
    render(<TaskList tasks={[]} onToggle={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText(/no tasks here/i)).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders tasks and forwards toggle and delete callbacks', async () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();
    const tasks: Task[] = [
      { id: 1, text: 'Buy mangoes', done: false },
      { id: 2, text: 'Write docs', done: true },
    ];

    const user = userEvent.setup();
    render(<TaskList tasks={tasks} onToggle={onToggle} onDelete={onDelete} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);

    await user.click(screen.getByRole('checkbox', { name: /buy mangoes/i }));
    expect(onToggle).toHaveBeenCalledWith(1);

    await user.click(screen.getAllByRole('button', { name: /delete task/i })[0]);
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
