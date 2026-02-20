import { Tip } from "@/lib/language/convos/types";

export const globalTips: Record<string, Tip> = {
    lenition_math: {
        id: "lenition_math",
        title: "See what happened there?",
        body: "After certain words, the next word can change at the start. Here, *math* becomes *mhath*.",
        policy: { show: "once" },
    },
    adjectives_after_words: {
        id: "adjectives_after_words",
        title: "Look!",
        body: "Adjectives always come after the thing they're describing in Gaelic.",
    },
    gu_math: {
        id: "gu_math",
        title: "Gu-ing",
        body: "Notice here we can't just say math (good) on its own. We have to add 'gu' in front to make it an adverb. This changes the meaning more to 'well'!",
    },
};
