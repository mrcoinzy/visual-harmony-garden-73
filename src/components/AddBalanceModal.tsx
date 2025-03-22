
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface AddBalanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBalanceAdded: (newBalance: number) => void;
}

const AddBalanceModal = ({ open, onOpenChange, onBalanceAdded }: AddBalanceModalProps) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddBalance = async () => {
    // Validate input
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Kérjük, adjon meg egy érvényes összeget!');
      return;
    }

    setLoading(true);
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Nincs bejelentkezett felhasználó!');
        return;
      }

      // Get current balance
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('balance')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        toast.error('Nem sikerült lekérni a jelenlegi egyenleget!');
        return;
      }

      // Update balance
      const newBalance = (profile.balance || 0) + numAmount;
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ balance: newBalance })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error updating balance:', updateError);
        toast.error('Nem sikerült frissíteni az egyenleget!');
        return;
      }

      // Success
      toast.success(`Sikeresen hozzáadva ${numAmount} Ft az egyenleghez!`);
      onBalanceAdded(newBalance);
      onOpenChange(false);
      setAmount('');
    } catch (error) {
      console.error('Add balance error:', error);
      toast.error('Hiba történt az egyenleg feltöltése során!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-quickfix-dark text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>Egyenleg feltöltése</DialogTitle>
          <DialogDescription className="text-gray-400">
            Adja meg az összeget, amennyivel növelni szeretné egyenlegét.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Összeg (Ft)
            </label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Pl.: 5000"
              className="bg-quickfix-dark-gray border-gray-700"
              min="0"
              step="100"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-gray-700 text-white hover:bg-quickfix-dark-gray"
          >
            Mégsem
          </Button>
          <Button 
            onClick={handleAddBalance}
            disabled={loading}
            className="bg-quickfix-yellow text-quickfix-dark hover:bg-quickfix-yellow/90"
          >
            {loading ? 'Feldolgozás...' : 'Feltöltés'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBalanceModal;
