export default function JournalShowcase() {
  const posts = [
    {
      title: 'How We Reduced Response Time by 73% With Agent Routing',
      excerpt: 'A practical breakdown of queue logic, AI handoff rules, and team workflows that cut response delays.',
      date: 'Mar 24, 2026',
      readTime: '6 min read',
      image: '/journal/routing-thumbnail.svg',
      href: '/blog/agent-routing-response-time',
      delay: 'd1',
    },
    {
      title: 'Designing a WhatsApp-First Sales Flow That Converts',
      excerpt: 'The scripts, triggers, and payment moments we use to turn chats into completed orders at scale.',
      date: 'Mar 18, 2026',
      readTime: '8 min read',
      image: '/journal/whatsapp-thumbnail.svg',
      href: '/blog/whatsapp-sales-flow',
      delay: 'd2',
    },
    {
      title: 'From Manual Ops to Automation: A 30-Day Migration Plan',
      excerpt: 'Step-by-step rollout plan for teams moving from scattered tools into one unified AI operations stack.',
      date: 'Mar 9, 2026',
      readTime: '7 min read',
      image: '/journal/migration-thumbnail.svg',
      href: '/blog/30-day-automation-migration',
      delay: 'd3',
    },
  ];

  return (
    <section id="journal" className="journal-bg">
      <div className="section">
        <div className="reveal">
          <div className="sec-label">● Journal</div>
          <h2 className="sec-title">
            The HanDll Journal
          </h2>
          <p className="sec-sub">
            Product notes, playbooks, and field lessons from teams building AI-led operations.
          </p>
        </div>

        <div className="journal-grid">
          {posts.map((post, i) => (
            <a className={`journal-card reveal ${post.delay}`} href={post.href} key={i}>
              <div className="journal-thumb">
                <img src={post.image} alt={post.title} loading="lazy" />
              </div>
              <div className="journal-meta">{post.date} · {post.readTime}</div>
              <div className="journal-title">{post.title}</div>
              <p className="journal-excerpt">{post.excerpt}</p>
              <div className="journal-link">Read article →</div>
            </a>
          ))}

          <a className="journal-card journal-card-all reveal d4" href="/blog">
            <div className="journal-thumb">
              <img src="/journal/archive-thumbnail.svg" alt="Blog archive preview" loading="lazy" />
            </div>
            <div className="journal-all-kicker">Browse</div>
            <div className="journal-title">See all posts</div>
            <p className="journal-excerpt">
              Explore the full archive of product updates, practical guides, and behind-the-scenes breakdowns.
            </p>
            <div className="journal-link">Go to blog →</div>
          </a>
        </div>
      </div>
    </section>
  );
}
