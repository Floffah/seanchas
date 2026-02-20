"use client";

import { useMemo, useState } from "react";

import ConversationMessage from "@/components/blocks/ConversationMessage";
import { useAdvance } from "@/lib/hooks/useAdvance";
import {
    ShowUtteranceDisplayEvent,
    conversationToEvents,
} from "@/lib/language/convos";
import { useConversation } from "@/providers/ConvoProvider";

export default function ConversationIntro() {
    const convo = useConversation();

    const events = useMemo(() => conversationToEvents(convo), [convo]);
    const utteranceEvents = useMemo(
        () =>
            events
                .map((e, idx) => [e, idx] as const)
                .filter(
                    (e): e is [ShowUtteranceDisplayEvent, number] =>
                        e[0].type === "show_utterance",
                ),
        [events],
    );

    const [animationDone, setAnimationDone] = useState(false);

    const { step } = useAdvance({ canAdvance: () => animationDone });

    return (
        <div className="flex flex-col items-center p-4">
            <div className="flex w-full max-w-lg flex-col gap-4">
                {utteranceEvents.map(
                    ([event, id]) =>
                        step >= id && (
                            <ConversationMessage
                                key={event.utteranceId}
                                id={id}
                                event={event}
                                events={events}
                                onDone={() => setAnimationDone(true)}
                            />
                        ),
                )}
                <div className="shrink-0 grow" />
                {step < utteranceEvents.length && (
                    <p className="self-center text-sm text-muted-foreground">
                        Press space to advance
                    </p>
                )}
            </div>
        </div>
    );
}
