
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';

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
import { Card } from '@/components/Card';

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'Kérjük, érvényes e-mail címet adjon meg',
  }),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    try {
      // Itt majd a tényleges jelszó visszaállítási logika lesz
      console.log(data);
      
      toast.success('Jelszó visszaállítási link elküldve az e-mail címére!');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      toast.error('Hiba történt. Kérjük, próbálja újra.');
      console.error(error);
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
          <h1 className="text-2xl font-bold text-white mb-2">Elfelejtette jelszavát?</h1>
          <p className="text-gray-400">Adja meg e-mail címét, és küldünk egy linket a jelszó visszaállításához.</p>
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
            
            <Button 
              type="submit" 
              className="w-full bg-quickfix-yellow text-quickfix-dark hover:bg-quickfix-yellow/90"
            >
              Jelszó visszaállítása
            </Button>
            
            <div className="text-center mt-6">
              <p className="text-gray-400">
                <Link to="/login" className="text-quickfix-yellow hover:underline">
                  Vissza a bejelentkezéshez
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
