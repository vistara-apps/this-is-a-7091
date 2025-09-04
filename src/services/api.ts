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

  async addProject(projectData: Omit<Project, 'project_id'>): Promise<Project> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newProject: Project = {
      ...projectData,
      project_id: 'project-' + Date.now()
    };
    
    mockProjects.push(newProject);
    
    // Create initial metrics for the new project
    const initialMetrics: TokenMetrics = {
      project_id: newProject.project_id,
      timestamp: new Date().toISOString(),
      market_cap_usd: Math.floor(Math.random() * 200000) + 50000,
      volume_24h_sol: Math.random() * 100,
      holders_count: Math.floor(Math.random() * 500) + 100,
      creator_earnings_sol: Math.random() * 20
    };
    
    mockMetrics.push(initialMetrics);
    
    return newProject;
  },

  async updateProject(projectId: string, updates: Partial<Project>): Promise<Project> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const projectIndex = mockProjects.findIndex(p => p.project_id === projectId);
    if (projectIndex === -1) {
      throw new Error('Project not found');
    }
    
    mockProjects[projectIndex] = { ...mockProjects[projectIndex], ...updates };
    return mockProjects[projectIndex];
  },

  async deleteProject(projectId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const projectIndex = mockProjects.findIndex(p => p.project_id === projectId);
    if (projectIndex === -1) {
      throw new Error('Project not found');
    }
    
    mockProjects.splice(projectIndex, 1);
    // Remove associated metrics
    const metricsIndex = mockMetrics.findIndex(m => m.project_id === projectId);
    if (metricsIndex !== -1) {
      mockMetrics.splice(metricsIndex, 1);
    }
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

  async getCreatorAttribution(projectId: string): Promise<{
    volumeToEarningsRatio: number;
    holdersGrowthImpact: number;
    marketCapCorrelation: number;
    insights: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const metrics = mockMetrics.find(m => m.project_id === projectId);
    if (!metrics) {
      throw new Error('Project metrics not found');
    }
    
    // Mock attribution analysis
    const volumeToEarningsRatio = metrics.volume_24h_sol / metrics.creator_earnings_sol;
    const holdersGrowthImpact = Math.random() * 0.8 + 0.2; // 0.2 to 1.0
    const marketCapCorrelation = Math.random() * 0.9 + 0.1; // 0.1 to 1.0
    
    const insights = [
      `Every 1 SOL in trading volume generates approximately ${(1 / volumeToEarningsRatio).toFixed(3)} SOL in creator earnings`,
      `Holder growth has a ${(holdersGrowthImpact * 100).toFixed(1)}% correlation with earnings increase`,
      `Market cap changes show ${(marketCapCorrelation * 100).toFixed(1)}% correlation with creator revenue`,
      holdersGrowthImpact > 0.6 ? 'Strong community engagement drives earnings' : 'Focus on community building for better returns'
    ];
    
    return {
      volumeToEarningsRatio,
      holdersGrowthImpact,
      marketCapCorrelation,
      insights
    };
  },

  async exportData(format: 'csv' | 'json' = 'csv'): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (format === 'json') {
      return JSON.stringify({
        projects: mockProjects,
        metrics: mockMetrics,
        exportedAt: new Date().toISOString()
      }, null, 2);
    }
    
    // CSV format
    const headers = ['Project Name', 'Token Symbol', 'Launch Date', 'Market Cap (USD)', '24h Volume (SOL)', 'Holders', 'Creator Earnings (SOL)'];
    const rows = mockProjects.map(project => {
      const metrics = mockMetrics.find(m => m.project_id === project.project_id);
      return [
        project.name,
        project.token_symbol,
        project.launch_date,
        metrics?.market_cap_usd || 0,
        metrics?.volume_24h_sol || 0,
        metrics?.holders_count || 0,
        metrics?.creator_earnings_sol || 0
      ];
    });
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  },

  getSolscanUrl(tokenAddress: string): string {
    return `https://solscan.io/token/${tokenAddress}`;
  },

  // Supabase integration helpers (for future implementation)
  supabase: {
    async fetchProjects(): Promise<Project[]> {
      // TODO: Implement Supabase query
      // const { data, error } = await supabase.from('projects').select('*');
      // if (error) throw error;
      // return data;
      return api.getProjects();
    },

    async fetchTokenMetrics(projectId?: string): Promise<TokenMetrics[]> {
      // TODO: Implement Supabase query
      // let query = supabase.from('token_metrics').select('*');
      // if (projectId) query = query.eq('project_id', projectId);
      // const { data, error } = await query;
      // if (error) throw error;
      // return data;
      return api.getTokenMetrics(projectId);
    }
  }
};
