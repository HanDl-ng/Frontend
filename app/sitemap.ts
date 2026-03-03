import type { MetadataRoute } from 'next';

const BASE_URL = 'https://handl-ng.com';

interface SitemapItem {
  url: string;
  priority: number;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const publicPages: SitemapItem[] = [
    { url: '/', changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: '/pricing', changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: '/how-it-works', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/contact', changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: '/terms', changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: '/changelog', changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: '/status', changeFrequency: 'daily' as const, priority: 0.4 },
  ];

  const authPages: SitemapItem[] = [
    { url: '/signin', priority: 0.4 },
    { url: '/signup', priority: 0.6 },
    { url: '/forgot-password', priority: 0.2 },
    { url: '/reset-password', priority: 0.2 },
    { url: '/verify-otp', priority: 0.2 },
  ];

  const onboardingPages: SitemapItem[] = [
    { url: '/onboarding', priority: 0.4 },
    { url: '/onboarding/complete', priority: 0.3 },
  ];

  const appPages: SitemapItem[] = [
    { url: '/app/dashboard', priority: 0.7 },
    { url: '/app/conversations', priority: 0.7 },
    { url: '/app/orders', priority: 0.7 },
    { url: '/app/products', priority: 0.7 },
    { url: '/app/integrations', priority: 0.6 },
    { url: '/app/storefront', priority: 0.6 },
    { url: '/app/reports', priority: 0.6 },
    { url: '/app/settings', priority: 0.5 },
    { url: '/app/settings/agent', priority: 0.5 },
    { url: '/app/settings/channels', priority: 0.5 },
    { url: '/app/settings/billing', priority: 0.5 },
    { url: '/app/settings/api', priority: 0.5 },
    { url: '/app/settings/appearance', priority: 0.5 },
  ];

  const docsPages: SitemapItem[] = [
    { url: '/docs', priority: 0.9 },
    { url: '/docs/authentication', priority: 0.8 },
    { url: '/docs/messages', priority: 0.8 },
    { url: '/docs/orders', priority: 0.8 },
    { url: '/docs/products', priority: 0.8 },
    { url: '/docs/payments', priority: 0.8 },
    { url: '/docs/webhooks', priority: 0.7 },
    { url: '/docs/errors', priority: 0.7 },
  ];

  return [...publicPages, ...authPages, ...onboardingPages, ...appPages, ...docsPages].map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency ?? ('monthly' as const),
    priority: page.priority,
  }));
}
