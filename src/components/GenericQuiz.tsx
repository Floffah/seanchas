"use client";

import { Slot } from "radix-ui";
import {
    ComponentProps,
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface GenericQuizOption {
    id: string;
    isCorrect: boolean;
}

export interface UseQuizConfig<TQuestion, TAnswer> {
    questions: TQuestion[];
    createInitialAnswer: (question: TQuestion) => TAnswer;
    isAnswerReady: (question: TQuestion, answer: TAnswer) => boolean;
    isAnswerCorrect: (question: TQuestion, answer: TAnswer) => boolean;
}

export interface UseQuizResult<TQuestion, TAnswer> {
    questions: TQuestion[];
    questionIndex: number;
    questionCount: number;
    question: TQuestion | null;
    answer: TAnswer;
    setAnswer: Dispatch<SetStateAction<TAnswer>>;
    submitted: boolean;
    canSubmit: boolean;
    isCorrect: boolean | null;
    correctCount: number;
    isComplete: boolean;
    check: () => void;
    next: () => void;
}

const GenericQuizContext = createContext<UseQuizResult<unknown, unknown>>(
    null!,
);

function useQuiz<TQuestion, TAnswer>({
    questions,
    createInitialAnswer,
    isAnswerReady,
    isAnswerCorrect,
}: UseQuizConfig<TQuestion, TAnswer>): UseQuizResult<TQuestion, TAnswer> {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [answer, setAnswer] = useState<TAnswer>(() =>
        questions[0]
            ? createInitialAnswer(questions[0])
            : (undefined as TAnswer),
    );

    const questionCount = questions.length;
    const question = questions[questionIndex] ?? null;

    const canSubmit =
        !isComplete &&
        question !== null &&
        !submitted &&
        isAnswerReady(question, answer);
    const isCorrect =
        !isComplete && submitted && question !== null
            ? isAnswerCorrect(question, answer)
            : null;

    const check = useCallback(() => {
        if (!canSubmit) {
            return;
        }

        setSubmitted(true);
    }, [canSubmit]);

    const next = useCallback(() => {
        if (!submitted) {
            return;
        }

        if (isCorrect) {
            setCorrectCount((count) => count + 1);
        }

        const nextIndex = questionIndex + 1;

        setSubmitted(false);

        if (nextIndex >= questionCount) {
            setIsComplete(true);
            return;
        }

        setQuestionIndex(nextIndex);
        setAnswer(createInitialAnswer(questions[nextIndex]));
    }, [
        submitted,
        isCorrect,
        questionIndex,
        questionCount,
        createInitialAnswer,
        questions,
    ]);

    return {
        questions,
        questionIndex,
        questionCount,
        question,
        answer,
        setAnswer,
        submitted,
        canSubmit,
        isCorrect,
        correctCount,
        isComplete,
        check,
        next,
    };
}

function useGenericQuiz<TQuestion, TAnswer>() {
    const context = useContext(GenericQuizContext);

    if (context === null) {
        throw new Error("useGenericQuiz must be used within <GenericQuiz>");
    }

    return context as UseQuizResult<TQuestion, TAnswer>;
}

const GenericQuizHeader = CardHeader;

function GenericQuiz<TQuestion, TAnswer>({
    quiz,
    children,
    ...props
}: ComponentProps<"div"> & {
    quiz: UseQuizResult<TQuestion, TAnswer>;
}) {
    return (
        <GenericQuizContext.Provider
            value={quiz as UseQuizResult<unknown, unknown>}
        >
            <Card data-slot="generic-quiz-card" {...props}>
                {children}
            </Card>
        </GenericQuizContext.Provider>
    );
}

function GenericQuizProgress({
    ...props
}: ComponentProps<typeof CardDescription>) {
    const quiz = useGenericQuiz();

    return (
        <CardDescription data-slot="generic-quiz-progress" {...props}>
            Question {quiz.questionIndex + 1} of {quiz.questionCount}
        </CardDescription>
    );
}

function GenericQuizContent({
    className,
    ...props
}: ComponentProps<typeof CardContent>) {
    return (
        <CardContent
            className={cn("flex flex-col gap-4", className)}
            {...props}
        />
    );
}

function GenericQuizAnswerButton({
    option,
    className,
    ...props
}: ComponentProps<typeof Button> & {
    option: GenericQuizOption;
}) {
    const quiz = useGenericQuiz();

    return (
        <Button
            key={option.id}
            type="button"
            variant={quiz.answer === option.id ? "outline" : "ghost"}
            onClick={() => !quiz.submitted && quiz.setAnswer(option.id)}
            disabled={quiz.submitted && quiz.answer !== option.id}
            className={cn(
                "h-auto justify-start py-3 text-left whitespace-normal",
                {
                    "border-green-600 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200":
                        quiz.submitted && option.isCorrect,
                    "dark:text-destructive-light border-destructive bg-destructive/10 text-destructive dark:border-destructive/80 dark:bg-destructive/20":
                        quiz.submitted &&
                        quiz.answer === option.id &&
                        !option.isCorrect,
                },
                className,
            )}
            {...props}
        />
    );
}

function GenericQuizFeedback({
    children,
    asChild,
    ...props
}: ComponentProps<"div"> & { asChild?: boolean }) {
    const quiz = useGenericQuiz();

    const Component = asChild ? Slot.Root : "div";

    if (!quiz.submitted) {
        return null;
    }

    return (
        <Component data-slot="generic-quiz-feedback" {...props}>
            {children}
        </Component>
    );
}

function GenericQuizFooter({
    className,
    ...props
}: ComponentProps<typeof CardFooter>) {
    return (
        <CardFooter className={cn("justify-end gap-2", className)} {...props} />
    );
}

function GenericQuizCheckButton({
    checkLabel,
    children,
    ...props
}: ComponentProps<typeof Button> & {
    checkLabel?: ReactNode;
}) {
    const quiz = useGenericQuiz();

    if (quiz.submitted) {
        return null;
    }

    return (
        <Button
            type="button"
            data-slot="generic-quiz-check"
            size="lg"
            onClick={quiz.check}
            disabled={!quiz.canSubmit}
            {...props}
        >
            {children ?? checkLabel ?? "Check"}
        </Button>
    );
}

function GenericQuizNextButton({
    nextLabel,
    finishLabel,
    children,
    ...props
}: ComponentProps<typeof Button> & {
    nextLabel?: ReactNode;
    finishLabel?: ReactNode;
}) {
    const quiz = useGenericQuiz();

    if (!quiz.submitted) {
        return null;
    }

    const label =
        quiz.questionIndex + 1 === quiz.questionCount
            ? (finishLabel ?? "Finish")
            : (nextLabel ?? "Next");

    return (
        <Button
            type="button"
            data-slot="generic-quiz-next"
            size="lg"
            onClick={quiz.next}
            {...props}
        >
            {children ?? label}
        </Button>
    );
}

export {
    GenericQuiz,
    GenericQuizCheckButton,
    GenericQuizContent,
    GenericQuizAnswerButton,
    GenericQuizFeedback,
    GenericQuizFooter,
    GenericQuizHeader,
    GenericQuizNextButton,
    GenericQuizProgress,
    useGenericQuiz,
    useQuiz,
};
