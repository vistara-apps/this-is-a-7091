import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Lock, Download } from 'lucide-react';
import { Project, TokenMetrics } from '../../types';
import { api } from '../../services/api';
import { useSubscription } from '../../hooks/useSubscription';
import { format } from 'date-fns';

export const Analytics: React.FC = () => {
  const { canAccessFeature } = useSubscription();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [historicalData, setHistoricalData] = useState<TokenMetrics[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState(30);
  const [exporting, setExporting] = useState(false);

  const hasAccess = canAccessFeature('historical-data');

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProject && hasAccess) {
      loadHistoricalData();
    }
  }, [selectedProject, dateRange, hasAccess]);

  const loadProjects = async () => {
    try {
      const projectsData = await api.getProjects();
      setProjects(projectsData);
      if (projectsData.length > 0) {
        setSelectedProject(projectsData[0].project_id);
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  };

  const loadHistoricalData = async () => {
    if (!selectedProject) return;
    
    setLoading(true);
    try {
      const data = await api.getHistoricalMetrics(selectedProject, dateRange);
      setHistoricalData(data);
    } catch (error) {
      console.error('Failed to load historical data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center space-y-md">
          <Lock className="w-16 h-16 text-text-secondary mx-auto" />
          <h3 className="text-xl font-semibold text-text-primary">Analytics Requires Pro</h3>
          <p className="text-text-secondary max-w-md">
            Upgrade to Pro or Premium to access historical data and advanced analytics features.
          </p>
          <div className="pt-md">
            <button className="px-lg py-sm bg-primary hover:bg-primary/90 text-white rounded-button font-medium transition-colors">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    );
  }

  const chartData = historicalData.map(metric => ({
    date: format(new Date(metric.timestamp), 'MMM dd'),
    earnings: metric.creator_earnings_sol,
    volume: metric.volume_24h_sol,
    holders: metric.holders_count,
    marketCap: metric.market_cap_usd / 1000 // Convert to thousands for better chart display
  }));

  const selectedProjectData = projects.find(p => p.project_id === selectedProject);

  const handleExport = async () => {
    setExporting(true);
    try {
      const csvData = await api.exportData('csv');
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `token-tracker-data-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-lg animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-md">
        <div>
          <h2 className="text-3xl font-semibold text-text-primary">Analytics</h2>
          <p className="text-text-secondary mt-1">Historical performance and trends</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-md justify-between">
          <div className="flex flex-col sm:flex-row gap-md">
            {/* Project Selector */}
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="px-md py-sm bg-surface border border-surface/50 rounded-input text-text-primary focus:outline-none focus:border-primary"
            >
              {projects.map(project => (
                <option key={project.project_id} value={project.project_id}>
                  {project.name}
                </option>
              ))}
            </select>
            
            {/* Date Range Selector */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(Number(e.target.value))}
              className="px-md py-sm bg-surface border border-surface/50 rounded-input text-text-primary focus:outline-none focus:border-primary"
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center px-md py-sm bg-accent/20 hover:bg-accent/30 border border-accent/30 rounded-button text-accent transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4 mr-2" />
            {exporting ? 'Exporting...' : 'Export Data'}
          </button>
        </div>
      </div>

      {/* Project Info */}
      {selectedProjectData && (
        <div className="bg-surface/50 backdrop-blur-sm border border-surface/50 rounded-card p-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">{selectedProjectData.name}</h3>
              <p className="text-text-secondary">{selectedProjectData.token_symbol}</p>
            </div>
            <div className="text-right">
              <p className="text-text-secondary text-sm">Launched</p>
              <p className="text-text-primary font-medium">
                {format(new Date(selectedProjectData.launch_date), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="animate-pulse space-y-lg">
          <div className="h-80 bg-surface/50 rounded-card"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
            <div className="h-80 bg-surface/50 rounded-card"></div>
            <div className="h-80 bg-surface/50 rounded-card"></div>
          </div>
        </div>
      ) : (
        <>
          {/* Earnings Chart */}
          <div className="bg-surface/50 backdrop-blur-sm border border-surface/50 rounded-card p-lg">
            <div className="flex items-center mb-lg">
              <TrendingUp className="w-5 h-5 text-accent mr-2" />
              <h3 className="text-lg font-semibold text-text-primary">Creator Earnings Over Time</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 30%, 20%)" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(0, 0%, 70%)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(0, 0%, 70%)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(210, 30%, 15%)',
                    border: '1px solid hsl(210, 30%, 20%)',
                    borderRadius: '8px',
                    color: 'hsl(0, 0%, 95%)'
                  }}
                  formatter={(value: number) => [
                    `${value.toFixed(2)} SOL`,
                    'Creator Earnings'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="hsl(140, 60%, 45%)" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(140, 60%, 45%)', strokeWidth: 0, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Volume and Holders Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
            {/* Volume Chart */}
            <div className="bg-surface/50 backdrop-blur-sm border border-surface/50 rounded-card p-lg">
              <h3 className="text-lg font-semibold text-text-primary mb-lg">24h Volume</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 30%, 20%)" />
                  <XAxis dataKey="date" stroke="hsl(0, 0%, 70%)" fontSize={12} />
                  <YAxis stroke="hsl(0, 0%, 70%)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(210, 30%, 15%)',
                      border: '1px solid hsl(210, 30%, 20%)',
                      borderRadius: '8px',
                      color: 'hsl(0, 0%, 95%)'
                    }}
                    formatter={(value: number) => [`${value.toFixed(1)} SOL`, '24h Volume']}
                  />
                  <Bar dataKey="volume" fill="hsl(210, 80%, 50%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Holders Chart */}
            <div className="bg-surface/50 backdrop-blur-sm border border-surface/50 rounded-card p-lg">
              <h3 className="text-lg font-semibold text-text-primary mb-lg">Holder Count</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 30%, 20%)" />
                  <XAxis dataKey="date" stroke="hsl(0, 0%, 70%)" fontSize={12} />
                  <YAxis stroke="hsl(0, 0%, 70%)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(210, 30%, 15%)',
                      border: '1px solid hsl(210, 30%, 20%)',
                      borderRadius: '8px',
                      color: 'hsl(0, 0%, 95%)'
                    }}
                    formatter={(value: number) => [value.toLocaleString(), 'Holders']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="holders" 
                    stroke="hsl(280, 80%, 50%)" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(280, 80%, 50%)', strokeWidth: 0, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
