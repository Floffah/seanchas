"use client";

import { useMemo } from "react";
import { useSnapshot } from "valtio";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { DisplayEvent, Part, globalTips } from "@/lib/language/convos";
import { cn } from "@/lib/utils";
import { useConversation } from "@/providers/ConvoProvider";

type Props = {
    part: Extract<Part, { kind: "token" }>;
    tipEvents: {
        tip: Extract<DisplayEvent, { type: "show_tip" }>;
        idx: number;
    }[];
    step: number;
};

export default function MessageTokenPart({ part, step, tipEvents }: Props) {
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
