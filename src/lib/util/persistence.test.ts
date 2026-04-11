import { describe, expect, test } from "bun:test";
import { waitFor } from "@testing-library/react";

import { persistedProxy } from "@/lib/util/persistence";

describe("persistedProxy", () => {
    test("hydrates from localStorage when a saved value exists", () => {
        localStorage.setItem(
            "persisted-proxy-test",
            JSON.stringify({ count: 3 }),
        );

        const store = persistedProxy("persisted-proxy-test", { count: 0 });

        expect(store.count).toBe(3);
    });

    test("writes updates back to localStorage", async () => {
        const store = persistedProxy("persisted-proxy-write-test", {
            enabled: false,
        });

        store.enabled = true;

        await waitFor(() => {
            expect(
                localStorage.getItem("persisted-proxy-write-test"),
            ).toBe(JSON.stringify({ enabled: true }));
        });
    });
});
