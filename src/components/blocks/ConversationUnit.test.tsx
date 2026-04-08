import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "bun:test";

import ConversationUnit from "@/components/blocks/ConversationUnit";
import { TooltipProvider } from "@/components/ui/tooltip";
import { greeting } from "@/lib/language/convos/data/greeting";
import ConvoProvider, { useConversation } from "@/providers/ConvoProvider";

afterEach(() => {
    cleanup();
});

function UseConversationHarness() {
    const convo = useConversation();

    return (
        <div>
            <p data-testid="state-value">{String(convo.state.value)}</p>
            <button type="button" onClick={convo.next}>
                Next
            </button>
        </div>
    );
}

function ConversationUnitHarness() {
    const convo = useConversation();

    return (
        <>
            <button type="button" onClick={convo.next}>
                Advance unit
            </button>
            <ConversationUnit />
        </>
    );
}

describe("ConvoProvider", () => {
    test("initializes on the intro state", () => {
        const view = render(
            <ConvoProvider conversation={greeting} index={0}>
                <UseConversationHarness />
            </ConvoProvider>,
        );

        expect(view.getByTestId("state-value")).toHaveTextContent("intro");
    });

    test("advances to summaryQuiz with next()", () => {
        const view = render(
            <ConvoProvider conversation={greeting} index={0}>
                <UseConversationHarness />
            </ConvoProvider>,
        );

        fireEvent.click(view.getByRole("button", { name: "Next" }));

        expect(view.getByTestId("state-value")).toHaveTextContent(
            "summaryQuiz",
        );
    });

    test("advances through summaryQuiz into complete and ignores extra NEXT events afterwards", () => {
        const view = render(
            <ConvoProvider conversation={greeting} index={0}>
                <UseConversationHarness />
            </ConvoProvider>,
        );

        fireEvent.click(view.getByRole("button", { name: "Next" }));

        expect(view.getByTestId("state-value")).toHaveTextContent(
            "summaryQuiz",
        );

        fireEvent.click(view.getByRole("button", { name: "Next" }));

        expect(view.getByTestId("state-value")).toHaveTextContent(
            "translationQuiz",
        );

        fireEvent.click(view.getByRole("button", { name: "Next" }));

        expect(view.getByTestId("state-value")).toHaveTextContent(
            "responseQuiz",
        );

        fireEvent.click(view.getByRole("button", { name: "Next" }));

        expect(view.getByTestId("state-value")).toHaveTextContent(
            "substitutionQuiz",
        );

        fireEvent.click(view.getByRole("button", { name: "Next" }));

        expect(view.getByTestId("state-value")).toHaveTextContent("complete");

        fireEvent.click(view.getByRole("button", { name: "Next" }));

        expect(view.getByTestId("state-value")).toHaveTextContent("complete");
    });
});

describe("ConversationUnit", () => {
    test("renders intro, then summary quiz, then translation quiz, then response quiz, then substitution quiz as the unit advances", async () => {
        const view = render(
            <TooltipProvider>
                <ConvoProvider conversation={greeting} index={0}>
                    <ConversationUnitHarness />
                </ConvoProvider>
            </TooltipProvider>,
        );

        expect(
            view.queryByText("Which is the correct translation?"),
        ).not.toBeInTheDocument();
        expect(view.getByText("Press space to advance")).toBeInTheDocument();

        fireEvent.click(
            view.getByRole("button", {
                name: "Advance unit",
                hidden: true,
            }),
        );

        expect(
            await view.findByText("What was the conversation about?"),
        ).toBeInTheDocument();

        fireEvent.click(
            view.getByRole("button", {
                name: "Advance unit",
                hidden: true,
            }),
        );

        expect(
            await view.findByText("Which is the correct translation?"),
        ).toBeInTheDocument();

        fireEvent.click(
            view.getByRole("button", {
                name: "Advance unit",
                hidden: true,
            }),
        );

        expect(
            await view.findByText("Which response comes next?"),
        ).toBeInTheDocument();

        fireEvent.click(
            view.getByRole("button", {
                name: "Advance unit",
                hidden: true,
            }),
        );

        expect(
            await view.findByText("Which alternative also works here?"),
        ).toBeInTheDocument();
    });
});
