import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  format?: 'currency' | 'number' | 'percentage';
  variant?: 'default' | 'positive' | 'negative';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  format = 'number',
  variant = 'default',
  className = ''
}) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return `${val.toLocaleString()} SOL`;
      case 'percentage':
        return `${val}%`;
      default:
        return val.toLocaleString();
    }
  };

  const getChangeColor = () => {
    if (change === undefined) return '';
    return change >= 0 ? 'text-accent' : 'text-red-400';
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'positive':
        return 'border-accent/20 bg-accent/5';
      case 'negative':
        return 'border-red-400/20 bg-red-400/5';
      default:
        return 'border-surface/50';
    }
  };

  return (
    <div className={`bg-surface/50 backdrop-blur-sm border rounded-card p-lg shadow-card ${getVariantStyles()} ${className}`}>
      <div className="space-y-sm">
        <p className="text-text-secondary text-sm font-medium">{title}</p>
        <div className="flex items-end justify-between">
          <p className="text-2xl font-semibold text-text-primary">
            {formatValue(value)}
          </p>
          {change !== undefined && (
            <div className={`flex items-center text-sm ${getChangeColor()}`}>
              {change >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {Math.abs(change)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};