import { describe, expect, test } from "bun:test";
import { waitFor } from "@testing-library/react";

import { tipsStore } from "@/lib/state/features";

describe("tipsStore", () => {
    test("persists firstIntroSeen changes to localStorage", async () => {
        tipsStore.firstIntroSeen = false;

        await waitFor(() => {
            expect(localStorage.getItem("seanchas-tips")).toBe(
                JSON.stringify({ firstIntroSeen: false }),
            );
        });

        tipsStore.firstIntroSeen = true;

        await waitFor(() => {
            expect(localStorage.getItem("seanchas-tips")).toBe(
                JSON.stringify({ firstIntroSeen: true }),
            );
        });
    });
});
