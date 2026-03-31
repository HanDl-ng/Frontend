interface FooterProps {
  onOpenTemplates?: () => void;
}

export default function Footer({}: FooterProps) {
  return (
    <footer>
      <div className="footer-wordmark" aria-hidden="true">HanDll</div>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-brand">HanDl</div>
            <p className="footer-desc">
              Humanized AI for Notification, Dialogue & Logistics. The AI-powered agent for small business operations.
            </p>
            <div className="footer-socials" aria-label="Social links">
              <a className="footer-social" href="#" aria-label="X">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.9 3h2.9l-6.4 7.3L23 21h-6l-4.7-6.2L6.7 21H3.8l6.8-7.8L1 3h6.1l4.2 5.6L18.9 3z" fill="currentColor" />
                </svg>
              </a>
              <a className="footer-social" href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.9 8.5H3.5V20h3.4V8.5zM5.2 3a2 2 0 100 4 2 2 0 000-4zm4 5.5V20h3.4v-6c0-1.6.3-3.1 2.3-3.1s2 1.9 2 3.2V20H20v-6.6c0-3.2-.7-5.7-4.4-5.7-1.8 0-3 .9-3.5 1.8h-.1v-1z" fill="currentColor" />
                </svg>
              </a>
              <a className="footer-social" href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2A3.2 3.2 0 1112 8.8a3.2 3.2 0 010 6.4zM18.2 6.8a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" fill="currentColor" />
                  <path d="M12 2.8c2.9 0 3.3 0 4.4.1 1 .1 1.5.2 1.9.4a3.8 3.8 0 011.4.9c.4.4.7.8.9 1.4.2.4.3.9.4 1.9.1 1.1.1 1.5.1 4.4s0 3.3-.1 4.4c-.1 1-.2 1.5-.4 1.9a3.8 3.8 0 01-.9 1.4c-.4.4-.8.7-1.4.9-.4.2-.9.3-1.9.4-1.1.1-1.5.1-4.4.1s-3.3 0-4.4-.1c-1-.1-1.5-.2-1.9-.4a3.8 3.8 0 01-1.4-.9 3.8 3.8 0 01-.9-1.4c-.2-.4-.3-.9-.4-1.9-.1-1.1-.1-1.5-.1-4.4s0-3.3.1-4.4c.1-1 .2-1.5.4-1.9a3.8 3.8 0 01.9-1.4 3.8 3.8 0 011.4-.9c.4-.2.9-.3 1.9-.4 1.1-.1 1.5-.1 4.4-.1zm0 1.8c-2.8 0-3.2 0-4.3.1-.9.1-1.3.2-1.6.3-.5.2-.8.4-1.1.7-.3.3-.5.6-.7 1.1-.1.3-.2.7-.3 1.6-.1 1.1-.1 1.4-.1 4.3s0 3.2.1 4.3c.1.9.2 1.3.3 1.6.2.5.4.8.7 1.1.3.3.6.5 1.1.7.3.1.7.2 1.6.3 1.1.1 1.4.1 4.3.1s3.2 0 4.3-.1c.9-.1 1.3-.2 1.6-.3.5-.2.8-.4 1.1-.7.3-.3.5-.6.7-1.1.1-.3.2-.7.3-1.6.1-1.1.1-1.4.1-4.3s0-3.2-.1-4.3c-.1-.9-.2-1.3-.3-1.6a2 2 0 00-.7-1.1c-.3-.3-.6-.5-1.1-.7-.3-.1-.7-.2-1.6-.3-1.1-.1-1.4-.1-4.3-.1z" fill="currentColor" />
                </svg>
              </a>
            </div>
            <a
              className="footer-ph"
              href="https://www.producthunt.com/products/handl"
              target="_blank"
              rel="noreferrer"
              aria-label="Find HanDl on Product Hunt"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" fill="currentColor" />
                <path d="M9 7h4a3.5 3.5 0 010 7H9V7zm2 2v3h2a1.5 1.5 0 000-3h-2z" fill="#141412" />
              </svg>
              <span>Featured on Product Hunt</span>
            </a>
          </div>
          <div>
            <div className="footer-col-title">Product</div>
            <a href="/#features" className="footer-link">Features</a>
            <a href="/#channels" className="footer-link">Integrations</a>
            <a href="/pricing" className="footer-link">Pricing</a>
            <a href="/changelog" className="footer-link">Changelog</a>
          </div>
          <div>
            <div className="footer-col-title">Platform</div>
            <a href="/app/dashboard" className="footer-link">Dashboard</a>
            <a href="/app/conversations" className="footer-link">Conversations</a>
            <a href="/app/orders" className="footer-link">Orders</a>
            <a href="/app/reports" className="footer-link">Reports</a>
          </div>
          <div>
            <div className="footer-col-title">Support</div>
            <a href="/contact" className="footer-link">Contact Us</a>
            <a href="/status" className="footer-link">System Status</a>
            <a href="/docs" className="footer-link">Documentation</a>
            <a href="/docs/authentication" className="footer-link">API Reference</a>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <a href="/how-it-works" className="footer-link">How It Works</a>
            <a href="/onboarding" className="footer-link">Onboarding</a>
            <a href="/terms" className="footer-link">Terms</a>
            <a href="/privacy" className="footer-link">Privacy</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 HanDl Technologies Ltd. All rights reserved.</span>
          <span>Made with ❤️ for African small businesses.</span>
        </div>
      </div>
    </footer>
  );
}
