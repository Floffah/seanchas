#import "@local/napier-formal-template-base:0.1.4": *
#import "@preview/hydra:0.6.2": hydra, anchor

#let gaidhlig = "Gàidhlig"

#show: project.with(
  title: [#gaidhlig Language Learning Web Application Research & Dissertation],
  logo: "napier",
  authors: (
    (name: "Ramsay Foy (40646655)", affiliation: "Author"),
    (name: "Pete Barclay (P.Barclay@napier.ac.uk)", affiliation: "Supervisor"),
    (name: "Simon Wells (S.Wells@napier.ac.uk)", affiliation: "Second Marker")
  ),
  authorsVertical: true,
  date: "22 April 2026",
  abstract: "oooo",

  formal: true,
  figure-index: (
    enabled: true
  ),
  bibliography: none,
  word-counter: true,
  declaration: "[x] NO: I have not used such tools"
)

#set text(lang: "en", region: "uk")
#set page(header: context {
  anchor()
}, footer: context [
  #hydra(1)
  #h(1fr)
  #counter(page).display()
])

= Introduction

#pagebreak()
= Literature Review

== Introduction

== Techniques for Language Learning and Acquisition

=== Learning Endangered Languages

=== Modern Uptake of Scottish #gaidhlig

== LLMs with Endangered Languages

== Scripting conversations in LLMs

== Evaluation

#pagebreak()
= Methodology

== Requirements Analysis

== Product Description and Architecture

== Software Development Methodology

== Third-Party Packages

== Evaluation Methodology

== Project in Practice

== Implementation

== Testing

== Evaluation

#pagebreak()
= Conclusion

#set heading(numbering: none)
  
#pagebreak()
= Appendix 1: Personal Appraisal

#pagebreak()
= Appendix 2: IPO Form & Feedback

#pagebreak()
= Appendix 4: Interim Report

#pagebreak()
= Appendix 5: Meeting Evidence

#[
  #set heading(outlined: false)
  #counter(heading).update(0)

  See related individuals on the cover page. Diaries were recorded on the day of a supervisor meeting. They are mostly Tuesday to Tuesday, with the progress covering the previous 7 days (unless specified), and the objectives covering the next 7 days.

  == Tuesday 30 September

  === Objectives
  - Start working on the IPO document
  - Expand the details of the idea and scope

  === Progress
  - The basic idea of my project was decided by this point
  - Secured supervisor & second marker
  - Began weekly meetings with supervisor

  === Supervisor Comments
  - Looked at prior-art
  - Talked about how the details of the project will work out
  - Talked about what I will research as part of the literature review

  #line(length: 100%)
  == Tuesday 7 October

  === Objectives
  -	Complete the IPO document and submit.
  -	Preparatively looking into searches for literature review references.

  === Progress
  - IPO document first draft completed (it was submitted and marked by the end of the week)
  - Project idea more solidified

  === Supervisor Comments
  
  Points recorded from the meeting:
  - Think about how to evaluate the website?
  - Try different searches : “how to teach endangered languages” , “language teaching website” , “lesser used language teaching  ”
  - What is ‘your angle’ on the project? How is your app/website different? You should do more than just repackage ‘learn Gaelic’ … add your own twist to it

  #line(length: 100%)
  == Tuesday 14 October

  _Holiday_
  
  == Tuesday 21 October

  _Reading week_

  == Tuesday 28 October

  === Objectives

  - Design headings for the dissertation document
  - Start literature review writing

  === Progress

  Just back from holiday, no progress this week

  === Supervisor Comments

  Points recorded from the meeting:
  - Chatted again about what makes my project distinct
  - Looked at some prior-art
  - Anki
  - An Faclair Beag
  - A-Rithist mobile app
  - #link("www.nls.uk/whats-on/fianna-in-focus/")[Fianna in Focus event at Scottish National Library]

  #line(length: 100%)
  == Tuesday 4 November

  === Objectives
  - Continue work on literature review

  === Progress
  - Dissertation outline written
  - Meeting diaries consolidated
  - Began literature review academic research
]

#bibliography(("./references.yml", "./zotero.bib"), style: "american-psychological-association")