"use client";

import { useMemo } from "react";

import MessageTokenPart from "@/components/blocks/MessageTokenPart";
import { Part } from "@/lib/language/convos";
import { useConversation } from "@/providers/ConvoProvider";

interface MessagePartTokenRefProps {
    part: Extract<Part, { kind: "token_ref" }>;
}

export default function MessagePartTokenRef({
    part,
}: MessagePartTokenRefProps) {
    const convo = useConversation();

    const token = useMemo(() => convo.resolveTokenRef(part), [convo, part]);

    if (!token) {
        return <span className="text-destructive">{part.ref}</span>;
    }

    return <MessageTokenPart part={token} step={-1} tipEvents={[]} />;
}
