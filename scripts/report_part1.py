from report_data import *

# -------------------------------------------------------------
# FRONT MATTER PAGES
# -------------------------------------------------------------
PAGE_COVER = f"""
<div class="page cover-page">
  <div>
    <h1 class="main-title">{PROJECT_TITLE}</h1>
    <h2 class="sub-title">{PROJECT_ACRONYM}</h2>
    <div class="report-label">A Project Report</div>
    <div class="degree-label">Submitted in partial fulfillment of the Requirement for the award of the Degree of</div>
    <div class="degree-name">{DEGREE}</div>
    <div class="author-sec">
      <div style="font-size:11pt; font-style:italic;">By</div>
      <div class="author-name">{CANDIDATE_NAME}</div>
    </div>
    <div style="font-size:11pt; font-style:italic; margin-top:10px;">Under the esteemed guidance of</div>
    <div style="font-weight:bold; margin-top:4px;">____________________</div>
  </div>
  
  <div style="margin: 20px 0;">
    {SVG_SEAL}
  </div>
  
  <div class="college-footer">
    <div class="dept-title">{DEPARTMENT}</div>
    <div class="college-title">{COLLEGE_NAME}</div>
    <div class="college-sub">{COLLEGE_AFFILIATION}</div>
    <div class="college-loc">{COLLEGE_ADDRESS}</div>
    <div class="academic-year">{ACADEMIC_YEAR}</div>
  </div>
</div>
"""

PAGE_CERT1 = f"""
<div class="page cert-page">
  <div style="text-align:center;">
    <div style="font-size:13pt; font-weight:bold; color:#1e3a8a;">{COLLEGE_NAME}</div>
    <div style="font-size:10pt; font-style:italic;">{COLLEGE_ADDRESS}</div>
  </div>
  
  <div style="text-align:center; margin: 15px 0;">
    {SVG_SEAL}
  </div>
  
  <div style="text-align:center;">
    <h2 style="font-size:16pt; font-weight:bold; text-decoration:underline; letter-spacing:1px; margin-bottom:15px;">CERTIFICATE</h2>
    <p style="text-align:center; font-size:11.5pt; line-height:1.8;">
      This is to certify that<br>
      <span style="font-size:15pt; font-weight:bold; color:#0f172a;">{CANDIDATE_NAME}</span><br>
      has completed the project report entitled<br>
      <span style="font-size:13pt; font-weight:bold; color:#1e3a8a;">{PROJECT_TITLE} ({PROJECT_ACRONYM})</span><br>
      in partial fulfilment of the requirements for the {DEGREE}<br>
      <strong>{ACADEMIC_YEAR}</strong>
    </p>
    <div style="margin-top:20px; font-weight:bold; font-size:11pt;">UNDER THE GUIDANCE OF</div>
    <div style="margin-top:5px; font-weight:bold;">____________________</div>
  </div>
  
  <div style="margin-top: 40px;">
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
  </div>
</div>
"""

PAGE_CERT2 = f"""
<div class="page cert-page">
  <div style="text-align:center;">
    <div style="font-size:11pt; font-weight:bold;">Govt. of Maharashtra's</div>
    <div style="font-size:14pt; font-weight:bold; color:#1e3a8a;">{COLLEGE_NAME}</div>
    <div style="font-size:10pt; font-weight:600;">{COLLEGE_ADDRESS}</div>
    <div style="font-size:11.5pt; font-weight:bold; margin-top:15px; color:#334155;">{DEPARTMENT}</div>
  </div>
  
  <div style="text-align:center; margin: 30px 0;">
    <h2 style="font-size:15pt; font-weight:bold; letter-spacing:1px; text-decoration:underline;">CERTIFICATE</h2>
    <p style="text-align:center; font-size:11.5pt; line-height:1.8; margin-top:25px;">
      This is to certify that <strong>{CANDIDATE_NAME}</strong> has satisfactorily completed the project
      <strong>{PROJECT_TITLE} ({PROJECT_ACRONYM})</strong>, to be submitted in the partial fulfilment
      of the award of <strong>{DEGREE}</strong> during the academic year <strong>{ACADEMIC_YEAR}</strong>.
    </p>
    <div style="margin-top:30px; text-align:left; font-weight:600; font-size:11pt;">
      Date of Submission: ____________________
    </div>
  </div>
  
  <div style="margin-top: 50px;">
    <table style="width:100%; border:none;">
      <tr style="border:none;">
        <td style="border:none; font-weight:bold; width:50%;">Project Guide</td>
        <td style="border:none; text-align:right; font-weight:bold; width:50%;">Co-ordinator</td>
      </tr>
      <tr style="border:none;">
        <td style="border:none;"></td>
        <td style="border:none; text-align:right; font-size:9.5pt; color:#475569;">({DEPARTMENT})</td>
      </tr>
      <tr style="border:none; height:45px;">
        <td style="border:none;"></td><td style="border:none;"></td>
      </tr>
      <tr style="border:none;">
        <td style="border:none; font-weight:bold;">College Seal</td>
        <td style="border:none; text-align:right; font-weight:bold;">Signature of Examiner</td>
      </tr>
    </table>
  </div>
</div>
"""

PAGE_DECLARATION = f"""
<div class="page" style="padding: 30px 10px;">
  <h2 style="text-align:center; font-size:16pt; font-weight:bold; letter-spacing:1px; margin-bottom:30px;">DECLARATION</h2>
  <p style="font-size:11.5pt; line-height:1.8; margin-top:20px;">
    I hereby declare that the project entitled <strong>"{PROJECT_TITLE} ({PROJECT_ACRONYM})"</strong>,
    submitted in partial fulfilment for the award of <strong>{DEGREE}</strong> during the academic year
    <strong>{ACADEMIC_YEAR}</strong>, represents my project work.
    Sources and third-party services used in the implementation are acknowledged in the references.
  </p>
  
  <div style="margin-top:60px;">
    <p style="font-weight:bold;">Signature of the Student:</p>
    <div style="margin-top:40px; line-height:1.8;">
      <strong>Place:</strong> Khadavli<br>
      <strong>Date:</strong> 24th October 2026
    </div>
  </div>
  
  <div style="margin-top:100px;">
    <strong>{COORDINATOR_NAME}</strong><br>
    Co-Ordinator,<br>
    <strong>{DEPARTMENT}</strong>
  </div>
</div>
"""

PAGE_ACKNOWLEDGEMENT = f"""
<div class="page" style="padding: 30px 10px;">
  <h2 style="text-align:center; font-size:16pt; font-weight:bold; letter-spacing:1px; margin-bottom:25px;">ACKNOWLEDGEMENT</h2>
  <p style="line-height:1.75; font-size:11pt;">
    I would like to express my sincere gratitude to everyone who contributed to the successful creation and
    development of the <strong>"{PROJECT_TITLE} ({PROJECT_ACRONYM})"</strong> project.
  </p>
  <p style="line-height:1.75; font-size:11pt;">
    I extend my deepest gratitude to the faculty members and the project guide of the <em>{DEPARTMENT}</em> at
    <em>{COLLEGE_NAME}</em> for their guidance and support during the development of this project. Their insights
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
  <div style="margin-top:40px;">
    <p>Thank you all.</p>
    <p style="font-size:12pt; font-weight:bold; margin-top:20px;">{CANDIDATE_NAME}</p>
  </div>
</div>
"""

PAGE_ABSTRACT = f"""
<div class="page" style="padding: 30px 10px;">
  <h2 style="text-align:center; font-size:16pt; font-weight:bold; letter-spacing:1px; margin-bottom:20px;">Abstract</h2>
  <p style="font-size:11pt; line-height:1.65;">
    <strong>FlagForge</strong> is a production-grade, web-based geography and culture learning platform engineered to help
    students, educators, and enthusiasts discover nations, master world flags and capitals, compare geopolitical metrics,
    and track personal learning progress. The application combines public catalog telemetry from <strong>REST Countries v3.1</strong>,
    contextual encyclopedic summaries from the <strong>Wikipedia REST API</strong>, and real-time capital meteorological forecasts
    from <strong>Open-Meteo</strong> into a unified, responsive interface without requiring a custom backend or remote database.
  </p>
  <p style="font-size:11pt; line-height:1.65;">
    Users can explore an atlas of ~250 sovereign nations with instant fuzzy search (Fuse.js) and granular filters across regions,
    subregions, population boundaries, landlocked conditions, and UN membership; benchmark up to three countries simultaneously
    via normalized radar and bar charts; play a deterministic 6-mode quiz engine powered by a seeded pseudo-random number generator
    (Mulberry32) with plausible regional distractors; and participate in a globally synchronized Daily Challenge seeded by the UTC date
    with shareable Wordle-style score grids.
  </p>
  <p style="font-size:11pt; line-height:1.65;">
    The application is architected with <strong>Next.js 15 (App Router)</strong>, <strong>React 19</strong>, <strong>TypeScript strict</strong>,
    <strong>Tailwind CSS v4</strong>, <strong>Framer Motion</strong>, and <strong>Zustand 5</strong> with persist middleware and versioned
    schema migrations. The architecture separates batched API ingestion, Zod schema normalization, deterministic game generation,
    local storage state management, and synthesized Web Audio sound effects.
  </p>
  <p style="font-size:11pt; line-height:1.65;">
    The project strictly enforces zero placeholder code, full offline resilience with an embedded fallback dataset and service worker,
    and rigorous WCAG 2.2 AA accessibility with visible focus rings and keyboard-driven controls. Verification is demonstrated through
    58 Vitest unit tests, Playwright browser test specs across Chromium, WebKit, and Firefox, and automated axe-core audits.
  </p>
  <p style="font-size:9.5pt; margin-top:12px;">
    <strong>Keywords:</strong> World atlas, vexillology, Next.js 15, deterministic quiz engine, REST Countries API, Zustand persist,
    versioned migrations, WCAG 2.2 AA, offline resilience, TanStack Query.
  </p>
  
  <table style="margin-top:20px;">
    <tr><th style="width:25%;">Aspect</th><th>Summary</th></tr>
    <tr><td><strong>Users</strong></td><td>Students, geography enthusiasts, educators, casual trivia players</td></tr>
    <tr><td><strong>Platform</strong></td><td>Responsive browser-based Progressive Web App (desktop, tablet, mobile)</td></tr>
    <tr><td><strong>Data Sources</strong></td><td>REST Countries v3.1 (max 10 fields/req), Wikipedia REST summary, Open-Meteo API</td></tr>
    <tr><td><strong>Client Persistence</strong></td><td>Browser localStorage via Zustand persist with versioned migrations (v1 &rarr; v2)</td></tr>
    <tr><td><strong>Verification</strong></td><td>58 Vitest unit tests, Playwright e2e test suite, axe-core WCAG 2.2 AA compliance</td></tr>
  </table>
</div>
"""
