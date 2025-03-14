
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    href: '/help-request',
    highlighted: true
  },
];

// Settings items
const settingsItems = [
  { 
    icon: User, 
    label: 'Profilom', 
    href: '#' 
  },
  { 
    icon: Settings, 
    label: 'Beállítások', 
    href: '#' 
  },
];

const DashboardSidebar = () => {
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
                  <SidebarMenuButton asChild tooltip={item.label}>
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
  
  const handleHelpRequest = () => {
    navigate('/help-request');
  };
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-quickfix-dark">
        <DashboardSidebar />
        <SidebarInset className="bg-quickfix-dark text-white">
          <div className="flex h-14 items-center border-b border-gray-800 px-4">
            <SidebarTrigger />
            <h1 className="ml-4 text-xl font-bold">QuickFix Dashboard</h1>
          </div>
          <div className="flex-1 p-8">
            <div className="rounded-lg border border-gray-800 bg-quickfix-dark-gray p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-quickfix-yellow">Üdvözöljük a Dashboard felületen!</h2>
              <p className="text-gray-300">
                Innen tud hozzáférni a QuickFix összes funkciójához. Válasszon egy menüpontot a bal oldali navigációs sávból, vagy nyomja meg a "Segítséget kérek" gombot, ha szakember segítségére van szüksége.
              </p>
              <div className="mt-6">
                <Button 
                  className="bg-quickfix-yellow text-quickfix-dark hover:bg-quickfix-yellow/90"
                  onClick={handleHelpRequest}
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Segítséget kérek
                </Button>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
