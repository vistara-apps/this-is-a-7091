import { Project, TokenMetrics, DashboardStats } from '../types';

// Mock data for demonstration
const mockProjects: Project[] = [
  {
    project_id: '1',
    name: 'Creator Token Alpha',
    token_address: 'So11111111111111111111111111111111111111112',
    token_symbol: 'CTA',
    token_name: 'Creator Token Alpha',
    launch_date: '2024-01-15T00:00:00Z',
    deployed_url: 'https://app.example.com/alpha',
    project_id_external: 'alpha-001'
  },
  {
    project_id: '2',
    name: 'Beta Creator Coin',
    token_address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    token_symbol: 'BCC',
    token_name: 'Beta Creator Coin',
    launch_date: '2024-02-01T00:00:00Z',
    deployed_url: 'https://app.example.com/beta',
    project_id_external: 'beta-002'
  },
  {
    project_id: '3',
    name: 'Gamma Social Token',
    token_address: '7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj',
    token_symbol: 'GST',
    token_name: 'Gamma Social Token',
    launch_date: '2024-01-28T00:00:00Z',
    deployed_url: 'https://app.example.com/gamma',
    project_id_external: 'gamma-003'
  }
];

const mockMetrics: TokenMetrics[] = [
  {
    project_id: '1',
    timestamp: new Date().toISOString(),
    market_cap_usd: 125000,
    volume_24h_sol: 45.2,
    holders_count: 342,
    creator_earnings_sol: 12.5
  },
  {
    project_id: '2',
    timestamp: new Date().toISOString(),
    market_cap_usd: 89000,
    volume_24h_sol: 32.1,
    holders_count: 256,
    creator_earnings_sol: 8.7
  },
  {
    project_id: '3',
    timestamp: new Date().toISOString(),
    market_cap_usd: 156000,
    volume_24h_sol: 67.8,
    holders_count: 489,
    creator_earnings_sol: 15.3
  }
];

// Generate historical data
const generateHistoricalData = (projectId: string, days: number = 30): TokenMetrics[] => {
  const baseMetric = mockMetrics.find(m => m.project_id === projectId);
  if (!baseMetric) return [];

  const data: TokenMetrics[] = [];
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const variance = 0.8 + Math.random() * 0.4; // 0.8 to 1.2 multiplier
    data.push({
      ...baseMetric,
      timestamp: date.toISOString(),
      market_cap_usd: Math.floor(baseMetric.market_cap_usd * variance),
      volume_24h_sol: Number((baseMetric.volume_24h_sol * variance).toFixed(1)),
      holders_count: Math.floor(baseMetric.holders_count * (0.9 + Math.random() * 0.2)),
      creator_earnings_sol: Number((baseMetric.creator_earnings_sol * variance).toFixed(2))
    });
  }
  return data;
};

export const api = {
  async getProjects(): Promise<Project[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProjects;
  },

  async getTokenMetrics(projectId?: string): Promise<TokenMetrics[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (projectId) {
      return mockMetrics.filter(m => m.project_id === projectId);
    }
    return mockMetrics;
  },

  async getHistoricalMetrics(projectId: string, days: number = 30): Promise<TokenMetrics[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return generateHistoricalData(projectId, days);
  },

  async getDashboardStats(): Promise<DashboardStats> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const totalEarnings = mockMetrics.reduce((sum, m) => sum + m.creator_earnings_sol, 0);
    const totalHolders = mockMetrics.reduce((sum, m) => sum + m.holders_count, 0);
    const totalVolume24h = mockMetrics.reduce((sum, m) => sum + m.volume_24h_sol, 0);
    
    return {
      totalEarnings,
      totalHolders,
      totalVolume24h,
      activeProjects: mockProjects.length,
      percentageChange: 12.5 // Mock percentage change
    };
  },

  getSolscanUrl(tokenAddress: string): string {
    return `https://solscan.io/token/${tokenAddress}`;
  }
};