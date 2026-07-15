import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(
    async (auth, request) => {
        const isAuthRoute = ["/", "/sign-up"].includes(
            request.nextUrl.pathname,
        );
        const { isAuthenticated } = await auth();

        if (isAuthRoute && isAuthenticated) {
            return NextResponse.redirect(new URL("/home", request.url));
        }

        if (!isAuthRoute) await auth.protect();
    },
    { frontendApiProxy: { enabled: true } },
);

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
        "/__clerk/(.*)",
    ],
};
