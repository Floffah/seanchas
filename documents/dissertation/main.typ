// Markers, this import points to <https://github.com/Floffah/documents/blob/main/typst.toml>, where the template source exists. It is imported via Typst Web's private versioning to keep the dissertation & project repository as clean as possible (I use this template for other documents and coursework too). It was originally generated via Typst Web's template wizard and then adapted with inspiration from the template Ilm by Muhammad Talal Anwar (https://github.com/talal/ilm). Template is licensed pro forma under 'MIT No Attribution' in cooperation with inspired work
#import "@local/napier-formal-template-base:0.1.4": *
#import "@preview/hydra:0.6.2": hydra, anchor

#let gaidhlig = "Gàidhlig"
#show "Gaidhlig": gaidhlig

#let notes_enabled = true

#show: project.with(
  title: [Gaidhlig Language Learning Web Application Research & Dissertation],
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

#let note_pill = content => {
  if notes_enabled [
    #box(text([#emoji.construction #content #emoji.construction], size: 10pt), fill: gray.transparentize(80%), inset: 5pt, radius: 10pt)
    <no-wc>
  ]
}

= Introduction 
#note_pill("DRAFT SECTION!")

This project aims to research and develop a language learning website for the endangered language Scottish Gaelic (Gaidhlig). Two essential aspects will be discussed: how languages are best learned, and how those techniques apply to a digital application such as a website.

The Gaidhlig language is endangered, and while there are accessible ways to learn it, they don't work for everyone and don't cater for all learning styles. Tools like SpeakGaelic exist, which provide structured television and podcast episodes alongside a website with quizzes on their content. Duolingo has a course for Gaidhlig\; however, it doesn't teach common phrases or words, and the voices use a wide range of accents and dialects. These tools do work for a large group of people, but some rely on a wider context and more interactive learning techniques. Such tools do not exist yet, and most people don't have Gaidhlig speakers in their lives to help them.

The project aims to create a conversation-based learning resource. It will have set units structured as a single conversation, starting with common ones, and then administering a variety of quizzes. The exact quizzes and the surrounding techniques require research to find the best ways to teach.

#pagebreak()

#word-count(exclude: <no-wc>, total => [
= Literature Review

#note_pill([lit review section total words: #total.words])

The study of language learning has existed for centuries, as language is the basis of human communication. Anyone can learn a second language (L2) and be able to reach more people, but finding the correct method is crucial to progressing from conversational to fluency. #cite(<piechurska-kuciel_at_2017>, form: "prose") notes that a "routine approach" isn't quite enough; instead, other factors such as motivation, aptitude, personality, anxiety, the emotional reaction, their feelings towards speakers of the language, and understanding of the language speaker's culture are also significant factors in obtaining an L2. There may exist techniques to ease these aspects in a digital setting.

This literature review explores and compares documented language-learning techniques and related ideas that help learners excel in second-language learning. It delves into literature on the emotional aspects of language learning and potential barriers to language learning, which may be helpful when designing the techniques mentioned in a digital application. It also reviews literature on language learning and endangered languages, with and without reference to LLMs, providing a baseline understanding that can serve as inspiration when implementing an application that uses these technologies and techniques. 

== Techniques for Language Learning and Acquisition

The idea of "corrective feedback" on a language learner's written mistakes is a proven feature of structured language learning methods. But there are often disagreements on the best way to give this feedback. #cite(<la_russa_treating_2017>, form: "prose") goes on to outline that "written corrective feedback", where the learner is presented with corrections alongside their errors in writing, gives the learner sufficient time and attentional capabilities to analyse where in their thinking they have been mistaken and be able to move towards a better understanding of the L2 they are learning. This contrasts with oral feedback, which may not provide sufficient cognitive resources to process the corrections and learn from them.

=== Learning Endangered Languages

=== Modern Uptake of Scottish Gaidhlig

== Blockages in Motivation to Learn a Language

== Emotional Conveyance in Language Learning

=== Applying Emotional Conveyance to Digital Learning Technologies

== LLMs with Endangered Languages

== Scripting conversations in LLMs

== Evaluation
])

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

]

#set heading(numbering: none)
  
#pagebreak()
= Appendix 1: Personal Appraisal

#pagebreak(weak: true)
= Appendix 2: IPO Form & Feedback

// the original IPO document is copied verbatim from the other document markup, with edits made to fix the heading level depths

#[
  #set heading(outlined: false)
== Overview of Project Content and Milestones

// A summary of the project identifying the most important stages that have to be completed in order for the project to be successful.   Key Terms: To visualise, to develop, to research, to create, etc. 
// Milestones are scheduled events, or “flags” indicating that some task or set of tasks has been completed. 

This project involves researching, designing, and implementing an online language learning website for Scottish Gaelic (#gaidhlig). The site will focus on teaching through various techniques surrounding conversation. Utilising structured quizzes based on a pre-scripted conversation, and utilising LLMs for language practice. It may employ methods such as response choice, word substitution, memory games, and spaced repetition #footnote[Per the #link(<info-sources>)[Info Sources] section, these techniques are largely inspired by prior art, including Falou, Anki, and LearnGaelic.].

There are several essential stages in the project. These begin with submitting this initial project overview (IPO) and literature review. Furthermore, work will be completed related to application design, implementation, testing, evaluation, and the presentation processes.

Below is a key set of milestones I expect to achieve during the project:
1. Literature review draft & interim check-up - November 14, 2025.
2. Literature review completion - 19th December 2025.
3. Application design completion - January 23, 2026
4. Application implemented & tested - February 20, 2026
5. Dissertation & evaluation completion - April 15, 2026
6. Submission & presentation - April 22, 2026

Most of these points will occur in parallel, with these dates serving as the final deadline.

== The Main Deliverable(s)

// The most important elements and achievement of the project when it is completed. 

Throughout this project, I will develop a web application as described above, which will serve as the primary outcome of the project. I will also produce an accompanying literature review that both informs the development of the project and serves as commentary on a collection of existing literature related to the viability of specific digital teaching techniques in relation to #gaidhlig and other endangered languages.

== The Target Audience for the Deliverable(s)

// Name the particular type of users, organisation, other researchers, people working the field, etc., -- not just “users.”

The target audience for this project contains several distinct groups. The leading group will comprise learners of the #gaidhlig language, ranging from complete beginners to intermediate levels. The second is individuals who wish to practice their knowledge of the language with conversation, at an intermediate level. Furthermore, other researchers and advocates for Scottish Gaidhlig may be able to utilise some of the work and research done to build new technologies, tools, and materials to further the work of revitalising the language.

== The Work to be Undertaken

// Terms: Investigation, data collection, specification, design, building, implementation, conducting (surveys, interviews), analysis, evaluation, testing etc. 

During this project, I will need to design and plan the software. This will include analysing the requirements, deciding on technologies, creating UML diagrams that describe flows and use cases, along with high-level interface designs that visually describe how the user will interact with the site. During and after the implementation phase of the project, I will need to test the project using various techniques, including unit testing, integration testing, and manual testing.

Additionally, I will present the site to potential users and conduct interviews to gather their feedback on the site. This will feed into an evaluation effort based on criteria that will be documented at the beginning of the dissertation portion. It will likely include feedback from users, encompassing both those unfamiliar with #gaidhlig and beginners, as well as a comparison with existing solutions and an assessment of how well it aligns with researched techniques.

Before the project, a research task will be required to provide context for certain aspects, especially those involving the use of large language models in certain features.

== Additional Information / Knowledge Required

// New knowledge acquired, extending current skills, technologies used…

The research portion of this project will be required to gain a deeper understanding of how to implement certain aspects. I will research existing literature to determine how #gaidhlig and other endangered languages perform in large language models (LLMs) and whether specific techniques are required, such as dialogue scripting and tool calls (i.e., dictionary access). I will also research existing literature surrounding language learning techniques and principles that can be utilised in software. As per the #link(<info-sources>)[Info Sources] section, I will also examine prior art to determine what techniques are already employed in similar applications.

I will research which technologies are appropriate to use here, such as LLMs, relational or NoSQL databases, frontend frameworks, APIs, online dictionaries, and real-time systems (related to LLM text streaming).

== Information Sources that Provide a Context for the Project <info-sources>

// References, organisations, particular users, prior art (something that has already been done, that is similar to or the same as this project), web sites … 

Information related to existing and related solutions:
- #link("https://falou.com")[Falou] - prior art
- #link("https://speakly.me/en")[Speakly] - prior art
- #link("https://apps.ankiweb.net/")[Anki] - technique reference
- #link("https://speakgaelic.scot")[SpeakGaelic] - language reference
- #link("https://learngaelic.scot/index.jsp")[LearnGaelic] - language reference

I will review articles, journals, and other published academic literature to gain a deeper understanding of the current state of technology in Scottish Gaidhlig and other endangered languages.

== The Importance of the Project

// Significance -- but also novelty (is it something that hasn’t been done before – is it a new way of doing something that has been done before e.g. using OpenSource technology where only proprietary in the past).

I believe the project carries importance in several aspects. #gaidhlig is an endangered language, with not enough people speaking or learning it. This project will provide an additional learning resource for people to learn or improve their Gaidhlig.

As conversation-based teaching, especially using statistics like the most common words, is underutilised in modern language learning tools that focus on endangered languages such as #gaidhlig, I believe this to be a valuable tool.

I have a goal to open-source all or part of the codebase once complete and graded, which can serve as a base for other developers to create more sophisticated learning resources, thereby further contributing to the space.

It will also prove whether or not LLMs can converse in endangered languages, and even without a large amount of training data related to these languages (i.e. can they recognise language patterns).


== The Key Challenge(s) to be Overcome

// The main anticipated difficulties associated with your project, to which you may have to devote time or attention to ensure success. 

As modern LLMs and #gaidhlig only began research in the current millennium, during the research phase of the literature review, I will need to spend a considerable amount of time refining search terms and literature sources to identify all relevant articles to comment on.

During the design and implementation of the project, I will have the challenge of using the correct #gaidhlig language. I am at a beginner to intermediate level, with an understanding of grammar, and I am able to have basic conversations. Alongside the project, I will be learning more complex language and building on existing skills, primarily using the resources identified in the #link(<info-sources>)[Info Sources] section.
]

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
  - Gaidhlig word frequency list: https://github.com/innesmck/GaelicFrequencyLists
  
  #line(length: 100%)
]

#pagebreak(weak: true)

#bibliography(("./hayagriva.yml", "./zotero.bib"), style: "american-psychological-association")
