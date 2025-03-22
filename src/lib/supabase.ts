
import { supabase } from '@/integrations/supabase/client';

// Helper function for Supabase errors
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  
  // Return appropriate error message based on the error
  if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
    return 'Hálózati kapcsolat hiba. Kérjük, ellenőrizze az internetkapcsolatot.';
  }
  
  if (error?.message?.includes('Invalid login')) {
    return 'Érvénytelen bejelentkezési adatok.';
  }
  
  if (error?.message?.includes('Email not confirmed')) {
    return 'Az e-mail cím nincs megerősítve.';
  }
  
  if (error?.message?.includes('User already registered')) {
    return 'Ez az e-mail cím már regisztrálva van.';
  }
  
  return error.message || 'Ismeretlen hiba történt';
};

// Re-export the supabase client for backward compatibility
export { supabase };
