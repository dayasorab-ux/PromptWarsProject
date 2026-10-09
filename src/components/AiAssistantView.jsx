import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Key, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  Cpu,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { 
  PRESET_AI_QUESTIONS, 
  generateAiAssistantResponse, 
  getActiveGeminiApiKey 
} from '../utils/cyberAiEngine';

export default function AiAssistantView() {
  const [query, setQuery] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [hasGeminiActive, setHasGeminiActive] = useState(false);

  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      source: 'gemini',
      textSimple: 'Hello! I am Aegis AI, your intelligent security assistant powered by Google Gemini AI. I translate complex cybersecurity terms, phishing tricks, and digital threats into simple, plain English explanations as well as technical deep dives. How can I help you stay safe online today?',
      textTechnical: 'Aegis Security Intelligence Agent v4.0 (Google Gemini 2.5 Flash Engine online). Ready to analyze attack vectors, DNS security protocols, OAuth consent abuses, and cryptographic entropy models.'
    }
  ]);
  const [viewMode, setViewMode] = useState('simple'); // 'simple' or 'technical'

  useEffect(() => {
    const currentKey = getActiveGeminiApiKey();
    if (currentKey) {
      setApiKey(currentKey);
      setHasGeminiActive(true);
    }
  }, []);

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setHasGeminiActive(true);
      setShowKeyInput(false);
    } else {
      localStorage.removeItem('gemini_api_key');
      setHasGeminiActive(!!import.meta.env.VITE_GEMINI_API_KEY);
      setShowKeyInput(false);
    }
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim() || isThinking) return;

    const userText = query.trim();
    setQuery('');

    // Append user message immediately
    const updatedHistory = [...chatHistory, { sender: 'user', textSimple: userText, textTechnical: userText }];
    setChatHistory(updatedHistory);
    setIsThinking(true);

    try {
      const response = await generateAiAssistantResponse(userText, apiKey);
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'ai',
          source: response.source || 'local',
          textSimple: response.simple,
          textTechnical: response.technical
        }
      ]);
    } catch (err) {
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'ai',
          source: 'local',
          textSimple: 'An error occurred while connecting to the AI engine. Please verify your query or API key.',
          textTechnical: 'API Connection Exception: ' + (err.message || 'Unknown error')
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSelectPreset = async (presetObj) => {
    if (isThinking) return;
    const userText = presetObj.title;

    setChatHistory(prev => [...prev, { sender: 'user', textSimple: userText, textTechnical: userText }]);
    setIsThinking(true);

    try {
      const response = await generateAiAssistantResponse(userText, apiKey);
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'ai',
          source: response.source || 'local',
          textSimple: response.simple || presetObj.answerSimple,
          textTechnical: response.technical || presetObj.technicalDetails
        }
      ]);
    } catch (err) {
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'ai',
          source: 'local',
          textSimple: presetObj.answerSimple,
          textTechnical: presetObj.technicalDetails
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Top Header Card */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bot color="var(--color-primary)" size={24} /> Aegis AI Security Tutor & Threat Decoder
              </h2>
              {hasGeminiActive ? (
                <span className="badge" style={{ background: 'rgba(0, 242, 254, 0.15)', border: '1px solid var(--color-primary)', color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={12} /> Google Gemini AI Active
                </span>
              ) : (
                <span className="badge" style={{ background: 'rgba(255, 184, 0, 0.15)', border: '1px solid #ffb800', color: '#ffb800', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Cpu size={12} /> Local Threat Engine Active
                </span>
              )}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
              Ask any cybersecurity question powered by Google Gemini AI, or convert complex technical threat vectors into plain English.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Configure API Key Button */}
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="btn-secondary"
              style={{ fontSize: '0.82rem', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Key size={14} color="var(--color-primary)" /> {hasGeminiActive ? 'Gemini Key Configured' : 'Connect Gemini API Key'}
            </button>

            {/* Dual View Toggle */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              padding: '4px',
              borderRadius: '10px',
              border: '1px solid rgba(0, 242, 254, 0.2)',
              display: 'flex',
              gap: '4px'
            }}>
              <button
                onClick={() => setViewMode('simple')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: viewMode === 'simple' ? 'var(--color-primary)' : 'transparent',
                  color: viewMode === 'simple' ? '#050b14' : 'var(--text-muted)',
                  transition: 'all 0.2s ease'
                }}
              >
                Plain English Mode
              </button>
              <button
                onClick={() => setViewMode('technical')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: viewMode === 'technical' ? 'var(--color-secondary)' : 'transparent',
                  color: viewMode === 'technical' ? '#050b14' : 'var(--text-muted)',
                  transition: 'all 0.2s ease'
                }}
              >
                Technical Deep Dive
              </button>
            </div>
          </div>
        </div>

        {/* Gemini API Key Drawer */}
        {showKeyInput && (
          <form onSubmit={handleSaveApiKey} style={{ marginTop: '18px', padding: '16px', background: 'rgba(15, 23, 42, 0.9)', borderRadius: '12px', border: '1px solid rgba(0, 242, 254, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} /> Google Gemini API Key:
              </label>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Stored securely in browser local storage</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="password"
                className="input-field"
                placeholder="Paste your Google Gemini API key (AIzaSy...)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                style={{ height: '40px', fontSize: '0.88rem' }}
              />
              <button type="submit" className="btn-primary" style={{ height: '40px', padding: '0 18px', fontSize: '0.85rem' }}>
                Save Key
              </button>
              {apiKey && (
                <button 
                  type="button" 
                  onClick={() => { setApiKey(''); localStorage.removeItem('gemini_api_key'); setHasGeminiActive(false); }}
                  className="btn-secondary" 
                  style={{ height: '40px', padding: '0 14px', fontSize: '0.85rem', color: '#ff4d4d' }}
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        )}

        {/* Preset Prompt Chips */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', alignSelf: 'center', fontWeight: 600 }}>TOP SECURITY TOPICS:</span>
          {PRESET_AI_QUESTIONS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className="btn-secondary"
              disabled={isThinking}
              style={{ fontSize: '0.78rem', padding: '5px 12px' }}
            >
              <Sparkles size={13} color="var(--color-primary)" /> {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="glass-card" style={{ padding: '24px', minHeight: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Messages Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', maxHeight: '420px', paddingRight: '8px' }}>
          {chatHistory.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              {msg.sender === 'ai' && (
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: msg.source === 'gemini' ? 'rgba(0, 242, 254, 0.18)' : 'rgba(255, 184, 0, 0.15)',
                  border: msg.source === 'gemini' ? '1px solid rgba(0, 242, 254, 0.5)' : '1px solid rgba(255, 184, 0, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Bot size={20} color={msg.source === 'gemini' ? 'var(--color-primary)' : '#ffb800'} />
                </div>
              )}

              <div style={{
                maxWidth: '78%',
                padding: '16px 20px',
                borderRadius: '14px',
                background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' : 'rgba(15, 23, 42, 0.85)',
                color: msg.sender === 'user' ? '#050b14' : 'var(--text-main)',
                border: msg.sender === 'user' ? 'none' : '1px solid rgba(0, 242, 254, 0.15)',
                boxShadow: msg.sender === 'user' ? '0 4px 15px rgba(0, 242, 254, 0.2)' : 'none',
                fontWeight: msg.sender === 'user' ? 600 : 400,
                fontSize: '0.94rem',
                lineHeight: 1.6,
                whiteSpace: 'pre-line'
              }}>
                {msg.sender === 'ai' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontSize: '0.72rem', fontWeight: 700, color: msg.source === 'gemini' ? 'var(--color-primary)' : '#ffb800' }}>
                    {msg.source === 'gemini' ? (
                      <>
                        <Sparkles size={12} /> Powered by Google Gemini 2.5 Flash
                      </>
                    ) : (
                      <>
                        <Cpu size={12} /> Powered by Local Cyber Engine
                      </>
                    )}
                  </div>
                )}
                {msg.sender === 'ai' ? (
                  viewMode === 'simple' ? msg.textSimple : (msg.textTechnical || msg.textSimple)
                ) : (
                  msg.textSimple
                )}
              </div>
            </div>
          ))}

          {isThinking && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(0, 242, 254, 0.15)',
                border: '1px solid rgba(0, 242, 254, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={20} color="var(--color-primary)" />
              </div>
              <div style={{
                padding: '12px 18px',
                borderRadius: '14px',
                background: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(0, 242, 254, 0.15)',
                color: 'var(--color-primary)',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Loader2 size={16} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                Gemini AI is analyzing threat vectors and security protocols...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Ask Aegis Gemini AI anything (e.g. 'How do I know if an email header is spoofed?')..."
            value={query}
            disabled={isThinking}
            onChange={(e) => setQuery(e.target.value)}
            style={{ height: '48px', fontSize: '0.95rem' }}
          />
          <button type="submit" disabled={isThinking} className="btn-primary" style={{ height: '48px', padding: '0 24px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isThinking ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={16} />}
            Send Question
          </button>
        </form>
      </div>
    </div>
  );
}
