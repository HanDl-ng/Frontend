import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog — HanDl',
  description: 'See what\'s new in HanDl. Recent updates, improvements, and bug fixes.',
  openGraph: {
    title: 'Changelog — HanDl',
    description: 'See what\'s new in HanDl. Recent updates, improvements, and bug fixes.',
    url: 'https://handl-ng.com/changelog',
  },
};

const changelog = [
  {
    version: '1.3.0',
    date: 'January 15, 2025',
    tag: 'Feature',
    items: [
      'Dark mode support for the entire dashboard',
      'Keyboard shortcuts for quick navigation (G+D, G+C, G+O, etc.)',
      'Cookie consent banner for GDPR compliance',
      'Onboarding tooltips for first-time users',
      'Global search with Cmd+K command palette',
    ],
  },
  {
    version: '1.2.0',
    date: 'January 8, 2025',
    tag: 'Improvement',
    items: [
      'Redesigned orders page with real-time status tracking',
      'AI agent now handles product inquiries and FAQs autonomously',
      'Improved mobile responsive layout across all dashboard pages',
      'Performance optimizations — 40% faster page loads',
    ],
  },
  {
    version: '1.1.0',
    date: 'December 20, 2024',
    tag: 'Feature',
    items: [
      'Storefront builder — create a public product catalog',
      'WhatsApp Business integration with auto-replies',
      'Product management with categories and stock tracking',
      'Multi-channel conversation routing',
    ],
  },
  {
    version: '1.0.0',
    date: 'December 1, 2024',
    tag: 'Launch',
    items: [
      'Initial public release of HanDl',
      'AI-powered conversation handling',
      'Order management system',
      'Dashboard with real-time metrics',
      'Settings and team management',
    ],
  },
];

const tagColors: Record<string, string> = {
  Feature: '#2e8b6e',
  Improvement: '#3b82f6',
  Fix: '#f59e0b',
  Launch: '#8b5cf6',
};

export default function ChangelogPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '120px 24px 80px' }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: '-1.5px', color: 'var(--ink)', marginBottom: 8 }}>
          Changelog
        </h1>
        <p style={{ fontSize: 15, color: 'var(--ink-f)', marginBottom: 48, lineHeight: 1.6 }}>
          New updates and improvements to HanDl.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {changelog.map((release, idx) => (
            <div key={release.version} style={{ display: 'flex', gap: 32, paddingBottom: 40, position: 'relative' }}>
              {/* Timeline line */}
              <div style={{ width: 1, flexShrink: 0, position: 'relative' }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: tagColors[release.tag] || 'var(--teal)',
                  position: 'absolute', top: 6, left: -4.5,
                }} />
                {idx < changelog.length - 1 && (
                  <div style={{
                    position: 'absolute', top: 20, bottom: 0, left: 0,
                    width: 1, background: 'var(--border)',
                  }} />
                )}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--ink)' }}>
                    v{release.version}
                  </span>
                  <span style={{
                    padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                    background: `${tagColors[release.tag]}15`, color: tagColors[release.tag],
                  }}>
                    {release.tag}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-f)', marginBottom: 14 }}>{release.date}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {release.items.map((item, i) => (
                    <li key={i} style={{ fontSize: 14, color: 'var(--ink-m)', lineHeight: 1.6, paddingLeft: 16, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--teal)' }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
