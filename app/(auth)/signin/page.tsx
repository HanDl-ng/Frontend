'use client';

import { useState, FormEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Toast, { ToastType } from '@/components/Toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    if (!email || !password) {
      showToast('Please fill in all fields.', 'error');
      return;
    }
    setLoading(true);

    // Simulate API call — sends OTP to email
    setTimeout(() => {
      setLoading(false);
      showToast('OTP sent to your email. Please verify.', 'success');
      setTimeout(() => {
        router.push(`/verify-otp?email=${encodeURIComponent(email)}&flow=login`);
      }, 800);
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
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your HanDl account</p>
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
              />
            </div>
          </div>

          <div className="auth-field">
            <div className="auth-label-row">
              <label className="auth-label" htmlFor="password">Password</label>
              <Link href="/forgot-password" className="auth-link-sm">Forgot password?</Link>
            </div>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">🔒</span>
              <input
                id="password"
                className="auth-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-toggle-pw"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-teal btn-lg auth-submit" disabled={loading}>
            {loading ? (
              <span className="auth-spinner" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <div className="auth-social-row">
          <button className="auth-social-btn" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>
        </div>

        <p className="auth-switch">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="auth-switch-link">Create one</Link>
        </p>
      </div>
    </>
  );
}
