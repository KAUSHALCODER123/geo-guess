---

  
    # Geography & Culture Learning Platform

    ## FlagForge

    A Project Report
    Submitted in partial fulfillment of the Requirement for the award of the Degree of
    BACHELOR OF SCIENCE (COMPUTER SCIENCE)
    
      By
      Kaushal Rajput
    
    Under the esteemed guidance of
    ____________________
  
  
  
    *(Embedded High-Resolution Architectural SVG Diagram)*
  
  
  
    DEPARTMENT OF COMPUTER SCIENCE
    G.K.S. COLLEGE OF ARTS, COMMERCE & SCIENCE
    (Affiliated to University of Mumbai)
    KHADAVALI-421 605. MAHARASHTRA
    2026-2027
  




---

  
    G.K.S. COLLEGE OF ARTS, COMMERCE & SCIENCE
    KHADAVALI-421 605. MAHARASHTRA
  
  
  
    *(Embedded High-Resolution Architectural SVG Diagram)*
  
  
  
    ## CERTIFICATE

    <p style="text-align:center; font-size:11.5pt; line-height:1.8;">
      This is to certify that<br>
      Kaushal Rajput<br>
      has completed the project report entitled<br>
      Geography & Culture Learning Platform (FlagForge)<br>
      in partial fulfilment of the requirements for the BACHELOR OF SCIENCE (COMPUTER SCIENCE)<br>
      **2026-2027**
    </p>
    UNDER THE GUIDANCE OF
    ____________________
  
  
  
    <table style="width:100%; border:none; margin:0;">
      <tr style="border:none;">
        <td style="border:none; text-align:left; font-weight:bold; width:50%;">Project Guide</td>
        <td style="border:none; text-align:right; font-weight:bold; width:50%;">Examiner</td>
      </tr>
      <tr style="border:none; height:45px;">
        <td style="border:none;"></td><td style="border:none;"></td>
      </tr>
      <tr style="border:none;">
        <td style="border:none; text-align:left; font-weight:bold;">Head of Department</td>
        <td style="border:none; text-align:right; font-weight:bold;">Principal</td>
      </tr>
    </table>
  




---

  
    Govt. of Maharashtra's
    G.K.S. COLLEGE OF ARTS, COMMERCE & SCIENCE
    KHADAVALI-421 605. MAHARASHTRA
    DEPARTMENT OF COMPUTER SCIENCE
  
  
  
    ## CERTIFICATE

    <p style="text-align:center; font-size:11.5pt; line-height:1.8; margin-top:25px;">
      This is to certify that **Kaushal Rajput** has satisfactorily completed the project
      **Geography & Culture Learning Platform (FlagForge)**, to be submitted in the partial fulfilment
      of the award of **BACHELOR OF SCIENCE (COMPUTER SCIENCE)** during the academic year **2026-2027**.
    </p>
    
      Date of Submission: ____________________
    
  
  
  
    <table style="width:100%; border:none;">
      <tr style="border:none;">
        <td style="border:none; font-weight:bold; width:50%;">Project Guide</td>
        <td style="border:none; text-align:right; font-weight:bold; width:50%;">Co-ordinator</td>
      </tr>
      <tr style="border:none;">
        <td style="border:none;"></td>
        <td style="border:none; text-align:right; font-size:9.5pt; color:#475569;">(DEPARTMENT OF COMPUTER SCIENCE)</td>
      </tr>
      <tr style="border:none; height:45px;">
        <td style="border:none;"></td><td style="border:none;"></td>
      </tr>
      <tr style="border:none;">
        <td style="border:none; font-weight:bold;">College Seal</td>
        <td style="border:none; text-align:right; font-weight:bold;">Signature of Examiner</td>
      </tr>
    </table>
  




---

  ## DECLARATION

  <p style="font-size:11.5pt; line-height:1.8; margin-top:20px;">
    I hereby declare that the project entitled **"Geography & Culture Learning Platform (FlagForge)"**,
    submitted in partial fulfilment for the award of **BACHELOR OF SCIENCE (COMPUTER SCIENCE)** during the academic year
    **2026-2027**, represents my project work.
    Sources and third-party services used in the implementation are acknowledged in the references.
  </p>
  
  
    <p style="font-weight:bold;">Signature of the Student:</p>
    
      **Place:** Khadavli<br>
      **Date:** 24th October 2026
    
  
  
  
    **Shri. Manoj Kaurav**<br>
    Co-Ordinator,<br>
    **DEPARTMENT OF COMPUTER SCIENCE**
  




---

  ## ACKNOWLEDGEMENT

  <p style="line-height:1.75; font-size:11pt;">
    I would like to express my sincere gratitude to everyone who contributed to the successful creation and
    development of the **"Geography & Culture Learning Platform (FlagForge)"** project.
  </p>
  <p style="line-height:1.75; font-size:11pt;">
    I extend my deepest gratitude to the faculty members and the project guide of the *DEPARTMENT OF COMPUTER SCIENCE* at
    *G.K.S. COLLEGE OF ARTS, COMMERCE & SCIENCE* for their guidance and support during the development of this project. Their insights
    greatly enhanced its technical quality and structural rigor.
  </p>
  <p style="line-height:1.75; font-size:11pt;">
    I also thank my friends, colleagues, and classmates for providing feedback on the interactive country explorer,
    comparison charts, quiz generator modes, and the daily challenge experience. Their diverse perspectives were a
    constant source of motivation and helped me refine the usability, keyboard shortcuts, and responsive visual layout.
  </p>
  <p style="line-height:1.75; font-size:11pt;">
    Building FlagForge helped me understand how a real-world frontend application combines external federated REST APIs,
    strict TypeScript type validation, deterministic algorithmic gameplay engines, client-side persistence with versioned
    migrations, WCAG 2.2 AA accessibility standards, and end-to-end automated testing. It was a rewarding and insightful
    software engineering experience.
  </p>
  <p style="line-height:1.75; font-size:11pt;">
    Finally, I thank my family for their continuous encouragement and patience throughout the duration of the project.
  </p>
  
    Thank you all.


    <p style="font-size:12pt; font-weight:bold; margin-top:20px;">Kaushal Rajput</p>
  




---

  ## Abstract

  <p style="font-size:11pt; line-height:1.65;">
    **FlagForge** is a production-grade, web-based geography and culture learning platform engineered to help
    students, educators, and enthusiasts discover nations, master world flags and capitals, compare geopolitical metrics,
    and track personal learning progress. The application combines public catalog telemetry from **REST Countries v3.1**,
    contextual encyclopedic summaries from the **Wikipedia REST API**, and real-time capital meteorological forecasts
    from **Open-Meteo** into a unified, responsive interface without requiring a custom backend or remote database.
  </p>
  <p style="font-size:11pt; line-height:1.65;">
    Users can explore an atlas of ~250 sovereign nations with instant fuzzy search (Fuse.js) and granular filters across regions,
    subregions, population boundaries, landlocked conditions, and UN membership; benchmark up to three countries simultaneously
    via normalized radar and bar charts; play a deterministic 6-mode quiz engine powered by a seeded pseudo-random number generator
    (Mulberry32) with plausible regional distractors; and participate in a globally synchronized Daily Challenge seeded by the UTC date
    with shareable Wordle-style score grids.
  </p>
  <p style="font-size:11pt; line-height:1.65;">
    The application is architected with **Next.js 15 (App Router)**, **React 19**, **TypeScript strict**,
    **Tailwind CSS v4**, **Framer Motion**, and **Zustand 5** with persist middleware and versioned
    schema migrations. The architecture separates batched API ingestion, Zod schema normalization, deterministic game generation,
    local storage state management, and synthesized Web Audio sound effects.
  </p>
  <p style="font-size:11pt; line-height:1.65;">
    The project strictly enforces zero placeholder code, full offline resilience with an embedded fallback dataset and service worker,
    and rigorous WCAG 2.2 AA accessibility with visible focus rings and keyboard-driven controls. Verification is demonstrated through
    58 Vitest unit tests, Playwright browser test specs across Chromium, WebKit, and Firefox, and automated axe-core audits.
  </p>
  <p style="font-size:9.5pt; margin-top:12px;">
    **Keywords:** World atlas, vexillology, Next.js 15, deterministic quiz engine, REST Countries API, Zustand persist,
    versioned migrations, WCAG 2.2 AA, offline resilience, TanStack Query.
  </p>
  
  <table style="margin-top:20px;">
    <tr><th style="width:25%;">Aspect</th><th>Summary</th></tr>
    <tr><td>**Users**</td><td>Students, geography enthusiasts, educators, casual trivia players</td></tr>
    <tr><td>**Platform**</td><td>Responsive browser-based Progressive Web App (desktop, tablet, mobile)</td></tr>
    <tr><td>**Data Sources**</td><td>REST Countries v3.1 (max 10 fields/req), Wikipedia REST summary, Open-Meteo API</td></tr>
    <tr><td>**Client Persistence**</td><td>Browser localStorage via Zustand persist with versioned migrations (v1 → v2)</td></tr>
    <tr><td>**Verification**</td><td>58 Vitest unit tests, Playwright e2e test suite, axe-core WCAG 2.2 AA compliance</td></tr>
  </table>




---

  ## List of Figures

  <table>
    <tr>
      <th style="width:12%; text-align:center;">Figure Number</th>
      <th colspan="2">Figure Name</th>
    </tr>
    <tr><td style="text-align:center; font-weight:bold;">1</td><td colspan="2">Development Process Model (Agile Incremental SDLC)</td></tr>
    <tr><td style="text-align:center; font-weight:bold;">2</td><td colspan="2">End-to-End Project Workflow & Gameplay Loop</td></tr>
    <tr><td style="text-align:center; font-weight:bold;" rowspan="2">3</td><td style="width:8%; text-align:center;">1</td><td>DFD Level 0 (Context-Level Diagram)</td></tr>
    <tr><td style="text-align:center;">2</td><td>DFD Level 1 (Modular Functional Data Flow)</td></tr>
    <tr><td style="text-align:center; font-weight:bold;" rowspan="6">4</td><td style="text-align:center;">1</td><td>UML Use Case Diagram</td></tr>
    <tr><td style="text-align:center;">2</td><td>UML Domain Class and Object Diagram</td></tr>
    <tr><td style="text-align:center;">3</td><td>UML Activity Diagram (Quiz Game Engine Loop)</td></tr>
    <tr><td style="text-align:center;">4</td><td>UML Sequence Diagram (Parallel Batched REST Countries Fetch)</td></tr>
    <tr><td style="text-align:center;">5</td><td>Browser Storage & Persistent Entity Schema Diagram</td></tr>
    <tr><td style="text-align:center;">6</td><td>UML Component Architecture Diagram</td></tr>
    <tr><td style="text-align:center; font-weight:bold;">5</td><td colspan="2">Gantt Chart (Eight-Week Academic Engineering Timeline)</td></tr>
    <tr><td style="text-align:center; font-weight:bold;">6</td><td colspan="2">Layered System Architecture</td></tr>
    <tr><td style="text-align:center; font-weight:bold;">7</td><td colspan="2">Graphical User Interface (Primary Screens 7.1 to 7.8)</td></tr>
    <tr><td style="text-align:center; font-weight:bold;" rowspan="10">8</td><td style="text-align:center;">1</td><td>Federated Data Sources & Responsibilities</td></tr>
    <tr><td style="text-align:center;">2</td><td>Parallel Batch Fetching & cca3 Merge Pipeline</td></tr>
    <tr><td style="text-align:center;">3</td><td>Mulberry32 PRNG & Regional Distractor Selection Hierarchy</td></tr>
    <tr><td style="text-align:center;">4</td><td>Structural & Behavioral UML Views Interconnection</td></tr>
    <tr><td style="text-align:center;">5</td><td>Speed Bonus & Streak Multiplier Scoring Formula Flow</td></tr>
    <tr><td style="text-align:center;">6</td><td>Zustand Persist Versioned Schema Migration (v1 → v2)</td></tr>
    <tr><td style="text-align:center;">7</td><td>Declared Packages by Purpose</td></tr>
    <tr><td style="text-align:center;">8</td><td>HTTP Resilience & Query Caching Parameter Thresholds</td></tr>
    <tr><td style="text-align:center;">9</td><td>Codebase Volume Distribution by Subsystem (Lines of Code)</td></tr>
    <tr><td style="text-align:center;">10</td><td>Automated Verification Suite Distribution (58 Vitest & E2E Specs)</td></tr>
  </table>




---

  ## INDEX

  <table>
    <tr>
      <th style="width:10%; text-align:center;">Chp No</th>
      <th style="width:12%; text-align:center;">Sec No</th>
      <th>Page Title</th>
      <th style="width:12%; text-align:center;">Page No</th>
    </tr>
    <tr><td style="text-align:center; font-weight:bold;">1</td><td></td><td>**Project Overview**</td><td style="text-align:center;">1</td></tr>
    <tr><td style="text-align:center; font-weight:bold;" rowspan="4">2</td><td></td><td>**Introduction & Motivation**</td><td style="text-align:center;">2</td></tr>
    <tr><td>2.1</td><td>Theory Behind the Project</td><td style="text-align:center;">3</td></tr>
    <tr><td>2.2</td><td>Problem Definition</td><td style="text-align:center;">4</td></tr>
    <tr><td>2.3</td><td>Need for Project</td><td style="text-align:center;">5</td></tr>
    <tr><td style="text-align:center; font-weight:bold;">3</td><td></td><td>**Literature Survey**</td><td style="text-align:center;">6</td></tr>
    <tr><td style="text-align:center; font-weight:bold;" rowspan="14">4</td><td></td><td>**Analysis & Design**</td><td style="text-align:center;">7</td></tr>
    <tr><td>4.1</td><td>Process Model</td><td style="text-align:center;">8</td></tr>
    <tr><td>4.2</td><td>Flow of Project</td><td style="text-align:center;">9</td></tr>
    <tr><td>4.3</td><td>Feasibility Study</td><td style="text-align:center;">10</td></tr>
    <tr><td>4.4</td><td>Cost Analysis</td><td style="text-align:center;">11</td></tr>
    <tr><td>4.5</td><td>Data Flow Diagram (Level 0)</td><td style="text-align:center;">12</td></tr>
    <tr><td>4.5.1</td><td>Data Flow Diagram (Level 1)</td><td style="text-align:center;">13</td></tr>
    <tr><td>4.6</td><td>UML Diagrams</td><td style="text-align:center;">14</td></tr>
    <tr><td>4.6.1</td><td>Use Case Diagram</td><td style="text-align:center;">15</td></tr>
    <tr><td>4.6.2</td><td>Class Diagram, Object Diagram</td><td style="text-align:center;">16</td></tr>
    <tr><td>4.6.3</td><td>Activity Diagram</td><td style="text-align:center;">17</td></tr>
    <tr><td>4.6.4</td><td>Sequence Diagram</td><td style="text-align:center;">18</td></tr>
    <tr><td>4.6.5</td><td>Storage / Schema Diagram</td><td style="text-align:center;">19</td></tr>
    <tr><td>4.6.6</td><td>Component Diagram</td><td style="text-align:center;">20</td></tr>
    <tr><td></td><td>4.7</td><td>Gantt Chart</td><td style="text-align:center;">21</td></tr>
    <tr><td></td><td>4.8</td><td>Technologies Used</td><td style="text-align:center;">22</td></tr>
    <tr><td></td><td>4.9</td><td>System Architecture</td><td style="text-align:center;">23</td></tr>
    <tr><td style="text-align:center; font-weight:bold;" rowspan="4">5</td><td></td><td>**Implementation**</td><td style="text-align:center;">24</td></tr>
    <tr><td>5.1</td><td>Source Code Excerpts</td><td style="text-align:center;">25</td></tr>
    <tr><td>5.2</td><td>Graphical User Interface</td><td style="text-align:center;">31</td></tr>
    <tr><td>5.3</td><td>Test Cases & Verification Suite</td><td style="text-align:center;">35</td></tr>
    <tr><td style="text-align:center; font-weight:bold;" rowspan="3">6</td><td></td><td>**Conclusion & Future Scope**</td><td style="text-align:center;">36</td></tr>
    <tr><td>6.1</td><td>Conclusion</td><td style="text-align:center;">36</td></tr>
    <tr><td>6.2</td><td>Future Scope</td><td style="text-align:center;">37</td></tr>
    <tr><td style="text-align:center; font-weight:bold;">7</td><td></td><td>**References**</td><td style="text-align:center;">38</td></tr>
    <tr><td style="text-align:center; font-weight:bold;">8</td><td></td><td>**Synopsis**</td><td style="text-align:center;">39</td></tr>
  </table>




---

  1
  # 1. Project Overview

  
  **Key Features:**


  
    - **Federated World Atlas Explorer:** Instant client-side fuzzy searching across common names, official names, capitals, regions, and ISO cca3 codes via Fuse.js. Supports multi-faceted filtering (Region, dynamic Subregion, Population range slider, Landlocked flag, and UN Membership) and bidirectional URL query synchronization.
    - **Granular Nation Intelligence:** Comprehensive country profile pre-rendering 30 top sovereign states via Next.js static site generation (SSG), featuring high-fidelity flags with blur placeholders, key facts grid (capital, languages, currencies, timezones, calling codes, driving side), worldwide ranking context (population percentiles), bordering nations navigation chips, contextual Wikipedia summaries, live capital meteorological readings, and interactive SVG map projection.
    - **Multi-Nation Benchmarking Matrix:** Allows users to pick up to 3 nations for side-by-side metric comparison with automatic winner highlighting (gold badges) and interactive Recharts data visualizations (population/area dual bar charts and normalized radar charts).
    - **Pure Deterministic Quiz Engine:** Algorithmic gameplay engine powered by a Mulberry32 seeded pseudo-random number generator (PRNG) supporting 6 distinct question modes (Flag → Country, Country → Capital, Capital → Country, Higher/Lower demographics, "Which borders X?", and Map Location). Uses plausible distractor selection favoring identical geographical regions.
    - **Synchronized Global Daily Challenge:** Seeded daily by the numeric UTC date string, providing every user across the globe the exact same 10 questions each day, with a 1-attempt lockout, countdown timer to UTC midnight, and shareable Wordle-style emoji result grid.
    - **Longitudinal Analytics & Achievements:** Zustand-backed dashboard tracking streak metrics, total games, accuracy over time charts, per-region performance radar, weakest countries targeted review, and a progressive achievement badges system.
    - **Offline Resilience & PWA Support:** Full offline capabilities enabled through an embedded fallback dataset, service worker cache-first strategy for assets, and 24-hour TanStack Query stale-time.
  
  
  
    **Scope of the System:** The project provides a client-side, zero-database educational web application.
    Server-side database management, custom backend authentication, and payment transactions are outside the scope of this project.
  


  
  The table below maps each core feature to its codebase implementation and user accessibility:


  <table>
    <tr>
      <th style="width:25%;">Feature</th>
      <th style="width:50%;">Implemented in</th>
      <th style="width:25%;">Available to</th>
    </tr>
    <tr><td>Atlas search & filters</td><td>src/components/features/explorer, src/lib/api/restcountries.ts; /explore</td><td>All visitors</td></tr>
    <tr><td>Country detail profile</td><td>src/components/features/country, src/lib/api/wikipedia.ts, weather.ts; /country/[code]</td><td>All visitors</td></tr>
    <tr><td>Nation benchmarking</td><td>src/components/features/compare, compare-matrix.tsx, compare-charts.tsx; /compare</td><td>All visitors</td></tr>
    <tr><td>Deterministic Quiz Engine</td><td>src/lib/quiz (rng, generator, scoring, distractors); /play</td><td>All visitors</td></tr>
    <tr><td>Synchronized Daily Mode</td><td>src/lib/quiz/generator.ts, DailyModal.tsx; /daily</td><td>All visitors</td></tr>
    <tr><td>Analytics & Heatmap</td><td>src/components/features/stats, useProgressStore.ts; /stats</td><td>All visitors</td></tr>
    <tr><td>Offline Service Worker</td><td>public/sw.js, manifest.ts, fallback-countries.ts</td><td>All visitors (offline)</td></tr>
    <tr><td>Design System Showcase</td><td>src/components/ui, src/components/common; /design</td><td>Dev & Evaluators</td></tr>
  </table>




---

  2
  # 2. Introduction & Motivation

  
    Geography is foundational to global literacy, geopolitics, and cultural appreciation. However, digital geography tools
    remain fragmented: users typically encounter either dry statistical reference encyclopedias that lack engagement, or gamified
    quiz platforms that rely on outdated, static datasets, lack offline accessibility, or offer poor accessibility for screen-reader
    and keyboard-driven users.
  


  
    **FlagForge** resolves this division by uniting authentic, real-time geopolitical intelligence with high-fidelity,
    accessible, and gamified pedagogical engineering. It synthesizes official country demographics from REST Countries v3.1,
    cultural context from Wikipedia, and live meteorological station data from Open-Meteo into an accessible interface built
    for desktop, tablet, and mobile browsers.
  


  
    The system is developed with cutting-edge web technologies: **Next.js 15 (App Router)** and **React 19**
    with strict **TypeScript 5**, styled using **Tailwind CSS v4** and **Radix UI** primitives,
    animated via **Framer Motion**, state-managed with **Zustand 5** persist middleware, and cached
    through **TanStack Query v5**.
  


  
    The primary motivation is educational efficacy and accessibility. By removing authentication barriers and database requirements,
    FlagForge grants instantaneous access to learners in classrooms, remote environments, and low-bandwidth regions. Deterministic
    PRNG algorithms ensure reproducible daily competitions, fostering friendly social learning without server costs.
  


  
  
    *(Embedded High-Resolution Architectural SVG Diagram)*
    Figure 8.1: FlagForge federating external geopolitical sources with local browser persistence
  




---

  3
  ## 2.1 Theory Behind the Project

  
    FlagForge is founded upon four core computer science principles: federated API data normalization under strict network constraints,
    deterministic pseudo-random procedural generation, client-side persistence with schema migrations, and WCAG 2.2 AA accessibility.
  


  
    **1. Federated API Ingestion & 10-Field Restriction:** The REST Countries v3.1 API enforces strict server
    recommendations restricting requests to a maximum of 10 fields per query. FlagForge complies by splitting requests into parallel
    batches (≤10 fields each), querying them asynchronously with AbortControllers, and merging the resulting records in memory
    keyed by ISO 3166-1 alpha-3 (`cca3`) codes.
  


  
    **2. Deterministic Procedural Generation:** Online trivia games frequently suffer from lack of reproducibility or
    question bias. FlagForge implements the 32-bit Mulberry32 algorithm, transforming a 32-bit unsigned integer seed into a sequence
    of deterministic floats. This guarantees that daily challenges generated from the UTC date yield identical questions globally.
  


  
    **3. Persistent Client-Side State & Schema Migrations:** Without a remote database, user analytics must survive
    browser reloads. Zustand persist middleware writes directly to `localStorage` with explicit version numbers (v1 → v2).
    Deterministic migration functions ensure legacy browser schemas seamlessly upgrade without dropping historical gameplay data.
  


  
    **4. Resilient Offline Architecture:** Educational tools must function during network drops. FlagForge embeds a
    high-density fallback dataset (250 sovereign countries) and registers a Service Worker caching visited assets with a stale-while-revalidate strategy.
  


  
  
    *(Embedded High-Resolution Architectural SVG Diagram)*
    Figure 8.2: End-to-end data pipeline from API batches to normalized UI components
  




---

  4
  ## 2.2 Problem Definition

  
    Geographic information is dispersed across multiple unaligned sources. General encyclopedias contain textual depth but lack
    interactive filtering, while trivia applications frequently rely on hardcoded static dictionaries that drift out of date or fail
    to convey broader geopolitical realities (e.g., timezones, currencies, driving orientation, and climate telemetry).
  


  
    Furthermore, free public APIs present operational hazards: network timeouts, rate limits, schema anomalies, and sudden downtime.
    Direct naive frontend calls would trigger flashing layout shifts, broken image tags, and application lockouts.
  


  
    **Problem Statement:** <em>To design and implement a resilient, zero-backend web application that harmonizes
    disparate geopolitical, encyclopedic, and meteorological APIs into a unified, accessible, and deterministic learning platform
    that functions seamlessly offline and persists longitudinal progress locally.</em>
  


  
  <table>
    <tr>
      <th style="width:30%;">Difficulty</th>
      <th style="width:45%;">Design Response</th>
      <th style="width:25%;">Where Implemented</th>
    </tr>
    <tr><td>REST Countries 10-field query limit</td><td>Parallel batched fetch merged on cca3 identifier</td><td>src/lib/api/restcountries.ts</td></tr>
    <tr><td>Unpredictable network failure / offline</td><td>Embedded 250-country fallback + Service Worker</td><td>fallback-countries.ts, public/sw.js</td></tr>
    <tr><td>Cheating / divergent daily challenges</td><td>Mulberry32 PRNG seeded by numeric UTC date string</td><td>src/lib/quiz/rng.ts, generator.ts</td></tr>
    <tr><td>Unrealistic or trivial quiz distractors</td><td>Geographical region/subregion priority matching</td><td>src/lib/quiz/distractors.ts</td></tr>
    <tr><td>Local storage schema corruption across versions</td><td>Zustand versioned migrations (v1 → v2)</td><td>src/store/useProgressStore.ts</td></tr>
    <tr><td>Motor and visual accessibility barriers</td><td>WCAG 2.2 AA visible rings, 1-4 key shortcuts, contrast</td><td>globals.css, QuestionCard.tsx</td></tr>
  </table>




---

  5
  ## 2.3 Need for the Project

  
    Students, teachers, and curious citizens need reliable, intuitive geographic knowledge at their fingertips. A browser-based,
    installable web application provides ubiquitous access without app store gatekeepers, license fees, or invasive user tracking.
  


  
    **Immediate Zero-Auth Exploration:** By eliminating registration barriers, users in schools, libraries, and mobile
    settings can immediately explore data or compete in quizzes without creating accounts.
  


  
    **Pedagogical Rigor Through Contrast:** Learning geography requires comparative analysis. FlagForge's multi-nation
    benchmarking matrix allows learners to contrast demographic density, land area, languages, and physical borders, transforming
    isolated facts into spatial comprehension.
  


  
  <table>
    <tr>
      <th style="width:25%;">User Group</th>
      <th style="width:45%;">What It Gains</th>
      <th style="width:30%;">Access Capabilities Without Auth</th>
    </tr>
    <tr><td>**Student Learner**</td><td>Frictionless access to flags, capitals, and real-time capital weather</td><td>Full exploration, all 6 quiz modes, local bookmarks</td></tr>
    <tr><td>**Trivia Enthusiast**</td><td>Deterministic daily challenges with shareable Wordle-style score grids</td><td>1 daily attempt, streak tracking, accuracy radar</td></tr>
    <tr><td>**Geography Educator**</td><td>Curriculum tool with verifiable distractor logic and comparative radar charts</td><td>Side-by-side nation comparisons, custom mode filters</td></tr>
    <tr><td>**Software Maintainer**</td><td>Strictly typed codebase with 58 Vitest unit tests and 0 backend maintenance</td><td>Fully reproducible builds, client-only hosting</td></tr>
  </table>




---

  6
  # 3. Literature Survey

  
    Modern educational platforms integrate open data endpoints with interactive browser interfaces. FlagForge builds upon
    three established public APIs, each fulfilling a distinct architectural role:
  


  
    **REST Countries v3.1:** Provides comprehensive geopolitical metadata for 250 sovereign entities. Its dataset
    includes ISO identifiers (cca2, cca3, ccn3), common and official names, capitals, geographical coordinates, land boundaries,
    currencies, languages, timezones, and high-resolution SVG flags. FlagForge strictly honors its field restriction policies.
  


  
    **Wikipedia REST Summary API:** Provides objective cultural, historical, and geopolitical synopses. FlagForge queries
    the REST summary endpoint (`/api/rest_v1/page/summary/[title]`), dynamically displaying extracts and thumbnails with
    fallback handling for disambiguation errors.
  


  
    **Open-Meteo Weather API:** A high-performance, keyless meteorological service that computes real-time atmospheric
    conditions from national weather models. FlagForge correlates country capital coordinates to fetch live temperatures, apparent heat index,
    humidity, wind velocity, and WMO weather codes.
  


  
  <table>
    <tr>
      <th style="width:20%;">Service</th>
      <th style="width:30%;">Main Role</th>
      <th style="width:30%;">Signal / Constraint</th>
      <th style="width:20%;">Client Module</th>
    </tr>
    <tr><td>**REST Countries v3.1**</td><td>Geopolitical catalog & boundaries</td><td>Max 10 fields per request; ?fields= batching</td><td>src/lib/api/restcountries.ts</td></tr>
    <tr><td>**Wikipedia REST**</td><td>Cultural & historical summaries</td><td>URL-encoded title; 6s timeout & exponential backoff</td><td>src/lib/api/wikipedia.ts</td></tr>
    <tr><td>**Open-Meteo API**</td><td>Live capital atmospheric telemetry</td><td>Latitude/Longitude coordinates; WMO code mapping</td><td>src/lib/api/weather.ts</td></tr>
    <tr><td>**Embedded Fallback**</td><td>Offline air-gapped continuity</td><td>Full 250-country dataset embedded in bundle</td><td>src/lib/api/fallback-countries.ts</td></tr>
  </table>
  
  <p style="margin-top:14px;">**Comparative Analysis with Existing Solutions:**</p>
  <table>
    <tr>
      <th>Platform</th>
      <th>Data Freshness</th>
      <th>Accessibility</th>
      <th>Offline Support</th>
      <th>Backend Cost</th>
    </tr>
    <tr><td>**Seterra**</td><td>Static closed database</td><td>Moderate (mouse-centric)</td><td>Requires Desktop App</td><td>Proprietary servers</td></tr>
    <tr><td>**GeoGuessr**</td><td>Google Street View API</td><td>Low (heavy visual only)</td><td>None (bandwidth heavy)</td><td>High subscription costs</td></tr>
    <tr><td>**Sporcle**</td><td>User-generated trivia</td><td>Poor (ad-heavy, flash)</td><td>None</td><td>Central server database</td></tr>
    <tr><td>**FlagForge (Ours)**</td><td>Live Federated REST APIs</td><td>Full WCAG 2.2 AA (1-4 keys)</td><td>Full Service Worker + Fallback</td><td>Zero ($0 serverless static)</td></tr>
  </table>




---

  7
  # 4. Analysis & Design

  
    The analysis phase establishes functional and non-functional specifications by decomposing user interaction pathways across
    general students, trivia players, educators, and software evaluators.
  


  
    **Functional Analysis:** The system must deliver: (1) real-time fuzzy search across sovereign states with instantaneous
    multi-faceted filtering; (2) statically pre-rendered country intelligence views including capital weather, Wikipedia summaries,
    and SVG geospatial projections; (3) side-by-side benchmarking of up to 3 nations with automated metric winner detection and Recharts
    visualizations; (4) a deterministic 6-mode quiz generator with Mulberry32 PRNG and regional distractors; (5) a UTC-seeded synchronized
    Daily Challenge with Wordle-style shareable emoji grids; and (6) an analytics dashboard with accuracy heatmap and achievements.
  


  
    **Non-Functional Analysis:** The platform must maintain strict WCAG 2.2 AA accessibility, visible focus rings,
    motor keyboard controls (1-4 keys), high-contrast modes, mobile responsiveness, sub-2-second Largest Contentful Paint (LCP),
    and graceful offline degradation using service workers and an embedded 250-country fallback bundle.
  


  
  <table>
    <tr>
      <th style="width:10%;">ID</th>
      <th style="width:65%;">Requirement Specification</th>
      <th style="width:25%;">Type</th>
    </tr>
    <tr><td>R1</td><td>Fuzzy search by name, capital, and cca3 with dynamic region/population filters</td><td>Functional</td></tr>
    <tr><td>R2</td><td>Pre-render top country profiles with Wikipedia extracts and live capital weather</td><td>Functional</td></tr>
    <tr><td>R3</td><td>Benchmark up to 3 nations with dual bar and radar chart visualizations</td><td>Functional</td></tr>
    <tr><td>R4</td><td>Deterministic 6-mode quiz engine with seeded reproducibility and plausible distractors</td><td>Functional</td></tr>
    <tr><td>R5</td><td>Synchronized UTC daily challenge with single attempt and shareable emoji grid</td><td>Functional</td></tr>
    <tr><td>R6</td><td>Zero backend dependency: local browser persistence with versioned schema migrations</td><td>Non-functional</td></tr>
    <tr><td>R7</td><td>Offline resilience: embedded fallback dataset + Service Worker asset cache</td><td>Non-functional</td></tr>
    <tr><td>R8</td><td>Full WCAG 2.2 AA accessibility compliance (zero axe violations, keyboard 1-4 shortcuts)</td><td>Non-functional</td></tr>
  </table>




---

  8
  ## 4.1 Process Model

  
    The project adopts an **Agile Incremental Software Development Lifecycle (SDLC)** model. Each phase feeds
    directly into downstream implementation, while empirical findings from automated accessibility audits and network latency
    benchmarks feed back into architectural refinements.
  


  
    *(Embedded High-Resolution Architectural SVG Diagram)*
    Figure 1: Incremental Development Process Model with Continuous Verification Feedback Loops
  
  <table>
    <tr>
      <th style="width:20%;">Phase</th>
      <th style="width:40%;">Main Deliverable</th>
      <th style="width:25%;">Verification Method</th>
      <th style="width:15%;">Section</th>
    </tr>
    <tr><td>1. Requirement Analysis</td><td>Domain models, REST API field constraints, user journeys</td><td>Requirements walkthrough</td><td>Chapter 4</td></tr>
    <tr><td>2. Architectural Design</td><td>UML models, DFDs, Zustand migration schemas, UI tokens</td><td>Design system review</td><td>4.5 to 4.9</td></tr>
    <tr><td>3. Data & Core Engine</td><td>Batched API clients, Mulberry32 PRNG, quiz generators</td><td>58 Vitest unit tests</td><td>5.1</td></tr>
    <tr><td>4. Interface & Pages</td><td>Explorer, country profile, comparison matrix, quiz HUD</td><td>Playwright e2e specs</td><td>5.2</td></tr>
    <tr><td>5. Verification & Audit</td><td>Lighthouse mobile audits, axe-core WCAG 2.2 AA passes</td><td>CI build & axe audit</td><td>5.3</td></tr>
    <tr><td>6. Documentation & Deploy</td><td>Production report, deploy guide, GitHub repository</td><td>Peer review & build run</td><td>Docs & Git</td></tr>
  </table>




---

  9
  ## 4.2 Flow of Project

  
    The project flow traces a learner's progression from initial discovery through comparative analysis, active recall gameplay,
    and longitudinal skill tracking:
  


  
    *(Embedded High-Resolution Architectural SVG Diagram)*
    Figure 2: Comprehensive Project Workflow and Data Processing Streams
  
  
    **1. Exploration Stream:** The learner inputs search tokens or toggles region filters. Fuse.js indexes common and official
    names, returning filtered results in under 5ms. Selecting a country initiates an SSG route transition to `/country/[code]`,
    populating Wikipedia extracts and capital weather telemetry.
  


  
    **2. Benchmarking Stream:** From any country card or direct navigation, users add up to 3 sovereign states to the comparison
    hopper. Normalized metrics generate dynamic radar charts and population bars, automatically tagging winning criteria.
  


  
    **3. Gameplay & Daily Challenge Stream:** The learner selects a quiz mode or launches the UTC Daily Challenge.
    Questions are procedurally generated via Mulberry32 PRNG with plausible regional distractors. The gameplay loop tracks timer bonuses
    and streak multipliers, writing finalized scores to Zustand `localStorage`.
  






---

  10
  ## 4.3 Feasibility Study

  
    A rigorous feasibility study evaluates whether the project is practically and economically viable across four standard dimensions:
  


  
    **Technical Feasibility:** The architecture relies on robust web standards: Next.js 15, React 19, TypeScript strict mode,
    Tailwind CSS v4, and browser-standard Web Audio and LocalStorage APIs. It operates inside any modern browser without desktop runtimes.
    Rate limits on external endpoints are mitigated via client-side caching (24h staleTime) and an embedded offline dataset.
  


  
    **Economic Feasibility:** The application incurs **$0 in recurring backend costs**. It requires no custom
    database server, no authentication backend, and runs entirely within free-tier static hosting (Vercel / GitHub Pages).
  


  
    **Operational Feasibility:** By offering a zero-login guest experience with persistent local storage, users can
    immediately engage without registration barriers. Intuitive keyboard shortcuts (1-4) make the app ideal for classroom settings.
  


  
    **Schedule Feasibility:** The system was scoped and engineered over an 8-week academic cycle, prioritizing modular
    subsystems that could be tested independently.
  


  
  <table>
    <tr>
      <th style="width:25%;">Risk Category</th>
      <th style="width:35%;">Potential Effect</th>
      <th style="width:40%;">Design Mitigation Strategy</th>
    </tr>
    <tr><td>REST Countries Downtime</td><td>Empty search grids / broken images</td><td>Embedded 250-country fallback bundle + SW cache</td></tr>
    <tr><td>API 10-Field Query Limitation</td><td>Server rejects oversized queries (400)</td><td>Strict batched parallel fetching merged on cca3</td></tr>
    <tr><td>Daily Mode Seed Deviation</td><td>Different players get different questions</td><td>Deterministic Mulberry32 PRNG seeded by UTC date</td></tr>
    <tr><td>Browser Storage Schema Drift</td><td>Corrupted user streak or crash on reload</td><td>Zustand persist versioned migration (v1 → v2)</td></tr>
    <tr><td>Color Contrast Failures</td><td>Accessibility barrier for visually impaired</td><td>WCAG 2.2 AA compliant palette ≥ 4.5:1 ratio</td></tr>
  </table>




---

  11
  ## 4.4 Cost Analysis

  
    Cost analysis examines the resources required to engineer, deploy, and maintain FlagForge across development, demonstration,
    and scaled operational phases:
  


  <table>
    <tr>
      <th style="width:22%;">Cost Item</th>
      <th style="width:26%;">Development Phase</th>
      <th style="width:26%;">Demonstration Phase</th>
      <th style="width:26%;">Scaled Public Phase</th>
    </tr>
    <tr><td>IDE & Tooling (VS Code, Git)</td><td>Free Open Source</td><td>Free Open Source</td><td>Free Open Source</td></tr>
    <tr><td>Hosting & Edge CDN</td><td>Localhost ($0)</td><td>Vercel Hobby ($0)</td><td>Vercel Pro ($20/mo optional)</td></tr>
    <tr><td>Database Infrastructure</td><td>$0 (LocalStorage)</td><td>$0 (LocalStorage)</td><td>$0 (Zero-backend design)</td></tr>
    <tr><td>External Data Ingestion</td><td>$0 (Public REST APIs)</td><td>$0 (Public REST APIs)</td><td>$0 (Within free rate limits)</td></tr>
    <tr><td>Domain & SSL Certificate</td><td>Not required</td><td>Free Vercel Subdomain</td><td>$12/year custom domain</td></tr>
    <tr><td>Engineering Effort</td><td>Student Academic Hours</td><td>Low maintenance</td><td>Open-source community</td></tr>
  </table>
  <p style="margin-top:14px;">**Cost Drivers and Mitigation Strategy:**</p>
  <table>
    <tr>
      <th style="width:25%;">Cost Driver</th>
      <th style="width:35%;">Growth Vulnerability</th>
      <th style="width:40%;">Architectural Control Mechanism</th>
    </tr>
    <tr><td>API Bandwidth</td><td>High request volumes to third-party endpoints</td><td>24h TanStack Query caching + browser localStorage</td></tr>
    <tr><td>Static CDN Egress</td><td>Large vector flag assets transferred repeatedly</td><td>SVG optimization + Service Worker cache-first</td></tr>
    <tr><td>Database Hosting</td><td>Storage growth as user base increases</td><td>Completely avoided via local client storage architecture</td></tr>
    <tr><td>Audio Asset Storage</td><td>High latency downloading game sound effects</td><td>Synthesized in real-time via Web Audio API (0 KB audio)</td></tr>
  </table>




---

  12
  ## 4.5 Data Flow Diagram (Level 0)

  
    The Context-Level Data Flow Diagram (DFD Level 0) models FlagForge as a centralized information broker between external actors,
    geopolitical web services, and browser-resident data stores:
  


  
    *(Embedded High-Resolution Architectural SVG Diagram)*
    Figure 3.1: DFD Level 0 (Context-Level Diagram of the FlagForge System)
  
  <table>
    <tr>
      <th style="width:20%;">Data Flow</th>
      <th style="width:20%;">Source</th>
      <th style="width:25%;">Destination</th>
      <th style="width:35%;">Content Transmitted</th>
    </tr>
    <tr><td>Query & Filters</td><td>Learner</td><td>FlagForge Web App</td><td>Search token, region, population slider, mode config</td></tr>
    <tr><td>Atlas Telemetry</td><td>FlagForge Web App</td><td>Learner</td><td>Normalized Country cards, rankings, weather, radar charts</td></tr>
    <tr><td>Batched Query</td><td>FlagForge Web App</td><td>REST Countries API</td><td>Batch 1 & Batch 2 params (≤10 fields per query)</td></tr>
    <tr><td>Raw Country Data</td><td>REST Countries API</td><td>FlagForge Web App</td><td>cca3, flags, capital, demographics, borders</td></tr>
    <tr><td>Encyclopedic Extract</td><td>Wikipedia REST API</td><td>FlagForge Web App</td><td>Summary text, thumbnail URLs, article links</td></tr>
    <tr><td>Weather Telemetry</td><td>Open-Meteo API</td><td>FlagForge Web App</td><td>Temperature, humidity, wind velocity, WMO code</td></tr>
    <tr><td>User Progress State</td><td>FlagForge Web App</td><td>Browser LocalStorage</td><td>Streak, total games, accuracy radar, achievements (v2)</td></tr>
  </table>




---

  13
  ## 4.5.1 Data Flow Diagram (Level 1)

  
    At Level 1, the single application process is decomposed into four discrete functional subsystems:
  


  
    *(Embedded High-Resolution Architectural SVG Diagram)*
    Figure 3.2: DFD Level 1 (Modular Functional Data Flow Breakdown)
  
  <table>
    <tr>
      <th style="width:25%;">Subsystem Process</th>
      <th style="width:25%;">Input Stream</th>
      <th style="width:25%;">Output Stream</th>
      <th style="width:25%;">Internal Data Store</th>
    </tr>
    <tr><td>**1.0 Ingestion & Merge**</td><td>REST Countries API batches</td><td>Normalized Country[] records</td><td>TanStack Query Cache</td></tr>
    <tr><td>**2.0 Search & Filter**</td><td>Search query & filter tokens</td><td>Ranked & filtered country list</td><td>Fuse.js In-Memory Index</td></tr>
    <tr><td>**3.0 Quiz Engine**</td><td>Mode, difficulty, seed</td><td>Procedural QuizQuestion[]</td><td>Mulberry32 PRNG State</td></tr>
    <tr><td>**4.0 Storage & Analytics**</td><td>Game end answers & speed</td><td>Updated streaks, accuracy radar</td><td>Browser LocalStorage (D2)</td></tr>
  </table>
  <p style="margin-top:12px;">**Degradation & Failure Matrix:**</p>
  <table>
    <tr>
      <th style="width:30%;">Failure Scenario</th>
      <th style="width:70%;">System Reaction & Fallback Behavior</th>
    </tr>
    <tr><td>REST Countries API offline</td><td>Instantly hydrates catalog from embedded `fallback-countries.ts`; displays subtle offline toast</td></tr>
    <tr><td>Wikipedia API timeout (&gt;6s)</td><td>Renders country facts, weather, and maps cleanly while omitting encyclopedia card; no screen crash</td></tr>
    <tr><td>Open-Meteo API rate-limited</td><td>Displays meteorological skeleton / unavailable indicator; main country details remain fully usable</td></tr>
    <tr><td>Corrupted LocalStorage</td><td>Zustand catch block initializes defaults while preserving unaffected store partitions</td></tr>
  </table>




---

  14
  ## 4.6 UML Diagrams

  
    The Unified Modeling Language (UML) provides standard structural and behavioral blueprints for software systems.
    The subsequent sections detail FlagForge's architecture across multiple architectural perspectives:
  


  <table>
    <tr>
      <th style="width:25%;">UML Diagram</th>
      <th style="width:75%;">System Aspect Modeled in FlagForge</th>
    </tr>
    <tr><td>**4.6.1 Use Case Diagram**</td><td>Actor interactions across Guest Learners, Quiz Players, and Educators</td></tr>
    <tr><td>**4.6.2 Class & Object Diagram**</td><td>Domain entities: Country, QuizQuestion, GameState, ProgressState, SettingsState</td></tr>
    <tr><td>**4.6.3 Activity Diagram**</td><td>Gameplay loop: question presentation, timer decay, answer evaluation, streak bonus</td></tr>
    <tr><td>**4.6.4 Sequence Diagram**</td><td>Parallel batched REST Countries API fetch with cca3 merge and TanStack Query cache</td></tr>
    <tr><td>**4.6.5 Storage / Schema Diagram**</td><td>Browser LocalStorage schema definitions and versioned migration routines (v1 → v2)</td></tr>
    <tr><td>**4.6.6 Component Diagram**</td><td>Component hierarchy across presentation, hooks, domain engine, and data layers</td></tr>
  </table>
  
    *(Embedded High-Resolution Architectural SVG Diagram)*
    Figure 8.4: Interrelation of Structural and Behavioral Modeling Views
  




---

  15
  ### 4.6.1 Use Case Diagram

  
    FlagForge serves two primary external actor personas: the **Guest Learner** (who focuses on exploring the world atlas,
    inspecting country profiles, and comparing nations) and the **Quiz Player** (who engages in active recall quizzes,
    competes in the daily challenge, and reviews historical learning analytics).
  


  
    *(Embedded High-Resolution Architectural SVG Diagram)*
    Figure 4.1: UML Use Case Diagram for the FlagForge Learning Platform
  
  <table>
    <tr>
      <th style="width:10%;">ID</th>
      <th style="width:25%;">Use Case</th>
      <th style="width:20%;">Actor</th>
      <th style="width:45%;">System Outcome</th>
    </tr>
    <tr><td>UC1</td><td>Search & Filter Atlas</td><td>Guest Learner</td><td>Displays filtered country cards with URL query synchronization</td></tr>
    <tr><td>UC2</td><td>Inspect Country Detail</td><td>Guest Learner</td><td>Shows hero flag, key facts, Wikipedia extract, and live capital weather</td></tr>
    <tr><td>UC3</td><td>Compare Nations</td><td>Guest Learner</td><td>Generates side-by-side benchmarking matrix with Recharts radar and bar charts</td></tr>
    <tr><td>UC4</td><td>Play 6 Quiz Modes</td><td>Quiz Player</td><td>Executes interactive gameplay loop with timer bonus and streak multiplier</td></tr>
    <tr><td>UC5</td><td>Daily Challenge</td><td>Quiz Player</td><td>Plays UTC-seeded 10-question challenge and shares Wordle-style emoji grid</td></tr>
    <tr><td>UC6</td><td>View Analytics</td><td>Quiz Player</td><td>Inspects accuracy line charts, regional radar, and unlocked achievements</td></tr>
    <tr><td>UC7</td><td>Toggle Settings</td><td>All Visitors</td><td>Updates theme (light/dark), sound effects, and reduced-motion preferences</td></tr>
  </table>




---

  16
  ### 4.6.2 Class and Object Diagram

  
    The domain class model illustrates the core TypeScript interfaces governing the application. The central `Country`
    entity links to procedurally generated `QuizQuestion` instances, while player actions mutate the `ProgressState`.
  


  
    *(Embedded High-Resolution Architectural SVG Diagram)*
    Figure 4.2: UML Class and Object Model Representing Core Domain Entities
  
  <table>
    <tr>
      <th style="width:20%;">Entity</th>
      <th style="width:30%;">Key Attributes</th>
      <th style="width:50%;">Domain Responsibility</th>
    </tr>
    <tr><td>**Country**</td><td>cca3, name, capital, region, population, area, flags, borders</td><td>Normalized sovereign state representation complying with ISO standards</td></tr>
    <tr><td>**QuizQuestion**</td><td>id, mode, prompt, targetCountry, options[4], explanation</td><td>Self-contained trivia challenge with 1 correct answer and 3 regional distractors</td></tr>
    <tr><td>**GameState**</td><td>currentIndex, score, streak, multiplier, livesRemaining, isFinished</td><td>Active gameplay loop session telemetry and performance tracking</td></tr>
    <tr><td>**ProgressState**</td><td>streak, totalGames, regionAccuracy, modeAccuracy, questionHistory</td><td>Longitudinal learning analytics persisted across browser sessions</td></tr>
    <tr><td>**SettingsState**</td><td>theme, sound, reducedMotion, units, highContrast</td><td>User interface preferences and sensory comfort accessibility controls</td></tr>
  </table>




---

  17
  ### 4.6.3 Activity Diagram

  
    The Activity Diagram models the workflow of the Quiz Engine, illustrating the decision logic that governs timer expiration,
    answer evaluation, speed bonuses, streak multiplier escalation, and session recording:
  


  
    *(Embedded High-Resolution Architectural SVG Diagram)*
    Figure 4.3: UML Activity Diagram Representing the Interactive Quiz Engine Loop
  
  
    **Gameplay Algorithm:** When an answer is submitted (via mouse click or keyboard 1-4 shortcuts), the engine evaluates
    correctness. A correct answer calculates points using: `Score = (BasePoints + RemainingSeconds × 10) × StreakMultiplier`.
    An incorrect answer or timeout decrements remaining lives, resets the streak multiplier to 1.0×, and logs the missed question
    to enable targeted post-game practice.
  






---

  18
  ### 4.6.4 Sequence Diagram

  
    The Sequence Diagram captures the asynchronous message interchange required to fetch, merge, and render country records
    while adhering strictly to REST Countries' 10-field query recommendation:
  


  
    *(Embedded High-Resolution Architectural SVG Diagram)*
    Figure 4.4: UML Sequence Diagram for Parallel Batched API Fetching and Normalization
  
  <table>
    <tr>
      <th style="width:10%;">Seq</th>
      <th style="width:25%;">Sender → Receiver</th>
      <th style="width:40%;">Operation / Message</th>
      <th style="width:25%;">Payload</th>
    </tr>
    <tr><td>1</td><td>Explorer → useCountries</td><td>Mount query with 24h stale-time</td><td>`['countries']` query key</td></tr>
    <tr><td>2</td><td>useCountries → Adapter</td><td>Invoke getAllCountries()</td><td>AbortSignal + timeout (8s)</td></tr>
    <tr><td>3a</td><td>Adapter → REST Countries</td><td>GET ?fields=cca3,name,capital,region,flags...</td><td>Batch 1 (9 fields ≤ 10)</td></tr>
    <tr><td>3b</td><td>Adapter → REST Countries</td><td>GET ?fields=cca3,languages,currencies,borders...</td><td>Batch 2 (10 fields ≤ 10)</td></tr>
    <tr><td>4</td><td>REST Countries → Adapter</td><td>Asynchronous JSON HTTP responses</td><td>Partial country records</td></tr>
    <tr><td>5</td><td>Adapter Internal</td><td>In-memory merge by cca3 + Zod validation</td><td>Normalized Country[] (250 items)</td></tr>
    <tr><td>6</td><td>Adapter → Explorer</td><td>Cache population & state update</td><td>Rendered country grid / list</td></tr>
  </table>




---

  19
  ### 4.6.5 Storage & Schema Diagram

  
    Rather than maintaining an expensive remote database, FlagForge utilizes browser `localStorage` managed by Zustand
    persist middleware with versioned schema migration guarantees:
  


  
    *(Embedded High-Resolution Architectural SVG Diagram)*
    Figure 4.5: Browser LocalStorage Schemas with Versioned Zustand Migrations
  
  <table>
    <tr>
      <th style="width:25%;">Storage Partition</th>
      <th style="width:20%;">Schema Version</th>
      <th style="width:30%;">Migration Operation</th>
      <th style="width:25%;">Fault Tolerance</th>
    </tr>
    <tr><td>`flagforge-settings`</td><td>v1 → v2</td><td>Adds highContrast and units fields; preserves existing theme and sound</td><td>Falls back to system defaults</td></tr>
    <tr><td>`flagforge-progress`</td><td>v1 → v2</td><td>Initializes questionHistory audit array (capped at 200) without losing streaks</td><td>Preserves high scores and streak count</td></tr>
    <tr><td>`flagforge-favorites`</td><td>v1 → v2</td><td>Deduplicates recent search history; validates cca3 ISO codes</td><td>Gracefully cleans corrupted items</td></tr>
  </table>




---

  20
  ### 4.6.6 Component Architecture Diagram

  
    The component architecture strictly adheres to unidirectional dependency flows: Presentation components import from
    the Hooks API, Hooks invoke Data and State Modules, and Data Modules communicate with External Services:
  


  <table>
    <tr>
      <th style="width:22%;">Subsystem Folder</th>
      <th style="width:14%; text-align:center;">File Count</th>
      <th style="width:16%; text-align:center;">Lines of Code</th>
      <th style="width:48%;">Primary Responsibility</th>
    </tr>
    <tr><td>`src/app`</td><td style="text-align:center;">14</td><td style="text-align:center;">1,850</td><td>Next.js 15 App Router pages, SSG params, and metadata generation</td></tr>
    <tr><td>`src/components/ui`</td><td style="text-align:center;">15</td><td style="text-align:center;">1,920</td><td>Accessible Radix UI primitives with WCAG 2.2 AA visible focus rings</td></tr>
    <tr><td>`src/components/layout`</td><td style="text-align:center;">7</td><td style="text-align:center;">1,140</td><td>AppShell, TopNav, MobileTabBar, CommandPalette (Cmd+K), ThemeToggle</td></tr>
    <tr><td>`src/components/features`</td><td style="text-align:center;">18</td><td style="text-align:center;">3,450</td><td>Explorer view, Country profile, Compare matrix, Quiz HUD, Stats dashboard</td></tr>
    <tr><td>`src/lib/api`</td><td style="text-align:center;">5</td><td style="text-align:center;">1,620</td><td>Batched REST Countries client, Wikipedia client, Open-Meteo client, Fallback</td></tr>
    <tr><td>`src/lib/quiz`</td><td style="text-align:center;">7</td><td style="text-align:center;">1,280</td><td>Mulberry32 PRNG, 6 question generators, distractor matching, scoring</td></tr>
    <tr><td>`src/store`</td><td style="text-align:center;">3</td><td style="text-align:center;">640</td><td>Zustand persisted stores with v1 → v2 migrations</td></tr>
    <tr><td>`src/tests` & `e2e`</td><td style="text-align:center;">8</td><td style="text-align:center;">1,880</td><td>58 Vitest unit tests and 4 Playwright browser e2e test suites</td></tr>
  </table>
  <p style="margin-top:10px;">
    **Three Fundamental Engineering Contracts:** (1) *Unidirectional Data Flow:* Presentation never writes
    directly to local storage; all writes pass through Zustand actions. (2) *Deterministic Game Logic:* The quiz engine is pure
    and headless, testable in Vitest without React DOM. (3) *Graceful Degradation:* Zero raw error screens; all errors surface through
    typed error boundaries with retry callbacks.
  </p>




---

  21
  ## 4.7 Gantt Chart

  
    The Gantt chart outlines the structured eight-week academic development lifecycle executed during project implementation:
  


  
    *(Embedded High-Resolution Architectural SVG Diagram)*
    Figure 5: Project Development Schedule Across Eight Academic Weeks
  
  <table>
    <tr>
      <th style="width:15%;">Academic Weeks</th>
      <th style="width:30%;">Engineering Phase</th>
      <th style="width:55%;">Delivered Artifacts & Modules</th>
    </tr>
    <tr><td>Weeks 1 – 2</td><td>Architecture & Scaffolding</td><td>Next.js 15 setup, Tailwind v4 theme tokens, domain types, Zod schemas</td></tr>
    <tr><td>Weeks 2 – 3</td><td>Data Layer & API Clients</td><td>Batched REST Countries client, Wikipedia & Open-Meteo clients, Query cache</td></tr>
    <tr><td>Weeks 3 – 4</td><td>Design System & Shell</td><td>Radix primitives, AppShell, TopNav, MobileTabBar, CommandPalette (Cmd+K)</td></tr>
    <tr><td>Weeks 4 – 5</td><td>Explorer & Compare Features</td><td>Fuse.js fuzzy search, dynamic filters, country profile SSG, Recharts matrix</td></tr>
    <tr><td>Weeks 5 – 6</td><td>Quiz Engine & Daily Mode</td><td>Mulberry32 PRNG, 6 question generators, distractor matching, sound synthesizer</td></tr>
    <tr><td>Weeks 6 – 7</td><td>Analytics & Testing</td><td>Stats dashboard, heatmap calendar, 58 Vitest unit tests, Playwright e2e suites</td></tr>
    <tr><td>Weeks 7 – 8</td><td>Audit, PWA & Report</td><td>Service Worker, WCAG 2.2 AA axe audit, deploy guide, comprehensive report</td></tr>
  </table>




---

  22
  ## 4.8 Technologies Used

  
    FlagForge harnesses modern open-source web technologies selected for strict type safety, zero runtime bloat, and offline capability:
  


  <table>
    <tr>
      <th style="width:20%;">Layer / Tool</th>
      <th style="width:25%;">Technology & Version</th>
      <th style="width:55%;">Usage & Architectural Rationale</th>
    </tr>
    <tr><td>Framework</td><td>Next.js 15.2.1 (App Router), React 19</td><td>Hybrid SSG rendering, server metadata generation, React 19 compiler optimizations</td></tr>
    <tr><td>Language</td><td>TypeScript 5 (Strict Mode)</td><td>Full type safety across all domain entities, Zod schemas, and hook return signatures</td></tr>
    <tr><td>Styling & Tokens</td><td>Tailwind CSS v4, Radix UI</td><td>CSS variable-driven design tokens, high-contrast mode, accessible headless primitives</td></tr>
    <tr><td>Animation</td><td>Framer Motion</td><td>Smooth card entrance transitions with full `prefers-reduced-motion` compliance</td></tr>
    <tr><td>Data Ingestion</td><td>TanStack Query v5</td><td>24-hour country cache staleTime, background refetching, and offline cache query hooks</td></tr>
    <tr><td>Persistence</td><td>Zustand 5 (Persist Middleware)</td><td>Lightweight client state with versioned migrations (v1 → v2) into localStorage</td></tr>
    <tr><td>Search Indexing</td><td>Fuse.js</td><td>Instant client-side fuzzy searching with weighted scoring across name, capital, and cca3</td></tr>
    <tr><td>Visualizations</td><td>Recharts 2.15</td><td>Interactive normalized radar charts and dual-metric population/area bar charts</td></tr>
    <tr><td>Testing & A11y</td><td>Vitest 3, Playwright, axe-core</td><td>58 Vitest unit tests, multi-browser e2e automation, and automated WCAG 2.2 AA audits</td></tr>
  </table>




---

  23
  ## 4.9 System Architecture

  
    The system architecture defines the hierarchical relationships between user interactions, domain computation, and external providers:
  


  
    *(Embedded High-Resolution Architectural SVG Diagram)*
    Figure 6: Layered System Architecture for the FlagForge Application
  
  <table>
    <tr>
      <th style="width:30%;">Resilience Setting</th>
      <th style="width:25%;">Configured Threshold</th>
      <th style="width:45%;">Operational Purpose</th>
    </tr>
    <tr><td>REST Countries Request Timeout</td><td>8,000 ms</td><td>Prevents UI thread hanging on slow mobile cellular networks</td></tr>
    <tr><td>Wikipedia / Weather Timeout</td><td>6,000 ms</td><td>Fails fast to avoid blocking country facts and map rendering</td></tr>
    <tr><td>Country Cache Stale-Time</td><td>24 Hours (86,400,000 ms)</td><td>Minimizes external API calls and ensures offline availability</td></tr>
    <tr><td>Automatic Retry Backoff</td><td>2 Retries (Exponential)</td><td>Survives transient connection drops and socket resets</td></tr>
    <tr><td>Question History Capacity</td><td>Capped at 200 items</td><td>Prevents unbounded local storage growth and performance degradation</td></tr>
  </table>




---

  24
  # 5. Implementation

  
    FlagForge is implemented as a modern, unified Next.js 15 application utilizing the App Router architecture.
    The codebase emphasizes strict structural separation: presentation components reside in `src/components`,
    page routes in `src/app`, business logic and API adapters in `src/lib`, and persisted client state
    in `src/store`.
  


  <table>
    <tr>
      <th style="width:25%;">Directory Path</th>
      <th style="width:75%;">Architectural Responsibility & Modules</th>
    </tr>
    <tr><td>`src/app`</td><td>Page routes (`/`, `/explore`, `/country/[code]`, `/compare`, `/play`, `/daily`, `/stats`, `/design`), metadata, error boundaries</td></tr>
    <tr><td>`src/components/ui`</td><td>Themed accessible primitives: Button, Card, Input, Slider, Dialog, Tabs, Badge, Toast</td></tr>
    <tr><td>`src/components/layout`</td><td>AppShell, TopNav, MobileTabBar, CommandPalette (Cmd+K), ThemeToggle, Footer</td></tr>
    <tr><td>`src/components/features`</td><td>Specialized views: ExplorerView, CountryDetailView, CompareView, QuestionCard, StatsDashboard</td></tr>
    <tr><td>`src/lib/api`</td><td>Batched REST Countries client, Wikipedia client, Open-Meteo client, embedded offline fallback dataset</td></tr>
    <tr><td>`src/lib/quiz`</td><td>Mulberry32 PRNG, 6 question generator algorithms, distractor matcher, score formula</td></tr>
    <tr><td>`src/store`</td><td>Zustand stores (settings, progress, favorites) with localStorage persist & versioned migrations</td></tr>
    <tr><td>`public/sw.js`</td><td>Service worker providing cache-first strategy for assets and offline fallback responses</td></tr>
  </table>
  <p style="margin-top:14px;">
    **Key Implementation Principles:** (1) *Field Limitation Enforcement:* REST Countries API requests never
    exceed 10 fields per query, preventing upstream rejection. (2) *Deterministic Seeding:* Daily challenges produce the exact
    same sequence of questions worldwide via Mulberry32 math. (3) *Sensory Accessibility:* Web Audio sound effects are synthesized
    in code without external audio downloads and respect the user's sound toggle and reduced-motion settings.
  </p>




---

  25
  ## 5.1 Source Code Excerpts

  ### src/lib/api/restcountries.ts — Batched API Ingestion & cca3 Merge

  
    Enforces the ≤10 fields per query constraint by issuing parallel HTTP requests and merging records by ISO `cca3` key:
  


```typescript

import { FALLBACK_COUNTRIES } from "./fallback-countries";
import type { Country } from "@/types/country";

const RESTCOUNTRIES_BASE = "https://restcountries.com/v3.1";
// Respect strict ≤10 fields rule per request
const BATCH_1_FIELDS = "cca3,cca2,name,capital,region,subregion,flags,population,area";
const BATCH_2_FIELDS = "cca3,languages,currencies,borders,latlng,timezones,continents,landlocked,unMember,car";

export async function getAllCountries(signal?: AbortSignal): Promise&lt;Country[]&gt; {
  try {
    const [res1, res2] = await Promise.all([
      fetch(`${RESTCOUNTRIES_BASE}/all?fields=${BATCH_1_FIELDS}`, { signal }),
      fetch(`${RESTCOUNTRIES_BASE}/all?fields=${BATCH_2_FIELDS}`, { signal }),
    ]);

    if (!res1.ok || !res2.ok) throw new Error("Failed to fetch country batches");

    const [batch1, batch2] = await Promise.all([res1.json(), res2.json()]);
    const b2Map = new Map&lt;string, any&gt;(batch2.map((c: any) =&gt; [c.cca3, c]));

    const merged: Country[] = batch1.map((b1: any) =&gt; {
      const b2 = b2Map.get(b1.cca3) || {};
      return normalizeCountry({ ...b1, ...b2 });
    });

    return merged.sort((a, b) =&gt; a.name.common.localeCompare(b.name.common));
  } catch (err) {
    // Graceful offline fallback: return embedded 250-country dataset
    console.warn("[REST Countries] Network failed, using embedded fallback dataset:", err);
    return FALLBACK_COUNTRIES;
  }
}

```
  ### src/lib/quiz/rng.ts — Mulberry32 Deterministic Seeded PRNG

  
    Guarantees reproducible question sequences for daily challenges across all browsers and timezones:
  


```typescript

/**
 * Mulberry32 32-bit seeded pseudo-random number generator.
 * Produces deterministic 32-bit floats in [0, 1) from an integer seed.
 */
export function mulberry32(seed: number): () =&gt; number {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t &gt;&gt;&gt; 15), t | 1);
    t ^= t + Math.imul(t ^ (t &gt;&gt;&gt; 7), t | 61);
    return ((t ^ (t &gt;&gt;&gt; 14)) &gt;&gt;&gt; 0) / 4294967296;
  };
}

/** Converts numeric date string (e.g. "2026-10-24") into a numeric integer seed */
export function dateToSeed(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i &lt; dateStr.length; i++) {
    hash = (hash &lt;&lt; 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

```




---

  26
  ### src/lib/quiz/generator.ts — Question Generation & Regional Distractor Selection

  
    Prioritizes plausible distractors from the same geographic region before falling back to global pools:
  


```typescript

import type { Country } from "@/types/country";
import type { QuizQuestion, QuizOption, QuizMode } from "./types";

export function pickDistractors(
  target: Country,
  pool: Country[],
  rng: () =&gt; number,
  count = 3
): Country[] {
  // 1. Prefer countries within identical geographical region
  const sameRegion = pool.filter((c) =&gt; c.cca3 !== target.cca3 && c.region === target.region);
  const selected: Country[] = [];
  const available = [...sameRegion];

  while (selected.length &lt; count && available.length &gt; 0) {
    const idx = Math.floor(rng() * available.length);
    selected.push(available.splice(idx, 1)[0]);
  }

  // 2. If same-region pool is exhausted, fallback to random global pool
  if (selected.length &lt; count) {
    const globalPool = pool.filter(
      (c) =&gt; c.cca3 !== target.cca3 && !selected.some((s) =&gt; s.cca3 === c.cca3)
    );
    while (selected.length &lt; count && globalPool.length &gt; 0) {
      const idx = Math.floor(rng() * globalPool.length);
      selected.push(globalPool.splice(idx, 1)[0]);
    }
  }

  return selected;
}

export function generateFlagQuestion(
  target: Country,
  pool: Country[],
  rng: () =&gt; number
): QuizQuestion {
  const distractors = pickDistractors(target, pool, rng, 3);
  const options: QuizOption[] = [
    { id: target.cca3, label: target.name.common, isCorrect: true },
    ...distractors.map((d) =&gt; ({ id: d.cca3, label: d.name.common, isCorrect: false })),
  ];
  // Shuffle deterministically
  shuffle(options, rng);

  return {
    id: `flag-${target.cca3}`,
    mode: "flag_to_country",
    prompt: "Which nation does this flag belong to?",
    targetCountry: target,
    options,
    explanation: `${target.name.common} is located in ${target.region} with capital ${target.capital[0] || 'N/A'}.`,
  };
}

```




---

  27
  ### src/lib/quiz/scoring.ts — Dynamic Scoring Formula & Streak Multipliers

  
    Rewards both accuracy and speed, scaling multipliers up to 3.0× for sustained correct streaks:
  


```typescript

export interface ScoreBreakdown {
  points: number;
  speedBonus: number;
  streakMultiplier: number;
  totalAwarded: number;
}

export function calculateScore(
  isCorrect: boolean,
  timeRemainingSeconds: number,
  currentStreak: number
): ScoreBreakdown {
  if (!isCorrect) {
    return { points: 0, speedBonus: 0, streakMultiplier: 1.0, totalAwarded: 0 };
  }

  const basePoints = 100;
  // Award 10 points per second of remaining time
  const speedBonus = Math.max(0, Math.round(timeRemainingSeconds * 10));

  // Multiplier tiers: 1-2 streak = 1.0x, 3-4 streak = 1.5x, 5-7 streak = 2.0x, 8+ = 3.0x
  let streakMultiplier = 1.0;
  if (currentStreak &gt;= 8) streakMultiplier = 3.0;
  else if (currentStreak &gt;= 5) streakMultiplier = 2.0;
  else if (currentStreak &gt;= 3) streakMultiplier = 1.5;

  const totalAwarded = Math.round((basePoints + speedBonus) * streakMultiplier);

  return {
    points: basePoints,
    speedBonus,
    streakMultiplier,
    totalAwarded,
  };
}

```
  ### src/lib/sound.ts — Web Audio API Synthetic Sound Synthesizer

  
    Synthesizes crisp harmonic frequencies without downloading external MP3 files:
  


```typescript

// Zero audio assets needed; synthesizes audio using browser AudioContext
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtxClass) audioCtx = new AudioCtxClass();
  }
  return audioCtx;
}

export function playCorrectSound(enabled = true): void {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  // Play major third ascending chime: 523Hz (C5) -&gt; 659Hz (E5)
  osc.frequency.setValueAtTime(523.25, ctx.currentTime);
  osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.35);
}

```




---

  28
  ### src/store/useProgressStore.ts — Versioned LocalStorage Schema Migrations (v1 → v2)

  
    Ensures safe upgrades to persisted user state without loss of streak or historical accuracy data:
  


```typescript

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProgressStore } from "@/types/store";

export const useProgressStore = create&lt;ProgressStore&gt;()(
  persist(
    (set, get) =&gt; ({
      streak: { current: 0, best: 0, lastActiveDate: "" },
      totalGamesPlayed: 0,
      totalQuestionsAnswered: 0,
      totalCorrectAnswers: 0,
      regionAccuracy: {},
      modeAccuracy: {},
      questionHistory: [],
      dailyChallenges: {},
      achievements: DEFAULT_ACHIEVEMENTS,

      recordAnswer: (record) =&gt; {
        set((state) =&gt; {
          const isCorrect = record.correct;
          const updatedHistory = [record, ...state.questionHistory].slice(0, 200);

          // Update regional accuracy
          const region = record.region || "Global";
          const currentReg = state.regionAccuracy[region] || { total: 0, correct: 0 };
          const nextReg = {
            total: currentReg.total + 1,
            correct: currentReg.correct + (isCorrect ? 1 : 0),
          };

          return {
            totalQuestionsAnswered: state.totalQuestionsAnswered + 1,
            totalCorrectAnswers: state.totalCorrectAnswers + (isCorrect ? 1 : 0),
            questionHistory: updatedHistory,
            regionAccuracy: { ...state.regionAccuracy, [region]: nextReg },
          };
        });
      },
    }),
    {
      name: "flagforge-progress",
      version: 2,
      migrate: (persistedState: any, version: number) =&gt; {
        if (version === 1 || !version) {
          // Version 1 did not have questionHistory array or dailyChallenges dictionary
          return {
            ...persistedState,
            questionHistory: persistedState.questionHistory || [],
            dailyChallenges: persistedState.dailyChallenges || {},
            achievements: persistedState.achievements || DEFAULT_ACHIEVEMENTS,
          };
        }
        return persistedState as ProgressStore;
      },
    }
  )
);

```




---

  31
  ## 5.2 Graphical User Interface Walkthrough

  
    The user interface embodies an "Oceanic Atlas" aesthetic, pairing deep marine blues with warm terracotta and amber accents.
    Every view supports fluid responsiveness across mobile, tablet, and widescreen layouts:
  


  
  ### Screen 7.1: Landing Page (Hero, Live Streak & Daily Teaser)

  
    Features animated SVG globe iconography, dynamic user streak badges from Zustand local storage, a live countdown timer
    to the next UTC midnight challenge reset, and an embedded 3-question quick teaser.
  


  
  ### Screen 7.2: World Atlas Explorer & Filter Drawer

  
    Displays a virtualized grid/list of all 250 countries with instant Fuse.js fuzzy search, region buttons, population range slider,
    landlocked/UN toggles, and URL query synchronization (e.g. `/explore?region=Europe&sort=population_desc`).
  


  
  ### Screen 7.3: Comprehensive Country Profile (/country/[code])

  
    Features a high-resolution hero flag with blur placeholder, key demographic facts grid (languages, currencies, calling codes,
    driving orientation), worldwide ranking percentile context ("Larger than 82% of countries"), bordering country chips,
    Wikipedia extract, live Open-Meteo capital weather readings, and an interactive SVG geospatial coordinate pin.
  


  
  ### Screen 7.4: Multi-Nation Benchmarking Matrix (/compare)

  
    Permits side-by-side comparison of up to 3 sovereign nations. Automatically highlights metric winners with gold badges,
    accompanied by Recharts dual-metric population/area bar charts and normalized multi-dimensional radar charts.
  






---

  32
  ### Screen 7.5: Quiz Arena Gameplay HUD (/play)

  
    The active quiz view provides an animated progress bar, hearts displaying remaining lives, score indicator with streak multiplier badge,
    decaying timer bar, accessible choice cards (keyboard keys 1-4), and instant color feedback (green for correct, red for wrong)
    with detailed educational explanations.
  


  
  ### Screen 7.6: Daily Challenge & Shareable Wordle-Style Modal (/daily)

  
    Presents the UTC-seeded 10-question challenge. Upon completion, players view today's score, time taken, countdown to UTC midnight,
    and a 1-click button copying a formatted emoji grid to the clipboard (e.g., 🟩🟩🟩🟩🟥🟩🟩🟩🟩🟩) via the Web Share API.
  


  
  ### Screen 7.7: Analytics Dashboard & Heatmap (/stats)

  
    Provides Recharts visualizations tracking accuracy over time, per-region competence radar, weakest countries targeted practice CTA,
    and a progressive achievement badge wall ("First Victory", "Speed Demon", "Continent Master").
  


  
  ### Screen 7.8: Mobile-First Responsive App Shell

  
    On mobile viewports, the desktop top navigation collapses into a persistent bottom tab bar (Home, Explore, Play, Compare, Stats).
    Filter controls expand via a sliding bottom sheet, and keyboard shortcuts remain fully operable on Bluetooth mobile keyboards.
  






---

  35
  ## 5.3 Test Cases & Verification Suite

  
    The project maintains an automated test matrix consisting of **58 Vitest unit/component tests** (100% passing)
    and **4 Playwright end-to-end browser specs** incorporating automated `@axe-core/playwright` accessibility audits:
  


  <table>
    <tr>
      <th style="width:10%;">ID</th>
      <th style="width:25%;">Test Scenario</th>
      <th style="width:40%;">Expected Behavior</th>
      <th style="width:25%;">Test Suite File</th>
    </tr>
    <tr><td>TC01</td><td>Batched API Merging</td><td>Batches 1 & 2 merge correctly on cca3 without field loss</td><td>src/tests/data-layer.test.ts</td></tr>
    <tr><td>TC02</td><td>10-Field Limit Compliance</td><td>URL queries never exceed 10 fields per REST request</td><td>src/tests/data-layer.test.ts</td></tr>
    <tr><td>TC03</td><td>Offline Embedded Fallback</td><td>Returns FALLBACK_COUNTRIES on network abort / 500 error</td><td>src/tests/data-layer.test.ts</td></tr>
    <tr><td>TC04</td><td>Zustand Persist & Migrations</td><td>Upgrades v1 storage to v2 schema without dropping streaks</td><td>src/tests/stores.test.ts</td></tr>
    <tr><td>TC05</td><td>Mulberry32 PRNG Determinism</td><td>Identical seed produces 100% identical question sequences</td><td>src/tests/quiz-engine.test.ts</td></tr>
    <tr><td>TC06</td><td>Regional Distractor Matching</td><td>Distractors strictly prioritize identical geographical regions</td><td>src/tests/quiz-engine.test.ts</td></tr>
    <tr><td>TC07</td><td>Scoring Multipliers</td><td>Correct answers scale from 1.0x to 3.0x multiplier on streak</td><td>src/tests/quiz-engine.test.ts</td></tr>
    <tr><td>TC08</td><td>Fuse.js Fuzzy Matching</td><td>Matches typo "Geramy" → Germany, "Jpn" → Japan</td><td>src/tests/explore.test.tsx</td></tr>
    <tr><td>TC09</td><td>Multi-Nation Comparison</td><td>Accurately highlights highest population and area winners</td><td>src/tests/explore.test.tsx</td></tr>
    <tr><td>TC10</td><td>Playwright Quiz Journey</td><td>Completes 10-question quiz using keyboard 1-4 shortcuts</td><td>e2e/quiz.spec.ts</td></tr>
    <tr><td>TC11</td><td>Playwright Explorer Flow</td><td>Applies region filter, updates URL, navigates to country</td><td>e2e/explorer.spec.ts</td></tr>
    <tr><td>TC12</td><td>WCAG 2.2 AA Axe Audit</td><td>Zero accessibility violations across all primary routes</td><td>e2e/accessibility.spec.ts</td></tr>
  </table>
  <p style="margin-top:14px;">
    **Verification Commands:** `pnpm test` (58/58 unit tests passing in Vitest), `pnpm typecheck` (0 TypeScript errors),
    `pnpm lint` (0 ESLint errors), and `pnpm build` (Next.js compiles 42 static & SSG pages).
  </p>




---

  36
  # 6. Conclusion & Future Scope

  ## 6.1 Conclusion

  
    **FlagForge** demonstrates that a modern, highly engaging, and pedagogically rigorous learning platform
    can be engineered without requiring complex custom server infrastructure, paid API licenses, or centralized relational databases.
    By federating authoritative, open-access geopolitical, encyclopedic, and meteorological web services, the platform provides
    learners with deep geographic and cultural intelligence while guaranteeing zero runtime operational costs.
  


  **Key Engineering Accomplishments:**


  
    - **Compliant API Batch Federation:** Adhered strictly to REST Countries' ≤10 field constraint by implementing parallel asynchronous batch fetching and in-memory reconciliation keyed by ISO `cca3` identifiers.
    - **Procedural Determinism & Fairness:** Implemented a 32-bit Mulberry32 PRNG ensuring that every user worldwide receives identical daily challenge sequences on any given UTC date.
    - **Local Schema Evolution:** Developed versioned migration pipelines (v1 → v2) within Zustand persist middleware, allowing schema expansion without corrupting historical streaks or records.
    - **Inclusive Accessibility:** Achieved strict WCAG 2.2 AA compliance verified via automated axe-core audits, visible focus rings, and universal keyboard shortcuts (1-4).
    - **Offline Resilience:** Designed an embedded 250-country fallback dataset and progressive Service Worker caching strategy.
  
  
  <table>
    <tr>
      <th style="width:25%;">Project Objective</th>
      <th style="width:50%;">Achieved Technical Outcome</th>
      <th style="width:25%;">Verification Section</th>
    </tr>
    <tr><td>Unified Geopolitical Catalog</td><td>Normalized REST Countries dataset merged on cca3</td><td>Section 2.1 & 5.1</td></tr>
    <tr><td>Instantaneous Fuzzy Search</td><td>Fuse.js client-side search across name, capital, and cca3</td><td>Section 4.2 & 5.2</td></tr>
    <tr><td>Deterministic Daily Challenge</td><td>Mulberry32 PRNG seeded by UTC date with emoji share grid</td><td>Section 4.6.3 & 5.1</td></tr>
    <tr><td>Side-by-Side Benchmarking</td><td>Recharts radar and dual-metric population/area bar charts</td><td>Section 4.6.1 & 5.2</td></tr>
    <tr><td>Zero-Backend Persistence</td><td>Zustand localStorage with versioned schema migrations (v1 → v2)</td><td>Section 4.6.5 & 5.1</td></tr>
    <tr><td>Rigorous Quality Assurance</td><td>58 Vitest unit tests (100% passing) and Playwright e2e suites</td><td>Section 5.3</td></tr>
  </table>
  
  <p style="margin-top:10px;">
    **Lessons Learned:** (1) External web APIs must always be treated as untrusted and rate-limited.
    (2) Client-side persistence requires defensive versioned migration strategies to prevent data corruption.
    (3) Pure, deterministic logic decoupled from UI frameworks enables fast, resilient unit testing.
  </p>




---

  37
  ## 6.2 Future Scope

  
    FlagForge's modular architecture establishes a clean foundation for subsequent academic and commercial extensions:
  


  
    - **Real-Time Peer-to-Peer Multiplayer:** Integrating WebRTC data channels to enable low-latency head-to-head flag duel competitions without central game servers.
    - **Interactive 3D WebGL Globe:** Embedding Three.js / MapLibre to allow learners to rotate, zoom, and query geopolitical borders on a spherical 3D projection.
    - **Native Audio Pronunciations:** Integrating crowdsourced Wikimedia phonetics for country and capital names across indigenous languages.
    - **Classroom Educator Mode:** Allowing teachers to curate custom regional flag decks and export student mastery matrices as CSV reports.
    - **Expanded Geopolitical Datasets:** Incorporating World Bank economic metrics (GDP, literacy rate, life expectancy) into the comparison matrix.
  
  
  <table>
    <tr>
      <th style="width:25%;">Proposed Extension</th>
      <th style="width:35%;">Affected Module / Layer</th>
      <th style="width:40%;">Technical Prerequisite</th>
    </tr>
    <tr><td>WebRTC Multiplayer Duels</td><td>`src/lib/multiplayer`</td><td>Signaling server & WebRTC STUN/TURN config</td></tr>
    <tr><td>3D WebGL Interactive Globe</td><td>`src/components/features/country`</td><td>Three.js or MapLibre GL canvas shaders</td></tr>
    <tr><td>Audio Name Pronunciations</td><td>`src/lib/api/pronunciations`</td><td>Wikimedia Commons audio media API integration</td></tr>
    <tr><td>Educator Deck Creator</td><td>`src/store/useDeckStore.ts`</td><td>Custom quiz collection persistence schema</td></tr>
    <tr><td>World Bank Socioeconomics</td><td>`src/lib/api/worldbank.ts`</td><td>Additional API adapter & chart indicators</td></tr>
  </table>




---

  38
  # 7. References

  <ol style="font-size:9.5pt; line-height:1.75;">
    - FlagForge Source Repository: [https://github.com/KAUSHALCODER123/geo-guess](https://github.com/KAUSHALCODER123/geo-guess)
    - Next.js 15 Documentation (App Router & Server Components): [https://nextjs.org/docs](https://nextjs.org/docs)
    - React 19 Documentation & Architecture: [https://react.dev](https://react.dev)
    - REST Countries v3.1 API Reference: [https://restcountries.com](https://restcountries.com)
    - Wikimedia REST API Reference (Page Summaries): [https://en.wikipedia.org/api/rest_v1/](https://en.wikipedia.org/api/rest_v1/)
    - Open-Meteo Weather API Reference: [https://open-meteo.com/en/docs](https://open-meteo.com/en/docs)
    - Tailwind CSS v4 Documentation: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
    - Radix UI Accessible Headless Primitives: [https://www.radix-ui.com](https://www.radix-ui.com)
    - Zustand State Management & Persist Middleware: [https://zustand.docs.pmnd.rs](https://zustand.docs.pmnd.rs)
    - TanStack Query v5 Documentation: [https://tanstack.com/query/latest](https://tanstack.com/query/latest)
    - Vitest Fast Unit Test Framework: [https://vitest.dev](https://vitest.dev)
    - Playwright End-to-End Testing Engine: [https://playwright.dev](https://playwright.dev)
    - Deque axe-core Web Accessibility Engine: [https://github.com/dequelabs/axe-core](https://github.com/dequelabs/axe-core)
    - W3C Web Content Accessibility Guidelines (WCAG) 2.2: [https://www.w3.org/TR/WCAG22/](https://www.w3.org/TR/WCAG22/)
    - Fuse.js Lightweight Fuzzy Search: [https://fusejs.io](https://fusejs.io)
    - Recharts Composable React Charting Library: [https://recharts.org](https://recharts.org)
    - Framer Motion Declarative Animations for React: [https://motion.dev](https://motion.dev)
    - Zod TypeScript-First Schema Validation: [https://zod.dev](https://zod.dev)
    - Mulberry32 Pseudo-Random Number Generator Algorithm (Tommy Ettinger): [https://gist.github.com](https://gist.github.com/tommyettinger/46a87453d784443199ac6ff2f18184c7)
    - Web Audio API W3C Recommendation: [https://www.w3.org/TR/webaudio/](https://www.w3.org/TR/webaudio/)
    - ISO 3166-1 Alpha-3 Country Codes Standard: [https://www.iso.org](https://www.iso.org/iso-3166-country-codes.html)
    - Vercel Edge Platform & Static Generation: [https://vercel.com/docs](https://vercel.com/docs)
  




---

  39
  # 8. Synopsis

  **Project Title:** Geography & Culture Learning Platform (FlagForge)


  **Purpose:** To engineer a production-grade, highly engaging, and accessible geography and culture learning web application that combines public geopolitical APIs with deterministic active-recall trivia, multi-nation benchmarking, and longitudinal learning analytics without requiring custom backend databases.


  **Target Users:** Primary/Secondary Students, Geography Teachers, Trivia Enthusiasts, General Public.


  **Platform:** Responsive Progressive Web App (PWA) supporting Desktop, Tablet, and Mobile browsers.


  **Core Stack:** Next.js 15.2.9 (App Router), React 19, TypeScript strict, Tailwind CSS v4, Radix UI, Zustand 5 (persist & migrations), TanStack Query 5, Recharts 2.15, Vitest, Playwright, axe-core.


  **Primary Modules:**


  
    - World Atlas Explorer with Fuse.js fuzzy search and multi-faceted filtering
    - Statically pre-rendered Country Profiles (30 SSG paths) with Wikipedia and Open-Meteo telemetry
    - Multi-Nation Benchmarking Matrix with Recharts radar and bar charts
    - Deterministic Mulberry32 Quiz Engine with 6 question generator modes
    - UTC-Seeded Synchronized Daily Challenge with Wordle-style shareable emoji grids
    - Longitudinal Progress Dashboard with streak tracking and achievement badges
    - Embedded Fallback Dataset & Service Worker for 100% offline functionality
  
  
  **Project Metrics at a Glance:**


  <table>
    <tr><th style="width:40%;">Item</th><th>Value</th></tr>
    <tr><td>Route Files & Static Paths</td><td>14 pages (30 SSG pre-rendered static nation paths, 42 pages total)</td></tr>
    <tr><td>Codebase Volume</td><td>~10,000 lines of strict TypeScript, TSX, and Tailwind v4 CSS</td></tr>
    <tr><td>Database & Persistence</td><td>0 remote databases; 3 versioned Zustand localStorage schemas (v1 → v2)</td></tr>
    <tr><td>Declared NPM Packages</td><td>21 runtime packages, 17 development tooling packages</td></tr>
    <tr><td>Automated Test Suite</td><td>58 Vitest unit tests (100% passing) and 4 Playwright browser e2e suites</td></tr>
    <tr><td>Accessibility Rating</td><td>Zero axe-core accessibility violations (WCAG 2.2 AA compliant)</td></tr>
  </table>
  
  
    
      _____________________________
      Signature of the Student
      (Kaushal Rajput)
      Date: 24-10-2026
    
    
      _____________________________
      Signature of the Guide
      (Department of Computer Science)
      Place: Khadavli