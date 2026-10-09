import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Radio, 
  ShieldAlert, 
  Server, 
  Building2, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  ExternalLink,
  Cpu,
  Layers,
  FileCheck
} from 'lucide-react';
import { 
  EASM_ASSETS, 
  ADVERSARY_INFRASTRUCTURE, 
  BRAND_PROTECTION_ITEMS, 
  THIRD_PARTY_VENDORS 
} from '../utils/attackSurfaceEngine';

export default function AttackSurfaceVendorView() {
  const [activeSubTab, setActiveSubTab] = useState('easm'); // 'easm', 'adversary', 'brand', 'vendors'
  const [takedownList, setTakedownList] = useState(BRAND_PROTECTION_ITEMS);
  const [takedownNoticeModal, setTakedownNoticeModal] = useState(null);

  const handleInitiateTakedown = (item) => {
    setTakedownList(prev => prev.map(t => t.id === item.id ? { ...t, status: 'Takedown Initiated', takedownProgress: 90 } : t));
    setTakedownNoticeModal(item);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Navigation Sub-Header */}
      <div className="glass-card" style={{ padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Radio color="var(--color-primary)" size={24} /> Attack Surface & Supply Chain Defense Suite
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Dynamic External Attack Surface Mapping (EASM), adversary infrastructure telemetry, automated brand protection, and vendor risk scoring.
            </p>
          </div>

          {/* Sub-Tab Switcher */}
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
              onClick={() => setActiveSubTab('easm')}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: activeSubTab === 'easm' ? 'var(--color-primary)' : 'transparent',
                color: activeSubTab === 'easm' ? '#050b14' : 'var(--text-muted)',
                transition: 'all 0.2s ease'
              }}
            >
              🎯 Attack Surface Map (EASM)
            </button>
            <button
              onClick={() => setActiveSubTab('adversary')}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: activeSubTab === 'adversary' ? 'var(--color-secondary)' : 'transparent',
                color: activeSubTab === 'adversary' ? '#050b14' : 'var(--text-muted)',
                transition: 'all 0.2s ease'
              }}
            >
              🛰️ Adversary Infrastructure
            </button>
            <button
              onClick={() => setActiveSubTab('brand')}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: activeSubTab === 'brand' ? '#ff007f' : 'transparent',
                color: activeSubTab === 'brand' ? '#fff' : 'var(--text-muted)',
                transition: 'all 0.2s ease'
              }}
            >
              🛡️ Brand Protection & Takedowns
            </button>
            <button
              onClick={() => setActiveSubTab('vendors')}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: activeSubTab === 'vendors' ? 'var(--color-accent)' : 'transparent',
                color: activeSubTab === 'vendors' ? '#050b14' : 'var(--text-muted)',
                transition: 'all 0.2s ease'
              }}
            >
              🏢 Supply Chain Vendor Risk
            </button>
          </div>
        </div>
      </div>

      {/* MODULE 1: DYNAMIC ATTACK SURFACE MAPPING (EASM) */}
      {activeSubTab === 'easm' && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Server color="var(--color-primary)" size={20} /> External Internet-Facing Asset Inventory
            </h3>
            <span className="badge badge-safe" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
              📡 4 Key Public Assets Monitored
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,242,254,0.2)', color: 'var(--color-primary)' }}>
                  <th style={{ padding: '12px' }}>Asset Domain / Name</th>
                  <th style={{ padding: '12px' }}>Asset Category</th>
                  <th style={{ padding: '12px' }}>IP Address</th>
                  <th style={{ padding: '12px' }}>Open Ports</th>
                  <th style={{ padding: '12px' }}>Cloud Provider</th>
                  <th style={{ padding: '12px' }}>Security Status</th>
                  <th style={{ padding: '12px' }}>Risk Grade</th>
                </tr>
              </thead>
              <tbody>
                {EASM_ASSETS.map((asset) => (
                  <tr key={asset.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px', fontWeight: 700, color: 'var(--color-primary)' }}>{asset.assetName}</td>
                    <td style={{ padding: '12px' }}>{asset.type}</td>
                    <td style={{ padding: '12px', fontFamily: 'monospace' }}>{asset.ipAddress}</td>
                    <td style={{ padding: '12px' }}>
                      {asset.openPorts.map(p => (
                        <span key={p} style={{
                          display: 'inline-block',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: p === 9200 || p === 22 ? 'rgba(255,77,77,0.2)' : 'rgba(0,242,254,0.1)',
                          border: p === 9200 || p === 22 ? '1px solid #ff4d4d' : '1px solid rgba(0,242,254,0.3)',
                          marginRight: '4px',
                          fontSize: '0.78rem',
                          color: p === 9200 || p === 22 ? '#ff4d4d' : 'var(--color-primary)'
                        }}>
                          {p}
                        </span>
                      ))}
                    </td>
                    <td style={{ padding: '12px' }}>{asset.cloudProvider}</td>
                    <td style={{ padding: '12px', color: asset.riskScore === 'CRITICAL' ? '#ff4d4d' : 'var(--text-muted)' }}>{asset.status}</td>
                    <td style={{ padding: '12px' }}>
                      <span className={`badge ${asset.riskScore === 'CRITICAL' ? 'badge-high' : asset.riskScore === 'HIGH' ? 'badge-warn' : 'badge-safe'}`}>
                        {asset.riskScore}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 2: ADVERSARY INFRASTRUCTURE TRACKING */}
      {activeSubTab === 'adversary' && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio color="var(--color-secondary)" size={20} /> Adversary Infrastructure & Malicious Host Telemetry
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {ADVERSARY_INFRASTRUCTURE.map((adv) => (
              <div key={adv.id} style={{
                background: 'rgba(15, 23, 42, 0.85)',
                borderRadius: '14px',
                padding: '20px',
                border: '1px solid rgba(0, 242, 254, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                gap: '12px'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <strong style={{ fontSize: '1.05rem', color: '#ff4d4d', fontFamily: 'monospace' }}>{adv.domain}</strong>
                    <span className="badge badge-high" style={{ fontSize: '0.72rem' }}>PRE-CAMPAIGN</span>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
                    <strong>Threat Actor:</strong> {adv.threatActor}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{adv.status}</div>
                </div>

                <div style={{ background: 'rgba(5, 11, 20, 0.6)', padding: '12px', borderRadius: '8px', fontSize: '0.8rem', lineHeight: 1.6 }}>
                  <div>📅 <strong>Registered:</strong> {adv.registeredDate}</div>
                  <div>🌐 <strong>Registrar:</strong> {adv.registrar}</div>
                  <div>🖥️ <strong>IP Node:</strong> <code>{adv.ipCluster}</code></div>
                  <div>🔒 <strong>SSL Cert Issuer:</strong> {adv.sslIssuer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 3: BRAND PROTECTION & TAKEDOWN AUTOMATION */}
      {activeSubTab === 'brand' && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert color="#ff007f" size={20} /> Automated Brand Protection & Instant Takedown Requests
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Integrated with Registrar Abuse APIs & APWG Phishing Network
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {takedownList.map((item) => (
              <div key={item.id} style={{
                background: 'rgba(15, 23, 42, 0.8)',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid rgba(255, 0, 127, 0.3)',
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span className="badge" style={{ background: 'rgba(255,0,127,0.15)', color: '#ff007f', border: '1px solid #ff007f' }}>
                      {item.type}
                    </span>
                    <strong style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>{item.asset}</strong>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>{item.threatDetails}</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ width: '140px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                      <span>Progress</span>
                      <strong>{item.takedownProgress}%</strong>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.takedownProgress}%`, height: '100%', background: 'linear-gradient(90deg, #ff007f, var(--color-primary))' }} />
                    </div>
                  </div>

                  <button
                    onClick={() => handleInitiateTakedown(item)}
                    className="btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                  >
                    <Send size={14} /> Send Fast Takedown Notice
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Takedown Notice Modal Popup */}
          {takedownNoticeModal && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(5, 11, 20, 0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}>
              <div className="glass-card" style={{ maxWidth: '600px', width: '100%', padding: '28px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '12px' }}>
                  ⚡ Automated Cease & Desist / Registrar Takedown Issued
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                  Abuse notification dispatched to hosting registrar, Google Safe Browsing, and APWG Abuse Registry for target: <strong>{takedownNoticeModal.asset}</strong>.
                </p>

                <div style={{ background: '#050b14', padding: '14px', borderRadius: '8px', fontSize: '0.82rem', fontFamily: 'monospace', color: '#00f2fe', marginBottom: '20px' }}>
                  [AUTO-TAKEDOWN-REF-{takedownNoticeModal.id}] DMCA & Trademark Infringement Notice sent. Domain status set to ClientHold / Suspended.
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => setTakedownNoticeModal(null)} className="btn-primary" style={{ padding: '8px 20px' }}>
                    Close & Track Progress
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODULE 4: SUPPLY CHAIN & THIRD-PARTY RISK SCORING */}
      {activeSubTab === 'vendors' && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 color="var(--color-accent)" size={20} /> Third-Party Vendor Risk & Island-Hopping Defense Scorecard
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Continuous SaaS / API Dependency Monitoring
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {THIRD_PARTY_VENDORS.map((vendor) => (
              <div key={vendor.id} style={{
                background: 'rgba(15, 23, 42, 0.85)',
                borderRadius: '14px',
                padding: '20px',
                border: '1px solid rgba(0, 242, 254, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                gap: '14px'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <strong style={{ fontSize: '1.1rem' }}>{vendor.vendorName}</strong>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: vendor.riskGrade.startsWith('A') ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255, 77, 77, 0.15)',
                      border: vendor.riskGrade.startsWith('A') ? '1px solid #00ff88' : '1px solid #ff4d4d',
                      color: vendor.riskGrade.startsWith('A') ? '#00ff88' : '#ff4d4d',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1.1rem'
                    }}>
                      {vendor.riskGrade}
                    </div>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: '10px' }}>
                    {vendor.category}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    <span>Security Posture Score:</span>
                    <strong style={{ color: vendor.securityScore >= 80 ? '#00ff88' : '#ffb800' }}>{vendor.securityScore} / 100</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>MFA Compliance:</span>
                    <strong style={{ color: vendor.mfaEnforced ? '#00ff88' : '#ff4d4d' }}>
                      {vendor.mfaEnforced ? 'Enforced' : 'Not Enforced!'}
                    </strong>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(5, 11, 20, 0.6)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: 'var(--text-dim)' }}>Audited: {vendor.lastAuditDate}</span>
                  <span className={`badge ${vendor.riskGrade.startsWith('A') ? 'badge-safe' : 'badge-high'}`}>
                    {vendor.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
