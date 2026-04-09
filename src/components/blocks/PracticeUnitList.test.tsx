import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";

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
                name: "Follow-up Greeting",
                description: "Continue the greeting conversation.",
                status: "due" as const,
            },
            {
                unitId: "greeting",
                name: "Greeting",
                description: greeting.description,
                status: "new" as const,
            },
        ]);

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

    test("shows an empty state when there are no practice units", () => {
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
