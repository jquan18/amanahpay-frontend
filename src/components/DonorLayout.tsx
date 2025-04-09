
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  History, 
  Award, 
  Map, 
  Heart,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DonorLayoutProps {
  children: React.ReactNode;
}

const DonorLayout: React.FC<DonorLayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/donor/dashboard' },
    { icon: History, label: 'History', path: '/donor/history' },
    { icon: Award, label: 'Certificates', path: '/donor/certificates' },
    { icon: Map, label: 'Impact Map', path: '/donor/impact-map' },
    { icon: Heart, label: 'Donate', path: '/donor/donate' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-sidebar text-sidebar-foreground md:min-h-screen">
        {/* Logo and brand */}
        <div className="p-4 flex items-center justify-between md:justify-center border-b border-sidebar-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center">
              <span className="text-secondary-foreground font-bold">TC</span>
            </div>
            <span className="font-bold text-xl">TrustChain</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                    )
                  }
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout at bottom */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <button className="flex items-center space-x-3 w-full px-3 py-2 rounded-md hover:bg-sidebar-accent/60 transition-colors">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* User header */}
        <header className="bg-white border-b p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            {navItems.find(item => item.path === location.pathname)?.label || 'TrustChain'}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, Ahmed</span>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DonorLayout;
