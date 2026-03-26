import { fireEvent, render } from "@testing-library/react";
import { describe, expect, test } from "bun:test";

import {
    GenericQuiz,
    GenericQuizAnswerButton,
    GenericQuizCheckButton,
    GenericQuizContent,
    GenericQuizFeedback,
    GenericQuizFooter,
    GenericQuizHeader,
    GenericQuizNextButton,
    GenericQuizOption,
    GenericQuizProgress,
    useGenericQuiz,
    useQuiz,
} from "@/components/GenericQuiz";
import {
    CardAction,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { queryBySlot } from "@/lib/testing/queries";

interface TestQuestion {
    id: string;
    label: string;
    options: Array<GenericQuizOption & { label: string }>;
}

const TEST_QUESTIONS: TestQuestion[] = [
    {
        id: "q1",
        label: "Question 1",
        options: [
            { id: "q1-correct", label: "Question 1 Correct", isCorrect: true },
            { id: "q1-wrong", label: "Question 1 Wrong", isCorrect: false },
        ],
    },
    {
        id: "q2",
        label: "Question 2",
        options: [
            { id: "q2-correct", label: "Question 2 Correct", isCorrect: true },
            { id: "q2-wrong", label: "Question 2 Wrong", isCorrect: false },
        ],
    },
];

function stringifyValue(value: unknown) {
    if (value === null) {
        return "null";
    }

    if (value === undefined) {
        return "undefined";
    }

    return String(value);
}

function UseQuizHarness({
    questions = TEST_QUESTIONS,
}: {
    questions?: TestQuestion[];
}) {
    const quiz = useQuiz<TestQuestion, string | null>({
        questions,
        createInitialAnswer: () => null,
        isAnswerReady: (_question, answer) => answer !== null,
        isAnswerCorrect: (question, answer) =>
            question.options.some(
                (option) => option.id === answer && option.isCorrect,
            ),
    });

    return (
        <div>
            <p data-testid="question-index">{quiz.questionIndex}</p>
            <p data-testid="question-count">{quiz.questionCount}</p>
            <p data-testid="question-label">{quiz.question?.label ?? "none"}</p>
            <p data-testid="answer">{stringifyValue(quiz.answer)}</p>
            <p data-testid="submitted">{String(quiz.submitted)}</p>
            <p data-testid="can-submit">{String(quiz.canSubmit)}</p>
            <p data-testid="is-correct">{stringifyValue(quiz.isCorrect)}</p>
            <p data-testid="correct-count">{quiz.correctCount}</p>
            <p data-testid="is-complete">{String(quiz.isComplete)}</p>

            {quiz.question?.options.map((option) => (
                <button
                    key={option.id}
                    type="button"
                    onClick={() => quiz.setAnswer(option.id)}
                >
                    Select {option.label}
                </button>
            ))}

            <button type="button" onClick={quiz.check}>
                Check
            </button>
            <button type="button" onClick={quiz.next}>
                Next
            </button>
        </div>
    );
}

function GenericQuizHarness() {
    const quiz = useQuiz<TestQuestion, string | null>({
        questions: TEST_QUESTIONS,
        createInitialAnswer: () => null,
        isAnswerReady: (_question, answer) => answer !== null,
        isAnswerCorrect: (question, answer) =>
            question.options.some(
                (option) => option.id === answer && option.isCorrect,
            ),
    });

    if (quiz.isComplete) {
        return <p>Complete {quiz.correctCount}</p>;
    }

    const question = quiz.question;

    if (!question) {
        return null;
    }

    return (
        <GenericQuiz quiz={quiz}>
            <GenericQuizHeader>
                <CardDescription>Prompt</CardDescription>
                <CardTitle>{question.label}</CardTitle>
                <CardAction>
                    <GenericQuizProgress />
                </CardAction>
            </GenericQuizHeader>

            <GenericQuizContent>
                <div className="flex flex-col gap-2">
                    <p>Choose an answer</p>
                    {question.options.map((option) => (
                        <GenericQuizAnswerButton
                            key={option.id}
                            option={option}
                        >
                            {option.label}
                        </GenericQuizAnswerButton>
                    ))}
                </div>

                <GenericQuizFeedback>
                    <p>{quiz.isCorrect ? "Correct." : "Incorrect."}</p>
                </GenericQuizFeedback>
            </GenericQuizContent>

            <GenericQuizFooter>
                <GenericQuizCheckButton />
                <GenericQuizNextButton />
            </GenericQuizFooter>
        </GenericQuiz>
    );
}

describe("useQuiz", () => {
    test("initializes with the first question state", () => {
        const view = render(<UseQuizHarness />);

        expect(view.getByTestId("question-index")).toHaveTextContent("0");
        expect(view.getByTestId("question-count")).toHaveTextContent("2");
        expect(view.getByTestId("question-label")).toHaveTextContent(
            "Question 1",
        );
        expect(view.getByTestId("answer")).toHaveTextContent("null");
        expect(view.getByTestId("submitted")).toHaveTextContent("false");
        expect(view.getByTestId("can-submit")).toHaveTextContent("false");
        expect(view.getByTestId("is-correct")).toHaveTextContent("null");
        expect(view.getByTestId("correct-count")).toHaveTextContent("0");
        expect(view.getByTestId("is-complete")).toHaveTextContent("false");
    });

    test("keeps check as a no-op when the answer is not ready", () => {
        const view = render(<UseQuizHarness />);

        fireEvent.click(view.getByRole("button", { name: "Check" }));

        expect(view.getByTestId("submitted")).toHaveTextContent("false");
        expect(view.getByTestId("is-correct")).toHaveTextContent("null");
    });

    test("marks the current question as submitted and correct after check", () => {
        const view = render(<UseQuizHarness />);

        fireEvent.click(
            view.getByRole("button", { name: "Select Question 1 Correct" }),
        );
        fireEvent.click(view.getByRole("button", { name: "Check" }));

        expect(view.getByTestId("answer")).toHaveTextContent("q1-correct");
        expect(view.getByTestId("submitted")).toHaveTextContent("true");
        expect(view.getByTestId("can-submit")).toHaveTextContent("false");
        expect(view.getByTestId("is-correct")).toHaveTextContent("true");
    });

    test("does not advance before the current question is submitted", () => {
        const view = render(<UseQuizHarness />);

        fireEvent.click(
            view.getByRole("button", { name: "Select Question 1 Correct" }),
        );
        fireEvent.click(view.getByRole("button", { name: "Next" }));

        expect(view.getByTestId("question-index")).toHaveTextContent("0");
        expect(view.getByTestId("question-label")).toHaveTextContent(
            "Question 1",
        );
        expect(view.getByTestId("correct-count")).toHaveTextContent("0");
    });

    test("advances and resets state after a correct answer", () => {
        const view = render(<UseQuizHarness />);

        fireEvent.click(
            view.getByRole("button", { name: "Select Question 1 Correct" }),
        );
        fireEvent.click(view.getByRole("button", { name: "Check" }));
        fireEvent.click(view.getByRole("button", { name: "Next" }));

        expect(view.getByTestId("question-index")).toHaveTextContent("1");
        expect(view.getByTestId("question-label")).toHaveTextContent(
            "Question 2",
        );
        expect(view.getByTestId("answer")).toHaveTextContent("null");
        expect(view.getByTestId("submitted")).toHaveTextContent("false");
        expect(view.getByTestId("correct-count")).toHaveTextContent("1");
        expect(view.getByTestId("is-correct")).toHaveTextContent("null");
    });

    test("advances without incrementing score after an incorrect answer", () => {
        const view = render(<UseQuizHarness />);

        fireEvent.click(
            view.getByRole("button", { name: "Select Question 1 Wrong" }),
        );
        fireEvent.click(view.getByRole("button", { name: "Check" }));
        fireEvent.click(view.getByRole("button", { name: "Next" }));

        expect(view.getByTestId("question-index")).toHaveTextContent("1");
        expect(view.getByTestId("question-label")).toHaveTextContent(
            "Question 2",
        );
        expect(view.getByTestId("correct-count")).toHaveTextContent("0");
        expect(view.getByTestId("submitted")).toHaveTextContent("false");
    });

    test("sets completion on the final question and preserves the final score", () => {
        const view = render(<UseQuizHarness />);

        fireEvent.click(
            view.getByRole("button", { name: "Select Question 1 Correct" }),
        );
        fireEvent.click(view.getByRole("button", { name: "Check" }));
        fireEvent.click(view.getByRole("button", { name: "Next" }));

        fireEvent.click(
            view.getByRole("button", { name: "Select Question 2 Correct" }),
        );
        fireEvent.click(view.getByRole("button", { name: "Check" }));
        fireEvent.click(view.getByRole("button", { name: "Next" }));

        expect(view.getByTestId("is-complete")).toHaveTextContent("true");
        expect(view.getByTestId("correct-count")).toHaveTextContent("2");
        expect(view.getByTestId("question-index")).toHaveTextContent("1");
        expect(view.getByTestId("question-label")).toHaveTextContent(
            "Question 2",
        );
    });

    test("stays safe with an empty question list", () => {
        const view = render(<UseQuizHarness questions={[]} />);

        expect(view.getByTestId("question-count")).toHaveTextContent("0");
        expect(view.getByTestId("question-label")).toHaveTextContent("none");
        expect(view.getByTestId("can-submit")).toHaveTextContent("false");
        expect(view.getByTestId("is-complete")).toHaveTextContent("false");
    });
});

describe("GenericQuiz", () => {
    test("renders the quiz shell and progress from context", () => {
        const view = render(<GenericQuizHarness />);

        expect(queryBySlot(view.container, "generic-quiz-card")).toBeInTheDocument();
        expect(view.getByText("Question 1 of 2")).toBeInTheDocument();
    });

    test("hides feedback before submit and shows it after submit", () => {
        const view = render(<GenericQuizHarness />);

        expect(view.queryByText("Incorrect.")).not.toBeInTheDocument();

        fireEvent.click(view.getByRole("button", { name: "Question 1 Wrong" }));
        fireEvent.click(view.getByRole("button", { name: "Check" }));

        expect(view.getByText("Incorrect.")).toBeInTheDocument();
    });

    test("shows and hides the check button at the right times", () => {
        const view = render(<GenericQuizHarness />);

        const checkButton = view.getByRole("button", { name: "Check" });

        expect(checkButton).toBeDisabled();

        fireEvent.click(
            view.getByRole("button", { name: "Question 1 Correct" }),
        );

        expect(view.getByRole("button", { name: "Check" })).toBeEnabled();

        fireEvent.click(view.getByRole("button", { name: "Check" }));

        expect(
            view.queryByRole("button", { name: "Check" }),
        ).not.toBeInTheDocument();
    });

    test("shows next on intermediate questions and finish on the final question", () => {
        const view = render(<GenericQuizHarness />);

        expect(
            view.queryByRole("button", { name: "Next" }),
        ).not.toBeInTheDocument();

        fireEvent.click(
            view.getByRole("button", { name: "Question 1 Correct" }),
        );
        fireEvent.click(view.getByRole("button", { name: "Check" }));

        expect(view.getByRole("button", { name: "Next" })).toBeInTheDocument();

        fireEvent.click(view.getByRole("button", { name: "Next" }));
        fireEvent.click(
            view.getByRole("button", { name: "Question 2 Correct" }),
        );
        fireEvent.click(view.getByRole("button", { name: "Check" }));

        expect(
            view.getByRole("button", { name: "Finish" }),
        ).toBeInTheDocument();
    });

    test("updates selected answer styling and locks options per the current contract after submit", () => {
        const view = render(<GenericQuizHarness />);

        const correctButton = view.getByRole("button", {
            name: "Question 1 Correct",
        });
        const wrongButton = view.getByRole("button", {
            name: "Question 1 Wrong",
        });

        fireEvent.click(wrongButton);

        expect(wrongButton).toHaveAttribute("data-variant", "outline");
        expect(correctButton).toHaveAttribute("data-variant", "ghost");

        fireEvent.click(view.getByRole("button", { name: "Check" }));

        expect(correctButton).toBeDisabled();
        expect(wrongButton).not.toBeDisabled();
    });

    test("throws when useGenericQuiz is called outside GenericQuiz", () => {
        function GenericQuizProbe() {
            useGenericQuiz<TestQuestion, string | null>();

            return null;
        }

        expect(() => render(<GenericQuizProbe />)).toThrow(
            "useGenericQuiz must be used within <GenericQuiz>",
        );
    });

    test("supports the end-to-end shell flow", () => {
        const view = render(<GenericQuizHarness />);

        fireEvent.click(
            view.getByRole("button", { name: "Question 1 Correct" }),
        );
        fireEvent.click(view.getByRole("button", { name: "Check" }));

        expect(view.getByText("Correct.")).toBeInTheDocument();

        fireEvent.click(view.getByRole("button", { name: "Next" }));

        expect(view.getByText("Question 2 of 2")).toBeInTheDocument();
    });
});
