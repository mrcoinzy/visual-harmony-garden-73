
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
  
  const renderContent = () => {
    // Alapvető oldalak renderelése a currentPage alapján
    switch (currentPage) {
      case 'profile':
        return (
          <div className="animate-fade-in">
            <Profile onBack={() => onPageChange('dashboard')} />
          </div>
        );
      case 'help':
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
      case 'ai-help':
        return (
          <div className="animate-scale-in">
            <AIChat onBack={() => onPageChange('help')} />
          </div>
        );
      case 'professional-help':
        return (
          <div className="animate-scale-in">
            <ProfessionalHelp onBack={() => onPageChange('help')} />
          </div>
        );
      case 'dashboard':
      default:
        // Alapértelmezett tartalom (főoldal)
        return (
          <div className="rounded-lg border border-gray-800 bg-quickfix-dark-gray p-6 shadow-sm animate-fade-in">
            <h2 className="mb-4 text-2xl font-bold text-quickfix-yellow">Üdvözöljük a QuickFix Dashboardban!</h2>
            <p className="text-gray-300 mb-6">
              Fedezze fel szolgáltatásainkat és kérjen segítséget szakembereinktől vagy AI asszisztensünktől.
            </p>
          </div>
        );
    }
  };
  
  return (
    <div className="flex-1 p-8">
      {renderContent()}
    </div>
  );
};

export default DashboardContent;
