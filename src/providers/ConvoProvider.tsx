"use client";

import {
    PropsWithChildren,
    createContext,
    useContext,
    useMemo,
    useState,
} from "react";

import { Conversation, conversations } from "@/lib/language/convos";
import { createConvoTokenState } from "@/lib/state";

export enum ConvoUnitStep {
    Intro,
}

interface ConvoContextValue extends Conversation {
    convoIdx: number;
    step: ConvoUnitStep;
    convoTokenState: ReturnType<typeof createConvoTokenState>;
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
        () => createConvoTokenState(conversation),
        [conversation],
    );

    return (
        <ConvoContext.Provider
            value={{
                ...conversation,
                convoIdx,
                step,
                convoTokenState,
            }}
        >
            {children}
        </ConvoContext.Provider>
    );
}
