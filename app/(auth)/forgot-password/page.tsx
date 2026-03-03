'use client';

import { useState, FormEvent, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Toast, { ToastType } from '@/components/Toast';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean }>({
    message: '',
    type: 'success',
    visible: false,
  });

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    setToast({ message, type, visible: true });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email address.', 'error');
      return;
    }
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      showToast('OTP sent! Check your email inbox.', 'success');
      // Navigate to OTP page after a short delay
      setTimeout(() => {
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      }, 1500);
    }, 1500);
  };

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast(prev => ({ ...prev, visible: false }))}
      />

      <div className="auth-card reveal visible">
        <div className="auth-card-header">
          <div className="auth-icon-circle">
            <span>🔑</span>
          </div>
          <h1 className="auth-title">Forgot your password?</h1>
          <p className="auth-subtitle">
            No worries — enter your email and we&apos;ll send you a one-time code to reset it.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="email">Email address</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">✉</span>
              <input
                id="email"
                className="auth-input"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
            </div>
          </div>

          <button type="submit" className="btn btn-teal btn-lg auth-submit" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : 'Send Reset Code'}
          </button>
        </form>

        <p className="auth-switch">
          Remember your password?{' '}
          <Link href="/signin" className="auth-switch-link">Back to sign in</Link>
        </p>
      </div>
    </>
  );
}
