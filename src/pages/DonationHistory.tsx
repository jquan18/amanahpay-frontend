
import React, { useState } from 'react';
import DonorLayout from '@/components/DonorLayout';
import DonationCard from '@/components/DonationCard';
import { donationHistory, DonationType } from '@/data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DonationHistory: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("newest");
  
  // Filter donations based on selected type
  const filteredDonations = selectedType === "all" 
    ? donationHistory 
    : donationHistory.filter(donation => donation.type.toLowerCase() === selectedType);
  
  // Sort donations based on sort order
  const sortedDonations = [...filteredDonations].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });
  
  return (
    <DonorLayout>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Donation History</CardTitle>
          <CardDescription>Track all your contributions and their verification status</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-6" onValueChange={setSelectedType}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="zakat">Zakat</TabsTrigger>
                <TabsTrigger value="waqf">Waqf</TabsTrigger>
                <TabsTrigger value="sadaqah">Sadaqah</TabsTrigger>
              </TabsList>
              
              <Select defaultValue="newest" onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <TabsContent value="all" className="space-y-4">
              {sortedDonations.length === 0 ? (
                <p className="text-center py-8 text-gray-500">No donations found</p>
              ) : (
                sortedDonations.map(donation => (
                  <DonationCard key={donation.id} donation={donation} />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="zakat" className="space-y-4">
              {sortedDonations.length === 0 ? (
                <p className="text-center py-8 text-gray-500">No Zakat donations found</p>
              ) : (
                sortedDonations.map(donation => (
                  <DonationCard key={donation.id} donation={donation} />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="waqf" className="space-y-4">
              {sortedDonations.length === 0 ? (
                <p className="text-center py-8 text-gray-500">No Waqf donations found</p>
              ) : (
                sortedDonations.map(donation => (
                  <DonationCard key={donation.id} donation={donation} />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="sadaqah" className="space-y-4">
              {sortedDonations.length === 0 ? (
                <p className="text-center py-8 text-gray-500">No Sadaqah donations found</p>
              ) : (
                sortedDonations.map(donation => (
                  <DonationCard key={donation.id} donation={donation} />
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="bg-secondary/20 rounded-lg p-4 border border-secondary/30">
        <h3 className="font-medium mb-2">About Blockchain Verification</h3>
        <p className="text-sm text-gray-600 mb-2">
          All donations on TrustChain are recorded on a secure blockchain network, ensuring immutable proof of your contribution. 
          Each transaction can be independently verified using the transaction hash.
        </p>
        <p className="text-sm text-gray-600">
          The status of each donation is updated as it progresses through verification and distribution, 
          with real-time updates provided as your donation makes its impact.
        </p>
      </div>
    </DonorLayout>
  );
};

export default DonationHistory;
