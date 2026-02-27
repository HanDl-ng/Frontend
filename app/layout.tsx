import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SpeedInsightsClient from "../components/SpeedInsightsClient";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Poppins({ 
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
});
 
export const metadata: Metadata = {
  title: 'HanDl — Business Automation for Conversations, Orders & Delivery',
  description: 'Connect messaging channels, let AI handle conversations, create orders, trigger delivery, and build automated workflows — all in one place.',
  keywords: ['Business Automation', 'AI Conversations', 'Order Management', 'Delivery Automation', 'Workflow Builder', 'Messaging Channels', 'WhatsApp Business', 'Customer Support', 'HanDl'],
  authors: [{ name: 'HanDl' }],
  creator: 'HanDl',
  publisher: 'HanDl',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://handl-ng.com',
    siteName: 'HanDl',
    title: 'HanDl — Business Automation for Conversations, Orders & Delivery',
    description: 'Connect messaging channels, let AI handle conversations, create orders, trigger delivery, and build automated workflows — all in one place.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'HanDl — Business Automation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HanDl — Business Automation for Conversations, Orders & Delivery',
    description: 'Connect messaging channels, let AI handle conversations, create orders, trigger delivery, and build automated workflows.',
    creator: '@handl',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'et5BeKHewJA8zVcXqtUh9dKYqny6bBFip8rmS7gHbRw',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HanDl',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#6f1cd7" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <SpeedInsightsClient />
        <Analytics />
      </body>
    </html>
  );
}
