
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from './pages/Dashboard';
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { toast } from "sonner";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    console.log("App component mounted, setting up auth state...");
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, updatedSession) => {
        console.log("Auth state changed:", event, updatedSession ? "session exists" : "no session");
        
        if (updatedSession) {
          try {
            // Check if profile exists for this user
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', updatedSession.user.id)
              .maybeSingle();
            
            if (profileError) {
              console.error("Profile check error:", profileError);
              // Non-critical error, continue with auth
            }
            
            // If no profile exists, create one
            if (!profile) {
              console.log("No profile found, creating one for user:", updatedSession.user.id);
              const { error: insertError } = await supabase
                .from('profiles')
                .insert([{ 
                  id: updatedSession.user.id, 
                  balance: 0,
                  full_name: updatedSession.user.user_metadata?.full_name || ''
                }]);
                
              if (insertError) {
                console.error("Error creating profile:", insertError);
                // This is a critical error that might prevent proper authentication
                setAuthError("Failed to create user profile");
                // Don't update session in case of critical errors
                return;
              }
            }
          } catch (error) {
            console.error("Profile creation error:", error);
            setAuthError("Error during authentication");
            return;
          }
        }
        
        setSession(updatedSession);
        setUser(updatedSession?.user || null);
        setLoading(false);
        setAuthError(null);
      }
    );

    // THEN check for existing session
    const checkSession = async () => {
      try {
        console.log("Checking initial session...");
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session check error:", error);
          setAuthError("Failed to retrieve session");
          setLoading(false);
          return;
        }
        
        console.log("Initial session check:", currentSession ? "session exists" : "no session");
        
        if (currentSession?.user) {
          // Check if profile exists for this user
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentSession.user.id)
            .maybeSingle();
          
          if (profileError && profileError.code !== 'PGRST116') {
            console.error("Profile check error:", profileError);
            setAuthError("Failed to check profile");
          }
          
          // If no profile exists, create one
          if (!profile) {
            console.log("No profile found during initial check, creating one");
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([{ 
                id: currentSession.user.id, 
                balance: 0,
                full_name: currentSession.user.user_metadata?.full_name || ''
              }]);
              
            if (insertError) {
              console.error("Error creating profile:", insertError);
              setAuthError("Failed to create user profile");
              // Clear session if we can't create a profile
              await supabase.auth.signOut();
              setSession(null);
              setUser(null);
              setLoading(false);
              return;
            }
          }
        }
        
        setSession(currentSession);
        setUser(currentSession?.user || null);
      } catch (error) {
        console.error("Session check error:", error);
        setAuthError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
    
    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, []);

  // Show auth errors
  useEffect(() => {
    if (authError) {
      toast.error(authError);
    }
  }, [authError]);

  // Private route component
  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) {
      return <div className="min-h-screen bg-quickfix-dark flex justify-center items-center">Betöltés...</div>;
    }
    
    console.log("PrivateRoute check - User exists:", !!user, "Auth error:", authError);
    
    if (authError) {
      return <Navigate to="/login" replace state={{ error: authError }} />;
    }
    
    return user ? children : <Navigate to="/login" replace />;
  };

  // Guest route component (only accessible when not logged in)
  const GuestRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) {
      return <div className="min-h-screen bg-quickfix-dark flex justify-center items-center">Betöltés...</div>;
    }
    
    console.log("GuestRoute check - User exists:", !!user);
    return !user ? children : <Navigate to="/dashboard" replace />;
  };

  if (loading) {
    return <div className="min-h-screen bg-quickfix-dark flex justify-center items-center">Betöltés...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/login" 
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <GuestRoute>
                  <Signup />
                </GuestRoute>
              } 
            />
            <Route 
              path="/forgot-password" 
              element={
                <GuestRoute>
                  <ForgotPassword />
                </GuestRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
