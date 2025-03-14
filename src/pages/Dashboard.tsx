
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import SidebarComponent from '@/components/dashboard/SidebarComponent';
import DashboardContent from '@/components/dashboard/DashboardContent';

const Dashboard = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // Check for hash in URL and set the current page accordingly
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      // Az AI-Help és Professional-Help oldalak a help kategóriába tartoznak a sidebar-on
      if (hash === 'ai-help' || hash === 'professional-help') {
        setCurrentPage('help');
      } else {
        setCurrentPage(hash);
      }
    } else {
      setCurrentPage('dashboard');
    }
  }, [location]);
  
  const handlePageChange = (page) => {
    // Ha a segítség aloldalairól váltunk, frissítsük a hash-t és állítsuk be a megfelelő aktív oldalt
    if (page === 'help') {
      setCurrentPage(page);
      window.location.hash = page;
    } else if (page === 'dashboard' || page === 'profile' || page === 'messages' || 
               page === 'history' || page === 'notifications' || page === 'services' || 
               page === 'settings') {
      setCurrentPage(page);
      window.location.hash = page;
    } else {
      // Bármely más aloldalra (pl. ai-help, professional-help) navigálunk, tároljuk a valós hash-t
      // de a sidebar-on a megfelelő szülő kategóriát jelöljük aktívnak
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
          <DashboardContent currentPage={currentPage} onPageChange={handlePageChange} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
