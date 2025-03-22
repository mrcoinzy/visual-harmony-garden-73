
import { createClient } from '@supabase/supabase-js'

// Update the URL to ensure it's the correct one from the error logs
const supabaseUrl = 'https://alrnuoswgmlxiqonjkvx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFscm51b3N3Z21seGlxb25qa3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NTIzODcsImV4cCI6MjA1NzUyODM4N30.PLVLtSiWCvm0RfKEHQ7lYxvXGigroK80OM76f7VTp6c'

// Check if Supabase URL and anon key are set
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create the Supabase client with fetch configuration to help with CORS issues
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    fetch: (...args) => {
      return fetch(...args);
    },
    headers: {
      'X-Client-Info': 'supabase-js/2.49.1',
    }
  }
});

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
  
  return error.message || 'Ismeretlen hiba történt';
};
