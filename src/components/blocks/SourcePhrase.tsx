"use client";

import { useMemo } from "react";
import { useSnapshot } from "valtio";

import { Utterance } from "@/lib/language/convos";
import { useConversation } from "@/providers/ConvoProvider";

interface SourcePhraseProps {
    utterance: Utterance;
}

export default function SourcePhrase({ utterance }: SourcePhraseProps) {
    const convo = useConversation();
    const tokenState = useSnapshot(convo.convoTokenState);

    return useMemo(() => {
        let final = "";

        for (const part of utterance.parts) {
            if (part.kind === "text" || part.kind === "punct") {
                final += part.text;
                continue;
            }

            const token =
                part.kind === "token_ref" ? convo.resolveTokenRef(part) : part;

            if (!token) {
                final += part.kind === "token_ref" ? part.ref : part.id;
                continue;
            }

            const currentVariantId =
                tokenState.tokenValues[token.id]?.currentVariant;
            const currentVariant = token.variants?.find(
                (variant) => variant.id === currentVariantId,
            );

            final += currentVariant?.text ?? token.base;
        }

        return final;
    }, [convo, tokenState.tokenValues, utterance.parts]);
}
