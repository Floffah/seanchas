"use client";

import { XIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import Link from "next/link";

import DynamicViewTransition from "@/components/DynamicViewTransition";
import ConversationIntro from "@/components/blocks/ConversationIntro";
import ConversationTranslationQuiz from "@/components/blocks/ConversationTranslationQuiz";
import { useConversation } from "@/providers/ConvoProvider";

export default function ConversationUnit({}) {
    const convo = useConversation();

    return (
        <DynamicViewTransition name={`convo-${convo.id}`}>
            <div className="relative flex min-h-screen flex-col bg-background p-4">
                <DynamicViewTransition name={`convo-${convo.id}-navicon`}>
                    <Link
                        href="/home"
                        className="fixed top-0 right-0 p-4 transition-transform hover:scale-110"
                    >
                        <XIcon className="size-6 text-muted-foreground" />
                    </Link>
                </DynamicViewTransition>

                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <DynamicViewTransition name={`convo-${convo.id}-title`}>
                            <h1 className="text-2xl font-bold">{convo.name}</h1>
                        </DynamicViewTransition>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Unit {convo.convoIdx + 1}
                        </p>
                    </div>
                    <DynamicViewTransition
                        name={`convo-${convo.id}-description`}
                    >
                        <p className="overflow-hidden text-sm text-nowrap text-ellipsis">
                            {convo.description}
                        </p>
                    </DynamicViewTransition>
                </div>

                <AnimatePresence mode="wait">
                    {convo.state.matches("intro") && (
                        <ConversationIntro key="intro" />
                    )}
                    {convo.state.matches("translationQuiz") && (
                        <ConversationTranslationQuiz key="translation-quiz" />
                    )}
                </AnimatePresence>
            </div>
        </DynamicViewTransition>
    );
}
