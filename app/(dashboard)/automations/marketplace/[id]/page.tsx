'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import StarIcon from '../_components/StarIcon';
import { allListings, getFallbackListing } from './_components/listing-details-data';
import FlowPreview from './_components/FlowPreview';
import DetailSidebar from './_components/DetailSidebar';

export default function MarketplaceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const listing = allListings[id] || getFallbackListing(id);

  return (
    <div className="page-content">
      <div className="mp-breadcrumb">
        <Link href="/automations">Automations</Link>
        <span>&rsaquo;</span>
        <Link href="/automations/marketplace">Marketplace</Link>
        <span>&rsaquo;</span>
        <span className="mp-breadcrumb-current">{listing.name}</span>
      </div>

      <div className="mp-detail-header">
        <div className="mp-detail-info">
          <h1 className="mp-detail-name">{listing.name}</h1>
          <p className="mp-detail-desc">{listing.desc}</p>
          <div className="mp-detail-meta">
            <span className="mp-detail-author">
              by <strong>{listing.author}</strong>
              {listing.authorVerified && <span className="mp-card-verified" title="Verified">✓</span>}
            </span>
            <span className="mp-detail-rating"><StarIcon size={14} /> {listing.rating} ({listing.reviews} reviews)</span>
            <span className="mp-detail-installs">{listing.installs.toLocaleString()} users</span>
          </div>
        </div>
        <div className="mp-detail-actions">
          <button className="btn btn-teal">Clone to Workspace</button>
          <button className="btn btn-ghost">Preview in Builder</button>
        </div>
      </div>

      <div className="mp-detail-layout">
        <div className="mp-detail-main">
          <FlowPreview nodes={listing.nodes} edges={listing.edges} />

          <div className="mp-detail-section">
            <h3 className="mp-detail-section-title">About this Workflow</h3>
            <p className="mp-detail-long-desc">{listing.longDesc}</p>
          </div>
        </div>

        <DetailSidebar listing={listing} />
      </div>
    </div>
  );
}
