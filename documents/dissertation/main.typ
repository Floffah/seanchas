// Markers, this import points to <https://github.com/Floffah/documents/blob/main/typst.toml>, where the template source exists. It is imported via Typst Web's private versioning to keep the dissertation & project repository as clean as possible (I use this template for other documents and coursework too). It was originally generated via Typst Web's template wizard and then adapted with inspiration from the template Ilm by Muhammad Talal Anwar (https://github.com/talal/ilm). Template is licensed pro forma under 'MIT No Attribution' in cooperation with inspired work
#import "@local/napier-formal-template-base:0.1.10": *
#import "@preview/hydra:0.6.2": hydra, anchor

// doc settings
#let gaidhlig = "Gàidhlig"
#show "Gaidhlig": gaidhlig

#include "sections/declaration.typ"

#pagebreak(weak: true)

#show: project.with(
  title: [A Conversation-Based Approach to Mobile Learning for Scottish Gaelic],
  logo: "napier",
  authors: (
    (name: "Ramsay Foy (40646655@live.napier.ac.uk)", affiliation: "Author"),
    (name: "Dr Pete Barclay (P.Barclay@napier.ac.uk)", affiliation: "Supervisor"),
    (name: "Dr Simon Wells (S.Wells@napier.ac.uk)", affiliation: "Second Marker")
  ),
  authorsVertical: true,
  date: datetime.today().display("[day] [month repr:long] [year]"),
  abstract: [
    This project investigates how Mobile-Assisted Language Learning (MALL) frameworks can be applied to the learning of Scottish Gaelic (Gaidhlig) in a space where there are limited accessible learning resources and support for differing learning styles. Existing solutions such as Duolingo and SpeakGaelic provide structured content but do not cater to all learning styles, particularly those requiring contextual and interactive approaches.

    In response, a web application was designed and implemented around pre-scripted conversation-based units. These units present users with contextualised dialog and then tests users with various quizzes related to translation, response selection, substitution, and summarisation.

    The application incorporates techniques such as spaced repetition, constructive feedback, and mistake tracking which are informed by literature on second language acquisition, motivation, and mobile learning frameworks.

    The application was evaluated through user testing and analysis using the PF4M framework, alongside comparison with existing language learning tools. Results indicate that users found the system intuitive and engaging, with the conversation-based format supporting comprehension and pacing. However, some limitations were identified in promoting deeper language understanding and learner confidence.

    The findings suggest that contextualised and mobile-first learning systems can provide an effective and accessible supplement to existing Gaidhlig learning resources.
  ],

  external-link-circle: false,
  formal: true,
  figure-index: (
    enabled: true
  ),
  bibliography: none,
  word-counter: ( enabled: true, auto-include-body: false ),
)

#show link: underline
#set text(lang: "en", region: "gb")

#[
#set page(header: context {
  anchor()
  [Ramsay Foy]
  h(1fr)
  [40646655]
}, footer: context {
  emph(hydra(1))
  h(1fr)
  counter(page).display()
})

#show: word-count.with(exclude: <no-wc>)

#include "sections/introduction.typ"

#pagebreak()

#include "sections/litreview.typ"

#pagebreak()

#include "sections/method&impl.typ"

#pagebreak(weak: true)

#include "sections/zconclusion.typ"
]


#set page(header: context {
  anchor()
  [Ramsay Foy]
  h(1fr)
  [40646655]
}, footer: context {
  emph(hydra(1))
})

#set heading(numbering: none)
  
#pagebreak()

#include "sections/appendixes/main.typ"

#pagebreak(weak: true)

#bibliography(("./zotero.bib", "./zotero2.bib", "./zotero3.bib"), style: "american-psychological-association")
