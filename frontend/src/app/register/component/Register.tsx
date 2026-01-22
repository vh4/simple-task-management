"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "react-hook-form";
import { useRegisterStore, RegisterDto } from "@/store/registerStore";

export default function Register() {
    const { loading, error, success, register: registerUser } = useRegisterStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterDto>();

    const onSubmit = async (data: RegisterDto) => {
        await registerUser(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-xl rounded-4xl py-10 pt-14">
                <CardContent className="">
                    <div className="w-full flex flex-col items-center space-y-8">

                        <div className="space-y-2 text-center">
                            <h1 className="text-3xl font-semibold text-foreground">
                                Register Account
                            </h1>
                        </div>

                        {error && (
                            <div className="w-full max-w-sm p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="w-full max-w-sm p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                                Registration successful! You can now login.
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mt-6 space-y-4">
                            <div>
                                <Label
                                    htmlFor="name"
                                    className="text-sm font-medium text-foreground dark:text-foreground"
                                >
                                    Name
                                </Label>
                                <Input
                                    type="text"
                                    id="name"
                                    autoComplete="name"
                                    placeholder="John Doe"
                                    className="mt-2"
                                    {...register("name", { required: "Name is required" })}
                                    aria-invalid={errors.name ? "true" : "false"}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                                <Label
                                    htmlFor="email"
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
                                    {...register("email", { required: "Email is required!" })}
                                    aria-invalid={errors.email ? "true" : "false"}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-medium text-foreground dark:text-foreground"
                                >
                                    Password
                                </Label>
                                <Input
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    placeholder="**************"
                                    className="mt-2"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password min 8 characters",
                                        },
                                        maxLength: {
                                            value: 12,
                                            message: "Password max 12 characters",
                                        },
                                    })}
                                    aria-invalid={errors.password ? "true" : "false"}
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                            </div>
                            <Button
                                type="submit"
                                className="mt-4 w-full py-2 font-medium"
                                disabled={loading}
                            >
                                {loading ? <Spinner /> : "Submit"}
                            </Button>
                        </form>
                        <div className="text-center text-sm">

                            <a href="/" className="text-primary font-medium hover:underline">
                                Login
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