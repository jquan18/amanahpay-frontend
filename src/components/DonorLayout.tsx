
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Clock, 
  Award, 
  MapPin, 
  HeartHandshake,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface DonorLayoutProps {
  children: React.ReactNode;
}

const DonorLayout: React.FC<DonorLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/donor/dashboard' },
    { icon: Clock, label: 'History', path: '/donor/history' },
    { icon: Award, label: 'Certificates', path: '/donor/certificates' },
    { icon: MapPin, label: 'Impact Map', path: '/donor/impact-map' },
    { icon: HeartHandshake, label: 'Donate', path: '/donor/donate' },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center">
            <span className="text-secondary-foreground font-bold text-sm">DC</span>
          </div>
          <span className="font-medium">DonateChain</span>
        </div>

        <button 
          onClick={toggleMenu}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Always visible on desktop, toggleable on mobile */}
        <aside 
          className={cn(
            "w-full md:w-64 bg-white border-r flex-shrink-0 md:flex flex-col h-screen sticky top-0",
            isMobile && (menuOpen ? "fixed inset-0 z-20" : "hidden")
          )}
        >
          {/* Logo on desktop */}
          <div className="p-4 border-b hidden md:flex items-center">
            <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center">
              <span className="text-secondary-foreground font-bold text-sm">DC</span>
            </div>
            <span className="font-medium ml-2">DonateChain</span>
          </div>

          {/* Mobile menu header */}
          {isMobile && menuOpen && (
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center">
                  <span className="text-secondary-foreground font-bold text-sm">DC</span>
                </div>
                <span className="font-medium">DonateChain</span>
              </div>
              <button 
                onClick={toggleMenu}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
          )}

          {/* Navigation */}
          <nav className="p-3 flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => isMobile && setMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-gray-100"
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

          {/* Logout */}
          <div className="p-3 border-t">
            <button 
              className="flex items-center space-x-3 w-full px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Page content */}
        <main className="flex-1">
          {/* Desktop Page Header */}
          <header className="hidden md:flex bg-white border-b p-4 items-center justify-between sticky top-0 z-10">
            <h1 className="text-lg font-medium">
              {navItems.find(item => item.path === location.pathname)?.label || 'DonateChain'}
            </h1>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Ahmed</span>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                A
              </div>
            </div>
          </header>

          {/* Content area */}
          <div className="p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DonorLayout;
