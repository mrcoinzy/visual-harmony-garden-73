
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import SidebarComponent from '@/components/dashboard/SidebarComponent';
import DashboardContent from '@/components/dashboard/DashboardContent';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  
  // Ellenőrizzük, hogy a felhasználó be van-e jelentkezve
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error || !data.session) {
          throw new Error('Nincs bejelentkezve');
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Auth error:', error);
        toast.error('A művelet végrehajtásához bejelentkezés szükséges.');
        navigate('/login');
      }
    };
    
    checkSession();
  }, [navigate]);
  
  // URL hash követése és helyes oldal beállítása
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    
    if (hash) {
      // Dashboard route esetén
      if (hash === 'dashboard') {
        setActivePage('dashboard');
      }
      // Messages route esetén
      else if (hash === 'messages') {
        setActivePage('messages');
      }
      // History route esetén
      else if (hash === 'history') {
        setActivePage('history');
      }
      // Notifications route esetén
      else if (hash === 'notifications') {
        setActivePage('notifications');
      }
      // Services route esetén
      else if (hash === 'services') {
        setActivePage('services');
      }
      // Profile route esetén
      else if (hash === 'profile') {
        setActivePage('profile');
      }
      // Settings route esetén
      else if (hash === 'settings') {
        setActivePage('settings');
      }
      // Help route esetén
      else if (hash === 'help' || hash === 'ai-help' || hash === 'professional-help') {
        setActivePage('help');
      }
      // Ha ismeretlen, akkor a főoldal az alapértelmezett
      else {
        setActivePage('dashboard');
      }
    } else {
      // Ha nincs hash, a főoldal az alapértelmezett
      setActivePage('dashboard');
    }
  }, [location]);
  
  // Navigációs kezelés
  const handlePageChange = (page) => {
    // Az URL hash frissítése
    window.location.hash = page;
    
    // Az aktív oldal beállítása a megfelelő menüpont kiemeléséhez
    if (page === 'dashboard') {
      setActivePage('dashboard');
    } else if (page === 'messages') {
      setActivePage('messages');
    } else if (page === 'history') {
      setActivePage('history');
    } else if (page === 'notifications') {
      setActivePage('notifications');
    } else if (page === 'services') {
      setActivePage('services');
    } else if (page === 'settings') {
      setActivePage('settings');
    } else if (page === 'profile') {
      setActivePage('profile');
    } else if (page === 'help' || page === 'ai-help' || page === 'professional-help') {
      setActivePage('help');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-quickfix-dark">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-quickfix-yellow border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-quickfix-dark">
        <SidebarComponent activePage={activePage} onNavigate={handlePageChange} />
        <SidebarInset className="bg-quickfix-dark text-white">
          <div className="flex h-14 items-center border-b border-gray-800 px-4">
            <h1 className="ml-4 text-xl font-bold">QuickFix Dashboard</h1>
          </div>
          <DashboardContent 
            currentPage={location.hash.replace('#', '') || 'dashboard'} 
            onPageChange={handlePageChange} 
          />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
