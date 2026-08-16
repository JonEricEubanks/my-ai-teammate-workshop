import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TaskItem } from './TaskItem';

describe('TaskItem', () => {
  it('renders task text as plain text', () => {
    render(
      <TaskItem
        task={{ id: 1, text: '<img src=x onerror=alert(1)>', done: false }}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText('<img src=x onerror=alert(1)>')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
