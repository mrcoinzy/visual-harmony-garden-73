
import React, { useState } from 'react';
import { HelpCircle, MessageSquare, User } from 'lucide-react';
import RequestOptions from '@/components/help/RequestOptions';
import AIChat from '@/components/help/AIChat';
import ProfessionalHelp from '@/components/help/ProfessionalHelp';

type HelpType = 'none' | 'ai' | 'professional';

const HelpRequest = () => {
  const [helpType, setHelpType] = useState<HelpType>('none');

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
