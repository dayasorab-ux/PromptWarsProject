import React, { useState } from 'react';
import { 
  MessageSquareWarning, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Search, 
  FileText, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { classifyMessage, PRESET_SCAM_SAMPLES } from '../utils/messageClassifierEngine';

export default function MessageClassifierView({ currentResult, onAnalysisComplete, onOpenReport }) {
  const [messageText, setMessageText] = useState(currentResult ? currentResult.rawText : '');
  const [analysis, setAnalysis] = useState(currentResult || null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleClassify = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    try {
      const res = classifyMessage(messageText);
      setAnalysis(res);
      onAnalysisComplete('message', res);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const loadPreset = (presetObj) => {
    setMessageText(presetObj.text);
    try {
      const res = classifyMessage(presetObj.text);
      setAnalysis(res);
      onAnalysisComplete('message', res);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Top Card */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MessageSquareWarning color="var(--color-danger)" size={24} /> Scam Message & Email Classifier
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Analyzes SMS smishing, phishing emails, and WhatsApp text for psychological pressure, fake invoices, and link traps.
          </p>
        </div>

        {/* Preset Sample Selector Chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', alignSelf: 'center', fontWeight: 600 }}>PRESET SCENARIOS:</span>
          {PRESET_SCAM_SAMPLES.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => loadPreset(sample)}
              className="btn-secondary"
              style={{ fontSize: '0.78rem', padding: '5px 12px' }}
            >
              {sample.title}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleClassify}>
          <textarea
            className="textarea-field"
            placeholder="Paste raw SMS text, suspicious email body, or chat message here..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            style={{ fontSize: '0.95rem', minHeight: '120px' }}
          />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              {messageText.length} characters analyzed
            </span>
            <button type="submit" className="btn-primary">
              <Zap size={16} /> Classify Message
            </button>
          </div>
        </form>

        {errorMsg && (
          <div style={{ color: 'var(--color-danger)', fontSize: '0.88rem', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={16} /> {errorMsg}
          </div>
        )}
      </div>

      {analysis && (
        <div className="grid-dashboard">
          {/* Left Column: Classification Category & NLP Triggers */}
          <div className="col-7">
            {/* Classification Banner */}
            <div className="glass-card" style={{ padding: '24px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>CLASSIFICATION OUTCOME</span>
                <span className="badge" style={{ background: `${analysis.threatColor}20`, color: analysis.threatColor, border: `1px solid ${analysis.threatColor}40` }}>
                  {analysis.riskScore >= 60 ? 'HIGH HAZARD' : (analysis.riskScore >= 30 ? 'CAUTION' : 'LOW RISK')}
                </span>
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: analysis.threatColor, marginBottom: '8px' }}>
                {analysis.category}
              </h3>

              {/* Progress Bar */}
              <div className="gauge-bar-container">
                <div 
                  className="gauge-bar-fill" 
                  style={{
                    width: `${analysis.riskScore}%`,
                    background: analysis.threatColor
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>Threat Risk Score: <strong style={{ color: 'var(--text-main)' }}>{analysis.riskScore} / 100</strong></span>
                <span>Links Analyzed: <strong style={{ color: 'var(--color-primary)' }}>{analysis.analyzedLinks.length}</strong></span>
              </div>
            </div>

            {/* Plain English Summary */}
            <div className="glass-card" style={{ padding: '24px', marginBottom: '20px', borderLeft: `4px solid ${analysis.threatColor}` }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Info size={18} color="var(--color-primary)" /> Security Assistant Explanation
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {analysis.plainLanguageSummary}
              </p>
            </div>

            {/* Detected NLP Threat Triggers */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px' }}>
                Psychological & Scam Triggers Identified ({analysis.detectedTriggers.length})
              </h3>

              {analysis.detectedTriggers.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                  No suspicious manipulation or threat markers were found in this text.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {analysis.detectedTriggers.map((trig, i) => (
                    <div key={i} style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: trig.level === 'DANGER' ? 'var(--color-danger-bg)' : 'var(--color-warning-bg)',
                      border: `1px solid ${trig.level === 'DANGER' ? 'var(--color-danger-border)' : 'var(--color-warning-border)'}`,
                      display: 'flex',
                      justify: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase' }}>
                          [{trig.category}]
                        </span>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: trig.level === 'DANGER' ? 'var(--color-danger)' : 'var(--color-warning)', marginTop: '2px' }}>
                          {trig.label}
                        </div>
                      </div>
                      <span className="badge" style={{ background: 'rgba(0,0,0,0.3)', color: 'var(--text-main)' }}>
                        +{trig.weight} pts
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Action Playbook & Embedded Links Breakdown */}
          <div className="col-5">
            {/* Action Playbook */}
            <div className="glass-card" style={{ padding: '24px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px' }}>
                Actionable Safety Response Steps
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {analysis.actionPlan.map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.86rem', lineHeight: 1.4 }}>
                    {step.type === 'DONT' && <XCircle size={16} color="var(--color-danger)" style={{ flexShrink: 0, marginTop: '2px' }} />}
                    {step.type === 'CAUTION' && <AlertTriangle size={16} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />}
                    {step.type === 'DO' && <CheckCircle2 size={16} color="var(--color-safe)" style={{ flexShrink: 0, marginTop: '2px' }} />}
                    <span style={{ color: step.type === 'DONT' ? '#ff4e50' : 'var(--text-main)' }}>
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={onOpenReport}
                className="btn-primary" 
                style={{ width: '100%', marginTop: '20px', justifyContent: 'center' }}
              >
                <FileText size={16} /> Export Incident Playbook
              </button>
            </div>

            {/* Embedded Link Extractions */}
            <div className="glass-card" style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px' }}>
                Extracted Links Safety Rating ({analysis.analyzedLinks.length})
              </h3>

              {analysis.analyzedLinks.length === 0 ? (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  No web links were embedded inside this text.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {analysis.analyzedLinks.map((linkRes, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(15, 23, 42, 0.7)',
                      border: `1px solid ${linkRes.levelColor}40`,
                      borderRadius: '8px',
                      padding: '12px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span className="mono-text" style={{ fontSize: '0.82rem', color: 'var(--color-primary)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                          {linkRes.hostname}
                        </span>
                        <span className="badge" style={{ background: `${linkRes.levelColor}20`, color: linkRes.levelColor }}>
                          {linkRes.riskScore}/100 Risk
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Protocol: {linkRes.protocol} | Homographs: {linkRes.indicators.some(i => i.category === 'Character Mimicry') ? 'YES' : 'NONE'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
