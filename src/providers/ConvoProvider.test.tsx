import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, mock, test } from "bun:test";
import type { ReactNode } from "react";

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

function renderWithQueryClient(children: ReactNode) {
    const queryClient = new QueryClient();

    return render(
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>,
    );
}

function ResolveTokenHarness() {
    const convo = useConversation();
    const resolvedToken = convo.resolveTokenRef({
        kind: "token_ref",
        ref: "greeting.you",
    });

    return (
        <p data-testid="resolved-token-id">{resolvedToken?.id ?? "missing"}</p>
    );
}

function CompletionHarness() {
    const convo = useConversation();

    return (
        <>
            <p data-testid="save-pending">
                {convo.saveCompletionPending ? "true" : "false"}
            </p>
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
                Record summary once
            </button>
            <button
                type="button"
                onClick={() =>
                    convo.recordStepCompletion(
                        ConvoUnitStepId.SummaryQuiz,
                        0,
                        2,
                    )
                }
            >
                Replace summary
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
            <button type="button" onClick={() => void convo.finishUnit()}>
                Finish unit
            </button>
        </>
    );
}

describe.serial("ConvoProvider", () => {
    test.serial("resolves token refs from the current conversation", () => {
        const view = renderWithQueryClient(
            <ConvoProvider conversation={greeting} index={0}>
                <ResolveTokenHarness />
            </ConvoProvider>,
        );

        expect(view.getByTestId("resolved-token-id")).toHaveTextContent(
            "greeting.you",
        );
    });

    test.serial("replaces the stored completion value for a step before aggregating", async () => {
        const view = renderWithQueryClient(
            <ConvoProvider conversation={greeting} index={0}>
                <CompletionHarness />
            </ConvoProvider>,
        );

        fireEvent.click(view.getByRole("button", { name: "Record summary once" }));
        fireEvent.click(view.getByRole("button", { name: "Replace summary" }));
        fireEvent.click(view.getByRole("button", { name: "Record translation" }));
        fireEvent.click(view.getByRole("button", { name: "Finish unit" }));

        await waitFor(() => {
            expect(saveCompletionMock).toHaveBeenCalledTimes(1);
        });

        const firstSaveCall = saveCompletionMock.mock.calls.at(0) as
            | [Record<string, unknown>, ...unknown[]]
            | undefined;

        expect(firstSaveCall?.[0]).toEqual({
            unitId: "greeting",
            correctAnswers: 2,
            questionCount: 5,
        });
    });

    test.serial("does not trigger a second save while a completion save is already pending", async () => {
        let resolveSave: ((value: string) => void) | undefined;

        saveCompletionMock.mockImplementation(
            () =>
                new Promise<string>((resolve) => {
                    resolveSave = resolve;
                }),
        );

        const view = renderWithQueryClient(
            <ConvoProvider conversation={greeting} index={0}>
                <CompletionHarness />
            </ConvoProvider>,
        );

        fireEvent.click(view.getByRole("button", { name: "Record translation" }));
        fireEvent.click(view.getByRole("button", { name: "Finish unit" }));

        await waitFor(() => {
            expect(view.getByTestId("save-pending")).toHaveTextContent("true");
        });

        fireEvent.click(view.getByRole("button", { name: "Finish unit" }));

        expect(saveCompletionMock).toHaveBeenCalledTimes(1);

        resolveSave?.("completion-id");

        await waitFor(() => {
            expect(view.getByTestId("save-pending")).toHaveTextContent(
                "false",
            );
        });
    });
});
