import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'System Status — HanDl',
  description: 'Check the current status of HanDl services.',
  openGraph: {
    title: 'System Status — HanDl',
    description: 'Check the current status of HanDl services.',
    url: 'https://handl-ng.com/status',
  },
};

const services = [
  { name: 'Web Application', status: 'operational', uptime: '99.98%' },
  { name: 'API', status: 'operational', uptime: '99.95%' },
  { name: 'AI Agent', status: 'operational', uptime: '99.90%' },
  { name: 'WhatsApp Integration', status: 'operational', uptime: '99.92%' },
  { name: 'Payment Processing', status: 'operational', uptime: '99.99%' },
  { name: 'Storefront CDN', status: 'operational', uptime: '99.97%' },
];

const statusColors: Record<string, string> = {
  operational: '#2e8b6e',
  degraded: '#f59e0b',
  outage: '#e05252',
  maintenance: '#3b82f6',
};

const statusLabels: Record<string, string> = {
  operational: 'Operational',
  degraded: 'Degraded Performance',
  outage: 'Major Outage',
  maintenance: 'Under Maintenance',
};

const recentIncidents = [
  {
    date: 'January 12, 2025',
    title: 'Brief API latency spike',
    status: 'resolved',
    description: 'API response times briefly increased due to a database migration. Resolved within 8 minutes.',
  },
  {
    date: 'January 3, 2025',
    title: 'Scheduled maintenance',
    status: 'completed',
    description: 'Routine infrastructure maintenance. No user impact expected.',
  },
];

export default function StatusPage() {
  const allOperational = services.every((s) => s.status === 'operational');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '120px 24px 80px' }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: '-1.5px', color: 'var(--ink)', marginBottom: 8 }}>
          System Status
        </h1>
        <p style={{ fontSize: 15, color: 'var(--ink-f)', marginBottom: 32, lineHeight: 1.6 }}>
          Current operational status of HanDl services.
        </p>

        {/* Overall status banner */}
        <div style={{
          background: allOperational ? 'rgba(46,139,110,.08)' : 'rgba(240,176,0,.08)',
          border: `1.5px solid ${allOperational ? 'rgba(46,139,110,.2)' : 'rgba(240,176,0,.2)'}`,
          borderRadius: 14, padding: '20px 24px', marginBottom: 32,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 12, height: 12, borderRadius: '50%',
            background: allOperational ? '#2e8b6e' : '#f59e0b',
            boxShadow: `0 0 8px ${allOperational ? 'rgba(46,139,110,.4)' : 'rgba(240,176,0,.4)'}`,
          }} />
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>
            {allOperational ? 'All Systems Operational' : 'Some Systems Experiencing Issues'}
          </span>
        </div>

        {/* Services list */}
        <div style={{
          background: '#fff', border: '1px solid var(--border)', borderRadius: 14,
          overflow: 'hidden', marginBottom: 40,
        }}>
          {services.map((svc, i) => (
            <div key={svc.name} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: i < services.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{svc.name}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-f)', marginTop: 2 }}>Uptime: {svc.uptime}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: statusColors[svc.status],
                }} />
                <span style={{ fontSize: 13, fontWeight: 500, color: statusColors[svc.status] }}>
                  {statusLabels[svc.status]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent incidents */}
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
          Recent Incidents
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {recentIncidents.map((incident) => (
            <div key={incident.date} style={{
              background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: 20,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{incident.title}</span>
                <span style={{
                  padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                  background: incident.status === 'resolved' ? 'rgba(46,139,110,.1)' : 'rgba(59,130,246,.1)',
                  color: incident.status === 'resolved' ? '#2e8b6e' : '#3b82f6',
                  textTransform: 'capitalize',
                }}>
                  {incident.status}
                </span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-f)', marginBottom: 6 }}>{incident.date}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-m)', lineHeight: 1.6 }}>{incident.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
