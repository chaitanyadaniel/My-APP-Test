import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import LoginPage from './index';

describe('WelcomeScreen', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the login page heading', () => {
    render(<LoginPage />);

    expect(screen.getByRole('heading', { name: /sign in to continue/i })).toBeInTheDocument();
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
  });

  it('does not render the old welcome modal', () => {
    localStorage.setItem('welcome-screen-dismissed', 'true');
    render(<LoginPage />);

    expect(screen.queryByRole('dialog', { name: /welcome screen/i })).not.toBeInTheDocument();
  });

  it('renders a user icon in the header', () => {
    render(<LoginPage />);

    expect(screen.getByRole('button', { name: /user profile/i })).toBeInTheDocument();
  });

  it('renders a login form with username, password, and submit controls', () => {
    render(<LoginPage />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('renders the login form without the old close action', () => {
    render(<LoginPage />);

    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });
});
