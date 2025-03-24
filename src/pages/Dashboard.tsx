
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
  const [initialized, setInitialized] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  
  // Fetch user balance on component mount
  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        setIsLoading(true);
        console.log("Dashboard: Fetching user balance...");
        
        // First check if we have a valid session
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error("Auth error in Dashboard:", userError);
          throw new Error("Authentication error");
        }
        
        if (!user) {
          console.log("No user found in auth state");
          setProfileError("User not authenticated");
          return;
        }
        
        console.log("Dashboard: User found, fetching profile", user.id);
        
        // Try to get existing profile
        const { data, error } = await supabase
          .from('profiles')
          .select('balance')
          .eq('id', user.id)
          .maybeSingle();
          
        if (error) {
          console.error('Error fetching balance:', error);
          
          // If there's no profile, create one
          if (error.code === 'PGRST116') {
            console.log("No profile found, creating one");
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([{ 
                id: user.id, 
                balance: 0,
                full_name: user.user_metadata?.full_name || '' 
              }]);
              
            if (insertError) {
              console.error('Error creating profile:', insertError);
              throw new Error('Unable to create user profile');
            } else {
              setUserBalance(0);
            }
          } else {
            throw new Error('Failed to fetch user data');
          }
        } else if (data) {
          console.log("Dashboard: Profile data:", data);
          setUserBalance(data.balance || 0);
        } else {
          // If no error but also no data, create a profile
          console.log("No profile data returned, creating one");
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{ id: user.id, balance: 0 }]);
            
          if (insertError) {
            console.error('Error creating profile:', insertError);
            throw new Error('Unable to create user profile');
          } else {
            setUserBalance(0);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user balance:', error);
        setProfileError(error.message || 'Failed to load user data');
      } finally {
        setIsLoading(false);
        setInitialized(true);
      }
    };
    
    fetchUserBalance();
  }, []);
  
  // URL hash tracking and setting the correct page
  useEffect(() => {
    if (!initialized) return;
    
    const hash = location.hash.replace('#', '');
    
    if (hash) {
      setActivePage(getPageFromHash(hash));
    } else {
      setActivePage('dashboard');
    }
  }, [location, initialized]);
  
  // If there's a profile error, redirect to login
  useEffect(() => {
    if (profileError && initialized) {
      console.log("Profile error detected, redirecting to login:", profileError);
      toast.error(`Profil hiba: ${profileError}`);
      // Sign out to clear any potential auth issues
      supabase.auth.signOut().then(() => {
        navigate('/login', { replace: true });
      });
    }
  }, [profileError, initialized, navigate]);
  
  // Helper function to determine the active page from the hash
  const getPageFromHash = (hash) => {
    const validPages = [
      'dashboard', 'messages', 'history', 'notifications', 
      'services', 'profile', 'settings', 'help', 'ai-help', 'professional-help'
    ];
    
    // Special case for help subpages
    if (hash === 'ai-help' || hash === 'professional-help') {
      return hash;
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
  
  if (profileError) {
    return (
      <div className="flex min-h-screen w-full bg-quickfix-dark items-center justify-center flex-col gap-4">
        <div className="text-red-400 text-lg">Hiba történt: {profileError}</div>
        <button 
          onClick={() => navigate('/login', { replace: true })}
          className="px-4 py-2 bg-quickfix-yellow text-quickfix-dark rounded-lg"
        >
          Vissza a bejelentkezéshez
        </button>
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
