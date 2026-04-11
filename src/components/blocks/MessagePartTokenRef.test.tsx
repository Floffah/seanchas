import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, mock, test } from "bun:test";
import type { ReactNode } from "react";

import MessagePartTokenRef from "@/components/blocks/MessagePartTokenRef";
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

function MessagePartTokenRefHarness() {
    const convo = useConversation();

    return (
        <>
            <MessagePartTokenRef part={{ kind: "token_ref", ref: "greeting.you" }} />
            <MessagePartTokenRef part={{ kind: "token_ref", ref: "missing.token" }} />
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
                Switch token ref variant
            </button>
        </>
    );
}

describe("MessagePartTokenRef", () => {
    test("renders resolved token content and falls back when unresolved", async () => {
        const view = renderWithProviders(<MessagePartTokenRefHarness />);

        expect(view.getByText("thu")).toBeInTheDocument();
        expect(view.getByText("missing.token")).toHaveClass(
            "text-destructive",
        );

        fireEvent.click(
            view.getByRole("button", { name: "Switch token ref variant" }),
        );

        await waitFor(() => {
            expect(view.getByText("sibh")).toBeInTheDocument();
        });
    });
});
