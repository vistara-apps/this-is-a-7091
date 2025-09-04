import React, { useState } from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './components/views/Dashboard';
import { Analytics } from './components/views/Analytics';
import { Projects } from './components/views/Projects';
import { Settings } from './components/views/Settings';
import { SubscriptionProvider } from './hooks/useSubscription';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      case 'projects':
        return <Projects />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SubscriptionProvider>
      <div className="min-h-screen bg-background">
        {/* Hero Section - Only show on first load or when no active view */}
        {activeView === 'dashboard' && (
          <div className="gradient-bg min-h-96 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 text-center text-white px-md">
              <h1 className="text-5xl md:text-6xl font-bold mb-md">
                Token Tracker Pro
              </h1>
              <p className="text-xl md:text-2xl opacity-90 mb-lg max-w-2xl mx-auto">
                Track your creator token earnings and project performance in real-time
              </p>
              <button 
                onClick={() => setActiveView('dashboard')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-xl py-md rounded-button font-medium transition-all duration-200 hover:scale-105"
              >
                View Dashboard
              </button>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          </div>
        )}

        <DashboardLayout
          activeView={activeView}
          onViewChange={setActiveView}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        >
          {renderView()}
        </DashboardLayout>
      </div>
    </SubscriptionProvider>
  );
}

export default App;