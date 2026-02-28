'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SparklesIcon, BoltIcon, ShoppingBagIcon } from '@/components/icons';
import { type Template } from './_components/templates-data';
import TemplatesTab from './_components/TemplatesTab';
import MyAutomationsTab from './_components/MyAutomationsTab';
import TemplateConfigModal from './_components/TemplateConfigModal';

export default function AutomationsPage() {
  const [tab, setTab] = useState<'templates' | 'my'>('templates');
  const [configModal, setConfigModal] = useState<Template | null>(null);

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Automations</h1>
            <p className="page-desc">Start with a template, browse the marketplace, or build your own.</p>
          </div>
        </div>
      </div>

      <div className="auto-tabs">
        <button className={`auto-tab${tab === 'templates' ? ' active' : ''}`} onClick={() => setTab('templates')}>
          <SparklesIcon /> Templates
        </button>
        <button className={`auto-tab${tab === 'my' ? ' active' : ''}`} onClick={() => setTab('my')}>
          <BoltIcon /> My Automations
        </button>
        <Link href="/automations/marketplace" className="auto-tab" style={{ textDecoration: 'none' }}>
          <ShoppingBagIcon /> Marketplace
        </Link>
      </div>

      {tab === 'templates' && <TemplatesTab onOpenConfig={tpl => setConfigModal(tpl)} />}
      {tab === 'my' && <MyAutomationsTab />}

      {configModal && (
        <TemplateConfigModal template={configModal} onClose={() => setConfigModal(null)} />
      )}
    </div>
  );
}
