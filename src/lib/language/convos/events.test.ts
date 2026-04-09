import { describe, expect, test } from "bun:test";

import { greeting } from "@/lib/language/convos/data/greeting";
import { conversationToEvents } from "@/lib/language/convos/events";
import { Conversation, ConversationSpeaker } from "@/lib/language/convos/types";

describe("conversationToEvents", () => {
    test("emits a show_utterance event for every utterance in order", () => {
        const events = conversationToEvents(greeting);

        expect(
            events
                .filter((event) => event.type === "show_utterance")
                .map((event) => event.utteranceId),
        ).toEqual(["greeting.u0", "greeting.u1", "greeting.u2", "greeting.u3"]);
    });

    test("includes only always tips and places them after their utterance event", () => {
        const conversation: Conversation = {
            id: "tips-demo",
            name: "Tips Demo",
            utterances: [
                {
                    id: "tips-demo.u0",
                    speaker: ConversationSpeaker.A,
                    translationFormat: "Hello",
                    parts: [
                        {
                            kind: "token",
                            id: "tips-demo.token",
                            base: "Hal",
                            tips: [
                                {
                                    tipId: "adjectives_after_words",
                                    side: "left",
                                    when: { type: "always" },
                                },
                                {
                                    tipId: "gu_math",
                                    when: {
                                        type: "on_variant",
                                        variantId: "tips-demo.variant",
                                    },
                                },
                                {
                                    tipId: "gu_math",
                                    when: {
                                        type: "on_transform",
                                        transform: "lenition",
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        expect(conversationToEvents(conversation)).toEqual([
            {
                type: "show_utterance",
                utteranceId: "tips-demo.u0",
            },
            {
                type: "show_tip",
                tipId: "adjectives_after_words",
                tokenId: "tips-demo.token",
                side: "left",
            },
        ]);
    });

    test.serial("matches the greeting event sequence", () => {
        expect(conversationToEvents(greeting)).toMatchSnapshot();
    });
});
