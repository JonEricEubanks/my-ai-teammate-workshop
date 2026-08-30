import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
  });

  it('deletes the selected task when the active filter hides earlier tasks', async () => {
    localStorage.setItem(
      'taskmango.tasks',
      JSON.stringify([
        { id: 1, text: 'one', done: true },
        { id: 2, text: 'two', done: false },
        { id: 3, text: 'three', done: false },
      ]),
    );
    const user = userEvent.setup();

    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Active (2)' }));
    await user.click(
      within(screen.getByText('two').closest('li')!).getByRole('button', {
        name: 'Delete task',
      }),
    );

    expect(screen.queryByText('two')).not.toBeInTheDocument();
    expect(screen.getByText('three')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'All (2)' }));
    expect(screen.getByText('one')).toBeInTheDocument();
  });

  it('toggles dark mode with an accessible pressed state', async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByRole('button', { name: 'Dark mode' });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect(document.body).not.toHaveClass('dark-mode');

    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(document.body).toHaveClass('dark-mode');
    expect(localStorage.getItem('taskmango.theme')).toBe('dark');
  });

  it('restores the saved dark mode preference on load', () => {
    localStorage.setItem('taskmango.theme', 'dark');

    render(<App />);

    expect(screen.getByRole('button', { name: 'Dark mode' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(document.body).toHaveClass('dark-mode');
  });
});
