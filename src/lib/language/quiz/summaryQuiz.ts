import { GenericQuizOption } from "@/components/GenericQuiz";
import {
    Conversation,
    SummaryQuestion,
} from "@/lib/language/convos/types";
import { shuffleArray } from "@/lib/util/array";

export interface SummaryQuizOption extends GenericQuizOption {
    value: string;
}

export interface SummaryQuizQuestion {
    prompt: string;
    correctOption: SummaryQuizOption;
    options: SummaryQuizOption[];
}

function toQuestion(
    question: SummaryQuestion,
    index: number,
): SummaryQuizQuestion {
    const correctOption: SummaryQuizOption = {
        id: `summary-${index}-correct`,
        value: question.correctAnswer,
        isCorrect: true,
    };

    return {
        prompt: question.prompt,
        correctOption,
        options: shuffleArray([
            correctOption,
            ...question.incorrectAnswers.map((answer, answerIndex) => ({
                id: `summary-${index}-${answerIndex}`,
                value: answer,
                isCorrect: false,
            })),
        ]),
    };
}

export function buildSummaryQuizQuestions(
    conversation: Conversation,
): SummaryQuizQuestion[] {
    return (conversation.summaryQuestions ?? []).map(toQuestion);
}
