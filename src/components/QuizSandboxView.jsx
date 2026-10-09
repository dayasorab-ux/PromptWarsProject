import React, { useState } from 'react';
import { 
  Gamepad2, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RotateCcw, 
  Award,
  Zap,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PHISHING_SCENARIOS } from '../utils/phishingQuizData';

export default function QuizSandboxView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // true = Phishing, false = Legitimate
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const scenario = PHISHING_SCENARIOS[currentIndex];

  const handleAnswer = (userChoiceIsPhishing) => {
    if (showExplanation) return;
    
    setSelectedAnswer(userChoiceIsPhishing);
    setShowExplanation(true);

    const isCorrect = userChoiceIsPhishing === scenario.isPhishing;
    if (isCorrect) {
      setScore(prev => prev + 100);
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      } catch (e) {}
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentIndex + 1 < PHISHING_SCENARIOS.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      try {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setIsCompleted(false);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Header */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Gamepad2 color="var(--color-primary)" size={24} /> Interactive Phishing Simulator Arena
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Test your ability to spot Cyrillic homographs, smishing links, and fake OAuth consent traps in real-world scenarios.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>AWARENESS SCORE</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {score} PTS
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <div className="grid-dashboard">
          {/* Main Scenario Card */}
          <div className="col-8">
            <div className="glass-card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span className="badge badge-info">
                  SCENARIO #{currentIndex + 1} OF {PHISHING_SCENARIOS.length}
                </span>
                <span className="badge badge-warning">
                  Difficulty: {scenario.difficulty}
                </span>
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>
                {scenario.title}
              </h3>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-dim)', marginBottom: '20px' }}>
                Attack Vector: <strong style={{ color: 'var(--color-primary)' }}>{scenario.type}</strong> | Sender ID: <span className="mono-text" style={{ color: 'var(--text-main)' }}>{scenario.sender}</span>
              </div>

              {/* Message Content Sandbox Box */}
              <div style={{
                background: '#060a12',
                border: '1px solid rgba(0, 242, 254, 0.2)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: '#f0f4f8',
                fontFamily: scenario.type.includes('Link') ? 'var(--font-mono)' : 'inherit'
              }}>
                {scenario.message}
              </div>

              {/* Decision Action Buttons */}
              {!showExplanation ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <button
                    onClick={() => handleAnswer(true)}
                    className="btn-danger"
                    style={{ justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
                  >
                    <ShieldAlert size={20} /> Flag as PHISHING / MALICIOUS
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="btn-primary"
                    style={{ justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
                  >
                    <CheckCircle2 size={20} /> Mark as SAFE / LEGITIMATE
                  </button>
                </div>
              ) : (
                <div>
                  {/* Feedback Banner */}
                  <div style={{
                    padding: '16px 20px',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    background: selectedAnswer === scenario.isPhishing ? 'var(--color-safe-bg)' : 'var(--color-danger-bg)',
                    border: `1px solid ${selectedAnswer === scenario.isPhishing ? 'var(--color-safe-border)' : 'var(--color-danger-border)'}`
                  }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: selectedAnswer === scenario.isPhishing ? 'var(--color-safe)' : 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {selectedAnswer === scenario.isPhishing ? (
                        <>
                          <CheckCircle2 size={22} /> Correct Assessment! (+100 Points)
                        </>
                      ) : (
                        <>
                          <XCircle size={22} /> Incorrect! Threat Missed.
                        </>
                      )}
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '8px', lineHeight: 1.5 }}>
                      {scenario.explanation}
                    </p>
                  </div>

                  {/* Red Flags List */}
                  {scenario.redFlags.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>KEY RED FLAGS TO LOOK OUT FOR:</h4>
                      <ul style={{ paddingLeft: '20px', fontSize: '0.86rem', color: '#ff4e50', lineHeight: 1.6 }}>
                        {scenario.redFlags.map((flag, idx) => (
                          <li key={idx}>{flag}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button onClick={handleNext} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                    Continue to Next Scenario →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Training Tips */}
          <div className="col-4">
            <div className="glass-card" style={{ padding: '24px', height: '100%' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award color="var(--color-primary)" size={20} /> Defense Rule of Thumb
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                  <strong style={{ color: 'var(--color-primary)' }}>1. Inspect the TLD Extension</strong>
                  <div>Domains ending in .tk, .top, or .xyz for major brands are almost always scam links.</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                  <strong style={{ color: 'var(--color-warning)' }}>2. Never Trust SMS Links</strong>
                  <div>Log into services directly through official mobile apps rather than tapping text message links.</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                  <strong style={{ color: 'var(--color-safe)' }}>3. Beware OAuth Permission Popups</strong>
                  <div>Never grant "Read Email" consent to unfamiliar third-party browser add-ons.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Completed Screen */
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <Award size={64} color="var(--color-primary)" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>Phishing Arena Completed!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '24px' }}>
            You completed all threat awareness scenarios with a final score of <strong style={{ color: 'var(--color-primary)' }}>{score} PTS</strong>.
          </p>

          <button onClick={handleRestart} className="btn-primary" style={{ padding: '12px 32px', margin: '0 auto' }}>
            <RotateCcw size={18} /> Replay Simulation Arena
          </button>
        </div>
      )}
    </div>
  );
}
