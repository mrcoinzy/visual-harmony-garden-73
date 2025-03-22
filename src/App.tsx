
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from './pages/Dashboard';
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check user session on mount
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error("Session check error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Private route component
  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) return <div className="min-h-screen bg-quickfix-dark flex justify-center items-center">Betöltés...</div>;
    return user ? children : <Navigate to="/login" />;
  };

  // Guest route component (only accessible when not logged in)
  const GuestRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) return <div className="min-h-screen bg-quickfix-dark flex justify-center items-center">Betöltés...</div>;
    return !user ? children : <Navigate to="/dashboard" />;
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
