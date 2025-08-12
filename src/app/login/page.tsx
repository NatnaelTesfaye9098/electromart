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
import { Eye, EyeOff, Mail } from 'lucide-react';

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

    const [googleIsLoading, setGoogleIsLoading] = useState(false);
    const [credIsLoading, setCredIsLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    async function onSubmit(values: LoginFormValues) {
        setCredIsLoading(true);
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
            setCredIsLoading(false);
        }
    }

    async function handleGoogleSignIn(){
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
    }

    return(
        <div className="flex min-h-screen">
            <div className="flex-1 flex items-center justify-center p-8 md:p-12">
                <div className="absolute top-0 my-5 lg:left-0 lg:m-8">Ayelu</div>
                <Card className='w-[380px] lg:border-none lg:shadow-none'>
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold">Login to Electromart</CardTitle>
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
                                        <FormLabel className='px-2.5'>Email</FormLabel>
                                        <FormControl>
                                            <div className="relative flex items-center">
                                                <Input {...field} type="email" placeholder="Enter your email" className="pr-10"/>
                                                <Mail className="absolute right-3 h-4 w-4 text-gray-400"/>
                                            </div>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel className='px-2.5'>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input type={showPassword ? 'text' : 'password'} {...field} placeholder="Enter your password" />
                                                <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword((prev) => !prev)} disabled={credIsLoading || googleIsLoading}>
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4 opacity-40" aria-hidden="true"/>
                                                    ) : (
                                                        <Eye className="h-4 w-4 opacity-40" aria-hidden="true"/>
                                                    )}
                                                    <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            <Button type="submit" className='w-full' disabled={credIsLoading || googleIsLoading}>
                                {credIsLoading ? 'Logging In...': 'Login'}
                            </Button>
                            </form>
                        </Form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t"/>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        <Button variant="outline" className="cursor-pointer border-gray-300 w-full hover:bg-gray-100 flex items-center justify-center gap-2" onClick={handleGoogleSignIn} disabled={credIsLoading || googleIsLoading}>
                            <FcGoogle className="h-4 w-4" />
                            {googleIsLoading ? 'Signing in with Google...':'Sign in with Google'}
                        </Button>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" className="underline">Register</Link>
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