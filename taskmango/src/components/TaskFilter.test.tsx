import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Task } from '../types';
import { getTaskCounts, TaskFilter } from './TaskFilter';

describe('getTaskCounts', () => {
  it('counts tasks across the full list', () => {
    const tasks: Task[] = [
      { id: 1, text: 'Buy mangoes', done: false },
      { id: 2, text: 'Write docs', done: true },
      { id: 3, text: 'Ship release', done: false },
    ];

    expect(getTaskCounts(tasks)).toEqual({ all: 3, active: 2, completed: 1 });
  });
});

describe('TaskFilter', () => {
  it('renders each filter with its count', () => {
    render(
      <TaskFilter
        current="all"
        onChange={vi.fn()}
        counts={{ all: 3, active: 2, completed: 1 }}
      />,
    );

    expect(screen.getByRole('button', { name: 'All (3)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Active (2)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Completed (1)' })).toBeInTheDocument();
  });

  it('calls onChange with the selected filter when a button is clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <TaskFilter
        current="all"
        onChange={onChange}
        counts={{ all: 3, active: 2, completed: 1 }}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Completed (1)' }));

    expect(onChange).toHaveBeenCalledWith('completed');
  });
});
