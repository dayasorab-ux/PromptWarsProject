import React from 'react';
import { AlertTriangle, ShieldCheck, Activity } from 'lucide-react';

const THREAT_FEED = [
  'LIVE RADAR: Active Cyrillic Homograph Campaign targeting Banking Portals',
  'NOTICE: High volume of USPS Parcel Delivery Smishing SMS detected',
  'ALERT: OAuth Consent Phishing targeting Microsoft 365 Enterprise accounts',
  'INTELLIGENCE: 4,200 New .tk Phishing Domains Sinkholed in the last 24h',
  'SECURITY ADVISORY: Enable MFA Number-Matching to mitigate Push Bombing attacks'
];

export default function HeaderTicker() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % THREAT_FEED.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.9)',
      borderBottom: '1px solid rgba(0, 242, 254, 0.15)',
      padding: '8px 20px',
      fontSize: '0.82rem',
      display: 'flex',
      alignItems: 'center',
      justify: 'space-between',
      color: 'var(--text-muted)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span className="badge badge-danger" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Activity size={12} className="pulse" /> THREAT RADAR
        </span>
        <span style={{ color: 'var(--text-main)', fontWeight: 500, transition: 'all 0.3s ease' }}>
          {THREAT_FEED[index]}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.78rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--color-safe)' }}>
          <ShieldCheck size={14} /> Shield Engine: ACTIVE
        </span>
        <span style={{ color: 'var(--text-dim)' }}>|</span>
        <span style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>
          V3.8-ENTERPRISE
        </span>
      </div>
    </div>
  );
}
