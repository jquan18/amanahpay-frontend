
import React from 'react';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Donation } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface DonationCardProps {
  donation: Donation;
  className?: string;
}

const DonationCard: React.FC<DonationCardProps> = ({ donation, className }) => {
  const formattedDate = formatDistanceToNow(new Date(donation.date), { addSuffix: true });
  
  const getStatusDetails = () => {
    switch (donation.status) {
      case 'Verified':
        return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' };
      case 'Distributed':
        return { icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-50' };
      case 'Pending':
      default:
        return { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' };
    }
  };
  
  const statusDetails = getStatusDetails();
  const StatusIcon = statusDetails.icon;
  
  return (
    <div className={cn("bg-white rounded-lg border border-gray-100 p-4", className)}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-base">{donation.recipient}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Calendar size={14} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
        <div className={cn("px-2 py-1 rounded-full text-xs font-medium flex items-center", statusDetails.bg, statusDetails.color)}>
          <StatusIcon size={14} className="mr-1" />
          {donation.status}
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-medium">{donation.currency} {donation.amount.toLocaleString()}</span>
        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">{donation.type}</span>
      </div>
      
      {donation.impact && (
        <p className="text-sm text-gray-600 mb-2">
          <strong>Impact:</strong> {donation.impact}
        </p>
      )}
      
      <div className="text-xs text-gray-500 border-t pt-2 mt-2 flex justify-between items-center">
        <div className="font-mono truncate max-w-[70%]">
          <span className="font-medium">ID:</span> 
          <span className="ml-1 opacity-70">{donation.transactionHash.substring(0, 8)}...{donation.transactionHash.substring(donation.transactionHash.length - 8)}</span>
        </div>
        
        {donation.certificate && (
          <a 
            href={`/donor/certificates#${donation.certificate.id}`}
            className="text-primary text-xs font-medium hover:underline"
          >
            View Certificate
          </a>
        )}
      </div>
    </div>
  );
};

export default DonationCard;
