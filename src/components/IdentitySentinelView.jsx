import React, { useState } from 'react';
import { 
  UserCheck, 
  KeyRound, 
  Database, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  Lock, 
  Clock, 
  Zap,
  Info
} from 'lucide-react';
import { checkEmailBreaches, analyzePasswordStrength } from '../utils/breachSentinelEngine';

export default function IdentitySentinelView() {
  const [emailInput, setEmailInput] = useState('');
  const [breachResult, setBreachResult] = useState(null);
  const [emailError, setEmailError] = useState('');

  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckBreaches = (e) => {
    if (e) e.preventDefault();
    setEmailError('');
    try {
      const res = checkEmailBreaches(emailInput);
      setBreachResult(res);
    } catch (err) {
      setEmailError(err.message);
    }
  };

  const pwdAnalysis = analyzePasswordStrength(passwordInput);

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Page Header */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <UserCheck color="var(--color-warning)" size={24} /> Identity Theft & Breach Sentinel
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Inspect leaked credentials across compromised databases and audit your password entropy & time-to-crack metrics.
        </p>
      </div>

      <div className="grid-dashboard">
        {/* Left Column: Data Breach Lookup */}
        <div className="col-6">
          <div className="glass-card" style={{ padding: '24px', height: '100%' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={20} color="var(--color-primary)" /> Email Breach Exposure Audit
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Check if your email address has appeared in known public data dumps or dark web credentials leaks.
            </p>

            <form onSubmit={handleCheckBreaches} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input
                type="email"
                className="input-field"
                placeholder="Enter email address (e.g. alex@company.com)..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                style={{ height: '46px', fontSize: '0.92rem' }}
              />
              <button type="submit" className="btn-primary" style={{ height: '46px', padding: '0 20px', flexShrink: 0 }}>
                <Search size={16} /> Audit Email
              </button>
            </form>

            {emailError && (
              <div style={{ color: 'var(--color-danger)', fontSize: '0.85rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={15} /> {emailError}
              </div>
            )}

            {/* Quick Preset Buttons */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', alignSelf: 'center' }}>TEST SAMPLES:</span>
              <button
                onClick={() => {
                  setEmailInput('alex.dev@corp.com');
                  setBreachResult(checkEmailBreaches('alex.dev@corp.com'));
                }}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', padding: '4px 10px' }}
              >
                alex.dev@corp.com
              </button>
              <button
                onClick={() => {
                  setEmailInput('security.user@gmail.com');
                  setBreachResult(checkEmailBreaches('security.user@gmail.com'));
                }}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', padding: '4px 10px' }}
              >
                security.user@gmail.com
              </button>
            </div>

            {breachResult && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: breachResult.isPwned ? 'var(--color-danger)' : 'var(--color-safe)' }}>
                    {breachResult.isPwned ? `EXPOSED IN ${breachResult.breachCount} BREACHES` : 'NO BREACHES DETECTED'}
                  </span>
                  <span className="badge" style={{ background: breachResult.isPwned ? 'var(--color-danger-bg)' : 'var(--color-safe-bg)', color: breachResult.isPwned ? 'var(--color-danger)' : 'var(--color-safe)' }}>
                    Risk Score: {breachResult.riskScore}/100
                  </span>
                </div>

                {/* Exposed Fields Tags */}
                {breachResult.exposedFields.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '6px' }}>EXPOSED PII DATA FIELDS:</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {breachResult.exposedFields.map((field, idx) => (
                        <span key={idx} className="badge badge-warning" style={{ fontSize: '0.75rem' }}>
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matched Breaches */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {breachResult.matchedBreaches.map((b, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(15, 23, 42, 0.7)',
                      border: '1px solid rgba(255, 8, 68, 0.3)',
                      borderRadius: '8px',
                      padding: '12px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>{b.name}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{b.date}</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                        {b.description}
                      </p>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)' }}>
                        Exposed Records: {b.recordCount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Password Strength & Cryptographic Entropy */}
        <div className="col-6">
          <div className="glass-card" style={{ padding: '24px', height: '100%' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <KeyRound size={20} color="var(--color-warning)" /> Password Entropy & Crack Time Meter
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Evaluates character entropy, dictionary vulnerability, and estimated GPU brute-force crack duration.
            </p>

            {/* Input Field */}
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-field mono-text"
                placeholder="Type a password to test entropy strength..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                style={{ height: '46px', paddingRight: '70px', fontSize: '0.95rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '12px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary)',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>

            {/* Strength Meter Box */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: `1px solid ${pwdAnalysis.color}40`,
              borderRadius: '10px',
              padding: '18px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>ENTROPY EVALUATION</span>
                <span className="badge" style={{ background: `${pwdAnalysis.color}20`, color: pwdAnalysis.color }}>
                  {pwdAnalysis.status}
                </span>
              </div>

              <div className="gauge-bar-container">
                <div 
                  className="gauge-bar-fill" 
                  style={{
                    width: `${pwdAnalysis.score}%`,
                    background: pwdAnalysis.color
                  }}
                />
              </div>

              {/* Crack Time Metric */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '14px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                <Clock size={20} color={pwdAnalysis.color} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>ESTIMATED TIME TO BRUTE-FORCE CRACK:</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: pwdAnalysis.color }}>
                    {pwdAnalysis.crackTimeFormatted}
                  </div>
                </div>
              </div>

              {/* Entropy Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px', fontSize: '0.8rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-dim)' }}>Length:</span>
                  <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>{pwdAnalysis.length} characters</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-dim)' }}>Entropy Score:</span>
                  <div style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{pwdAnalysis.entropyBits} bits</div>
                </div>
              </div>

              {/* Character Pool Diversity checklist */}
              <div style={{ marginTop: '14px', display: 'flex', gap: '10px', flexWrap: 'wrap', fontSize: '0.78rem' }}>
                <span style={{ color: pwdAnalysis.hasLower ? 'var(--color-safe)' : 'var(--text-dim)' }}>
                  {pwdAnalysis.hasLower ? '✓' : '✗'} Lowercase (a-z)
                </span>
                <span style={{ color: pwdAnalysis.hasUpper ? 'var(--color-safe)' : 'var(--text-dim)' }}>
                  {pwdAnalysis.hasUpper ? '✓' : '✗'} Uppercase (A-Z)
                </span>
                <span style={{ color: pwdAnalysis.hasDigit ? 'var(--color-safe)' : 'var(--text-dim)' }}>
                  {pwdAnalysis.hasDigit ? '✓' : '✗'} Numbers (0-9)
                </span>
                <span style={{ color: pwdAnalysis.hasSymbol ? 'var(--color-safe)' : 'var(--text-dim)' }}>
                  {pwdAnalysis.hasSymbol ? '✓' : '✗'} Symbols (!@#$)
                </span>
              </div>

              {/* Feedback */}
              {pwdAnalysis.feedback.length > 0 && (
                <div style={{ marginTop: '14px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {pwdAnalysis.feedback.map((fb, idx) => (
                    <div key={idx} style={{ color: pwdAnalysis.isCommon ? 'var(--color-danger)' : 'var(--color-warning)', marginTop: '4px' }}>
                      • {fb}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
