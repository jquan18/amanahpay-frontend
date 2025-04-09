
import React, { useState } from 'react';
import DonorLayout from '@/components/DonorLayout';
import ProjectCard from '@/components/ProjectCard';
import { activeProjects } from '@/data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const ImpactMap: React.FC = () => {
  const [category, setCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter projects based on category and search term
  const filteredProjects = activeProjects.filter(project => {
    const matchesCategory = category === "all" || project.category.toLowerCase() === category.toLowerCase();
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.location.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.location.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  return (
    <DonorLayout>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Impact Map</CardTitle>
          <CardDescription>
            Explore current projects and see where your donations can make a difference
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8 bg-gray-100 p-6 rounded-lg text-center">
            <h3 className="font-semibold mb-2">Interactive Map Coming Soon</h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Our interactive global map is under development. Soon you'll be able to explore projects 
              geographically and see the real-time impact of donations worldwide.
            </p>
          </div>
          
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects, locations..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="all" onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="water">Water</SelectItem>
                <SelectItem value="shelter">Shelter</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </DonorLayout>
  );
};

export default ImpactMap;
