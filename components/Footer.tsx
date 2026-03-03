interface FooterProps {
  onOpenTemplates?: () => void;
}

export default function Footer({}: FooterProps) {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand">HanDl</div>
            <p className="footer-desc">
              Humanized AI for Notification, Dialogue & Logistics. The AI-powered agent for small business operations.
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none', fontSize: 14 }}>𝕏</div>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none', fontSize: 14 }}>in</div>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none', fontSize: 14 }}>📸</div>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Product</div>
            <a href="/#features" className="footer-link">Features</a>
            <a href="/how-it-works" className="footer-link">How It Works</a>
            <a href="/#channels" className="footer-link">Integrations</a>
            <a href="/pricing" className="footer-link">Pricing</a>
          </div>
          <div>
            <div className="footer-col-title">Resources</div>
            <a href="/docs" className="footer-link">Documentation</a>
            <a href="/docs/authentication" className="footer-link">API Reference</a>
            <a href="/contact" className="footer-link">Contact</a>
          </div>
          <div>
            <div className="footer-col-title">Legal</div>
            <a href="/privacy" className="footer-link">Privacy</a>
            <a href="/terms" className="footer-link">Terms</a>
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
