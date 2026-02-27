'use client';

import { useState, useEffect } from 'react';
import CustomCursor from '@/components/CustomCursor';
import Particles from '@/components/Particles';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Features from '@/components/Features';
import Automations from '@/components/Automations';
import ConversationsDemo from '@/components/ConversationsDemo';
import Channels from '@/components/Channels';
import Stats from '@/components/Stats';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import TemplatesModal from '@/components/TemplatesModal';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  const [templatesOpen, setTemplatesOpen] = useState(false);

  useEffect(() => {
    console.log(
      '%c HanDl ⚡ ',
      'background:#2e8b6e;color:white;font-size:16px;font-weight:bold;padding:6px 12px;border-radius:6px;'
    );
  }, []);

  return (
    <>
      <CustomCursor />
      <Particles />
      <TemplatesModal isOpen={templatesOpen} onClose={() => setTemplatesOpen(false)} />
      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <Automations onOpenTemplates={() => setTemplatesOpen(true)} />
      <ConversationsDemo />
      <Channels />
      <Stats />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer onOpenTemplates={() => setTemplatesOpen(true)} />
      <ScrollReveal />
    </>
  );
}
