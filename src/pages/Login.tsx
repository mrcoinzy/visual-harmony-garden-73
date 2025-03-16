
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Card from '@/components/Card';
import { supabase } from '@/lib/supabase';

const loginSchema = z.object({
  email: z.string().email({
    message: 'Kérjük, érvényes e-mail címet adjon meg',
  }),
  password: z.string().min(6, {
    message: 'A jelszónak legalább 6 karakter hosszúnak kell lennie',
  }),
});

type LoginValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginValues) => {
    try {
      setIsLoading(true);
      
      // Sign in with Supabase Auth
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw error;
      }

      toast.success('Sikeres bejelentkezés!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Sikertelen bejelentkezés. Kérjük, ellenőrizze adatait.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-quickfix-dark flex flex-col justify-center items-center p-4">
      <Link to="/" className="flex items-center gap-2 mb-8">
        <span className="text-quickfix-yellow font-bold text-3xl">
          Quick<span className="text-white">Fix</span>
        </span>
      </Link>
      
      <Card variant="glass" className="w-full max-w-md p-6 md:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Bejelentkezés</h1>
          <p className="text-gray-400">Üdvözöljük újra! Jelentkezzen be fiókjába.</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">E-mail cím</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="pelda@email.com"
                        className="pl-10 bg-quickfix-dark-gray border-gray-700 focus:border-quickfix-yellow focus:ring-quickfix-yellow/20"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Jelszó</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="******"
                        className="pl-10 bg-quickfix-dark-gray border-gray-700 focus:border-quickfix-yellow focus:ring-quickfix-yellow/20"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-quickfix-yellow hover:underline">
                Elfelejtett jelszó?
              </Link>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-quickfix-yellow text-quickfix-dark hover:bg-quickfix-yellow/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="h-4 w-4 border-2 border-quickfix-dark border-r-transparent rounded-full animate-spin mr-2"></span>
                  Bejelentkezés...
                </span>
              ) : (
                "Bejelentkezés"
              )}
            </Button>
            
            <div className="text-center mt-6">
              <p className="text-gray-400">
                Még nincs fiókja?{' '}
                <Link to="/signup" className="text-quickfix-yellow hover:underline">
                  Regisztráljon most
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
