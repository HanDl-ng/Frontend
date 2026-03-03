import type { Metadata } from 'next';
import DocsSidebar from './_components/DocsSidebar';
import './docs.css';

export const metadata: Metadata = {
  title: 'API Documentation — HanDl',
  description: 'Complete API reference and developer documentation for HanDl.',
  openGraph: {
    title: 'API Documentation — HanDl',
    description: 'Complete API reference and developer documentation for HanDl.',
    url: 'https://handl-ng.com/docs',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-layout">
      <DocsSidebar />
      <main className="docs-main">
        {children}
      </main>
    </div>
  );
}
