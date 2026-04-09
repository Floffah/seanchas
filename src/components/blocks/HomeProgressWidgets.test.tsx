import { render } from "@testing-library/react";
import { beforeEach, describe, expect, mock, test } from "bun:test";
import type { ComponentProps } from "react";

import { conversations } from "@/lib/language/convos";
import { greeting } from "@/lib/language/convos/data/greeting";
import { introductions } from "@/lib/language/convos/data/introductions";

const useQueryMock = mock(
    () =>
        ({
            completedUnitIds: [],
            currentStreak: 0,
            streakGoal: 7,
        }) as {
            completedUnitIds: string[];
            currentStreak: number;
            streakGoal: number;
        },
);

mock.module("convex/react", () => ({
    useQuery: useQueryMock,
}));

mock.module("@/components/ui/progress", () => ({
    Progress: ({
        value,
        ...props
    }: {
        value?: number;
    } & ComponentProps<"div">) => (
        <div {...props} data-value={String(value ?? 0)} />
    ),
}));

const { default: HomeProgressWidgets } = await import(
    "@/components/blocks/HomeProgressWidgets"
);

beforeEach(() => {
    useQueryMock.mockImplementation(() => ({
        completedUnitIds: [],
        currentStreak: 0,
        streakGoal: 7,
    }));
});

describe("HomeProgressWidgets", () => {
    test("renders completed units using completed ids and the authored unit count", () => {
        useQueryMock.mockImplementation(() => ({
            completedUnitIds: [greeting.id, introductions.id],
            currentStreak: 3,
            streakGoal: 7,
        }));

        const view = render(<HomeProgressWidgets />);

        expect(view.getByTestId("home-completed-count")).toHaveTextContent("2");
        expect(view.getByTestId("home-total-count")).toHaveTextContent(
            String(conversations.length),
        );
        expect(
            view.getByTestId("home-completion-progress"),
        ).toHaveAttribute(
            "data-value",
            String((2 / conversations.length) * 100),
        );
    });

    test("renders the streak widget using the stored streak and fixed goal", () => {
        useQueryMock.mockImplementation(() => ({
            completedUnitIds: [greeting.id],
            currentStreak: 3,
            streakGoal: 7,
        }));

        const view = render(<HomeProgressWidgets />);

        expect(view.getByTestId("home-streak-days")).toHaveTextContent("3");
        expect(view.getByTestId("home-streak-goal")).toHaveTextContent("7");
        expect(view.getByTestId("home-streak-progress")).toHaveAttribute(
            "data-value",
            String((3 / 7) * 100),
        );
    });
});
