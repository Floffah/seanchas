// export const conversations = [
//     {
//         name: "Greeting",
//         slug: "greeting",
//         description:
//             "A simple greeting conversation. An introduction to Gaidhlig.",
//         conversation: [
//             {
//                 speaker: ConversationSpeaker.A,
//                 textParts: [
//                     {
//                         base: "Madainn",
//                         lenitionNeeded: true,
//                         replacements: [
//                             {
//                                 word: "Oidhche",
//                                 lenitionNeeded: true,
//                             },
//                             "Feasgar",
//                         ],
//                     },
//                     {
//                         base: "math!",
//                         lenited: "mhath!",
//                     },
//                 ],
//             },
//             {
//                 speaker: ConversationSpeaker.B,
//                 textParts: [
//                     {
//                         base: "Madainn",
//                         lenitionNeeded: true,
//                         linked: {
//                             conversationIdx: 0,
//                             textPartIdx: 0,
//                         },
//                         replacements: [
//                             {
//                                 word: "Oidhche",
//                                 lenitionNeeded: true,
//                             },
//                             {
//                                 word: "Feasgar",
//                             },
//                         ],
//                     },
//                     {
//                         base: "math! ",
//                         lenited: "mhath! ",
//                     },
//                     "Ciamar a tha thu?",
//                 ],
//             },
//             {
//                 speaker: ConversationSpeaker.A,
//                 textParts: [
//                     "Tha mi math, tapadh ",
//                     {
//                         base: "leibh",
//                         replacements: ["leat"],
//                     },
//                     ". Ciamar a tha thu fhein?",
//                 ],
//             },
//             {
//                 speaker: ConversationSpeaker.B,
//                 textParts: [
//                     "Tha mi math cuideachd, tapadh ",
//                     {
//                         base: "leibh",
//                         linked: {
//                             conversationIdx: 2,
//                             textPartIdx: 1,
//                         },
//                         replacements: ["leat"],
//                     },
//                     ".",
//                 ],
//             },
//         ],
//     },
//     {
//         name: "Weather",
//         slug: "weather",
//         description: "A conversation about the weather.",
//         conversation: [
//             {
//                 speaker: ConversationSpeaker.A,
//                 textParts: ["Dè an t-sìde a th' ann?"],
//             },
//             {
//                 speaker: ConversationSpeaker.B,
//                 textParts: ["Tha i math"],
//             },
//             {
//                 speaker: ConversationSpeaker.A,
//                 textParts: ["A bheil i fuar?"],
//             },
//             {
//                 speaker: ConversationSpeaker.B,
//                 textParts: ["Tha, tha i car fuar"],
//             },
//             {
//                 speaker: ConversationSpeaker.A,
//                 textParts: ["A bheil an t-uisge ann?"],
//             },
//             {
//                 speaker: ConversationSpeaker.B,
//                 textParts: ["Chan eil, chan eil an t-uisge ann"],
//             },
//         ],
//     },
// ];

// export type Conversation = (typeof conversations)[number];
