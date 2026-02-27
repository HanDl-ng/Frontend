'use client';

import { useState, useEffect, useRef, FormEvent, useCallback, KeyboardEvent, ClipboardEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Toast, { ToastType } from '@/components/Toast';

const OTP_LENGTH = 6;
const OTP_EXPIRY_SECONDS = 10 * 60; // 10 minutes

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const flow = searchParams.get('flow') || 'reset'; // 'login' | 'signup' | 'reset'

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_SECONDS);
  const [expired, setExpired] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean }>({
    message: '',
    type: 'success',
    visible: false,
  });

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    setToast({ message, type, visible: true });
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setExpired(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (pastedData) {
      const newOtp = [...otp];
      pastedData.split('').forEach((char, i) => {
        newOtp[i] = char;
      });
      setOtp(newOtp);
      const focusIdx = Math.min(pastedData.length, OTP_LENGTH - 1);
      inputRefs.current[focusIdx]?.focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(OTP_EXPIRY_SECONDS);
    setExpired(false);
    setOtp(Array(OTP_LENGTH).fill(''));
    showToast('New OTP sent to your email!', 'info');
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < OTP_LENGTH) {
      showToast('Please enter the complete 6-digit code.', 'error');
      return;
    }
    if (expired) {
      showToast('OTP has expired. Please request a new one.', 'error');
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      showToast('Code verified successfully!', 'success');
      setTimeout(() => {
        if (flow === 'login' || flow === 'signup') {
          router.push('/dashboard');
        } else {
          router.push(`/reset-password?email=${encodeURIComponent(email)}&token=${code}`);
        }
      }, 1200);
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
            <span>📬</span>
          </div>
          <h1 className="auth-title">Check your email</h1>
          <p className="auth-subtitle">
            We sent a 6-digit code to{' '}
            <strong>{email || 'your email'}</strong>. Enter it below.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="otp-row">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => { inputRefs.current[i] = el; }}
                className={`otp-input ${digit ? 'otp-filled' : ''} ${expired ? 'otp-expired' : ''}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                onPaste={i === 0 ? handlePaste : undefined}
                disabled={expired}
                autoFocus={i === 0}
              />
            ))}
          </div>

          <div className="otp-timer">
            {expired ? (
              <span className="otp-expired-text">Code expired</span>
            ) : (
              <>
                <span className="otp-timer-icon">⏱</span>
                <span>Expires in <strong>{formatTime(timeLeft)}</strong></span>
              </>
            )}
          </div>

          <button type="submit" className="btn btn-teal btn-lg auth-submit" disabled={loading || expired}>
            {loading ? <span className="auth-spinner" /> : 'Verify Code'}
          </button>
        </form>

        <p className="auth-switch">
          Didn&apos;t receive the code?{' '}
          <button type="button" className="auth-switch-link auth-resend-btn" onClick={handleResend}>
            Resend code
          </button>
        </p>

        <p className="auth-switch" style={{ marginTop: 8 }}>
          <Link href="/login" className="auth-switch-link">← Back to login</Link>
        </p>
      </div>
    </>
  );
}
