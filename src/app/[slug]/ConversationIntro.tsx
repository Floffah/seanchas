"use client";

import { motion } from "motion/react";
import { Fragment, useMemo, useState } from "react";
import { useSnapshot } from "valtio";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAdvance } from "@/lib/hooks/useAdvance";
import {
    ConversationSpeaker,
    DisplayEvent,
    Part,
    TokenPart,
    TokenRefPart,
    Utterance,
    conversationToEvents,
    globalTips,
} from "@/lib/language/convos";
import { cn } from "@/lib/utils";
import { useConversation } from "@/providers/ConvoProvider";

export default function ConversationIntro() {
    const convo = useConversation();

    const events = useMemo(() => conversationToEvents(convo), [convo]);

    const [animationDone, setAnimationDone] = useState(false);

    const { step } = useAdvance({ canAdvance: () => animationDone });

    return (
        <div className="flex flex-col items-center p-4">
            <div className="flex w-full max-w-lg flex-col gap-4">
                {events.map(
                    (event, id) =>
                        step >= id &&
                        event.type === "show_utterance" && (
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
                <p className="self-center text-sm text-muted-foreground">
                    Press space to advance
                </p>
            </div>
        </div>
    );
}

function ConversationMessage({
    id,
    event,
    events,
    onDone,
}: {
    id: number;
    event: Extract<DisplayEvent, { type: "show_utterance" }>;
    events: DisplayEvent[];
    onDone: () => void;
}) {
    const convo = useConversation();

    const utterance = useMemo(
        () => convo.utterances.find((u) => u.id === event.utteranceId)!,
        [convo],
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
    }, [events]);

    const { step } = useAdvance({
        canAdvance: (step) => step <= tipEvents.length,
        onAdvance: (step) => {
            if (step >= tipEvents.length) {
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

function MessageTokenPart({
    part,
    step,
    tipEvents,
}: {
    part: Extract<Part, { kind: "token" }>;
    tipEvents: {
        tip: Extract<DisplayEvent, { type: "show_tip" }>;
        idx: number;
    }[];
    step: number;
}) {
    const convo = useConversation();
    const convoTokens = useSnapshot(convo.convoTokenState);

    const currentVariantId = convoTokens.tokenValues[part.id]?.currentVariant;
    const currentVariant = part.variants?.find(
        (v) => v.id === currentVariantId,
    );
    const tokenText = currentVariant?.text ?? part.base;

    const thisTokenTipEvents = useMemo(
        () => tipEvents.filter((e) => e.tip.tokenId === part.id),
        [tipEvents, part.id],
    );

    const currentTooltipData = thisTokenTipEvents.find(
        (e) => e.idx === step - 1,
    );
    const currentTooltip = currentTooltipData
        ? globalTips[currentTooltipData.tip.tipId]
        : null;

    return (
        <Tooltip open={!!currentTooltip}>
            <TooltipTrigger asChild>
                <span
                    className={cn({
                        underline: !!currentTooltip,
                    })}
                >
                    {tokenText}
                </span>
            </TooltipTrigger>
            <TooltipContent
                className="flex flex-col"
                side={currentTooltipData?.tip.side}
            >
                {currentTooltip?.title && (
                    <p className="text-sm font-bold">{currentTooltip.title}</p>
                )}
                {currentTooltip?.body && (
                    <p className="">{currentTooltip.body}</p>
                )}
            </TooltipContent>
        </Tooltip>
    );
}

/**
 * Wraps MessageTokenPart and calls it with the real token if this is a token ref
 */
function MessagePartTokenRef({
    part,
}: {
    part: Extract<Part, { kind: "token_ref" }>;
}) {
    const convo = useConversation();
    const convoTokens = useSnapshot(convo.convoTokenState);

    const token = useMemo(
        () =>
            convo.utterances
                .flatMap((u) => u.parts)
                .find(
                    (p): p is Extract<Part, { kind: "token" }> =>
                        p.kind === "token" && p.id === part.ref,
                ),
        [convo, part.ref],
    );

    if (!token) {
        return <span className="text-destructive">{part.ref}</span>;
    }

    return <MessageTokenPart part={token} step={-1} tipEvents={[]} />;
}

function Translation({ utterance }: { utterance: Utterance }) {
    const convo = useConversation();
    const tokenState = useSnapshot(convo.convoTokenState);

    const translation = useMemo(() => {
        let final = "";

        let parsingTokenId = false;
        let accum = "";

        for (const char of utterance.translationFormat) {
            if (char === "$") {
                if (parsingTokenId) {
                    const tokenId = accum;
                    const tokenValue = tokenState.tokenValues[tokenId];

                    if (tokenValue) {
                        let baseToken = utterance.parts.find(
                            (p): p is TokenPart =>
                                p.kind === "token" && p.id === tokenId,
                        );
                        const tokenRef = utterance.parts.find(
                            (t): t is TokenRefPart =>
                                t.kind === "token_ref" && t.ref === tokenId,
                        );
                        if (tokenRef) {
                            const token = convo.utterances
                                .flatMap((u) => u.parts)
                                .find(
                                    (
                                        p,
                                    ): p is Extract<Part, { kind: "token" }> =>
                                        p.kind === "token" &&
                                        p.id === tokenRef.ref,
                                );

                            baseToken = token ?? baseToken;
                        }

                        if (
                            baseToken &&
                            tokenValue.currentVariant === baseToken.id
                        ) {
                            final += baseToken.translation;
                        } else {
                            const variant = baseToken?.variants?.find(
                                (v) => v.id === tokenValue.currentVariant,
                            );

                            final += variant?.translation ?? tokenId;
                        }
                    } else {
                        const baseToken = utterance.parts.find(
                            (p): p is Extract<Part, { kind: "token" }> =>
                                p.kind === "token" && p.id === tokenId,
                        );

                        final += baseToken?.translation ?? tokenId;
                    }

                    parsingTokenId = false;
                } else {
                    accum = "";
                    parsingTokenId = true;
                }
            } else {
                if (parsingTokenId) {
                    accum += char;
                } else {
                    final += char;
                }
            }
        }

        final = final.charAt(0).toUpperCase() + final.substring(1);

        return final;
    }, [utterance.translationFormat, tokenState.tokenValues]);

    return (
        <p
            className={cn("text-sm text-muted-foreground", {
                "text-right": utterance.speaker === ConversationSpeaker.B,
            })}
        >
            {translation}
        </p>
    );
}
