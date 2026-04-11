import { describe, expect, test } from "bun:test";

import { conversations } from "@/lib/language/convos";
import { createConvoTokenStore } from "@/lib/state/convos";

describe("createConvoTokenStore", () => {
    test("initializes every authored token to its own id", () => {
        for (const conversation of conversations) {
            const store = createConvoTokenStore(conversation);
            const tokenParts = conversation.utterances.flatMap((utterance) =>
                utterance.parts.filter(
                    (
                        part,
                    ): part is Extract<
                        (typeof utterance.parts)[number],
                        { kind: "token" }
                    > => part.kind === "token",
                ),
            );

            for (const token of tokenParts) {
                expect(store.tokenValues[token.id]?.currentVariant).toBe(
                    token.id,
                );
            }
        }
    });
});
