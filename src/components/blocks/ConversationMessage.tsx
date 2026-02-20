"use client";

import { motion } from "motion/react";
import { Fragment, useMemo } from "react";

import MessagePartTokenRef from "@/components/blocks/MessagePartTokenRef";
import MessageTokenPart from "@/components/blocks/MessageTokenPart";
import Translation from "@/components/blocks/Translation";
import {
    ConversationSpeaker,
    DisplayEvent,
    ShowTipDisplayEvent,
} from "@/lib/language/convos";
import { cn } from "@/lib/utils";
import { useConversation } from "@/providers/ConvoProvider";

interface ConversationMessageProps {
    eventIndex: number;
    currentStep: number;
    event: Extract<DisplayEvent, { type: "show_utterance" }>;
    events: DisplayEvent[];
    onAnimationDone: () => void;
}

export default function ConversationMessage({
    eventIndex,
    currentStep,
    event,
    events,
    onAnimationDone,
}: ConversationMessageProps) {
    const convo = useConversation();

    const utterance = useMemo(
        () => convo.utterances.find((u) => u.id === event.utteranceId)!,
        [convo.utterances, event.utteranceId],
    );

    const tipEvents = useMemo(() => {
        const nextUtteranceIdx = events.findIndex(
            (e, idx) => idx > eventIndex && e.type === "show_utterance",
        );

        let tipEvents: DisplayEvent[] = [];

        if (nextUtteranceIdx === -1) {
            tipEvents = events.slice(eventIndex + 1);
        } else {
            tipEvents = events.slice(eventIndex + 1, nextUtteranceIdx);
        }

        return tipEvents
            .filter((e): e is ShowTipDisplayEvent => e.type === "show_tip")
            .map((tip, idx) => ({ tip, idx }));
    }, [events, eventIndex]);

    const localTipStep = Math.max(0, currentStep - eventIndex);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={onAnimationDone}
            className="flex flex-col gap-1"
        >
            <div
                className={cn("flex rounded-lg p-4", {
                    "self-start bg-card text-card-foreground":
                        utterance.speaker === ConversationSpeaker.A,
                    "self-end bg-primary text-primary-foreground":
                        utterance.speaker === ConversationSpeaker.B,
                })}
            >
                <p>
                    {utterance.parts.map((part, id) => (
                        <Fragment key={id}>
                            {part.kind === "text" && part.text}
                            {part.kind === "token" && (
                                <MessageTokenPart
                                    step={localTipStep}
                                    part={part}
                                    tipEvents={tipEvents}
                                />
                            )}
                            {part.kind === "token_ref" && (
                                <MessagePartTokenRef part={part} />
                            )}
                            {part.kind === "punct" && part.text}
                        </Fragment>
                    ))}
                </p>
            </div>

            <Translation utterance={utterance} />
        </motion.div>
    );
}
