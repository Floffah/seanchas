import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, render, waitFor } from "@testing-library/react";
import { describe, expect, mock, test } from "bun:test";
import type { ReactNode } from "react";

import ConversationMessage from "@/components/blocks/ConversationMessage";
import { TooltipProvider } from "@/components/ui/tooltip";
import { conversationToEvents } from "@/lib/language/convos";
import { greeting } from "@/lib/language/convos/data/greeting";
import ConvoProvider from "@/providers/ConvoProvider";

const saveCompletionMock = mock(async () => "completion-id");

mock.module("@convex-dev/react-query", () => ({
    useConvexMutation: () => saveCompletionMock,
}));

function renderWithProviders(children: ReactNode) {
    const queryClient = new QueryClient();

    return act(() =>
        render(
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <ConvoProvider conversation={greeting} index={0}>
                        {children}
                    </ConvoProvider>
                </TooltipProvider>
            </QueryClientProvider>,
        ),
    );
}

describe("ConversationMessage", () => {
    test("renders the speaker-side bubble, translation, and only the bounded tip events", async () => {
        const events = conversationToEvents(greeting);
        const u0Event = events.find(
            (
                event,
            ): event is Extract<
                (typeof events)[number],
                { type: "show_utterance" }
            > =>
                event.type === "show_utterance" &&
                event.utteranceId === "greeting.u0",
        )!;
        const u1Event = events.find(
            (
                event,
            ): event is Extract<
                (typeof events)[number],
                { type: "show_utterance" }
            > =>
                event.type === "show_utterance" &&
                event.utteranceId === "greeting.u1",
        )!;

        const initialView = await renderWithProviders(
            <ConversationMessage
                eventIndex={0}
                currentStep={1}
                event={u0Event}
                events={events}
                onAnimationDone={() => {}}
            />,
        );
        const introBubble = initialView.container.querySelector(".self-start");

        expect(introBubble?.textContent).toContain("Feasgar math!");
        expect(
            initialView.getByText("Good afternoon/evening!"),
        ).toBeInTheDocument();
        expect(initialView.getAllByText("Look!").length).toBeGreaterThan(0);
        expect(initialView.queryByText("Gu-ing")).not.toBeInTheDocument();
        expect(introBubble?.className).toContain("self-start");

        const replyView = await renderWithProviders(
            <ConversationMessage
                eventIndex={2}
                currentStep={2}
                event={u1Event}
                events={events}
                onAnimationDone={() => {}}
            />,
        );
        const replyBubble = replyView.container.querySelector(".self-end");

        expect(replyBubble?.textContent).toContain(
            "Feasgar math. Ciamar a tha thu?",
        );
        expect(
            replyView.getByText("Good afternoon/evening. How are you?"),
        ).toBeInTheDocument();
        expect(replyBubble?.className).toContain("self-end");
    });
});
