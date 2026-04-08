import { ConvoUnitStepId } from "@/lib/state/units";

export type UnitStepCompletions = Partial<
    Record<
        ConvoUnitStepId,
        {
            correctCount: number;
            questionCount: number;
        }
    >
>;

export function calculateUnitCompletion(completions: UnitStepCompletions) {
    const totals = Object.values(ConvoUnitStepId).reduce(
        (acc, stepId) => {
            const completion = completions[stepId];

            if (!completion) {
                return acc;
            }

            acc.correctAnswers += completion.correctCount;
            acc.questionCount += completion.questionCount;

            return acc;
        },
        {
            correctAnswers: 0,
            questionCount: 0,
        },
    );

    if (totals.questionCount === 0) {
        return {
            ...totals,
            percentageCorrect: 0,
        };
    }

    return {
        ...totals,
        percentageCorrect: Math.round(
            (totals.correctAnswers / totals.questionCount) * 100,
        ),
    };
}
