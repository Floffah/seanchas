import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, mock, test } from "bun:test";
import type { ReactNode } from "react";

import MessageTokenPart from "@/components/blocks/MessageTokenPart";
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

function MessageTokenPartHarness() {
    const convo = useConversation();
    const youToken = greeting.utterances[1]!.parts.find(
        (part): part is Extract<
            (typeof greeting.utterances)[1]["parts"][number],
            { kind: "token" }
        > => part.kind === "token" && part.id === "greeting.you",
    )!;
    const mathToken = greeting.utterances[0]!.parts.find(
        (part): part is Extract<
            (typeof greeting.utterances)[0]["parts"][number],
            { kind: "token" }
        > => part.kind === "token" && part.id === "greeting.math",
    )!;

    return (
        <>
            <MessageTokenPart part={youToken} step={-1} tipEvents={[]} />
            <MessageTokenPart
                part={mathToken}
                step={1}
                tipEvents={[
                    {
                        idx: 0,
                        tip: {
                            type: "show_tip",
                            tipId: "adjectives_after_words",
                            tokenId: "greeting.math",
                            side: "right",
                        },
                    },
                ]}
            />
            <button
                type="button"
                onClick={() => {
                    setTokenVariant(
                        convo.convoTokenState,
                        "greeting.you",
                        "greeting.you.informal",
                    );
                }}
            >
                Switch message token variant
            </button>
        </>
    );
}

describe("MessageTokenPart", () => {
    test("shows active token text and the matching tooltip content", async () => {
        const view = renderWithProviders(<MessageTokenPartHarness />);

        expect(view.getByText("thu")).toBeInTheDocument();
        expect(view.getAllByText("Look!").length).toBeGreaterThan(0);
        expect(
            view.getAllByText(
                "Adjectives always come after the thing they're describing in Gaelic.",
            ).length,
        ).toBeGreaterThan(0);

        fireEvent.click(
            view.getByRole("button", { name: "Switch message token variant" }),
        );

        await waitFor(() => {
            expect(view.getByText("sibh")).toBeInTheDocument();
        });
    });
});
