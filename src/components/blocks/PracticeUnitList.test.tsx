import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import { Rating } from "ts-fsrs";

import { greeting } from "@/lib/language/convos/data/greeting";
import { PracticeQueueItem } from "@/lib/util/practice";

const useQueryMock = mock(() => [] as PracticeQueueItem[]);

mock.module("convex/react", () => ({
    useQuery: useQueryMock,
}));

mock.module("next/link", () => ({
    default: ({
        children,
        href,
        ...props
    }: React.PropsWithChildren<{ href: string }>) => (
        <a href={href} {...props}>
            {children}
        </a>
    ),
}));

mock.module("@/lib/language/convos", () => ({
    conversations: [
        greeting,
        {
            ...greeting,
            id: "follow-up",
            name: "Follow-up Greeting",
            description: "Continue the greeting conversation.",
        },
    ],
}));

import PracticeUnitList from "@/components/blocks/PracticeUnitList";

beforeEach(() => {
    useQueryMock.mockImplementation(() => []);
});

afterEach(() => {
    mock.clearAllMocks();
    cleanup();
});

describe("PracticeUnitList", () => {
    test("renders due, new, and later sections using the practice queue order", () => {
        useQueryMock.mockImplementation(() => [
            {
                unitId: "follow-up",
                status: "due",
                due: Date.now() - 1_000,
                lastRating: Rating.Hard,
            },
            {
                unitId: "greeting",
                status: "new",
            },
        ] satisfies PracticeQueueItem[]);

        const view = render(<PracticeUnitList />);

        expect(view.getByText("Due now")).toBeInTheDocument();
        expect(view.getByText("New")).toBeInTheDocument();
        expect(view.queryByText("Later")).not.toBeInTheDocument();

        const practiceLinks = view.getAllByRole("link");

        expect(practiceLinks.map((link) => link.getAttribute("href"))).toEqual([
            "/follow-up?returnTo=practice",
            "/greeting?returnTo=practice",
        ]);
    });

    test("shows new units when there is no saved practice state yet", () => {
        useQueryMock.mockImplementation(() => [
            {
                unitId: "greeting",
                status: "new",
            },
            {
                unitId: "follow-up",
                status: "new",
            },
        ] satisfies PracticeQueueItem[]);

        const view = render(<PracticeUnitList />);

        expect(view.getByText("New")).toBeInTheDocument();
        expect(
            view.getByRole("link", {
                name: /^Greeting A simple greeting conversation\. An introduction to Gaidhlig\. 4 phrases$/i,
            }),
        ).toHaveAttribute("href", "/greeting?returnTo=practice");
        expect(
            view.getByRole("link", {
                name: /^Follow-up Greeting Continue the greeting conversation\. 4 phrases$/i,
            }),
        ).toHaveAttribute("href", "/follow-up?returnTo=practice");
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
