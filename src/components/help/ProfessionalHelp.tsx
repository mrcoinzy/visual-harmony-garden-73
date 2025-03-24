
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Clock, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { processCheckout } from '@/lib/supabase';
import AddBalanceModal from '@/components/AddBalanceModal';

interface ProfessionalHelpProps {
  onBack: () => void;
  userBalance: number;
  setUserBalance?: React.Dispatch<React.SetStateAction<number>>;
}

const ProfessionalHelp: React.FC<ProfessionalHelpProps> = ({ 
  onBack,
  userBalance,
  setUserBalance
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddBalanceOpen, setIsAddBalanceOpen] = useState(false);
  const [price] = useState(5000); // Fixed price for professional help in HUF
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast.error('Kérjük, töltse ki az összes mezőt!');
      return;
    }
    
    if (userBalance < price) {
      toast.error('Nincs elegendő egyenleg a szolgáltatás igénybevételéhez!');
      setIsAddBalanceOpen(true);
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Process payment
      const paymentResult = await processCheckout(price, "Szakember segítség: " + title);
      
      if (!paymentResult.success) {
        toast.error('A fizetés sikertelen volt!');
        return;
      }
      
      // Update the balance in the UI if payment successful
      if (setUserBalance) {
        setUserBalance(prevBalance => prevBalance - price);
      }
      
      // Get user info
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('A felhasználó nincs bejelentkezve!');
        return;
      }
      
      // Create a professional task
      const { data, error } = await supabase
        .from('professional_tasks')
        .insert([
          {
            title,
            description,
            price,
            user_id: user.id,
            status: 'pending'
          }
        ])
        .select();
        
      if (error) {
        console.error('Error creating task:', error);
        toast.error('Hiba történt a feladat létrehozásakor!');
        return;
      }
      
      toast.success('Sikeres kérés! A szakember hamarosan felveszi Önnel a kapcsolatot.');
      setTitle('');
      setDescription('');
      
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Hiba történt a kérés feldolgozása során!');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="rounded-lg border border-gray-800 bg-quickfix-dark-gray p-6 shadow-sm">
      <div className="flex items-center mb-6">
        <Button 
          variant="outline" 
          size="icon" 
          className="mr-4 border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white"
          onClick={onBack}
        >
          <ArrowLeft size={20} />
        </Button>
        <h2 className="text-2xl font-bold text-quickfix-yellow">Szakember segítség kérése</h2>
      </div>
      
      <div className="mb-6">
        <div className="bg-quickfix-dark rounded-lg p-4 mb-6 border border-gray-800">
          <h3 className="text-white font-medium mb-2">Szakértői segítség</h3>
          <p className="text-gray-400 mb-4">
            A szakembereink valós időben segítenek megoldani a problémáját. Válassza ezt a lehetőséget, ha összetett problémája van, vagy személyes segítségre van szüksége.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-green-400">
              <CheckCircle size={16} className="mr-2" />
              <span>Valós idejű segítség</span>
            </div>
            <div className="flex items-center text-yellow-400">
              <Clock size={16} className="mr-2" />
              <span>Gyors válasz (24 órán belül)</span>
            </div>
          </div>
        </div>
        
        <div className="bg-quickfix-dark rounded-lg p-4 border border-gray-700 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Ár:</span>
            <span className="text-quickfix-yellow font-bold">{price.toLocaleString()} Ft</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Jelenlegi egyenleg:</span>
            <span className={`font-bold ${userBalance < price ? 'text-red-400' : 'text-green-400'}`}>
              {userBalance.toLocaleString()} Ft
            </span>
          </div>
          {userBalance < price && (
            <div className="mt-4">
              <Button 
                className="w-full bg-quickfix-yellow text-quickfix-dark hover:bg-quickfix-yellow/90"
                onClick={() => setIsAddBalanceOpen(true)}
              >
                Egyenleg feltöltése
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          <div>
            <Label htmlFor="title" className="text-gray-300">Probléma címe</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Írja be a probléma címét"
              className="bg-quickfix-dark-gray border-gray-700 focus:border-quickfix-yellow focus:ring-quickfix-yellow/20"
            />
          </div>
          
          <div>
            <Label htmlFor="description" className="text-gray-300">Probléma leírása</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Részletesen írja le a problémát, hogy a szakembereink minél jobban megérthessék"
              className="h-32 bg-quickfix-dark-gray border-gray-700 focus:border-quickfix-yellow focus:ring-quickfix-yellow/20"
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-quickfix-yellow text-quickfix-dark hover:bg-quickfix-yellow/90 flex items-center justify-center"
          disabled={isSubmitting || userBalance < price}
        >
          {isSubmitting ? (
            "Küldés folyamatban..."
          ) : (
            <>
              <Send size={18} className="mr-2" />
              Küldés szakembernek
            </>
          )}
        </Button>
      </form>
      
      <AddBalanceModal 
        isOpen={isAddBalanceOpen}
        onClose={() => setIsAddBalanceOpen(false)}
        currentBalance={userBalance}
        onBalanceUpdate={setUserBalance}
      />
    </div>
  );
};

export default ProfessionalHelp;
