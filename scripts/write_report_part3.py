# -*- coding: utf-8 -*-
"""
Part 3: Chapter 4 Analysis & Design
"""

import sys
from pathlib import Path

WORKSPACE = Path(r"c:\Users\Kaushal Rajput\food-waste-system")
SCRIPTS = WORKSPACE / "scripts"

part3 = '''
CHP4_ANALYSIS = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">7</div>
  <h1 class="chp-head">4. Analysis &amp; Design</h1>
  <p>
    The analysis phase establishes functional and non-functional specifications by decomposing user interaction pathways across
    general students, trivia players, educators, and software evaluators.
  </p>
  <p>
    <strong>Functional Analysis:</strong> The system must deliver: (1) real-time fuzzy search across sovereign states with instantaneous
    multi-faceted filtering; (2) statically pre-rendered country intelligence views including capital weather, Wikipedia summaries,
    and SVG geospatial projections; (3) side-by-side benchmarking of up to 3 nations with automated metric winner detection and Recharts
    visualizations; (4) a deterministic 6-mode quiz generator with Mulberry32 PRNG and regional distractors; (5) a UTC-seeded synchronized
    Daily Challenge with Wordle-style shareable emoji grids; and (6) an analytics dashboard with accuracy heatmap and achievements.
  </p>
  <p>
    <strong>Non-Functional Analysis:</strong> The platform must maintain strict WCAG 2.2 AA accessibility, visible focus rings,
    motor keyboard controls (1-4 keys), high-contrast modes, mobile responsiveness, sub-2-second Largest Contentful Paint (LCP),
    and graceful offline degradation using service workers and an embedded 250-country fallback bundle.
  </p>
  
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
</div>
"""

CHP4_PROCESS_FLOW = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">8</div>
  <h2 class="sec-head">4.1 Process Model</h2>
  <p>
    The project adopts an <strong>Agile Incremental Software Development Lifecycle (SDLC)</strong> model. Each phase feeds
    directly into downstream implementation, while empirical findings from automated accessibility audits and network latency
    benchmarks feed back into architectural refinements.
  </p>
  <div class="fig-wrap">
    {SVG_FIG1_PROCESS}
    <div class="fig-cap">Figure 1: Incremental Development Process Model with Continuous Verification Feedback Loops</div>
  </div>
  <table>
    <tr>
      <th style="width:20%;">Phase</th>
      <th style="width:40%;">Main Deliverable</th>
      <th style="width:25%;">Verification Method</th>
      <th style="width:15%;">Section</th>
    </tr>
    <tr><td>1. Requirement Analysis</td><td>Domain models, REST API field constraints, user journeys</td><td>Requirements walkthrough</td><td>Chapter 4</td></tr>
    <tr><td>2. Architectural Design</td><td>UML models, DFDs, Zustand migration schemas, UI tokens</td><td>Design system review</td><td>4.5 to 4.9</td></tr>
    <tr><td>3. Data &amp; Core Engine</td><td>Batched API clients, Mulberry32 PRNG, quiz generators</td><td>58 Vitest unit tests</td><td>5.1</td></tr>
    <tr><td>4. Interface &amp; Pages</td><td>Explorer, country profile, comparison matrix, quiz HUD</td><td>Playwright e2e specs</td><td>5.2</td></tr>
    <tr><td>5. Verification &amp; Audit</td><td>Lighthouse mobile audits, axe-core WCAG 2.2 AA passes</td><td>CI build &amp; axe audit</td><td>5.3</td></tr>
    <tr><td>6. Documentation &amp; Deploy</td><td>Production report, deploy guide, GitHub repository</td><td>Peer review &amp; build run</td><td>Docs &amp; Git</td></tr>
  </table>
</div>
"""

CHP4_WORKFLOW = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">9</div>
  <h2 class="sec-head">4.2 Flow of Project</h2>
  <p>
    The project flow traces a learner's progression from initial discovery through comparative analysis, active recall gameplay,
    and longitudinal skill tracking:
  </p>
  <div class="fig-wrap">
    {SVG_FIG2_WORKFLOW}
    <div class="fig-cap">Figure 2: Comprehensive Project Workflow and Data Processing Streams</div>
  </div>
  <p>
    <strong>1. Exploration Stream:</strong> The learner inputs search tokens or toggles region filters. Fuse.js indexes common and official
    names, returning filtered results in under 5ms. Selecting a country initiates an SSG route transition to <code>/country/[code]</code>,
    populating Wikipedia extracts and capital weather telemetry.
  </p>
  <p>
    <strong>2. Benchmarking Stream:</strong> From any country card or direct navigation, users add up to 3 sovereign states to the comparison
    hopper. Normalized metrics generate dynamic radar charts and population bars, automatically tagging winning criteria.
  </p>
  <p>
    <strong>3. Gameplay &amp; Daily Challenge Stream:</strong> The learner selects a quiz mode or launches the UTC Daily Challenge.
    Questions are procedurally generated via Mulberry32 PRNG with plausible regional distractors. The gameplay loop tracks timer bonuses
    and streak multipliers, writing finalized scores to Zustand <code>localStorage</code>.
  </p>
</div>
"""

CHP4_FEASIBILITY = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">10</div>
  <h2 class="sec-head">4.3 Feasibility Study</h2>
  <p>
    A rigorous feasibility study evaluates whether the project is practically and economically viable across four standard dimensions:
  </p>
  <p>
    <strong>Technical Feasibility:</strong> The architecture relies on robust web standards: Next.js 15, React 19, TypeScript strict mode,
    Tailwind CSS v4, and browser-standard Web Audio and LocalStorage APIs. It operates inside any modern browser without desktop runtimes.
    Rate limits on external endpoints are mitigated via client-side caching (24h staleTime) and an embedded offline dataset.
  </p>
  <p>
    <strong>Economic Feasibility:</strong> The application incurs <strong>$0 in recurring backend costs</strong>. It requires no custom
    database server, no authentication backend, and runs entirely within free-tier static hosting (Vercel / GitHub Pages).
  </p>
  <p>
    <strong>Operational Feasibility:</strong> By offering a zero-login guest experience with persistent local storage, users can
    immediately engage without registration barriers. Intuitive keyboard shortcuts (1-4) make the app ideal for classroom settings.
  </p>
  <p>
    <strong>Schedule Feasibility:</strong> The system was scoped and engineered over an 8-week academic cycle, prioritizing modular
    subsystems that could be tested independently.
  </p>
  
  <table>
    <tr>
      <th style="width:25%;">Risk Category</th>
      <th style="width:35%;">Potential Effect</th>
      <th style="width:40%;">Design Mitigation Strategy</th>
    </tr>
    <tr><td>REST Countries Downtime</td><td>Empty search grids / broken images</td><td>Embedded 250-country fallback bundle + SW cache</td></tr>
    <tr><td>API 10-Field Query Limitation</td><td>Server rejects oversized queries (400)</td><td>Strict batched parallel fetching merged on cca3</td></tr>
    <tr><td>Daily Mode Seed Deviation</td><td>Different players get different questions</td><td>Deterministic Mulberry32 PRNG seeded by UTC date</td></tr>
    <tr><td>Browser Storage Schema Drift</td><td>Corrupted user streak or crash on reload</td><td>Zustand persist versioned migration (v1 &rarr; v2)</td></tr>
    <tr><td>Color Contrast Failures</td><td>Accessibility barrier for visually impaired</td><td>WCAG 2.2 AA compliant palette &ge; 4.5:1 ratio</td></tr>
  </table>
</div>
"""

CHP4_COST = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">11</div>
  <h2 class="sec-head">4.4 Cost Analysis</h2>
  <p>
    Cost analysis examines the resources required to engineer, deploy, and maintain FlagForge across development, demonstration,
    and scaled operational phases:
  </p>
  <table>
    <tr>
      <th style="width:22%;">Cost Item</th>
      <th style="width:26%;">Development Phase</th>
      <th style="width:26%;">Demonstration Phase</th>
      <th style="width:26%;">Scaled Public Phase</th>
    </tr>
    <tr><td>IDE &amp; Tooling (VS Code, Git)</td><td>Free Open Source</td><td>Free Open Source</td><td>Free Open Source</td></tr>
    <tr><td>Hosting &amp; Edge CDN</td><td>Localhost ($0)</td><td>Vercel Hobby ($0)</td><td>Vercel Pro ($20/mo optional)</td></tr>
    <tr><td>Database Infrastructure</td><td>$0 (LocalStorage)</td><td>$0 (LocalStorage)</td><td>$0 (Zero-backend design)</td></tr>
    <tr><td>External Data Ingestion</td><td>$0 (Public REST APIs)</td><td>$0 (Public REST APIs)</td><td>$0 (Within free rate limits)</td></tr>
    <tr><td>Domain &amp; SSL Certificate</td><td>Not required</td><td>Free Vercel Subdomain</td><td>$12/year custom domain</td></tr>
    <tr><td>Engineering Effort</td><td>Student Academic Hours</td><td>Low maintenance</td><td>Open-source community</td></tr>
  </table>
  <p style="margin-top:14px;"><strong>Cost Drivers and Mitigation Strategy:</strong></p>
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
</div>
"""

CHP4_DFD = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">12</div>
  <h2 class="sec-head">4.5 Data Flow Diagram (Level 0)</h2>
  <p>
    The Context-Level Data Flow Diagram (DFD Level 0) models FlagForge as a centralized information broker between external actors,
    geopolitical web services, and browser-resident data stores:
  </p>
  <div class="fig-wrap">
    {SVG_FIG3_1_DFD0}
    <div class="fig-cap">Figure 3.1: DFD Level 0 (Context-Level Diagram of the FlagForge System)</div>
  </div>
  <table>
    <tr>
      <th style="width:20%;">Data Flow</th>
      <th style="width:20%;">Source</th>
      <th style="width:25%;">Destination</th>
      <th style="width:35%;">Content Transmitted</th>
    </tr>
    <tr><td>Query &amp; Filters</td><td>Learner</td><td>FlagForge Web App</td><td>Search token, region, population slider, mode config</td></tr>
    <tr><td>Atlas Telemetry</td><td>FlagForge Web App</td><td>Learner</td><td>Normalized Country cards, rankings, weather, radar charts</td></tr>
    <tr><td>Batched Query</td><td>FlagForge Web App</td><td>REST Countries API</td><td>Batch 1 &amp; Batch 2 params (&le;10 fields per query)</td></tr>
    <tr><td>Raw Country Data</td><td>REST Countries API</td><td>FlagForge Web App</td><td>cca3, flags, capital, demographics, borders</td></tr>
    <tr><td>Encyclopedic Extract</td><td>Wikipedia REST API</td><td>FlagForge Web App</td><td>Summary text, thumbnail URLs, article links</td></tr>
    <tr><td>Weather Telemetry</td><td>Open-Meteo API</td><td>FlagForge Web App</td><td>Temperature, humidity, wind velocity, WMO code</td></tr>
    <tr><td>User Progress State</td><td>FlagForge Web App</td><td>Browser LocalStorage</td><td>Streak, total games, accuracy radar, achievements (v2)</td></tr>
  </table>
</div>
"""

CHP4_DFD1 = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">13</div>
  <h2 class="sec-head">4.5.1 Data Flow Diagram (Level 1)</h2>
  <p>
    At Level 1, the single application process is decomposed into four discrete functional subsystems:
  </p>
  <div class="fig-wrap">
    {SVG_FIG3_2_DFD1}
    <div class="fig-cap">Figure 3.2: DFD Level 1 (Modular Functional Data Flow Breakdown)</div>
  </div>
  <table>
    <tr>
      <th style="width:25%;">Subsystem Process</th>
      <th style="width:25%;">Input Stream</th>
      <th style="width:25%;">Output Stream</th>
      <th style="width:25%;">Internal Data Store</th>
    </tr>
    <tr><td><strong>1.0 Ingestion &amp; Merge</strong></td><td>REST Countries API batches</td><td>Normalized Country[] records</td><td>TanStack Query Cache</td></tr>
    <tr><td><strong>2.0 Search &amp; Filter</strong></td><td>Search query &amp; filter tokens</td><td>Ranked &amp; filtered country list</td><td>Fuse.js In-Memory Index</td></tr>
    <tr><td><strong>3.0 Quiz Engine</strong></td><td>Mode, difficulty, seed</td><td>Procedural QuizQuestion[]</td><td>Mulberry32 PRNG State</td></tr>
    <tr><td><strong>4.0 Storage &amp; Analytics</strong></td><td>Game end answers &amp; speed</td><td>Updated streaks, accuracy radar</td><td>Browser LocalStorage (D2)</td></tr>
  </table>
  <p style="margin-top:12px;"><strong>Degradation &amp; Failure Matrix:</strong></p>
  <table>
    <tr>
      <th style="width:30%;">Failure Scenario</th>
      <th style="width:70%;">System Reaction &amp; Fallback Behavior</th>
    </tr>
    <tr><td>REST Countries API offline</td><td>Instantly hydrates catalog from embedded <code>fallback-countries.ts</code>; displays subtle offline toast</td></tr>
    <tr><td>Wikipedia API timeout (&gt;6s)</td><td>Renders country facts, weather, and maps cleanly while omitting encyclopedia card; no screen crash</td></tr>
    <tr><td>Open-Meteo API rate-limited</td><td>Displays meteorological skeleton / unavailable indicator; main country details remain fully usable</td></tr>
    <tr><td>Corrupted LocalStorage</td><td>Zustand catch block initializes defaults while preserving unaffected store partitions</td></tr>
  </table>
</div>
"""

CHP4_UML_INTRO = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">14</div>
  <h2 class="sec-head">4.6 UML Diagrams</h2>
  <p>
    The Unified Modeling Language (UML) provides standard structural and behavioral blueprints for software systems.
    The subsequent sections detail FlagForge's architecture across multiple architectural perspectives:
  </p>
  <table>
    <tr>
      <th style="width:25%;">UML Diagram</th>
      <th style="width:75%;">System Aspect Modeled in FlagForge</th>
    </tr>
    <tr><td><strong>4.6.1 Use Case Diagram</strong></td><td>Actor interactions across Guest Learners, Quiz Players, and Educators</td></tr>
    <tr><td><strong>4.6.2 Class &amp; Object Diagram</strong></td><td>Domain entities: Country, QuizQuestion, GameState, ProgressState, SettingsState</td></tr>
    <tr><td><strong>4.6.3 Activity Diagram</strong></td><td>Gameplay loop: question presentation, timer decay, answer evaluation, streak bonus</td></tr>
    <tr><td><strong>4.6.4 Sequence Diagram</strong></td><td>Parallel batched REST Countries API fetch with cca3 merge and TanStack Query cache</td></tr>
    <tr><td><strong>4.6.5 Storage / Schema Diagram</strong></td><td>Browser LocalStorage schema definitions and versioned migration routines (v1 &rarr; v2)</td></tr>
    <tr><td><strong>4.6.6 Component Diagram</strong></td><td>Component hierarchy across presentation, hooks, domain engine, and data layers</td></tr>
  </table>
  <div class="fig-wrap">
    {SVG_FIG4_1_USECASE}
    <div class="fig-cap">Figure 8.4: Interrelation of Structural and Behavioral Modeling Views</div>
  </div>
</div>
"""

CHP4_USECASE = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">15</div>
  <h3 class="subsec-head">4.6.1 Use Case Diagram</h3>
  <p>
    FlagForge serves two primary external actor personas: the <strong>Guest Learner</strong> (who focuses on exploring the world atlas,
    inspecting country profiles, and comparing nations) and the <strong>Quiz Player</strong> (who engages in active recall quizzes,
    competes in the daily challenge, and reviews historical learning analytics).
  </p>
  <div class="fig-wrap">
    {SVG_FIG4_1_USECASE}
    <div class="fig-cap">Figure 4.1: UML Use Case Diagram for the FlagForge Learning Platform</div>
  </div>
  <table>
    <tr>
      <th style="width:10%;">ID</th>
      <th style="width:25%;">Use Case</th>
      <th style="width:20%;">Actor</th>
      <th style="width:45%;">System Outcome</th>
    </tr>
    <tr><td>UC1</td><td>Search &amp; Filter Atlas</td><td>Guest Learner</td><td>Displays filtered country cards with URL query synchronization</td></tr>
    <tr><td>UC2</td><td>Inspect Country Detail</td><td>Guest Learner</td><td>Shows hero flag, key facts, Wikipedia extract, and live capital weather</td></tr>
    <tr><td>UC3</td><td>Compare Nations</td><td>Guest Learner</td><td>Generates side-by-side benchmarking matrix with Recharts radar and bar charts</td></tr>
    <tr><td>UC4</td><td>Play 6 Quiz Modes</td><td>Quiz Player</td><td>Executes interactive gameplay loop with timer bonus and streak multiplier</td></tr>
    <tr><td>UC5</td><td>Daily Challenge</td><td>Quiz Player</td><td>Plays UTC-seeded 10-question challenge and shares Wordle-style emoji grid</td></tr>
    <tr><td>UC6</td><td>View Analytics</td><td>Quiz Player</td><td>Inspects accuracy line charts, regional radar, and unlocked achievements</td></tr>
    <tr><td>UC7</td><td>Toggle Settings</td><td>All Visitors</td><td>Updates theme (light/dark), sound effects, and reduced-motion preferences</td></tr>
  </table>
</div>
"""

CHP4_CLASS = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">16</div>
  <h3 class="subsec-head">4.6.2 Class and Object Diagram</h3>
  <p>
    The domain class model illustrates the core TypeScript interfaces governing the application. The central <code>Country</code>
    entity links to procedurally generated <code>QuizQuestion</code> instances, while player actions mutate the <code>ProgressState</code>.
  </p>
  <div class="fig-wrap">
    {SVG_FIG4_2_CLASS}
    <div class="fig-cap">Figure 4.2: UML Class and Object Model Representing Core Domain Entities</div>
  </div>
  <table>
    <tr>
      <th style="width:20%;">Entity</th>
      <th style="width:30%;">Key Attributes</th>
      <th style="width:50%;">Domain Responsibility</th>
    </tr>
    <tr><td><strong>Country</strong></td><td>cca3, name, capital, region, population, area, flags, borders</td><td>Normalized sovereign state representation complying with ISO standards</td></tr>
    <tr><td><strong>QuizQuestion</strong></td><td>id, mode, prompt, targetCountry, options[4], explanation</td><td>Self-contained trivia challenge with 1 correct answer and 3 regional distractors</td></tr>
    <tr><td><strong>GameState</strong></td><td>currentIndex, score, streak, multiplier, livesRemaining, isFinished</td><td>Active gameplay loop session telemetry and performance tracking</td></tr>
    <tr><td><strong>ProgressState</strong></td><td>streak, totalGames, regionAccuracy, modeAccuracy, questionHistory</td><td>Longitudinal learning analytics persisted across browser sessions</td></tr>
    <tr><td><strong>SettingsState</strong></td><td>theme, sound, reducedMotion, units, highContrast</td><td>User interface preferences and sensory comfort accessibility controls</td></tr>
  </table>
</div>
"""

CHP4_ACTIVITY = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">17</div>
  <h3 class="subsec-head">4.6.3 Activity Diagram</h3>
  <p>
    The Activity Diagram models the workflow of the Quiz Engine, illustrating the decision logic that governs timer expiration,
    answer evaluation, speed bonuses, streak multiplier escalation, and session recording:
  </p>
  <div class="fig-wrap">
    {SVG_FIG4_3_ACTIVITY}
    <div class="fig-cap">Figure 4.3: UML Activity Diagram Representing the Interactive Quiz Engine Loop</div>
  </div>
  <p>
    <strong>Gameplay Algorithm:</strong> When an answer is submitted (via mouse click or keyboard 1-4 shortcuts), the engine evaluates
    correctness. A correct answer calculates points using: <code>Score = (BasePoints + RemainingSeconds &times; 10) &times; StreakMultiplier</code>.
    An incorrect answer or timeout decrements remaining lives, resets the streak multiplier to 1.0&times;, and logs the missed question
    to enable targeted post-game practice.
  </p>
</div>
"""

CHP4_SEQUENCE = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">18</div>
  <h3 class="subsec-head">4.6.4 Sequence Diagram</h3>
  <p>
    The Sequence Diagram captures the asynchronous message interchange required to fetch, merge, and render country records
    while adhering strictly to REST Countries' 10-field query recommendation:
  </p>
  <div class="fig-wrap">
    {SVG_FIG4_4_SEQUENCE}
    <div class="fig-cap">Figure 4.4: UML Sequence Diagram for Parallel Batched API Fetching and Normalization</div>
  </div>
  <table>
    <tr>
      <th style="width:10%;">Seq</th>
      <th style="width:25%;">Sender &rarr; Receiver</th>
      <th style="width:40%;">Operation / Message</th>
      <th style="width:25%;">Payload</th>
    </tr>
    <tr><td>1</td><td>Explorer &rarr; useCountries</td><td>Mount query with 24h stale-time</td><td><code>['countries']</code> query key</td></tr>
    <tr><td>2</td><td>useCountries &rarr; Adapter</td><td>Invoke getAllCountries()</td><td>AbortSignal + timeout (8s)</td></tr>
    <tr><td>3a</td><td>Adapter &rarr; REST Countries</td><td>GET ?fields=cca3,name,capital,region,flags...</td><td>Batch 1 (9 fields &le; 10)</td></tr>
    <tr><td>3b</td><td>Adapter &rarr; REST Countries</td><td>GET ?fields=cca3,languages,currencies,borders...</td><td>Batch 2 (10 fields &le; 10)</td></tr>
    <tr><td>4</td><td>REST Countries &rarr; Adapter</td><td>Asynchronous JSON HTTP responses</td><td>Partial country records</td></tr>
    <tr><td>5</td><td>Adapter Internal</td><td>In-memory merge by cca3 + Zod validation</td><td>Normalized Country[] (250 items)</td></tr>
    <tr><td>6</td><td>Adapter &rarr; Explorer</td><td>Cache population &amp; state update</td><td>Rendered country grid / list</td></tr>
  </table>
</div>
"""

CHP4_STORAGE = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">19</div>
  <h3 class="subsec-head">4.6.5 Storage &amp; Schema Diagram</h3>
  <p>
    Rather than maintaining an expensive remote database, FlagForge utilizes browser <code>localStorage</code> managed by Zustand
    persist middleware with versioned schema migration guarantees:
  </p>
  <div class="fig-wrap">
    {SVG_FIG4_5_STORAGE}
    <div class="fig-cap">Figure 4.5: Browser LocalStorage Schemas with Versioned Zustand Migrations</div>
  </div>
  <table>
    <tr>
      <th style="width:25%;">Storage Partition</th>
      <th style="width:20%;">Schema Version</th>
      <th style="width:30%;">Migration Operation</th>
      <th style="width:25%;">Fault Tolerance</th>
    </tr>
    <tr><td><code>flagforge-settings</code></td><td>v1 &rarr; v2</td><td>Adds highContrast and units fields; preserves existing theme and sound</td><td>Falls back to system defaults</td></tr>
    <tr><td><code>flagforge-progress</code></td><td>v1 &rarr; v2</td><td>Initializes questionHistory audit array (capped at 200) without losing streaks</td><td>Preserves high scores and streak count</td></tr>
    <tr><td><code>flagforge-favorites</code></td><td>v1 &rarr; v2</td><td>Deduplicates recent search history; validates cca3 ISO codes</td><td>Gracefully cleans corrupted items</td></tr>
  </table>
</div>
"""

CHP4_COMPONENT = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">20</div>
  <h3 class="subsec-head">4.6.6 Component Architecture Diagram</h3>
  <p>
    The component architecture strictly adheres to unidirectional dependency flows: Presentation components import from
    the Hooks API, Hooks invoke Data and State Modules, and Data Modules communicate with External Services:
  </p>
  <table>
    <tr>
      <th style="width:22%;">Subsystem Folder</th>
      <th style="width:14%; text-align:center;">File Count</th>
      <th style="width:16%; text-align:center;">Lines of Code</th>
      <th style="width:48%;">Primary Responsibility</th>
    </tr>
    <tr><td><code>src/app</code></td><td style="text-align:center;">14</td><td style="text-align:center;">1,850</td><td>Next.js 15 App Router pages, SSG params, and metadata generation</td></tr>
    <tr><td><code>src/components/ui</code></td><td style="text-align:center;">15</td><td style="text-align:center;">1,920</td><td>Accessible Radix UI primitives with WCAG 2.2 AA visible focus rings</td></tr>
    <tr><td><code>src/components/layout</code></td><td style="text-align:center;">7</td><td style="text-align:center;">1,140</td><td>AppShell, TopNav, MobileTabBar, CommandPalette (Cmd+K), ThemeToggle</td></tr>
    <tr><td><code>src/components/features</code></td><td style="text-align:center;">18</td><td style="text-align:center;">3,450</td><td>Explorer view, Country profile, Compare matrix, Quiz HUD, Stats dashboard</td></tr>
    <tr><td><code>src/lib/api</code></td><td style="text-align:center;">5</td><td style="text-align:center;">1,620</td><td>Batched REST Countries client, Wikipedia client, Open-Meteo client, Fallback</td></tr>
    <tr><td><code>src/lib/quiz</code></td><td style="text-align:center;">7</td><td style="text-align:center;">1,280</td><td>Mulberry32 PRNG, 6 question generators, distractor matching, scoring</td></tr>
    <tr><td><code>src/store</code></td><td style="text-align:center;">3</td><td style="text-align:center;">640</td><td>Zustand persisted stores with v1 &rarr; v2 migrations</td></tr>
    <tr><td><code>src/tests</code> &amp; <code>e2e</code></td><td style="text-align:center;">8</td><td style="text-align:center;">1,880</td><td>58 Vitest unit tests and 4 Playwright browser e2e test suites</td></tr>
  </table>
  <p style="margin-top:10px;">
    <strong>Three Fundamental Engineering Contracts:</strong> (1) <em>Unidirectional Data Flow:</em> Presentation never writes
    directly to local storage; all writes pass through Zustand actions. (2) <em>Deterministic Game Logic:</em> The quiz engine is pure
    and headless, testable in Vitest without React DOM. (3) <em>Graceful Degradation:</em> Zero raw error screens; all errors surface through
    typed error boundaries with retry callbacks.
  </p>
</div>
"""

CHP4_GANTT = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">21</div>
  <h2 class="sec-head">4.7 Gantt Chart</h2>
  <p>
    The Gantt chart outlines the structured eight-week academic development lifecycle executed during project implementation:
  </p>
  <div class="fig-wrap">
    {SVG_FIG5_GANTT}
    <div class="fig-cap">Figure 5: Project Development Schedule Across Eight Academic Weeks</div>
  </div>
  <table>
    <tr>
      <th style="width:15%;">Academic Weeks</th>
      <th style="width:30%;">Engineering Phase</th>
      <th style="width:55%;">Delivered Artifacts &amp; Modules</th>
    </tr>
    <tr><td>Weeks 1 &ndash; 2</td><td>Architecture &amp; Scaffolding</td><td>Next.js 15 setup, Tailwind v4 theme tokens, domain types, Zod schemas</td></tr>
    <tr><td>Weeks 2 &ndash; 3</td><td>Data Layer &amp; API Clients</td><td>Batched REST Countries client, Wikipedia &amp; Open-Meteo clients, Query cache</td></tr>
    <tr><td>Weeks 3 &ndash; 4</td><td>Design System &amp; Shell</td><td>Radix primitives, AppShell, TopNav, MobileTabBar, CommandPalette (Cmd+K)</td></tr>
    <tr><td>Weeks 4 &ndash; 5</td><td>Explorer &amp; Compare Features</td><td>Fuse.js fuzzy search, dynamic filters, country profile SSG, Recharts matrix</td></tr>
    <tr><td>Weeks 5 &ndash; 6</td><td>Quiz Engine &amp; Daily Mode</td><td>Mulberry32 PRNG, 6 question generators, distractor matching, sound synthesizer</td></tr>
    <tr><td>Weeks 6 &ndash; 7</td><td>Analytics &amp; Testing</td><td>Stats dashboard, heatmap calendar, 58 Vitest unit tests, Playwright e2e suites</td></tr>
    <tr><td>Weeks 7 &ndash; 8</td><td>Audit, PWA &amp; Report</td><td>Service Worker, WCAG 2.2 AA axe audit, deploy guide, comprehensive report</td></tr>
  </table>
</div>
"""

CHP4_TECH_ARCH = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">22</div>
  <h2 class="sec-head">4.8 Technologies Used</h2>
  <p>
    FlagForge harnesses modern open-source web technologies selected for strict type safety, zero runtime bloat, and offline capability:
  </p>
  <table>
    <tr>
      <th style="width:20%;">Layer / Tool</th>
      <th style="width:25%;">Technology &amp; Version</th>
      <th style="width:55%;">Usage &amp; Architectural Rationale</th>
    </tr>
    <tr><td>Framework</td><td>Next.js 15.2.1 (App Router), React 19</td><td>Hybrid SSG rendering, server metadata generation, React 19 compiler optimizations</td></tr>
    <tr><td>Language</td><td>TypeScript 5 (Strict Mode)</td><td>Full type safety across all domain entities, Zod schemas, and hook return signatures</td></tr>
    <tr><td>Styling &amp; Tokens</td><td>Tailwind CSS v4, Radix UI</td><td>CSS variable-driven design tokens, high-contrast mode, accessible headless primitives</td></tr>
    <tr><td>Animation</td><td>Framer Motion</td><td>Smooth card entrance transitions with full <code>prefers-reduced-motion</code> compliance</td></tr>
    <tr><td>Data Ingestion</td><td>TanStack Query v5</td><td>24-hour country cache staleTime, background refetching, and offline cache query hooks</td></tr>
    <tr><td>Persistence</td><td>Zustand 5 (Persist Middleware)</td><td>Lightweight client state with versioned migrations (v1 &rarr; v2) into localStorage</td></tr>
    <tr><td>Search Indexing</td><td>Fuse.js</td><td>Instant client-side fuzzy searching with weighted scoring across name, capital, and cca3</td></tr>
    <tr><td>Visualizations</td><td>Recharts 2.15</td><td>Interactive normalized radar charts and dual-metric population/area bar charts</td></tr>
    <tr><td>Testing &amp; A11y</td><td>Vitest 3, Playwright, axe-core</td><td>58 Vitest unit tests, multi-browser e2e automation, and automated WCAG 2.2 AA audits</td></tr>
  </table>
</div>
"""

CHP4_SYSTEM_ARCH = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">23</div>
  <h2 class="sec-head">4.9 System Architecture</h2>
  <p>
    The system architecture defines the hierarchical relationships between user interactions, domain computation, and external providers:
  </p>
  <div class="fig-wrap">
    {SVG_FIG6_SYSTEM_ARCH}
    <div class="fig-cap">Figure 6: Layered System Architecture for the FlagForge Application</div>
  </div>
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
</div>
"""
'''

with open(SCRIPTS / "report_part3.py", "w", encoding="utf-8") as f:
    f.write(part3)

print("Wrote report_part3.py")
