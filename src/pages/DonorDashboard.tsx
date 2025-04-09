
import React from 'react';
import DonorLayout from '@/components/DonorLayout';
import DonationCard from '@/components/DonationCard';
import ImpactMetricCard from '@/components/ImpactMetricCard';
import ProjectCard from '@/components/ProjectCard';
import { donationHistory, userImpactMetrics, activeProjects, donationSummary } from '@/data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

const DonorDashboard: React.FC = () => {
  // Get recent donations
  const recentDonations = donationHistory.slice(0, 2);
  
  // Get active projects (first 2)
  const featuredProjects = activeProjects.slice(0, 2);
  
  return (
    <DonorLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Summary card */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Your Donation Summary</CardTitle>
            <CardDescription>Overview of your charitable impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold">{donationSummary.currency} {donationSummary.totalDonated.toLocaleString()}</h3>
                <p className="text-sm text-gray-500">Total Donations</p>
              </div>
              
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">{donationSummary.donationsByType.Zakat.toLocaleString()}</div>
                  <p className="text-sm text-gray-500">Zakat</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">{donationSummary.donationsByType.Waqf.toLocaleString()}</div>
                  <p className="text-sm text-gray-500">Waqf</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-amber-600">{donationSummary.donationsByType.Sadaqah.toLocaleString()}</div>
                  <p className="text-sm text-gray-500">Sadaqah</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex-1 min-w-[180px]">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Impact Score</span>
                  <span className="text-sm font-medium">{donationSummary.impactScore}/100</span>
                </div>
                <Progress value={donationSummary.impactScore} className="h-2 mb-3" />
                <p className="text-xs text-gray-500">Based on verification records and impact metrics</p>
              </div>
              
              <div className="flex-1 min-w-[180px]">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-50 rounded-md p-2 text-center">
                    <div className="text-lg font-bold text-green-600">{donationSummary.verifiedDonations}</div>
                    <p className="text-xs text-gray-600">Verified</p>
                  </div>
                  <div className="bg-amber-50 rounded-md p-2 text-center">
                    <div className="text-lg font-bold text-amber-600">{donationSummary.pendingDonations}</div>
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
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-3">
            <Button className="w-full" asChild>
              <Link to="/donor/donate">
                <Heart className="mr-2 h-4 w-4" />
                New Donation
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/donor/certificates">
                <Award className="mr-2 h-4 w-4" />
                View Certificates
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Impact metrics */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Impact</CardTitle>
          <CardDescription>The tangible difference your donations have made</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {userImpactMetrics.map((metric, index) => (
              <ImpactMetricCard key={index} metric={metric} />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent donations */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Donations</h2>
            <Link to="/donor/history" className="text-sm text-primary flex items-center hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentDonations.map(donation => (
              <DonationCard key={donation.id} donation={donation} />
            ))}
          </div>
        </div>

        {/* Active projects */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Active Projects</h2>
            <Link to="/donor/impact-map" className="text-sm text-primary flex items-center hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
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
