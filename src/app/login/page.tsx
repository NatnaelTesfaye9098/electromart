'use client';

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import { signIn } from 'next-auth/react';
import {useRouter, useSearchParams} from 'next/navigation';
import { useState } from 'react';
import {FcGoogle} from 'react-icons/fc';
import Link from 'next/link';
import { sign } from 'crypto';

const formSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginPage(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const registered = searchParams.get('registered');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    async function onSubmit(values: LoginFormValues) {
        setIsLoading(true);
        setError(null);

        try{
            const result = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
                callbackUrl,
            });

            if(result?.error){
                setError(result.error);
            } else {
                router.push(callbackUrl);
            }
        }catch(err:unknown){
            if(err instanceof Error){
                setError(err.message);
            }else{
                setError('An unexpected error occured')
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function handleGoogleSignIn(){
        setIsLoading(true);
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
            setIsLoading(false);
        }
    }

    return(
        <div className="flex min-h-screen">
            <div className="flex-1 flex items-center justify-center p-8 md:p-12">
                <Card className='w-[380px]'>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Login to Electromart</CardTitle>
                        <CardDescription>Enter your credentials to access your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {registered && (
                            <p className="text-green-600 text-sm mb-4">
                                Registration successful! Please log in.
                            </p>
                        )}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                {error && <p className='text-red-500'>{error}</p>}
                                <FormField control={form.control} name='email' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" placeholder="Enter your email"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} placeholder="Enter your password" />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            <Button type="submit" className='w-full' disabled={isLoading}>
                                {isLoading ? 'Logging In...': 'Login'}
                            </Button>
                            </form>
                        </Form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t"/>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foregroun">Or continue with</span>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleGoogleSignIn} disabled={isLoading}>
                            <FcGoogle className="h-4 w-4" />
                            {isLoading ? 'Signing in with Google...':'Sign in with Google'}
                        </Button>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{' '}
                            <Link href="/login" className="underline">Login</Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-100 p-8">
                <h1>Image and Animation</h1>
            </div>
        </div>
    );
}