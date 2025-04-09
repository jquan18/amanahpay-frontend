
import React from 'react';
import DonorLayout from '@/components/DonorLayout';
import { donationHistory } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

const DonationCertificates: React.FC = () => {
  // Filter donations that have certificates
  const donationsWithCertificates = donationHistory.filter(donation => donation.certificate);
  
  return (
    <DonorLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Your Impact Certificates</h1>
        <p className="text-gray-600">
          Each certificate is a unique NFT that verifies your contribution and its impact.
          These certificates are stored securely on the blockchain and can be shared with others.
        </p>
      </div>
      
      {donationsWithCertificates.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Certificates Yet</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-4">
            Make a donation to receive a unique digital certificate that verifies your impact.
          </p>
          <Button asChild>
            <a href="/donor/donate">Make a Donation</a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {donationsWithCertificates.map(donation => (
            <Card key={donation.id} id={donation.certificate?.id}>
              <CardHeader className="pb-0">
                <CardTitle className="flex justify-between items-center">
                  <span>{donation.type} Certificate</span>
                  <span className="text-sm text-gray-500 font-normal">
                    {format(new Date(donation.date), 'MMM d, yyyy')}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="relative aspect-[1.4/1] rounded-lg overflow-hidden mb-4 border bg-gray-50">
                  <img 
                    src={donation.certificate?.image || "/placeholder.svg"} 
                    alt={`Certificate for ${donation.type} donation`}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-[80%]">
                      <h3 className="font-semibold mb-1">Certificate of Impact</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        This certifies that a donation of {donation.currency} {donation.amount} 
                        was made to {donation.recipient}
                      </p>
                      <div className="text-xs font-mono bg-gray-100 p-1 rounded">
                        {donation.transactionHash.substring(0, 20)}...
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary/5 rounded-lg p-3 mb-4">
                  <h3 className="font-semibold mb-1">Impact</h3>
                  <p className="text-sm">{donation.impact}</p>
                </div>
                
                <div className="flex justify-between gap-3">
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DonorLayout>
  );
};

// Add missing import
import { Award } from 'lucide-react';

export default DonationCertificates;
