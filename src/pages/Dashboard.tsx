
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import SidebarComponent from '@/components/dashboard/SidebarComponent';
import DashboardContent from '@/components/dashboard/DashboardContent';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('dashboard');
  const [userBalance, setUserBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch user balance on component mount
  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        setIsLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('balance')
            .eq('id', user.id)
            .single();
            
          if (error) {
            console.error('Error fetching balance:', error);
            return;
          }
          
          if (data) {
            setUserBalance(data.balance || 0);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user balance:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserBalance();
  }, []);
  
  // URL hash tracking and setting the correct page
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    
    if (hash) {
      setActivePage(getPageFromHash(hash));
    } else {
      setActivePage('dashboard');
    }
  }, [location]);
  
  // Helper function to determine the active page from the hash
  const getPageFromHash = (hash) => {
    const validPages = [
      'dashboard', 'messages', 'history', 'notifications', 
      'services', 'profile', 'settings', 'help'
    ];
    
    // Special case for help subpages
    if (hash === 'ai-help' || hash === 'professional-help') {
      return 'help';
    }
    
    // If it's a valid page, return it, otherwise return dashboard
    return validPages.includes(hash) ? hash : 'dashboard';
  };
  
  // Navigation handler
  const handlePageChange = (page) => {
    // Prevent unnecessary reloads by checking if we're already on the page
    if (page === location.hash.replace('#', '')) {
      return;
    }
    
    // Update the URL hash without reloading the page
    navigate(`#${page}`, { replace: true });
  };
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full bg-quickfix-dark items-center justify-center">
        <div className="text-quickfix-yellow text-lg">Betöltés...</div>
      </div>
    );
  }
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-quickfix-dark">
        <SidebarComponent 
          activePage={activePage} 
          onNavigate={handlePageChange} 
          userBalance={userBalance} 
        />
        <SidebarInset className="bg-quickfix-dark text-white">
          <div className="flex h-14 items-center border-b border-gray-800 px-4">
            <h1 className="ml-4 text-xl font-bold">QuickFix Dashboard</h1>
          </div>
          <DashboardContent 
            currentPage={location.hash.replace('#', '') || 'dashboard'} 
            onPageChange={handlePageChange}
            userBalance={userBalance}
            setUserBalance={setUserBalance}
          />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
