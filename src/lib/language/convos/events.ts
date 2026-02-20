import { Conversation, DisplayEvent } from "@/lib/language/convos/types";

export function conversationToEvents(convo: Conversation): DisplayEvent[] {
    const events: DisplayEvent[] = [];

    for (const utterance of convo.utterances) {
        events.push({ type: "show_utterance", utteranceId: utterance.id });

        for (const part of utterance.parts) {
            if (part.kind === "token" && part.tips) {
                for (const tipRef of part.tips) {
                    if (tipRef.when.type === "always") {
                        events.push({
                            type: "show_tip",
                            tipId: tipRef.tipId,
                            tokenId: part.id,
                            side: tipRef.side,
                        });
                    }
                }
            }
        }
    }

    return events;
}
