import { render } from "@testing-library/react";
import { describe, expect, mock, test } from "bun:test";
import type { PropsWithChildren } from "react";

import UnitCard from "@/components/blocks/UnitCard";
import { greeting } from "@/lib/language/convos/data/greeting";

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

describe("UnitCard", () => {
    test("renders the default unit route and active styling", () => {
        const view = render(<UnitCard convo={greeting} active />);
        const link = view.getByRole("link", { name: /Greeting/i });

        expect(link).toHaveAttribute("href", "/greeting");
        expect(view.getByText("4 phrases")).toBeInTheDocument();
        expect(link.className).toContain("border");
    });

    test("renders the returnTo route when provided", () => {
        const view = render(<UnitCard convo={greeting} returnTo="practice" />);

        expect(view.getByRole("link", { name: /Greeting/i })).toHaveAttribute(
            "href",
            "/greeting?returnTo=practice",
        );
    });
});
