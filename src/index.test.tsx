import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
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

  it('shows feedback when the profile button is clicked', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.click(screen.getByRole('button', { name: /user profile/i }));

    expect(screen.getByText(/user profile is not available yet/i)).toBeInTheDocument();
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

  it('updates the input values as the user types', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText(/username/i), 'demo');
    await user.type(screen.getByLabelText(/password/i), 'secret');

    expect(screen.getByLabelText(/username/i)).toHaveValue('demo');
    expect(screen.getByLabelText(/password/i)).toHaveValue('secret');
  });

  it('shows validation feedback when required fields are empty', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/username and password are required/i)).toBeInTheDocument();
  });

  it('shows a success message for a valid login attempt', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText(/username/i), 'demo');
    await user.type(screen.getByLabelText(/password/i), 'password');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByRole('button', { name: /submitting/i })).toBeDisabled();
    expect(await screen.findByText(/login successful/i)).toBeInTheDocument();
  });
});
