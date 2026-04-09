import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import type { ComponentProps } from "react";
import { Rating } from "ts-fsrs";

import { conversations } from "@/lib/language/convos";
import type { PracticeQueueItem } from "@/lib/util/practice";

const useQueryMock = mock(() => [] as PracticeQueueItem[]);

mock.module("convex/react", () => ({
    useQuery: useQueryMock,
}));

mock.module("@/components/blocks/UnitCard", () => ({
    default: ({
        convo,
        returnTo,
    }: {
        convo: (typeof conversations)[number];
        returnTo?: ComponentProps<
            typeof import("@/components/blocks/UnitCard").default
        >["returnTo"];
    }) => (
        <a
            data-testid={`unit-card-${convo.id}`}
            href={
                returnTo ? `/${convo.id}?returnTo=${returnTo}` : `/${convo.id}`
            }
        >
            {convo.name}
        </a>
    ),
}));

const { default: PracticeUnitList } =
    await import("@/components/blocks/PracticeUnitList");

const [firstConversation, secondConversation] = conversations;

beforeEach(() => {
    useQueryMock.mockImplementation(() => []);
});

afterEach(() => {
    mock.clearAllMocks();
    cleanup();
});

describe("PracticeUnitList", () => {
    test("renders due, new, and later sections using the practice queue order", () => {
        useQueryMock.mockImplementation(
            () =>
                [
                    {
                        unitId: secondConversation.id,
                        status: "due",
                        due: Date.now() - 1_000,
                        lastRating: Rating.Hard,
                    },
                    {
                        unitId: firstConversation.id,
                        status: "new",
                    },
                ] satisfies PracticeQueueItem[],
        );

        const view = render(<PracticeUnitList />);

        expect(view.getByText("Due now")).toBeInTheDocument();
        expect(view.getByText("New")).toBeInTheDocument();
        expect(view.queryByText("Later")).not.toBeInTheDocument();

        expect(
            view.getByTestId(`unit-card-${secondConversation.id}`),
        ).toHaveAttribute(
            "href",
            `/${secondConversation.id}?returnTo=practice`,
        );
        expect(
            view.getByTestId(`unit-card-${firstConversation.id}`),
        ).toHaveAttribute("href", `/${firstConversation.id}?returnTo=practice`);

        const practiceLinks = view.getAllByRole("link");

        expect(practiceLinks.map((link) => link.getAttribute("href"))).toEqual([
            `/${secondConversation.id}?returnTo=practice`,
            `/${firstConversation.id}?returnTo=practice`,
        ]);
    });

    test("renders new units from the returned practice queue", () => {
        useQueryMock.mockImplementation(
            () =>
                [
                    {
                        unitId: firstConversation.id,
                        status: "new",
                    },
                    {
                        unitId: secondConversation.id,
                        status: "new",
                    },
                ] satisfies PracticeQueueItem[],
        );

        const view = render(<PracticeUnitList />);

        expect(view.getByText("New")).toBeInTheDocument();
        expect(
            view.getByTestId(`unit-card-${firstConversation.id}`),
        ).toHaveAttribute("href", `/${firstConversation.id}?returnTo=practice`);
        expect(
            view.getByTestId(`unit-card-${secondConversation.id}`),
        ).toHaveAttribute(
            "href",
            `/${secondConversation.id}?returnTo=practice`,
        );
    });

    test("shows the empty state when the practice queue is empty", () => {
        useQueryMock.mockImplementation(() => []);

        const view = render(<PracticeUnitList />);

        expect(view.getByText("No Practice Units Yet")).toBeInTheDocument();
        expect(
            view.getByText(
                "Complete a unit first and it will show up here for review.",
            ),
        ).toBeInTheDocument();
    });
});
