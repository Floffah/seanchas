"use client";

import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { useMachine } from "@xstate/react";
import { makeFunctionReference } from "convex/server";
import {
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import { StateFrom } from "xstate";
import { api } from "~/convex/api";

import { Conversation, TokenPart, TokenRefPart } from "@/lib/language/convos";
import { createConvoTokenStore } from "@/lib/state/convos";
import { ConvoUnitStepId, createConvoUnitMachine } from "@/lib/state/units";
import { UnitStepCompletions, calculateUnitCompletion } from "@/lib/util/units";

export interface ConvoContextValue extends Conversation {
    convoIdx: number;
    convoTokenState: ReturnType<typeof createConvoTokenStore>;
    state: StateFrom<ReturnType<typeof createConvoUnitMachine>>;
    saveCompletionPending: boolean;
    saveCompletionError: unknown;
    saveCompletionSuccess: boolean;

    next: () => void;
    recordStepCompletion: (
        stepId: ConvoUnitStepId,
        correctCount: number,
        questionCount: number,
    ) => void;
    finishUnit: () => Promise<void>;
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

    const [stepCompletions, setStepCompletions] = useState<UnitStepCompletions>(
        {},
    );

    const saveCompletionMutation = useMutation({
        mutationFn: useConvexMutation(api.units.upsertCompletion),
    });

    const next = useCallback(() => {
        send({ type: "NEXT" });
    }, [send]);

    const recordStepCompletion: ConvoContextValue["recordStepCompletion"] =
        useCallback(
            (stepId, correctCount, questionCount) =>
                setStepCompletions((current) => ({
                    ...current,
                    [stepId]: {
                        correctCount,
                        questionCount,
                    },
                })),
            [],
        );

    const finishUnit = useCallback(async () => {
        if (saveCompletionMutation.isPending) {
            return;
        }

        const completion = calculateUnitCompletion(stepCompletions);

        await saveCompletionMutation.mutateAsync({
            unitId: conversation.id,
            correctAnswers: completion.correctAnswers,
            questionCount: completion.questionCount,
        });
    }, [conversation.id, saveCompletionMutation, stepCompletions]);

    const resolveTokenRef = useCallback(
        ({ ref }: TokenRefPart) =>
            conversation.utterances
                .flatMap((u) => u.parts)
                .find(
                    (p): p is TokenPart => p.kind === "token" && p.id === ref,
                ),
        [conversation.utterances],
    );

    return (
        <ConvoContext.Provider
            value={{
                ...conversation,
                convoIdx: index,
                convoTokenState,
                state,
                saveCompletionPending: saveCompletionMutation.isPending,
                saveCompletionError: saveCompletionMutation.error,
                saveCompletionSuccess: saveCompletionMutation.isSuccess,

                next,
                recordStepCompletion,
                finishUnit,
                resolveTokenRef,
            }}
        >
            {children}
        </ConvoContext.Provider>
    );
}
