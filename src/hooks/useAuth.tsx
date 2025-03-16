
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateLanguage: (language: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const initSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Session error:', error);
      } else {
        setSession(data.session);
        setUser(data.session?.user ?? null);
        
        if (data.session?.user) {
          // Get profile data
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.session.user.id)
            .single();
            
          if (profileError) {
            console.error('Profile error:', profileError);
          } else {
            setProfile(profileData);
          }
        }
      }
      setLoading(false);
    };

    initSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (event === 'SIGNED_IN' && currentSession?.user) {
        // Get profile on new sign in
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentSession.user.id)
          .single();
          
        if (profileError) {
          console.error('Profile error:', profileError);
        } else {
          setProfile(profileData);
        }
      }
      
      if (event === 'SIGNED_OUT') {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Sikeres kijelentkezés');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Sikertelen kijelentkezés');
    }
  };
  
  const updateLanguage = async (language: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ language })
        .eq('id', user.id);
        
      if (error) throw error;
      
      setProfile(prev => ({...prev, language}));
      toast.success('Nyelv sikeresen frissítve');
    } catch (error) {
      console.error('Language update error:', error);
      toast.error('Sikertelen nyelv frissítés');
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, signOut, updateLanguage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
