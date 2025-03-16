
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Ellenőrizzük, hogy a környezeti változók be vannak-e állítva
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('A Supabase környezeti változók nincsenek megfelelően beállítva')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Adatbázis létrehozás segítő funkció
export const createUserProfile = async (userId: string, name: string, email: string, acceptedTerms: boolean) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        { 
          id: userId,
          name: name,
          email: email,
          accepted_terms: acceptedTerms,
          balance: 0,
          unread_messages: 0,
          ai_conversations: 0,
          specialist_tasks: 0,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Hiba történt a felhasználói profil létrehozásakor:', error)
    return { data: null, error }
  }
}
