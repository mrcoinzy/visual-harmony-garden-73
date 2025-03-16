
import { createClient } from '@supabase/supabase-js'

// Define our database structure for better type safety
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string
          email: string
          password_hash: string // Stored encrypted by Supabase Auth
          accepted_terms: boolean
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          password_hash?: string // Managed by Supabase Auth
          accepted_terms: boolean
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          password_hash?: string
          accepted_terms?: boolean
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          total_balance: number
          unread_messages: number
          ai_conversations_count: number
          specialist_tasks_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_balance?: number
          unread_messages?: number
          ai_conversations_count?: number
          specialist_tasks_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_balance?: number
          unread_messages?: number
          ai_conversations_count?: number
          specialist_tasks_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      financial_records: {
        Row: {
          id: string
          user_id: string
          amount: number
          transaction_type: string
          description: string
          date: string
          month: number
          year: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          transaction_type: string
          description: string
          date?: string
          month?: number
          year?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          transaction_type?: string
          description?: string
          date?: string
          month?: number
          year?: number
          created_at?: string
        }
      }
      ai_conversations: {
        Row: {
          id: string
          user_id: string
          title: string
          preview: string
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          preview: string
          date?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          preview?: string
          date?: string
          created_at?: string
        }
      }
      ai_messages: {
        Row: {
          id: string
          conversation_id: string
          user_id: string
          content: string
          is_from_ai: boolean
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          user_id: string
          content: string
          is_from_ai: boolean
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          user_id?: string
          content?: string
          is_from_ai?: boolean
          created_at?: string
        }
      }
      specialist_tasks: {
        Row: {
          id: string
          user_id: string
          title: string
          specialist_id: string
          status: 'Folyamatban' | 'Befejezve' | 'Ütemezve'
          date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          specialist_id: string
          status: 'Folyamatban' | 'Befejezve' | 'Ütemezve'
          date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          specialist_id?: string
          status?: 'Folyamatban' | 'Befejezve' | 'Ütemezve'
          date?: string
          created_at?: string
          updated_at?: string
        }
      }
      specialists: {
        Row: {
          id: string
          name: string
          avatar_url: string
          profession: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          avatar_url?: string
          profession: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          avatar_url?: string
          profession?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string | null
          group_id: string | null
          content: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id?: string | null
          group_id?: string | null
          content: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string | null
          group_id?: string | null
          content?: string
          is_read?: boolean
          created_at?: string
        }
      }
      message_groups: {
        Row: {
          id: string
          name: string
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_by?: string
          created_at?: string
        }
      }
      group_members: {
        Row: {
          id: string
          group_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          group_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          user_id?: string
          created_at?: string
        }
      }
      advertisements: {
        Row: {
          id: string
          title: string
          subtitle: string
          content: string
          redirect_url: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          subtitle: string
          content: string
          redirect_url: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string
          content?: string
          redirect_url?: string
          is_active?: boolean
          created_at?: string
        }
      }
    }
    Functions: {}
    Enums: {}
  }
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create typed supabase client
export const supabase = createClient<Database>(
  supabaseUrl, 
  supabaseAnonKey, 
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    // Adding security headers for all requests
    global: {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
      },
    },
  }
)

/**
 * SQL that should be executed in Supabase SQL Editor to create tables and relationships:
 * 
 * -- Enable UUID extension
 * CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
 * 
 * -- Users table (Auth handled by Supabase Auth)
 * CREATE TABLE public.users (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   full_name TEXT NOT NULL,
 *   email TEXT UNIQUE NOT NULL,
 *   password_hash TEXT NOT NULL,
 *   accepted_terms BOOLEAN NOT NULL DEFAULT FALSE,
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
 * );
 * 
 * -- User profiles
 * CREATE TABLE public.profiles (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
 *   total_balance NUMERIC NOT NULL DEFAULT 0,
 *   unread_messages INTEGER NOT NULL DEFAULT 0,
 *   ai_conversations_count INTEGER NOT NULL DEFAULT 0,
 *   specialist_tasks_count INTEGER NOT NULL DEFAULT 0,
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *   UNIQUE(user_id)
 * );
 * 
 * -- Financial records for chart data
 * CREATE TABLE public.financial_records (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
 *   amount NUMERIC NOT NULL,
 *   transaction_type TEXT NOT NULL,
 *   description TEXT NOT NULL,
 *   date DATE NOT NULL DEFAULT CURRENT_DATE,
 *   month INTEGER NOT NULL GENERATED ALWAYS AS (EXTRACT(MONTH FROM date)) STORED,
 *   year INTEGER NOT NULL GENERATED ALWAYS AS (EXTRACT(YEAR FROM date)) STORED,
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
 * );
 * 
 * -- AI conversations
 * CREATE TABLE public.ai_conversations (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
 *   title TEXT NOT NULL,
 *   preview TEXT NOT NULL,
 *   date DATE NOT NULL DEFAULT CURRENT_DATE,
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
 * );
 * 
 * -- AI conversation messages
 * CREATE TABLE public.ai_messages (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   conversation_id UUID NOT NULL REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
 *   user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
 *   content TEXT NOT NULL,
 *   is_from_ai BOOLEAN NOT NULL DEFAULT FALSE,
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
 * );
 * 
 * -- Specialists
 * CREATE TABLE public.specialists (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   name TEXT NOT NULL,
 *   avatar_url TEXT,
 *   profession TEXT NOT NULL,
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
 * );
 * 
 * -- Specialist tasks
 * CREATE TABLE public.specialist_tasks (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
 *   title TEXT NOT NULL,
 *   specialist_id UUID NOT NULL REFERENCES public.specialists(id) ON DELETE CASCADE,
 *   status TEXT NOT NULL CHECK (status IN ('Folyamatban', 'Befejezve', 'Ütemezve')),
 *   date DATE NOT NULL DEFAULT CURRENT_DATE,
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
 * );
 * 
 * -- Message groups
 * CREATE TABLE public.message_groups (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   name TEXT NOT NULL,
 *   created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
 * );
 * 
 * -- Group members
 * CREATE TABLE public.group_members (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   group_id UUID NOT NULL REFERENCES public.message_groups(id) ON DELETE CASCADE,
 *   user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *   UNIQUE(group_id, user_id)
 * );
 * 
 * -- Messages (private and group)
 * CREATE TABLE public.messages (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
 *   receiver_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
 *   group_id UUID REFERENCES public.message_groups(id) ON DELETE CASCADE,
 *   content TEXT NOT NULL,
 *   is_read BOOLEAN NOT NULL DEFAULT FALSE,
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *   CHECK ((receiver_id IS NULL AND group_id IS NOT NULL) OR (receiver_id IS NOT NULL AND group_id IS NULL))
 * );
 * 
 * -- Advertisements
 * CREATE TABLE public.advertisements (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   title TEXT NOT NULL,
 *   subtitle TEXT NOT NULL,
 *   content TEXT NOT NULL,
 *   redirect_url TEXT NOT NULL,
 *   is_active BOOLEAN NOT NULL DEFAULT TRUE,
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
 * );
 * 
 * -- Create Row Level Security (RLS) policies
 * 
 * -- Enable RLS on all tables
 * ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.financial_records ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.specialists ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.specialist_tasks ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.message_groups ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;
 * 
 * -- Users policies
 * CREATE POLICY "Users can view their own data" ON public.users 
 *   FOR SELECT USING (auth.uid() = id);
 * CREATE POLICY "Users can update their own data" ON public.users 
 *   FOR UPDATE USING (auth.uid() = id);
 * 
 * -- Profiles policies
 * CREATE POLICY "Profiles are viewable by owners" ON public.profiles 
 *   FOR SELECT USING (auth.uid() = user_id);
 * CREATE POLICY "Profiles are updatable by owners" ON public.profiles 
 *   FOR UPDATE USING (auth.uid() = user_id);
 * 
 * -- Financial records policies
 * CREATE POLICY "Financial records are viewable by owners" ON public.financial_records 
 *   FOR SELECT USING (auth.uid() = user_id);
 * 
 * -- AI conversations policies
 * CREATE POLICY "AI conversations are viewable by owners" ON public.ai_conversations 
 *   FOR SELECT USING (auth.uid() = user_id);
 * CREATE POLICY "AI conversations are insertable by owners" ON public.ai_conversations 
 *   FOR INSERT WITH CHECK (auth.uid() = user_id);
 * 
 * -- AI messages policies
 * CREATE POLICY "AI messages are viewable by conversation owners" ON public.ai_messages 
 *   FOR SELECT USING (
 *     auth.uid() IN (
 *       SELECT user_id FROM public.ai_conversations 
 *       WHERE id = ai_messages.conversation_id
 *     )
 *   );
 * CREATE POLICY "AI messages are insertable by conversation owners" ON public.ai_messages 
 *   FOR INSERT WITH CHECK (
 *     auth.uid() IN (
 *       SELECT user_id FROM public.ai_conversations 
 *       WHERE id = ai_messages.conversation_id
 *     )
 *   );
 * 
 * -- Specialists are viewable by everyone
 * CREATE POLICY "Specialists are viewable by all authenticated users" ON public.specialists 
 *   FOR SELECT USING (auth.role() = 'authenticated');
 * 
 * -- Specialist tasks policies
 * CREATE POLICY "Specialist tasks are viewable by task owners" ON public.specialist_tasks 
 *   FOR SELECT USING (auth.uid() = user_id);
 * CREATE POLICY "Specialist tasks are also viewable by assigned specialists" ON public.specialist_tasks 
 *   FOR SELECT USING (
 *     auth.uid() IN (
 *       SELECT id FROM public.specialists 
 *       WHERE id = specialist_tasks.specialist_id
 *     )
 *   );
 * 
 * -- Messages policies
 * CREATE POLICY "Users can view messages they sent or received" ON public.messages 
 *   FOR SELECT USING (
 *     auth.uid() = sender_id OR 
 *     auth.uid() = receiver_id OR
 *     auth.uid() IN (
 *       SELECT user_id FROM public.group_members 
 *       WHERE group_id = messages.group_id
 *     )
 *   );
 * CREATE POLICY "Users can send messages" ON public.messages 
 *   FOR INSERT WITH CHECK (auth.uid() = sender_id);
 * 
 * -- Message groups policies
 * CREATE POLICY "Users can view groups they are part of" ON public.message_groups 
 *   FOR SELECT USING (
 *     auth.uid() IN (
 *       SELECT user_id FROM public.group_members 
 *       WHERE group_id = message_groups.id
 *     ) OR auth.uid() = created_by
 *   );
 * 
 * -- Group members policies
 * CREATE POLICY "Users can see group members of groups they belong to" ON public.group_members 
 *   FOR SELECT USING (
 *     auth.uid() IN (
 *       SELECT user_id FROM public.group_members AS gm
 *       WHERE gm.group_id = group_members.group_id
 *     )
 *   );
 * 
 * -- Advertisements are viewable by all authenticated users
 * CREATE POLICY "Advertisements are viewable by all authenticated users" ON public.advertisements 
 *   FOR SELECT USING (auth.role() = 'authenticated' AND is_active = TRUE);
 * 
 * -- Create functions to update related tables
 * 
 * -- Function to update unread message count
 * CREATE OR REPLACE FUNCTION update_unread_message_count() 
 * RETURNS TRIGGER AS $$
 * BEGIN
 *   UPDATE public.profiles
 *   SET unread_messages = (
 *     SELECT COUNT(*) FROM public.messages
 *     WHERE receiver_id = NEW.receiver_id AND is_read = FALSE
 *   )
 *   WHERE user_id = NEW.receiver_id;
 *   RETURN NEW;
 * END;
 * $$ LANGUAGE plpgsql;
 * 
 * -- Trigger for updating unread message count
 * CREATE TRIGGER update_profile_unread_messages
 * AFTER INSERT OR UPDATE ON public.messages
 * FOR EACH ROW
 * WHEN (NEW.receiver_id IS NOT NULL)
 * EXECUTE PROCEDURE update_unread_message_count();
 * 
 * -- Function to update AI conversation count
 * CREATE OR REPLACE FUNCTION update_ai_conversation_count() 
 * RETURNS TRIGGER AS $$
 * BEGIN
 *   UPDATE public.profiles
 *   SET ai_conversations_count = (
 *     SELECT COUNT(*) FROM public.ai_conversations
 *     WHERE user_id = NEW.user_id
 *   )
 *   WHERE user_id = NEW.user_id;
 *   RETURN NEW;
 * END;
 * $$ LANGUAGE plpgsql;
 * 
 * -- Trigger for updating AI conversation count
 * CREATE TRIGGER update_profile_ai_conversations
 * AFTER INSERT OR DELETE ON public.ai_conversations
 * FOR EACH ROW
 * EXECUTE PROCEDURE update_ai_conversation_count();
 * 
 * -- Function to update specialist task count
 * CREATE OR REPLACE FUNCTION update_specialist_task_count() 
 * RETURNS TRIGGER AS $$
 * BEGIN
 *   UPDATE public.profiles
 *   SET specialist_tasks_count = (
 *     SELECT COUNT(*) FROM public.specialist_tasks
 *     WHERE user_id = NEW.user_id
 *   )
 *   WHERE user_id = NEW.user_id;
 *   RETURN NEW;
 * END;
 * $$ LANGUAGE plpgsql;
 * 
 * -- Trigger for updating specialist task count
 * CREATE TRIGGER update_profile_specialist_tasks
 * AFTER INSERT OR DELETE ON public.specialist_tasks
 * FOR EACH ROW
 * EXECUTE PROCEDURE update_specialist_task_count();
 */

/**
 * Helper functions for common database operations
 */

// Get user profile with all stats
export const getUserProfile = async (userId: string) => {
  return await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
};

// Get financial data for charts
export const getFinancialData = async (userId: string, year: number) => {
  return await supabase
    .from('financial_records')
    .select('*')
    .eq('user_id', userId)
    .eq('year', year)
    .order('month', { ascending: true });
};

// Get recent AI conversations
export const getRecentAIConversations = async (userId: string, limit = 5) => {
  return await supabase
    .from('ai_conversations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
};

// Get specialist tasks
export const getSpecialistTasks = async (userId: string, limit = 5) => {
  return await supabase
    .from('specialist_tasks')
    .select(`
      *,
      specialists:specialist_id (name, avatar_url)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
};

// Get active advertisements
export const getActiveAdvertisements = async (limit = 1) => {
  return await supabase
    .from('advertisements')
    .select('*')
    .eq('is_active', true)
    .limit(limit);
};

// Get user messages
export const getUserMessages = async (userId: string, limit = 20) => {
  return await supabase
    .from('messages')
    .select(`
      *,
      sender:sender_id (id, full_name),
      receiver:receiver_id (id, full_name)
    `)
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .is('group_id', null)
    .order('created_at', { ascending: false })
    .limit(limit);
};

// Mark message as read
export const markMessageAsRead = async (messageId: string) => {
  return await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('id', messageId);
};
