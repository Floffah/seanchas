"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import ConversationMessage from "@/components/blocks/ConversationMessage";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useAdvance } from "@/lib/hooks/useAdvance";
import { useFeatures } from "@/lib/hooks/useFeatures";
import {
    ShowUtteranceDisplayEvent,
    conversationToEvents,
} from "@/lib/language/convos";
import { tipsStore } from "@/lib/state/features";
import { useConversation } from "@/providers/ConvoProvider";

const MotionButton = motion.create(Button);

export default function ConversationIntro() {
    const convo = useConversation();
    const { tips } = useFeatures();

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

    const { step } = useAdvance({
        canAdvance: () => animationDone && tips.firstIntroSeen,
    });

    return (
        <>
            <Dialog
                open={!tips.firstIntroSeen}
                onOpenChange={(open) => {
                    if (!open) {
                        tipsStore.firstIntroSeen = true;
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Your First Unit!</DialogTitle>
                        <DialogDescription>
                            In Seanchas, units are structured around
                            conversations.
                            <br />
                            <br />
                            You will be shown a conversation, then asked
                            questions about it. Don&apos;t worry, you don&apos;t
                            need to memorise it or understand it perfectly!
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose>
                            <Button className="px-6">Okay!</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <motion.div
                animate={{
                    opacity: 1,
                }}
                exit={{
                    opacity: 0,
                }}
                className="flex grow flex-col items-center p-4"
            >
                <div className="flex w-full max-w-lg grow flex-col gap-4">
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
                    {step <= utteranceEvents.length && (
                        <p className="self-center text-sm text-muted-foreground">
                            Press space to advance
                        </p>
                    )}
                    {step > utteranceEvents.length && (
                        <MotionButton
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            size="lg"
                            onClick={() => convo.progress()}
                        >
                            I&apos;ve got it!
                        </MotionButton>
                    )}
                </div>
            </motion.div>
        </>
    );
}
