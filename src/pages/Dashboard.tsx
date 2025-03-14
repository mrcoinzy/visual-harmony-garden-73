
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import SidebarComponent from '@/components/dashboard/SidebarComponent';
import DashboardContent from '@/components/dashboard/DashboardContent';

const Dashboard = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // URL hash változásának követése és a megfelelő oldal beállítása
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      if (hash === 'ai-help' || hash === 'professional-help') {
        setCurrentPage('help');
      } else if (hash === 'profile' || hash === 'dashboard' || hash === 'messages' || 
                hash === 'history' || hash === 'notifications' || 
                hash === 'services' || hash === 'settings' || hash === 'help') {
        setCurrentPage(hash);
      }
    } else {
      setCurrentPage('dashboard');
    }
  }, [location]);
  
  const handlePageChange = (page) => {
    // A fő kategóriák közvetlen beállítása
    if (page === 'dashboard' || page === 'profile' || page === 'messages' || 
        page === 'history' || page === 'notifications' || page === 'services' || 
        page === 'settings' || page === 'help') {
      setCurrentPage(page);
      window.location.hash = page;
    } else {
      // Alkategóriák (ai-help, professional-help) kezelése
      // Megtartjuk az alkategória hash-t, de a sidebar megfelelő szülő elemet jelöli aktívnak
      const parentCategory = 
        page.includes('help') ? 'help' :
        page.includes('profile') ? 'profile' : 
        'dashboard';
      
      setCurrentPage(parentCategory);
      window.location.hash = page;
    }
  };
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-quickfix-dark">
        <SidebarComponent activePage={currentPage} onNavigate={handlePageChange} />
        <SidebarInset className="bg-quickfix-dark text-white">
          <div className="flex h-14 items-center border-b border-gray-800 px-4">
            <SidebarTrigger />
            <h1 className="ml-4 text-xl font-bold">QuickFix Dashboard</h1>
          </div>
          <DashboardContent currentPage={location.hash.replace('#', '') || 'dashboard'} onPageChange={handlePageChange} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
