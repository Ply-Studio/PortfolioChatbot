import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { PortfolioWebsite } from './components/PortfolioWebsite';
import { ChatbotWidget } from './components/ChatbotWidget';
import { AdminDashboard } from './components/AdminDashboard';
import { CheckCircle2, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, notification, setNotification, setIsWidgetOpen } = useApp();

  const isWidgetOnly = typeof window !== 'undefined' && (
    window.location.search.includes('mode=widget') ||
    window.location.search.includes('embed=true')
  );

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('open=true')) {
      setIsWidgetOpen(true);
    }
  }, [setIsWidgetOpen]);

  if (isWidgetOnly) {
    return (
      <div className="min-h-screen bg-transparent flex items-end justify-end p-2 sm:p-4">
        <ChatbotWidget isStandalone={true} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#07090e]">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-indigo-950/90 border border-indigo-500/40 text-indigo-100 text-xs shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
          <button
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-white p-0.5 ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main View Router */}
      {currentView === 'portfolio' ? <PortfolioWebsite /> : <AdminDashboard />}

      {/* Persistent Floating Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
