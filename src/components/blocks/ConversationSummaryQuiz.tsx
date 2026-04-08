"use client";

import { useMemo } from "react";

import {
    GenericQuiz,
    GenericQuizAnswerButton,
    GenericQuizCheckButton,
    GenericQuizContent,
    GenericQuizFeedback,
    GenericQuizFooter,
    GenericQuizHeader,
    GenericQuizNextButton,
    GenericQuizProgress,
    useQuiz,
} from "@/components/GenericQuiz";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import {
    SummaryQuizOption,
    SummaryQuizQuestion,
    buildSummaryQuizQuestions,
} from "@/lib/language/quiz/summaryQuiz";
import { ConvoUnitStepId } from "@/lib/state/units";
import { cn } from "@/lib/utils";
import { useConversation } from "@/providers/ConvoProvider";

export default function ConversationSummaryQuiz() {
    const convo = useConversation();
    const questions = useMemo(() => buildSummaryQuizQuestions(convo), [convo]);

    const quiz = useQuiz<SummaryQuizQuestion, string | null>({
        questions,
        createInitialAnswer: () => null,
        isAnswerReady: (_question, answer) => answer !== null,
        isAnswerCorrect: (question, answer) =>
            question.options.some(
                (option) => option.id === answer && option.isCorrect,
            ),
    });

    const question = quiz.question!;

    return (
        <>
            <div className="mx-auto mt-20 flex w-full max-w-lg grow flex-col items-center p-4">
                {quiz.isComplete && (
                    <Card className="w-full items-center text-center">
                        <CardContent>
                            <CardTitle>Step Complete</CardTitle>
                            <CardDescription>
                                You got {quiz.correctCount} out of{" "}
                                {quiz.questionCount} correct.
                            </CardDescription>
                            <Button
                                className="mt-2"
                                onClick={() => {
                                    convo.recordStepCompletion(
                                        ConvoUnitStepId.SummaryQuiz,
                                        quiz.correctCount,
                                        quiz.questionCount,
                                    );
                                    convo.next();
                                }}
                            >
                                Next Step
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {!quiz.isComplete && (
                    <GenericQuiz quiz={quiz} className="w-full">
                        <GenericQuizHeader>
                            <CardDescription>Summary</CardDescription>
                            <CardTitle>{question.prompt}</CardTitle>
                            <CardAction>
                                <GenericQuizProgress />
                            </CardAction>
                        </GenericQuizHeader>

                        <GenericQuizContent>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium">
                                    Pick the best summary.
                                </p>
                                {question.options.map(
                                    (option: SummaryQuizOption) => (
                                        <GenericQuizAnswerButton
                                            option={option}
                                            key={option.id}
                                        >
                                            {option.value}
                                        </GenericQuizAnswerButton>
                                    ),
                                )}
                            </div>

                            <GenericQuizFeedback asChild>
                                <p
                                    className={cn({
                                        "text-sm text-green-600":
                                            quiz.isCorrect,
                                        "text-sm text-destructive":
                                            !quiz.isCorrect,
                                    })}
                                >
                                    {quiz.isCorrect && "Correct."}
                                    {!quiz.isCorrect && (
                                        <>
                                            Not quite. The correct answer is:{" "}
                                            {question.correctOption.value}
                                        </>
                                    )}
                                </p>
                            </GenericQuizFeedback>
                        </GenericQuizContent>

                        <GenericQuizFooter>
                            <GenericQuizCheckButton />
                            <GenericQuizNextButton />
                        </GenericQuizFooter>
                    </GenericQuiz>
                )}
            </div>
        </>
    );
}
