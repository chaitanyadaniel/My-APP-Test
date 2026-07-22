import React, { useState } from 'react';
import styles from './WelcomeScreen.module.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      setIsSuccess(false);
      return;
    }

    setError('');
    setIsSubmitting(true);
    setIsSuccess(false);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setPassword('');
    }, 500);
  };

  const handleProfileClick = () => {
    setError('User profile is not available yet.');
    setIsSuccess(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <div>
            <p className={styles.eyebrow}>Welcome back</p>
            <h1 className={styles.title}>Sign in to continue</h1>
          </div>
          <button className={styles.userButton} type="button" aria-label="User profile" onClick={handleProfileClick}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.33 0-6 1.79-6 4v1h12v-1c0-2.21-2.67-4-6-4Z" />
            </svg>
          </button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.field} htmlFor="username">
            <span>Username</span>
            <input
              id="username"
              type="text"
              name="username"
              autoComplete="username"
              required
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                if (error) {
                  setError('');
                }
              }}
            />
          </label>
          <label className={styles.field} htmlFor="password">
            <span>Password</span>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (error) {
                  setError('');
                }
              }}
            />
          </label>
          <input type="hidden" name="csrfToken" value="placeholder-token" />
          {error ? (
            <p className={styles.feedback} role="alert" aria-live="polite">
              {error}
            </p>
          ) : null}
          {isSuccess ? (
            <p className={styles.success} role="status" aria-live="polite">
              Login successful
            </p>
          ) : null}
          <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
