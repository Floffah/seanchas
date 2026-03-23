= Methodology

== Functional Requirements

In the space, there are only a few resources for learning Gaidhlig, with only a couple being curated-learning paths with appropriate activities.

The core purpose of this application is to provide a learning experience to users who want to learn Gaidhlig, in a manner that is curated, linear, easy to follow, and easy to integrate into day to day life. There are several features that are required to provide this.

The features that surround but are not specific to language learning are related to authentication. The site must allow users to register and log in, providing the core foundation for the system to save and locate information related to the user's learning journey, which paves the way for most other features. Registration and login must provide a way for the user to enter an email address and password, to create or log into their account. The site must provide a way to reset the password of the user's account.

The site must present to the user a list of ordered units, ranging from lowest to greatest difficulty. Within each unit is a pre-scripted conversation that the user will be presented with and then asked questions on. The activity types are as follows in no particular order:
- Of the conversation itself:
  - Choose the correct response
  - Type the correct response
  - What word is missing
  - What word might also work in place of another
- Around the conversation:
  - What was discussed in the conversation
  - Choose the correct word definition

In future versions of this software, the questions and activities will also be audio-based, using technologies such as speech recognition, text-to-speech, and AI-generated conversations based on user mistakes. As the technology required to implement these future ideas is limited or unavailable in Gaidhlig, it is out of scope for this project and is a prompt for future research.

There are several more subtle features that are required. During the course of the user participating in the above units and their activities, data will be saved about their mistakes and strengths. This information will provide the basis for spaced repetition, which will alter the questions and answers for future activities to show mistaken words to the user more often than words and phrases they are good at, based on research reviewed in the literature review.

The site will give constructive feedback when the user gets something wrong, which will be designed in subsequent sections based on research to ensure the user isn't overwhelmed or demotivated to continue, but still adequately notifying them when they got something wrong.

=== Reasoning and Thinking

The initial reason why I considered the conversation-based design is that similar applications I have previously used employ this. But during research, this decision was solidified by several theoretical approaches and prior research pointing to this being effective. 

Several researchers point towards two learning theories that are effective: Mobile-Assisted Language Learning (MALL) and Situated Learning Theory (SLT).

Firstly, PF4M @wang_designing_2024 places strong emphasis on content, its context, and its application to real-world scenarios. We don't want to create an application that teaches learners solely vocabulary, but rather one that truly can contribute to a learner's true understanding and communicative potential of the language.

== Non-functional Requirements

There are several core non-functional requirements to consider here. The first is security. The site won't collect much personal information about the user, with the main protected information being their email, password, and learning progress. Given this, we still need to prevent leakage. Passwords should be encrypted, data should be adequately protected, and bad actors should be forbidden from accessing user accounts and implemented systems they shouldn't have access to.

User experience (UX) should be core to the application's design. Based on the research reviewed, if the application is unintuitive, difficult to access, ugly, or not properly supportive of learning, then the user may be demotivated to use it or may not retain the site. The site should follow standard design principles and effort must be made to improve UX.

== Product Design

=== Architecture

This project doesn't require a complex system design. It will be implemented using standardised web frameworks, with front-end and back-end aspects. The back-end component will interact with a basic database for storing login and progress information. Given this, the project will follow a layered-approach with a front-end presentation layer, application layer, and data layer. 

The front-end layer is responsible for rendering the interface, handling interactions, and interacting with backend functions. The front-end layer will be built with a component architecture, splitting all main UI responsibilities into its own components. It will feature routing, separating each logical system aspect into its own page. The site will also use server-side rendering with a client-side hydration system to manage the UI, so users will see content as quickly as possible.

The backend layer will be structured as a remote procedure call (RPC) structure, with each necessary operation as its own callable function. Each function will process incoming requests, validate them, perform business logic, and interact with the database. RPC will happen over REST. It will also include a basic real-time data-syncing component to inform the web client of data changes as needed.

The data layer will use a simple document-relational database. It will store data for user login information and track the user's learning progress.

#figure(
  image("../images/arch-c4.png"),
  caption: [System architecture C4 Diagram]
)

I have created a diagram that explains all the use cases in the system and which type of user will interact with each one. The use case diagram is below.

#figure(
  image("../images/use-case.drawio.png", width: 60%),
  caption: [Use case diagram]
)

=== Data Design

The database will be very simple. The database will hold a user table for storing login information and allowing authentication. It will also hold a table for tracking unit completions, which only takes a user ID, unit ID, and the step they are currently on (or a completed state) via a union or enum type.

#figure(
  image("../images/data-design.png"),
  caption: [Database Design]
)

=== UI Design

Some of these pages automatically work on mobile, but where necessary, a mobile variant is designed, and would need responsive layout code in the implementation stage to automatically switch between both versions.

Firstly, the entry point into the application is the login page. This page doubles as a sign-up page, allowing the user to do both in a simple user interface (UI).

#figure(
  image("../images/figmas/login.png"),
  caption: [Login page]
)

The user dashboard page is the portal to all of the site's content after login. This page must provide a way for the user to access all of the units the site offers and account settings. I also designed UI for displaying a user's streak, the number of units completed, links to a potential news and practice page, and terms of service/privacy policy links.

The mobile variant of this site is similar. It shows the same content but with both of the asides collapsed into menu buttons near the top. Clicking these will open the corresponding aside menu overlaid above the main content.

#figure(
  grid(columns: (76.4%, auto), 
  gutter: 2%,
  image("../images/figmas/home-screen.png"), image("../images/figmas/home-screen-mobile.png")),
  caption: [Home Page Design]
)

When the user selects a unit, it will take them to the last step (or first if not applicable) that they completed in that unit. The first step consists of the actual conversation they will study for this unit. It is a very minimal page so the focus is on the content itself. They will initially see the first message in the conversation, and must subsequently press the space bar (or tap the screen on mobile) to show the next message.

Occasionally, the system will show a small tooltip above a specific part of a message if we need to point something out to the learner. For example, in the first beginner unit, we may point out that adjectives usually come after the noun they modify. This is a unique step in the display flow. Pressing space will dismiss the tooltip and continue on to the next message or another tooltip if necessary.

#figure(
  image("../images/figmas/conversation.png", width: 90%),
  caption: [Unit Page Design: Conversation Step]
)

Once the user finishes viewing the conversation, we move on to a set of quizzes. We will reuse the same UI for all quiz types, as it is versatile. It consists of the question context, e.g. a phrase, with the question underneath. Under this, there are a number of answer candidates. When selecting the correct answer, it will turn green and let the user advance. If they select the incorrect answer, it will appear in red and show context underneath on what the correct answer was, and why it was correct.

The types of questions that will be shown are explained at the beginning of the methodology section.

#figure(
  image("../images/figmas/quiz.png", width: 90%),
  caption: [Unit Page Design: Quiz Step]
)

The practice page is another simple page. Its main function is to present users with the units they previously made mistakes on, giving them an opportunity to revise it. Each unit card redirects to the same unit screens as above.

#figure(
  image("../images/figmas/practice.png", width: 80%),
  caption: [Practice page Design]
)

The news/blog page is simple. It will provide users with a log of what admins of the site have changed over time.

Similar to the dashboard, on mobile it will hide the left aside but is still accessible by clicking the menu icon.

#figure(
  grid(columns: (73.7%, auto), 
  gutter: 2%,
  image("../images/figmas/news-desktop.png"), image("../images/figmas/news-mobile.png")),
  caption: [News Page Design]
)

The account page is also very simple. It provides the user with a way to sign out or delete their account. This page also hides the left navigation aside, but still makes it accessible with the menu icon button.


#figure(
  grid(columns: (73.7%, auto), 
  gutter: 2%,
  image("../images/figmas/account-desktop.png"), image("../images/figmas/account-mobile.png")),
  caption: [Account Page Design]
)

=== Tools and Technologies

I have identified a suite of technologies I will use to implement this site. A big factor in the choice of these tools is how comfortable I am with them already, but each have their own pros as to why it makes sense to use it here.

To implement the frontend I will use the framework NextJS#footnote[https://nextjs.org/] (React) with Typescript#footnote[https://www.typescriptlang.org/] (JavaScript) which provides me with great primitives that help with the accessibility and performance aspects of the application, also minimising work needed to be done to get to a working prototype. The site has a lot of dynamic data across the application, and NextJS is the best JavaScript framework for coping with a dynamic site like this.

In the frontend I will use the TailwindCSS#footnote[https://tailwindcss.com/] styling system and ShadCN#footnote[https://ui.shadcn.com/] component library so that a design system is already established and I can focus on layout and functionality. The Figma designs below uses the Figma version of ShadCN. Both of these tools work very well with NextJS and provide a solid foundation for a good user and developer experience.

For the backend I have decided to use Convex#footnote[https://www.convex.dev/] as it provides me with everything I need to make a working application. It provides a database, RPC API, file storage, and authentication solution, all with real-time capabilities. Convex will handle most of the backend for me, with my implementation focusing on database schema and backend logic.

== Software Development Methodology

In developing this application, I will follow a strict workflow methodology. All tasks will be noted in an issue tracker (Linear#footnote[https://linear.app/]). This issue tracker holds the Gantt chart and task list for everything I will complete. I follow a Gitflow-adjacent structure.

All changes will be checked into a specific branch. This will be named `feature/some-change`. Changes that map directly to a single Linear ticket will use the Linear-generated branch name, e.g. `feature/ram-20-introduce-conversation`, where RAM-20 is the ticket ID. When the changes are ready and complete, a pull request will be opened where changes are summarised, and any related Linear tickets are associated. GitHub Copilot (AI agent) will be requested for review to ensure I didn't miss any oversights during the process, but is disallowed from making actual code changes. Once I am satisfied the changes are ready, the changes will be merged to the `main` branch.

When a pile of changes are ready to be promoted to production, they will be pushed from the `main` branch into a separate non-default `production` branch.

=== DevOps

Developer Operations (DevOps) is a key portion for delivery of the application. In this application, I will provide several continuous integration (CI) and continuous deployment (CD) strategies.

The front-end code will use a custom or provided CD pipeline where every successful change to the main (development / staging) branch will automatically deploy the changes to the staging environment. Eventually, these deployments can be promoted to production by merging into the production branch where the same technology will automatically build and deploy it to the production environment.

The back-end will use a very similar approach, with the crucial piece being that both the front-end and back-end CI/CD pipelines should deploy at the same time to minimise service disruption.



== Evaluation Methodology

To evaluate this project implementation, I will conduct several analysis processes.

The first is analysing it compared to the academic techniques noted in the literature review. Specifically, I will analyse it using the PF4M model designed by #cite(<wang_designing_2024>, form: "prose"). The basic questions I will consider in analysing the site are:
- Learner / Personalisation
  - Does the system adapt to the learner?
  - Can learners control pacing?
  - How does it consider knowledge gaps?
  - Does it report progress?
  - Can learners choose paths?
  - Are learning trajectories dynamic?
  - Is learning relevant to learners?
  - Does it apply difficulty matching?
  - Does it help learners understand why they made mistakes?
  - Does it promote reflection?
  - Can learners set goals or learning intentions?
  - Does personalisation affect pedagogy or only surface features?
  - Does the system balance learner agency with instructional guidance?
  - Does it support different learning styles or preferences?
  - Does it respond to disengagement or frustration?
- Device / Mobility
  - Is the experience mobile-first?
  - Does it support interruptions?
  - Can it be used offline?
  - Can learning happen in short bursts?
  - Are independent sessions cumulative?
  - Does it consider accessibility?
  - How usable is the site?
  - Does the platform leverage mobile affordances (audio recording, camera, location)?
  - Is session continuity seamless across devices?
  - Does the platform support context-aware learning?
  - Is performance stable under poor connectivity?
  - Does the UI support cognitive load minimisation on small screens?
- Teacher / Formality
  - Are tasks sequenced meaningfully?
  - Is feedback instructional or solely corrective?
  - Is there a curriculum structure or autonomous exploration?
  - Are learning objectives explicit?
  - Does task difficulty align with skill development?
  - Are tasks designed around learning theory (even implicitly)?
  - Does the system model a pedagogical rationale?
  - Does the platform support teacher oversight or authoring?
  - Does instruction transition from guided to independent practice?
  - Is there integration between formal and informal learning activities?
- Content / Authenticity
  - Is the content designed for language acquisition or practice?
  - Does difficulty scale meaningfully?
  - Is the language use contextualised?
  - Are learners solving real communicative tasks?
  - Does it simulate reality?
  - Is the content multimodal (audio, visual, text) in meaningful ways?
  - Are tasks outcome-oriented rather than drill-oriented?
  - Does content reflect real linguistic variation?
  - Does content support pragmatic competence (tone, register, culture)?
  - Are learners exposed to authentic discourse structures?
  - Does content support interaction with real language users?
  - Are tasks situated in believable contexts?

Furthermore, PF4M models that the intersections between these pillars and attributes are necessary. Here is a further list of questions centred around the intersection of the above pillars and attributes:
- Does personalisation influence content selection meaningfully?
- Does device affordance shape pedagogical design?
- Are mobility features pedagogically intentional or convenience only?
- Does authenticity integrate with sequencing and difficulty scaling?
- Does feedback adapt based on learner-device interaction?
- Does the platform behave like a teacher-designed system?
- If gamification and UI were removed, would the learning design still be pedagogically coherent?
- Are all pillars balanced, or is one dominant?
- Does the system feel pedagogy-first, content-first, or feature-first?


After applying and considering all of these questions, we should have a comprehensive analysis of how the site performs in potential real-world scenarios based on the PF4M framework.

#pagebreak(weak: true)

= Implementation

== Testing

This project employs a combination of manual testing and unit testing. 

I have used the unit testing system built into the Bun runtime and target non-UI surfaces that include logic that may contain regressions on future changes.

== Evaluation

=== PF4M Evaluation

#[
#set heading(outlined: false)

In this evaluation step, boolean questions are answered with either yes, no, or somewhat, and with an appropriate description and evidence. Questions that require more explanation will respond and analyse appropriately. Where applicable, answers will explain how the answer to the question can be changed in a future version of the application.

==== Learner / Personalisation

===== Does the system adapt to the learner?

Somewhat. The application learns what units the learner previously struggled with and gives a way to reattempt them. It does not personalise the content within units to each learner.

In the future, as technology advances, specialised LLMs may be used to personalise each unit and create new practice sessions based on the user's previous interactions.

===== Can learners control pacing?

Yes. Units can tackle each unit whenever they like without a time limit, giving them the space to learn at whatever pace they like.

===== How does it consider knowledge gaps?

The application will periodically display tooltips above a given word or phrase in a conversation and explain the context about common knowledge gaps.

===== Does it report progress?

Yes. When a unit is completed, it is moved to the bottom of the units list. When the user fails a unit, it can be seen in the practice tab.

===== Can learners choose paths?

No. The application defines a linear progression of units.

In the future, LLMs may be used to personalise the user and lead them down paths specialised to their learning challenges.

===== Are learning trajectories dynamic?

No. The progression of learning is linear and predefined.

In the future. LLMs may be used to create more dynamic challenges, units, and practice sessions for users, where they may be able to define more custom trajectories.

===== Is learning relevant to learners?

Yes. The content is specific to beginners of the language Scottish Gaidhlig.

===== Does it apply difficulty matching?

Somewhat. Within the bounds of pre-written conversation units, each unit builds on the last with slightly more difficulty and less helpful harnesses.

===== Does it help learners understand why they made mistakes?

Yes. When they choose the wrong option in the quiz, it will explain what was the correct answer and why they might have gotten it wrong.

===== Does it promote reflection?

Yes. When a learner gets a quiz question wrong, the quiz pauses, shows the correct answer, and only advances once they click next.

===== Can learners set goals or learning intentions?

No. There is no functionality to do so within the application, but space is given for the user to pick whichever unit they like and pick it up whenever they like, so freedom to set intentional goals is still possible outside of the application.

In the future, LLMs involved in personalisation of units may help with a first-class goal-setting ability.

===== Does personalisation affect pedagogy or only surface features?

===== Does it support different learning styles or preferences?

No. This application is specific to a particular type of in-context learning with conversations, for people who want to use it more in context than just learning vocabulary.

In the future, LLM personalisation may help with this.

===== Does it respond to disengagement or frustration?

No. If the user closes the site, we don't call them back. It is difficult to appropriately gauge how the user feels while using the site in a web format.

==== Device / Mobility

===== Is the experience mobile-first?

===== Does it support interruptions?

===== Can it be used offline?

===== Can learning happen in short bursts?

===== Are independent sessions cumulative?

===== Does it consider accessibility?
 
===== How usable is the site?

===== Does the platform leverage mobile affordances (audio recording, camera, location)?

===== Is session continuity seamless across devices?

===== Does the platform support context-aware learning?
 
===== Is performance stable under poor connectivity?

===== Does the UI support cognitive load minimisation on small screens?

==== Teacher / Formality
 
===== Are tasks sequenced meaningfully?

===== Is feedback instructional or solely corrective?

===== Is there a curriculum structure or autonomous exploration?

===== Are learning objectives explicit?

===== Does task difficulty align with skill development?

===== Are tasks designed around learning theory (even implicitly)?

===== Does the system model a pedagogical rationale?

===== Does the platform support teacher oversight or authoring?
 
===== Does instruction transition from guided to independent practice?

===== Is there integration between formal and informal learning activities?

==== Content / Authenticity

===== Is the content designed for language acquisition or practice?

===== Does difficulty scale meaningfully?

===== Is the language use contextualised?

===== Are learners solving real communicative tasks?

===== Does it simulate reality?

===== Is the content multimodal (audio, visual, text) in meaningful ways?

===== Are tasks outcome-oriented rather than drill-oriented?

===== Does content reflect real linguistic variation?

===== Does content support pragmatic competence (tone, register, culture)?

===== Are learners exposed to authentic discourse structures?

===== Does content support interaction with real language users?

===== Are tasks situated in believable contexts?
]