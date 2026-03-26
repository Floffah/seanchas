"use client";

import { useMemo } from "react";
import { useSnapshot } from "valtio";

import { TokenPart, TokenRefPart, Utterance } from "@/lib/language/convos";
import { useConversation } from "@/providers/ConvoProvider";

interface TranslationProps {
    utterance: Utterance;
    overwriteFormat?: string;
}

export default function Translation({
    utterance,
    overwriteFormat,
}: TranslationProps) {
    const convo = useConversation();
    const tokenState = useSnapshot(convo.convoTokenState);

    const translationFormat = overwriteFormat ?? utterance.translationFormat;

    return useMemo(() => {
        let final = "";

        let parsingTokenId = false;
        let accum = "";

        for (const char of translationFormat) {
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
                            const token = convo.resolveTokenRef(tokenRef);

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
                            (p): p is TokenPart =>
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
    }, [translationFormat, tokenState.tokenValues, utterance.parts, convo]);
}
