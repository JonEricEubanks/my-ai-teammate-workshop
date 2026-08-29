import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TaskFilter } from './TaskFilter';

const counts = { all: 3, active: 2, completed: 1 };

describe('TaskFilter', () => {
  it('renders all three filter buttons with correct labels and counts', () => {
    render(<TaskFilter current="all" onChange={() => {}} counts={counts} />);

    expect(screen.getByRole('button', { name: 'All (3)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Active (2)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Completed (1)' })).toBeInTheDocument();
  });

  it("applies the 'active' class only to the current filter's button", () => {
    render(<TaskFilter current="active" onChange={() => {}} counts={counts} />);

    expect(screen.getByRole('button', { name: 'All (3)' })).not.toHaveClass('active');
    expect(screen.getByRole('button', { name: 'Active (2)' })).toHaveClass('active');
    expect(screen.getByRole('button', { name: 'Completed (1)' })).not.toHaveClass('active');
  });

  it('calls onChange with the correct filter value when a button is clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TaskFilter current="all" onChange={onChange} counts={counts} />);

    await user.click(screen.getByRole('button', { name: 'Completed (1)' }));
    expect(onChange).toHaveBeenCalledWith('completed');

    await user.click(screen.getByRole('button', { name: 'Active (2)' }));
    expect(onChange).toHaveBeenCalledWith('active');

    expect(onChange).toHaveBeenCalledTimes(2);
  });
});
