
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Helper function for Supabase errors
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  
  // Return appropriate error message based on the error
  if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
    return 'Hálózati kapcsolat hiba. Kérjük, ellenőrizze az internetkapcsolatot.';
  }
  
  if (error?.message?.includes('Invalid login') || error?.message?.includes('Invalid email or password')) {
    return 'Érvénytelen e-mail cím vagy jelszó.';
  }
  
  if (error?.message?.includes('Email not confirmed')) {
    return 'Az e-mail cím nincs megerősítve. Kérjük, ellenőrizze postaládáját.';
  }
  
  if (error?.message?.includes('User already registered')) {
    return 'Ez az e-mail cím már regisztrálva van.';
  }
  
  if (error?.code === 'PGRST116') {
    return 'A kért adat nem található.';
  }
  
  return error.message || 'Ismeretlen hiba történt';
};

// Checkout function to handle payment processing
export const processCheckout = async (amount: number, description: string) => {
  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('Error getting user:', userError);
      toast.error('A felhasználó adatainak lekérése sikertelen!');
      return { success: false, error: userError };
    }
    
    if (!user) {
      toast.error('A fizetéshez be kell jelentkezni!');
      return { success: false, error: 'User not authenticated' };
    }
    
    // Check if the user has a profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
      
    if (profileError) {
      console.error('Error fetching profile:', profileError);
      
      // If there's no profile, create one
      if (profileError.code === 'PGRST116') {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{ id: user.id, balance: 0 }]);
          
        if (insertError) {
          console.error('Error creating profile:', insertError);
          toast.error('Nem sikerült létrehozni a profilt!');
          return { success: false, error: insertError };
        }
        
        toast.error('Nincs elegendő egyenleg a fizetéshez!');
        return { success: false, error: 'Insufficient balance' };
      }
      
      toast.error('Nem sikerült ellenőrizni a profilt!');
      return { success: false, error: profileError };
    }
    
    // Check if user has enough balance
    if (!profile || profile.balance < amount) {
      toast.error('Nincs elegendő egyenleg a fizetéshez!');
      return { success: false, error: 'Insufficient balance' };
    }
    
    // Update the user's balance
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ balance: profile.balance - amount })
      .eq('id', user.id);
      
    if (updateError) {
      console.error('Error updating balance:', updateError);
      toast.error('Nem sikerült frissíteni az egyenleget!');
      return { success: false, error: updateError };
    }
    
    // Create a transaction record if needed (optional)
    // This would go in a transactions table if you have one
    
    toast.success('Sikeres fizetés!');
    return { success: true };
  } catch (error) {
    console.error('Checkout error:', error);
    toast.error('Hiba történt a fizetés során!');
    return { success: false, error };
  }
};

// Re-export the supabase client for backward compatibility
export { supabase };
