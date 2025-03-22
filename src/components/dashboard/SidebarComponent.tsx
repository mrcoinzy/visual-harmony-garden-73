
import React from 'react';
import { Home, Settings, MessageSquare, HelpCircle, Bell, Wrench, User, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarContent,
  SidebarSeparator,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

// Navigációs elemek a dashboard számára
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

// Szolgáltatás elemek
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

// Beállítások elemek
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

interface SidebarComponentProps {
  activePage: string;
  onNavigate: (id: string) => void;
  userBalance: number; // Add userBalance prop to the interface
}

const SidebarComponent = ({ activePage, onNavigate, userBalance }: SidebarComponentProps) => {
  const navigate = useNavigate();
  
  // Valós alkalmazásban az authentikációs kontextusból jönne
  const user = {
    name: 'Felhasználó',
    email: 'felhasznalo@example.com',
    avatar: null
  };

  const handleSignOut = () => {
    toast.success('Sikeres kijelentkezés!');
    navigate('/login');
  };

  const handleMenuClick = (id: string) => {
    onNavigate(id);
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="md:hidden" />
          <Avatar className="h-10 w-10 border-2 border-quickfix-yellow">
            <AvatarImage src={user.avatar || ''} alt={user.name} />
            <AvatarFallback className="bg-quickfix-dark-gray text-white">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-medium text-sidebar-foreground">Szia, {user.name}!</p>
            <p className="text-xs text-sidebar-foreground/70">{user.email}</p>
            <p className="text-xs text-sidebar-foreground/70">Egyenleg: {userBalance} Ft</p>
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
                    onClick={() => handleMenuClick(item.id)}
                  >
                    <div className="relative">
                      <item.icon />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 flex h-5 min-w-5 items-center justify-center rounded-full bg-quickfix-yellow text-xs font-medium text-quickfix-dark">
                          {item.badge}
                        </span>
                      )}
                    </div>
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
                    onClick={() => handleMenuClick(item.id)}
                    className={item.highlighted ? "bg-quickfix-yellow text-quickfix-dark hover:bg-quickfix-yellow/90" : ""}
                  >
                    <div>
                      <item.icon />
                      <span>{item.label}</span>
                    </div>
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
                    onClick={() => handleMenuClick(item.id)}
                  >
                    <div>
                      <item.icon />
                      <span>{item.label}</span>
                    </div>
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

export default SidebarComponent;
