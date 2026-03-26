"use client";

import { AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";

import ConversationIntro from "@/components/blocks/ConversationIntro";
import ConversationTranslationQuiz from "@/components/blocks/ConversationTranslationQuiz";
import { ConvoUnitStep, useConversation } from "@/providers/ConvoProvider";

export default function ConversationUnit({}) {
    const convo = useConversation();

    return (
        <ViewTransition name={`convo-${convo.id}`}>
            <div className="relative flex min-h-screen flex-col bg-background p-4">
                <ViewTransition name={`convo-${convo.id}-navicon`}>
                    <Link
                        href="/home"
                        className="fixed top-0 right-0 p-4 transition-transform hover:scale-110"
                    >
                        <XIcon className="size-6 text-muted-foreground" />
                    </Link>
                </ViewTransition>

                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <ViewTransition name={`convo-${convo.id}-title`}>
                            <h1 className="text-2xl font-bold">{convo.name}</h1>
                        </ViewTransition>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Unit {convo.convoIdx + 1}
                        </p>
                    </div>
                    <ViewTransition name={`convo-${convo.id}-description`}>
                        <p className="overflow-hidden text-sm text-nowrap text-ellipsis">
                            {convo.description}
                        </p>
                    </ViewTransition>
                </div>

                <AnimatePresence mode="wait">
                    {convo.step === ConvoUnitStep.Intro && (
                        <ConversationIntro key="intro" />
                    )}
                    {convo.step === ConvoUnitStep.TranslationQuiz && (
                        <ConversationTranslationQuiz key="translation-quiz" />
                    )}
                </AnimatePresence>
            </div>
        </ViewTransition>
    );
}
