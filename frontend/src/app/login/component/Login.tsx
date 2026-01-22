"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginStore } from "@/store/loginStore";
import { useRouter } from 'next/navigation';

const Logo = () => (
    <a href="http://vha.vercel.app" target="_blank" className="flex items-center gap-2 group"><div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-primary to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300"><span className="text-white font-bold text-lg md:text-xl">V</span></div><span className="text-xl md:text-2xl font-bold tracking-tight text-foreground">vha.vercel.app<span className="text-primary">.</span></span></a>
);

export default function Login() {
    const router = useRouter();

    const { error, success, loading, login, resetForm } = useLoginStore();

    useEffect(() => {
        if (success) {
            router.push('/home');
        }
    }, [success, router]);

    const onSubmit = async (data: { email: string; password: string }) => {
        await login(data);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ email: string; password: string }>();

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-xl rounded-4xl py-10 pt-14">
                <CardContent className="">
                    <div className="w-full flex flex-col items-center space-y-8">
                        <Logo />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        {success && <p className="text-green-500 text-sm mt-1">{success}</p>}

                        <div className="space-y-2 text-center">
                            <h1 className="text-3xl font-semibold text-foreground">
                                Welcome back!
                            </h1>
                            <p className="text-muted-foreground text-sm">
                                First time here?{" "}
                                <a href="/register" className="text-foreground hover:underline">
                                    Sign up for free
                                </a>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mt-6 space-y-4">
                            <div>
                                <Label
                                    htmlFor="email-login-03"
                                    className="text-sm font-medium text-foreground dark:text-foreground"
                                >
                                    Email
                                </Label>
                                <Input
                                    type="email"
                                    id="email"
                                    autoComplete="email"
                                    placeholder="ephraim@blocks.so"
                                    className="mt-2"
                                    {...register("email", { required: "Email is required" })}
                                    aria-invalid={errors.email ? "true" : "false"}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <Label
                                    htmlFor="password-login-03"
                                    className="text-sm font-medium text-foreground dark:text-foreground"
                                >
                                    Password
                                </Label>
                                <Input
                                    type="password"
                                    id="password"
                                    autoComplete="password"
                                    placeholder="**************"
                                    className="mt-2"
                                    {...register("password", { required: "Password is required" })}
                                    aria-invalid={errors.password ? "true" : "false"}
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                            </div>
                            <Button disabled={loading} type="submit" className="mt-4 w-full py-2 font-medium">
                                {loading ? "Loading..." : "Login"}
                            </Button>
                        </form>
                        <div className="text-center text-sm">
                            No account?{" "}
                            <a href="/register" className="text-primary font-medium hover:underline">
                                Create an account
                            </a>
                        </div>

                        <p className="text-center text-xs w-11/12 text-muted-foreground">
                            You acknowledge that you read, and agree, to our{" "}
                            <a href="#" className="underline hover:text-foreground">
                                Terms of Service
                            </a>{" "}
                            and our{" "}
                            <a href="#" className="underline hover:text-foreground">
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}