import React, { useState } from 'react';
import HeaderTicker from './components/HeaderTicker';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import UrlAnalyzerView from './components/UrlAnalyzerView';
import MessageClassifierView from './components/MessageClassifierView';
import IdentitySentinelView from './components/IdentitySentinelView';
import AiAssistantView from './components/AiAssistantView';
import QuizSandboxView from './components/QuizSandboxView';
import ThreatIntelSuiteView from './components/ThreatIntelSuiteView';
import AttackSurfaceVendorView from './components/AttackSurfaceVendorView';
import ReportModal from './components/ReportModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUrlResult, setCurrentUrlResult] = useState(null);
  const [currentMsgResult, setCurrentMsgResult] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const handleAnalysisComplete = (type, result) => {
    if (type === 'url') {
      setCurrentUrlResult(result);
    } else if (type === 'message') {
      setCurrentMsgResult(result);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Threat Radar Ticker */}
      <HeaderTicker />

      {/* Main Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Main Application Content Body */}
      <main className="app-container" style={{ flex: 1 }}>
        {activeTab === 'dashboard' && (
          <DashboardView 
            setActiveTab={setActiveTab} 
            onAnalysisComplete={handleAnalysisComplete}
          />
        )}

        {activeTab === 'threatIntel' && (
          <ThreatIntelSuiteView />
        )}

        {activeTab === 'attackSurface' && (
          <AttackSurfaceVendorView />
        )}

        {activeTab === 'url' && (
          <UrlAnalyzerView 
            currentResult={currentUrlResult}
            onAnalysisComplete={handleAnalysisComplete}
            onOpenReport={() => setIsReportOpen(true)}
          />
        )}

        {activeTab === 'message' && (
          <MessageClassifierView 
            currentResult={currentMsgResult}
            onAnalysisComplete={handleAnalysisComplete}
            onOpenReport={() => setIsReportOpen(true)}
          />
        )}

        {activeTab === 'sentinel' && (
          <IdentitySentinelView />
        )}

        {activeTab === 'ai' && (
          <AiAssistantView />
        )}

        {activeTab === 'quiz' && (
          <QuizSandboxView />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(0, 242, 254, 0.15)',
        padding: '24px 0',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.82rem',
        marginTop: '60px'
      }}>
        <div className="app-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            © 2026 <strong style={{ color: 'var(--color-primary)' }}>CYBERSHIELD AI</strong> — Enterprise Intelligent Security & Defense Platform
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>EASM Engine</span>
            <span>Zero-Trust Architecture</span>
            <span>APWG & FIRST EPSS Standards</span>
          </div>
        </div>
      </footer>

      {/* Incident Report Modal */}
      <ReportModal 
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        currentUrlResult={currentUrlResult}
        currentMsgResult={currentMsgResult}
      />
    </div>
  );
}
