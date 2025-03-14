
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HelpCircle, MessageSquare, User } from 'lucide-react';
import RequestOptions from '@/components/help/RequestOptions';
import AIChat from '@/components/help/AIChat';
import ProfessionalHelp from '@/components/help/ProfessionalHelp';

type HelpType = 'none' | 'ai' | 'professional';

interface LocationState {
  initialType?: HelpType;
}

const HelpRequest = () => {
  const location = useLocation();
  const [helpType, setHelpType] = useState<HelpType>('none');
  
  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.initialType) {
      setHelpType(state.initialType);
    }
  }, [location.state]);

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Segítségkérés</h1>
        <p className="text-gray-400">
          Válassza ki, milyen típusú segítségre van szüksége, és mi segítünk megoldani problémáját.
        </p>
      </div>

      {helpType === 'none' && (
        <RequestOptions onSelectOption={(type) => setHelpType(type)} />
      )}

      {helpType === 'ai' && (
        <AIChat onBack={() => setHelpType('none')} />
      )}

      {helpType === 'professional' && (
        <ProfessionalHelp onBack={() => setHelpType('none')} />
      )}
    </div>
  );
};

export default HelpRequest;
