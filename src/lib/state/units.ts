import { createMachine } from "xstate";

export enum ConvoUnitStepId {
    Intro = "intro",
    SummaryQuiz = "summaryQuiz",
    TranslationQuiz = "translationQuiz",
    ResponseQuiz = "responseQuiz",
    SubstitutionQuiz = "substitutionQuiz",
    Complete = "complete",
}

export function createConvoUnitMachine() {
    return createMachine({
        id: "conversationUnit",
        initial: ConvoUnitStepId.Intro,
        types: {
            events: {} as { type: "NEXT" },
        },
        states: {
            [ConvoUnitStepId.Intro]: {
                on: {
                    NEXT: ConvoUnitStepId.SummaryQuiz,
                },
            },
            [ConvoUnitStepId.SummaryQuiz]: {
                on: {
                    NEXT: ConvoUnitStepId.TranslationQuiz,
                },
            },
            [ConvoUnitStepId.TranslationQuiz]: {
                on: {
                    NEXT: ConvoUnitStepId.ResponseQuiz,
                },
            },
            [ConvoUnitStepId.ResponseQuiz]: {
                on: {
                    NEXT: ConvoUnitStepId.SubstitutionQuiz,
                },
            },
            [ConvoUnitStepId.SubstitutionQuiz]: {
                on: {
                    NEXT: ConvoUnitStepId.Complete,
                },
            },
            [ConvoUnitStepId.Complete]: {},
        },
    });
}
