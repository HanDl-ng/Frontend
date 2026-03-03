export default function ConversationsDemo() {
  return (
    <section>
      <div className="section">
        <div className="reveal">
          <div className="sec-label">● Conversations</div>
          <h2 className="sec-title">
            One inbox.<br />Every channel.
          </h2>
          <p className="sec-sub">
            WhatsApp, Instagram, SMS, and email — all in a single thread-based inbox with AI and human handoff at your control.
          </p>
        </div>
        <div className="reveal" style={{ marginTop: 48 }}>
          <div className="conv-screen">
            {/* Conversation List */}
            <div className="conv-list">
              <div className="conv-list-hdr">
                <div className="conv-list-title">Conversations</div>
                <div className="search-box">🔍<span>Search conversations…</span></div>
              </div>
              <div className="filter-tabs">
                <div className="ft active">All</div>
                <div className="ft">Mine</div>
                <div className="ft">AI</div>
                <div className="ft">Needs human</div>
              </div>
              <div className="conv-items">
                <div className="cli">
                  <div className="cli-av">A</div>
                  <div className="cli-m">
                    <div className="cli-top"><span className="cli-name">Adaeze Obi</span><span className="cli-time">2m</span></div>
                    <div className="cli-msg">I want to order the jollof rice</div>
                    <span className="tag tag-ai">🤖 AI</span>
                  </div>
                </div>
                <div className="cli active">
                  <div className="cli-av b">B</div>
                  <div className="cli-m">
                    <div className="cli-top"><span className="cli-name">Bolu Adeyemi</span><span className="cli-time">5m</span></div>
                    <div className="cli-msg">When will my order arrive?</div>
                    <span className="tag tag-wait">⏳ Waiting</span>
                  </div>
                </div>
                <div className="cli">
                  <div className="cli-av c">C</div>
                  <div className="cli-m">
                    <div className="cli-top"><span className="cli-name">Chidi Eze</span><span className="cli-time">8m</span></div>
                    <div className="cli-msg">Payment received, thank you!</div>
                    <span className="tag tag-human">👤 Human</span>
                  </div>
                </div>
                <div className="cli">
                  <div className="cli-av d">D</div>
                  <div className="cli-m">
                    <div className="cli-top"><span className="cli-name">Damilola K.</span><span className="cli-time">12m</span></div>
                    <div className="cli-msg">Do you have size L in stock?</div>
                    <span className="tag tag-ai">🤖 AI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Center */}
            <div className="chat-center">
              <div className="chat-topbar">
                <div className="chat-cust">
                  <div className="chat-av">B</div>
                  <div>
                    <div className="chat-name">Bolu Adeyemi</div>
                    <div className="chat-ch">📱 WhatsApp · Open</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span className="tag tag-wait">Waiting</span>
                  <div style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, cursor: 'none' }}>⋯</div>
                </div>
              </div>
              <div className="ai-banner">
                <span>🤖 AI agent is handling this conversation</span>
                <span className="ai-override">Take over</span>
              </div>
              <div className="chat-msgs">
                <div className="msg msg-c">
                  Hi, I ordered the chicken burger combo 30 mins ago, where is it?
                  <div className="msg-meta">10:22 AM · WhatsApp</div>
                </div>
                <div className="msg msg-ai">
                  Hi Bolu! 👋 Your rider Emeka picked up order #1834 at 10:18 AM and is on the way. ETA is 10:40 AM.
                  <div className="msg-meta">10:23 AM · AI ✓✓</div>
                </div>
                <div className="msg msg-c">
                  Ok thanks. Can I add a coke to my order?
                  <div className="msg-meta">10:24 AM · WhatsApp</div>
                </div>
                <div className="msg msg-ai">
                  A Coke (500ml) is ₦500. Would you like to create a new order, or hold for next time? Your current order is already on the way 🛵
                  <div className="msg-meta">10:24 AM · AI ✓✓</div>
                </div>
                <div className="msg msg-sys">
                  {`AI agent created Order #1835 for Coke 500ml`}
                </div>
              </div>
              <div className="chat-input">
                <div className="chat-input-box">Type a message or let AI respond…</div>
                <div className="chat-send">↑</div>
              </div>
            </div>

            {/* Context Panel */}
            <div className="ctx-panel">
              <div className="ctx-sec">
                <div className="ctx-title">Customer</div>
                <div className="ctx-cust">
                  <div className="ctx-av">B</div>
                  <div>
                    <div className="ctx-name">Bolu Adeyemi</div>
                    <div className="ctx-id">+234 803 000 0001 · WhatsApp</div>
                  </div>
                </div>
                <div className="ctx-tags">
                  <span className="tag tag-ai">VIP</span>
                  <span className="tag tag-human">Returning</span>
                </div>
              </div>
              <div className="ctx-sec">
                <div className="ctx-title">Recent Orders</div>
                <div className="ctx-order">
                  <div className="ctx-order-id">#1834 — Chicken Burger Combo</div>
                  <div className="ctx-order-d">₦4,500 · In transit 🛵</div>
                </div>
                <div className="ctx-order">
                  <div className="ctx-order-id">#1801 — Jollof Rice (×2)</div>
                  <div className="ctx-order-d">₦3,200 · Delivered ✓</div>
                </div>
              </div>
              <div className="ctx-sec">
                <div className="ctx-title">Quick Actions</div>
                <div className="ctx-actions">
                  <div className="ctx-act">📦 Create Order</div>
                  <div className="ctx-act">💳 Send Payment Link</div>
                  <div className="ctx-act">🛵 Trigger Delivery</div>
                  <div className="ctx-act">📝 Add Note</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
