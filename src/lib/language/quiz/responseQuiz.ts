import { Conversation, Utterance } from "@/lib/language/convos/types";
import { shuffleArray } from "@/lib/util/array";

export interface ResponseQuizOption {
    id: string;
    utterance: Utterance;
    isCorrect: boolean;
}

export interface ResponseQuizQuestion {
    promptUtterance: Utterance;
    correctResponse: Utterance;
    options: ResponseQuizOption[];
}

function getTargetQuestionCount(utteranceCount: number) {
    return Math.max(3, Math.min(5, Math.round(utteranceCount / 3)));
}

export function buildResponseQuizQuestions(
    conversation: Conversation,
): ResponseQuizQuestion[] {
    const utteranceMap = new Map(
        conversation.utterances.map((utterance) => [utterance.id, utterance]),
    );

    const eligibleQuestions = conversation.utterances.flatMap(
        (promptUtterance, idx) => {
            const correctResponse = conversation.utterances[idx + 1];

            if (!correctResponse || !promptUtterance.incorrectResponseIds) {
                return [];
            }

            const incorrectResponses = promptUtterance.incorrectResponseIds.map(
                (responseId) => utteranceMap.get(responseId),
            );

            if (incorrectResponses.some((response) => response === undefined)) {
                return [];
            }

            const resolvedIncorrectResponses =
                incorrectResponses as Utterance[];
            const optionIds = [
                correctResponse.id,
                ...resolvedIncorrectResponses.map((response) => response.id),
            ];

            if (new Set(optionIds).size !== optionIds.length) {
                return [];
            }

            return [
                {
                    promptUtterance,
                    correctResponse,
                    options: shuffleArray([
                        {
                            id: correctResponse.id,
                            utterance: correctResponse,
                            isCorrect: true,
                        },
                        ...resolvedIncorrectResponses.map((response) => ({
                            id: response.id,
                            utterance: response,
                            isCorrect: false,
                        })),
                    ]),
                },
            ];
        },
    );

    return shuffleArray(eligibleQuestions).slice(
        0,
        Math.min(
            eligibleQuestions.length,
            getTargetQuestionCount(conversation.utterances.length),
        ),
    );
}
