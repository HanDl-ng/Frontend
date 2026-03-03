'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="landing-page" style={{ cursor: 'auto' }}>
      <Navbar />
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '120px 40px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 36, letterSpacing: '-1px', color: 'var(--ink)', marginBottom: 12 }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: 15, color: 'var(--ink-m)', lineHeight: 1.7 }}>
            Have a question, need help, or want to explore Enterprise? We usually respond within a few hours.
          </p>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '48px 24px', background: 'rgba(46,139,110,.04)', borderRadius: 16, border: '1px solid rgba(46,139,110,.12)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✉️</div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: 'var(--ink)', marginBottom: 8 }}>Message sent!</h3>
            <p style={{ fontSize: 14, color: 'var(--ink-m)' }}>We&apos;ll get back to you shortly. Check your email for a confirmation.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'grid', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Name</label>
                <input required type="text" placeholder="Your name" className="auth-input" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Email</label>
                <input required type="email" placeholder="you@example.com" className="auth-input" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Subject</label>
              <select className="auth-input" style={{ width: '100%' }} defaultValue="">
                <option value="" disabled>Select a topic</option>
                <option>General inquiry</option>
                <option>Technical support</option>
                <option>Enterprise / Sales</option>
                <option>Partnership</option>
                <option>Bug report</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Message</label>
              <textarea required placeholder="Tell us how we can help..." className="auth-input" rows={5} style={{ width: '100%', resize: 'vertical', fontFamily: "'DM Sans', sans-serif" }} />
            </div>
            <button type="submit" className="btn btn-teal btn-lg" style={{ width: '100%' }}>Send Message →</button>
          </form>
        )}

        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, textAlign: 'center' }}>
          {[
            { icon: '📧', label: 'Email', value: 'hello@handl-ng.com' },
            { icon: '𝕏', label: 'Twitter', value: '@handl' },
            { icon: '⏰', label: 'Response time', value: '< 4 hours' },
          ].map((c, i) => (
            <div key={i} style={{ padding: 20, background: '#fff', borderRadius: 12, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-f)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{c.value}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
