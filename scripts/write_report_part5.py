# -*- coding: utf-8 -*-
"""
Part 5: Chapter 6 Conclusion, Chapter 7 References, Chapter 8 Synopsis & Builder
"""

import os
import subprocess
import sys
from pathlib import Path

WORKSPACE = Path(r"c:\Users\Kaushal Rajput\food-waste-system")
SCRIPTS = WORKSPACE / "scripts"
DOCS = WORKSPACE / "docs"
DOCS.mkdir(parents=True, exist_ok=True)

part5 = '''
CHP6_CONCLUSION = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">36</div>
  <h1 class="chp-head">6. Conclusion &amp; Future Scope</h1>
  <h2 class="sec-head">6.1 Conclusion</h2>
  <p>
    <strong>FlagForge</strong> demonstrates that a modern, highly engaging, and pedagogically rigorous learning platform
    can be engineered without requiring complex custom server infrastructure, paid API licenses, or centralized relational databases.
    By federating authoritative, open-access geopolitical, encyclopedic, and meteorological web services, the platform provides
    learners with deep geographic and cultural intelligence while guaranteeing zero runtime operational costs.
  </p>
  <p><strong>Key Engineering Accomplishments:</strong></p>
  <ul>
    <li><strong>Compliant API Batch Federation:</strong> Adhered strictly to REST Countries' &le;10 field constraint by implementing parallel asynchronous batch fetching and in-memory reconciliation keyed by ISO <code>cca3</code> identifiers.</li>
    <li><strong>Procedural Determinism &amp; Fairness:</strong> Implemented a 32-bit Mulberry32 PRNG ensuring that every user worldwide receives identical daily challenge sequences on any given UTC date.</li>
    <li><strong>Local Schema Evolution:</strong> Developed versioned migration pipelines (v1 &rarr; v2) within Zustand persist middleware, allowing schema expansion without corrupting historical streaks or records.</li>
    <li><strong>Inclusive Accessibility:</strong> Achieved strict WCAG 2.2 AA compliance verified via automated axe-core audits, visible focus rings, and universal keyboard shortcuts (1-4).</li>
    <li><strong>Offline Resilience:</strong> Designed an embedded 250-country fallback dataset and progressive Service Worker caching strategy.</li>
  </ul>
  
  <table>
    <tr>
      <th style="width:25%;">Project Objective</th>
      <th style="width:50%;">Achieved Technical Outcome</th>
      <th style="width:25%;">Verification Section</th>
    </tr>
    <tr><td>Unified Geopolitical Catalog</td><td>Normalized REST Countries dataset merged on cca3</td><td>Section 2.1 &amp; 5.1</td></tr>
    <tr><td>Instantaneous Fuzzy Search</td><td>Fuse.js client-side search across name, capital, and cca3</td><td>Section 4.2 &amp; 5.2</td></tr>
    <tr><td>Deterministic Daily Challenge</td><td>Mulberry32 PRNG seeded by UTC date with emoji share grid</td><td>Section 4.6.3 &amp; 5.1</td></tr>
    <tr><td>Side-by-Side Benchmarking</td><td>Recharts radar and dual-metric population/area bar charts</td><td>Section 4.6.1 &amp; 5.2</td></tr>
    <tr><td>Zero-Backend Persistence</td><td>Zustand localStorage with versioned schema migrations (v1 &rarr; v2)</td><td>Section 4.6.5 &amp; 5.1</td></tr>
    <tr><td>Rigorous Quality Assurance</td><td>58 Vitest unit tests (100% passing) and Playwright e2e suites</td><td>Section 5.3</td></tr>
  </table>
  
  <p style="margin-top:10px;">
    <strong>Lessons Learned:</strong> (1) External web APIs must always be treated as untrusted and rate-limited.
    (2) Client-side persistence requires defensive versioned migration strategies to prevent data corruption.
    (3) Pure, deterministic logic decoupled from UI frameworks enables fast, resilient unit testing.
  </p>
</div>
"""

CHP6_FUTURE = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">37</div>
  <h2 class="sec-head">6.2 Future Scope</h2>
  <p>
    FlagForge's modular architecture establishes a clean foundation for subsequent academic and commercial extensions:
  </p>
  <ul>
    <li><strong>Real-Time Peer-to-Peer Multiplayer:</strong> Integrating WebRTC data channels to enable low-latency head-to-head flag duel competitions without central game servers.</li>
    <li><strong>Interactive 3D WebGL Globe:</strong> Embedding Three.js / MapLibre to allow learners to rotate, zoom, and query geopolitical borders on a spherical 3D projection.</li>
    <li><strong>Native Audio Pronunciations:</strong> Integrating crowdsourced Wikimedia phonetics for country and capital names across indigenous languages.</li>
    <li><strong>Classroom Educator Mode:</strong> Allowing teachers to curate custom regional flag decks and export student mastery matrices as CSV reports.</li>
    <li><strong>Expanded Geopolitical Datasets:</strong> Incorporating World Bank economic metrics (GDP, literacy rate, life expectancy) into the comparison matrix.</li>
  </ul>
  
  <table>
    <tr>
      <th style="width:25%;">Proposed Extension</th>
      <th style="width:35%;">Affected Module / Layer</th>
      <th style="width:40%;">Technical Prerequisite</th>
    </tr>
    <tr><td>WebRTC Multiplayer Duels</td><td><code>src/lib/multiplayer</code></td><td>Signaling server &amp; WebRTC STUN/TURN config</td></tr>
    <tr><td>3D WebGL Interactive Globe</td><td><code>src/components/features/country</code></td><td>Three.js or MapLibre GL canvas shaders</td></tr>
    <tr><td>Audio Name Pronunciations</td><td><code>src/lib/api/pronunciations</code></td><td>Wikimedia Commons audio media API integration</td></tr>
    <tr><td>Educator Deck Creator</td><td><code>src/store/useDeckStore.ts</code></td><td>Custom quiz collection persistence schema</td></tr>
    <tr><td>World Bank Socioeconomics</td><td><code>src/lib/api/worldbank.ts</code></td><td>Additional API adapter &amp; chart indicators</td></tr>
  </table>
</div>
"""

CHP7_REFERENCES = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">38</div>
  <h1 class="chp-head">7. References</h1>
  <ol style="font-size:9.5pt; line-height:1.75;">
    <li>FlagForge Source Repository: <a href="https://github.com/KAUSHALCODER123/geo-guess">https://github.com/KAUSHALCODER123/geo-guess</a></li>
    <li>Next.js 15 Documentation (App Router &amp; Server Components): <a href="https://nextjs.org/docs">https://nextjs.org/docs</a></li>
    <li>React 19 Documentation &amp; Architecture: <a href="https://react.dev">https://react.dev</a></li>
    <li>REST Countries v3.1 API Reference: <a href="https://restcountries.com">https://restcountries.com</a></li>
    <li>Wikimedia REST API Reference (Page Summaries): <a href="https://en.wikipedia.org/api/rest_v1/">https://en.wikipedia.org/api/rest_v1/</a></li>
    <li>Open-Meteo Weather API Reference: <a href="https://open-meteo.com/en/docs">https://open-meteo.com/en/docs</a></li>
    <li>Tailwind CSS v4 Documentation: <a href="https://tailwindcss.com/docs">https://tailwindcss.com/docs</a></li>
    <li>Radix UI Accessible Headless Primitives: <a href="https://www.radix-ui.com">https://www.radix-ui.com</a></li>
    <li>Zustand State Management &amp; Persist Middleware: <a href="https://zustand.docs.pmnd.rs">https://zustand.docs.pmnd.rs</a></li>
    <li>TanStack Query v5 Documentation: <a href="https://tanstack.com/query/latest">https://tanstack.com/query/latest</a></li>
    <li>Vitest Fast Unit Test Framework: <a href="https://vitest.dev">https://vitest.dev</a></li>
    <li>Playwright End-to-End Testing Engine: <a href="https://playwright.dev">https://playwright.dev</a></li>
    <li>Deque axe-core Web Accessibility Engine: <a href="https://github.com/dequelabs/axe-core">https://github.com/dequelabs/axe-core</a></li>
    <li>W3C Web Content Accessibility Guidelines (WCAG) 2.2: <a href="https://www.w3.org/TR/WCAG22/">https://www.w3.org/TR/WCAG22/</a></li>
    <li>Fuse.js Lightweight Fuzzy Search: <a href="https://fusejs.io">https://fusejs.io</a></li>
    <li>Recharts Composable React Charting Library: <a href="https://recharts.org">https://recharts.org</a></li>
    <li>Framer Motion Declarative Animations for React: <a href="https://motion.dev">https://motion.dev</a></li>
    <li>Zod TypeScript-First Schema Validation: <a href="https://zod.dev">https://zod.dev</a></li>
    <li>Mulberry32 Pseudo-Random Number Generator Algorithm (Tommy Ettinger): <a href="https://gist.github.com/tommyettinger/46a87453d784443199ac6ff2f18184c7">https://gist.github.com</a></li>
    <li>Web Audio API W3C Recommendation: <a href="https://www.w3.org/TR/webaudio/">https://www.w3.org/TR/webaudio/</a></li>
    <li>ISO 3166-1 Alpha-3 Country Codes Standard: <a href="https://www.iso.org/iso-3166-country-codes.html">https://www.iso.org</a></li>
    <li>Vercel Edge Platform &amp; Static Generation: <a href="https://vercel.com/docs">https://vercel.com/docs</a></li>
  </ol>
</div>
"""

CHP8_SYNOPSIS = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">39</div>
  <h1 class="chp-head">8. Synopsis</h1>
  <p><strong>Project Title:</strong> {PROJECT_TITLE} ({PROJECT_ACRONYM})</p>
  <p><strong>Purpose:</strong> To engineer a production-grade, highly engaging, and accessible geography and culture learning web application that combines public geopolitical APIs with deterministic active-recall trivia, multi-nation benchmarking, and longitudinal learning analytics without requiring custom backend databases.</p>
  <p><strong>Target Users:</strong> Primary/Secondary Students, Geography Teachers, Trivia Enthusiasts, General Public.</p>
  <p><strong>Platform:</strong> Responsive Progressive Web App (PWA) supporting Desktop, Tablet, and Mobile browsers.</p>
  <p><strong>Core Stack:</strong> Next.js 15.2.9 (App Router), React 19, TypeScript strict, Tailwind CSS v4, Radix UI, Zustand 5 (persist &amp; migrations), TanStack Query 5, Recharts 2.15, Vitest, Playwright, axe-core.</p>
  <p><strong>Primary Modules:</strong></p>
  <ul>
    <li>World Atlas Explorer with Fuse.js fuzzy search and multi-faceted filtering</li>
    <li>Statically pre-rendered Country Profiles (30 SSG paths) with Wikipedia and Open-Meteo telemetry</li>
    <li>Multi-Nation Benchmarking Matrix with Recharts radar and bar charts</li>
    <li>Deterministic Mulberry32 Quiz Engine with 6 question generator modes</li>
    <li>UTC-Seeded Synchronized Daily Challenge with Wordle-style shareable emoji grids</li>
    <li>Longitudinal Progress Dashboard with streak tracking and achievement badges</li>
    <li>Embedded Fallback Dataset &amp; Service Worker for 100% offline functionality</li>
  </ul>
  
  <p><strong>Project Metrics at a Glance:</strong></p>
  <table>
    <tr><th style="width:40%;">Item</th><th>Value</th></tr>
    <tr><td>Route Files &amp; Static Paths</td><td>14 pages (30 SSG pre-rendered static nation paths, 42 pages total)</td></tr>
    <tr><td>Codebase Volume</td><td>~10,000 lines of strict TypeScript, TSX, and Tailwind v4 CSS</td></tr>
    <tr><td>Database &amp; Persistence</td><td>0 remote databases; 3 versioned Zustand localStorage schemas (v1 &rarr; v2)</td></tr>
    <tr><td>Declared NPM Packages</td><td>21 runtime packages, 17 development tooling packages</td></tr>
    <tr><td>Automated Test Suite</td><td>58 Vitest unit tests (100% passing) and 4 Playwright browser e2e suites</td></tr>
    <tr><td>Accessibility Rating</td><td>Zero axe-core accessibility violations (WCAG 2.2 AA compliant)</td></tr>
  </table>
  
  <div class="sig-grid" style="margin-top:50px;">
    <div class="sig-block">
      <div>_____________________________</div>
      <div style="margin-top:6px;">Signature of the Student</div>
      <div style="font-weight:normal; font-size:9.5pt; margin-top:2px;">({CANDIDATE_NAME})</div>
      <div style="font-weight:normal; font-size:9pt; margin-top:15px;">Date: 24-10-2026</div>
    </div>
    <div class="sig-block">
      <div>_____________________________</div>
      <div style="margin-top:6px;">Signature of the Guide</div>
      <div style="font-weight:normal; font-size:9.5pt; margin-top:2px;">(Department of Computer Science)</div>
      <div style="font-weight:normal; font-size:9pt; margin-top:15px;">Place: Khadavli</div>
    </div>
  </div>
</div>
"""
'''

with open(SCRIPTS / "report_part5.py", "w", encoding="utf-8") as f:
    f.write(part5)

print("Wrote report_part5.py")
