import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "bun:test";

import ConversationSummaryQuiz from "@/components/blocks/ConversationSummaryQuiz";
import { greeting } from "@/lib/language/convos/data/greeting";
import ConvoProvider, { useConversation } from "@/providers/ConvoProvider";

const originalRandom = Math.random;

beforeEach(() => {
    Math.random = () => 0;
});

afterEach(() => {
    Math.random = originalRandom;
    cleanup();
});

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

describe("ConversationSummaryQuiz", () => {
    test("renders the authored English prompt and answer options", () => {
        const view = render(
            <ConvoProvider conversation={greeting} index={0}>
                <ConversationSummaryQuiz />
            </ConvoProvider>,
        );

        expect(
            view.getByText("What was the conversation about?"),
        ).toBeInTheDocument();
        expect(
            view.getByRole("button", {
                name: "Greeting someone and asking how they are.",
            }),
        ).toBeInTheDocument();
        expect(
            view.getByRole("button", { name: "Buying food at a market." }),
        ).toBeInTheDocument();
        expect(
            view.getByRole("button", {
                name: "Talking about the weather forecast.",
            }),
        ).toBeInTheDocument();
    });

    test("supports answering questions and advancing to the translation quiz", () => {
        const view = render(
            <ConvoProvider conversation={greeting} index={0}>
                <StateHarness />
                <ConversationSummaryQuiz />
            </ConvoProvider>,
        );

        fireEvent.click(view.getByRole("button", { name: "Next state" }));

        expect(view.getByTestId("state-value")).toHaveTextContent(
            "summaryQuiz",
        );

        fireEvent.click(
            view.getByRole("button", {
                name: "Greeting someone and asking how they are.",
            }),
        );
        fireEvent.click(view.getByRole("button", { name: "Check" }));
        expect(view.getByText("Correct.")).toBeInTheDocument();
        fireEvent.click(view.getByRole("button", { name: "Finish" }));

        expect(view.getByText("Step Complete")).toBeInTheDocument();
        fireEvent.click(view.getByRole("button", { name: "Finish Unit" }));

        expect(view.getByTestId("state-value")).toHaveTextContent(
            "translationQuiz",
        );
    });
});
