import React, { useEffect, useMemo, useState } from 'react';
import styles from './WelcomeScreen.module.css';

interface Order {
  number: string;
  date: string;
  total: string;
  status: 'Delivered' | 'Processing' | 'Cancelled' | 'Refunded';
}

const demoOrders: Order[] = [
  { number: '#1042', date: 'Jul 12, 2026', total: '$129.99', status: 'Delivered' },
  { number: '#1038', date: 'Jun 28, 2026', total: '$74.50', status: 'Processing' },
  { number: '#1029', date: 'Jun 03, 2026', total: '$210.00', status: 'Delivered' },
];

interface Product {
  name: string;
  price: string;
  description: string;
  badge: string;
}

const dummyProducts: Product[] = [
  { name: 'Aurora Lamp', price: '$89', description: 'Soft ambient lighting for cozy evenings.', badge: 'New' },
  { name: 'Nimbus Backpack', price: '$74', description: 'Weather-ready carryall with smart pockets.', badge: 'Best Seller' },
  { name: 'Terra Mug', price: '$24', description: 'Ceramic comfort crafted for daily rituals.', badge: 'Limited' },
  { name: 'Halo Headphones', price: '$149', description: 'Immersive sound in a lightweight frame.', badge: 'Trending' },
  { name: 'Cove Chair', price: '$199', description: 'Ergonomic support with sculpted comfort.', badge: 'Editor Pick' },
  { name: 'Lumen Watch', price: '$129', description: 'Minimal design with a bright, modern finish.', badge: 'Hot Deal' },
];

export const ProductListingPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.productShell}>
        <div className={styles.productHeader}>
          <div>
            <p className={styles.eyebrow}>Shop</p>
            <h1 className={styles.title}>Featured Products</h1>
            <p className={styles.productSubtitle}>Discover our latest picks curated for everyday living.</p>
          </div>
          <button className={styles.userButton} type="button" aria-label="View cart">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 6h14l-1.5 7.5a2 2 0 0 1-2 1.5H9.5A2 2 0 0 1 7.5 13L7 6Zm-2 0H3v-2h3l1 2Zm2 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
            </svg>
          </button>
        </div>

        <div className={styles.productGrid}>
          {dummyProducts.map((product) => (
            <article className={styles.productCard} key={product.name}>
              <div className={styles.productBadge}>{product.badge}</div>
              <h2 className={styles.productName}>{product.name}</h2>
              <p className={styles.productDescription}>{product.description}</p>
              <div className={styles.productFooter}>
                <span className={styles.productPrice}>{product.price}</span>
                <button className={styles.productButton} type="button">
                  Add to bag
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export const LoginPage: React.FC = () => {
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

export const AccountOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = window.setTimeout(() => {
      try {
        setOrders(demoOrders);
        setIsLoading(false);
      } catch {
        setError('We could not load your orders right now.');
        setIsLoading(false);
      }
    }, 300);

    return () => window.clearTimeout(loadOrders);
  }, []);

  const latestStatus = useMemo(() => orders[0]?.status ?? 'No orders yet', [orders]);

  const handleProfileClick = () => {
    setError('Account profile is coming soon.');
  };

  return (
    <div className={styles.page}>
      <div className={styles.ordersCard}>
        <div className={styles.ordersHeader}>
          <div>
            <p className={styles.eyebrow}>Account</p>
            <h1 className={styles.title}>My Orders</h1>
          </div>
          <button className={styles.userButton} type="button" aria-label="Account profile" onClick={handleProfileClick}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.33 0-6 1.79-6 4v1h12v-1c0-2.21-2.67-4-6-4Z" />
            </svg>
          </button>
        </div>

        <div className={styles.summaryRow}>
          <div className={styles.summaryBox}>
            <span>Total orders</span>
            <strong>{orders.length}</strong>
          </div>
          <div className={styles.summaryBox}>
            <span>Latest status</span>
            <strong>{latestStatus}</strong>
          </div>
        </div>

        {isLoading ? <p className={styles.statusMessage}>Loading your orders…</p> : null}
        {error ? <p className={styles.errorMessage}>{error}</p> : null}
        {!isLoading && !error && orders.length === 0 ? <p className={styles.statusMessage}>You have no orders yet.</p> : null}
        {!isLoading && !error && orders.length > 0 ? (
          <ul className={styles.orderList}>
            {orders.map((order) => (
              <li className={styles.orderItem} key={order.number}>
                <div>
                  <p className={styles.orderNumber}>{order.number}</p>
                  <p className={styles.orderMeta}>{order.date}</p>
                </div>
                <div className={styles.orderMetaGroup}>
                  <span className={styles.orderTotal}>{order.total}</span>
                  <span className={`${styles.orderStatus} ${styles[`status${order.status}`]}`}>{order.status}</span>
                  <button
                    className={styles.viewDetailsButton}
                    type="button"
                    onClick={() => setError(`Details for ${order.number} are coming soon.`)}
                  >
                    View details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export const AccountPreferencesPage: React.FC = () => {
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [smsUpdates, setSmsUpdates] = useState(false);
  const [language, setLanguage] = useState('English');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setStatusMessage('');

    window.setTimeout(() => {
      setIsSaving(false);
      setStatusMessage('Preferences saved successfully.');
    }, 400);
  };

  return (
    <div className={styles.page}>
      <div className={styles.preferencesCard}>
        <div className={styles.ordersHeader}>
          <div>
            <p className={styles.eyebrow}>Account</p>
            <h1 className={styles.title}>Preferences</h1>
          </div>
          <button className={styles.userButton} type="button" aria-label="Account profile">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.33 0-6 1.79-6 4v1h12v-1c0-2.21-2.67-4-6-4Z" />
            </svg>
          </button>
        </div>

        <form className={styles.preferencesForm} onSubmit={handleSave} noValidate>
          <label className={styles.preferenceRow} htmlFor="emailUpdates">
            <span>Email updates</span>
            <input
              id="emailUpdates"
              type="checkbox"
              checked={emailUpdates}
              onChange={(event) => setEmailUpdates(event.target.checked)}
            />
          </label>

          <label className={styles.preferenceRow} htmlFor="smsUpdates">
            <span>SMS updates</span>
            <input
              id="smsUpdates"
              type="checkbox"
              checked={smsUpdates}
              onChange={(event) => setSmsUpdates(event.target.checked)}
            />
          </label>

          <label className={styles.field} htmlFor="language">
            <span>Preferred language</span>
            <select id="language" value={language} onChange={(event) => setLanguage(event.target.value)}>
              <option value="English">English</option>
              <option value="Español">Español</option>
              <option value="Français">Français</option>
            </select>
          </label>

          {statusMessage ? (
            <p className={styles.success} role="status" aria-live="polite">
              {statusMessage}
            </p>
          ) : null}

          <button className={styles.submitButton} type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save preferences'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductListingPage;
