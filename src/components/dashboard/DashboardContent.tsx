
import React from 'react';
import Profile from '@/pages/Profile';
import RequestOptions from '@/components/help/RequestOptions';
import AIChat from '@/components/help/AIChat';
import ProfessionalHelp from '@/components/help/ProfessionalHelp';
import DashboardHome from '@/components/dashboard/DashboardHome';
import Messages from '@/pages/Messages';
import History from '@/pages/History';
import Notifications from '@/pages/Notifications';
import Services from '@/pages/Services';
import Settings from '@/pages/Settings';

interface DashboardContentProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  userBalance: number; // Add userBalance prop
  setUserBalance?: React.Dispatch<React.SetStateAction<number>>; // Add setUserBalance prop (optional)
}

const DashboardContent: React.FC<DashboardContentProps> = ({ 
  currentPage, 
  onPageChange, 
  userBalance,
  setUserBalance 
}) => {
  // Oldalak tartalmának megjelenítése az aktuális oldal alapján
  const renderContent = () => {
    // Főoldal megjelenítése
    if (currentPage === '' || currentPage === 'dashboard') {
      return <DashboardHome />;
    }
    
    // Üzenetek oldal megjelenítése
    if (currentPage === 'messages') {
      return (
        <div className="animate-fade-in">
          <Messages onBack={() => onPageChange('dashboard')} />
        </div>
      );
    }
    
    // Előzmények oldal megjelenítése
    if (currentPage === 'history') {
      return (
        <div className="animate-fade-in">
          <History onBack={() => onPageChange('dashboard')} />
        </div>
      );
    }
    
    // Értesítések oldal megjelenítése
    if (currentPage === 'notifications') {
      return (
        <div className="animate-fade-in">
          <Notifications onBack={() => onPageChange('dashboard')} />
        </div>
      );
    }
    
    // Szolgáltatások oldal megjelenítése
    if (currentPage === 'services') {
      return (
        <div className="animate-fade-in">
          <Services onBack={() => onPageChange('dashboard')} />
        </div>
      );
    }
    
    // Beállítások oldal megjelenítése
    if (currentPage === 'settings') {
      return (
        <div className="animate-fade-in">
          <Settings onBack={() => onPageChange('dashboard')} />
        </div>
      );
    }
    
    // Profil oldal megjelenítése
    if (currentPage === 'profile') {
      return (
        <div className="animate-fade-in">
          <Profile onBack={() => onPageChange('dashboard')} />
        </div>
      );
    }
    
    // Segítség főoldal megjelenítése
    if (currentPage === 'help') {
      return (
        <div className="animate-fade-in">
          <div className="rounded-lg border border-gray-800 bg-quickfix-dark-gray p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-quickfix-yellow">Milyen segítségre van szüksége?</h2>
            <p className="text-gray-300 mb-6">
              Válasszon az alábbi lehetőségek közül, hogy milyen típusú segítségre van szüksége.
            </p>
            
            <RequestOptions 
              onSelectOption={(type) => {
                if (type === 'ai') {
                  onPageChange('ai-help');
                } else if (type === 'professional') {
                  onPageChange('professional-help');
                }
              }} 
            />
          </div>
        </div>
      );
    }
    
    // AI segítség megjelenítése
    if (currentPage === 'ai-help') {
      return (
        <div className="animate-scale-in">
          <AIChat onBack={() => onPageChange('help')} />
        </div>
      );
    }
    
    // Szakember segítség megjelenítése
    if (currentPage === 'professional-help') {
      return (
        <div className="animate-scale-in">
          <ProfessionalHelp 
            onBack={() => onPageChange('help')} 
            userBalance={userBalance}
            setUserBalance={setUserBalance}
          />
        </div>
      );
    }
    
    // Alapértelmezett tartalom - üres oldal esetére
    return (
      <div className="rounded-lg border border-gray-800 bg-quickfix-dark-gray p-6 shadow-sm animate-fade-in">
        <h2 className="mb-4 text-2xl font-bold text-quickfix-yellow">Az oldal fejlesztés alatt áll</h2>
        <p className="text-gray-300 mb-6">
          A kért tartalom jelenleg nem elérhető.
        </p>
      </div>
    );
  };
  
  return (
    <div className="flex-1 p-8">
      {renderContent()}
    </div>
  );
};

export default DashboardContent;
