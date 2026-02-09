import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isSignInPage = createRouteMatcher(["/", "/sign-up"]);
const isProtectedRoute = createRouteMatcher(["/home", "/sign-out"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
    const authenticated = await convexAuth.isAuthenticated();
    if (isSignInPage(request) && authenticated) {
        return nextjsMiddlewareRedirect(request, "/home");
    }
    if (isProtectedRoute(request) && !authenticated) {
        return nextjsMiddlewareRedirect(request, "/");
    }
});

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
