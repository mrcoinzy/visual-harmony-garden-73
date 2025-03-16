
import React from 'react';
import StatsCard from './StatsCard';
import FinanceChart from './FinanceChart';
import RecentChats from './RecentChats';
import ProfessionalTasks from './ProfessionalTasks';
import Advertisement from './Advertisement';
import { DollarSign, MessageSquare, History, Tag } from 'lucide-react';

const DashboardHome = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-quickfix-yellow mb-4">Üdvözöljük a QuickFix Vezérlőpulton!</h2>
      
      {/* Statisztikai kártyák */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Egyenleg" 
          value="157,500 Ft" 
          description="Jelenlegi pénzügyi egyenleg" 
          icon={<DollarSign className="h-4 w-4" />}
        />
        
        <StatsCard 
          title="Üzenetek" 
          value="24" 
          description="Olvasatlan üzenetek" 
          icon={<MessageSquare className="h-4 w-4" />}
        />
        
        <StatsCard 
          title="AI Beszélgetések" 
          value="18" 
          description="Megválaszolt kérdések" 
          icon={<History className="h-4 w-4" />}
        />
        
        <StatsCard 
          title="Szakember hívások" 
          value="7" 
          description="Befejezett munkák" 
          icon={<Tag className="h-4 w-4" />}
        />
      </div>
      
      {/* Pénzügyi grafikon és korábbi beszélgetések */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <FinanceChart />
        <RecentChats />
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
