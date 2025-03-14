
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
      if (hash === 'profile') {
        setActivePage('profile');
      } else if (hash === 'help' || hash === 'ai-help' || hash === 'professional-help') {
        setActivePage('help');
      } else {
        setActivePage('dashboard');
      }
    } else {
      setActivePage('dashboard');
    }
  }, [location]);
  
  // Egyszerűsített navigációs kezelés
  const handlePageChange = (page) => {
    if (page === 'dashboard') {
      setActivePage('dashboard');
    } else if (page === 'profile') {
      setActivePage('profile');
    } else {
      // help, ai-help, professional-help esetén a help menü legyen aktív
      setActivePage('help');
    }
    
    window.location.hash = page;
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
