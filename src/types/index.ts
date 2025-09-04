export interface Project {
  project_id: string;
  name: string;
  token_address: string;
  token_symbol: string;
  token_name: string;
  launch_date: string;
  deployed_url: string;
  project_id_external: string;
}

export interface TokenMetrics {
  project_id: string;
  timestamp: string;
  market_cap_usd: number;
  volume_24h_sol: number;
  holders_count: number;
  creator_earnings_sol: number;
}

export interface User {
  user_id: string;
  email: string;
  subscription_tier: 'free' | 'pro' | 'premium';
  projects: string[];
}

export type SubscriptionTier = 'free' | 'pro' | 'premium';

export interface DashboardStats {
  totalEarnings: number;
  totalHolders: number;
  totalVolume24h: number;
  activeProjects: number;
  percentageChange: number;
}