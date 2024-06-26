"use client"

import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import LoadingSpinner from '@/components/loading';
import { CircleCheckBig, TriangleAlert } from 'lucide-react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
    const router = useRouter();
    const [randomLogo, setRandomLogo] = useState(Math.random() < 0.5 ? '/logo.png' : '/logo2.png');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isFlipped, setIsFlipped] = useState(Math.random() < 0.5);
    const [success, setSuccess] = useState<string | null>(null);
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(null);
            }, 3000); 
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleGoogleLogin = async () => {
        setLoading(true);
        await signIn('google', { callbackUrl:'/',redirect: false });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleSign = async () => {
        setLoading(true);
        setError(null);

        const emailElement = document.getElementById('email') as HTMLInputElement;
        const passwordElement = document.getElementById('password') as HTMLInputElement;

        const email = emailElement ? emailElement.value : '';
        const password = passwordElement ? passwordElement.value : '';
        if (!email) {
            setError('Email cannot be empty');
            setLoading(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Invalid email format');
            console.error('Invalid email format');
            setLoading(false);
            return;
        }

        if (!password || password.trim().length === 0 ) {
            setError('Password cannot be empty');
            console.error('Password cannot be empty');
            setLoading(false);
            return;
        }

        try {
            const result = await signIn('credentials', {
                email,
                password,
                callbackUrl: '/', 
                redirect: false,
            });
            if (result && result.status === 200) {
                setSuccess('Account created succesfully!');
                setTimeout(() => {
                    router.replace('/');
                }, 1000);
            } else if (result && result.error) {
                setError(result.error);
            } else {
                setError('An unknown error occurred');
            }
        } catch (error : any) {
            console.log(error)
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };
    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    const generateStrongPassword = (length = 12) => {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
        let password = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }

        return password;
    };

    const handleStrongPasswordClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const newPassword = generateStrongPassword();
        setPassword(newPassword);
    };

    return (
        <div className="relative">
            {error && (
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
                    <TriangleAlert className="inline-block align-text-bottom" />
                    <span className="ml-2">{error}</span>
                </div>
            )}
            {success && (
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded" role="alert">
                    <CircleCheckBig className="inline-block align-text-bottom" />
                    <span className="ml-2">{success}</span>
                </div>
            )}
        <div className="flex flex-col justify-between items-center h-screen">
            {loading && <LoadingSpinner />} 
            <div className="pt-2">
                <img
                    src={randomLogo}
                    alt="Logo"
                    style={{ width: '180px', height: 'auto', transform: isFlipped ? 'scaleX(-1)' : 'none' }}
                    onClick={toggleFlip}
                />
            </div>
            <div>
                <div className="flex justify-center">
                    <Card className="mx-auto max-w-sm">
                        <CardHeader>
                            <CardTitle className="text-4xl flex justify-center">Sign Up</CardTitle>
                            <CardDescription>
                                MoviesHole Made with love By Swadhin : )
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <Link href="#" className="ml-auto inline-block text-sm underline" onClick={handleStrongPasswordClick}>
                                            Get a Strong password?
                                        </Link>
                                    </div>
                                    <div className="relative w-full">
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button className="absolute right-5 top-1/2 transform -translate-y-1/2" type="button" onClick={toggleShowPassword}>
                                            {showPassword ? <EyeOff /> : <Eye />}
                                        </button>
                                    </div>
                                </div>
                                <Button  className="w-full" onClick={handleSign}>
                                    Sign Up
                                </Button>
                                <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                                    Continue with Google
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm grid gap-2">
                                Already have an account?{" "}
                                <Link href="/login" className="underline">
                                    Login
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex justify-center pt-2 mb-8">
                <ThemeSwitcher />
            </div>
        </div>
        </div>
    );
}
