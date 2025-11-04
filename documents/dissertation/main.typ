// Markers, this import points to <https://github.com/Floffah/documents/blob/main/typst.toml>, where the template source exists. It is imported via Typst Web's private versioning to keep the dissertation & project repository as clean as possible (I use this template for other documents and coursework too). It was originally generated via Typst Web's template wizard and then adapted with inspiration from the template Ilm by Muhammad Talal Anwar (https://github.com/talal/ilm). Template is licensed pro forma under 'MIT No Attribution' in cooperation with inspired work
#import "@local/napier-formal-template-base:0.1.4": *
#import "@preview/hydra:0.6.2": hydra, anchor

#let gaidhlig = "Gàidhlig"

#show: project.with(
  title: [#gaidhlig Language Learning Web Application Research & Dissertation],
  logo: "napier",
  authors: (
    (name: "Ramsay Foy (40646655@live.napier.ac.uk)", affiliation: "Author"),
    (name: "Pete Barclay (P.Barclay@napier.ac.uk)", affiliation: "Supervisor"),
    (name: "Simon Wells (S.Wells@napier.ac.uk)", affiliation: "Second Marker")
  ),
  authorsVertical: true,
  date: "22 April 2026",
  abstract: "placeholder",

  formal: true,
  figure-index: (
    enabled: true
  ),
  bibliography: none,
  word-counter: true,
  declaration: "[x] NO: I have not used such tools.\nNote: Grammarly was used in the capacity of grammar fixes and readability suggestions, with the generative AI features disabled."
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

This project aims to research and develop a language learning website for the endangered language Scottish Gaelic (#gaidhlig). Two essential aspects will be discussed: how languages are best learned, and how those techniques apply to a digital application such as a website.

The #gaidhlig language is endangered, and while there are accessible ways to learn it, they don't work for everyone and don't cater for all learning styles. Tools like SpeakGaelic exist, which provide structured television and podcast episodes alongside a website with quizzes on their content. Duolingo has a course for #gaidhlig\; however, it doesn't teach common phrases or words, and the voices use a wide range of accents and dialects. These tools do work for a large group of people, but some rely on a wider context and more interactive learning techniques. Such tools do not exist yet, and most people don't have #gaidhlig speakers in their lives to help them.

The project aims to create a conversation-based learning resource. It will have set units structured as a single conversation, starting with common ones, and then administering a variety of quizzes. The exact quizzes and the surrounding techniques require research to find the best ways to teach.

#pagebreak()
= Literature Review

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

#pagebreak(weak: true)
= Conclusion

#set heading(numbering: none)
  
#pagebreak()
= Appendix 1: Personal Appraisal

#pagebreak(weak: true)
= Appendix 2: IPO Form & Feedback

#pagebreak(weak: true)
= Appendix 4: Interim Report

#pagebreak(weak: true)
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
  - Initial template for documents & application defined

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
  - Looked at some prior art
  - Anki
  - An Faclair Beag
  - A-Rithist mobile app
  - #link("www.nls.uk/whats-on/fianna-in-focus/")[Fianna in Focus event at Scottish National Library]

  #line(length: 100%)
  == Tuesday 4 November

  === Objectives
  - Continue work on literature review
    - A couple of sections completed & reasonable amount of references

  === Progress
  - Dissertation outline written
  - Meeting diaries consolidated
  - Began literature review academic research

  === Supervisor Comments
  Points recorded from the meeting:
  - #gaidhlig word frequency list: https://github.com/innesmck/GaelicFrequencyLists
]

#pagebreak(weak: true)

#bibliography(("./hayagriva.yml", "./zotero.bib"), style: "american-psychological-association")
