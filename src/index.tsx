import React, { useEffect, useRef, useState } from 'react';
import styles from './WelcomeScreen.module.css';

interface WelcomeScreenProps {
  userName?: string;
}

const STORAGE_KEY = 'welcome-screen-dismissed';

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ userName = 'there' }) => {
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(STORAGE_KEY) === 'true';

    if (!dismissed) {
      setVisible(true);
      previouslyFocusedElement.current = document.activeElement as HTMLElement | null;
      requestAnimationFrame(() => dialogRef.current?.focus());
    }
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
    previouslyFocusedElement.current?.focus();
  };

  useEffect(() => {
    if (!visible) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        dismiss();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.overlay} role="presentation">
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-label="Welcome screen"
        tabIndex={-1}
      >
        <div className={styles.header}>
          <button className={styles.userButton} type="button" aria-label="User profile">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.33 0-6 1.79-6 4v1h12v-1c0-2.21-2.67-4-6-4Z" />
            </svg>
          </button>
        </div>
        <h1 className={styles.title}>Welcome, {userName}!</h1>
        <p className={styles.message}>Thanks for stopping by.</p>
        <button className={styles.closeButton} onClick={dismiss} type="button">
          Close
        </button>
      </div>
    </div>
  );
};

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <div>
            <p className={styles.eyebrow}>Welcome back</p>
            <h1 className={styles.title}>Sign in to continue</h1>
          </div>
          <button className={styles.userButton} type="button" aria-label="User profile">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.33 0-6 1.79-6 4v1h12v-1c0-2.21-2.67-4-6-4Z" />
            </svg>
          </button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Username</span>
            <input
              type="text"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button className={styles.submitButton} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
