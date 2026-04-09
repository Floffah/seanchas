import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, mock, test } from "bun:test";

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
    }: React.PropsWithChildren<{ href: string }>) => (
        <a href={href} {...props}>
            {children}
        </a>
    ),
}));

mock.module("@/components/blocks/UnitCard", () => ({
    default: ({
        convo,
        active,
    }: {
        convo: { id: string; name: string };
        active?: boolean;
    }) => (
        <div
            data-active={active ? "true" : "false"}
            data-testid={`unit-card-${convo.id}`}
        >
            {convo.name}
        </div>
    ),
}));

const completedConversationIds = conversations.map((convo) => convo.id);

beforeEach(() => {
    useQueryMock.mockImplementation(() => []);
});

describe("UnitList", () => {
    test("shows all units in Continue Learning and hides Revisit Units when nothing is completed", () => {
        const view = render(<UnitList />);

        expect(view.getByText("Continue Learning")).toBeInTheDocument();
        expect(view.getByTestId(`unit-card-${greeting.id}`)).toHaveAttribute(
            "data-active",
            "true",
        );
        expect(
            view.getByTestId(`unit-card-${introductions.id}`),
        ).toHaveAttribute("data-active", "false");
        expect(
            view.queryByRole("button", { name: "Revisit Units" }),
        ).not.toBeInTheDocument();
    });

    test("moves completed units into the revisit section and lets that section be expanded and collapsed", () => {
        useQueryMock.mockImplementation(() => [greeting.id]);

        const view = render(<UnitList />);

        expect(
            view.getByTestId(`unit-card-${introductions.id}`),
        ).toHaveAttribute("data-active", "true");
        expect(view.getByTestId(`unit-card-${greeting.id}`)).toHaveAttribute(
            "data-active",
            "false",
        );

        const revisitTrigger = view.getByRole("button", {
            name: "Revisit Units",
        });
        const revisitContent = view.container.querySelector(
            '[data-slot="collapsible-content"]',
        );

        expect(revisitTrigger).toBeInTheDocument();
        expect(revisitContent).not.toBeNull();

        const initialExpanded = revisitTrigger.getAttribute("aria-expanded");
        const initialHidden = revisitContent?.hasAttribute("hidden");

        fireEvent.click(revisitTrigger);

        expect(revisitTrigger.getAttribute("aria-expanded")).not.toBe(
            initialExpanded,
        );
        expect(revisitContent?.hasAttribute("hidden")).not.toBe(initialHidden);

        if (revisitTrigger.getAttribute("aria-expanded") === "true") {
            expect(view.getByTestId(`unit-card-${greeting.id}`)).toBeVisible();
        }

        fireEvent.click(revisitTrigger);

        expect(revisitTrigger.getAttribute("aria-expanded")).toBe(
            initialExpanded,
        );
        expect(revisitContent?.hasAttribute("hidden")).toBe(initialHidden);

        if (revisitTrigger.getAttribute("aria-expanded") === "true") {
            expect(view.getByTestId(`unit-card-${greeting.id}`)).toBeVisible();
        }
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
