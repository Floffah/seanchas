"use client";

import { useQuery } from "convex/react";

import { Progress } from "@/components/ui/progress";
import { api } from "@/convex/api";
import { conversations } from "@/lib/language/convos";

export default function HomeProgressWidgets() {
    const progress = useQuery(api.units.getHomeProgress);

    const completedCount = progress?.completedCount ?? 0;
    const totalCount = conversations.length;
    const completionProgress =
        totalCount === 0
            ? 0
            : Math.min(Math.max((completedCount / totalCount) * 100, 0), 100);

    const streakDays = progress?.currentStreak ?? 0;
    const streakGoal = progress?.streakGoal ?? 7;
    const streakProgress = Math.min((streakDays / streakGoal) * 100, 100);

    return (
        <>
            <div
                className="items-center rounded-lg bg-card p-4"
                data-testid="home-streak-widget"
            >
                <div className="flex items-center gap-2">
                    <p className="text-xl">🔥</p>
                    <p data-testid="home-streak-days">{streakDays}</p>
                    <Progress
                        value={streakProgress}
                        className="h-2 grow"
                        data-testid="home-streak-progress"
                    />
                    <p data-testid="home-streak-goal">{streakGoal}</p>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                    Come back every day to increase your streak!
                </p>
            </div>
            <div
                className="items-center rounded-lg bg-card p-4"
                data-testid="home-completion-widget"
            >
                <div className="flex items-center gap-2">
                    <p className="text-xl">✅</p>
                    <p data-testid="home-completed-count">{completedCount}</p>
                    <Progress
                        value={completionProgress}
                        className="h-2 grow"
                        data-testid="home-completion-progress"
                    />
                    <p data-testid="home-total-count">{totalCount}</p>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                    Keep doing units to increase your completion!
                </p>
            </div>
        </>
    );
}
