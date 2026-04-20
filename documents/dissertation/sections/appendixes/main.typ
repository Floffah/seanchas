#include "1.appraisal.typ"

#pagebreak(weak: true)

#include "2.ipo.typ"

#pagebreak(weak: true)

#include "3.interim.typ"

#pagebreak(weak: true)


#include "4.meetingevidence.typ"

#pagebreak(weak: true)

= Appendix 5: Project Links

- GitHub Repository: https://github.com/Floffah/seanchas
- Deployment: https://seanchas.vercel.app/

= Appendix 6: Example Internal Conversation Format <convo-format>

#[
#set text(size: 10pt)
  
```json
{
  "id": "greeting",
  "name": "Greeting",
  "description": "A simple greeting conversation. An introduction to Gaidhlig.",
  "summaryQuestions": [
    {
      "prompt": "What was the conversation about?",
      "correctAnswer": "Greeting someone and asking how they are.",
      "incorrectAnswers": [
        "Buying food at a market.",
        "Talking about the weather forecast."
      ]
    }
  ],
  "utterances": [
    {
      "id": "greeting.u0",
      "speaker": 0,
      "translationFormat": "$greeting.math$ $greeting.daySegment$!",
      "incorrectTranslations": [
        "Good day!",
        "Hello!"
      ],
      "incorrectResponseIds": [
        "greeting.u2",
        "greeting.u3"
      ],
      "parts": [
        {
          "kind": "token",
          "id": "greeting.daySegment",
          "base": "Feasgar",
          "translation": "afternoon/evening",
          "variants": [
            {
              "id": "greeting.daySegment.oidhche",
              "text": "Oidhche",
              "features": {
                "gender": "feminine"
              },
              "translation": "night"
            },
            {
              "id": "greeting.daySegment.madainn",
              "text": "Madainn",
              "features": {
                "gender": "feminine"
              },
              "translation": "morning"
            }
          ]
        },
        {
          "kind": "text",
          "text": " "
        },
        {
          "kind": "token",
          "id": "greeting.math",
          "base": "math",
          "translation": "good",
          "transforms": [
            {
              "type": "lenition",
              "causeId": "greeting.daySegment",
              "when": {
                "variantPresent": "greeting.daySegment.madainn"
              },
              "becomes": "mhath"
            }
          ],
          "tips": [
            {
              "tipId": "adjectives_after_words",
              "side": "right",
              "when": {
                "type": "always"
              }
            }
          ]
        },
        {
          "kind": "punct",
          "text": "!"
        }
      ]
    },
    {
      "id": "greeting.u1",
      "speaker": 1,
      "translationFormat": "$greeting.math$ $greeting.daySegment$. How are $greeting.you$?",
      "incorrectTranslations": [
        "Good day. What's up?",
        "Hello. How are $greeting.you$?"
      ],
      "incorrectResponseIds": [
        "greeting.u0",
        "greeting.u3"
      ],
      "parts": [
        {
          "kind": "token_ref",
          "ref": "greeting.daySegment"
        },
        {
          "kind": "text",
          "text": " "
        },
        {
          "kind": "token_ref",
          "ref": "greeting.math"
        },
        {
          "kind": "text",
          "text": ". "
        },
        {
          "kind": "text",
          "text": "Ciamar a tha"
        },
        {
          "kind": "text",
          "text": " "
        },
        {
          "kind": "token",
          "id": "greeting.you",
          "base": "thu",
          "translation": "you",
          "variants": [
            {
              "id": "greeting.you.informal",
              "text": "sibh",
              "translation": "you",
              "features": {
                "conceptTags": [
                  "formal_you"
                ]
              }
            }
          ],
          "features": {
            "conceptTags": [
              "informal_you"
            ]
          }
        },
        {
          "kind": "punct",
          "text": "?"
        }
      ]
    },
    {
      "id": "greeting.u2",
      "speaker": 0,
      "translationFormat": "I am good, thank $greeting.tyou$. How are $greeting.you$?",
      "incorrectTranslations": [
        "I am bad, thank $greeting.tyou$. How are $greeting.you$?",
        "I am tired, thank $greeting.tyou$. How are $greeting.you$?"
      ],
      "incorrectResponseIds": [
        "greeting.u0",
        "greeting.u1"
      ],
      "substitutionQuestion": {
        "correctOverrides": {
          "greeting.you": "greeting.you.informal",
          "greeting.tyou": "greeting.tyou.formal"
        },
        "incorrectOverrides": [
          {
            "greeting.you": "greeting.you.informal"
          },
          {
            "greeting.tyou": "greeting.tyou.formal"
          }
        ]
      },
      "parts": [
        {
          "kind": "text",
          "text": "Tha mi"
        },
        {
          "kind": "text",
          "text": " "
        },
        {
          "kind": "token",
          "id": "greeting.gu",
          "base": "gu",
          "tips": [
            {
              "tipId": "gu_math",
              "when": {
                "type": "always"
              }
            }
          ]
        },
        {
          "kind": "text",
          "text": " "
        },
        {
          "kind": "text",
          "text": "math, tapadh"
        },
        {
          "kind": "text",
          "text": " "
        },
        {
          "kind": "token",
          "id": "greeting.tyou",
          "base": "leat",
          "translation": "you",
          "variants": [
            {
              "id": "greeting.tyou.formal",
              "text": "leibh",
              "translation": "you",
              "features": {
                "conceptTags": [
                  "formal_you"
                ]
              }
            }
          ],
          "features": {
            "conceptTags": [
              "informal_you"
            ]
          },
          "syncVariantWith": "greeting.you"
        },
        {
          "kind": "punct",
          "text": "."
        },
        {
          "kind": "text",
          "text": " "
        },
        {
          "kind": "text",
          "text": "Ciamar a tha"
        },
        {
          "kind": "text",
          "text": " "
        },
        {
          "kind": "token_ref",
          "ref": "greeting.you"
        },
        {
          "kind": "punct",
          "text": "?"
        }
      ]
    },
    {
      "id": "greeting.u3",
      "speaker": 1,
      "translationFormat": "I am good too, thank $greeting.tyou$.",
      "parts": [
        {
          "kind": "text",
          "text": "Tha mi gu math cuideachd, tapadh",
          "translation": "I am good too, thanks"
        },
        {
          "kind": "text",
          "text": " "
        },
        {
          "kind": "token_ref",
          "ref": "greeting.tyou"
        },
        {
          "kind": "punct",
          "text": "."
        }
      ]
    }
  ]
}
```
]