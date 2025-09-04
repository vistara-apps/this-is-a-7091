import React, { useState, useEffect } from 'react';
import { Users, DollarSign, BarChart3, Lock, Lightbulb } from 'lucide-react';
import { Project } from '../../types';
import { api } from '../../services/api';
import { useSubscription } from '../../hooks/useSubscription';

interface AttributionData {
  volumeToEarningsRatio: number;
  holdersGrowthImpact: number;
  marketCapCorrelation: number;
  insights: string[];
}

export const Attribution: React.FC = () => {
  const { canAccessFeature } = useSubscription();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [attributionData, setAttributionData] = useState<AttributionData | null>(null);
  const [loading, setLoading] = useState(false);

  const hasAccess = canAccessFeature('creator-attribution');

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProject && hasAccess) {
      loadAttributionData();
    }
  }, [selectedProject, hasAccess]);

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

  const loadAttributionData = async () => {
    if (!selectedProject) return;
    
    setLoading(true);
    try {
      const data = await api.getCreatorAttribution(selectedProject);
      setAttributionData(data);
    } catch (error) {
      console.error('Failed to load attribution data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center space-y-md">
          <Lock className="w-16 h-16 text-text-secondary mx-auto" />
          <h3 className="text-xl font-semibold text-text-primary">Creator Attribution Requires Premium</h3>
          <p className="text-text-secondary max-w-md">
            Upgrade to Premium to access advanced creator attribution insights and understand the direct impact of project activity on your earnings.
          </p>
          <div className="pt-md">
            <button className="px-lg py-sm bg-primary hover:bg-primary/90 text-white rounded-button font-medium transition-colors">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedProjectData = projects.find(p => p.project_id === selectedProject);

  return (
    <div className="space-y-lg animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-md">
        <div>
          <h2 className="text-3xl font-semibold text-text-primary">Creator Attribution</h2>
          <p className="text-text-secondary mt-1">Understand how project activity drives your earnings</p>
        </div>
        
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
              <p className="text-text-secondary text-sm">Attribution Analysis</p>
              <p className="text-text-primary font-medium">Premium Feature</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="animate-pulse space-y-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-surface/50 rounded-card"></div>
            ))}
          </div>
          <div className="h-64 bg-surface/50 rounded-card"></div>
        </div>
      ) : attributionData ? (
        <>
          {/* Attribution Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <div className="bg-surface/50 backdrop-blur-sm border border-surface/50 rounded-card p-lg">
              <div className="flex items-center mb-md">
                <BarChart3 className="w-5 h-5 text-primary mr-2" />
                <h3 className="text-lg font-semibold text-text-primary">Volume Impact</h3>
              </div>
              <div className="space-y-sm">
                <p className="text-2xl font-bold text-text-primary">
                  {(1 / attributionData.volumeToEarningsRatio).toFixed(3)}
                </p>
                <p className="text-sm text-text-secondary">
                  SOL earned per 1 SOL volume
                </p>
                <div className="w-full bg-surface/30 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((1 / attributionData.volumeToEarningsRatio) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-surface/50 backdrop-blur-sm border border-surface/50 rounded-card p-lg">
              <div className="flex items-center mb-md">
                <Users className="w-5 h-5 text-accent mr-2" />
                <h3 className="text-lg font-semibold text-text-primary">Holder Impact</h3>
              </div>
              <div className="space-y-sm">
                <p className="text-2xl font-bold text-text-primary">
                  {(attributionData.holdersGrowthImpact * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-text-secondary">
                  Correlation with earnings
                </p>
                <div className="w-full bg-surface/30 rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-500"
                    style={{ width: `${attributionData.holdersGrowthImpact * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-surface/50 backdrop-blur-sm border border-surface/50 rounded-card p-lg">
              <div className="flex items-center mb-md">
                <DollarSign className="w-5 h-5 text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold text-text-primary">Market Cap</h3>
              </div>
              <div className="space-y-sm">
                <p className="text-2xl font-bold text-text-primary">
                  {(attributionData.marketCapCorrelation * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-text-secondary">
                  Revenue correlation
                </p>
                <div className="w-full bg-surface/30 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${attributionData.marketCapCorrelation * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-surface/50 backdrop-blur-sm border border-surface/50 rounded-card p-lg">
            <div className="flex items-center mb-lg">
              <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
              <h3 className="text-lg font-semibold text-text-primary">Attribution Insights</h3>
            </div>
            <div className="space-y-md">
              {attributionData.insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-md p-md bg-background/50 rounded-card">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-medium text-primary">{index + 1}</span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-card p-lg">
            <h3 className="text-lg font-semibold text-text-primary mb-md">Optimization Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="space-y-sm">
                <h4 className="font-medium text-text-primary">Volume Optimization</h4>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Encourage more trading activity through incentives</li>
                  <li>• Partner with other projects for cross-promotion</li>
                  <li>• Implement trading competitions or rewards</li>
                </ul>
              </div>
              <div className="space-y-sm">
                <h4 className="font-medium text-text-primary">Community Growth</h4>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Focus on holder retention strategies</li>
                  <li>• Create exclusive benefits for long-term holders</li>
                  <li>• Engage with community through regular updates</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-xl">
          <BarChart3 className="w-12 h-12 text-text-secondary mx-auto mb-md" />
          <h3 className="text-lg font-semibold text-text-primary">No Attribution Data</h3>
          <p className="text-text-secondary">Select a project to view attribution insights</p>
        </div>
      )}
    </div>
  );
};
