
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase, getUserProfile, getFinancialData, getRecentAIConversations, getSpecialistTasks, getActiveAdvertisements } from '@/lib/supabase';
import StatsCard from './StatsCard';
import FinanceChart from './FinanceChart';
import RecentChats from './RecentChats';
import ProfessionalTasks from './ProfessionalTasks';
import Advertisement from './Advertisement';
import { DollarSign, MessageSquare, History, Tag } from 'lucide-react';

const DashboardHome = () => {
  const [userId, setUserId] = useState(null);

  // Get current authenticated user
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user && !error) {
        setUserId(user.id);
      }
    };
    
    fetchUser();
  }, []);

  // Fetch user profile data
  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getUserProfile(userId),
    enabled: !!userId
  });

  // Fetch financial data for chart
  const currentYear = new Date().getFullYear();
  const { data: financialData, isLoading: financialLoading } = useQuery({
    queryKey: ['financialData', userId, currentYear],
    queryFn: () => getFinancialData(userId, currentYear),
    enabled: !!userId
  });

  // Fetch recent AI conversations
  const { data: conversationsData, isLoading: conversationsLoading } = useQuery({
    queryKey: ['conversations', userId],
    queryFn: () => getRecentAIConversations(userId),
    enabled: !!userId
  });

  // Fetch specialist tasks
  const { data: tasksData, isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks', userId],
    queryFn: () => getSpecialistTasks(userId),
    enabled: !!userId
  });
  
  // Fetch active advertisements
  const { data: adsData, isLoading: adsLoading } = useQuery({
    queryKey: ['advertisements'],
    queryFn: () => getActiveAdvertisements(),
  });

  // Format financial data for chart component
  const formattedFinancialData = React.useMemo(() => {
    if (!financialData?.data) return [];
    
    // Create an array for all months (1-12)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dataByMonth = Array(12).fill(0).map((_, i) => ({ name: monthNames[i], amount: 0 }));
    
    // Fill in actual data
    financialData.data.forEach(record => {
      const monthIndex = record.month - 1; // Months are 1-indexed in DB, 0-indexed in array
      dataByMonth[monthIndex].amount += Number(record.amount);
    });
    
    return dataByMonth;
  }, [financialData]);

  // Show loading state while data is being fetched
  if (profileLoading || !userId) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-quickfix-yellow"></div>
      </div>
    );
  }

  const profile = profileData?.data || {
    total_balance: 0,
    unread_messages: 0,
    ai_conversations_count: 0,
    specialist_tasks_count: 0
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-quickfix-yellow mb-4">Üdvözöljük a QuickFix Vezérlőpulton!</h2>
      
      {/* Statisztikai kártyák */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Egyenleg" 
          value={`${profile.total_balance.toLocaleString()} Ft`} 
          description="Jelenlegi pénzügyi egyenleg" 
          icon={<DollarSign className="h-4 w-4" />}
        />
        
        <StatsCard 
          title="Üzenetek" 
          value={profile.unread_messages.toString()} 
          description="Olvasatlan üzenetek" 
          icon={<MessageSquare className="h-4 w-4" />}
        />
        
        <StatsCard 
          title="AI Beszélgetések" 
          value={profile.ai_conversations_count.toString()} 
          description="Megválaszolt kérdések" 
          icon={<History className="h-4 w-4" />}
        />
        
        <StatsCard 
          title="Szakember hívások" 
          value={profile.specialist_tasks_count.toString()} 
          description="Befejezett munkák" 
          icon={<Tag className="h-4 w-4" />}
        />
      </div>
      
      {/* Pénzügyi grafikon és korábbi beszélgetések */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <FinanceChart 
          isLoading={financialLoading} 
          data={formattedFinancialData} 
        />
        <RecentChats 
          isLoading={conversationsLoading} 
          conversations={conversationsData?.data || []} 
          onNavigate={(page) => window.location.hash = page}  
        />
      </div>
      
      {/* Szakember feladatok és hirdetés */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ProfessionalTasks 
          isLoading={tasksLoading} 
          tasks={tasksData?.data || []} 
          onNavigate={(page) => window.location.hash = page}
        />
        <Advertisement 
          isLoading={adsLoading} 
          ad={adsData?.data?.[0] || {
            title: "QuickFix Premium",
            subtitle: "Próbálja ki a prémium tagságot!",
            content: "Speciális kedvezmények és prioritásos segítségnyújtás szakemberektől.",
            redirect_url: "#services"
          }} 
        />
      </div>
    </div>
  );
};

export default DashboardHome;
