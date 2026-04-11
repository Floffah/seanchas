import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, mock, test } from "bun:test";
import type { PropsWithChildren, ReactNode } from "react";
import { useEffect } from "react";

import ConversationIntro from "@/components/blocks/ConversationIntro";
import { greeting } from "@/lib/language/convos/data/greeting";
import { tipsStore } from "@/lib/state/features";
import ConvoProvider, { useConversation } from "@/providers/ConvoProvider";

const saveCompletionMock = mock(async () => "completion-id");

mock.module("@convex-dev/react-query", () => ({
    useConvexMutation: () => saveCompletionMock,
}));

mock.module("motion/react", () => ({
    motion: {
        div: ({
            children,
            ...props
        }: PropsWithChildren<Record<string, unknown>>) => (
            <div {...props}>{children}</div>
        ),
        create: <T,>(Component: T) => Component,
    },
}));

mock.module("@/components/blocks/ConversationMessage", () => ({
    default: function MockConversationMessage({
        event,
        onAnimationDone,
    }: {
        event: { utteranceId: string };
        onAnimationDone: () => void;
    }) {
        useEffect(() => {
            onAnimationDone();
        }, [onAnimationDone]);

        return <div data-testid={`message-${event.utteranceId}`} />;
    },
}));

function renderWithQueryClient(children: ReactNode) {
    const queryClient = new QueryClient();

    return render(
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>,
    );
}

function StateHarness() {
    const convo = useConversation();

    return <p data-testid="state-value">{String(convo.state.value)}</p>;
}

beforeEach(() => {
    localStorage.clear();
    tipsStore.firstIntroSeen = false;
});

describe.serial("ConversationIntro", () => {
    test.serial("shows the first-intro dialog and persists firstIntroSeen when it closes", async () => {
        const view = renderWithQueryClient(
            <ConvoProvider conversation={greeting} index={0}>
                <ConversationIntro />
            </ConvoProvider>,
        );

        expect(view.getByText("Your First Unit!")).toBeInTheDocument();

        fireEvent.click(view.getByRole("button", { name: "Okay!" }));

        await waitFor(() => {
            expect(tipsStore.firstIntroSeen).toBe(true);
        });
        await waitFor(() => {
            expect(localStorage.getItem("seanchas-tips")).toBe(
                JSON.stringify({ firstIntroSeen: true }),
            );
        });
    });

    test.serial("advances through the intro on space and shows the final CTA only when complete", async () => {
        tipsStore.firstIntroSeen = true;

        const view = renderWithQueryClient(
            <ConvoProvider conversation={greeting} index={0}>
                <StateHarness />
                <ConversationIntro />
            </ConvoProvider>,
        );

        expect(view.queryByText("Your First Unit!")).not.toBeInTheDocument();
        expect(view.getByTestId("message-greeting.u0")).toBeInTheDocument();
        expect(
            view.queryByTestId("message-greeting.u1"),
        ).not.toBeInTheDocument();
        expect(
            view.queryByRole("button", { name: "I've got it!" }),
        ).not.toBeInTheDocument();

        fireEvent.keyDown(window, { code: "Space" });
        expect(
            view.queryByTestId("message-greeting.u1"),
        ).not.toBeInTheDocument();

        fireEvent.keyDown(window, { code: "Space" });
        expect(view.getByTestId("message-greeting.u1")).toBeInTheDocument();

        fireEvent.keyDown(window, { code: "Space" });
        expect(view.getByTestId("message-greeting.u2")).toBeInTheDocument();

        fireEvent.keyDown(window, { code: "Space" });
        fireEvent.keyDown(window, { code: "Space" });

        expect(view.getByTestId("message-greeting.u3")).toBeInTheDocument();

        await waitFor(() => {
            expect(
                view.getByRole("button", { name: "I've got it!" }),
            ).toBeInTheDocument();
        });

        fireEvent.click(view.getByRole("button", { name: "I've got it!" }));

        expect(view.getByTestId("state-value")).toHaveTextContent(
            "summaryQuiz",
        );
    });
});
