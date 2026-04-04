import * as React from "react";
import { ComponentProps } from "react";

export default function DynamicViewTransition({
    children,
    ...props
}: ComponentProps<typeof React.ViewTransition>) {
    if (!!React.ViewTransition) {
        return (
            <React.ViewTransition {...props}>{children}</React.ViewTransition>
        );
    }

    return <>{children}</>;
}
