// Generated from my template https://github.com/Floffah/documents

#import "lib/template.typ": *
#import "@preview/wordometer:0.1.4": word-count, total-words


#show: project.with(
  title: "Scottish Gaelic Language Learning Website Initial Project Overview",
  logo: "../images/napier.png",
  authors: (
    (name: "Ramsay Foy", affiliation: "40646655"),
  ),
  date: "October 8, 2025",
  // abstract: "",

  formal: true,
  figure-index: (
    enabled: true
  )
)

#let gaidhlig = "Gàidhlig"

= Overview of Project Content and Milestones

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

= The Main Deliverable(s)

// The most important elements and achievement of the project when it is completed. 

Throughout this project, I will develop a web application as described above, which will serve as the primary outcome of the project. I will also produce an accompanying literature review that both informs the development of the project and serves as commentary on a collection of existing literature related to the viability of specific digital teaching techniques in relation to #gaidhlig and other endangered languages.

= The Target Audience for the Deliverable(s)

// Name the particular type of users, organisation, other researchers, people working the field, etc., -- not just “users.”

The target audience for this project contains several distinct groups. The leading group will comprise learners of the #gaidhlig language, ranging from complete beginners to intermediate levels. The second is individuals who wish to practice their knowledge of the language with conversation, at an intermediate level. Furthermore, other researchers and advocates for Scottish Gaidhlig may be able to utilise some of the work and research done to build new technologies, tools, and materials to further the work of revitalising the language.

= The Work to be Undertaken

// Terms: Investigation, data collection, specification, design, building, implementation, conducting (surveys, interviews), analysis, evaluation, testing etc. 

During this project, I will need to design and plan the software. This will include analysing the requirements, deciding on technologies, creating UML diagrams that describe flows and use cases, along with high-level interface designs that visually describe how the user will interact with the site. During and after the implementation phase of the project, I will need to test the project using various techniques, including unit testing, integration testing, and manual testing.

Additionally, I will present the site to potential users and conduct interviews to gather their feedback on the site. This will feed into an evaluation effort based on criteria that will be documented at the beginning of the dissertation portion. It will likely include feedback from users, encompassing both those unfamiliar with #gaidhlig and beginners, as well as a comparison with existing solutions and an assessment of how well it aligns with researched techniques.

Before the project, a research task will be required to provide context for certain aspects, especially those involving the use of large language models in certain features.

= Additional Information / Knowledge Required

// New knowledge acquired, extending current skills, technologies used…

The research portion of this project will be required to gain a deeper understanding of how to implement certain aspects. I will research existing literature to determine how #gaidhlig and other endangered languages perform in large language models (LLMs) and whether specific techniques are required, such as dialogue scripting and tool calls (i.e., dictionary access). I will also research existing literature surrounding language learning techniques and principles that can be utilised in software. As per the #link(<info-sources>)[Info Sources] section, I will also examine prior art to determine what techniques are already employed in similar applications.

I will research which technologies are appropriate to use here, such as LLMs, relational or NoSQL databases, frontend frameworks, APIs, online dictionaries, and real-time systems (related to LLM text streaming).

= Information Sources that Provide a Context for the Project <info-sources>

// References, organisations, particular users, prior art (something that has already been done, that is similar to or the same as this project), web sites … 

Information related to existing and related solutions:
- #link("https://falou.com")[Falou] - prior art
- #link("https://speakly.me/en")[Speakly] - prior art
- #link("https://apps.ankiweb.net/")[Anki] - technique reference
- #link("https://speakgaelic.scot")[SpeakGaelic] - language reference
- #link("https://learngaelic.scot/index.jsp")[LearnGaelic] - language reference

I will review articles, journals, and other published academic literature to gain a deeper understanding of the current state of technology in Scottish Gaidhlig and other endangered languages.

= The Importance of the Project

// Significance -- but also novelty (is it something that hasn’t been done before – is it a new way of doing something that has been done before e.g. using OpenSource technology where only proprietary in the past).

I believe the project carries importance in several aspects. #gaidhlig is an endangered language, with not enough people speaking or learning it. This project will provide an additional learning resource for people to learn or improve their Gaidhlig.

As conversation-based teaching, especially using statistics like the most common words, is underutilised in modern language learning tools that focus on endangered languages such as #gaidhlig, I believe this to be a valuable tool.

I have a goal to open-source all or part of the codebase once complete and graded, which can serve as a base for other developers to create more sophisticated learning resources, thereby further contributing to the space.

It will also prove whether or not LLMs can converse in endangered languages, and even without a large amount of training data related to these languages (i.e. can they recognise language patterns).


= The Key Challenge(s) to be Overcome

// The main anticipated difficulties associated with your project, to which you may have to devote time or attention to ensure success. 

As modern LLMs and #gaidhlig only began research in the current millennium, during the research phase of the literature review, I will need to spend a considerable amount of time refining search terms and literature sources to identify all relevant articles to comment on.

During the design and implementation of the project, I will have the challenge of using the correct #gaidhlig language. I am at a beginner to intermediate level, with an understanding of grammar, and I am able to have basic conversations. Alongside the project, I will be learning more complex language and building on existing skills, primarily using the resources identified in the #link(<info-sources>)[Info Sources] section.