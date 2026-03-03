'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const categories = [
  'Food & Restaurant', 'Fashion & Clothing', 'Beauty & Cosmetics', 'Electronics',
  'Grocery & Supermarket', 'Health & Pharmacy', 'Home & Furniture', 'Services',
  'Education', 'Other',
];

const channels = [
  { id: 'whatsapp', label: 'WhatsApp', icon: '💬', desc: 'Most popular in Nigeria' },
  { id: 'webchat', label: 'Web Chat', icon: '🌐', desc: 'Embed on your website' },
  { id: 'email', label: 'Email', icon: '📧', desc: 'Support inbox' },
  { id: 'instagram', label: 'Instagram', icon: '📸', desc: 'DM automation (coming soon)' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [currency, setCurrency] = useState('NGN');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  // Step 3 — first product
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  const toggleChannel = (id: string) => {
    setSelectedChannels(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const canProceed = () => {
    if (step === 0) return businessName.trim().length > 0 && category.length > 0;
    if (step === 1) return true; // region has defaults
    if (step === 2) return selectedChannels.length > 0;
    if (step === 3) return true; // product is optional
    return true;
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      router.push('/onboarding/complete');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      {/* Progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: 'var(--paper)', zIndex: 50 }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'var(--teal)', borderRadius: '0 2px 2px 0', transition: 'width .4s cubic-bezier(.4,0,.2,1)' }} />
      </div>

      {/* Header */}
      <div style={{ padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: 'var(--ink)', textDecoration: 'none' }}>HanDl</a>
        <span style={{ fontSize: 12, color: 'var(--ink-f)' }}>Step {step + 1} of {totalSteps}</span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px 80px' }}>
        <div style={{ width: '100%', maxWidth: 520 }}>

          {/* Step 0: Business info */}
          {step === 0 && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: '-.5px', color: 'var(--ink)', marginBottom: 8 }}>
                Let&apos;s set up your business
              </h2>
              <p style={{ fontSize: 14, color: 'var(--ink-m)', marginBottom: 32, lineHeight: 1.6 }}>
                This helps your AI agent represent you accurately.
              </p>
              <div style={{ display: 'grid', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Business name</label>
                  <input
                    type="text" value={businessName} onChange={e => setBusinessName(e.target.value)}
                    placeholder="e.g. Mama's Kitchen" className="auth-input" style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Category</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {categories.map(c => (
                      <button key={c} onClick={() => setCategory(c)} style={{
                        padding: '8px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer', transition: 'all .15s',
                        border: category === c ? '1.5px solid var(--teal)' : '1px solid var(--border)',
                        background: category === c ? 'rgba(46,139,110,.06)' : '#fff',
                        color: category === c ? 'var(--teal)' : 'var(--ink-m)', fontWeight: category === c ? 600 : 400,
                      }}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Region */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: '-.5px', color: 'var(--ink)', marginBottom: 8 }}>
                Where are you based?
              </h2>
              <p style={{ fontSize: 14, color: 'var(--ink-m)', marginBottom: 32, lineHeight: 1.6 }}>
                We&apos;ll set defaults for currency, language, and timezone.
              </p>
              <div style={{ display: 'grid', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Country</label>
                  <select value={country} onChange={e => setCountry(e.target.value)} className="auth-input" style={{ width: '100%' }}>
                    <option>Nigeria</option>
                    <option>Ghana</option>
                    <option>Kenya</option>
                    <option>South Africa</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Currency</label>
                  <select value={currency} onChange={e => setCurrency(e.target.value)} className="auth-input" style={{ width: '100%' }}>
                    <option value="NGN">₦ Nigerian Naira (NGN)</option>
                    <option value="GHS">₵ Ghanaian Cedi (GHS)</option>
                    <option value="KES">KSh Kenyan Shilling (KES)</option>
                    <option value="ZAR">R South African Rand (ZAR)</option>
                    <option value="GBP">£ British Pound (GBP)</option>
                    <option value="USD">$ US Dollar (USD)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Channels */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: '-.5px', color: 'var(--ink)', marginBottom: 8 }}>
                Connect a channel
              </h2>
              <p style={{ fontSize: 14, color: 'var(--ink-m)', marginBottom: 32, lineHeight: 1.6 }}>
                Where do your customers reach you? Pick at least one.
              </p>
              <div style={{ display: 'grid', gap: 12 }}>
                {channels.map(ch => (
                  <button key={ch.id} onClick={() => toggleChannel(ch.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderRadius: 12, cursor: 'pointer',
                    border: selectedChannels.includes(ch.id) ? '2px solid var(--teal)' : '1.5px solid var(--border)',
                    background: selectedChannels.includes(ch.id) ? 'rgba(46,139,110,.04)' : '#fff',
                    textAlign: 'left', transition: 'all .15s',
                  }}>
                    <span style={{ fontSize: 28 }}>{ch.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{ch.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-f)' }}>{ch.desc}</div>
                    </div>
                    <div style={{
                      width: 22, height: 22, borderRadius: 6, border: selectedChannels.includes(ch.id) ? 'none' : '1.5px solid var(--border)',
                      background: selectedChannels.includes(ch.id) ? 'var(--teal)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s',
                    }}>
                      {selectedChannels.includes(ch.id) && <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>✓</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: First product */}
          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: '-.5px', color: 'var(--ink)', marginBottom: 8 }}>
                Add your first product
              </h2>
              <p style={{ fontSize: 14, color: 'var(--ink-m)', marginBottom: 32, lineHeight: 1.6 }}>
                Optional — you can always add products later from your dashboard.
              </p>
              <div style={{ display: 'grid', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Product name</label>
                  <input
                    type="text" value={productName} onChange={e => setProductName(e.target.value)}
                    placeholder="e.g. Jollof Rice (Large)" className="auth-input" style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Price</label>
                  <input
                    type="text" value={productPrice} onChange={e => setProductPrice(e.target.value)}
                    placeholder="e.g. 3500" className="auth-input" style={{ width: '100%' }}
                  />
                </div>
              </div>
              <button onClick={() => {}} className="btn btn-ghost" style={{ marginTop: 16, fontSize: 13 }}>
                Skip for now
              </button>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 40 }}>
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} className="btn btn-ghost" style={{ fontSize: 13 }}>← Back</button>
            ) : <div />}
            <button onClick={handleNext} disabled={!canProceed()} className="btn btn-teal btn-lg" style={{
              opacity: canProceed() ? 1 : 0.5, pointerEvents: canProceed() ? 'auto' : 'none',
            }}>
              {step === totalSteps - 1 ? 'Finish Setup →' : 'Continue →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
