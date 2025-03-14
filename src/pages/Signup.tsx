
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail, User, Check } from 'lucide-react';

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
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/Card';
import { cn } from '@/lib/utils';

const signupSchema = z.object({
  name: z.string().min(2, {
    message: 'A név legalább 2 karakter hosszú kell legyen',
  }),
  email: z.string().email({
    message: 'Kérjük, érvényes e-mail címet adjon meg',
  }),
  password: z.string().min(6, {
    message: 'A jelszónak legalább 6 karakter hosszúnak kell lennie',
  }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Elfogadás szükséges a folytatáshoz',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "A jelszavak nem egyeznek",
  path: ["confirmPassword"],
});

type SignupValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: SignupValues) => {
    try {
      // Itt majd a tényleges regisztráció lesz
      console.log(data);
      
      toast.success('Sikeres regisztráció!');
      navigate('/login');
    } catch (error) {
      toast.error('Sikertelen regisztráció. Kérjük, próbálja újra.');
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
          <h1 className="text-2xl font-bold text-white mb-2">Regisztráció</h1>
          <p className="text-gray-400">Hozzon létre egy fiókot, hogy igénybe vehesse szolgáltatásainkat.</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Teljes név</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Kovács János"
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
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Jelszó megerősítése</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="******"
                        className="pl-10 bg-quickfix-dark-gray border-gray-700 focus:border-quickfix-yellow focus:ring-quickfix-yellow/20"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-quickfix-yellow data-[state=checked]:text-quickfix-dark border-gray-500"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-gray-300 text-sm">
                      Elfogadom a <Link to="/terms" className="text-quickfix-yellow hover:underline">felhasználási feltételeket</Link> és az <Link to="/privacy" className="text-quickfix-yellow hover:underline">adatvédelmi irányelveket</Link>.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-quickfix-yellow text-quickfix-dark hover:bg-quickfix-yellow/90"
            >
              Regisztráció
            </Button>
            
            <div className="text-center mt-6">
              <p className="text-gray-400">
                Már van fiókja?{' '}
                <Link to="/login" className="text-quickfix-yellow hover:underline">
                  Jelentkezzen be
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
