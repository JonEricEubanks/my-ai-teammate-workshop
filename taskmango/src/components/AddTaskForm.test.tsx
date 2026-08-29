import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AddTaskForm } from './AddTaskForm';

describe('AddTaskForm', () => {
  it('renders the input and submit button', () => {
    render(<AddTaskForm onAdd={() => {}} />);
    expect(screen.getByLabelText(/new task/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('calls onAdd with the entered text and clears the input', async () => {
    const onAdd = vi.fn();
    render(<AddTaskForm onAdd={onAdd} />);

    const input = screen.getByLabelText(/new task/i);
    await userEvent.type(input, 'Buy mangoes');
    await userEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(onAdd).toHaveBeenCalledWith('Buy mangoes');
    expect(input).toHaveValue('');
  });
});

// Note: TaskFilter.tsx and TaskList.tsx intentionally have no tests —
// that's a task waiting to be delegated. 🥭
