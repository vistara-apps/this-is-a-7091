import React from 'react';
import { BarChart3, DollarSign, Folder, Settings, Crown } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  feature?: string;
}

interface SidebarNavProps {
  activeView: string;
  onViewChange: (view: string) => void;
  className?: string;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeView,
  onViewChange,
  className = ''
}) => {
  const { canAccessFeature, tier } = useSubscription();

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <Folder className="w-5 h-5" />
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <DollarSign className="w-5 h-5" />,
      feature: 'historical-data'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />
    }
  ];

  return (
    <nav className={`space-y-2 ${className}`}>
      {navItems.map((item) => {
        const isAccessible = !item.feature || canAccessFeature(item.feature);
        const isActive = activeView === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => isAccessible && onViewChange(item.id)}
            disabled={!isAccessible}
            className={`w-full flex items-center px-md py-sm rounded-button text-left transition-all duration-200 ${
              isActive
                ? 'bg-primary/20 text-primary border border-primary/30'
                : isAccessible
                ? 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                : 'text-text-secondary/50 cursor-not-allowed'
            }`}
          >
            <span className="mr-sm">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
            {!isAccessible && (
              <Crown className="w-4 h-4 ml-auto text-yellow-500" />
            )}
          </button>
        );
      })}
      
      {/* Subscription Tier Badge */}
      <div className="pt-md border-t border-surface/30">
        <div className="px-md py-sm">
          <div className="text-xs text-text-secondary mb-1">Subscription</div>
          <div className={`text-sm font-medium capitalize ${
            tier === 'premium' ? 'text-yellow-500' : 
            tier === 'pro' ? 'text-primary' : 
            'text-text-secondary'
          }`}>
            {tier}
          </div>
        </div>
      </div>
    </nav>
  );
};