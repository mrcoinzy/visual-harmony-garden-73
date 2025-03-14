
import React from 'react';
import Profile from '@/pages/Profile';
import RequestOptions from '@/components/help/RequestOptions';
import AIChat from '@/components/help/AIChat';
import ProfessionalHelp from '@/components/help/ProfessionalHelp';

interface DashboardContentProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ currentPage, onPageChange }) => {
  // Oldalak tartalmának megjelenítése az aktuális oldal alapján
  const renderContent = () => {
    // Főoldal megjelenítése
    if (currentPage === '' || currentPage === 'dashboard') {
      return (
        <div className="rounded-lg border border-gray-800 bg-quickfix-dark-gray p-6 shadow-sm animate-fade-in">
          <h2 className="mb-4 text-2xl font-bold text-quickfix-yellow">Üdvözöljük a QuickFix Dashboardban!</h2>
          <p className="text-gray-300 mb-6">
            Fedezze fel szolgáltatásainkat és kérjen segítséget szakembereinktől vagy AI asszisztensünktől.
          </p>
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
          <ProfessionalHelp onBack={() => onPageChange('help')} />
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
