
import React from 'react';
import { Project } from '@/data/mockData';
import { MapPin } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  className?: string;
  compact?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className, compact = false }) => {
  const progressPercentage = (project.currentAmount / project.targetAmount) * 100;
  
  // Determine color based on category
  const getCategoryColor = () => {
    switch (project.category) {
      case 'Education':
        return 'bg-blue-100 text-blue-800';
      case 'Healthcare':
        return 'bg-red-100 text-red-800';
      case 'Food':
        return 'bg-green-100 text-green-800';
      case 'Water':
        return 'bg-cyan-100 text-cyan-800';
      case 'Shelter':
        return 'bg-purple-100 text-purple-800';
      case 'Emergency':
      default:
        return 'bg-amber-100 text-amber-800';
    }
  };
  
  if (compact) {
    return (
      <div className={cn("bg-white rounded-lg shadow p-3 border border-gray-100", className)}>
        <h3 className="font-semibold text-base line-clamp-1">{project.name}</h3>
        <div className="flex items-center text-xs text-gray-500 mt-1 mb-2">
          <MapPin size={12} className="mr-1" />
          <span>{project.location.city}, {project.location.country}</span>
        </div>
        <Progress value={progressPercentage} className="h-2 mt-2" />
        <div className="flex justify-between text-xs mt-1">
          <span>${project.currentAmount.toLocaleString()}</span>
          <span>${project.targetAmount.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn("bg-white rounded-lg shadow border border-gray-100", className)}>
      <div className="h-40 relative overflow-hidden rounded-t-lg">
        <img 
          src={project.images[0] || "/placeholder.svg"} 
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <span className={cn("absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium", getCategoryColor())}>
          {project.category}
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg">{project.name}</h3>
        <div className="flex items-center text-sm text-gray-500 mt-1 mb-3">
          <MapPin size={14} className="mr-1" />
          <span>{project.location.city}, {project.location.country}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
        
        <Progress value={progressPercentage} className="h-2" />
        <div className="flex justify-between mt-2 mb-3">
          <span className="text-sm">${project.currentAmount.toLocaleString()} raised</span>
          <span className="text-sm">${project.targetAmount.toLocaleString()} goal</span>
        </div>
        
        {project.impactMetrics.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <h4 className="text-sm font-medium mb-2">Impact Metrics</h4>
            <div className="flex flex-wrap gap-2">
              {project.impactMetrics.map((metric, index) => (
                <div key={index} className="bg-gray-50 px-2 py-1 rounded-md text-xs">
                  {metric.value} {metric.unit} - {metric.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
