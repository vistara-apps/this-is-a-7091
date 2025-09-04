import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { SidebarNav } from '../ui/SidebarNav';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeView,
  onViewChange,
  sidebarOpen,
  setSidebarOpen
}) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface/80 backdrop-blur-sm border-b border-surface/50 px-lg py-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-button hover:bg-surface/70 transition-colors mr-md"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-text-primary">Token Tracker Pro</h1>
          </div>
          <div className="flex items-center space-x-md">
            <button className="p-2 rounded-button hover:bg-surface/70 transition-colors">
              <Bell className="w-5 h-5 text-text-secondary" />
            </button>
            <button className="p-2 rounded-button hover:bg-surface/70 transition-colors">
              <User className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-surface/50 backdrop-blur-sm border-r border-surface/50 
          transform transition-transform duration-300 ease-in-out lg:transform-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-lg">
            <SidebarNav activeView={activeView} onViewChange={onViewChange} />
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-lg">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};