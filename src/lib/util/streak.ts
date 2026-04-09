export interface StreakState {
    currentStreak?: number;
    lastActiveAt?: number;
}

const BASE_STREAK_GOALS = [7, 14, 30, 60, 100];

function getDayStart(timestamp: number, removeDate = 0) {
    const date = new Date(timestamp);

    date.setHours(0, 0, 0, 0);

    if (removeDate) {
        date.setDate(date.getDate() - removeDate);
    }

    return date.getTime();
}

export function getStreakGoal(currentStreak: number) {
    const nextEarlyGoal = BASE_STREAK_GOALS.find(
        (goal) => currentStreak < goal,
    );

    if (nextEarlyGoal !== undefined) {
        return nextEarlyGoal;
    }

    return Math.ceil((currentStreak + 1) / 50) * 50;
}

export function getUpdatedStreakState(
    streakState: StreakState,
    now: number | Date = Date.now(),
): Required<StreakState> {
    const nowTimestamp = now instanceof Date ? now.getTime() : now;
    const todayDayStart = getDayStart(nowTimestamp);

    if (
        streakState.lastActiveAt !== undefined &&
        getDayStart(streakState.lastActiveAt) === todayDayStart
    ) {
        return {
            currentStreak: streakState.currentStreak ?? 1,
            lastActiveAt: nowTimestamp,
        };
    }

    if (
        streakState.lastActiveAt !== undefined &&
        getDayStart(streakState.lastActiveAt) === getDayStart(nowTimestamp, 1)
    ) {
        return {
            currentStreak: (streakState.currentStreak ?? 1) + 1,
            lastActiveAt: nowTimestamp,
        };
    }

    return {
        currentStreak: 1,
        lastActiveAt: nowTimestamp,
    };
}
