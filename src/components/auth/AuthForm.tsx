
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
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
import { toast } from 'sonner';

// Define form validation schema
const signinSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface AuthFormProps {
  mode: 'signin' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const schema = mode === 'signin' ? signinSchema : signupSchema;
  
  // Initialize form
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...(mode === 'signup' ? { name: '' } : {}),
      email: '',
      password: '',
      ...(mode === 'signup' ? { confirmPassword: '' } : {}),
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      // Here we'll implement the actual API call to our server for authentication
      if (mode === 'signin') {
        // Sign in logic - will be replaced with actual API call
        toast.success('Successfully logged in!');
      } else {
        // Sign up logic - will be replaced with actual API call
        toast.success('Account created successfully!');
        // Navigate to onboarding for new users
        navigate('/onboarding');
        return;
      }
      
      // Navigate to homepage after successful authentication
      navigate('/');
    } catch (error) {
      toast.error(mode === 'signin' 
        ? 'Failed to log in. Please check your credentials.' 
        : 'Failed to create account. Please try again.'
      );
      console.error('Auth error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {mode === 'signup' && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {mode === 'signup' && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <Button 
          type="submit" 
          className="w-full bg-fitflex-purple hover:bg-fitflex-purple-dark transition-colors"
        >
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
