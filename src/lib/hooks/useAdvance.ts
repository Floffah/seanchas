"use client";

import { useEffect, useEffectEvent, useState } from "react";

export function useAdvance({
    canAdvance,
    onAdvance,
}: {
    onAdvance?: (step: number) => void;
    canAdvance: (step: number) => boolean;
}) {
    const [step, setStep] = useState(0);

    const onSpace = useEffectEvent((e: KeyboardEvent) => {
        if (e.code === "Space" && canAdvance(step)) {
            const newStep = step + 1;
            setStep(newStep);
            onAdvance?.(newStep);
        }
    });

    useEffect(() => {
        window.addEventListener("keydown", onSpace);
        return () => window.removeEventListener("keydown", onSpace);
    }, []);

    return {
        step,
        setStep,
        canAdvance,
    };
}
