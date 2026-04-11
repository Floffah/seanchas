import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, mock, test } from "bun:test";
import type { PropsWithChildren } from "react";

import UnitList from "@/components/blocks/UnitList";
import { conversations } from "@/lib/language/convos";
import { greeting } from "@/lib/language/convos/data/greeting";
import { introductions } from "@/lib/language/convos/data/introductions";

const useQueryMock = mock(() => [] as string[] | undefined);

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

const completedConversationIds = conversations.map((convo) => convo.id);

function getLinkByHref(view: ReturnType<typeof render>, href: string) {
    return view
        .getAllByRole("link")
        .find((link) => link.getAttribute("href") === href);
}

beforeEach(() => {
    useQueryMock.mockImplementation(() => []);
});

describe("UnitList", () => {
    test("shows all units in Continue Learning and hides Revisit Units when nothing is completed", () => {
        const view = render(<UnitList />);
        const greetingLink = getLinkByHref(view, `/${greeting.id}`);
        const introductionsLink = getLinkByHref(view, `/${introductions.id}`);

        expect(view.getByText("Continue Learning")).toBeInTheDocument();
        expect(greetingLink).toBeInTheDocument();
        expect(introductionsLink).toBeInTheDocument();
        expect(greetingLink?.className).toContain("border");
        expect(introductionsLink?.className).not.toContain("border");
        expect(
            view.queryByRole("button", { name: "Revisit Units" }),
        ).not.toBeInTheDocument();
    });

    test("moves completed units into the revisit section and lets that section be expanded and collapsed", () => {
        useQueryMock.mockImplementation(() => [greeting.id]);

        const view = render(<UnitList />);

        expect(
            getLinkByHref(view, `/${introductions.id}`)?.className,
        ).toContain("border");
        expect(getLinkByHref(view, `/${greeting.id}`)).toBeUndefined();

        const revisitTrigger = view.getByRole("button", {
            name: "Revisit Units",
        });
        const revisitContent = view.container.querySelector(
            '[data-slot="collapsible-content"]',
        );

        expect(revisitTrigger).toBeInTheDocument();
        expect(revisitContent).not.toBeNull();
        expect(revisitTrigger).toHaveAttribute("aria-expanded", "false");
        expect(revisitContent?.hasAttribute("hidden")).toBe(true);
        expect(getLinkByHref(view, `/${greeting.id}`)).toBeUndefined();

        fireEvent.click(revisitTrigger);

        expect(revisitTrigger).toHaveAttribute("aria-expanded", "true");
        expect(revisitContent?.hasAttribute("hidden")).toBe(false);
        expect(getLinkByHref(view, `/${greeting.id}`)).toBeVisible();

        fireEvent.click(revisitTrigger);

        expect(revisitTrigger).toHaveAttribute("aria-expanded", "false");
        expect(revisitContent?.hasAttribute("hidden")).toBe(true);
        expect(getLinkByHref(view, `/${greeting.id}`)).toBeUndefined();
    });

    test("shows the empty state and practice CTA when every unit is completed", () => {
        useQueryMock.mockImplementation(() => completedConversationIds);

        const view = render(<UnitList />);

        expect(view.getByText("No Units to Show")).toBeInTheDocument();
        expect(
            view.getByText("You've completed all available units. Great job!"),
        ).toBeInTheDocument();
        expect(
            view.getByRole("link", { name: "Start Practicing" }),
        ).toHaveAttribute("href", "/practice");
    });
});
