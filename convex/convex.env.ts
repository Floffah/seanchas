import { createEnv } from "convex-env";
import { clerk, environment } from "convex-env/presets";

export const env = createEnv({
    ...environment,
    ...clerk,
});
