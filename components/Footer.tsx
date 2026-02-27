interface FooterProps {
  onOpenTemplates?: () => void;
}

export default function Footer({ onOpenTemplates }: FooterProps) {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand">HanDl</div>
            <p className="footer-desc">
              Humanized AI for Notification, Dialogue & Logistics. The automation layer for small business operations.
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none', fontSize: 14 }}>𝕏</div>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none', fontSize: 14 }}>in</div>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none', fontSize: 14 }}>📸</div>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Product</div>
            <a href="#" className="footer-link">Features</a>
            <a href="#" className="footer-link">Automations</a>
            <a href="#" className="footer-link">Channels</a>
            <a href="#" className="footer-link">Storefront</a>
            <a href="#" className="footer-link">Pricing</a>
            <a href="#" className="footer-link">Changelog</a>
          </div>
          <div>
            <div className="footer-col-title">Resources</div>
            <a href="#" className="footer-link">Documentation</a>
            <a href="#" className="footer-link">API Reference</a>
            <a
              href="#"
              className="footer-link"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                onOpenTemplates?.();
              }}
            >
              Templates
            </a>
            <a href="#" className="footer-link">Blog</a>
            <a href="#" className="footer-link">Status</a>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <a href="#" className="footer-link">About</a>
            <a href="#" className="footer-link">Careers</a>
            <a href="#" className="footer-link">Contact</a>
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
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
