
import React, { useState, useEffect } from 'react';
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
import RequestOptions from '@/components/help/RequestOptions';
import AIChat from '@/components/help/AIChat';
import ProfessionalHelp from '@/components/help/ProfessionalHelp';
import Profile from './Profile';

// Navigation items for the dashboard
const navigationItems = [
  { 
    icon: Home, 
    label: 'Főoldal', 
    href: '#dashboard',
    id: 'dashboard'
  },
  { 
    icon: MessageSquare, 
    label: 'Üzenetek', 
    href: '#messages',
    id: 'messages'
  },
  { 
    icon: History, 
    label: 'Előzmények', 
    href: '#history',
    id: 'history' 
  },
  { 
    icon: Bell, 
    label: 'Értesítések', 
    href: '#notifications',
    id: 'notifications',
    badge: '3'
  },
];

// Service items
const serviceItems = [
  { 
    icon: Wrench, 
    label: 'Szolgáltatások', 
    href: '#services',
    id: 'services'
  },
  { 
    icon: HelpCircle, 
    label: 'Segítséget kérek', 
    href: '#help',
    id: 'help',
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
    href: '#settings',
    id: 'settings'
  },
];

const DashboardSidebar = ({ activePage, onNavigate }) => {
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

  const handleMenuClick = (href, id) => {
    onNavigate(id);
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
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.label}
                    isActive={activePage === item.id}
                    onClick={() => handleMenuClick(item.href, item.id)}
                  >
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
                    isActive={activePage === item.id}
                    onClick={() => handleMenuClick(item.href, item.id)}
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
                    onClick={() => handleMenuClick(item.href, item.id)}
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
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // Check for hash in URL and set the current page accordingly
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setCurrentPage(hash);
    } else {
      setCurrentPage('dashboard');
    }
  }, [location]);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.location.hash = page;
  };
  
  const renderContent = () => {
    switch (currentPage) {
      case 'profile':
        return (
          <div className="animate-fade-in">
            <Profile onBack={() => handlePageChange('dashboard')} />
          </div>
        );
      case 'help':
        return (
          <div className="animate-fade-in">
            <div className="rounded-lg border border-gray-800 bg-quickfix-dark-gray p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-quickfix-yellow">Milyen segítségre van szüksége?</h2>
              <p className="text-gray-300 mb-6">
                Válasszon az alábbi lehetőségek közül, hogy milyen típusú segítségre van szüksége.
              </p>
              
              <RequestOptions 
                onSelectOption={(type) => {
                  if (type === 'ai') {
                    setCurrentPage('ai-help');
                    window.location.hash = 'ai-help';
                  } else if (type === 'professional') {
                    setCurrentPage('professional-help');
                    window.location.hash = 'professional-help';
                  }
                }} 
              />
            </div>
          </div>
        );
      case 'ai-help':
        return (
          <div className="animate-scale-in">
            <AIChat onBack={() => handlePageChange('help')} />
          </div>
        );
      case 'professional-help':
        return (
          <div className="animate-scale-in">
            <ProfessionalHelp onBack={() => handlePageChange('help')} />
          </div>
        );
      default:
        return (
          <div className="rounded-lg border border-gray-800 bg-quickfix-dark-gray p-6 shadow-sm animate-fade-in">
            <h2 className="mb-4 text-2xl font-bold text-quickfix-yellow">Üdvözöljük a QuickFix Dashboardban!</h2>
            <p className="text-gray-300 mb-6">
              Fedezze fel szolgáltatásainkat és kérjen segítséget szakembereinktől vagy AI asszisztensünktől.
            </p>
          </div>
        );
    }
  };
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-quickfix-dark">
        <DashboardSidebar activePage={currentPage} onNavigate={handlePageChange} />
        <SidebarInset className="bg-quickfix-dark text-white">
          <div className="flex h-14 items-center border-b border-gray-800 px-4">
            <SidebarTrigger />
            <h1 className="ml-4 text-xl font-bold">QuickFix Dashboard</h1>
          </div>
          <div className="flex-1 p-8">
            {renderContent()}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
