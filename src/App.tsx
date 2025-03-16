
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
import { supabase } from "./lib/supabase";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Felhasználó autentikációs állapotának figyelése
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    // Jelenlegi munkamenet lekérdezése
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };
    
    checkUser();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Privát útvonal komponens
  const PrivateRoute = ({ children }) => {
    if (loading) return <div className="min-h-screen bg-quickfix-dark flex justify-center items-center">Betöltés...</div>;
    return user ? children : <Navigate to="/login" />;
  };

  // Vendég útvonal komponens (csak akkor érhető el, ha nincs bejelentkezve)
  const GuestRoute = ({ children }) => {
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
