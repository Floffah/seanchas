"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ViewTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
});

export default function Page() {
    const router = useRouter();

    const { signIn } = useAuthActions();

    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = form.handleSubmit(async (data) => {
        try {
            await signIn("password", {
                ...data,
                flow: "signUp",
            });
        } catch (error) {
            form.setError("root", {
                message:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
            });
            return;
        }

        router.push("/home");
    });

    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 to-background p-2">
            <ViewTransition>
                <Card asChild className="w-full max-w-sm">
                    <motion.form layout layoutId="auth" onSubmit={onSubmit}>
                        <CardHeader>
                            <CardTitle>Create a new account</CardTitle>
                            <CardDescription>
                                Enter an email and password to create your
                                account.
                            </CardDescription>
                            <CardAction>
                                <Button variant="link" asChild>
                                    <Link href="/public">Log in</Link>
                                </Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-6">
                            <Form {...form}>
                                <FormField
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="me@example.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Your password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Confirm Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Confirm your password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full">
                                Sign Up
                            </Button>
                        </CardFooter>
                    </motion.form>
                </Card>
            </ViewTransition>
        </main>
    );
}
