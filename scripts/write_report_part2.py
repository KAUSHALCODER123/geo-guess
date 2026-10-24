# -*- coding: utf-8 -*-
"""
Part 2: Figures, Index, Chapter 1, Chapter 2, Chapter 3
"""

import sys
from pathlib import Path

WORKSPACE = Path(r"c:\Users\Kaushal Rajput\food-waste-system")
SCRIPTS = WORKSPACE / "scripts"

part2 = '''
PAGE_FIGURES = f"""
<div class="page" style="padding: 25px 10px;">
  <h2 style="text-align:center; font-size:16pt; font-weight:bold; letter-spacing:1px; margin-bottom:20px;">List of Figures</h2>
  <table>
    <tr>
      <th style="width:12%; text-align:center;">Figure Number</th>
      <th colspan="2">Figure Name</th>
    </tr>
    <tr><td style="text-align:center; font-weight:bold;">1</td><td colspan="2">Development Process Model (Agile Incremental SDLC)</td></tr>
    <tr><td style="text-align:center; font-weight:bold;">2</td><td colspan="2">End-to-End Project Workflow &amp; Gameplay Loop</td></tr>
    <tr><td style="text-align:center; font-weight:bold;" rowspan="2">3</td><td style="width:8%; text-align:center;">1</td><td>DFD Level 0 (Context-Level Diagram)</td></tr>
    <tr><td style="text-align:center;">2</td><td>DFD Level 1 (Modular Functional Data Flow)</td></tr>
    <tr><td style="text-align:center; font-weight:bold;" rowspan="6">4</td><td style="text-align:center;">1</td><td>UML Use Case Diagram</td></tr>
    <tr><td style="text-align:center;">2</td><td>UML Domain Class and Object Diagram</td></tr>
    <tr><td style="text-align:center;">3</td><td>UML Activity Diagram (Quiz Game Engine Loop)</td></tr>
    <tr><td style="text-align:center;">4</td><td>UML Sequence Diagram (Parallel Batched REST Countries Fetch)</td></tr>
    <tr><td style="text-align:center;">5</td><td>Browser Storage &amp; Persistent Entity Schema Diagram</td></tr>
    <tr><td style="text-align:center;">6</td><td>UML Component Architecture Diagram</td></tr>
    <tr><td style="text-align:center; font-weight:bold;">5</td><td colspan="2">Gantt Chart (Eight-Week Academic Engineering Timeline)</td></tr>
    <tr><td style="text-align:center; font-weight:bold;">6</td><td colspan="2">Layered System Architecture</td></tr>
    <tr><td style="text-align:center; font-weight:bold;">7</td><td colspan="2">Graphical User Interface (Primary Screens 7.1 to 7.8)</td></tr>
    <tr><td style="text-align:center; font-weight:bold;" rowspan="10">8</td><td style="text-align:center;">1</td><td>Federated Data Sources &amp; Responsibilities</td></tr>
    <tr><td style="text-align:center;">2</td><td>Parallel Batch Fetching &amp; cca3 Merge Pipeline</td></tr>
    <tr><td style="text-align:center;">3</td><td>Mulberry32 PRNG &amp; Regional Distractor Selection Hierarchy</td></tr>
    <tr><td style="text-align:center;">4</td><td>Structural &amp; Behavioral UML Views Interconnection</td></tr>
    <tr><td style="text-align:center;">5</td><td>Speed Bonus &amp; Streak Multiplier Scoring Formula Flow</td></tr>
    <tr><td style="text-align:center;">6</td><td>Zustand Persist Versioned Schema Migration (v1 &rarr; v2)</td></tr>
    <tr><td style="text-align:center;">7</td><td>Declared Packages by Purpose</td></tr>
    <tr><td style="text-align:center;">8</td><td>HTTP Resilience &amp; Query Caching Parameter Thresholds</td></tr>
    <tr><td style="text-align:center;">9</td><td>Codebase Volume Distribution by Subsystem (Lines of Code)</td></tr>
    <tr><td style="text-align:center;">10</td><td>Automated Verification Suite Distribution (58 Vitest &amp; E2E Specs)</td></tr>
  </table>
</div>
"""

PAGE_INDEX = f"""
<div class="page" style="padding: 25px 10px;">
  <h2 style="text-align:center; font-size:16pt; font-weight:bold; letter-spacing:1px; margin-bottom:20px;">INDEX</h2>
  <table>
    <tr>
      <th style="width:10%; text-align:center;">Chp No</th>
      <th style="width:12%; text-align:center;">Sec No</th>
      <th>Page Title</th>
      <th style="width:12%; text-align:center;">Page No</th>
    </tr>
    <tr><td style="text-align:center; font-weight:bold;">1</td><td></td><td><strong>Project Overview</strong></td><td style="text-align:center;">1</td></tr>
    <tr><td style="text-align:center; font-weight:bold;" rowspan="4">2</td><td></td><td><strong>Introduction &amp; Motivation</strong></td><td style="text-align:center;">2</td></tr>
    <tr><td>2.1</td><td>Theory Behind the Project</td><td style="text-align:center;">3</td></tr>
    <tr><td>2.2</td><td>Problem Definition</td><td style="text-align:center;">4</td></tr>
    <tr><td>2.3</td><td>Need for Project</td><td style="text-align:center;">5</td></tr>
    <tr><td style="text-align:center; font-weight:bold;">3</td><td></td><td><strong>Literature Survey</strong></td><td style="text-align:center;">6</td></tr>
    <tr><td style="text-align:center; font-weight:bold;" rowspan="14">4</td><td></td><td><strong>Analysis &amp; Design</strong></td><td style="text-align:center;">7</td></tr>
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
    <tr><td style="text-align:center; font-weight:bold;" rowspan="4">5</td><td></td><td><strong>Implementation</strong></td><td style="text-align:center;">24</td></tr>
    <tr><td>5.1</td><td>Source Code Excerpts</td><td style="text-align:center;">25</td></tr>
    <tr><td>5.2</td><td>Graphical User Interface</td><td style="text-align:center;">31</td></tr>
    <tr><td>5.3</td><td>Test Cases &amp; Verification Suite</td><td style="text-align:center;">35</td></tr>
    <tr><td style="text-align:center; font-weight:bold;" rowspan="3">6</td><td></td><td><strong>Conclusion &amp; Future Scope</strong></td><td style="text-align:center;">36</td></tr>
    <tr><td>6.1</td><td>Conclusion</td><td style="text-align:center;">36</td></tr>
    <tr><td>6.2</td><td>Future Scope</td><td style="text-align:center;">37</td></tr>
    <tr><td style="text-align:center; font-weight:bold;">7</td><td></td><td><strong>References</strong></td><td style="text-align:center;">38</td></tr>
    <tr><td style="text-align:center; font-weight:bold;">8</td><td></td><td><strong>Synopsis</strong></td><td style="text-align:center;">39</td></tr>
  </table>
</div>
"""

CHP1_OVERVIEW = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">1</div>
  <h1 class="chp-head">1. Project Overview</h1>
  
  <p><strong>Key Features:</strong></p>
  <ol>
    <li><strong>Federated World Atlas Explorer:</strong> Instant client-side fuzzy searching across common names, official names, capitals, regions, and ISO cca3 codes via Fuse.js. Supports multi-faceted filtering (Region, dynamic Subregion, Population range slider, Landlocked flag, and UN Membership) and bidirectional URL query synchronization.</li>
    <li><strong>Granular Nation Intelligence:</strong> Comprehensive country profile pre-rendering 30 top sovereign states via Next.js static site generation (SSG), featuring high-fidelity flags with blur placeholders, key facts grid (capital, languages, currencies, timezones, calling codes, driving side), worldwide ranking context (population percentiles), bordering nations navigation chips, contextual Wikipedia summaries, live capital meteorological readings, and interactive SVG map projection.</li>
    <li><strong>Multi-Nation Benchmarking Matrix:</strong> Allows users to pick up to 3 nations for side-by-side metric comparison with automatic winner highlighting (gold badges) and interactive Recharts data visualizations (population/area dual bar charts and normalized radar charts).</li>
    <li><strong>Pure Deterministic Quiz Engine:</strong> Algorithmic gameplay engine powered by a Mulberry32 seeded pseudo-random number generator (PRNG) supporting 6 distinct question modes (Flag &rarr; Country, Country &rarr; Capital, Capital &rarr; Country, Higher/Lower demographics, "Which borders X?", and Map Location). Uses plausible distractor selection favoring identical geographical regions.</li>
    <li><strong>Synchronized Global Daily Challenge:</strong> Seeded daily by the numeric UTC date string, providing every user across the globe the exact same 10 questions each day, with a 1-attempt lockout, countdown timer to UTC midnight, and shareable Wordle-style emoji result grid.</li>
    <li><strong>Longitudinal Analytics &amp; Achievements:</strong> Zustand-backed dashboard tracking streak metrics, total games, accuracy over time charts, per-region performance radar, weakest countries targeted review, and a progressive achievement badges system.</li>
    <li><strong>Offline Resilience &amp; PWA Support:</strong> Full offline capabilities enabled through an embedded fallback dataset, service worker cache-first strategy for assets, and 24-hour TanStack Query stale-time.</li>
  </ol>
  
  <p>
    <strong>Scope of the System:</strong> The project provides a client-side, zero-database educational web application.
    Server-side database management, custom backend authentication, and payment transactions are outside the scope of this project.
  </p>
  
  <p>The table below maps each core feature to its codebase implementation and user accessibility:</p>
  <table>
    <tr>
      <th style="width:25%;">Feature</th>
      <th style="width:50%;">Implemented in</th>
      <th style="width:25%;">Available to</th>
    </tr>
    <tr><td>Atlas search &amp; filters</td><td>src/components/features/explorer, src/lib/api/restcountries.ts; /explore</td><td>All visitors</td></tr>
    <tr><td>Country detail profile</td><td>src/components/features/country, src/lib/api/wikipedia.ts, weather.ts; /country/[code]</td><td>All visitors</td></tr>
    <tr><td>Nation benchmarking</td><td>src/components/features/compare, compare-matrix.tsx, compare-charts.tsx; /compare</td><td>All visitors</td></tr>
    <tr><td>Deterministic Quiz Engine</td><td>src/lib/quiz (rng, generator, scoring, distractors); /play</td><td>All visitors</td></tr>
    <tr><td>Synchronized Daily Mode</td><td>src/lib/quiz/generator.ts, DailyModal.tsx; /daily</td><td>All visitors</td></tr>
    <tr><td>Analytics &amp; Heatmap</td><td>src/components/features/stats, useProgressStore.ts; /stats</td><td>All visitors</td></tr>
    <tr><td>Offline Service Worker</td><td>public/sw.js, manifest.ts, fallback-countries.ts</td><td>All visitors (offline)</td></tr>
    <tr><td>Design System Showcase</td><td>src/components/ui, src/components/common; /design</td><td>Dev &amp; Evaluators</td></tr>
  </table>
</div>
"""

CHP2_INTRO = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">2</div>
  <h1 class="chp-head">2. Introduction &amp; Motivation</h1>
  <p>
    Geography is foundational to global literacy, geopolitics, and cultural appreciation. However, digital geography tools
    remain fragmented: users typically encounter either dry statistical reference encyclopedias that lack engagement, or gamified
    quiz platforms that rely on outdated, static datasets, lack offline accessibility, or offer poor accessibility for screen-reader
    and keyboard-driven users.
  </p>
  <p>
    <strong>FlagForge</strong> resolves this division by uniting authentic, real-time geopolitical intelligence with high-fidelity,
    accessible, and gamified pedagogical engineering. It synthesizes official country demographics from REST Countries v3.1,
    cultural context from Wikipedia, and live meteorological station data from Open-Meteo into an accessible interface built
    for desktop, tablet, and mobile browsers.
  </p>
  <p>
    The system is developed with cutting-edge web technologies: <strong>Next.js 15 (App Router)</strong> and <strong>React 19</strong>
    with strict <strong>TypeScript 5</strong>, styled using <strong>Tailwind CSS v4</strong> and <strong>Radix UI</strong> primitives,
    animated via <strong>Framer Motion</strong>, state-managed with <strong>Zustand 5</strong> persist middleware, and cached
    through <strong>TanStack Query v5</strong>.
  </p>
  <p>
    The primary motivation is educational efficacy and accessibility. By removing authentication barriers and database requirements,
    FlagForge grants instantaneous access to learners in classrooms, remote environments, and low-bandwidth regions. Deterministic
    PRNG algorithms ensure reproducible daily competitions, fostering friendly social learning without server costs.
  </p>
  
  <div class="fig-wrap">
    {SVG_FIG1_PROCESS}
    <div class="fig-cap">Figure 8.1: FlagForge federating external geopolitical sources with local browser persistence</div>
  </div>
</div>
"""

CHP2_SECTIONS = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">3</div>
  <h2 class="sec-head">2.1 Theory Behind the Project</h2>
  <p>
    FlagForge is founded upon four core computer science principles: federated API data normalization under strict network constraints,
    deterministic pseudo-random procedural generation, client-side persistence with schema migrations, and WCAG 2.2 AA accessibility.
  </p>
  <p>
    <strong>1. Federated API Ingestion &amp; 10-Field Restriction:</strong> The REST Countries v3.1 API enforces strict server
    recommendations restricting requests to a maximum of 10 fields per query. FlagForge complies by splitting requests into parallel
    batches (&le;10 fields each), querying them asynchronously with AbortControllers, and merging the resulting records in memory
    keyed by ISO 3166-1 alpha-3 (<code>cca3</code>) codes.
  </p>
  <p>
    <strong>2. Deterministic Procedural Generation:</strong> Online trivia games frequently suffer from lack of reproducibility or
    question bias. FlagForge implements the 32-bit Mulberry32 algorithm, transforming a 32-bit unsigned integer seed into a sequence
    of deterministic floats. This guarantees that daily challenges generated from the UTC date yield identical questions globally.
  </p>
  <p>
    <strong>3. Persistent Client-Side State &amp; Schema Migrations:</strong> Without a remote database, user analytics must survive
    browser reloads. Zustand persist middleware writes directly to <code>localStorage</code> with explicit version numbers (v1 &rarr; v2).
    Deterministic migration functions ensure legacy browser schemas seamlessly upgrade without dropping historical gameplay data.
  </p>
  <p>
    <strong>4. Resilient Offline Architecture:</strong> Educational tools must function during network drops. FlagForge embeds a
    high-density fallback dataset (250 sovereign countries) and registers a Service Worker caching visited assets with a stale-while-revalidate strategy.
  </p>
  
  <div class="fig-wrap">
    {SVG_FIG2_WORKFLOW}
    <div class="fig-cap">Figure 8.2: End-to-end data pipeline from API batches to normalized UI components</div>
  </div>
</div>
"""

CHP2_PROBLEM = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">4</div>
  <h2 class="sec-head">2.2 Problem Definition</h2>
  <p>
    Geographic information is dispersed across multiple unaligned sources. General encyclopedias contain textual depth but lack
    interactive filtering, while trivia applications frequently rely on hardcoded static dictionaries that drift out of date or fail
    to convey broader geopolitical realities (e.g., timezones, currencies, driving orientation, and climate telemetry).
  </p>
  <p>
    Furthermore, free public APIs present operational hazards: network timeouts, rate limits, schema anomalies, and sudden downtime.
    Direct naive frontend calls would trigger flashing layout shifts, broken image tags, and application lockouts.
  </p>
  <p>
    <strong>Problem Statement:</strong> <em>To design and implement a resilient, zero-backend web application that harmonizes
    disparate geopolitical, encyclopedic, and meteorological APIs into a unified, accessible, and deterministic learning platform
    that functions seamlessly offline and persists longitudinal progress locally.</em>
  </p>
  
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
    <tr><td>Local storage schema corruption across versions</td><td>Zustand versioned migrations (v1 &rarr; v2)</td><td>src/store/useProgressStore.ts</td></tr>
    <tr><td>Motor and visual accessibility barriers</td><td>WCAG 2.2 AA visible rings, 1-4 key shortcuts, contrast</td><td>globals.css, QuestionCard.tsx</td></tr>
  </table>
</div>
"""

CHP2_NEED = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">5</div>
  <h2 class="sec-head">2.3 Need for the Project</h2>
  <p>
    Students, teachers, and curious citizens need reliable, intuitive geographic knowledge at their fingertips. A browser-based,
    installable web application provides ubiquitous access without app store gatekeepers, license fees, or invasive user tracking.
  </p>
  <p>
    <strong>Immediate Zero-Auth Exploration:</strong> By eliminating registration barriers, users in schools, libraries, and mobile
    settings can immediately explore data or compete in quizzes without creating accounts.
  </p>
  <p>
    <strong>Pedagogical Rigor Through Contrast:</strong> Learning geography requires comparative analysis. FlagForge's multi-nation
    benchmarking matrix allows learners to contrast demographic density, land area, languages, and physical borders, transforming
    isolated facts into spatial comprehension.
  </p>
  
  <table>
    <tr>
      <th style="width:25%;">User Group</th>
      <th style="width:45%;">What It Gains</th>
      <th style="width:30%;">Access Capabilities Without Auth</th>
    </tr>
    <tr><td><strong>Student Learner</strong></td><td>Frictionless access to flags, capitals, and real-time capital weather</td><td>Full exploration, all 6 quiz modes, local bookmarks</td></tr>
    <tr><td><strong>Trivia Enthusiast</strong></td><td>Deterministic daily challenges with shareable Wordle-style score grids</td><td>1 daily attempt, streak tracking, accuracy radar</td></tr>
    <tr><td><strong>Geography Educator</strong></td><td>Curriculum tool with verifiable distractor logic and comparative radar charts</td><td>Side-by-side nation comparisons, custom mode filters</td></tr>
    <tr><td><strong>Software Maintainer</strong></td><td>Strictly typed codebase with 58 Vitest unit tests and 0 backend maintenance</td><td>Fully reproducible builds, client-only hosting</td></tr>
  </table>
</div>
"""

CHP3_LIT = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">6</div>
  <h1 class="chp-head">3. Literature Survey</h1>
  <p>
    Modern educational platforms integrate open data endpoints with interactive browser interfaces. FlagForge builds upon
    three established public APIs, each fulfilling a distinct architectural role:
  </p>
  <p>
    <strong>REST Countries v3.1:</strong> Provides comprehensive geopolitical metadata for 250 sovereign entities. Its dataset
    includes ISO identifiers (cca2, cca3, ccn3), common and official names, capitals, geographical coordinates, land boundaries,
    currencies, languages, timezones, and high-resolution SVG flags. FlagForge strictly honors its field restriction policies.
  </p>
  <p>
    <strong>Wikipedia REST Summary API:</strong> Provides objective cultural, historical, and geopolitical synopses. FlagForge queries
    the REST summary endpoint (<code>/api/rest_v1/page/summary/[title]</code>), dynamically displaying extracts and thumbnails with
    fallback handling for disambiguation errors.
  </p>
  <p>
    <strong>Open-Meteo Weather API:</strong> A high-performance, keyless meteorological service that computes real-time atmospheric
    conditions from national weather models. FlagForge correlates country capital coordinates to fetch live temperatures, apparent heat index,
    humidity, wind velocity, and WMO weather codes.
  </p>
  
  <table>
    <tr>
      <th style="width:20%;">Service</th>
      <th style="width:30%;">Main Role</th>
      <th style="width:30%;">Signal / Constraint</th>
      <th style="width:20%;">Client Module</th>
    </tr>
    <tr><td><strong>REST Countries v3.1</strong></td><td>Geopolitical catalog &amp; boundaries</td><td>Max 10 fields per request; ?fields= batching</td><td>src/lib/api/restcountries.ts</td></tr>
    <tr><td><strong>Wikipedia REST</strong></td><td>Cultural &amp; historical summaries</td><td>URL-encoded title; 6s timeout &amp; exponential backoff</td><td>src/lib/api/wikipedia.ts</td></tr>
    <tr><td><strong>Open-Meteo API</strong></td><td>Live capital atmospheric telemetry</td><td>Latitude/Longitude coordinates; WMO code mapping</td><td>src/lib/api/weather.ts</td></tr>
    <tr><td><strong>Embedded Fallback</strong></td><td>Offline air-gapped continuity</td><td>Full 250-country dataset embedded in bundle</td><td>src/lib/api/fallback-countries.ts</td></tr>
  </table>
  
  <p style="margin-top:14px;"><strong>Comparative Analysis with Existing Solutions:</strong></p>
  <table>
    <tr>
      <th>Platform</th>
      <th>Data Freshness</th>
      <th>Accessibility</th>
      <th>Offline Support</th>
      <th>Backend Cost</th>
    </tr>
    <tr><td><strong>Seterra</strong></td><td>Static closed database</td><td>Moderate (mouse-centric)</td><td>Requires Desktop App</td><td>Proprietary servers</td></tr>
    <tr><td><strong>GeoGuessr</strong></td><td>Google Street View API</td><td>Low (heavy visual only)</td><td>None (bandwidth heavy)</td><td>High subscription costs</td></tr>
    <tr><td><strong>Sporcle</strong></td><td>User-generated trivia</td><td>Poor (ad-heavy, flash)</td><td>None</td><td>Central server database</td></tr>
    <tr><td><strong>FlagForge (Ours)</strong></td><td>Live Federated REST APIs</td><td>Full WCAG 2.2 AA (1-4 keys)</td><td>Full Service Worker + Fallback</td><td>Zero ($0 serverless static)</td></tr>
  </table>
</div>
"""
'''

with open(SCRIPTS / "report_part2.py", "w", encoding="utf-8") as f:
    f.write(part2)

print("Wrote report_part2.py")
