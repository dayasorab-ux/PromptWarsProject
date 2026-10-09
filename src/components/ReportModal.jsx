import React from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  ShieldAlert, 
  CheckCircle2, 
  FileText, 
  Lock, 
  Server
} from 'lucide-react';

export default function ReportModal({ isOpen, onClose, currentUrlResult, currentMsgResult }) {
  if (!isOpen) return null;

  const activeResult = currentUrlResult || currentMsgResult || {
    url: 'http://paypa1-security-update.tk/login?id=9918',
    hostname: 'paypa1-security-update.tk',
    riskScore: 85,
    threatLevel: 'HIGH THREAT / DANGEROUS',
    levelColor: '#ff0844',
    indicators: [
      { category: 'Brand Mimicry', title: 'Apparent Brand Impersonation (PayPal)', scoreWeight: 30, description: 'Mimics PayPal domain structure' },
      { category: 'TLD Reputation', title: 'High-Risk Top-Level Domain (.tk)', scoreWeight: 25, description: 'Abused TLD extension' }
    ],
    recommendations: [
      { type: 'DONT', text: 'DO NOT enter credentials or personal data.' },
      { type: 'DO', text: 'Report link to anti-phishing registry.' }
    ],
    plainEnglishExplanation: 'This link is a fake webpage pretending to be PayPal designed to harvest credentials.'
  };

  const incidentId = `CS-INC-${Math.floor(Math.random()*9000 + 1000)}`;
  const timestamp = new Date().toLocaleString();

  const handlePrint = () => {
    window.print();
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(activeResult, null, 2));
    alert('JSON Incident Report copied to clipboard!');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 242, 254, 0.2)', paddingBottom: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText color="var(--color-primary)" size={24} />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>SECURITY INCIDENT REPORT</h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                INCIDENT ID: {incidentId} | {timestamp}
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Printable Report Body */}
        <div id="printable-report" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
          {/* Executive Summary Box */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: `1px solid ${activeResult.levelColor}40`,
            borderRadius: '10px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>EVALUATION SUMMARY</span>
              <span className="badge" style={{ background: `${activeResult.levelColor}20`, color: activeResult.levelColor }}>
                {activeResult.threatLevel || 'DANGEROUS'}
              </span>
            </div>
            
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: activeResult.levelColor }}>
              {activeResult.riskScore} / 100 Threat Index
            </div>

            <div style={{ marginTop: '8px', color: 'var(--text-main)', fontWeight: 600 }}>
              Target Asset: <span className="mono-text" style={{ color: 'var(--color-primary)' }}>{activeResult.url || activeResult.rawText}</span>
            </div>
          </div>

          {/* Simple Explanation Section */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
              1. Plain Language Assistant Summary
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              {activeResult.plainEnglishExplanation || activeResult.plainLanguageSummary}
            </p>
          </div>

          {/* Indicators Table */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
              2. Technical Threat Indicators ({activeResult.indicators?.length || activeResult.detectedTriggers?.length || 0})
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(activeResult.indicators || activeResult.detectedTriggers || []).map((ind, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  display: 'flex',
                  justify: 'space-between',
                  fontSize: '0.84rem'
                }}>
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{ind.title || ind.label}</span>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{ind.description || ind.category}</div>
                  </div>
                  <span style={{ color: 'var(--text-dim)', fontWeight: 600 }}>+{ind.scoreWeight || ind.weight} pts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Playbook */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
              3. Recommended Mitigation Playbook
            </h4>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.86rem' }}>
              {(activeResult.recommendations || activeResult.actionPlan || []).map((step, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>
                  {step.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
          <button onClick={handleCopyJson} className="btn-secondary">
            <Copy size={15} /> Copy JSON Data
          </button>
          <button onClick={handlePrint} className="btn-primary">
            <Printer size={15} /> Save / Print PDF Report
          </button>
        </div>
      </div>
    </div>
  );
}
