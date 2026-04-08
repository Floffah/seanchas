import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "bun:test";

import ConversationSubstitutionQuiz from "@/components/blocks/ConversationSubstitutionQuiz";
import { TooltipProvider } from "@/components/ui/tooltip";
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

describe("ConversationSubstitutionQuiz", () => {
    test("renders the original prompt and full Gaelic substitution options", () => {
        const view = render(
            <TooltipProvider>
                <ConvoProvider conversation={greeting} index={0}>
                    <ConversationSubstitutionQuiz />
                </ConvoProvider>
            </TooltipProvider>,
        );

        expect(
            view.getByText("Tha mi gu math, tapadh leat. Ciamar a tha thu?"),
        ).toBeInTheDocument();
        expect(
            view.getByRole("button", {
                name: "Tha mi gu math, tapadh leibh. Ciamar a tha sibh?",
            }),
        ).toBeInTheDocument();
        expect(
            view.getByRole("button", {
                name: "Tha mi gu math, tapadh leat. Ciamar a tha sibh?",
            }),
        ).toBeInTheDocument();
        expect(
            view.getByRole("button", {
                name: "Tha mi gu math, tapadh leibh. Ciamar a tha thu?",
            }),
        ).toBeInTheDocument();
    });

    test("supports answering the question and advancing the unit to complete", () => {
        const view = render(
            <TooltipProvider>
                <ConvoProvider conversation={greeting} index={0}>
                    <StateHarness />
                    <ConversationSubstitutionQuiz />
                </ConvoProvider>
            </TooltipProvider>,
        );

        fireEvent.click(view.getByRole("button", { name: "Next state" }));
        fireEvent.click(view.getByRole("button", { name: "Next state" }));
        fireEvent.click(view.getByRole("button", { name: "Next state" }));
        fireEvent.click(view.getByRole("button", { name: "Next state" }));

        expect(view.getByTestId("state-value")).toHaveTextContent(
            "substitutionQuiz",
        );

        fireEvent.click(
            view.getByRole("button", {
                name: "Tha mi gu math, tapadh leibh. Ciamar a tha sibh?",
            }),
        );
        fireEvent.click(view.getByRole("button", { name: "Check" }));

        expect(view.getByText("Correct.")).toBeInTheDocument();

        fireEvent.click(view.getByRole("button", { name: "Finish" }));

        expect(view.getByText("Step Complete")).toBeInTheDocument();

        fireEvent.click(view.getByRole("button", { name: "Finish Unit" }));

        expect(view.getByTestId("state-value")).toHaveTextContent("complete");
    });
});
