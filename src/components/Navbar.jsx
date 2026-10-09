import React from 'react';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Link2, 
  MessageSquareWarning, 
  UserCheck, 
  Bot, 
  Gamepad2,
  FileText
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenReport }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'url', label: 'URL Threat Inspector', icon: Link2 },
    { id: 'message', label: 'Scam Message Classifier', icon: MessageSquareWarning },
    { id: 'sentinel', label: 'Identity & Breach Sentinel', icon: UserCheck },
    { id: 'ai', label: 'Aegis AI Assistant', icon: Bot },
    { id: 'quiz', label: 'Phishing Simulator', icon: Gamepad2 }
  ];

  return (
    <nav style={{
      background: 'rgba(11, 16, 26, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(0, 242, 254, 0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0 24px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        height: '70px'
      }}>
        {/* Brand Header */}
        <div 
          onClick={() => setActiveTab('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(0,242,254,0.2), rgba(127,83,172,0.2))',
            padding: '10px',
            borderRadius: '12px',
            border: '1px solid rgba(0,242,254,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0,242,254,0.2)'
          }}>
            <ShieldAlert size={26} color="#00f2fe" />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
              <span className="gradient-text">CYBERSHIELD</span> AI
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginTop: '3px' }}>
              INTELLIGENT THREAT INTELLIGENCE
            </div>
          </div>
        </div>

        {/* Nav Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 16px',
                  borderRadius: '10px',
                  background: isActive ? 'rgba(0, 242, 254, 0.12)' : 'transparent',
                  color: isActive ? 'var(--color-primary)' : 'var(--text-muted)',
                  border: isActive ? '1px solid rgba(0, 242, 254, 0.3)' : '1px solid transparent',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} color={isActive ? 'var(--color-primary)' : 'currentColor'} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Quick Report CTA */}
        <button 
          className="btn-secondary" 
          onClick={onOpenReport}
          style={{ fontSize: '0.85rem', padding: '8px 14px' }}
        >
          <FileText size={15} color="var(--color-primary)" />
          Export Incident Report
        </button>
      </div>
    </nav>
  );
}
