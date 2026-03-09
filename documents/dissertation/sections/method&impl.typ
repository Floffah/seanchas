= Methodology

== Functional Requirements

The core purpose of this application is to provide a learning experience to users who want to learn Gaidhlig. There are several features that are required to provide this.

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

Firstly, PF4M @wang_designing_2024 places strong emphasis on content, its context, and its application to real-world scenarios. We don't want to create an application that teaches learners vocabulary, but rather an application that truly can contribute to a learner's true understanding and communicative potential of the language.

== Non-functional Requirements

There are several core non-functional requirements to consider here. The first is security. The site won't collect much personal information about the user, with the main protected information being their email, password, and learning progress. Given this, we still need to prevent leakage. Passwords should be encrypted, data should be adequately protected, and bad actors should be forbidden from accessing user accounts and implemented systems they shouldn't have access to.

User experience (UX) should be core to the application's design. Based on the research reviewed, if the application is unintuitive, difficult to access, ugly, or not properly supportive of learning, then the user may be demotivated to use it or may not retain the site. The site should follow standard design principles and effort must be made to improve UX.

== Product Design

=== Architecture

This project doesn't require a complex system design. I went with a basic single-repository project using standardised web frameworks with support for front-end and back-end code. The back-end component will interact with a basic database for storing login and progress information.

Given this, the project will follow a layered-approach with the front-end presentation layer, application layer, and data layer. 

The front-end layer is responsible for rendering the interface, handling interactions, and interacting with backend functions. The front-end layer will be built with a component architecture, splitting all main UI responsibilities into its own components. It will feature routing, separating each logical system aspect into its own page. The site will also use server-side rendering with a client-side hydration system to manage the UI, so users will see content as quickly as possible.

The backend-layer will be structured as a remote-procedure-call (RPC) structure, with each necessary operation as its own callable function. Each function will process incoming requests, validate them, perform business logic, and interact with the database. RPC will happen over REST. It will also include a basic real-time data-syncing component to inform the web client of data changes as needed.

The data layer will use a simple document-relational database. It will store data for user login information and track the user's learning progress.

=== Tools and Technologies

I have identified a suite of technologies I will use to implement this site. A big factor to the choice of these tools is how comfortable I am with them already, but each have their own pros as to why it makes sense to use it here.

To implement the frontend I will use the framework NextJS#footnote[https://nextjs.org/] (React) with Typescript#footnote[https://www.typescriptlang.org/] (JavaScript) which provides me with great primitives that help with the accessibility and performance aspects of the application, also minimising work needed to be done to get to a working prototype. The site has a lot of dynamic data across the application, and NextJS is the best JavaScript framework for coping with a dynamic site.

In the frontend I will use the TailwindCSS#footnote[https://tailwindcss.com/] styling system and ShadCN#footnote[https://ui.shadcn.com/] component library so that a design system is already established and I can focus on layout and functionality. The Figma designs below uses the Figma version of ShadCN. Both of these tools work very well with NextJS and provide a basis of good user experience and developer experience.

For the backend I have decided to use Convex#footnote[https://www.convex.dev/] as it provides me with everything I need to make a working application. It provides a database, RPC API, file storage, and authentication solution with realtime capabilities. Convex will handle almost the entire backend for me, with my implementation focusing on database schema and backend logic.

== Software Development Methodology

In developing this application, I will follow a strict workflow methodology. All tasks will be noted in an issue tracker (Linear#footnote[https://linear.app/]). This issue tracker holds the Gantt chart and task list for everything I will complete. I follow a Gitflow-adjacent structure.

All changes will be checked into a specific branch. This will be named `feature/some-change`. Changes that map directly to a single Linear ticket will use the Linear-generated branch name, e.g. `feature/ram-20-introduce-conversation`, where RAM-20 is the ticket ID. When the changes are ready and complete, a pull request will be opened where changes are summarised and any related Linear tickets are associated. GitHub Copilot (AI agent) will be requested for review to ensure I didn't miss any oversights during the process, but is disallowed from making actual code changes. Once I am satisfied the changes are ready, the changes will be merged to the `main` branch.

When a pile of changes are ready to be promoted to production, they will be pushed from the `main` branch into a separate non-default `production` branch.

Branch summary:
- Development branches: `feature/...`
- Staging/default branch: `main`
- Production branch: `production`

== Evaluation Methodology

To evaluate this project implementation I will conduct several analysis processes.

The first is analysing it compared to the cacademic techniques noted in the literature review. Specifically, I will analyse it using the PF4M model designed by #cite(<wang_designing_2024>, form: "prose"). The basic questions I will consider in analysing the site are:
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

== Evaluation