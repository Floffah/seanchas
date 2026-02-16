import { proxy } from "valtio";

import { Conversation, TokenId } from "./language/convos";

export const createConvoTokenState = (convo: Conversation) => {
    const tokenValues = {} as Record<
        TokenId,
        {
            currentVariant: TokenId;
        }
    >;

    for (const utterance of convo.utterances) {
        for (const part of utterance.parts) {
            if (part.kind === "token") {
                tokenValues[part.id] = {
                    currentVariant: part.id,
                };
            }
        }
    }

    return proxy({
        tokenValues,
    });
};
