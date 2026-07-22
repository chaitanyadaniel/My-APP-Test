import React, { useEffect, useRef, useState } from 'react';
import styles from './WelcomeScreen.module.css';

interface WelcomeScreenProps {
  userName?: string;
}

const STORAGE_KEY = 'welcome-screen-dismissed';

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ userName = 'there' }) => {
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
        <h1 className={styles.title}>Welcome, {userName}!</h1>
        <p className={styles.message}>Thanks for stopping by.</p>
        <button className={styles.closeButton} onClick={dismiss} type="button">
          Close
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
