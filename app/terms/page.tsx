import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Terms of Service — HanDl' };

export default function TermsPage() {
  return (
    <div className="landing-page" style={{ cursor: 'auto' }}>
      <Navbar />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '120px 40px 80px' }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 36, letterSpacing: '-1px', color: 'var(--ink)', marginBottom: 8 }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: 13, color: 'var(--ink-f)', marginBottom: 48 }}>Last updated: June 2025</p>

        {[
          {
            title: '1. Acceptance of Terms',
            content: `By creating an account or using HanDl ("the Service"), you agree to these Terms of Service. If you are using HanDl on behalf of a business, you represent that you have the authority to bind that organization.`,
          },
          {
            title: '2. Description of Service',
            content: `HanDl is an AI-powered business agent that helps you manage customer conversations, process orders, maintain product catalogs, and connect messaging channels. The Service includes a web application, API, and integrations with third-party platforms.`,
          },
          {
            title: '3. Account Responsibilities',
            content: `You are responsible for:\n• Maintaining the security of your account credentials\n• All activity that occurs under your account\n• Ensuring the accuracy of your business and product information\n• Complying with applicable laws when using the Service\n\nYou must be at least 18 years old or the age of legal majority in your jurisdiction to use HanDl.`,
          },
          {
            title: '4. Acceptable Use',
            content: `You agree not to:\n• Use HanDl for any illegal or fraudulent purpose\n• Send spam or unsolicited messages through connected channels\n• Attempt to reverse-engineer, decompile, or extract the AI models\n• Exceed API rate limits or abuse the Service infrastructure\n• Impersonate another person or misrepresent your business\n• Upload content that infringes intellectual property rights`,
          },
          {
            title: '5. AI-Generated Content',
            content: `HanDl's AI generates responses based on your configuration and instructions. You acknowledge that:\n• AI responses may occasionally be inaccurate\n• You are responsible for reviewing and configuring AI behavior\n• HanDl is not liable for business decisions made based on AI outputs\n• You should enable escalation rules for sensitive conversations`,
          },
          {
            title: '6. Billing & Payments',
            content: `Paid plans are billed monthly in advance. Usage-based charges are billed in arrears. All fees are in Nigerian Naira (₦) unless otherwise specified.\n\n• Upgrades take effect immediately with prorated charges\n• Downgrades apply at the end of the current billing cycle\n• Failed payments result in a 7-day grace period before service restriction\n• Refunds are handled on a case-by-case basis`,
          },
          {
            title: '7. Data Ownership',
            content: `You retain full ownership of your data, including:\n• Customer conversations and contact information\n• Product catalog and order records\n• Business configurations and AI instructions\n\nHanDl has a limited license to process this data solely to provide the Service. You can export or delete your data at any time.`,
          },
          {
            title: '8. Service Availability',
            content: `We target 99.9% uptime but do not guarantee uninterrupted service. Planned maintenance will be communicated 48 hours in advance. We are not liable for downtime caused by third-party providers (channel APIs, payment processors, etc.).`,
          },
          {
            title: '9. Limitation of Liability',
            content: `To the maximum extent permitted by law, HanDl's total liability for any claim arising from the Service is limited to the fees you paid in the 12 months preceding the claim. HanDl is not liable for indirect, incidental, or consequential damages.`,
          },
          {
            title: '10. Termination',
            content: `You may close your account at any time from Settings. HanDl may suspend or terminate accounts that violate these Terms, with notice when possible. Upon termination, your data will be retained for 30 days before permanent deletion, during which time you can request an export.`,
          },
          {
            title: '11. Changes to Terms',
            content: `We may revise these Terms from time to time. Material changes will be communicated via email and in-app notice at least 14 days before taking effect. Continued use after the effective date constitutes acceptance.`,
          },
          {
            title: '12. Governing Law',
            content: `These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be resolved through arbitration in Lagos, Nigeria.`,
          },
          {
            title: '13. Contact',
            content: `For questions about these Terms:\nEmail: legal@handl-ng.com\nHanDl Technologies Ltd\nLagos, Nigeria`,
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
