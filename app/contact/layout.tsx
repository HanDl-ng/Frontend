import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — HanDl',
  description: 'Get in touch with the HanDl team. We\'d love to hear from you.',
  openGraph: {
    title: 'Contact Us — HanDl',
    description: 'Get in touch with the HanDl team. We\'d love to hear from you.',
    url: 'https://handl-ng.com/contact',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
