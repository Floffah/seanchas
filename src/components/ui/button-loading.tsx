"use client";

import { ComponentProps, useTransition } from "react";

import Loader from "@/components/Loader";

import { Button } from "./button";

export default function LoadingButton({
    onClick,
    children,
    isLoading: propsIsLoading,
    ...props
}: ComponentProps<typeof Button> & { isLoading?: boolean }) {
    const [isPending, startTransition] = useTransition();

    const isLoading = propsIsLoading || isPending;

    return (
        <Button
            onClick={
                onClick &&
                ((e) => {
                    startTransition(() => onClick(e));
                })
            }
            {...props}
        >
            {isLoading && <Loader />}
            {children}
        </Button>
    );
}
