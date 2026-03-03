import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works — HanDl',
  description: 'Learn how HanDl\'s AI agent handles conversations, takes orders, and manages your business automatically.',
  openGraph: {
    title: 'How It Works — HanDl',
    description: 'Learn how HanDl\'s AI agent handles conversations, takes orders, and manages your business automatically.',
    url: 'https://handl-ng.com/how-it-works',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
