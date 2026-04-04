"use client";

import { useMachine } from "@xstate/react";
import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { StateFrom } from "xstate";

import { Conversation, TokenPart, TokenRefPart } from "@/lib/language/convos";
import { createConvoTokenStore } from "@/lib/state/convos";
import { createConvoUnitMachine } from "@/lib/state/units";

export const conversationUnitSteps = ["intro", "translationQuiz"] as const;

export interface ConvoContextValue extends Conversation {
    convoIdx: number;
    convoTokenState: ReturnType<typeof createConvoTokenStore>;
    state: StateFrom<ReturnType<typeof createConvoUnitMachine>>;

    next: () => void;
    resolveTokenRef: (ref: TokenRefPart) => TokenPart | undefined;
}

const ConvoContext = createContext<ConvoContextValue>(null!);

export const useConversation = () => useContext(ConvoContext);

export default function ConvoProvider({
    conversation,
    index,
    children,
}: PropsWithChildren<{ conversation: Conversation; index: number }>) {
    const conversationUnitMachine = useMemo(() => createConvoUnitMachine(), []);
    const [state, send] = useMachine(conversationUnitMachine);

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
                convoTokenState,
                state,

                next: () => send({ type: "NEXT" }),
                resolveTokenRef,
            }}
        >
            {children}
        </ConvoContext.Provider>
    );
}
