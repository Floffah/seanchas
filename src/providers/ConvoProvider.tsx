"use client";

import {
    PropsWithChildren,
    createContext,
    useContext,
    useMemo,
    useState,
} from "react";

import {
    Conversation,
    TokenPart,
    TokenRefPart,
    conversations,
} from "@/lib/language/convos";
import { createConvoTokenStore } from "@/lib/state/convos";

export enum ConvoUnitStep {
    Intro,
}

interface ConvoContextValue extends Conversation {
    convoIdx: number;
    step: ConvoUnitStep;
    convoTokenState: ReturnType<typeof createConvoTokenStore>;
    progress: () => void;

    resolveTokenRef: (ref: TokenRefPart) => TokenPart | undefined;
}

const ConvoContext = createContext<ConvoContextValue>(null!);

export const useConversation = () => useContext(ConvoContext);

export default function ConvoProvider({
    conversation,
    index,
    children,
}: PropsWithChildren<{ conversation: Conversation; index: number }>) {
    const [step, setStep] = useState(ConvoUnitStep.Intro);

    const convoTokenState = useMemo(
        () => createConvoTokenStore(conversation),
        [conversation],
    );

    const resolveTokenRef = ({ ref }: TokenRefPart) =>
        conversation.utterances
            .flatMap((u) => u.parts)
            .find((p): p is TokenPart => p.kind === "token" && p.id === ref);

    return (
        <ConvoContext.Provider
            value={{
                ...conversation,
                convoIdx: index,
                step,
                convoTokenState,
                progress: () => setStep((s) => s + 1),
                resolveTokenRef,
            }}
        >
            {children}
        </ConvoContext.Provider>
    );
}
