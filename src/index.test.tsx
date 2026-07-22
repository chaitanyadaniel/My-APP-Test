import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import WelcomeScreen from './index';

describe('WelcomeScreen', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows on first load', () => {
    render(<WelcomeScreen userName="Chintu" />);

    expect(screen.getByRole('dialog', { name: /welcome screen/i })).toBeInTheDocument();
    expect(screen.getByText(/welcome, chintu/i)).toBeInTheDocument();
  });

  it('does not show on subsequent loads', () => {
    localStorage.setItem('welcome-screen-dismissed', 'true');
    render(<WelcomeScreen userName="Chintu" />);

    expect(screen.queryByRole('dialog', { name: /welcome screen/i })).not.toBeInTheDocument();
  });

  it('renders a user icon in the header', () => {
    render(<WelcomeScreen userName="Chintu" />);

    expect(screen.getByRole('button', { name: /user profile/i })).toBeInTheDocument();
  });

  it('dismisses correctly and sets the flag', async () => {
    const user = userEvent.setup();
    render(<WelcomeScreen userName="Chintu" />);

    await user.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(localStorage.getItem('welcome-screen-dismissed')).toBe('true');
    });

    expect(screen.queryByRole('dialog', { name: /welcome screen/i })).not.toBeInTheDocument();
  });
});
