export default function Pricing() {
  return (
    <section id="pricing">
      <div className="section">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="sec-label" style={{ justifyContent: 'center' }}>● Pricing</div>
          <h2 className="sec-title">
            Simple, transparent<br />pricing.
          </h2>
          <p className="sec-sub" style={{ margin: '0 auto' }}>
            Pay for what you use. No surprise bills. Soft limits, not hard cuts.
          </p>
        </div>
        <div className="pricing-grid">
          {/* Starter */}
          <div className="price-card reveal">
            <div className="price-plan">Starter</div>
            <div className="price-num">₦0</div>
            <div className="price-per">Free forever</div>
            <div className="price-div" />
            <div className="price-feat"><span className="price-check">✓</span>1 messaging channel</div>
            <div className="price-feat"><span className="price-check">✓</span>500 messages/month</div>
            <div className="price-feat"><span className="price-check">✓</span>Basic AI responses</div>
            <div className="price-feat"><span className="price-check">✓</span>3 automations</div>
            <div className="price-feat" style={{ opacity: 0.4 }}><span>—</span>&nbsp;Storefront</div>
            <div className="price-feat" style={{ opacity: 0.4 }}><span>—</span>&nbsp;Delivery integration</div>
            <a href="#" className="btn btn-ghost btn-lg" style={{ width: '100%', marginTop: 24 }}>Get started</a>
          </div>

          {/* Growth */}
          <div className="price-card featured reveal d1">
            <div className="price-badge">Most Popular</div>
            <div className="price-plan">Growth</div>
            <div className="price-num">₦29k</div>
            <div className="price-per">/month + usage</div>
            <div className="price-div" />
            <div className="price-feat"><span className="price-check">✓</span>5 messaging channels</div>
            <div className="price-feat"><span className="price-check">✓</span>5,000 messages/month</div>
            <div className="price-feat"><span className="price-check">✓</span>Advanced AI with custom prompts</div>
            <div className="price-feat"><span className="price-check">✓</span>Unlimited automations</div>
            <div className="price-feat"><span className="price-check">✓</span>Storefront & catalog</div>
            <div className="price-feat"><span className="price-check">✓</span>Payment integrations</div>
            <div className="price-feat"><span className="price-check">✓</span>Delivery dispatch</div>
            <a href="#" className="btn btn-teal btn-lg" style={{ width: '100%', marginTop: 24 }}>Start Growth →</a>
          </div>

          {/* Enterprise */}
          <div className="price-card reveal d2">
            <div className="price-plan">Enterprise</div>
            <div className="price-num">Custom</div>
            <div className="price-per">Tailored for you</div>
            <div className="price-div" />
            <div className="price-feat"><span className="price-check">✓</span>Unlimited channels</div>
            <div className="price-feat"><span className="price-check">✓</span>Unlimited messages</div>
            <div className="price-feat"><span className="price-check">✓</span>Custom AI training</div>
            <div className="price-feat"><span className="price-check">✓</span>Advanced IAM & teams</div>
            <div className="price-feat"><span className="price-check">✓</span>SLA & dedicated support</div>
            <div className="price-feat"><span className="price-check">✓</span>On-premise option</div>
            <a href="#" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 24 }}>Contact sales</a>
          </div>
        </div>
      </div>
    </section>
  );
}
