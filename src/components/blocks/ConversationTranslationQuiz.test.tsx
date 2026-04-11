import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import type { ReactNode } from "react";

import ConversationTranslationQuiz from "@/components/blocks/ConversationTranslationQuiz";
import { greeting } from "@/lib/language/convos/data/greeting";
import ConvoProvider, { useConversation } from "@/providers/ConvoProvider";

const saveCompletionMock = mock(async () => "completion-id");
const originalRandom = Math.random;

mock.module("@convex-dev/react-query", () => ({
    useConvexMutation: () => saveCompletionMock,
}));

beforeEach(() => {
    Math.random = () => 0;
});

afterEach(() => {
    Math.random = originalRandom;
});

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

    return (
        <>
            <p data-testid="state-value">{String(convo.state.value)}</p>
            <button type="button" onClick={convo.next}>
                Next state
            </button>
        </>
    );
}

describe("ConversationTranslationQuiz", () => {
    test("renders the current phrase, blocks check until selection, and shows feedback after checking", () => {
        const view = renderWithQueryClient(
            <ConvoProvider conversation={greeting} index={0}>
                <StateHarness />
                <ConversationTranslationQuiz />
            </ConvoProvider>,
        );

        fireEvent.click(view.getByRole("button", { name: "Next state" }));
        fireEvent.click(view.getByRole("button", { name: "Next state" }));

        const checkButton = view.getByRole("button", { name: "Check" });

        expect(view.getByTestId("state-value")).toHaveTextContent(
            "translationQuiz",
        );
        expect(view.getByText("Feasgar math!")).toBeInTheDocument();
        expect(checkButton).toBeDisabled();

        fireEvent.click(
            view.getByRole("button", {
                name: "Hello!",
            }),
        );

        expect(checkButton).not.toBeDisabled();

        fireEvent.click(checkButton);

        const feedback = view.container.querySelector(
            '[data-slot="generic-quiz-feedback"]',
        );

        expect(feedback?.textContent).toContain(
            "Not quite. The correct translation is:",
        );
        expect(
            view.getByText("Good afternoon/evening!"),
        ).toBeInTheDocument();
    });

    test("completes the quiz and advances to the response quiz", () => {
        const view = renderWithQueryClient(
            <ConvoProvider conversation={greeting} index={0}>
                <StateHarness />
                <ConversationTranslationQuiz />
            </ConvoProvider>,
        );

        fireEvent.click(view.getByRole("button", { name: "Next state" }));
        fireEvent.click(view.getByRole("button", { name: "Next state" }));

        fireEvent.click(
            view.getByRole("button", {
                name: "Good afternoon/evening!",
            }),
        );
        fireEvent.click(view.getByRole("button", { name: "Check" }));
        fireEvent.click(view.getByRole("button", { name: "Next" }));

        fireEvent.click(
            view.getByRole("button", {
                name: "Good afternoon/evening. How are you?",
            }),
        );
        fireEvent.click(view.getByRole("button", { name: "Check" }));
        fireEvent.click(view.getByRole("button", { name: "Next" }));

        fireEvent.click(
            view.getByRole("button", {
                name: "I am good, thank you. How are you?",
            }),
        );
        fireEvent.click(view.getByRole("button", { name: "Check" }));
        fireEvent.click(view.getByRole("button", { name: "Finish" }));

        expect(view.getByText("Step Complete")).toBeInTheDocument();

        fireEvent.click(view.getByRole("button", { name: "Next Step" }));

        expect(view.getByTestId("state-value")).toHaveTextContent(
            "responseQuiz",
        );
    });
});
