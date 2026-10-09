import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Code2, 
  HelpCircle, 
  BookOpen, 
  CheckCircle2, 
  Cpu, 
  Terminal
} from 'lucide-react';
import { PRESET_AI_QUESTIONS, generateAiAssistantResponse } from '../utils/cyberAiEngine';

export default function AiAssistantView() {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      textSimple: 'Hello! I am Aegis AI, your intelligent security assistant. I translate complex cybersecurity terms, phishing tricks, and digital threats into simple, plain English explanations. How can I help you stay safe online today?',
      textTechnical: 'Aegis Security Intelligence Agent v3.8 online. Ready to analyze attack vectors, DNS security protocols, OAuth consent abuses, and cryptographic entropy models.'
    }
  ]);
  const [viewMode, setViewMode] = useState('simple'); // 'simple' or 'technical'

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    const userText = query.trim();
    setQuery('');

    // Append user message
    const newHistory = [...chatHistory, { sender: 'user', textSimple: userText, textTechnical: userText }];
    setChatHistory(newHistory);

    // Generate AI response
    setTimeout(() => {
      const response = generateAiAssistantResponse(userText);
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'ai',
          textSimple: response.simple,
          textTechnical: response.technical
        }
      ]);
    }, 400);
  };

  const handleSelectPreset = (presetObj) => {
    const userText = presetObj.title;
    setChatHistory(prev => [
      ...prev,
      { sender: 'user', textSimple: userText, textTechnical: userText },
      { sender: 'ai', textSimple: presetObj.answerSimple, textTechnical: presetObj.technicalDetails }
    ]);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Top Header Card */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bot color="var(--color-primary)" size={24} /> Aegis AI Security Tutor & Threat Decoder
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Ask any cybersecurity question or convert complex technical terms into simple, understandable explanations.
            </p>
          </div>

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

        {/* Preset Prompt Chips */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', alignSelf: 'center', fontWeight: 600 }}>TOP QUESTIONS:</span>
          {PRESET_AI_QUESTIONS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className="btn-secondary"
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
                  background: 'rgba(0, 242, 254, 0.15)',
                  border: '1px solid rgba(0, 242, 254, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  flexShrink: 0
                }}>
                  <Bot size={20} color="var(--color-primary)" />
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
                {msg.sender === 'ai' ? (
                  viewMode === 'simple' ? msg.textSimple : (msg.textTechnical || msg.textSimple)
                ) : (
                  msg.textSimple
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Ask Aegis AI anything (e.g. 'How do I know if an email header is spoofed?')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ height: '48px', fontSize: '0.95rem' }}
          />
          <button type="submit" className="btn-primary" style={{ height: '48px', padding: '0 24px', flexShrink: 0 }}>
            <Send size={16} /> Send Question
          </button>
        </form>
      </div>
    </div>
  );
}
