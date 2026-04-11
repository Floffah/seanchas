import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, mock, test } from "bun:test";
import type { ReactNode } from "react";

import SourcePhrase from "@/components/blocks/SourcePhrase";
import { TooltipProvider } from "@/components/ui/tooltip";
import { greeting } from "@/lib/language/convos/data/greeting";
import ConvoProvider, { useConversation } from "@/providers/ConvoProvider";

const saveCompletionMock = mock(async () => "completion-id");

mock.module("@convex-dev/react-query", () => ({
    useConvexMutation: () => saveCompletionMock,
}));

function setTokenVariant(
    tokenState: {
        tokenValues: Record<string, { currentVariant: string }>;
    },
    tokenId: string,
    variantId: string,
) {
    tokenState.tokenValues[tokenId]!.currentVariant = variantId;
}

function renderWithProviders(children: ReactNode) {
    const queryClient = new QueryClient();

    return render(
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <ConvoProvider conversation={greeting} index={0}>
                    {children}
                </ConvoProvider>
            </TooltipProvider>
        </QueryClientProvider>,
    );
}

function SourcePhraseHarness() {
    const convo = useConversation();

    return (
        <>
            <p data-testid="source-phrase">
                <SourcePhrase utterance={greeting.utterances[1]!} />
            </p>
            <button
                type="button"
                onClick={() => {
                    setTokenVariant(
                        convo.convoTokenState,
                        "greeting.daySegment",
                        "greeting.daySegment.madainn",
                    );
                    setTokenVariant(
                        convo.convoTokenState,
                        "greeting.you",
                        "greeting.you.informal",
                    );
                }}
            >
                Switch source variants
            </button>
        </>
    );
}

describe("SourcePhrase", () => {
    test("reflects active token variants and token refs", async () => {
        const view = renderWithProviders(<SourcePhraseHarness />);

        expect(view.getByTestId("source-phrase")).toHaveTextContent(
            "Feasgar math. Ciamar a tha thu?",
        );

        fireEvent.click(
            view.getByRole("button", { name: "Switch source variants" }),
        );

        await waitFor(() => {
            expect(view.getByTestId("source-phrase")).toHaveTextContent(
                "Madainn math. Ciamar a tha sibh?",
            );
        });
    });
});
