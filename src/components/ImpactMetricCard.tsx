
import React from 'react';
import { ImpactMetric } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface ImpactMetricCardProps {
  metric: ImpactMetric;
  className?: string;
}

const ImpactMetricCard: React.FC<ImpactMetricCardProps> = ({ metric, className }) => {
  // Determine background color based on category
  const getBgColor = () => {
    switch (metric.category) {
      case 'Education':
        return 'bg-blue-50 border-blue-200';
      case 'Water':
        return 'bg-cyan-50 border-cyan-200';
      case 'Healthcare':
        return 'bg-red-50 border-red-200';
      case 'Emergency':
        return 'bg-amber-50 border-amber-200';
      case 'Food':
        return 'bg-green-50 border-green-200';
      case 'Shelter':
        return 'bg-purple-50 border-purple-200';
      case 'Overall':
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };
  
  return (
    <div className={cn(
      "rounded-lg border p-4 flex flex-col items-center justify-center text-center",
      getBgColor(),
      className
    )}>
      <span className="text-3xl font-bold mb-1">{metric.value}</span>
      <span className="text-sm text-gray-600">{metric.unit}</span>
      <h3 className="mt-2 font-medium">{metric.label}</h3>
    </div>
  );
};

export default ImpactMetricCard;
