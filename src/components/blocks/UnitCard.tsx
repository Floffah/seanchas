import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";

import { Conversation } from "@/lib/language/convos";
import { cn } from "@/lib/utils";

export default function UnitCard({
    convo,
    active,
}: {
    convo: Conversation;
    active?: boolean;
}) {
    return (
        <ViewTransition name={`convo-${convo.id}`} key={convo.id}>
            <Link
                className={cn(
                    "flex cursor-pointer items-center rounded-lg bg-card p-4 transition-transform hover:scale-105",
                    active && "border border-muted",
                )}
                href={`/${convo.id}`}
            >
                <div className="flex flex-col items-start gap-2 text-left">
                    <ViewTransition name={`convo-${convo.id}-title`}>
                        <h3 className="text-xl font-semibold">{convo.name}</h3>
                    </ViewTransition>
                    <ViewTransition name={`convo-${convo.id}-description`}>
                        <p className="text-sm">{convo.description}</p>
                    </ViewTransition>
                    <p className="text-sm text-muted-foreground">
                        {convo.utterances.length} phrases
                    </p>
                </div>
                <ViewTransition name={`convo-${convo.id}-navicon`}>
                    <ChevronRightIcon className="size-6 text-muted-foreground" />
                </ViewTransition>
            </Link>
        </ViewTransition>
    );
}
