import React, { useState } from 'react';
import { 
  Globe, 
  ShieldAlert, 
  Terminal, 
  Zap, 
  Flame, 
  Copy, 
  Check, 
  Download, 
  FileCode2, 
  Layers, 
  ExternalLink,
  MapPin,
  AlertTriangle,
  Lock,
  Search
} from 'lucide-react';
import { 
  MOCK_DARK_WEB_LEAKS, 
  GEOPOLITICAL_EVENTS, 
  generateYaraRule, 
  generateSigmaRule, 
  generateSnortRule,
  VULNERABILITY_MATRIX_DATA 
} from '../utils/threatIntelEngine';

export default function ThreatIntelSuiteView() {
  const [activeSubTab, setActiveSubTab] = useState('darkweb'); // 'darkweb', 'geopolitics', 'playbooks', 'epss'

  // Playbook State
  const [ruleType, setRuleType] = useState('yara'); // 'yara', 'sigma', 'snort'
  const [ruleTitle, setRuleTitle] = useState('RedLine_Stealer_Payload');
  const [iocString, setIocString] = useState('malicious-c2-beacon.org');
  const [copied, setCopied] = useState(false);

  const getGeneratedRule = () => {
    if (ruleType === 'yara') return generateYaraRule(ruleTitle, iocString);
    if (ruleType === 'sigma') return generateSigmaRule(ruleTitle, iocString);
    if (ruleType === 'snort') return generateSnortRule(ruleTitle, iocString);
    return '';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getGeneratedRule());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = getGeneratedRule();
    const ext = ruleType === 'yara' ? '.yar' : ruleType === 'sigma' ? '.yml' : '.rules';
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${ruleTitle || 'rule'}${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Navigation Sub-Header */}
      <div className="glass-card" style={{ padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Flame color="var(--color-primary)" size={24} /> Threat Intelligence & Automated Defense Playbooks
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Real-time Dark Web risk scanning, geopolitical conflict telemetry, automated YARA/Sigma playbooks, and EPSS vulnerability prioritization.
            </p>
          </div>

          {/* Sub-Tab Navigation Switcher */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            padding: '4px',
            borderRadius: '12px',
            border: '1px solid rgba(0, 242, 254, 0.2)',
            display: 'flex',
            gap: '4px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => setActiveSubTab('darkweb')}
              className={`btn-subtab ${activeSubTab === 'darkweb' ? 'active' : ''}`}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: activeSubTab === 'darkweb' ? 'var(--color-primary)' : 'transparent',
                color: activeSubTab === 'darkweb' ? '#050b14' : 'var(--text-muted)',
                transition: 'all 0.2s ease'
              }}
            >
              🕷️ Dark Web Monitoring
            </button>
            <button
              onClick={() => setActiveSubTab('geopolitics')}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: activeSubTab === 'geopolitics' ? 'var(--color-secondary)' : 'transparent',
                color: activeSubTab === 'geopolitics' ? '#050b14' : 'var(--text-muted)',
                transition: 'all 0.2s ease'
              }}
            >
              🌍 Geopolitical Threat Map
            </button>
            <button
              onClick={() => setActiveSubTab('playbooks')}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: activeSubTab === 'playbooks' ? 'var(--color-accent)' : 'transparent',
                color: activeSubTab === 'playbooks' ? '#050b14' : 'var(--text-muted)',
                transition: 'all 0.2s ease'
              }}
            >
              📜 YARA/Sigma Playbooks
            </button>
            <button
              onClick={() => setActiveSubTab('epss')}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: activeSubTab === 'epss' ? 'linear-gradient(135deg, #ff007f, #7f53ac)' : 'transparent',
                color: activeSubTab === 'epss' ? '#fff' : 'var(--text-muted)',
                transition: 'all 0.2s ease'
              }}
            >
              💥 EPSS Vulnerability Matrix
            </button>
          </div>
        </div>
      </div>

      {/* MODULE 1: DARK WEB MONITORING */}
      {activeSubTab === 'darkweb' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search color="var(--color-primary)" size={20} /> Live Dark Web & Paste Site Leak Feed
              </h3>
              <span className="badge badge-high" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                🔴 4 Active Intelligence Alerts Detected
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {MOCK_DARK_WEB_LEAKS.map((leak) => (
                <div key={leak.id} style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  borderRadius: '12px',
                  padding: '18px',
                  border: '1px solid rgba(0, 242, 254, 0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className={`badge ${leak.severity === 'CRITICAL' ? 'badge-high' : leak.severity === 'HIGH' ? 'badge-warn' : 'badge-safe'}`}>
                        {leak.severity}
                      </span>
                      <strong style={{ fontSize: '1rem' }}>{leak.title}</strong>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Source: {leak.source} ({leak.timestamp})</span>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>{leak.details}</p>

                  <div style={{
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(5, 11, 20, 0.6)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    <div>
                      <strong style={{ color: 'var(--color-primary)' }}>Affected Asset:</strong> <code>{leak.affectedAsset}</code>
                    </div>
                    <div style={{ color: '#ffb800' }}>
                      ⚡ <strong>Action:</strong> {leak.remediation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: GEOPOLITICAL THREAT CONTEXT */}
      {activeSubTab === 'geopolitics' && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe color="var(--color-secondary)" size={20} /> Geopolitical Cyber-Warfare & Physical Risk Telemetry
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {GEOPOLITICAL_EVENTS.map((event) => (
              <div key={event.id} style={{
                background: 'rgba(15, 23, 42, 0.85)',
                borderRadius: '14px',
                padding: '20px',
                border: '1px solid rgba(127, 83, 172, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                gap: '12px'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} /> {event.region}
                    </span>
                    <span className={`badge ${event.riskLevel === 'CRITICAL' ? 'badge-high' : 'badge-warn'}`}>
                      {event.riskLevel} RISK
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>{event.threatType}</h4>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: '10px' }}>
                    <strong>Active Actor:</strong> {event.actorGroup}
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{event.summary}</p>
                </div>

                <div style={{ background: 'rgba(5, 11, 20, 0.5)', padding: '12px', borderRadius: '8px', fontSize: '0.82rem' }}>
                  <div style={{ marginBottom: '4px', fontWeight: 600, color: 'var(--color-primary)' }}>Impacted Corporate Offices:</div>
                  <div style={{ color: 'var(--text-main)' }}>{event.impactedOffices.join(', ')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 3: AUTOMATED PLAYBOOK GENERATION */}
      {activeSubTab === 'playbooks' && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileCode2 color="var(--color-accent)" size={20} /> Automated Threat Detection Playbook Generator (YARA / Sigma / Snort)
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
            {/* Rule Inputs Form */}
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '20px', borderRadius: '14px', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: '6px' }}>
                Select Target Standard:
              </label>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                {['yara', 'sigma', 'snort'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setRuleType(type)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: ruleType === type ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
                      color: ruleType === type ? '#050b14' : 'var(--text-muted)'
                    }}
                  >
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px', display: 'block' }}>Rule / Threat Identifier:</label>
                <input
                  type="text"
                  className="input-field"
                  value={ruleTitle}
                  onChange={(e) => setRuleTitle(e.target.value)}
                  placeholder="e.g. RedLine_Stealer_Payload"
                  style={{ height: '40px', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px', display: 'block' }}>Indicator of Compromise (IOC String/Domain):</label>
                <input
                  type="text"
                  className="input-field"
                  value={iocString}
                  onChange={(e) => setIocString(e.target.value)}
                  placeholder="e.g. malicious-c2-beacon.org"
                  style={{ height: '40px', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>
                Instant export for enterprise SIEM (Splunk, Elastic), Firewalls (Palo Alto, Snort), and EDR agents (CrowdStrike, Defender).
              </div>
            </div>

            {/* Rule Output Code Box */}
            <div style={{ background: '#070c16', padding: '20px', borderRadius: '14px', border: '1px solid rgba(0, 242, 254, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Terminal size={16} /> Executable {ruleType.toUpperCase()} Detection Definition
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={handleCopy} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
                      {copied ? <Check size={14} color="#00ff88" /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                    <button onClick={handleDownload} className="btn-primary" style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
                      <Download size={14} /> Export Rule File
                    </button>
                  </div>
                </div>

                <pre style={{
                  background: '#04070e',
                  padding: '16px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontFamily: 'monospace',
                  color: '#00f2fe',
                  overflowX: 'auto',
                  maxHeight: '260px',
                  lineHeight: 1.5,
                  margin: 0
                }}>
                  {getGeneratedRule()}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 4: VULNERABILITY PRIORITIZATION MATRIX */}
      {activeSubTab === 'epss' && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap color="#ff007f" size={20} /> Vulnerability Prioritization Matrix (EPSS vs CVSS Real-World Exploit Index)
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Source: FIRST EPSS v3 API & CISA KEV Catalog
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,242,254,0.2)', color: 'var(--color-primary)' }}>
                  <th style={{ padding: '12px' }}>CVE ID</th>
                  <th style={{ padding: '12px' }}>Vulnerable Software</th>
                  <th style={{ padding: '12px' }}>CVSS v3.1</th>
                  <th style={{ padding: '12px' }}>EPSS Exploit Prob.</th>
                  <th style={{ padding: '12px' }}>CISA KEV Status</th>
                  <th style={{ padding: '12px' }}>In-The-Wild Threat State</th>
                  <th style={{ padding: '12px' }}>Priority</th>
                </tr>
              </thead>
              <tbody>
                {VULNERABILITY_MATRIX_DATA.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: idx % 2 === 0 ? 'rgba(15,23,42,0.4)' : 'transparent' }}>
                    <td style={{ padding: '12px', fontWeight: 700, color: 'var(--color-primary)' }}>{item.cve}</td>
                    <td style={{ padding: '12px' }}>{item.software}</td>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{item.cvssScore}</td>
                    <td style={{ padding: '12px', color: item.epssScore > 0.5 ? '#ff4d4d' : '#ffb800', fontWeight: 700 }}>
                      {(item.epssScore * 100).toFixed(1)}%
                    </td>
                    <td style={{ padding: '12px' }}>
                      {item.cisaKev ? (
                        <span className="badge badge-high" style={{ fontSize: '0.72rem' }}>KEV LISTED</span>
                      ) : (
                        <span className="badge badge-safe" style={{ fontSize: '0.72rem' }}>Unlisted</span>
                      )}
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{item.weaponizedState}</td>
                    <td style={{ padding: '12px' }}>
                      <span className={`badge ${item.priority.includes('CRITICAL') ? 'badge-high' : 'badge-warn'}`}>
                        {item.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
