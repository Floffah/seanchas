import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, mock, test } from "bun:test";

import ConversationUnit from "@/components/blocks/ConversationUnit";
import { TooltipProvider } from "@/components/ui/tooltip";
import { greeting } from "@/lib/language/convos/data/greeting";
import { ConvoUnitStepId } from "@/lib/state/units";
import ConvoProvider, { useConversation } from "@/providers/ConvoProvider";

const saveCompletionMock = mock(async () => "completion-id");

mock.module("@convex-dev/react-query", () => ({
    useConvexMutation: () => saveCompletionMock,
}));

beforeEach(() => {
    saveCompletionMock.mockImplementation(async () => "completion-id");
});

function renderWithQueryClient(children: React.ReactNode) {
    const queryClient = new QueryClient();

    return render(
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>,
    );
}

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

function CompletionHarness() {
    const convo = useConversation();

    return (
        <>
            <p data-testid="state-value">{String(convo.state.value)}</p>
            <p data-testid="completion-error">
                {convo.saveCompletionError?.toString() ?? ""}
            </p>
            <button type="button" onClick={convo.next}>
                Next
            </button>
            <button
                type="button"
                onClick={() =>
                    convo.recordStepCompletion(
                        ConvoUnitStepId.SummaryQuiz,
                        1,
                        1,
                    )
                }
            >
                Record summary
            </button>
            <button
                type="button"
                onClick={() =>
                    convo.recordStepCompletion(
                        ConvoUnitStepId.TranslationQuiz,
                        2,
                        3,
                    )
                }
            >
                Record translation
            </button>
            <button
                type="button"
                onClick={() =>
                    convo.recordStepCompletion(
                        ConvoUnitStepId.ResponseQuiz,
                        3,
                        3,
                    )
                }
            >
                Record response
            </button>
            <button
                type="button"
                onClick={() =>
                    convo.recordStepCompletion(
                        ConvoUnitStepId.SubstitutionQuiz,
                        1,
                        2,
                    )
                }
            >
                Record substitution
            </button>
            <button type="button" onClick={() => void convo.finishUnit()}>
                Finish unit
            </button>
        </>
    );
}

describe.serial("ConvoProvider", () => {
    test.serial("initializes on the intro state", () => {
        const view = renderWithQueryClient(
            <ConvoProvider conversation={greeting} index={0}>
                <UseConversationHarness />
            </ConvoProvider>,
        );

        expect(view.getByTestId("state-value")).toHaveTextContent("intro");
    });

    test.serial("advances to summaryQuiz with next()", () => {
        const view = renderWithQueryClient(
            <ConvoProvider conversation={greeting} index={0}>
                <UseConversationHarness />
            </ConvoProvider>,
        );

        fireEvent.click(view.getByRole("button", { name: "Next" }));

        expect(view.getByTestId("state-value")).toHaveTextContent(
            "summaryQuiz",
        );
    });

    test.serial(
        "advances through summaryQuiz into complete and ignores extra NEXT events afterwards",
        () => {
            const view = renderWithQueryClient(
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

            expect(view.getByTestId("state-value")).toHaveTextContent(
                "complete",
            );

            fireEvent.click(view.getByRole("button", { name: "Next" }));

            expect(view.getByTestId("state-value")).toHaveTextContent(
                "complete",
            );
        },
    );

    test.serial(
        "aggregates scored steps and saves one completion record while staying on complete",
        async () => {
            const view = renderWithQueryClient(
                <ConvoProvider conversation={greeting} index={0}>
                    <CompletionHarness />
                </ConvoProvider>,
            );

            fireEvent.click(view.getByRole("button", { name: "Next" }));
            fireEvent.click(view.getByRole("button", { name: "Next" }));
            fireEvent.click(view.getByRole("button", { name: "Next" }));
            fireEvent.click(view.getByRole("button", { name: "Next" }));

            expect(view.getByTestId("state-value")).toHaveTextContent(
                "substitutionQuiz",
            );

            fireEvent.click(
                view.getByRole("button", { name: "Record summary" }),
            );
            fireEvent.click(
                view.getByRole("button", { name: "Record translation" }),
            );
            fireEvent.click(
                view.getByRole("button", { name: "Record response" }),
            );
            fireEvent.click(
                view.getByRole("button", { name: "Record substitution" }),
            );
            fireEvent.click(view.getByRole("button", { name: "Finish unit" }));

            await waitFor(() => {
                expect(saveCompletionMock).toHaveBeenCalledTimes(1);
            });
            const firstSaveCall = saveCompletionMock.mock.calls.at(0) as
                | [Record<string, unknown>, ...unknown[]]
                | undefined;
            expect(firstSaveCall?.[0]).toEqual({
                unitId: "greeting",
                correctAnswers: 7,
                questionCount: 9,
            });

            expect(view.getByTestId("state-value")).toHaveTextContent(
                "substitutionQuiz",
            );
            expect(view.getByTestId("completion-error")).toHaveTextContent("");
        },
    );
});

describe.serial("ConversationUnit", () => {
    test.serial(
        "renders intro, then summary quiz, then translation quiz, then response quiz, then substitution quiz as the unit advances",
        async () => {
            const view = renderWithQueryClient(
                <TooltipProvider>
                    <ConvoProvider conversation={greeting} index={0}>
                        <ConversationUnitHarness />
                    </ConvoProvider>
                </TooltipProvider>,
            );

            expect(
                view.queryByText("Which is the correct translation?"),
            ).not.toBeInTheDocument();
            expect(
                view.getByText("Press space to advance"),
            ).toBeInTheDocument();

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
        },
    );
});
