// Markers, this import points to <https://github.com/Floffah/documents/blob/main/typst.toml>, where the template source exists. It is imported via Typst Web's private versioning to keep the dissertation & project repository as clean as possible (I use this template for other documents and coursework too). It was originally generated via Typst Web's template wizard and then adapted with inspiration from the template Ilm by Muhammad Talal Anwar (https://github.com/talal/ilm). Template is licensed pro forma under 'MIT No Attribution' in cooperation with inspired work
#import "@local/napier-formal-template-base:0.1.4": *
#import "@preview/hydra:0.6.2": hydra, anchor

// doc settings
#let gaidhlig = "Gàidhlig"
#show "Gaidhlig": gaidhlig

#include "sections/declaration.typ"

#pagebreak(weak: true)

#show: project.with(
  title: [Gaidhlig Language Learning Web Application Research & Dissertation],
  logo: "napier",
  authors: (
    (name: "Ramsay Foy (40646655@live.napier.ac.uk)", affiliation: "Author"),
    (name: "Pete Barclay (P.Barclay@napier.ac.uk)", affiliation: "Supervisor"),
    (name: "Simon Wells (S.Wells@napier.ac.uk)", affiliation: "Second Marker")
  ),
  authorsVertical: true,
  date: datetime.today().display("[day] [month repr:long] [year]"),
  abstract: "placeholder",

  formal: true,
  figure-index: (
    enabled: true
  ),
  bibliography: none,
  word-counter: true,
)

#set text(lang: "en", region: "gb")
#set page(header: context {
  anchor()
  [Ramsay Foy]
  // h(1fr)
  // [BEng Software Engineering]
  h(1fr)
  [40646655]
}, footer: context {
  emph(hydra(1))
  h(1fr)
  counter(page).display()
})

#[
#show: word-count.with(exclude: <no-wc>)

#include "sections/introduction.typ"

#pagebreak()

#include "sections/litreview.typ"

#pagebreak()

#include "sections/method&impl.typ"

#pagebreak(weak: true)

#include "sections/zconclusion.typ"

]

#set heading(numbering: none)
  
#pagebreak()

#include "sections/appendixes/main.typ"

#pagebreak(weak: true)

#bibliography("./zotero.bib", style: "american-psychological-association")
