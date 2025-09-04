import React from 'react';
import { ExternalLink, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Project, TokenMetrics } from '../../types';
import { api } from '../../services/api';

interface ProjectCardProps {
  project: Project;
  metrics?: TokenMetrics;
  onClick?: () => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  metrics,
  onClick,
  className = ''
}) => {
  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(api.getSolscanUrl(project.token_address), '_blank');
  };

  return (
    <div 
      className={`bg-surface/50 backdrop-blur-sm border border-surface/50 rounded-card p-lg shadow-card hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-primary/30 ${className}`}
      onClick={onClick}
    >
      <div className="space-y-md">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{project.name}</h3>
            <p className="text-text-secondary text-sm">{project.token_symbol}</p>
          </div>
          <button
            onClick={handleExternalClick}
            className="p-2 rounded-button hover:bg-surface/70 transition-colors"
            title="View on Solscan"
          >
            <ExternalLink className="w-4 h-4 text-text-secondary" />
          </button>
        </div>

        {/* Metrics */}
        {metrics && (
          <div className="grid grid-cols-3 gap-md">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <DollarSign className="w-4 h-4 text-accent mr-1" />
              </div>
              <p className="text-xs text-text-secondary">Earnings</p>
              <p className="text-sm font-semibold text-text-primary">
                {metrics.creator_earnings_sol.toFixed(2)} SOL
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="w-4 h-4 text-primary mr-1" />
              </div>
              <p className="text-xs text-text-secondary">Holders</p>
              <p className="text-sm font-semibold text-text-primary">
                {metrics.holders_count.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="w-4 h-4 text-purple-400 mr-1" />
              </div>
              <p className="text-xs text-text-secondary">24h Vol</p>
              <p className="text-sm font-semibold text-text-primary">
                {metrics.volume_24h_sol.toFixed(1)} SOL
              </p>
            </div>
          </div>
        )}

        {/* Launch Date */}
        <div className="pt-md border-t border-surface/30">
          <p className="text-xs text-text-secondary">
            Launched {new Date(project.launch_date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};