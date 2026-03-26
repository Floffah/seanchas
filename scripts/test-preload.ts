import * as matchers from "@testing-library/jest-dom/matchers";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "bun:test";

GlobalRegistrator.register();

expect.extend(matchers);

// Optional: cleans up `render` after each test
afterEach(() => {
    cleanup();
});
