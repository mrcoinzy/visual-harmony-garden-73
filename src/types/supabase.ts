
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          email: string
          accepted_terms: boolean
          created_at: string
          language?: string
        }
        Insert: {
          id: string
          full_name: string
          email: string
          accepted_terms: boolean
          created_at?: string
          language?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          accepted_terms?: boolean
          created_at?: string
          language?: string
        }
      }
      finances: {
        Row: {
          id: string
          user_id: string
          balance: number
          month: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          balance: number
          month: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          balance?: number
          month?: string
          created_at?: string
        }
      }
      ai_conversations: {
        Row: {
          id: string
          user_id: string
          title: string
          preview: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          preview: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          preview?: string
          created_at?: string
        }
      }
      professional_tasks: {
        Row: {
          id: string
          user_id: string
          title: string
          professional_name: string
          professional_avatar: string
          status: 'Folyamatban' | 'Befejezve' | 'Ütemezve'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          professional_name: string
          professional_avatar: string
          status: 'Folyamatban' | 'Befejezve' | 'Ütemezve'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          professional_name?: string
          professional_avatar?: string
          status?: 'Folyamatban' | 'Befejezve' | 'Ütemezve'
          created_at?: string
        }
      }
      advertisements: {
        Row: {
          id: string
          title: string
          subtitle: string
          link: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          subtitle: string
          link: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string
          link?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          user_id: string
          sender_id: string
          receiver_id: string
          content: string
          is_group: boolean
          group_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          sender_id: string
          receiver_id: string
          content: string
          is_group: boolean
          group_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          is_group?: boolean
          group_id?: string | null
          created_at?: string
        }
      }
    }
  }
}
