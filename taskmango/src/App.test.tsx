import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('deletes the correct task when viewing the active filter', async () => {
    localStorage.setItem(
      'taskmango.tasks',
      JSON.stringify([
        { id: 1, text: 'one', done: true },
        { id: 2, text: 'two', done: false },
        { id: 3, text: 'three', done: false },
      ]),
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'Active (2)' }));
    await userEvent.click(screen.getAllByRole('button', { name: /delete task/i })[0]);

    expect(screen.queryByText('two')).not.toBeInTheDocument();
    expect(screen.getByText('three')).toBeInTheDocument();
  });
});
