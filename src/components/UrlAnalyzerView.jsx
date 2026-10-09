import React, { useState } from 'react';
import { 
  Globe, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Search, 
  Copy, 
  ExternalLink,
  Lock,
  Unlock,
  FileText,
  Eye,
  Server
} from 'lucide-react';
import { analyzeUrl } from '../utils/urlAnalyzerEngine';

export default function UrlAnalyzerView({ currentResult, onAnalysisComplete, onOpenReport }) {
  const [inputUrl, setInputUrl] = useState(currentResult ? currentResult.url : '');
  const [analysis, setAnalysis] = useState(currentResult || null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSandbox, setShowSandbox] = useState(true);

  const handleScan = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    try {
      const res = analyzeUrl(inputUrl);
      setAnalysis(res);
      onAnalysisComplete('url', res);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const loadPreset = (presetUrl) => {
    setInputUrl(presetUrl);
    try {
      const res = analyzeUrl(presetUrl);
      setAnalysis(res);
      onAnalysisComplete('url', res);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Header Bar */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe color="var(--color-primary)" size={24} /> URL & Domain Threat Inspector
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Performs deep heuristic, homographic, cryptographic, and reputational analysis on links.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => loadPreset('http://paypa1-security-update.tk/login?id=9918')}
              className="btn-secondary" 
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              Preset 1: Paypa1 Homograph
            </button>
            <button 
              onClick={() => loadPreset('https://аpple.com/auth-verify')}
              className="btn-secondary" 
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              Preset 2: Cyrillic Glyph
            </button>
            <button 
              onClick={() => loadPreset('https://accounts.google.com/ServiceLogin')}
              className="btn-secondary" 
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              Preset 3: Official Google
            </button>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleScan} style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Enter web link to inspect (e.g. http://secure-login.chase-bank.tk)..."
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            style={{ height: '48px', fontSize: '0.95rem' }}
          />
          <button type="submit" className="btn-primary" style={{ height: '48px', padding: '0 24px' }}>
            <Search size={18} /> Inspect Link
          </button>
        </form>

        {errorMsg && (
          <div style={{ color: 'var(--color-danger)', fontSize: '0.88rem', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={16} /> {errorMsg}
          </div>
        )}
      </div>

      {analysis && (
        <div className="grid-dashboard">
          {/* Left Column: Risk Gauge & Indicators */}
          <div className="col-7">
            {/* Risk Gauge Card */}
            <div className="glass-card" style={{ padding: '24px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>OVERALL THREAT EVALUATION</span>
                <span className="badge" style={{ background: `${analysis.levelColor}20`, color: analysis.levelColor, border: `1px solid ${analysis.levelColor}40` }}>
                  {analysis.threatLevel}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span style={{ fontSize: '3rem', fontWeight: 900, color: analysis.levelColor }}>
                  {analysis.riskScore}
                </span>
                <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/ 100 Threat Index</span>
              </div>

              {/* Progress Bar */}
              <div className="gauge-bar-container">
                <div 
                  className="gauge-bar-fill" 
                  style={{
                    width: `${analysis.riskScore}%`,
                    background: analysis.riskScore >= 60 ? 'linear-gradient(90deg, #ffb100, #ff0844)' : (analysis.riskScore >= 25 ? '#ffb100' : '#00e676')
                  }}
                />
              </div>

              {/* Target Domain Info */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                padding: '12px 16px',
                borderRadius: '8px',
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between'
              }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Target Host:</span>
                <span className="mono-text" style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                  {analysis.hostname}
                </span>
              </div>
            </div>

            {/* Plain English Explanation */}
            <div className="glass-card" style={{ padding: '24px', marginBottom: '20px', borderLeft: `4px solid ${analysis.levelColor}` }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={18} color="var(--color-primary)" /> Simple Security Assistant Summary
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {analysis.plainEnglishExplanation}
              </p>
            </div>

            {/* Detected Indicators List */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px' }}>
                Security Indicators Breakdown ({analysis.indicators.length})
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {analysis.indicators.map((ind, i) => (
                  <div key={i} style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: ind.level === 'DANGER' ? 'var(--color-danger-bg)' : (ind.level === 'WARNING' ? 'var(--color-warning-bg)' : 'var(--color-safe-bg)'),
                    border: `1px solid ${ind.level === 'DANGER' ? 'var(--color-danger-border)' : (ind.level === 'WARNING' ? 'var(--color-warning-border)' : 'var(--color-safe-border)')}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: ind.level === 'DANGER' ? 'var(--color-danger)' : (ind.level === 'WARNING' ? 'var(--color-warning)' : 'var(--color-safe)') }}>
                        {ind.title}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                        +{ind.scoreWeight} Risk Points
                      </span>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      {ind.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Recommendations & Isolated Sandbox Mockup */}
          <div className="col-5">
            {/* Action Playbook */}
            <div className="glass-card" style={{ padding: '24px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px' }}>
                Actionable Safety Recommendations
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {analysis.recommendations.map((rec, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.86rem', lineHeight: 1.4 }}>
                    {rec.type === 'DONT' && <XCircle size={16} color="var(--color-danger)" style={{ flexShrink: 0, marginTop: '2px' }} />}
                    {rec.type === 'CAUTION' && <AlertTriangle size={16} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />}
                    {rec.type === 'DO' && <CheckCircle2 size={16} color="var(--color-safe)" style={{ flexShrink: 0, marginTop: '2px' }} />}
                    <span style={{ color: rec.type === 'DONT' ? '#ff4e50' : 'var(--text-main)' }}>
                      {rec.text}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={onOpenReport}
                className="btn-primary" 
                style={{ width: '100%', marginTop: '20px', justifyContent: 'center' }}
              >
                <FileText size={16} /> Export Analysis Report PDF
              </button>
            </div>

            {/* Simulated Headless Web Page Sandbox */}
            <div className="glass-card" style={{ padding: '20px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Eye size={16} color="var(--color-primary)" /> Isolated Sandbox Preview
                </span>
                <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>CONTAINED VIRTUALIZATION</span>
              </div>

              <div style={{
                background: '#040711',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '12px',
                fontFamily: 'var(--font-mono)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', marginBottom: '12px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginLeft: '8px' }}>
                    {analysis.protocol}//{analysis.hostname}
                  </span>
                </div>

                {analysis.riskScore >= 60 ? (
                  <div style={{ textAlign: 'center', padding: '20px 10px' }}>
                    <AlertTriangle size={36} color="var(--color-danger)" style={{ marginBottom: '10px' }} />
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-danger)', fontWeight: 700, marginBottom: '6px' }}>
                      [SANDBOX BLOCKED MALICIOUS PAGE]
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Deceptive login form harvest script detected. Render prevented to safeguard workstation.
                    </p>
                  </div>
                ) : (
                  <div style={{ padding: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <div>HTTP/1.1 200 OK</div>
                    <div>Server: nginx/1.18.0</div>
                    <div>Content-Type: text/html; charset=UTF-8</div>
                    <div style={{ color: 'var(--color-safe)', marginTop: '8px' }}>
                      &lt;!-- Verified SSL Handshake Complete --&gt;
                    </div>
                  </div>
                )}
              </div>

              {/* Technical Details Grid */}
              <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.78rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-dim)' }}>Resolved IP:</span>
                  <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>{analysis.simulatedDetails.resolvedIp}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-dim)' }}>Domain Age:</span>
                  <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>{analysis.simulatedDetails.domainAgeDays} days</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-dim)' }}>SSL Issuer:</span>
                  <div style={{ color: 'var(--text-main)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {analysis.simulatedDetails.sslIssuer}
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-dim)' }}>DMARC Alignment:</span>
                  <div style={{ color: analysis.simulatedDetails.dmarcStatus.includes('PASS') ? 'var(--color-safe)' : 'var(--color-danger)', fontWeight: 600 }}>
                    {analysis.simulatedDetails.dmarcStatus}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
