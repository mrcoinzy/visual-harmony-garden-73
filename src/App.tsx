
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

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, updatedSession) => {
        console.log("Auth state changed:", event, updatedSession ? "session exists" : "no session");
        setSession(updatedSession);
        setUser(updatedSession?.user || null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    const checkSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Initial session check:", currentSession ? "session exists" : "no session");
        setSession(currentSession);
        setUser(currentSession?.user || null);
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Private route component
  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) {
      return <div className="min-h-screen bg-quickfix-dark flex justify-center items-center">Betöltés...</div>;
    }
    
    console.log("PrivateRoute check - User exists:", !!user);
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
