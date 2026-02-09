import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        viewTransition: true,
    },
    reactCompiler: true,
    // cacheComponents: true,
    typedRoutes: true,
};

export default nextConfig;
