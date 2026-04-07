import { GenericQuizOption } from "@/components/GenericQuiz";
import { Conversation, Utterance } from "@/lib/language/convos/types";
import { shuffleArray } from "@/lib/util/array";
import { compareAlphabetically } from "@/lib/util/sort";

interface TranslationQuizOption extends GenericQuizOption {
    value: string;
}

export interface TranslationQuizQuestion {
    utterance: Utterance;
    options: TranslationQuizOption[];
}

export function buildTranslationQuizQuestions(
    convo: Conversation,
): TranslationQuizQuestion[] {
    const eligible = convo.utterances
        .filter(
            (utterance) => (utterance.incorrectTranslations?.length ?? 0) > 0,
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
}
