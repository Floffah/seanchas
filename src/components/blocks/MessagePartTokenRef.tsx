"use client";

import { useMemo } from "react";

import MessageTokenPart from "@/components/blocks/MessageTokenPart";
import { Part } from "@/lib/language/convos";
import { useConversation } from "@/providers/ConvoProvider";

type Props = {
    part: Extract<Part, { kind: "token_ref" }>;
};

/**
 * Wraps MessageTokenPart and calls it with the real token if this is a token ref
 */
export default function MessagePartTokenRef({ part }: Props) {
    const convo = useConversation();

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
