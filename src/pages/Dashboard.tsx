
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Home, Settings, MessageSquare, HelpCircle, Bell, Wrench, User, History } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInset,
  SidebarSeparator
} from '@/components/ui/sidebar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import AIChat from '@/components/help/AIChat';
import ProfessionalHelp from '@/components/help/ProfessionalHelp';
import Profile from './Profile';

// Navigation items for the dashboard
const navigationItems = [
  { 
    icon: Home, 
    label: 'Főoldal', 
    href: '#' 
  },
  { 
    icon: MessageSquare, 
    label: 'Üzenetek', 
    href: '#' 
  },
  { 
    icon: History, 
    label: 'Előzmények', 
    href: '#' 
  },
  { 
    icon: Bell, 
    label: 'Értesítések', 
    href: '#',
    badge: '3'
  },
];

// Service items
const serviceItems = [
  { 
    icon: Wrench, 
    label: 'Szolgáltatások', 
    href: '#' 
  },
  { 
    icon: HelpCircle, 
    label: 'Segítséget kérek', 
    href: '#',
    highlighted: true
  },
];

// Settings items
const settingsItems = [
  { 
    icon: User, 
    label: 'Profilom', 
    href: '#profile',
    id: 'profile'
  },
  { 
    icon: Settings, 
    label: 'Beállítások', 
    href: '#' 
  },
];

const DashboardSidebar = ({ activePage }: { activePage: string }) => {
  const navigate = useNavigate();
  
  // Would come from authentication context in a real app
  const user = {
    name: 'Felhasználó',
    email: 'felhasznalo@example.com',
    avatar: null
  };

  const handleSignOut = () => {
    toast.success('Sikeres kijelentkezés!');
    navigate('/login');
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-quickfix-yellow">
            <AvatarImage src={user.avatar || ''} alt={user.name} />
            <AvatarFallback className="bg-quickfix-dark-gray text-white">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-medium text-sidebar-foreground">Szia, {user.name}!</p>
            <p className="text-xs text-sidebar-foreground/70">{user.email}</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigáció</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <a href={item.href} className="relative">
                      <item.icon />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 flex h-5 min-w-5 items-center justify-center rounded-full bg-quickfix-yellow text-xs font-medium text-quickfix-dark">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>Szolgáltatások</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {serviceItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.label}
                    className={item.highlighted ? "bg-quickfix-yellow text-quickfix-dark hover:bg-quickfix-yellow/90" : ""}
                  >
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>Felhasználói beállítások</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.label}
                    isActive={activePage === item.id}
                    className={activePage === item.id ? "bg-quickfix-yellow/20" : ""}
                  >
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <Button 
          onClick={handleSignOut} 
          variant="outline" 
          className="w-full border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
        >
          Kijelentkezés
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [helpType, setHelpType] = useState<'none' | 'ai' | 'professional'>('none');
  const [showProfile, setShowProfile] = useState(false);
  
  // Check if the URL hash is #profile to show profile
  React.useEffect(() => {
    if (location.hash === '#profile') {
      setShowProfile(true);
      setHelpType('none');
    } else {
      setShowProfile(false);
    }
  }, [location.hash]);
  
  const handleSelectHelp = (type: 'ai' | 'professional') => {
    setHelpType(type);
    setShowProfile(false);
    navigate('#');
  };
  
  const handleBack = () => {
    setHelpType('none');
    setShowProfile(false);
    navigate('#');
  };
  
  // Determine active page for sidebar highlighting
  const activePage = showProfile ? 'profile' : '';
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-quickfix-dark">
        <DashboardSidebar activePage={activePage} />
        <SidebarInset className="bg-quickfix-dark text-white">
          <div className="flex h-14 items-center border-b border-gray-800 px-4">
            <SidebarTrigger />
            <h1 className="ml-4 text-xl font-bold">QuickFix Dashboard</h1>
          </div>
          <div className="flex-1 p-8">
            {!helpType && !showProfile && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                <div 
                  className="card-featured cursor-pointer hover-card"
                  onClick={() => handleSelectHelp('ai')}
                >
                  <div className="icon-container">
                    <MessageSquare className="h-6 w-6 text-quickfix-yellow" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-quickfix-yellow">QuickFix AI</h3>
                  <p className="text-gray-300">
                    Azonnali automatikus segítség a leggyakoribb problémákhoz. 
                    Az AI asszisztensünk gyorsan válaszol a kérdésekre.
                  </p>
                </div>
                
                <div 
                  className="card-featured cursor-pointer hover-card"
                  onClick={() => handleSelectHelp('professional')}
                >
                  <div className="icon-container">
                    <Wrench className="h-6 w-6 text-quickfix-yellow" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-quickfix-yellow">Szakember segítsége</h3>
                  <p className="text-gray-300">
                    Kapcsolatba léphet képzett szakembereinkkel, 
                    akik személyre szabott megoldást nyújtanak az Ön problémájára.
                  </p>
                </div>
              </div>
            )}
            
            {helpType === 'ai' && (
              <div className="animate-scale-in">
                <AIChat onBack={handleBack} />
              </div>
            )}
            
            {helpType === 'professional' && (
              <div className="animate-scale-in">
                <ProfessionalHelp onBack={handleBack} />
              </div>
            )}
            
            {showProfile && (
              <div className="animate-scale-in">
                <Profile onBack={handleBack} />
              </div>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
