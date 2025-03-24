
import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface ProfessionalHelpProps {
  onBack: () => void;
  userBalance?: number;
  setUserBalance?: React.Dispatch<React.SetStateAction<number>>;
}

const expertiseOptions = [
  { value: 'plumbing', label: 'Vízvezeték-szerelés' },
  { value: 'electrical', label: 'Villanyszerelés' },
  { value: 'carpentry', label: 'Asztalos munkák' },
  { value: 'painting', label: 'Festés' },
  { value: 'cleaning', label: 'Takarítás' },
  { value: 'gardening', label: 'Kertészet' },
  { value: 'moving', label: 'Költöztetés' },
  { value: 'other', label: 'Egyéb' },
];

const ProfessionalHelp = ({ onBack, userBalance = 0, setUserBalance }: ProfessionalHelpProps) => {
  const [problem, setProblem] = useState('');
  const [expertise, setExpertise] = useState('');
  const [payment, setPayment] = useState([10000]); // Initial value in HUF
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!problem || !expertise || !location) {
      toast.error('Kérjük, töltse ki az összes kötelező mezőt');
      return;
    }
    
    // Check if user has enough balance
    if (userBalance < payment[0]) {
      toast.error('Nincs elegendő egyenleg a szolgáltatás igénybevételéhez');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit logic would go here
      // Update user's balance if the operation was successful
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({ balance: userBalance - payment[0] })
          .eq('id', user.id);
          
        if (error) {
          throw error;
        }
        
        // Update the balance in the state
        if (setUserBalance) {
          setUserBalance(prevBalance => prevBalance - payment[0]);
        }
        
        toast.success('Segítségkérés elküldve! Hamarosan felvesszük Önnel a kapcsolatot.');
      }
    } catch (error) {
      console.error('Error submitting help request:', error);
      toast.error('Hiba történt a kérés feldolgozása során');
    } finally {
      setIsSubmitting(false);
    }
    
    // For demo purposes, we're just logging the data
    console.log({
      problem,
      expertise,
      payment: payment[0],
      location,
    });
  };
  
  return (
    <div className="bg-quickfix-dark-gray rounded-xl overflow-hidden border border-gray-800 p-6 transition-all duration-300">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack}
          className="mr-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold text-white">Szakemberi segítségkérés</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4 animate-fade-in">
          <div>
            <Label htmlFor="problem" className="text-white">Mi a probléma?</Label>
            <Textarea
              id="problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Kérjük, írja le részletesen a problémát, amiben segítségre van szüksége..."
              className="bg-gray-800 border-gray-700 text-white h-32 focus-within:ring-quickfix-yellow focus:border-quickfix-yellow"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="expertise" className="text-white">Milyen szakértelmet szükséges?</Label>
            <Select value={expertise} onValueChange={setExpertise}>
              <SelectTrigger id="expertise" className="bg-gray-800 border-gray-700 text-white focus:ring-quickfix-yellow focus:border-quickfix-yellow">
                <SelectValue placeholder="Válasszon szakértelmet" />
              </SelectTrigger>
              <SelectContent>
                {expertiseOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="location" className="text-white">Helyszín</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Adja meg a címet"
              className="bg-gray-800 border-gray-700 text-white focus-within:ring-quickfix-yellow focus:border-quickfix-yellow"
              required
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="payment" className="text-white">Fizetés (Ft)</Label>
              <span className="text-quickfix-yellow font-semibold">{payment[0].toLocaleString()} Ft</span>
            </div>
            <Slider
              id="payment"
              value={payment}
              onValueChange={setPayment}
              min={5000}
              max={50000}
              step={1000}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>5,000 Ft</span>
              <span>50,000 Ft</span>
            </div>
          </div>
          
          {userBalance < payment[0] && (
            <div className="bg-red-900/30 border border-red-800 text-red-200 p-3 rounded-md text-sm">
              Nincs elegendő egyenleg a szolgáltatás igénybevételéhez. Jelenlegi egyenleg: {userBalance} Ft
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-quickfix-yellow text-quickfix-dark hover:bg-quickfix-yellow/90 animate-fade-in"
          disabled={isSubmitting || userBalance < payment[0]}
        >
          <Send className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Feldolgozás...' : 'Segítségkérés küldése'}
        </Button>
      </form>
    </div>
  );
};

export default ProfessionalHelp;
