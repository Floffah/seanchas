import { createMachine } from "xstate";

export function createConvoUnitMachine() {
    return createMachine({
        id: "conversationUnit",
        initial: "intro",
        types: {
            events: {} as { type: "NEXT" },
        },
        states: {
            intro: {
                on: {
                    NEXT: "translationQuiz",
                },
            },
            translationQuiz: {
                on: {
                    NEXT: "responseQuiz",
                },
            },
            responseQuiz: {
                on: {
                    NEXT: "substitutionQuiz",
                },
            },
            substitutionQuiz: {
                on: {
                    NEXT: "complete",
                },
            },
            complete: {},
        },
    });
}
