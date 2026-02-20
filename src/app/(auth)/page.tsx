"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import Link from "next/link";
import { ViewTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/ui/button-loading";
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
});

export default function Home() {
    const { signIn } = useAuthActions();

    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = form.handleSubmit(async (data) => {
        await signIn("password", {
            ...data,
            flow: "signIn",
        });
    });

    return (
        <main className="flex min-h-screen items-center justify-center bg-linear-to-b from-slate-950 to-background p-2">
            <ViewTransition>
                <Card asChild className="w-full max-w-sm">
                    <motion.form layout layoutId="auth" onSubmit={onSubmit}>
                        <CardHeader>
                            <CardTitle>Login to your account</CardTitle>
                            <CardDescription>
                                Enter your email and password to access your
                                account.
                            </CardDescription>
                            <CardAction>
                                <Button variant="link" asChild>
                                    <Link href="/sign-up">Sign Up</Link>
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
                            </Form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <LoadingButton
                                type="submit"
                                className="w-full"
                                isLoading={form.formState.isSubmitting}
                            >
                                Log in
                            </LoadingButton>
                            {/*<Button variant="link" asChild>*/}
                            {/*    <Link href="/reset">Forgot password?</Link>*/}
                            {/*</Button>*/}
                        </CardFooter>
                    </motion.form>
                </Card>
            </ViewTransition>
        </main>
    );
}
