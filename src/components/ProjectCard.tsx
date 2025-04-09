
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
  
  const getCategoryColor = () => {
    switch (project.category) {
      case 'Education':
        return 'bg-blue-100 text-blue-700';
      case 'Healthcare':
        return 'bg-red-100 text-red-700';
      case 'Food':
        return 'bg-green-100 text-green-700';
      case 'Water':
        return 'bg-cyan-100 text-cyan-700';
      case 'Shelter':
        return 'bg-purple-100 text-purple-700';
      case 'Emergency':
      default:
        return 'bg-amber-100 text-amber-700';
    }
  };
  
  if (compact) {
    return (
      <div className={cn("bg-white rounded-lg border border-gray-100 p-3", className)}>
        <h3 className="font-medium text-base line-clamp-1">{project.name}</h3>
        <div className="flex items-center text-xs text-gray-500 mt-1 mb-2">
          <MapPin size={12} className="mr-1" />
          <span>{project.location.city}, {project.location.country}</span>
        </div>
        <Progress value={progressPercentage} className="h-1.5 mt-2" />
        <div className="flex justify-between text-xs mt-1">
          <span>${project.currentAmount.toLocaleString()}</span>
          <span className="text-gray-500">${project.targetAmount.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn("bg-white rounded-lg border border-gray-100", className)}>
      <div className="h-36 relative overflow-hidden rounded-t-lg">
        <img 
          src={project.images[0] || "/placeholder.svg"} 
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <span className={cn("absolute top-2 right-2 px-2 py-1 rounded-full text-xs", getCategoryColor())}>
          {project.category}
        </span>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-base">{project.name}</h3>
        <div className="flex items-center text-xs text-gray-500 mt-1 mb-2">
          <MapPin size={12} className="mr-1" />
          <span>{project.location.city}, {project.location.country}</span>
        </div>
        
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{project.description}</p>
        
        <Progress value={progressPercentage} className="h-1.5" />
        <div className="flex justify-between mt-1 mb-2">
          <span className="text-xs">${project.currentAmount.toLocaleString()}</span>
          <span className="text-xs text-gray-500">${project.targetAmount.toLocaleString()}</span>
        </div>
        
        {project.impactMetrics.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="flex flex-wrap gap-1">
              {project.impactMetrics.slice(0, 2).map((metric, index) => (
                <div key={index} className="bg-gray-50 px-2 py-0.5 rounded text-xs">
                  {metric.value} {metric.unit}
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
