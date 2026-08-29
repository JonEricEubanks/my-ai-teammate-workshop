import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TaskFilter } from './TaskFilter';

describe('TaskFilter', () => {
  it('shows counts for every filter', () => {
    render(
      <TaskFilter
        current="all"
        onChange={() => {}}
        counts={{ all: 3, active: 2, completed: 1 }}
      />,
    );

    expect(screen.getByRole('button', { name: 'All (3)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Active (2)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Completed (1)' })).toBeInTheDocument();
  });
});
