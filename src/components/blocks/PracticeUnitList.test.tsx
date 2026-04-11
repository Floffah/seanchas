import { render } from "@testing-library/react";
import { beforeEach, describe, expect, mock, test } from "bun:test";
import type { PropsWithChildren } from "react";
import { Rating } from "ts-fsrs";

import { conversations } from "@/lib/language/convos";
import { greeting } from "@/lib/language/convos/data/greeting";
import { introductions } from "@/lib/language/convos/data/introductions";
import type { PracticeQueueItem } from "@/lib/util/practice";

const useQueryMock = mock(() => [] as PracticeQueueItem[]);

mock.module("convex/react", () => ({
    useQuery: useQueryMock,
}));

mock.module("next/link", () => ({
    default: ({
        children,
        href,
        ...props
    }: PropsWithChildren<{ href: string }>) => (
        <a href={href} {...props}>
            {children}
        </a>
    ),
}));

mock.module("@/components/DynamicViewTransition", () => ({
    default: ({ children }: PropsWithChildren) => <>{children}</>,
}));

const { default: PracticeUnitList } =
    await import("@/components/blocks/PracticeUnitList");

function getLinkByHref(view: ReturnType<typeof render>, href: string) {
    return view
        .getAllByRole("link")
        .find((link) => link.getAttribute("href") === href);
}

beforeEach(() => {
    useQueryMock.mockImplementation(() => []);
});

describe("PracticeUnitList", () => {
    test("renders due, new, and later sections using the practice queue order", () => {
        useQueryMock.mockImplementation(
            () =>
                [
                    {
                        unitId: introductions.id,
                        status: "due",
                        due: Date.now() - 1_000,
                        lastRating: Rating.Hard,
                    },
                    {
                        unitId: greeting.id,
                        status: "new",
                    },
                ] satisfies PracticeQueueItem[],
        );

        const view = render(<PracticeUnitList />);

        expect(view.getByText("Due now")).toBeInTheDocument();
        expect(view.getByText("New")).toBeInTheDocument();
        expect(view.queryByText("Later")).not.toBeInTheDocument();

        expect(
            getLinkByHref(
                view,
                `/${introductions.id}?returnTo=practice`,
            ),
        ).toBeInTheDocument();
        expect(
            getLinkByHref(view, `/${greeting.id}?returnTo=practice`),
        ).toBeInTheDocument();

        const practiceLinks = view.getAllByRole("link");

        expect(practiceLinks.map((link) => link.getAttribute("href"))).toEqual([
            `/${introductions.id}?returnTo=practice`,
            `/${greeting.id}?returnTo=practice`,
        ]);
    });

    test("renders new units from the returned practice queue", () => {
        useQueryMock.mockImplementation(
            () =>
                [
                    {
                        unitId: greeting.id,
                        status: "new",
                    },
                    {
                        unitId: introductions.id,
                        status: "new",
                    },
                ] satisfies PracticeQueueItem[],
        );

        const view = render(<PracticeUnitList />);

        expect(view.getByText("New")).toBeInTheDocument();
        expect(
            getLinkByHref(view, `/${greeting.id}?returnTo=practice`),
        ).toBeInTheDocument();
        expect(
            getLinkByHref(
                view,
                `/${introductions.id}?returnTo=practice`,
            ),
        ).toBeInTheDocument();
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
