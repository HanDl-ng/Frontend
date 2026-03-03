import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In — HanDl',
  description: 'Sign in to your HanDl account to manage conversations, orders, and products.',
  openGraph: {
    title: 'Sign In — HanDl',
    description: 'Sign in to your HanDl account.',
    url: 'https://handl-ng.com/signin',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-page">
      {/* Floating mesh gradients */}
      <div className="auth-mesh auth-mesh-1" />
      <div className="auth-mesh auth-mesh-2" />
      <div className="auth-mesh auth-mesh-3" />

      {/* Subtle grid background */}
      <div className="auth-grid" />

      <div className="auth-wrapper">
        {/* Logo */}
        <a href="/" className="auth-logo">
          <span className="logo-mark" />
          HanDl
        </a>

        {children}

        <p className="auth-footer-text">
          © {new Date().getFullYear()} HanDl. All rights reserved.
        </p>
      </div>
    </div>
  );
}
