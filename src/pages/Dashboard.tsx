
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
      // Az alkategóriák kezelése
      if (hash === 'ai-help' || hash === 'professional-help') {
        setActivePage('help');
      } else {
        // Főkategóriák kezelése
        setActivePage(hash);
      }
    } else {
      setActivePage('dashboard');
    }
  }, [location]);
  
  // Egyszerűsített navigációs kezelés
  const handlePageChange = (page) => {
    if (page === 'ai-help' || page === 'professional-help') {
      setActivePage('help');
    } else {
      setActivePage(page);
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
