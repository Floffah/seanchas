import { Card, Grade, Rating, createEmptyCard, fsrs } from "ts-fsrs";

import { Doc } from "@/convex/dataModel";
import { conversations } from "@/lib/language/convos";

const scheduler = fsrs({
    enable_short_term: false,
});

export type StoredUnitPracticeState = Omit<
    Doc<"unitPracticeStates">,
    "_creationTime" | "_id" | "userId"
>;

export interface PracticeQueueItem {
    unitId: string;
    status: "due" | "new" | "later";
    due?: number;
    lastRating?: Rating;
}

export function percentageCorrectToRating(percentageCorrect: number): Grade {
    if (percentageCorrect < 40) {
        return Rating.Again;
    }

    if (percentageCorrect < 70) {
        return Rating.Hard;
    }

    if (percentageCorrect < 90) {
        return Rating.Good;
    }

    return Rating.Easy;
}

export function serializeFsrsCard(
    card: Card,
    lastRating: Grade,
    updatedAt: number,
): Omit<StoredUnitPracticeState, "unitId"> {
    return {
        due: card.due.getTime(),
        stability: card.stability,
        difficulty: card.difficulty,
        elapsedDays: card.elapsed_days,
        scheduledDays: card.scheduled_days,
        reps: card.reps,
        lapses: card.lapses,
        state: card.state,
        lastReview: card.last_review?.getTime(),
        lastRating,
        updatedAt,
    };
}

export function deserializeFsrsCard(
    practiceState: Omit<StoredUnitPracticeState, "updatedAt">,
): Card {
    return {
        due: new Date(practiceState.due),
        stability: practiceState.stability,
        difficulty: practiceState.difficulty,
        elapsed_days: practiceState.elapsedDays,
        scheduled_days: practiceState.scheduledDays,
        reps: practiceState.reps,
        lapses: practiceState.lapses,
        learning_steps: 0,
        state: practiceState.state,
        last_review:
            practiceState.lastReview === undefined
                ? undefined
                : new Date(practiceState.lastReview),
    };
}

export function getUnitPracticeState(
    practiceState: Omit<StoredUnitPracticeState, "updatedAt"> | undefined,
    percentageCorrect: number,
    now: Date = new Date(),
) {
    const rating = percentageCorrectToRating(percentageCorrect);
    const currentCard = practiceState
        ? deserializeFsrsCard(practiceState)
        : createEmptyCard(now);
    const nextReview = scheduler.next(currentCard, now, rating);

    return {
        rating,
        practiceState: serializeFsrsCard(
            nextReview.card,
            rating,
            now.getTime(),
        ),
    };
}

export function buildPracticeQueue(
    practiceStates: Pick<
        StoredUnitPracticeState,
        "unitId" | "due" | "lastRating"
    >[],
    now: number = Date.now(),
): PracticeQueueItem[] {
    const dueUnits: PracticeQueueItem[] = [];
    const newUnits: PracticeQueueItem[] = [];
    const laterUnits: PracticeQueueItem[] = [];

    for (const conversation of conversations) {
        const practiceState = practiceStates.find(
            (state) => state.unitId === conversation.id,
        );

        if (!practiceState) {
            newUnits.push({
                unitId: conversation.id,
                status: "new",
            });
            continue;
        }

        const unit = {
            unitId: conversation.id,
            due: practiceState.due,
            lastRating: practiceState.lastRating,
            status:
                practiceState.due <= now
                    ? ("due" as const)
                    : ("later" as const),
        };

        if (unit.status === "due") {
            dueUnits.push(unit);
        } else {
            laterUnits.push(unit);
        }
    }

    dueUnits.sort((a, b) => (a.due ?? 0) - (b.due ?? 0));
    laterUnits.sort((a, b) => (a.due ?? 0) - (b.due ?? 0));

    return [...dueUnits, ...newUnits, ...laterUnits];
}
