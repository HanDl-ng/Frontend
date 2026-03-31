export default function Pricing() {
  return (
    <section id="pricing">
      <div className="section pricing-section">
        <div className="reveal">
          <div className="sec-label">● Pricing</div>
          <h2 className="sec-title">
            Simple, transparent<br />pricing.
          </h2>
          <p className="sec-sub">
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
            <div className="price-feats">
              <div className="price-feat"><span className="price-check">✓</span>1 messaging channel</div>
              <div className="price-feat"><span className="price-check">✓</span>500 messages/month</div>
              <div className="price-feat"><span className="price-check">✓</span>Basic AI agent</div>
              <div className="price-feat"><span className="price-check">✓</span>10 products</div>
              <div className="price-feat" style={{ opacity: 0.4 }}><span>—</span>&nbsp;Storefront</div>
              <div className="price-feat" style={{ opacity: 0.4 }}><span>—</span>&nbsp;Delivery integration</div>
            </div>
            <a href="/signup" className="btn btn-ghost btn-lg" style={{ width: '100%', marginTop: 24 }}>Get started</a>
          </div>

          {/* Growth */}
          <div className="price-card featured reveal d1">
            <div className="price-badge">Most Popular</div>
            <div className="price-plan">Growth</div>
            <div className="price-num">₦29k</div>
            <div className="price-per">/month + usage</div>
            <div className="price-div" />
            <div className="price-feats">
              <div className="price-feat"><span className="price-check">✓</span>5 messaging channels</div>
              <div className="price-feat"><span className="price-check">✓</span>5,000 messages/month</div>
              <div className="price-feat"><span className="price-check">✓</span>Advanced AI with custom instructions</div>
              <div className="price-feat"><span className="price-check">✓</span>Unlimited products</div>
              <div className="price-feat"><span className="price-check">✓</span>Storefront & catalog</div>
              <div className="price-feat"><span className="price-check">✓</span>Payment integrations</div>
              <div className="price-feat"><span className="price-check">✓</span>Delivery dispatch</div>
            </div>
            <a href="/signup" className="btn btn-teal btn-lg" style={{ width: '100%', marginTop: 24 }}>Start Growth →</a>
          </div>

          {/* Scale */}
          <div className="price-card reveal d2">
            <div className="price-plan">Scale</div>
            <div className="price-num">₦79k</div>
            <div className="price-per">/month + usage</div>
            <div className="price-div" />
            <div className="price-feats">
              <div className="price-feat"><span className="price-check">✓</span>10 messaging channels</div>
              <div className="price-feat"><span className="price-check">✓</span>20,000 messages/month</div>
              <div className="price-feat"><span className="price-check">✓</span>Multi-agent AI playbooks</div>
              <div className="price-feat"><span className="price-check">✓</span>Team inbox (up to 15 seats)</div>
              <div className="price-feat"><span className="price-check">✓</span>Storefront, payments & delivery included</div>
              <div className="price-feat"><span className="price-check">✓</span>Advanced reports + webhook automations</div>
              <div className="price-feat"><span className="price-check">✓</span>Priority support</div>
            </div>
            <a href="/signup" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 24 }}>Start Scale →</a>
          </div>

          {/* Enterprise */}
          <div className="price-card reveal d3">
            <div className="price-plan">Enterprise</div>
            <div className="price-num">₦199k+</div>
            <div className="price-per">/month (custom scope)</div>
            <div className="price-div" />
            <div className="price-feats">
              <div className="price-feat"><span className="price-check">✓</span>Unlimited channels</div>
              <div className="price-feat"><span className="price-check">✓</span>Unlimited messages</div>
              <div className="price-feat"><span className="price-check">✓</span>Custom AI training & fine-tuning</div>
              <div className="price-feat"><span className="price-check">✓</span>Advanced IAM, SSO & audit logs</div>
              <div className="price-feat"><span className="price-check">✓</span>Dedicated account manager</div>
              <div className="price-feat"><span className="price-check">✓</span>99.9% SLA + priority support</div>
              <div className="price-feat"><span className="price-check">✓</span>Custom integrations & webhooks</div>
              <div className="price-feat"><span className="price-check">✓</span>On-premise / private cloud option</div>
            </div>
            <a href="/signup" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 24 }}>Contact sales</a>
          </div>
        </div>
      </div>
    </section>
  );
}
