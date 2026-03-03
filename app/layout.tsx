import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SpeedInsightsClient from "../components/SpeedInsightsClient";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import TopLoader from "@/components/TopLoader";
import { ToastProvider } from "@/components/ToastProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import CookieConsent from "@/components/CookieConsent";
import { OrganizationJsonLd, ProductJsonLd } from "@/components/JsonLd";

const geistSans = Poppins({ 
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
});
 
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'HanDl — AI-Powered Business Agent for Conversations, Orders & Commerce',
  description: 'An AI agent that handles customer conversations, takes orders, manages products, and connects your channels — so you can focus on growing.',
  keywords: ['AI Business Agent', 'AI Conversations', 'Order Management', 'WhatsApp Business', 'Customer Support', 'Omnichannel Inbox', 'Small Business', 'Commerce', 'HanDl'],
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
    title: 'HanDl — AI-Powered Business Agent for Conversations, Orders & Commerce',
    description: 'An AI agent that handles customer conversations, takes orders, manages products, and connects your channels — so you can focus on growing.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'HanDl — AI-Powered Business Agent',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HanDl — AI-Powered Business Agent for Conversations, Orders & Commerce',
    description: 'An AI agent that handles customer conversations, takes orders, manages products, and connects your channels.',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#2e8b6e" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap"
          rel="stylesheet"
        />
        <OrganizationJsonLd />
        <ProductJsonLd />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('handl_theme');if(t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <ThemeProvider>
          <ToastProvider>
            <Suspense fallback={null}><TopLoader /></Suspense>
            {children}
            <CookieConsent />
          </ToastProvider>
        </ThemeProvider>
        <SpeedInsightsClient />
        <Analytics />
      </body>
    </html>
  );
}
