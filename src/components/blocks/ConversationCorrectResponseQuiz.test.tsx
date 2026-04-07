import { fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "bun:test";

import ConversationCorrectResponseQuiz from "@/components/blocks/ConversationCorrectResponseQuiz";
import { TooltipProvider } from "@/components/ui/tooltip";
import { greeting } from "@/lib/language/convos/data/greeting";
import ConvoProvider, { useConversation } from "@/providers/ConvoProvider";

const originalRandom = Math.random;

beforeEach(() => {
    Math.random = () => 0;
});

afterEach(() => {
    Math.random = originalRandom;
});

function StateHarness() {
    const convo = useConversation();

    return (
        <>
            <p data-testid="state-value">{String(convo.state.value)}</p>
            <button
                type="button"
                onClick={() => {
                    convo.next();
                    convo.next();
                }}
            >
                Advance to response quiz
            </button>
        </>
    );
}

describe("ConversationCorrectResponseQuiz", () => {
    test("renders the Gaelic prompt, translation hint, and Gaelic responses", () => {
        const view = render(
            <TooltipProvider>
                <ConvoProvider conversation={greeting} index={0}>
                    <ConversationCorrectResponseQuiz />
                </ConvoProvider>
            </TooltipProvider>,
        );

        expect(
            view.getByText("Feasgar math. Ciamar a tha thu?"),
        ).toBeInTheDocument();
        expect(
            view.getByText("Good afternoon/evening. How are you?"),
        ).toBeInTheDocument();
        expect(
            view.getByRole("button", {
                name: "Tha mi gu math, tapadh leat. Ciamar a tha thu?",
            }),
        ).toBeInTheDocument();
        expect(
            view.queryByRole("button", {
                name: "I am good, thank you. How are you?",
            }),
        ).not.toBeInTheDocument();
    });

    test("supports answering questions and finishing the unit", async () => {
        const view = render(
            <TooltipProvider>
                <ConvoProvider conversation={greeting} index={0}>
                    <StateHarness />
                    <ConversationCorrectResponseQuiz />
                </ConvoProvider>
            </TooltipProvider>,
        );

        fireEvent.click(
            view.getByRole("button", { name: "Advance to response quiz" }),
        );

        expect(view.getByTestId("state-value")).toHaveTextContent(
            "responseQuiz",
        );

        fireEvent.click(
            view.getByRole("button", {
                name: "Tha mi gu math, tapadh leat. Ciamar a tha thu?",
            }),
        );
        fireEvent.click(view.getByRole("button", { name: "Check" }));
        expect(view.getByText("Correct.")).toBeInTheDocument();
        fireEvent.click(view.getByRole("button", { name: "Next" }));

        fireEvent.click(
            view.getByRole("button", {
                name: "Tha mi gu math cuideachd, tapadh leat.",
            }),
        );
        fireEvent.click(view.getByRole("button", { name: "Check" }));
        expect(view.getByText("Correct.")).toBeInTheDocument();
        fireEvent.click(view.getByRole("button", { name: "Next" }));

        fireEvent.click(
            view.getByRole("button", {
                name: "Feasgar math. Ciamar a tha thu?",
            }),
        );
        fireEvent.click(view.getByRole("button", { name: "Check" }));
        expect(view.getByText("Correct.")).toBeInTheDocument();
        fireEvent.click(view.getByRole("button", { name: "Finish" }));

        expect(view.getByText("Step Complete")).toBeInTheDocument();
        fireEvent.click(view.getByRole("button", { name: "Finish Unit" }));

        expect(view.getByTestId("state-value")).toHaveTextContent("complete");
        expect(await view.findByText("Step Complete")).toBeInTheDocument();
    });
});
