
import React, { useState } from 'react';
import { processCheckout } from '@/lib/supabase';
import Button from '@/components/Button';
import { toast } from 'sonner';

interface CheckoutButtonProps {
  amount: number;
  description: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

const CheckoutButton = ({
  amount,
  description,
  onSuccess,
  onError,
  className,
  children = 'Fizetés',
  variant = 'primary'
}: CheckoutButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const result = await processCheckout(amount, description);
      
      if (result.success) {
        if (onSuccess) {
          onSuccess();
        }
      } else {
        if (onError) {
          onError(result.error);
        }
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error('Hiba történt a fizetés során!');
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      className={className}
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? 'Feldolgozás...' : children}
    </Button>
  );
};

export default CheckoutButton;
