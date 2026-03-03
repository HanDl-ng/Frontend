interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ── Pre-built schemas ──────────────────────────── */

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'HanDl',
        url: 'https://handl-ng.com',
        logo: 'https://handl-ng.com/favicon.png',
        description: 'AI-powered business agent for conversations, orders & commerce.',
        sameAs: ['https://twitter.com/handl'],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'hello@handl-ng.com',
          contactType: 'customer support',
        },
      }}
    />
  );
}

export function ProductJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'HanDl',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'An AI agent that handles customer conversations, takes orders, manages products, and connects your channels.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free tier available',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '127',
        },
      }}
    />
  );
}

export function FAQJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }}
    />
  );
}

export function WebPageJsonLd({ title, description, url }: { title: string; description: string; url: string }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description,
        url,
        isPartOf: {
          '@type': 'WebSite',
          name: 'HanDl',
          url: 'https://handl-ng.com',
        },
      }}
    />
  );
}
