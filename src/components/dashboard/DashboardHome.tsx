
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatsCard from './StatsCard';
import FinanceChart from './FinanceChart';
import RecentChats from './RecentChats';
import ProfessionalTasks from './ProfessionalTasks';
import Advertisement from './Advertisement';
import { DollarSign, MessageSquare, History, Tag } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface UserProfileData {
  id: string;
  name: string;
  email: string;
  balance: number;
  unread_messages: number;
  ai_conversations: number;
  specialist_tasks: number;
}

const DashboardHome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [aiChats, setAiChats] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Felhasználói munkamenet lekérése
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData.session?.user.id;
        
        if (!userId) {
          navigate('/login');
          return;
        }
        
        // Felhasználói profil lekérése
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (profileError) {
          console.error('Hiba a felhasználói profil lekérésekor:', profileError);
          return;
        }
        
        setUserData(profileData);
        
        // Itt további adatok betöltését is megvalósíthatjuk...
        // Például AI beszélgetések, szakember feladatok, hirdetések
        
      } catch (error) {
        console.error('Hiba történt az adatok betöltésekor:', error);
        toast.error('Nem sikerült betölteni a felhasználói adatokat');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate]);

  const handleNavigation = (page: string) => {
    navigate(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-quickfix-yellow font-bold">Adatok betöltése...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-quickfix-yellow mb-4">
        Üdvözöljük a QuickFix Vezérlőpulton, {userData?.name || 'Felhasználó'}!
      </h2>
      
      {/* Statisztikai kártyák */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Egyenleg" 
          value={`${userData?.balance || 0} Ft`} 
          description="Jelenlegi pénzügyi egyenleg" 
          icon={<DollarSign className="h-4 w-4" />}
        />
        
        <StatsCard 
          title="Üzenetek" 
          value={`${userData?.unread_messages || 0}`} 
          description="Olvasatlan üzenetek" 
          icon={<MessageSquare className="h-4 w-4" />}
        />
        
        <StatsCard 
          title="AI Beszélgetések" 
          value={`${userData?.ai_conversations || 0}`} 
          description="Megválaszolt kérdések" 
          icon={<History className="h-4 w-4" />}
        />
        
        <StatsCard 
          title="Szakember hívások" 
          value={`${userData?.specialist_tasks || 0}`} 
          description="Befejezett munkák" 
          icon={<Tag className="h-4 w-4" />}
        />
      </div>
      
      {/* Pénzügyi grafikon és korábbi beszélgetések */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <FinanceChart userId={userData?.id} />
        <RecentChats userId={userData?.id} />
      </div>
      
      {/* Szakember feladatok és hirdetés */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ProfessionalTasks />
        <Advertisement />
      </div>
    </div>
  );
};

export default DashboardHome;
