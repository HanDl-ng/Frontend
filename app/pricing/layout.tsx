import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — HanDl',
  description: 'Simple, transparent pricing. Start free and scale as you grow.',
  openGraph: {
    title: 'Pricing — HanDl',
    description: 'Simple, transparent pricing. Start free and scale as you grow.',
    url: 'https://handl-ng.com/pricing',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
