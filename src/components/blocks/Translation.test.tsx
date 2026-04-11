import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, mock, test } from "bun:test";
import type { ReactNode } from "react";

import Translation from "@/components/blocks/Translation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { introductions } from "@/lib/language/convos/data/introductions";
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
                <ConvoProvider conversation={introductions} index={0}>
                    {children}
                </ConvoProvider>
            </TooltipProvider>
        </QueryClientProvider>,
    );
}

function TranslationHarness() {
    const convo = useConversation();

    return (
        <>
            <p data-testid="translation-default">
                <Translation utterance={introductions.utterances[3]!} />
            </p>
            <p data-testid="translation-fallback">
                <Translation
                    utterance={introductions.utterances[3]!}
                    overwriteFormat="hello $missing$!"
                />
            </p>
            <button
                type="button"
                onClick={() => {
                    setTokenVariant(
                        convo.convoTokenState,
                        "introductions.you",
                        "introductions.you.incorrect",
                    );
                }}
            >
                Switch translation variant
            </button>
        </>
    );
}

describe("Translation", () => {
    test("interpolates token values, variant translations, and fallback token ids", async () => {
        const view = renderWithProviders(<TranslationHarness />);

        expect(view.getByTestId("translation-default")).toHaveTextContent(
            "How are you, Allan?",
        );
        expect(view.getByTestId("translation-fallback")).toHaveTextContent(
            "Hello missing!",
        );

        fireEvent.click(
            view.getByRole("button", { name: "Switch translation variant" }),
        );

        await waitFor(() => {
            expect(view.getByTestId("translation-default")).toHaveTextContent(
                "How are yous, Allan?",
            );
        });
    });
});
