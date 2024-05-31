"use client"

import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Link from "next/link";
import { useState } from 'react'; // Move useState import to after the "use client" directive
import { Button } from "@/components/ui/button";
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

export default function SignUp() {
    const [randomLogo, setRandomLogo] = useState(Math.random() < 0.5 ? '/logo.png' : '/logo2.png');
    const [isFlipped, setIsFlipped] = useState(Math.random() < 0.5);
    const [showPassword, setShowPassword] = useState(false);
    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="flex flex-col justify-between items-center h-screen">
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
                                    </div>
                                    <div className="relative w-full">
                                        <Input id="password" type={showPassword ? 'text' : 'password'} required placeholder="Password" />
                                        <button className="absolute right-5 top-1/2 transform -translate-y-1/2" type="button" onClick={toggleShowPassword}>
                                            {showPassword ? <EyeOff /> : <Eye />}
                                        </button>
                                    </div>
                                </div>
                                <Button type="submit" className="w-full">
                                    Sign Up
                                </Button>
                                <Button variant="outline" className="w-full">
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
    );
}
