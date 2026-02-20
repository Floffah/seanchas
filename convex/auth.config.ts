import { env } from "./convex.env";

const auth = {
    providers: [
        {
            domain: env.CONVEX_SITE_URL,
            applicationID: "convex",
        },
    ],
};

export default auth;
