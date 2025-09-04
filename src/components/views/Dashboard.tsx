import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { StatCard } from '../ui/StatCard';
import { ProjectCard } from '../ui/ProjectCard';
import { DashboardStats, Project, TokenMetrics } from '../../types';
import { api } from '../../services/api';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [metrics, setMetrics] = useState<TokenMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const [dashboardStats, projectsData, metricsData] = await Promise.all([
        api.getDashboardStats(),
        api.getProjects(),
        api.getTokenMetrics()
      ]);
      
      setStats(dashboardStats);
      setProjects(projectsData);
      setMetrics(metricsData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    loadData(true);
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-lg">
        <div className="h-8 bg-surface/50 rounded w-48"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-surface/50 rounded-card"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-surface/50 rounded-card"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-lg animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-text-primary">Dashboard</h2>
          <p className="text-text-secondary mt-1">Track your token earnings and project performance</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center px-md py-sm bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-button transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="text-sm font-medium text-primary">Refresh</span>
        </button>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
          <StatCard
            title="Total Earnings"
            value={stats.totalEarnings}
            format="currency"
            change={stats.percentageChange}
            variant="positive"
          />
          <StatCard
            title="Total Holders"
            value={stats.totalHolders}
            change={8.2}
          />
          <StatCard
            title="24h Volume"
            value={stats.totalVolume24h}
            format="currency"
            change={-2.1}
            variant="negative"
          />
          <StatCard
            title="Active Projects"
            value={stats.activeProjects}
          />
        </div>
      )}

      {/* Projects Grid */}
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-lg">Your Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {projects.map((project) => {
            const projectMetrics = metrics.find(m => m.project_id === project.project_id);
            return (
              <ProjectCard
                key={project.project_id}
                project={project}
                metrics={projectMetrics}
                className="animate-slide-up"
              />
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface/50 backdrop-blur-sm border border-surface/50 rounded-card p-lg">
        <h3 className="text-lg font-semibold text-text-primary mb-md">Recent Activity</h3>
        <div className="space-y-md">
          <div className="flex items-center justify-between py-sm border-b border-surface/30 last:border-b-0">
            <div>
              <p className="text-text-primary font-medium">New holder for Creator Token Alpha</p>
              <p className="text-xs text-text-secondary">2 minutes ago</p>
            </div>
            <span className="text-accent font-medium">+1 holder</span>
          </div>
          <div className="flex items-center justify-between py-sm border-b border-surface/30 last:border-b-0">
            <div>
              <p className="text-text-primary font-medium">Volume spike on Beta Creator Coin</p>
              <p className="text-xs text-text-secondary">15 minutes ago</p>
            </div>
            <span className="text-primary font-medium">+45% volume</span>
          </div>
          <div className="flex items-center justify-between py-sm">
            <div>
              <p className="text-text-primary font-medium">Creator earnings updated</p>
              <p className="text-xs text-text-secondary">1 hour ago</p>
            </div>
            <span className="text-accent font-medium">+2.3 SOL</span>
          </div>
        </div>
      </div>
    </div>
  );
};