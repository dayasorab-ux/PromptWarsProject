import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  AlertTriangle, 
  ArrowRight, 
  Globe, 
  Mail, 
  KeyRound, 
  Zap, 
  Flame,
  Radio,
  CheckCircle2,
  Lock,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { analyzeUrl } from '../utils/urlAnalyzerEngine';
import { classifyMessage } from '../utils/messageClassifierEngine';

export default function DashboardView({ setActiveTab, onAnalysisComplete }) {
  const [quickInput, setQuickInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleQuickScan = (e) => {
    e.preventDefault();
    if (!quickInput.trim()) return;

    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const inputStr = quickInput.trim();
      
      // Determine if URL or Message
      if (/^https?:\/\//i.test(inputStr) || (inputStr.includes('.') && !inputStr.includes(' '))) {
        try {
          const result = analyzeUrl(inputStr);
          onAnalysisComplete('url', result);
          setActiveTab('url');
        } catch (err) {
          const result = classifyMessage(inputStr);
          onAnalysisComplete('message', result);
          setActiveTab('message');
        }
      } else {
        const result = classifyMessage(inputStr);
        onAnalysisComplete('message', result);
        setActiveTab('message');
      }
    }, 600);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Hero Quick Scanner Card */}
      <div className="glass-card" style={{
        padding: '36px',
        background: 'linear-gradient(135deg, rgba(18, 26, 43, 0.9) 0%, rgba(12, 18, 32, 0.95) 100%)',
        border: '1px solid rgba(0, 242, 254, 0.3)',
        boxShadow: '0 0 40px rgba(0, 242, 254, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '850px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span className="badge badge-info">
              <Cpu size={13} /> INTELLIGENT DEFENSE HUB
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Real-Time AI Phishing & Enterprise Risk Suite
            </span>
          </div>

          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '14px' }}>
            Analyze Suspicious URLs, Messages & Enterprise Threat Vectors in <span className="gradient-text">Real-Time</span>
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
            Paste any link, email body, SMS text, or domain below. CyberShield AI inspects structural anomalies, homographs, urgency manipulation, dark web breaches, and attack surface risks.
          </p>

          {/* Quick Input Bar */}
          <form onSubmit={handleQuickScan} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
              <input
                type="text"
                className="input-field"
                placeholder="Paste suspicious link (e.g. http://paypa1-verify.tk) or scam SMS text..."
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                style={{
                  paddingLeft: '44px',
                  height: '52px',
                  fontSize: '0.98rem'
                }}
              />
              <Search 
                size={20} 
                color="var(--text-muted)" 
                style={{ position: 'absolute', left: '16px', top: '16px' }} 
              />
            </div>
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={isScanning}
              style={{ height: '52px', padding: '0 28px', fontSize: '1rem' }}
            >
              {isScanning ? (
                <>
                  <Zap size={18} className="pulse" /> Inspecting Threat...
                </>
              ) : (
                <>
                  Scan Threat Now <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Quick Preset Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>QUICK SAMPLES:</span>
            <button
              onClick={() => {
                setQuickInput('http://paypa1-security-update.tk/login?ref=urgent');
              }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-muted)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              Paypa1 Homograph Link
            </button>
            <button
              onClick={() => {
                setQuickInput('URGENT: Your Chase Bank account is suspended. Verify now at http://bit.ly/3x82 or lose access.');
              }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-muted)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              Bank Suspicious SMS
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid-dashboard">
        <div className="col-3">
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>ACTIVE SHIELD INTEGRITY</span>
              <ShieldCheck size={22} color="var(--color-safe)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: 'var(--color-safe)' }}>
              99.8%
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              Optimal Threat Prevention Baseline
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>HIGH-RISK PHISH BLOCKED</span>
              <AlertTriangle size={22} color="var(--color-danger)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: 'var(--color-danger)' }}>
              1,842
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              Deceptive Domains & Smishing Links
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>DARK WEB LEAKS INTERCEPTED</span>
              <Flame size={22} color="var(--color-primary)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: 'var(--color-primary)' }}>
              128
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              Credentials & Paste Leaks Monitored
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>EASM ASSETS SHIELDED</span>
              <Radio size={22} color="var(--color-secondary)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: 'var(--color-secondary)' }}>
              94.2%
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              External Attack Surface Inventory
            </div>
          </div>
        </div>
      </div>

      {/* Feature Navigation Modules Grid */}
      <div className="grid-dashboard">
        {/* Threat Intel & Playbooks Card */}
        <div className="col-6">
          <div 
            className="glass-card glass-card-interactive" 
            onClick={() => setActiveTab('threatIntel')}
            style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(0, 242, 254, 0.12)',
                border: '1px solid rgba(0, 242, 254, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                marginBottom: '16px'
              }}>
                <Flame size={22} color="var(--color-primary)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Threat Intelligence & Playbook Suite</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                • Dark Web & Paste Leak Monitoring<br />
                • Geopolitical & Physical Threat Telemetry<br />
                • Automated YARA / Sigma / Snort Rule Generator<br />
                • EPSS vs CVSS Real-World Vulnerability Prioritization
              </p>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontSize: '0.88rem', fontWeight: 700 }}>
              Launch Threat Intel Suite <ArrowRight size={16} />
            </div>
          </div>
        </div>

        {/* Attack Surface & Vendor Risk Card */}
        <div className="col-6">
          <div 
            className="glass-card glass-card-interactive" 
            onClick={() => setActiveTab('attackSurface')}
            style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(127, 83, 172, 0.15)',
                border: '1px solid rgba(127, 83, 172, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                marginBottom: '16px'
              }}>
                <Radio size={22} color="var(--color-secondary)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Attack Surface & Supply Chain Defense</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                • Dynamic External Attack Surface Mapping (EASM)<br />
                • Adversary Infrastructure & C2 Node Tracking<br />
                • Brand Protection & Fast Registrar Takedowns<br />
                • Third-Party Vendor Security Scorecards
              </p>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-secondary)', fontSize: '0.88rem', fontWeight: 700 }}>
              Explore Attack Surface Suite <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
