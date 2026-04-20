#import "@preview/meander:0.4.2"

= Methodology

== Functional Requirements

In the space, there are only a few resources for learning Gaidhlig, with only a couple being curated-learning paths with appropriate activities.

The core purpose of this application is to provide a learning experience to users who want to learn Gaidhlig, in a manner that is curated, linear, easy to follow, and easy to integrate into day to day life. There are several features that are required to provide this.

The features that surround but are not specific to language learning are related to authentication. The site must allow users to register and log in, providing the core foundation for the system to save and locate information related to the user's learning journey, which paves the way for most other features. Registration and login must provide a way for the user to enter an email address and password, to create or log into their account. The site must provide a way to reset the password of the user's account. The authentication system must be secure and prevent user information from being accessible to unauthorised parties.

The site must present to the user a list of ordered units, ranging from lowest to greatest difficulty. Within each unit is a pre-scripted conversation that the user will be presented with and then asked questions on. The activity types are as follows, in no particular order:
- What was discussed in the conversation?
- Choose the correct response.
- Choose the correct translation
- What word might also work in place of another?

In future versions of this software, the questions and activities will also be audio-based, using technologies such as speech recognition, text-to-speech, and AI-generated conversations based on user mistakes. As the technology required to implement these future ideas is limited or unavailable in Gaidhlig, it is out of scope for this project and is a prompt for future research.

There are several more subtle features that are required. During the course of the user participating in the above units and their activities, data will be saved about their mistakes and strengths. This information will provide the basis for spaced repetition, which will alter the questions and answers for future activities to show mistaken words to the user more often than words and phrases they are good at, based on research reviewed in the literature review.

As mentioned, the site will implement a spaced-repetition system built using Free Spaced Repetition Scheduler (FSRS), designed for use in Anki, and made available for most languages by the Open Spaced Repetition#footnote[https://github.com/open-spaced-repetition] foundation. The site will feature a practice page which surfaces specific learning units based on the FSRS algorithm, using the tracking information outlined above.

The site should give constructive feedback when the user gets something wrong, which will be designed in subsequent sections based on research to ensure the user isn't overwhelmed or demotivated to continue, but still adequately notifying them when they got something wrong.

=== Reasoning and Thinking

The initial reason why I considered the conversation-based design is that similar applications I have previously used employ this, with non targeting Gaidhlig. But during research, this decision was solidified by several theoretical approaches and prior research pointing to this being effective. 

Several researchers point towards two learning theories that are effective: Mobile-Assisted Language Learning (MALL) and Situated Learning Theory (SLT).

PF4M @wang_designing_2024 places strong emphasis on content, its context, and its application to real-world scenarios. We don't want to create an application that teaches learners solely vocabulary, but rather one that truly can contribute to a learner's true understanding and communicative potential of the language.

An interesting product of the conversation-and-quiz-style approach designed, is that we get the immediate benefits of recall, where users have to remember the conversation and consider certain activities based on it. This means the user performs a recall rep within the first hour, as outlined by the literature review. Subsequently, based on the FSRS algorithm, users will perform another rep with the same recall the next day, ideally within 24 hours.

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

=== Unit Design

In order to decide what units to implement for the first prototype, I opted to look at existing materials for how they progress through topics. LearnGaelic and SpeakGaelic seem to start with greetings in most of their resources, followed by various methods of introductions, and soon later likes and dislikes.

These three units: greetings, introductions, likes/dislikes, I found the easiest to hand-craft a conversation around, and immediately provide grammar and understanding challenges while being common phrases.

I discovered a dataset#footnote[https://github.com/innesmck/GaelicFrequencyLists] where various resources linked to LearnGaelic were scraped to find the most common words. I tried to craft the conversations to include common words in this dataset such as: "tha", "gu math", "is", "e"/"i", "thu"/"sibh", etc. However, it proved difficult to fully incorporate all of the top most common words. The dataset is general and non-contextualised so these aren't necessarily the most common in real-world conversations, but also in documents and speeches. Potential future work could be analysing or surveying real Gaidhlig speakers to find out what words they use on a day-to-day basis.

=== Data Design

The database will be very simple. The database will hold a user table for storing login information and allowing authentication. It will also hold a table for tracking unit completions, which only takes a user ID, unit ID, and the step they are currently on (or a completed state) via a union or enum type.

#figure(
  image("../images/data-design.png"),
  caption: [Database Design]
)

=== User Interface (UI) Design

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

To implement the frontend I will use the framework NextJS#footnote[https://nextjs.org/] (React) with Typescript#footnote[https://www.typescriptlang.org/] (JavaScript), which provides great primitives that help with the accessibility and performance aspects of the application, also minimising the work needed to be done to get to a working prototype. The site has a lot of dynamic data across the application, and NextJS is the best JavaScript framework for coping with a dynamic site like this due to its industry-standard hybrid server-side and static generation approach.

In the frontend I will use the TailwindCSS#footnote[https://tailwindcss.com/] styling system and ShadCN#footnote[https://ui.shadcn.com/] component library so that a design system is already established and I can focus on layout and functionality. TailwindCSS is a CSS framework that provides utilities as CSS classes for every feature in the browser's styling system, ensuring that styling is better co-located with the UI code. It works particularly well with React applications, as the styles can still be written once, but with the benefit of co-location. ShadCN is a component library built on top of the UI logic primitives provided by RadixUI and styled with a consistent design system using TailwindCSS.

The Figma designs below uses the Figma version of ShadCN. Both of these tools work very well with NextJS and provide a solid foundation for a good user and developer experience.

For the backend I have decided to use Convex#footnote[https://www.convex.dev/] as it provides everything necessary to make a working application. Convex provides a database, RPC API, file storage, and authentication solution, all with real-time capabilities. Convex tightly integrates its database and backend functions solution to provide a comprehensive end-to-end sync engine for data. Convex handles most of the backend functionality, while my implementation focuses on database schema and backend logic. Every time I push code containing desired backend functions to my repository, Convex automatically builds and deploys the code to its designated deployment.

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

Furthermore, the site will be presented to users. Users will be instructed to use the site to try all units and the practice page once. After doing so, a survey will be conducted.

The survey starts off with a Likert scale set of questions asking users to what capacity they agree with the questions on a scale including disagree, slightly disagree, neutral, slightly agree, and agree. The questions to be asked are as follows:
- It was easy to sign in
- It was easy to complete units
- It was easy complete practice reps
- It was easy to understand the content of each unit and appropriately answer each question
- The units were relevant
- The conversation based format helped me learn more effectively than memorisation would

Next, there is a multiple-choice list where the user is asked which statements they agree with. These questions are more boolean than the above:
- I found the experience engaging
- I would use something like this again
- The conversation format felt natural and helpful
- The format kept my attention
- I feel more confident recognising or using some of the language after using the site
- The activity helped me understand the meaning of the phrases
- None of these statements

To conclude the survey's main content, the users will be asked free-form questions to gauge the things they liked and disliked about the experience.

Finally, to avoid needing to chase up every respondent and allow truly anonymous data, there will be three questions related to how much of the language they picked up. These will be:
- How do you ask someone how they are?
- How do you say "good afternoon"?
- How do you say "I am well"?

It is intended that these phrases should be used in the units in a way that users will be able to pick them up.

#pagebreak(weak: true)

= Implementation

This section provides evidence that my implementation meets the functional and non-functional requirements set out in the methodology section. It also outlines and evidences the testing strategy and executes the evaluation plan outlined in the methodology section.

== User Interface

Firstly, related to authentication, I implemented a simple UI for signing in and out that is backed by Convex and their official authentication adapter, seen below.

#figure(
  image("../images/impl-sign-in.png", width: 70%),
  caption: [Implemented Sign In UI],
)

The Convex authentication adapter considers security standards as part of the package, in this case utilising hashing algorithms for passwords, where passwords are not stored in plain text but rather hashed into an irreversible secret that is compared during login. For this prototype, the ability to reset passwords was omitted to focus on the application's main content, but is easily implementable using the backend provided by Convex's authentication adapter.

When logged in, the user is presented with a unit list which is ordered from easiest to hardest and in the intended progression path.

#figure(
  image("../images/impl-home-page.png", width: 70%),
  caption: [Implemented Unit List UI],
)

When clicking on a unit card, the user is presented with the unit page, which uses a finite-state-backed list of steps: including an introduction, summary quiz, translation quiz, response quiz, and substitution quiz.

#figure(
  image("../images/impl-unit-intro.png", width: 70%),
  caption: [Implemented Unit Page: Introduction]
) <impl-unit-intro>

This page presents the user with the scripted conversation, but only shows one message at a time. Almost like a slide show, the state of the conversation can be advanced by hitting the space bar. Beyond the functional requirements, I also implemented a "tips" system, where instead of just showing the messages in order, sometimes it will pause to explain a feature of the language as shown in @impl-unit-intro. The messages show their Gaidhlig content and the English translation below.

After the user studies the presented conversation, they are shown a button to advance to the quiz portions of the site. Below are four figures showing example questions from each step. Each image shows the various states the quizzes can be in. They use the same generic quiz component. When the user selects the correct answer, it displays "Correct." and highlights their answer in green. When they get it wrong, their answer is highlighted in red and the correct answer is highlighted in green with a caption explaining what the correct answer was.

#grid(
  columns: (auto, auto),
  gutter: 1em,
  figure(image("../images/impl-unit-summary.png"), caption: [Implemented Unit Page: Summary Quiz]),
  figure(image("../images/impl-unit-translation.png"), caption: [Implemented Unit Page: Translation Quiz]),
  figure(image("../images/impl-unit-response.png"), caption: [Implemented Unit Page: Response Quiz]),
  figure(image("../images/impl-unit-substitution.png"), caption: [Implemented Unit Page: Substitution Quiz]),
)

When the user completes a unit, their home page will change shape. Completed units are hidden under a collapsible heading so the main list only includes units they haven't attempted.

#figure(
  image("../images/impl-home-completion.png", width: 70%),
  caption: [Implemented Unit List w/ Units Completed]
)

The practice page is a simple reordering of the unit list, where the list of units is ordered and grouped based on the output of the FSRS scheduler. Units are grouped into "New", "Due", and "Later". "New" means the unit hasn't been attempted, "Due" means the user needs to attempt it soon, and "Later" means the unit doesn't need attention right now. As previously explained, FSRS creates data points from all attempts to gauge users confidence and decide when to schedule new attempts.

#figure(
  image("../images/impl-practice.png", width: 70%),
  caption: [Implemented Practice Page]
)

Further implementation related to account management and site news were omitted for this first prototype as the main site value is in the unit and content.

== Internal Systems

There are several peculiarities to how the system works internally.

#[
  #set heading(outlined: false)

  === Spaced Repetition Scheduler
  
  When the user has fully completed a unit, two things are saved: a record noting that they have completed the unit and another record storing the current state of the FSRS scheduler for that particular unit.
  
  Below is an example record for the FSRS practice record:
  
  ```json
  {
    _creationTime: 1775997140538.753,
    _id: "k57fm1r550c3btfjjy144vjahx84pyg2",
    difficulty: 2.11810397,
    due: 1776256340538,
    elapsedDays: 0,
    lapses: 0,
    lastRating: 3,
    lastReview: 1775997140538,
    reps: 1,
    scheduledDays: 3,
    stability: 2.3065,
    state: 2,
    unitId: "greeting",
    updatedAt: 1775997140538,
    userId: "jx7cm28x95s5sm4hg45s5ddjj584qzkk",
  }
  ```

  === Unit Format
  
  Another notable implementation feature concerns how the conversations are stored for each unit. It is not as simple as hard-coded conversations and questions, but rather a slightly complex format for displaying conversations dynamically. The questions are created based on this format in a manner that is semi-heuristic. The site will pick random phrases from which to create questions, however the format allows providing IDs and answers for populating more questions, especially if necessary to program incorrect answer options where they are not obviously derivable. However the programmable questions can still be dynamic, especially when word variants are present #footnote[You can see an example of this format in #link(<convo-format>)[Appendix 6].].
  
  Inside each message in the conversation, the format splits a message's content into parts. Each part can be plain text, punctuation, or a token. A token contains information about what it can represent. Tokens have a translation, variants (with metadata such as gender for appropriately displaying the correct grammatical forms and inflexions), and an identifier. Variants in tokens are mainly used for the substitution quiz step, but can represent states such as informal or formal word variants. Some variants also represent times of day, for example with "afternoon" being the default, but "night" and "morning" could be valid too. The format is intended to allow changing various token variants while keeping grammar correct for both the Gaidhlig phrases and English translations.
  
  By using a "token reference" part, token variant states can be synchronised across messages. This enables more dynamic conversation representations, for example, where in the future an entire conversation can be switched to a formal state by just switching the variant state in memory. 
]

== Testing

This project employs a combination of manual testing and unit testing. 

On every new feature or change, I manually tested the user interface in my browser using a development server. I also wrote and ran tests for every new change, which would also run inside CI on every commit, push, or pull request. No pull request would be merged without the tests passing locally or the GitHub CI displaying a green tick for the unit tests.

The unit tests used raw logic testing, either comparing function outputs with literal `expect(something)` calls or snapshot comparisons (where the runtime will store a complex value in a file and compare it on subsequent test runs). All of the UI code was tested using a server-side DOM implementation called `happy-dom` with the rendering and comparison checks being done by `testing-library`. The UI tests render each UI component, then interact with the UI (by clicking or else), and compare visual outputs or data outputs.

Below is a #link("https://bun.com/docs/test/reporters#dots-reporter")[Dot Summary] of the entire test suite#footnote[A full summary of the test suite for the latest CI run is visible here: https://github.com/Floffah/seanchas/actions/runs/24285687766/job/70914554196]. A Dot Summary is a concise way to represent the result of an entire suite of unit tests. When a test passes, the runtime will write a green period to the screen. If a test fails, the runtime will instead interrupt the stream of periods with an error message. The test suite for this project is large and does not fit on a single screen by default. A Dot Summary is favourable for summarising the test suite.

#figure(
  image("../images/tests-dots.png"),
  caption: [Unit Test Suite Dot Summary]
)

= Application Evaluation

== Survey Results

As described in the methodology section, I sent the application along with a survey to a group of users to test it and gather feedback. The groups of users were: family, friends in Scotland, friends in Ireland, and more international friends.

For the Likert scale, the results indicate that users found it easy to sign in, locate units, to understand units and their content, and users indicated that the conversation format helped them learn more effectively than memorisation would.

All the respondents answered either slightly or largely agree to the Likert questions, except for the question asking if the units were relevant. Some respondents slightly disagreed with this point. Below is a chart showing the results for the Likert scale.

#figure(
  image("../images/graphs/statement-likert.png"),
  caption: [Likert Scale Chart]
)

For the list of statements, none of the statements have zero points, so someone agreed with them all, however users disagreed with the statement "I feel more confident recognising or using some of the language after using the site" significantly more than the other points, where the other points gained evenly high scores. Below is a chart showing the results of each statement.

#figure(
  image("../images/graphs/statement-checklist.png"),
  caption: [Multiple Choice Statements Chart]
)

For the freeform "pros question", most people commented on the ease of use and good user experience. Users liked that they could move at their own pace and weren't pressured to continue through. Some users liked the "questions about the order of the messages".

The freeform "cons question", the main point users picked up on was their dislike of the substitution quiz, saying that they weren't given enough context clues to complete it effectively. Some users commented that they felt they were memorising phrases rather than understanding the language, which although it is a valid response, is partly the aim of the application.

Further to this, some users pointed out that the application could more appropriately point out what to pay attention to during the conversation introduction, so that the quiz (especially substitution questions) can be answered more effectively.

Approximately 50% of participants continued on to the optional language quiz. Out of those who completed it, all respondents answered the last two questions correctly, while performance on the first question was lower. This suggests that users were able to recall some of the material, but that their understanding or retention may have been less consistent. Below is a chart showing the results of this section.

#figure(
  image("../images/graphs/language-pickup.png", width: 60%),
  caption: [Language Pickup Chart]
)

The small number of users who progressed to the second part of the survey suggests that the study design could have more clearly explained expectations for how to engage with the system. Alternatively, it could have required completion of the second section. It may also mean that participants did not feel confident enough in their understanding of the language in order to attempt the questions. As well as this, it may suggest that further reinforcement of earlier content could improve learning outcomes.

In order to obtain more robust insights into the performance of the system, a larger sample size would be required. Although multiple groups of potential participants were contacted, the response rate was low, resulting in a limited number of completed responses.

== PF4M Evaluation

#[
#set heading(outlined: false)

In this evaluation step, questions are answered with either yes, no, or somewhat, and with an appropriate description and evidence. Questions that require more explanation will respond and analyse appropriately. Where applicable, answers will explain how the answer to the question may change in a future version of the application.

=== Learner / Personalisation

==== Does the system adapt to the learner?

Somewhat. The application learns what units the learner previously struggled with and gives a way to reattempt them. It does not personalise the content within units to each learner.

In the future, as technology advances, specialised LLMs may be used to personalise each unit and create new practice sessions based on the user's previous interactions.

==== Can learners control pacing?

Yes. Units can tackle each unit whenever they like without a time limit, giving them the space to learn at whatever pace they like.

==== How does it consider knowledge gaps?

The application will periodically display tooltips above a given word or phrase in a conversation and explain the context about common knowledge gaps.

==== Does it report progress?

Yes. When a unit is completed, it is moved to the bottom of the units list. When the user fails a unit, it can be seen in the practice tab.

==== Can learners choose paths?

No. The application defines a linear progression of units.

In the future, LLMs may be used to personalise the user and lead them down paths specialised to their learning challenges.

==== Are learning trajectories dynamic?

No. The progression of learning is linear and predefined.

In the future. LLMs may be used to create more dynamic challenges, units, and practice sessions for users, where they may be able to define more custom trajectories.

==== Is learning relevant to learners?

Yes. The content is specific to beginners of the language Gaidhlig.

==== Does it apply difficulty matching?

Somewhat. Within the bounds of pre-written conversation units, each unit builds on the last with slightly more difficulty and less helpful harnesses.

==== Does it help learners understand why they made mistakes?

Yes. When they choose the wrong option in the quiz, it will explain what was the correct answer and why they might have gotten it wrong.

==== Does it promote reflection?

Yes. When a learner gets a quiz question wrong, the quiz pauses, shows the correct answer, and only advances once they click next.

==== Can learners set goals or learning intentions?

No. There is no functionality to do so within the application, but space is given for the user to pick whichever unit they like and pick it up whenever they like, so freedom to set intentional goals is still possible outside of the application.

In the future, LLMs involved in personalisation of units may help with a first-class goal-setting ability.

==== Does personalisation affect pedagogy or only surface features?

To some extent, the site does not personalise specific questions or content, but it does personalise which units the practice tab shows as next to be completed based on spaced repetition that adapts to the user.

==== Does it support different learning styles or preferences?

No. This application is specific to a particular type of in-context learning with conversations, for people who want to use it more in context than just learning vocabulary.

In the future, LLM personalisation may help with this.

==== Does it respond to disengagement or frustration?

No. If the user closes the site, we don't call them back. It is difficult to appropriately gauge how the user feels while using the site in a web format.

=== Device / Mobility

==== Is the experience mobile-first?

The prototype does not work on touchscreen mobile phones due to a lack of time, but it can easily support them and was designed to support them. It can be used on any device with a screen and a keyboard, but the full design and potential full version would work well on any mobile device.

==== Does it support interruptions?

It does not support interruptions while in a unit. E.g., if the user closes a tab while completing a quiz, they will be sent back to the start when they reopen the site. However, once you complete a quiz, this persists for the lifetime of the user's account. This balance works well for the application as if there is a large gap between looking at the conversation and completing the various quizzes, the user's perceived context may be lost.

==== Can it be used offline?

It cannot be used offline, but may be able to be in the future.

==== Can learning happen in short bursts?

Yes, a unit takes less than 5 minutes to complete, so the site can be used for short periods.

==== Are independent sessions cumulative?

Yes, upon completing a unit, all of that data is consolidated into various records for analysing user confidence and adds up over time.

==== Does it consider accessibility?

Yes, the site doesn't rely on audio queues and uses industry-standard component libraries that automatically work with screen readers and other accessibility features. It requires minimal use of the mouse and can be used with any accessible adapter supported by the browser.
 
==== How usable is the site?

The site is very usable, and the user experience is concluded to be good based on survey results and personal usage. It can be improved by fully supporting touchscreens.

==== Does the platform leverage mobile affordances (audio recording, camera, location)?

No, it only supports visual (or screen reader) affordances.

==== Is session continuity seamless across devices?

Yes, as long as the user logs in with the same account, their progress is synchronised across all devices. This is improved by the use of the Convex backend, where if the user has the site open on two devices, progress is synchronised without the need for a refresh.

==== Does the platform support context-aware learning?

Somewhat, it provides a contextualised pre-scripted conversation and quiz questions all in the same context. However, it doesn't account for external factors such as speech, pronunciation, talking with a real person, etc.
 
==== Is performance stable under poor connectivity?

Somewhat, there is minimal bandwidth usage, but very low connectivity may impact the user's experience.

==== Does the UI support cognitive load minimisation on small screens?

Yes, even on big screens, it does not show much at a time, usually only showing the sole content intended for that page.

=== Teacher / Formality
 
==== Are tasks sequenced meaningfully?

Yes, quiz tasks are in a consistent order and ranges from least difficult to most difficult.

==== Is feedback instructional or solely corrective?

For the prototype, solely corrective, but due to the nature of the dynamic conversation format, it can be easily improved.

==== Is there a curriculum structure or autonomous exploration?

The site employs a curriculum structure.

==== Are learning objectives explicit?

Yes, users are given specific units to complete and an indication of how many they have completed.

==== Does task difficulty align with skill development?

Currently, units are basic and beginner friendly, but as the content grows, progression can be made more constructive and better for skills development.

==== Are tasks designed around learning theory (even implicitly)?

Yes, there are factors of learning theory involved. Specifically related to spaced repetition and MALL.

==== Does the system model a pedagogical rationale?

Yes, it is influenced by existing resources and the PF4M MALL framework.

==== Does the platform support teacher oversight or authoring?

Not at the moment, but support could be added.
 
==== Does instruction transition from guided to independent practice?

Somewhat, there is a separate practice feature that uses spaced repetition to allow users to practice freely.

==== Is there integration between formal and informal learning activities?

The site is generally more aligned with informal learning, so there is little integration.

=== Content / Authenticity

==== Is the content designed for language acquisition or practice?

It supports both, with main units and practice backed by spaced repetition.

==== Does difficulty scale meaningfully?

Due to the lack of content at the moment, no. But the nature of the application will inherently support this as more units are added.

==== Is the language use contextualised?

Yes, instead of phrases or words, units teach based on scripted realistic conversations.

==== Are learners solving real communicative tasks?

Somewhat. Quizzes are surrounding a communication format, but aren't necessarily full puzzles or tasks.

==== Does it simulate reality?

No. It does not simulate reality, but conversations aim to be realistic.

==== Is the content multimodal (audio, visual, text) in meaningful ways?

Not at the moment. Content is text-only, but audio and visual formats can be added in the future #footnote[Adding this would have been a whole project in itself].

==== Are tasks outcome-oriented rather than drill-oriented?

Outcome-oriented. The aim of the user is to complete set units.

==== Does content reflect real linguistic variation?

Some units do, and the underlying complex conversation format supports variation inherently. Some of this variation is present in the quizzes, but supports more complex activities or teaching tasks.

==== Does content support pragmatic competence (tone, register, culture)?

Not specifically at the moment. Conversations are meant to be realistic and understandable to a large group of people, but further units can integrate cultural features.

==== Are learners exposed to authentic discourse structures?

No. They are not able to talk to real learners or native speakers.

==== Does content support interaction with real language users?

No. They are not able to talk to real learners or native speakers.

==== Are tasks situated in believable contexts?

Yes, units are based around contextualised and realistic scripted conversations.
]

== Evaluation

Overall, the PF4M evaluation shows that the system performs strongly in areas related to learner control, accessibility, and usability. Especially in allowing flexible pacing and supporting engagement through conversation-based learning. The system aligns well with the learner and device pillars, particularly in terms of ease of use and suitability for short and self-paced sessions.

However, it shows that there are limitations in personalisation and adaptability, as the system largely follows a predefined and linear structure rather than dynamically responding to individual learner requirements. Similarly, while the content is contextualised through conversation, there are gaps in supporting deeper understanding and confidence, as highlighted in the survey results.

From a pedagogical perspective, the system clearly demonstrates an underlying rationale. But it could definitely be further improved through better feedback and adaptive learning alongside stronger integration between content, the learner, and device capabilities. Overall, the system can be considered partially aligned with the PF4M framework, with strong foundations but clear areas for future development.