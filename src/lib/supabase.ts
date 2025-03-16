
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://alrnuoswgmlxiqonjkvx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFscm51b3N3Z21seGlxb25qa3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NTIzODcsImV4cCI6MjA1NzUyODM4N30.PLVLtSiWCvm0RfKEHQ7lYxvXGigroK80OM76f7VTp6c'

// Ellenőrizzük, hogy a Supabase URL és anonim kulcs be vannak-e állítva
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('A Supabase környezeti változók nincsenek megfelelően beállítva');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Segédfunkció a Supabase hibák kezelésére
export const handleSupabaseError = (error: any) => {
  console.error('Supabase hiba:', error);
  return error.message || 'Ismeretlen hiba történt';
};
