'use client';

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';

const formSchema = z.object({
    email: z.email({message: 'Invalid email address'}),
    password: z.string().min(1, {message: 'Password is required'}),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const registered = searchParams.get('registered');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
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

             if (result?.error) {
                setError(result.error);
            } else {
                router.push(callbackUrl);
            }
        } catch (err:unknown){
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        }finally{
            setIsLoading(false);
        }
    }

    async function handleGoogleSignIn() {
        setIsLoading(true);
        setError(null);

        try{
            await signIn('google', { callbackUrl: callbackUrl });
        }catch (err:unknown){
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        }finally{
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-[380px]">
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
                            {error && <p className="text-red-500">{error}</p>}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" placeholder="Enter your email" />
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
                                            <Input type="password" {...field} placeholder="Enter your password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">{isLoading ? 'Logging In...' : 'Login with Email'}</Button>
                        </form>
                    </Form>
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-cente">
                            <span className="w-full border-t"/>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleGoogleSignIn} disabled={isLoading}>
                        <FcGoogle className="h-4 w-4"/>
                        {isLoading ? 'Signing in with Google...' : 'Sign in with Google'}
                    </Button>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="underline">Register</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}