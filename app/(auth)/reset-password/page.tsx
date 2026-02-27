'use client';

import { useState, FormEvent, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Toast, { ToastType } from '@/components/Toast';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    if (!password || !confirmPassword) {
      showToast('Please fill in both fields.', 'error');
      return;
    }
    if (password.length < 8) {
      showToast('Password must be at least 8 characters.', 'error');
      return;
    }
    if (password !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      showToast('Password reset successfully!', 'success');
    }, 1500);
  };

  if (success) {
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
            <div className="auth-icon-circle auth-icon-success">
              <span>✓</span>
            </div>
            <h1 className="auth-title">All done!</h1>
            <p className="auth-subtitle">
              Your password has been reset successfully. You can now sign in with your new password.
            </p>
          </div>
          <Link href="/login" className="btn btn-teal btn-lg auth-submit" style={{ textAlign: 'center', width: '100%' }}>
            Back to Sign In
          </Link>
        </div>
      </>
    );
  }

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
            <span>🔐</span>
          </div>
          <h1 className="auth-title">Set a new password</h1>
          <p className="auth-subtitle">
            Create a strong password for <strong>{email || 'your account'}</strong>.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="password">New password</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">🔒</span>
              <input
                id="password"
                className="auth-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
                autoFocus
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
            {password.length > 0 && (
              <div className="pw-strength">
                <div className={`pw-bar ${password.length >= 12 ? 'pw-strong' : password.length >= 8 ? 'pw-medium' : 'pw-weak'}`} />
                <span className="pw-label">
                  {password.length >= 12 ? 'Strong' : password.length >= 8 ? 'Good' : 'Too weak'}
                </span>
              </div>
            )}
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="confirm-password">Confirm new password</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">🔒</span>
              <input
                id="confirm-password"
                className="auth-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-teal btn-lg auth-submit" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : 'Reset Password'}
          </button>
        </form>

        <p className="auth-switch">
          <Link href="/login" className="auth-switch-link">← Back to login</Link>
        </p>
      </div>
    </>
  );
}
