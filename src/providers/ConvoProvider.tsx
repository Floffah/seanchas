"use client";

import {
    PropsWithChildren,
    createContext,
    useContext,
    useMemo,
    useState,
} from "react";

import { Conversation, conversations } from "@/lib/language/convos";
import { createConvoTokenStore } from "@/lib/state/convos";

export enum ConvoUnitStep {
    Intro,
}

interface ConvoContextValue extends Conversation {
    convoIdx: number;
    step: ConvoUnitStep;
    convoTokenState: ReturnType<typeof createConvoTokenStore>;
    progress: () => void;
}

const ConvoContext = createContext<ConvoContextValue>(null!);

export const useConversation = () => useContext(ConvoContext);

export default function ConvoProvider({
    slug,
    children,
}: PropsWithChildren<{ slug: string }>) {
    const conversation = useMemo(
        () => conversations.find((c) => c.id === slug)!,
        [slug],
    );
    const convoIdx = useMemo(
        () => conversations.findIndex((c) => c.id === slug)!,
        [slug],
    );

    const [step, setStep] = useState(ConvoUnitStep.Intro);

    const convoTokenState = useMemo(
        () => createConvoTokenStore(conversation),
        [conversation],
    );

    return (
        <ConvoContext.Provider
            value={{
                ...conversation,
                convoIdx,
                step,
                convoTokenState,
                progress: () => setStep((s) => s + 1),
            }}
        >
            {children}
        </ConvoContext.Provider>
    );
}
