import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import type { Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { PropsWithChildren } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";

import "./globals.css";

const geistSans = Geist({
    variable: "--font-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Seanchas",
    description: "Scottish Gàidhlig language learning app",
};

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "antialiased",
                    geistSans.variable,
                    geistMono.variable,
                )}
            >
                <ClerkProvider appearance={{ theme: shadcn }}>
                    <ConvexClientProvider>
                        <TooltipProvider>
                            <NextThemesProvider
                                attribute="class"
                                defaultTheme="system"
                                enableSystem={true}
                                disableTransitionOnChange
                            >
                                {children}
                            </NextThemesProvider>
                        </TooltipProvider>
                    </ConvexClientProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
