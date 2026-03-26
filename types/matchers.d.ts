import { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import { AsymmetricMatchers, Matchers } from "bun:test";

/* eslint-disable @typescript-eslint/no-empty-object-type */

declare module "bun:test" {
    interface Matchers<T> extends TestingLibraryMatchers<
        typeof expect.stringContaining,
        T
    > {}
    interface AsymmetricMatchers extends TestingLibraryMatchers {}
}
