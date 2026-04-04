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
    GenericQuizOption,
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
import { Utterance } from "@/lib/language/convos";
import { shuffleArray } from "@/lib/util/array";
import { cn } from "@/lib/utils";
import { useConversation } from "@/providers/ConvoProvider";

interface QuizOption extends GenericQuizOption {
    value: string;
}

interface QuizQuestion {
    utterance: Utterance;
    options: QuizOption[];
}

function compareAlphabetically(a: string, b: string) {
    return a.localeCompare(b, undefined, { sensitivity: "base" });
}

export default function ConversationTranslationQuiz() {
    const convo = useConversation();

    const questions = useMemo<QuizQuestion[]>(() => {
        const eligible = convo.utterances
            .filter(
                (utterance) =>
                    (utterance.incorrectTranslations?.length ?? 0) > 0,
            )
            .sort((a, b) => compareAlphabetically(a.id, b.id));

        return eligible.map((utterance) => ({
            utterance,
            options: shuffleArray([
                {
                    id: utterance.id,
                    value: utterance.translationFormat,
                    isCorrect: true,
                },
                ...(utterance.incorrectTranslations ?? []).map(
                    (translation, idx) => ({
                        id: `${utterance.id}-${idx}`,
                        value: translation,
                        isCorrect: false,
                    }),
                ),
            ]),
        }));
    }, [convo]);

    const quiz = useQuiz<QuizQuestion, string | null>({
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
                            <Button onClick={convo.next}>Next Step</Button>
                        </CardContent>
                    </Card>
                )}

                {!quiz.isComplete && (
                    <GenericQuiz quiz={quiz} className="w-full">
                        <GenericQuizHeader>
                            <CardDescription>Phrase</CardDescription>
                            <CardTitle>
                                <SourcePhrase utterance={question.utterance} />
                            </CardTitle>
                            <CardAction>
                                <GenericQuizProgress />
                            </CardAction>
                        </GenericQuizHeader>

                        <GenericQuizContent>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium">
                                    Which is the correct translation?
                                </p>
                                {question.options.map((option) => (
                                    <GenericQuizAnswerButton
                                        option={option}
                                        key={option.id}
                                    >
                                        <Translation
                                            utterance={question.utterance}
                                            overwriteFormat={option.value}
                                        />
                                    </GenericQuizAnswerButton>
                                ))}
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
                                            Not quite. The correct translation
                                            is:{" "}
                                            <Translation
                                                utterance={question.utterance}
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
