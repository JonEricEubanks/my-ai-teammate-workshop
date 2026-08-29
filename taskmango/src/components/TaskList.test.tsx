import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TaskList } from './TaskList';
import type { Task } from '../types';

const tasks: Task[] = [
  { id: 1, text: 'Buy mangoes', done: false },
  { id: 2, text: 'Eat mangoes', done: true },
];

describe('TaskList', () => {
  it('renders the empty-state message when there are no tasks', () => {
    render(<TaskList tasks={[]} onToggle={() => {}} onDelete={() => {}} />);

    expect(screen.getByText('No tasks here. Go eat a mango. 🥭')).toHaveClass('empty');
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders one list item per task with correct text and checked state', () => {
    render(<TaskList tasks={tasks} onToggle={() => {}} onDelete={() => {}} />);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);

    expect(screen.getByText('Buy mangoes')).toBeInTheDocument();
    expect(screen.getByText('Eat mangoes')).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();
  });

  it("calls onToggle with the task's id when its checkbox is clicked", async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();
    render(<TaskList tasks={tasks} onToggle={onToggle} onDelete={() => {}} />);

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);
    expect(onToggle).toHaveBeenCalledWith(1);

    await user.click(checkboxes[1]);
    expect(onToggle).toHaveBeenCalledWith(2);
  });

  it("calls onDelete with the task's id when its delete button is clicked", async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(<TaskList tasks={tasks} onToggle={() => {}} onDelete={onDelete} />);

    const deleteButtons = screen.getAllByRole('button', { name: 'Delete task' });
    expect(deleteButtons).toHaveLength(2);

    await user.click(deleteButtons[1]);
    expect(onDelete).toHaveBeenCalledWith(2);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
