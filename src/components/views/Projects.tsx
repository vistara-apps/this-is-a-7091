import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { ProjectCard } from '../ui/ProjectCard';
import { Project, TokenMetrics } from '../../types';
import { api } from '../../services/api';
import { useSubscription } from '../../hooks/useSubscription';

export const Projects: React.FC = () => {
  const { maxProjects } = useSubscription();
  const [projects, setProjects] = useState<Project[]>([]);
  const [metrics, setMetrics] = useState<TokenMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProject, setShowAddProject] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [projectsData, metricsData] = await Promise.all([
        api.getProjects(),
        api.getTokenMetrics()
      ]);
      setProjects(projectsData);
      setMetrics(metricsData);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.token_symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canAddProject = projects.length < maxProjects;

  if (loading) {
    return (
      <div className="animate-pulse space-y-lg">
        <div className="h-8 bg-surface/50 rounded w-48"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-surface/50 rounded-card"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-lg animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-md">
        <div>
          <h2 className="text-3xl font-semibold text-text-primary">Projects</h2>
          <p className="text-text-secondary mt-1">
            Manage your token projects ({projects.length}/{maxProjects === Infinity ? '∞' : maxProjects})
          </p>
        </div>
        
        <button
          onClick={() => setShowAddProject(true)}
          disabled={!canAddProject}
          className="flex items-center px-lg py-sm bg-primary hover:bg-primary/90 disabled:bg-surface disabled:text-text-secondary rounded-button font-medium transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-sm bg-surface border border-surface/50 rounded-input text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary"
          />
        </div>
        <button className="flex items-center px-md py-sm bg-surface hover:bg-surface/70 border border-surface/50 rounded-button transition-colors">
          <Filter className="w-4 h-4 mr-2" />
          <span className="text-sm">Filter</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {filteredProjects.map((project) => {
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
        
        {/* Add Project Card */}
        {canAddProject && (
          <div 
            onClick={() => setShowAddProject(true)}
            className="border-2 border-dashed border-surface/50 rounded-card p-lg flex flex-col items-center justify-center min-h-48 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
          >
            <Plus className="w-8 h-8 text-text-secondary mb-2" />
            <p className="text-text-secondary font-medium">Add New Project</p>
            <p className="text-xs text-text-secondary/70 mt-1">Track another token</p>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && searchTerm && (
        <div className="text-center py-xl">
          <Search className="w-12 h-12 text-text-secondary mx-auto mb-md" />
          <h3 className="text-lg font-semibold text-text-primary">No projects found</h3>
          <p className="text-text-secondary">Try adjusting your search terms</p>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-md">
          <div className="bg-surface border border-surface/50 rounded-card p-lg max-w-md w-full shadow-modal">
            <h3 className="text-lg font-semibold text-text-primary mb-md">Add New Project</h3>
            
            <div className="space-y-md">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Token Address
                </label>
                <input
                  type="text"
                  placeholder="Enter Solana token address..."
                  className="w-full px-md py-sm bg-background border border-surface/50 rounded-input text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  placeholder="My Awesome Token"
                  className="w-full px-md py-sm bg-background border border-surface/50 rounded-input text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-md mt-lg">
              <button
                onClick={() => setShowAddProject(false)}
                className="px-md py-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                Cancel
              </button>
              <button className="px-lg py-sm bg-primary hover:bg-primary/90 text-white rounded-button font-medium transition-colors">
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};