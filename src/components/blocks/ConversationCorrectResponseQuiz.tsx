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
import SourcePhrase from "@/components/blocks/SourcePhrase";
import Translation from "@/components/blocks/Translation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import {
    ResponseQuizOption,
    ResponseQuizQuestion,
    buildResponseQuizQuestions,
} from "@/lib/language/quiz/responseQuiz";
import { ConvoUnitStepId } from "@/lib/state/units";
import { cn } from "@/lib/utils";
import { useConversation } from "@/providers/ConvoProvider";

export default function ConversationCorrectResponseQuiz() {
    const convo = useConversation();
    const questions = useMemo(() => buildResponseQuizQuestions(convo), [convo]);

    const quiz = useQuiz<ResponseQuizQuestion, string | null>({
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
                                        ConvoUnitStepId.ResponseQuiz,
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
                            <CardDescription>Prompt</CardDescription>
                            <CardTitle>
                                <SourcePhrase
                                    utterance={question.promptUtterance}
                                />
                            </CardTitle>
                            <CardDescription>
                                <Translation
                                    utterance={question.promptUtterance}
                                />
                            </CardDescription>
                            <CardAction>
                                <GenericQuizProgress />
                            </CardAction>
                        </GenericQuizHeader>

                        <GenericQuizContent>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium">
                                    Which response comes next?
                                </p>
                                {question.options.map(
                                    (option: ResponseQuizOption) => (
                                        <GenericQuizAnswerButton
                                            option={option}
                                            key={option.id}
                                        >
                                            <SourcePhrase
                                                utterance={option.utterance}
                                            />
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
                                            Not quite. The correct response is:{" "}
                                            <SourcePhrase
                                                utterance={
                                                    question.correctResponse
                                                }
                                            />
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
