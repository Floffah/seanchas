"use client";

import { XIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import Link from "next/link";

import DynamicViewTransition from "@/components/DynamicViewTransition";
import ConversationCorrectResponseQuiz from "@/components/blocks/ConversationCorrectResponseQuiz";
import ConversationIntro from "@/components/blocks/ConversationIntro";
import ConversationSubstitutionQuiz from "@/components/blocks/ConversationSubstitutionQuiz";
import ConversationSummaryQuiz from "@/components/blocks/ConversationSummaryQuiz";
import ConversationTranslationQuiz from "@/components/blocks/ConversationTranslationQuiz";
import ConversationUnitComplete from "@/components/blocks/ConversationUnitComplete";
import { ConvoUnitStepId } from "@/lib/state/units";
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
                    {convo.state.matches(ConvoUnitStepId.Intro) && (
                        <ConversationIntro key={ConvoUnitStepId.Intro} />
                    )}
                    {convo.state.matches(ConvoUnitStepId.TranslationQuiz) && (
                        <ConversationTranslationQuiz
                            key={ConvoUnitStepId.TranslationQuiz}
                        />
                    )}
                    {convo.state.matches(ConvoUnitStepId.ResponseQuiz) && (
                        <ConversationCorrectResponseQuiz
                            key={ConvoUnitStepId.ResponseQuiz}
                        />
                    )}
                    {convo.state.matches(ConvoUnitStepId.SubstitutionQuiz) && (
                        <ConversationSubstitutionQuiz
                            key={ConvoUnitStepId.SubstitutionQuiz}
                        />
                    )}
                    {convo.state.matches(ConvoUnitStepId.SummaryQuiz) && (
                        <ConversationSummaryQuiz
                            key={ConvoUnitStepId.SummaryQuiz}
                        />
                    )}
                    {convo.state.matches(ConvoUnitStepId.Complete) && (
                        <ConversationUnitComplete
                            key={ConvoUnitStepId.Complete}
                        />
                    )}
                </AnimatePresence>
            </div>
        </DynamicViewTransition>
    );
}
