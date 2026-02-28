import StarIcon from '../../_components/StarIcon';
import { type ListingDetail } from './listing-details-data';

interface DetailSidebarProps {
  listing: ListingDetail;
}

export default function DetailSidebar({ listing }: DetailSidebarProps) {
  return (
    <div className="mp-detail-sidebar">
      <div className="mp-detail-stat-card">
        <h4 className="mp-detail-stat-title">Details</h4>
        <div className="mp-detail-stat-row">
          <span className="mp-detail-stat-label">Category</span>
          <span className="mp-detail-stat-value" style={{ textTransform: 'capitalize' }}>{listing.category}</span>
        </div>
        <div className="mp-detail-stat-row">
          <span className="mp-detail-stat-label">Nodes</span>
          <span className="mp-detail-stat-value">{listing.nodes.length}</span>
        </div>
        <div className="mp-detail-stat-row">
          <span className="mp-detail-stat-label">Published</span>
          <span className="mp-detail-stat-value">{listing.published}</span>
        </div>
        <div className="mp-detail-stat-row">
          <span className="mp-detail-stat-label">Last Updated</span>
          <span className="mp-detail-stat-value">{listing.updated}</span>
        </div>
        <div className="mp-detail-stat-row">
          <span className="mp-detail-stat-label">Rating</span>
          <span className="mp-detail-stat-value"><StarIcon size={14} /> {listing.rating}</span>
        </div>
        <div className="mp-detail-stat-row">
          <span className="mp-detail-stat-label">Installs</span>
          <span className="mp-detail-stat-value">{listing.installs.toLocaleString()}</span>
        </div>
      </div>

      <div className="mp-detail-stat-card">
        <h4 className="mp-detail-stat-title">Channels</h4>
        <div className="mp-detail-channels">
          {listing.channels.map(ch => (
            <span key={ch} className="mp-card-tag">{ch}</span>
          ))}
        </div>
      </div>

      <div className="mp-detail-stat-card">
        <h4 className="mp-detail-stat-title">Tags</h4>
        <div className="mp-detail-channels">
          {listing.tags.map(t => (
            <span key={t} className="mp-detail-tag">#{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
