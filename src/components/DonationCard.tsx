
import React from 'react';
import { Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Donation } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface DonationCardProps {
  donation: Donation;
  className?: string;
}

const DonationCard: React.FC<DonationCardProps> = ({ donation, className }) => {
  // Format the date to show how long ago it was
  const formattedDate = formatDistanceToNow(new Date(donation.date), { addSuffix: true });
  
  // Determine the status icon and color
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
    <div className={cn("bg-white rounded-lg shadow p-4 border border-gray-100", className)}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{donation.recipient}</h3>
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
      
      <div className="flex justify-between items-center mb-3">
        <span className="text-xl font-bold">{donation.currency} {donation.amount.toLocaleString()}</span>
        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">{donation.type}</span>
      </div>
      
      {donation.impact && (
        <div className="text-sm text-gray-600 mb-3">
          <strong>Impact:</strong> {donation.impact}
        </div>
      )}
      
      <div className="text-xs text-gray-500 border-t pt-2 mt-2">
        <div className="font-mono break-all">
          <span className="font-semibold">Transaction ID:</span> 
          <span className="ml-1">{donation.transactionHash.substring(0, 10)}...{donation.transactionHash.substring(donation.transactionHash.length - 8)}</span>
        </div>
      </div>
      
      {donation.certificate && (
        <div className="mt-3 pt-2 border-t border-gray-100 flex justify-end">
          <a 
            href={`/donor/certificates#${donation.certificate.id}`}
            className="text-accent text-sm font-medium hover:underline"
          >
            View Certificate
          </a>
        </div>
      )}
    </div>
  );
};

export default DonationCard;
