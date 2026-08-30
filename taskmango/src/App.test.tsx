import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('shows the clear completed button only when there are completed tasks', () => {
    localStorage.setItem(
      'taskmango.tasks',
      JSON.stringify([
        { id: 1, text: 'one', done: false },
        { id: 2, text: 'two', done: false },
      ]),
    );

    const { unmount } = render(<App />);
    expect(screen.queryByRole('button', { name: 'Clear completed' })).not.toBeInTheDocument();
    unmount();

    localStorage.setItem(
      'taskmango.tasks',
      JSON.stringify([
        { id: 1, text: 'one', done: true },
        { id: 2, text: 'two', done: false },
      ]),
    );

    render(<App />);
    expect(screen.getByRole('button', { name: 'Clear completed' })).toBeInTheDocument();
  });

  it('removes all completed tasks when the clear completed button is clicked', async () => {
    localStorage.setItem(
      'taskmango.tasks',
      JSON.stringify([
        { id: 1, text: 'one', done: true },
        { id: 2, text: 'two', done: false },
        { id: 3, text: 'three', done: true },
      ]),
    );
    const user = userEvent.setup();

    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Clear completed' }));

    expect(screen.queryByText('one')).not.toBeInTheDocument();
    expect(screen.queryByText('three')).not.toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Clear completed' })).not.toBeInTheDocument();
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
});
