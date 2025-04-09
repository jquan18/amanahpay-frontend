
import React from 'react';
import { cn } from '@/lib/utils';

interface DonationTypeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  selected?: boolean;
  onClick?: () => void;
}

const DonationTypeCard: React.FC<DonationTypeCardProps> = ({
  title,
  description,
  icon,
  className,
  selected = false,
  onClick,
}) => {
  return (
    <div 
      className={cn(
        "rounded-md border p-4 transition-colors cursor-pointer",
        selected 
          ? "border-primary bg-primary/5" 
          : "border-gray-200 hover:border-primary/50",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-2">
          {icon}
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default DonationTypeCard;
