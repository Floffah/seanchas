"use client";

import { useMemo, useState } from "react";

import SourcePhrase from "@/components/blocks/SourcePhrase";
import Translation from "@/components/blocks/Translation";
import { Button } from "@/components/ui/button";
import { Utterance } from "@/lib/language/convos";
import { cn } from "@/lib/utils";
import { useConversation } from "@/providers/ConvoProvider";

interface QuizOption {
    id: string;
    value: string;
    isCorrect: boolean;
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
            .sort((a, b) => compareAlphabetically(a.id, b.id))
            .slice(0, 3);

        return eligible.map((utterance) => {
            const options = [
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
            ].sort((a, b) => compareAlphabetically(a.value, b.value));

            return {
                utterance,
                options,
            };
        });
    }, [convo]);

    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
        null,
    );
    const [correctCount, setCorrectCount] = useState(0);

    if (questions.length === 0) {
        return (
            <div className="flex grow items-center justify-center p-4">
                <p className="text-sm text-muted-foreground">
                    No translation questions are available for this unit yet.
                </p>
            </div>
        );
    }

    const isComplete = questionIndex >= questions.length;

    if (isComplete) {
        return (
            <div className="flex grow items-center justify-center p-4">
                <div className="flex w-full max-w-lg flex-col items-center gap-3 rounded-lg bg-card p-6">
                    <h2 className="text-xl font-semibold">Step Complete</h2>
                    <p className="text-sm text-muted-foreground">
                        You got {correctCount} out of {questions.length}{" "}
                        correct.
                    </p>
                </div>
            </div>
        );
    }

    const question = questions[questionIndex];
    const answered = selectedOptionId !== null;
    const selectedOption = question.options.find(
        (option) => option.id === selectedOptionId,
    );
    const isCorrect = selectedOption?.isCorrect ?? false;

    return (
        <div className="flex grow flex-col items-center p-4">
            <div className="flex w-full max-w-lg grow flex-col gap-4">
                <p className="text-sm text-muted-foreground">
                    Question {questionIndex + 1} of {questions.length}
                </p>

                <div className="rounded-lg bg-card p-4">
                    <p className="text-sm text-muted-foreground">Phrase</p>
                    <p className="text-lg font-medium">
                        <SourcePhrase utterance={question.utterance} />
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium">
                        Which is the correct translation?
                    </p>
                    {question.options.map((option) => {
                        const optionSelected = selectedOptionId === option.id;
                        const optionIsCorrect = option.isCorrect;

                        return (
                            <Button
                                key={option.id}
                                type="button"
                                variant="outline"
                                onClick={() => setSelectedOptionId(option.id)}
                                disabled={answered}
                                className={cn(
                                    "h-auto justify-start py-3 text-left whitespace-normal",
                                    answered &&
                                        optionIsCorrect &&
                                        "border-green-600 bg-green-50 text-green-900",
                                    answered &&
                                        optionSelected &&
                                        !optionIsCorrect &&
                                        "border-destructive bg-destructive/10 text-destructive",
                                )}
                            >
                                <Translation
                                    utterance={question.utterance}
                                    overwriteFormat={option.value}
                                />
                            </Button>
                        );
                    })}
                </div>

                {answered && (
                    <p
                        className={
                            isCorrect
                                ? "text-sm text-green-600"
                                : "text-sm text-destructive"
                        }
                    >
                        {isCorrect ? (
                            "Correct."
                        ) : (
                            <>
                                Not quite. The correct translation is:{" "}
                                <Translation utterance={question.utterance} />
                            </>
                        )}
                    </p>
                )}

                <div className="shrink-0 grow" />

                <Button
                    onClick={() => {
                        if (!answered) {
                            return;
                        }

                        if (isCorrect) {
                            setCorrectCount((count) => count + 1);
                        }

                        setSelectedOptionId(null);
                        setQuestionIndex((index) => index + 1);
                    }}
                    disabled={!answered}
                    size="lg"
                >
                    {questionIndex + 1 === questions.length ? "Finish" : "Next"}
                </Button>
            </div>
        </div>
    );
}
