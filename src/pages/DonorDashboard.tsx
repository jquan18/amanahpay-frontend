
import React from 'react';
import DonorLayout from '@/components/DonorLayout';
import DonationCard from '@/components/DonationCard';
import ImpactMetricCard from '@/components/ImpactMetricCard';
import ProjectCard from '@/components/ProjectCard';
import { donationHistory, userImpactMetrics, activeProjects, donationSummary } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

const DonorDashboard: React.FC = () => {
  const recentDonations = donationHistory.slice(0, 2);
  const featuredProjects = activeProjects.slice(0, 2);
  
  return (
    <DonorLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Summary card */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Donation Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-between mb-4">
              <div>
                <h3 className="text-2xl font-medium">{donationSummary.currency} {donationSummary.totalDonated.toLocaleString()}</h3>
                <p className="text-sm text-gray-500">Total Donations</p>
              </div>
              
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="text-base font-medium text-blue-600">{donationSummary.donationsByType.Zakat.toLocaleString()}</div>
                  <p className="text-xs text-gray-500">Zakat</p>
                </div>
                <div className="text-center">
                  <div className="text-base font-medium text-green-600">{donationSummary.donationsByType.Waqf.toLocaleString()}</div>
                  <p className="text-xs text-gray-500">Waqf</p>
                </div>
                <div className="text-center">
                  <div className="text-base font-medium text-amber-600">{donationSummary.donationsByType.Sadaqah.toLocaleString()}</div>
                  <p className="text-xs text-gray-500">Sadaqah</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex-1 min-w-[180px]">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium">Impact Score</span>
                  <span className="text-xs">{donationSummary.impactScore}/100</span>
                </div>
                <Progress value={donationSummary.impactScore} className="h-1.5 mb-2" />
              </div>
              
              <div className="flex-1 min-w-[180px]">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-50 rounded p-2 text-center">
                    <div className="text-base font-medium text-green-600">{donationSummary.verifiedDonations}</div>
                    <p className="text-xs text-gray-600">Verified</p>
                  </div>
                  <div className="bg-amber-50 rounded p-2 text-center">
                    <div className="text-base font-medium text-amber-600">{donationSummary.pendingDonations}</div>
                    <p className="text-xs text-gray-600">Pending</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link to="/donor/donate">
                <Heart className="mr-2 h-4 w-4" />
                New Donation
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Impact metrics */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Your Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {userImpactMetrics.map((metric, index) => (
            <ImpactMetricCard key={index} metric={metric} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent donations */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium">Recent Donations</h2>
            <Link to="/donor/history" className="text-sm text-primary flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentDonations.map(donation => (
              <DonationCard key={donation.id} donation={donation} />
            ))}
          </div>
        </div>

        {/* Active projects */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium">Active Projects</h2>
            <Link to="/donor/impact-map" className="text-sm text-primary flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} compact />
            ))}
          </div>
        </div>
      </div>
    </DonorLayout>
  );
};

export default DonorDashboard;
