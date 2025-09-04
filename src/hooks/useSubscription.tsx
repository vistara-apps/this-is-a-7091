import React, { createContext, useContext, useState } from 'react';
import { SubscriptionTier } from '../types';

interface SubscriptionContextType {
  tier: SubscriptionTier;
  setTier: (tier: SubscriptionTier) => void;
  canAccessFeature: (feature: string) => boolean;
  maxProjects: number;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tier, setTier] = useState<SubscriptionTier>('free');

  const canAccessFeature = (feature: string): boolean => {
    switch (feature) {
      case 'historical-data':
        return tier === 'pro' || tier === 'premium';
      case 'creator-attribution':
        return tier === 'premium';
      case 'unlimited-projects':
        return tier === 'pro' || tier === 'premium';
      default:
        return true;
    }
  };

  const maxProjects = tier === 'free' ? 3 : Infinity;

  return (
    <SubscriptionContext.Provider value={{ tier, setTier, canAccessFeature, maxProjects }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
