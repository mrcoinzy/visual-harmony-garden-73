
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import SidebarComponent from '@/components/dashboard/SidebarComponent';
import DashboardContent from '@/components/dashboard/DashboardContent';

const Dashboard = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState('dashboard');
  
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
