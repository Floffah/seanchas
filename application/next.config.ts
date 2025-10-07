import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        reactCompiler: true,
        ppr: true,
        viewTransition: true,
        useCache: true,
    },
    // typedRoutes: true,
};

export default nextConfig;
