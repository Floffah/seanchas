#import "@preview/wordometer:0.1.4": word-count

= Research

== Literature Review

The study of language learning has existed for centuries, as language is the basis of human communication. Anyone can learn a second language (L2) and be able to reach more people, but finding the correct method is crucial to progressing from conversational to fluency. A "routine approach" isn't quite enough; instead, other factors such as motivation, aptitude, personality, anxiety, the emotional reaction, their feelings towards speakers of the language, and understanding of the language speaker's culture are also significant factors in obtaining an L2 @piechurska-kuciel_at_2017. We need to design solutions in language learning courses that make it more accessible to learn an L2 while easing some of these blockers, and use a medium that works for language learners.

This literature review explores and compares documented language-learning theory and techniques, along with related ideas that help learners excel in second-language learning. It delves into literature on the emotional aspects of language learning and potential barriers to language learning, which may be helpful when designing the techniques mentioned in a digital application. It also reviews literature on language learning and endangered languages, with and without reference to LLMs, providing a baseline understanding that can serve as inspiration when implementing an application that uses these technologies and techniques.

=== Mobile-Assisted Language Learning

A well-known digital language learning (DLL) approach, mobile-assisted language learning (MALL), has become increasingly prevalent in recent years, especially as more people own and use a mobile device in their day-to-day lives. MALL resources are a specific type of resource that provide convenience to L2 language acquisition by enabling learning anywhere, not just in the classroom. MALL resources typically will use the real world as context for learning and improving immersion @li_digital_2022. Furthermore, a theoretical learning model that is often related to MALL is called Situated Learning Theory (SLT). It points to language learners being taught with in-context materials and situations. Specifically, it covers collaboration and peer interaction in realistic, in-context conditions, in a guided fashion using learning resources. In some situations, it may also be moderated by another person @li_mobile-assisted_2022 @lantolf_sociocultural_1994.

After a concern in limited theoretical and practical frameworks related to MALL, and how existing MALL pedagogy lags behind technological innovation (crucial to effectiveness), #cite(<wang_designing_2024>, form: "prose") proposes a new practical theoretical framework for implementing MALL called "PF4M". PF4M uses Technological Pedagogical Content Knowledge (TPACK) as a basis. They define the pillars of PF4M as Learner, which focuses on the participation of the learner and their competency, determination, and other factors. Device, which covers the hardware capabilities of their mobile device and whether or not they own one. 
Teacher, which is described as "the administrator and facilitator of learning", also covers the designer and a provider of language-specific calibre. Finally, Content, which includes the content and material that the learner uses, with some specific attributes such as how much it satisfies the "learning objectives", "quality", "usability", among others.

As well as these pillars, PF4M has specific attributes that should be taken into account when designing and implementing a MALL-supported solution. First is Mobility, which includes "temporal" and "spatial" mobility. Formality, including "formal" and "informal" learning. Authenticity, which includes "authentic task" and "authentic context". Finally, Personalisation, including "agency" and "customisation". Given these pillars and attributes, this is a framework for MALL that will stand the test of time and provide a sufficient basis to design technologies and solutions using MALL theory @wang_designing_2024.

Furthermore, #cite(<cakmak_mobile_2019>, form: "prose") splits a list of attributes related to mobile learning (m-learning) as a whole, into three distinct categories: "process design, environmental design, and mobile
interface design". They say that MALL is an evolution of combining computer-assisted language learning (CALL) with m-learning. M-learning, although not specifically related to language learning, aligns with many of the attributes that MALL and the PF4M framework seek. These include temporal and spatial attributes, mobility, personalisation, and more @cakmak_mobile_2019 @wang_designing_2024.

Researchers have also developed a "three contexts" framework for different types of MALL. They are teacher-driven, community-driven, and learner-driven. They define scales of formality, regulation, autonomy vs teacher-guided, and specified vs proposed activity. Teacher-driven contexts are mainly "formally designed" and guided. Community-driven contexts can be both "formal and informal education" settings. Learner-driven is majorly "user-generated" and autonomous @cakmak_mobile_2019 @hulme_charting_2010

A survey was conducted to better understand users' perspectives on MALL in practice. It found that users would use smartphones and laptops to improve their vocabulary, reading, listening, grammar, and writing skills, along with browsing dictionaries, consuming audiovisual media, browsing social media (for language learning purposes), and reading books. They ranked "good content" as the most important attribute, with "design and usability", and "free access" placed second and third. Elaborating on "good content" as "content delivered in an easy and catchy way". Very few learners use a mobile device every day for language learning, but most commonly do so at home autonomously. Some students noted that MALL technologies cannot replace a teacher, and that "compulsory lessons" are favoured @lenci_technology_2020.

=== Social Frameworks for Language Learning

A researcher proposes that the concept of Metaverse is related to language learning. Metaverse is a concept that was first seen in the book Snow Crash by Neal Stephenson, which describes a "virtual city" and utopia #footnote[It has also been described as a "place where morality and justice" are crucial to its performance @boehm_hiro_2004, however, this aspect is possibly irrelevant to the correlation with social language learning.] @boehm_hiro_2004. It is proposed that modern Metaverse-inspired products could be related to language learning due to their social-centred experience, ability to expose users to cultural differences firsthand, potential to address overpopulation (within a given learning group), personalisation, ability to create communities, and possibility to elicit motivation. Consequently, it also has issues related to "security, privacy", "accessibility", developmental problems, and "social awareness", especially since it is available to most age groups @istanbul_medeniyet_university_metaverse_2022.

=== Features of Language Learning

A topic that is well studied among language learning researchers is the extent to which vocabulary expansion occurs when presented with "L2 input". Individuals learning a second language must give enough focus to a word to insert it into their knowledge of the language. It has been found that learning from input alone is an errant and laborious process, but learners aren't absolutely likely to notice "novel words" and commit them to memory. When attempting to infer their meaning, this may not "lead to correct form-meaning links" @montero_perez_vocabulary_2018.

Enhancement techniques are wise to use alongside L2 input media to help retain vocabulary during language learning. A study was conducted to examine how "retrieval practice" and "spacing" affect retention. These techniques involve studying "items" with a significant gap of time between them, and testing the learner's knowledge rather than just presenting items again, respectively @karatas_improving_2025. The study found that these techniques help with retention significantly more than "initial study and then cramming before an exam".

Some say enhancement techniques may be required to learn a language quickly and meaningfully. To further these points, #cite(<schuetze_spacing_2015>, form: "prose") states that researchers found university students remember very little after two years of study. #cite(<schuetze_spacing_2015>, form: "prose") conducted a study on how exactly the repetition should be performed. Both using "uniform" vs "expanded" intervals, and using a "one-plus-three" vs "one-plus-four" (one introduction and three or four repetitions). They found that the "uniform interval" for repetition yields the best long-term results, with the "expanded interval" group having a larger fall-off in word retention. They found that the "one-plus-four" increases retention scores. Both comparisons, although with improved scores, were statistically insignificant, but still point to these techniques being beneficial. They point out that a good place to start for long-term learning is with five repetitions.

The idea of "corrective feedback" on a language learner's written mistakes is a proven feature of structured language learning methods. But there are often disagreements on the best way to give this feedback. #cite(<la_russa_treating_2017>, form: "prose") goes on to outline that "written corrective feedback", where the learner is presented with corrections alongside their errors in writing, gives the learner sufficient time and attentional capabilities to analyse where in their thinking they have been mistaken and be able to move towards a better understanding of the L2. This contrasts with oral feedback, which may not provide sufficient cognitive resources to process the corrections and learn from them.

#cite(<bodah_challenges_2016>, form: "prose") promoted the idea to move learning towards a Mobile Assisted Language Use (MALU) system, due to the uptake of "connectivism" in education. They found a couple of studies in which students were given mobile devices to supplement their learning, showing that students would use these tools outside of class. They noted that existing studies are limited by age range and by their focus on common foreign languages.

It has also been proposed that a "telecollaboration" approach could be used, where students are paired with both other students and speakers of the target language. A study using this idea found that, regardless of the type of partner, the students benefited. As well as improving their skills in using the language, it improved their opinion towards the target language @lewis_creating_2016.

==== Spaced Repetition

It is well documented in pedagogy that distributing learning over specified periods of time is far better for improving memory retention and recall than simple cramming is. It is known that "massed" approaches are great for fast learning and short-term recall, but for longer term retention of knowledge, "spaced" approaches prove superior @walsh_evaluating_2018.

When learning new knowledge, there is a "forgetting curve" that describes how the human brain begins to forget information over time. It is said that the most crucial time for reviewing and reinforcing information is within the first hour and 24 hours, this is because information is lost rapidly early on, following a non-linear and decelerating pattern @murre_replication_2015 @ebbinghaus_memory_1913 @wollstein_spaced_2022. When effectively implementing solutions to improve retention, especially during the first 24 hours after learning, retention can be increased by up to 80% @radhiatul_husna_simulation_2025. The timing of repetition for retention is not particularly arbitrary, but these intervals can be mathematically modelled and optimised based on observed memory decay patterns @radhiatul_husna_simulation_2025 @walsh_evaluating_2018. Although published centuries ago, the forgetting curve still holds up today @murre_replication_2015 @wollstein_spaced_2022. 

Activities that promote recall are far better for retention than simple re-reading, even if recall is not perfect. Spaced-repetition systems rely on retrieval, as actively recalling information strengthens memory more effectively than just a review @wollstein_spaced_2022 @serra_use_2025. Given all of this, several algorithms and technologies have been designed to schedule reviews of learned information based on the forgetting curve, spaced learning theories, and combining this with the student's memory strength and confidence. 

One such theory is the Leitner algorithm, which utilises five physical boxes of flashcards. When a student gets a flashcard question correct, the card moves one to the next box. When the student gets one wrong, the card is moved to the previous. Cards that are in the first box are reviewed more often @barghamadi_learning_2022. Leitner is a popular and cited approach. Heuristic rule-based systems like this were among the original spaced-learning solutions.

While effective, these heuristic approaches do not explicitly model human memory, prompting the development of computational and optimisation-based spaced-repetition algorithms @walsh_evaluating_2018 @tabibian_enhancing_2019. In response, new algorithms have emerged that represent human memory mathematically through probabilistic or differential models of forgetting @tabibian_enhancing_2019 @radhiatul_husna_simulation_2025. They can schedule reviews right before the student may forget a piece of information. These algorithms aim to reduce the time spent on information that the learner is more comfortable with @tabibian_enhancing_2019. 

Modern systems aim to personalise review intervals to the individual learner and improve efficiency by focusing on items at risk of being forgotten @tabibian_enhancing_2019 @radhiatul_husna_simulation_2025. Platforms like Anki and Memrise have implemented other newer algorithms like Free Spaced Repetition Scheduler ("FSRS"). There are very few existing systems that effectively combine conversation-based learning (including combining with large language models) with existing Free Spaced Repetition @ramadhan_conversational_2025.

==== Learning Endangered Languages

In Brazil, they found that there is disproportionate access to learning materials all over the country for learning English compared to Portuguese. It has been noted that the implementation of technology to promote the learning of indigenous languages (such as endangered ones) must be placed in the proper context, with regard to the challenges and history @bodah_challenges_2016.

A likely first-of-its-kind research project into Yiddish revitalisation in the digital age states that current students prefer "interactive and collaborative learning" alongside "online projects with a creative component". The conservation of endangered languages can include "virtual language" communities, and making such teaching tools more accessible to eager learners @legutko_yiddish_2016.

A study of motivation for learning the "indigenous Taiwanese (...) heritage language" identified two factors. One being the current and future self identity, aligned with being able to speak the language. They say that if there is a positive idealised self, students may have "passion and conviction" to learn the language. This positive idealised (future) self is equally crucial as "community-based motivation" @huang_heritage_2024.

These two previous findings @legutko_yiddish_2016 @huang_heritage_2024 point towards community and a positive image of self as being important in giving learners motivation when trying to learn an endangered language.

For the endangered language Irish (Gaeilge), there have been significant digital developments in supplementing Irish language learning. One includes a natural language chatbot for interacting in Gaeilge @chiarain_chatbot_2016

=== Blockages in Motivation to Learn a Language

==== Language Anxiety

Language is at the centre of human emotion. It is how we convey what's going on within us to another individual or group. Therefore, it is likely that emotion can affect language learning. Current literature establishes the term Language Anxiety (LA). #cite(<baran-lucarz_fl_2017>, form: "prose") identified several studies that show that LA has a "debilitative effect" on language learning. They outlined that LA occurs across several aspects: "listening", "writing", "reading", "speaking", "grammar", and "pronunciation". They say pronunciation is essential because it is key to language identity. They explored definitions of pronunciation anxiety as "self-image" and "fear of negative evaluation", whether from peers or native speakers. 

#cite(<lacabex_pronunciation_2023>, form: "prose") says that the pronunciation of L2 and "phonological competence" have historically been more tied to speech and accent, comparatively to a native speaker, with a modern shift happening more towards meaning and communication.

In the classroom, there is little attention paid to teaching correct pronunciation, with time and resources cited as reasons. This becomes an issue as there is importance in pronunciation as it "facilitates intelligibility, communication and fluency" @szyszka_pronunciation_2017

LA in general, including pronunciation anxiety, is tied to self-image and self-efficacy. Specifically, high language anxiety is strongly negatively linked to self-efficacy and moderately negatively linked to motivation. Some studies add that some learners with high levels of anxiety were more concerned with communication rather than pronunciation. @baran-lucarz_fl_2017 @piniel_investigating_2024 Given the right tools to improve these self-views, it is possible to ease language anxiety.

==== External Factors

Based on previous surveys and a new survey, #cite(<ekiz_factors_2016>, form: "prose") examined connections between certain factors and L2 learning motivation. These factors include: parental encouragement (in younger years), "realistic learner aims", participating in relevant activities with clear goals, and teacher behaviour. These factors are relevant to creating a good and motivating environment for students in education. The students in their study were also more motivated when given the opportunity to work with others, but if the class is "crowded" and "noisy", it can have a negative effect.
 
=== Evaluation

The literature reviewed demonstrates that effective second language acquisition does not occur through a single approach, but rather by combining multiple cognitive, contextual, and emotional factors. Frameworks such as MALL and PF4M talk about the importance of accessibility, context, and personalisation, while studies on spaced repetition emphasise the role of long-term retention and designing appropriate memory-aware systems. Additionally, research into language anxiety and motivation indicates that learner confidence and identity play a critical role, particularly in the context of endangered languages such as Gaidhlig.

A key finding across the literature is that while many individual techniques are well-supported, there is limited evidence of systems that properly integrate these approaches into a unified, conversation-based learning experience. This gap is particularly apparent in resources for endangered languages, where interactive and context-aware tools remain scarce.

== Review of Existing Materials

#[
  #set heading(outlined: false) 

  === Duolingo

  Duolingo#footnote[https://www.duolingo.com/] is a widely used online SaaS product that aims to teach people a variety of languages in an accessible manner. It relies heavily on gamification in its exercises, where users are encouraged to learn by competing in competitions, with limited "resources" like losing a "life" when they fail a quiz. It also has a social side, where users are encouraged to add friends on the platform with whom they can complete "friend quests" and compare scores. It employs heavy repetition and streak tactics.

  Duolingo has a wide catalogue of languages it supports, with many endangered languages supported including Gaidhlig, Navajo, Hawaiian, Irish, Welsh, Yiddish, Maori and more.
  Duolingo excels in habit-building, accessibility, and engagement. Where users are more inclined to keep using it, with it also supporting several device types.

  Duolingo has several disadvantages, however. It lacks good context-aware exercises as its exercises are not always utilising common words, realistic phrases, or grammatical insight. Duolingo seems to be more interested in teaching people vocabulary and how to read the language. 
  
  The platform's consistency is also small. In its more mainstream languages, they employ machine learning for generating and recognising speech, whereas for more endangered languages, they employ a wide range of voice actors who don't necessarily use the same dialect, which disadvantages users who wish to learn good pronunciation.

  Some research also shows that students are sceptical about the effectiveness of Duolingo at higher levels. Also saying that it has poor authenticity, lacks contextual exercises, and lacks proper grammar teaching @poveda-balbuena_digital_2024.

  === SpeakGaelic

  SpeakGaelic#footnote[https://speakgaelic.scot/] is a television Gaidhlig course made by BBC Alba. It uses structured lessons in a visual form with online quizzes per episode. Their content is high quality, very culturally grounded, and has a strict progression. 

  SpeakGaelic is not very interactive and requires passive consumption. It is less likely to work in a mobile form factor. This resource is great and works for a specific group of people, but may benefit from being supplemented with a more interactive and bite-sized format.

  === LearnGaelic

  LearnGaelic#footnote[https://learngaelic.net/] is a large resource hub that includes a dictonary, lessons, compilations of decades of media, and lots of reference documents. It is substantially comprehensive, authoritative, and useful for reference. It can be overwhelming to learners seeking to solely use it for learning, as it doesn't provide a singular progression path or structure, and isn't very engaging.

  Similar to SpeakGaelic, this is a useful resource for a lot of people, but would benefit from being used alongside a more interactive resource with set progression.

  === Falou

  Falou#footnote[https://falou.com/] is a language learning application for mobile phones that focuses specifically on speaking and conversational practice. It uses simulated and pre-scripted conversations along side speech recognition to create a phrase-based learning approach. It excels in real-world dialogue, aligns far more with communicative language use, and is one of the most interactive learning MALL learning applications.

  It can often lack progressive narrative across the set conversation, and conversations are largely reactive rather than being structured. It is also not very transparent in its use of pedagogy to back its design. It only focuses on very mainstream languages and lacks a large list of languages ranging from endangered to even widely used.
  
  === Evaluation

  Across these platforms, common strengths include accessibility, structured content, and availability of learning materials. However limitations are present in areas such as context-aware learning and interactivity. Specifically, few platforms provide a digital-first, conversation-based, context-aware approach that integrates research-backed learning techniques (or don't support endangered languages such as Gaidhlig). This gap is the reason for the proposed system.
]