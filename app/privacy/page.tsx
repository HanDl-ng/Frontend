import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy — HanDl',
  description: 'How HanDl collects, uses, and protects your data.',
  openGraph: {
    title: 'Privacy Policy — HanDl',
    description: 'How HanDl collects, uses, and protects your data.',
    url: 'https://handl-ng.com/privacy',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
};

export default function PrivacyPage() {
  return (
    <div className="landing-page" style={{ cursor: 'auto' }}>
      <Navbar />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '120px 40px 80px' }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 36, letterSpacing: '-1px', color: 'var(--ink)', marginBottom: 8 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 13, color: 'var(--ink-f)', marginBottom: 48 }}>Last updated: June 2025</p>

        {[
          {
            title: '1. Information We Collect',
            content: `When you create an account, we collect your name, email address, and business information. When you use HanDl, we process conversation data, order details, and product catalog information that you provide or that your customers share through connected channels.\n\nWe also collect usage data such as page views, feature interactions, and performance metrics to improve the service.`,
          },
          {
            title: '2. How We Use Your Information',
            content: `We use your information to:\n• Provide and maintain the HanDl service\n• Process orders and facilitate payments through integrated providers\n• Train AI features to respond in your configured tone and style\n• Send service notifications (billing, security, product updates)\n• Improve and develop new features\n\nWe never sell your data to third parties.`,
          },
          {
            title: '3. AI & Conversation Data',
            content: `HanDl's AI processes conversation content to generate responses on your behalf. Conversation data is encrypted in transit and at rest. AI models are not trained on your private conversations — your data stays yours.\n\nYou can export or delete your conversation history at any time from Settings.`,
          },
          {
            title: '4. Data Sharing',
            content: `We share data only with:\n• Payment processors (e.g., Paystack) to complete transactions\n• Channel providers (e.g., WhatsApp Business API) to deliver messages\n• Infrastructure providers (hosting, CDN) under strict data processing agreements\n\nWe do not share data with advertisers or data brokers.`,
          },
          {
            title: '5. Data Security',
            content: `All data is encrypted using TLS 1.3 in transit and AES-256 at rest. We implement access controls, regular security audits, and vulnerability scanning. API keys are hashed and never stored in plaintext.`,
          },
          {
            title: '6. Your Rights',
            content: `You have the right to:\n• Access your personal data\n• Correct inaccurate information\n• Delete your account and associated data\n• Export your data in standard formats\n• Withdraw consent for optional processing\n\nContact us at privacy@handl-ng.com to exercise these rights.`,
          },
          {
            title: '7. Cookies',
            content: `We use essential cookies for authentication and session management. We use analytics cookies (Vercel Analytics) to understand usage patterns. No advertising or tracking cookies are used.`,
          },
          {
            title: '8. Changes to This Policy',
            content: `We may update this policy from time to time. Material changes will be communicated via email and an in-app notice at least 14 days before taking effect.`,
          },
          {
            title: '9. Contact',
            content: `For privacy-related inquiries:\nEmail: privacy@handl-ng.com\nHanDl Technologies Ltd\nLagos, Nigeria`,
          },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: 36 }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--ink)', marginBottom: 12 }}>
              {section.title}
            </h2>
            <div style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--ink-m)', whiteSpace: 'pre-line' }}>
              {section.content}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
