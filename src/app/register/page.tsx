'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff, Mail, User } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 6 characters.'),
});

type RegisterFormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [credIsLoading, setCredIsLoading] = useState(false);
  const [googleIsLoading, setGoogleIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setCredIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        router.push('/login?registered=true');
      } else {
        setError('Registration failed');
      }
    } catch (err: unknown) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setCredIsLoading(false);
    }
  };

  async function handleGoogleRegister(){
    setGoogleIsLoading(true);
    setError(null);

    try{
        await signIn('google', {callbackUrl});
    } catch (err:unknown){
            if(err instanceof Error){
                setError(err.message);
            }else{
                setError('An unexpected error occured')
            }
        } finally {
            setGoogleIsLoading(false);
        }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center p-8 md:p-12">
        <Card className="w-[380px]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
            <CardDescription>Enter your details below to register</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {error && <p className="text-red-500">{error}</p>}                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <>
                          <Input {...field} placeholder="Enter your name" />
                          <User className='absolute right-3 h-4 w-4 text-gray-400'/>
                        </>
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative flex items-center">
                          <Input {...field} type="email" placeholder="Enter your email" className="pr-10" />
                          <Mail className="absolute right-3 h-4 w-4 text-gray-400" />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <>
                          <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            {...field}
                            placeholder="Enter a secure password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword((prev) => !prev)}
                            disabled={credIsLoading || googleIsLoading}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 opacity-40" aria-hidden="true" />
                            ) : (
                              <Eye className="h-4 w-4 opacity-40" aria-hidden="true" />
                            )}
                            <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                          </Button>
                          </div>
                          <Input type="password" {...field} placeholder="Enter a secure password" />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={credIsLoading || googleIsLoading}>
                  {credIsLoading ? 'Registering...' : 'Register'}
                </Button>
              </form>
            </Form>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"/>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleGoogleRegister} disabled={credIsLoading || googleIsLoading}>
                <FcGoogle className="h-4 w-4"/>
                Continue with Google
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}