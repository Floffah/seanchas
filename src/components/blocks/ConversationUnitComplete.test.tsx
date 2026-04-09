import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";

const saveCompletionMock = mock(async () => true);
const pushMock = mock(() => {});
const prefetchMock = mock(() => {});
const getSearchParamMock = mock((param: string) => {
    void param;

    return null as string | null;
});

mock.module("@convex-dev/react-query", () => ({
    useConvexMutation: () => saveCompletionMock,
}));

mock.module("next/navigation", () => ({
    useRouter: () => ({
        push: pushMock,
        prefetch: prefetchMock,
    }),
    useSearchParams: () => ({
        get: getSearchParamMock,
    }),
}));

import ConversationUnitComplete from "@/components/blocks/ConversationUnitComplete";
import { greeting } from "@/lib/language/convos/data/greeting";
import { ConvoUnitStepId } from "@/lib/state/units";
import ConvoProvider, { useConversation } from "@/providers/ConvoProvider";

beforeEach(() => {
    saveCompletionMock.mockImplementation(async () => true);
    getSearchParamMock.mockImplementation(() => null);
});

afterEach(() => {
    mock.clearAllMocks();
    cleanup();
});

function renderWithQueryClient(children: React.ReactNode) {
    const queryClient = new QueryClient();

    return render(
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>,
    );
}

function CompletionHarness() {
    const convo = useConversation();

    return (
        <>
            <p data-testid="state-value">{String(convo.state.value)}</p>
            <button type="button" onClick={convo.next}>
                Next
            </button>
            <button
                type="button"
                onClick={() =>
                    convo.recordStepCompletion(ConvoUnitStepId.SummaryQuiz, 1, 1)
                }
            >
                Record summary
            </button>
            <button
                type="button"
                onClick={() =>
                    convo.recordStepCompletion(ConvoUnitStepId.TranslationQuiz, 2, 3)
                }
            >
                Record translation
            </button>
            <button
                type="button"
                onClick={() =>
                    convo.recordStepCompletion(ConvoUnitStepId.ResponseQuiz, 3, 3)
                }
            >
                Record response
            </button>
            <button
                type="button"
                onClick={() =>
                    convo.recordStepCompletion(ConvoUnitStepId.SubstitutionQuiz, 1, 2)
                }
            >
                Record substitution
            </button>
            <ConversationUnitComplete />
        </>
    );
}

describe("ConversationUnitComplete", () => {
    test("saves completion and redirects home from the complete screen", async () => {
        const view = renderWithQueryClient(
            <ConvoProvider conversation={greeting} index={0}>
                <CompletionHarness />
            </ConvoProvider>,
        );

        fireEvent.click(view.getByRole("button", { name: "Next" }));
        fireEvent.click(view.getByRole("button", { name: "Next" }));
        fireEvent.click(view.getByRole("button", { name: "Next" }));
        fireEvent.click(view.getByRole("button", { name: "Next" }));
        fireEvent.click(view.getByRole("button", { name: "Next" }));

        expect(view.getByTestId("state-value")).toHaveTextContent("complete");

        fireEvent.click(view.getByRole("button", { name: "Record summary" }));
        fireEvent.click(
            view.getByRole("button", { name: "Record translation" }),
        );
        fireEvent.click(view.getByRole("button", { name: "Record response" }));
        fireEvent.click(
            view.getByRole("button", { name: "Record substitution" }),
        );
        fireEvent.click(
            view.getByRole("button", { name: "Save and return home" }),
        );

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

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith("/home");
        });
    });

    test("redirects back to practice when the completion screen is reached from practice", async () => {
        getSearchParamMock.mockImplementation((param: string) =>
            param === "returnTo" ? "practice" : null,
        );

        const view = renderWithQueryClient(
            <ConvoProvider conversation={greeting} index={0}>
                <CompletionHarness />
            </ConvoProvider>,
        );

        fireEvent.click(view.getByRole("button", { name: "Next" }));
        fireEvent.click(view.getByRole("button", { name: "Next" }));
        fireEvent.click(view.getByRole("button", { name: "Next" }));
        fireEvent.click(view.getByRole("button", { name: "Next" }));
        fireEvent.click(view.getByRole("button", { name: "Next" }));

        fireEvent.click(view.getByRole("button", { name: "Record summary" }));
        fireEvent.click(
            view.getByRole("button", { name: "Record translation" }),
        );
        fireEvent.click(view.getByRole("button", { name: "Record response" }));
        fireEvent.click(
            view.getByRole("button", { name: "Record substitution" }),
        );
        fireEvent.click(
            view.getByRole("button", { name: "Save and return home" }),
        );

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith("/practice");
        });
    });

    test("shows an inline error and does not redirect when saving fails", async () => {
        saveCompletionMock.mockImplementationOnce(async () => {
            throw new Error("save failed");
        });

        const view = renderWithQueryClient(
            <ConvoProvider conversation={greeting} index={0}>
                <CompletionHarness />
            </ConvoProvider>,
        );

        fireEvent.click(view.getByRole("button", { name: "Next" }));
        fireEvent.click(view.getByRole("button", { name: "Next" }));
        fireEvent.click(view.getByRole("button", { name: "Next" }));
        fireEvent.click(view.getByRole("button", { name: "Next" }));
        fireEvent.click(view.getByRole("button", { name: "Next" }));

        fireEvent.click(view.getByRole("button", { name: "Record summary" }));
        fireEvent.click(
            view.getByRole("button", { name: "Record translation" }),
        );
        fireEvent.click(view.getByRole("button", { name: "Record response" }));
        fireEvent.click(
            view.getByRole("button", { name: "Record substitution" }),
        );
        fireEvent.click(
            view.getByRole("button", { name: "Save and return home" }),
        );

        await waitFor(() => {
            expect(view.getByText("Error: save failed")).toBeInTheDocument();
        });
        expect(pushMock).not.toHaveBeenCalled();
    });
});
