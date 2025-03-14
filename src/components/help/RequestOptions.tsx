
import React from 'react';
import { Robot, User } from 'lucide-react';
import Card from '@/components/Card';

type HelpType = 'none' | 'ai' | 'professional';

interface RequestOptionsProps {
  onSelectOption: (type: 'ai' | 'professional') => void;
}

const RequestOptions = ({ onSelectOption }: RequestOptionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card 
        variant="glass" 
        className="hover:border-quickfix-yellow border-2 border-transparent transition-all duration-300 cursor-pointer flex flex-col items-center p-8"
        onClick={() => onSelectOption('ai')}
      >
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
          <Robot className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">QuickFix AI segítségével</h3>
        <p className="text-gray-400 text-center">
          Azonnali segítséget kap a mesterséges intelligenciától, amely gyors válaszokat ad kérdéseire és segít megoldani egyszerűbb problémákat.
        </p>
        <div className="mt-4 p-2 bg-blue-500/20 rounded-lg">
          <span className="text-blue-300 text-sm">Azonnal elérhető</span>
        </div>
      </Card>

      <Card 
        variant="glass" 
        className="hover:border-quickfix-yellow border-2 border-transparent transition-all duration-300 cursor-pointer flex flex-col items-center p-8"
        onClick={() => onSelectOption('professional')}
      >
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-quickfix-yellow to-amber-500 mb-4">
          <User className="h-8 w-8 text-quickfix-dark" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Szakember segítségével</h3>
        <p className="text-gray-400 text-center">
          Valós szakember segít az Ön problémájának megoldásában. Szakemberünk a helyszínen vagy távolról nyújt professzionális segítséget.
        </p>
        <div className="mt-4 p-2 bg-amber-500/20 rounded-lg">
          <span className="text-amber-300 text-sm">Egyéni árazás</span>
        </div>
      </Card>
    </div>
  );
};

export default RequestOptions;
