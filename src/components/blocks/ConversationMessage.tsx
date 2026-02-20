"use client";

import { motion } from "motion/react";
import { Fragment, useMemo } from "react";

import MessagePartTokenRef from "@/components/blocks/MessagePartTokenRef";
import MessageTokenPart from "@/components/blocks/MessageTokenPart";
import Translation from "@/components/blocks/Translation";
import { useAdvance } from "@/lib/hooks/useAdvance";
import { ConversationSpeaker, DisplayEvent } from "@/lib/language/convos";
import { cn } from "@/lib/utils";
import { useConversation } from "@/providers/ConvoProvider";

type Props = {
    id: number;
    event: Extract<DisplayEvent, { type: "show_utterance" }>;
    events: DisplayEvent[];
    onDone: () => void;
};

export default function ConversationMessage({
    id,
    event,
    events,
    onDone,
}: Props) {
    const convo = useConversation();

    const utterance = useMemo(
        () => convo.utterances.find((u) => u.id === event.utteranceId)!,
        [convo.utterances, event.utteranceId],
    );

    const tipEvents = useMemo(() => {
        const nextUtteranceIdx = events.findIndex(
            (e, idx) => idx > id && e.type === "show_utterance",
        );

        let tipEvents: Extract<DisplayEvent, { type: "show_tip" }>[] = [];

        if (nextUtteranceIdx === -1) {
            tipEvents = events
                .slice(id + 1)
                .filter((e) => e.type === "show_tip");
        } else {
            tipEvents = events
                .slice(id + 1, nextUtteranceIdx)
                .filter((e) => e.type === "show_tip");
        }

        return tipEvents.map((tip, idx) => ({ tip, idx }));
    }, [events, id]);

    const { step } = useAdvance({
        canAdvance: (step) => step <= tipEvents.length,
        onAdvance: (step) => {
            if (tipEvents.length > 0 && step >= tipEvents.length) {
                onDone();
            }
        },
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={() => {
                if (tipEvents.length === 0) {
                    onDone();
                    return;
                }
            }}
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
                                    step={step}
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
