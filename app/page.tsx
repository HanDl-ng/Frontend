'use client';

import { useEffect } from 'react';
import Particles from '@/components/Particles';
import UpdatesBanner from '@/components/UpdatesBanner';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Features from '@/components/Features';
import ConversationsDemo from '@/components/ConversationsDemo';
import Channels from '@/components/Channels';
import Stats from '@/components/Stats';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import JournalShowcase from '@/components/JournalShowcase';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  useEffect(() => {
    console.log(
      '%c HanDl ⚡ ',
      'background:#2e8b6e;color:white;font-size:16px;font-weight:bold;padding:6px 12px;border-radius:6px;'
    );
  }, []);

  return (
    <div className="landing-page">
      <Particles />
      <UpdatesBanner />
      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <ConversationsDemo />
      <Channels />
      <Stats />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <JournalShowcase />
      <Footer />
      <ScrollReveal />
    </div>
  );
}
