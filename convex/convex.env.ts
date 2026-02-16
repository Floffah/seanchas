import { createEnv } from "convex-env";
import { environment } from "convex-env/presets";
import { v } from "convex/values";

export const env = createEnv({
    ...environment,

    // convex auth
    SITE_URL: v.string(),
    JWT_PRIVATE_KEY: v.string(),
    JWKS: v.string(),
});
