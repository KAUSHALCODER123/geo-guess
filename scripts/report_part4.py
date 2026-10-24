from report_data import *

CHP5_INTRO = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">24</div>
  <h1 class="chp-head">5. Implementation</h1>
  <p>
    FlagForge is implemented as a modern, unified Next.js 15 application utilizing the App Router architecture.
    The codebase emphasizes strict structural separation: presentation components reside in <code>src/components</code>,
    page routes in <code>src/app</code>, business logic and API adapters in <code>src/lib</code>, and persisted client state
    in <code>src/store</code>.
  </p>
  <table>
    <tr>
      <th style="width:25%;">Directory Path</th>
      <th style="width:75%;">Architectural Responsibility &amp; Modules</th>
    </tr>
    <tr><td><code>src/app</code></td><td>Page routes (<code>/</code>, <code>/explore</code>, <code>/country/[code]</code>, <code>/compare</code>, <code>/play</code>, <code>/daily</code>, <code>/stats</code>, <code>/design</code>), metadata, error boundaries</td></tr>
    <tr><td><code>src/components/ui</code></td><td>Themed accessible primitives: Button, Card, Input, Slider, Dialog, Tabs, Badge, Toast</td></tr>
    <tr><td><code>src/components/layout</code></td><td>AppShell, TopNav, MobileTabBar, CommandPalette (Cmd+K), ThemeToggle, Footer</td></tr>
    <tr><td><code>src/components/features</code></td><td>Specialized views: ExplorerView, CountryDetailView, CompareView, QuestionCard, StatsDashboard</td></tr>
    <tr><td><code>src/lib/api</code></td><td>Batched REST Countries client, Wikipedia client, Open-Meteo client, embedded offline fallback dataset</td></tr>
    <tr><td><code>src/lib/quiz</code></td><td>Mulberry32 PRNG, 6 question generator algorithms, distractor matcher, score formula</td></tr>
    <tr><td><code>src/store</code></td><td>Zustand stores (settings, progress, favorites) with localStorage persist &amp; versioned migrations</td></tr>
    <tr><td><code>public/sw.js</code></td><td>Service worker providing cache-first strategy for assets and offline fallback responses</td></tr>
  </table>
  <p style="margin-top:14px;">
    <strong>Key Implementation Principles:</strong> (1) <em>Field Limitation Enforcement:</em> REST Countries API requests never
    exceed 10 fields per query, preventing upstream rejection. (2) <em>Deterministic Seeding:</em> Daily challenges produce the exact
    same sequence of questions worldwide via Mulberry32 math. (3) <em>Sensory Accessibility:</em> Web Audio sound effects are synthesized
    in code without external audio downloads and respect the user's sound toggle and reduced-motion settings.
  </p>
</div>
"""

CHP5_CODE_1 = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">25</div>
  <h2 class="sec-head">5.1 Source Code Excerpts</h2>
  <h3 class="subsec-head">src/lib/api/restcountries.ts — Batched API Ingestion &amp; cca3 Merge</h3>
  <p>
    Enforces the &le;10 fields per query constraint by issuing parallel HTTP requests and merging records by ISO <code>cca3</code> key:
  </p>
<pre>
import {{ FALLBACK_COUNTRIES }} from "./fallback-countries";
import type {{ Country }} from "@/types/country";

const RESTCOUNTRIES_BASE = "https://restcountries.com/v3.1";
// Respect strict &le;10 fields rule per request
const BATCH_1_FIELDS = "cca3,cca2,name,capital,region,subregion,flags,population,area";
const BATCH_2_FIELDS = "cca3,languages,currencies,borders,latlng,timezones,continents,landlocked,unMember,car";

export async function getAllCountries(signal?: AbortSignal): Promise&lt;Country[]&gt; {{
  try {{
    const [res1, res2] = await Promise.all([
      fetch(`${{RESTCOUNTRIES_BASE}}/all?fields=${{BATCH_1_FIELDS}}`, {{ signal }}),
      fetch(`${{RESTCOUNTRIES_BASE}}/all?fields=${{BATCH_2_FIELDS}}`, {{ signal }}),
    ]);

    if (!res1.ok || !res2.ok) throw new Error("Failed to fetch country batches");

    const [batch1, batch2] = await Promise.all([res1.json(), res2.json()]);
    const b2Map = new Map&lt;string, any&gt;(batch2.map((c: any) =&gt; [c.cca3, c]));

    const merged: Country[] = batch1.map((b1: any) =&gt; {{
      const b2 = b2Map.get(b1.cca3) || {{}};
      return normalizeCountry({{ ...b1, ...b2 }});
    }});

    return merged.sort((a, b) =&gt; a.name.common.localeCompare(b.name.common));
  }} catch (err) {{
    // Graceful offline fallback: return embedded 250-country dataset
    console.warn("[REST Countries] Network failed, using embedded fallback dataset:", err);
    return FALLBACK_COUNTRIES;
  }}
}}
</pre>
  <h3 class="subsec-head">src/lib/quiz/rng.ts — Mulberry32 Deterministic Seeded PRNG</h3>
  <p>
    Guarantees reproducible question sequences for daily challenges across all browsers and timezones:
  </p>
<pre>
/**
 * Mulberry32 32-bit seeded pseudo-random number generator.
 * Produces deterministic 32-bit floats in [0, 1) from an integer seed.
 */
export function mulberry32(seed: number): () =&gt; number {{
  return function () {{
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t &gt;&gt;&gt; 15), t | 1);
    t ^= t + Math.imul(t ^ (t &gt;&gt;&gt; 7), t | 61);
    return ((t ^ (t &gt;&gt;&gt; 14)) &gt;&gt;&gt; 0) / 4294967296;
  }};
}}

/** Converts numeric date string (e.g. "2026-10-24") into a numeric integer seed */
export function dateToSeed(dateStr: string): number {{
  let hash = 0;
  for (let i = 0; i &lt; dateStr.length; i++) {{
    hash = (hash &lt;&lt; 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }}
  return Math.abs(hash);
}}
</pre>
</div>
"""

CHP5_CODE_2 = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">26</div>
  <h3 class="subsec-head">src/lib/quiz/generator.ts — Question Generation &amp; Regional Distractor Selection</h3>
  <p>
    Prioritizes plausible distractors from the same geographic region before falling back to global pools:
  </p>
<pre>
import type {{ Country }} from "@/types/country";
import type {{ QuizQuestion, QuizOption, QuizMode }} from "./types";

export function pickDistractors(
  target: Country,
  pool: Country[],
  rng: () =&gt; number,
  count = 3
): Country[] {{
  // 1. Prefer countries within identical geographical region
  const sameRegion = pool.filter((c) =&gt; c.cca3 !== target.cca3 &amp;&amp; c.region === target.region);
  const selected: Country[] = [];
  const available = [...sameRegion];

  while (selected.length &lt; count &amp;&amp; available.length &gt; 0) {{
    const idx = Math.floor(rng() * available.length);
    selected.push(available.splice(idx, 1)[0]);
  }}

  // 2. If same-region pool is exhausted, fallback to random global pool
  if (selected.length &lt; count) {{
    const globalPool = pool.filter(
      (c) =&gt; c.cca3 !== target.cca3 &amp;&amp; !selected.some((s) =&gt; s.cca3 === c.cca3)
    );
    while (selected.length &lt; count &amp;&amp; globalPool.length &gt; 0) {{
      const idx = Math.floor(rng() * globalPool.length);
      selected.push(globalPool.splice(idx, 1)[0]);
    }}
  }}

  return selected;
}}

export function generateFlagQuestion(
  target: Country,
  pool: Country[],
  rng: () =&gt; number
): QuizQuestion {{
  const distractors = pickDistractors(target, pool, rng, 3);
  const options: QuizOption[] = [
    {{ id: target.cca3, label: target.name.common, isCorrect: true }},
    ...distractors.map((d) =&gt; ({{ id: d.cca3, label: d.name.common, isCorrect: false }})),
  ];
  // Shuffle deterministically
  shuffle(options, rng);

  return {{
    id: `flag-${{target.cca3}}`,
    mode: "flag_to_country",
    prompt: "Which nation does this flag belong to?",
    targetCountry: target,
    options,
    explanation: `${{target.name.common}} is located in ${{target.region}} with capital ${{target.capital[0] || 'N/A'}}.`,
  }};
}}
</pre>
</div>
"""

CHP5_CODE_3 = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">27</div>
  <h3 class="subsec-head">src/lib/quiz/scoring.ts — Dynamic Scoring Formula &amp; Streak Multipliers</h3>
  <p>
    Rewards both accuracy and speed, scaling multipliers up to 3.0&times; for sustained correct streaks:
  </p>
<pre>
export interface ScoreBreakdown {{
  points: number;
  speedBonus: number;
  streakMultiplier: number;
  totalAwarded: number;
}}

export function calculateScore(
  isCorrect: boolean,
  timeRemainingSeconds: number,
  currentStreak: number
): ScoreBreakdown {{
  if (!isCorrect) {{
    return {{ points: 0, speedBonus: 0, streakMultiplier: 1.0, totalAwarded: 0 }};
  }}

  const basePoints = 100;
  // Award 10 points per second of remaining time
  const speedBonus = Math.max(0, Math.round(timeRemainingSeconds * 10));

  // Multiplier tiers: 1-2 streak = 1.0x, 3-4 streak = 1.5x, 5-7 streak = 2.0x, 8+ = 3.0x
  let streakMultiplier = 1.0;
  if (currentStreak &gt;= 8) streakMultiplier = 3.0;
  else if (currentStreak &gt;= 5) streakMultiplier = 2.0;
  else if (currentStreak &gt;= 3) streakMultiplier = 1.5;

  const totalAwarded = Math.round((basePoints + speedBonus) * streakMultiplier);

  return {{
    points: basePoints,
    speedBonus,
    streakMultiplier,
    totalAwarded,
  }};
}}
</pre>
  <h3 class="subsec-head">src/lib/sound.ts — Web Audio API Synthetic Sound Synthesizer</h3>
  <p>
    Synthesizes crisp harmonic frequencies without downloading external MP3 files:
  </p>
<pre>
// Zero audio assets needed; synthesizes audio using browser AudioContext
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {{
  if (typeof window === "undefined") return null;
  if (!audioCtx) {{
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtxClass) audioCtx = new AudioCtxClass();
  }}
  return audioCtx;
}}

export function playCorrectSound(enabled = true): void {{
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
}}
</pre>
</div>
"""

CHP5_CODE_4 = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">28</div>
  <h3 class="subsec-head">src/store/useProgressStore.ts — Versioned LocalStorage Schema Migrations (v1 &rarr; v2)</h3>
  <p>
    Ensures safe upgrades to persisted user state without loss of streak or historical accuracy data:
  </p>
<pre>
import {{ create }} from "zustand";
import {{ persist }} from "zustand/middleware";
import type {{ ProgressStore }} from "@/types/store";

export const useProgressStore = create&lt;ProgressStore&gt;()(
  persist(
    (set, get) =&gt; ({{
      streak: {{ current: 0, best: 0, lastActiveDate: "" }},
      totalGamesPlayed: 0,
      totalQuestionsAnswered: 0,
      totalCorrectAnswers: 0,
      regionAccuracy: {{}},
      modeAccuracy: {{}},
      questionHistory: [],
      dailyChallenges: {{}},
      achievements: DEFAULT_ACHIEVEMENTS,

      recordAnswer: (record) =&gt; {{
        set((state) =&gt; {{
          const isCorrect = record.correct;
          const updatedHistory = [record, ...state.questionHistory].slice(0, 200);

          // Update regional accuracy
          const region = record.region || "Global";
          const currentReg = state.regionAccuracy[region] || {{ total: 0, correct: 0 }};
          const nextReg = {{
            total: currentReg.total + 1,
            correct: currentReg.correct + (isCorrect ? 1 : 0),
          }};

          return {{
            totalQuestionsAnswered: state.totalQuestionsAnswered + 1,
            totalCorrectAnswers: state.totalCorrectAnswers + (isCorrect ? 1 : 0),
            questionHistory: updatedHistory,
            regionAccuracy: {{ ...state.regionAccuracy, [region]: nextReg }},
          }};
        }});
      }},
    }}),
    {{
      name: "flagforge-progress",
      version: 2,
      migrate: (persistedState: any, version: number) =&gt; {{
        if (version === 1 || !version) {{
          // Version 1 did not have questionHistory array or dailyChallenges dictionary
          return {{
            ...persistedState,
            questionHistory: persistedState.questionHistory || [],
            dailyChallenges: persistedState.dailyChallenges || {{}},
            achievements: persistedState.achievements || DEFAULT_ACHIEVEMENTS,
          }};
        }}
        return persistedState as ProgressStore;
      }},
    }}
  )
);
</pre>
</div>
"""

CHP5_GUI_1 = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">31</div>
  <h2 class="sec-head">5.2 Graphical User Interface Walkthrough</h2>
  <p>
    The user interface embodies an "Oceanic Atlas" aesthetic, pairing deep marine blues with warm terracotta and amber accents.
    Every view supports fluid responsiveness across mobile, tablet, and widescreen layouts:
  </p>
  
  <h3 class="subsec-head">Screen 7.1: Landing Page (Hero, Live Streak &amp; Daily Teaser)</h3>
  <p>
    Features animated SVG globe iconography, dynamic user streak badges from Zustand local storage, a live countdown timer
    to the next UTC midnight challenge reset, and an embedded 3-question quick teaser.
  </p>
  
  <h3 class="subsec-head">Screen 7.2: World Atlas Explorer &amp; Filter Drawer</h3>
  <p>
    Displays a virtualized grid/list of all 250 countries with instant Fuse.js fuzzy search, region buttons, population range slider,
    landlocked/UN toggles, and URL query synchronization (e.g. <code>/explore?region=Europe&amp;sort=population_desc</code>).
  </p>
  
  <h3 class="subsec-head">Screen 7.3: Comprehensive Country Profile (/country/[code])</h3>
  <p>
    Features a high-resolution hero flag with blur placeholder, key demographic facts grid (languages, currencies, calling codes,
    driving orientation), worldwide ranking percentile context ("Larger than 82% of countries"), bordering country chips,
    Wikipedia extract, live Open-Meteo capital weather readings, and an interactive SVG geospatial coordinate pin.
  </p>
  
  <h3 class="subsec-head">Screen 7.4: Multi-Nation Benchmarking Matrix (/compare)</h3>
  <p>
    Permits side-by-side comparison of up to 3 sovereign nations. Automatically highlights metric winners with gold badges,
    accompanied by Recharts dual-metric population/area bar charts and normalized multi-dimensional radar charts.
  </p>
</div>
"""

CHP5_GUI_2 = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">32</div>
  <h3 class="subsec-head">Screen 7.5: Quiz Arena Gameplay HUD (/play)</h3>
  <p>
    The active quiz view provides an animated progress bar, hearts displaying remaining lives, score indicator with streak multiplier badge,
    decaying timer bar, accessible choice cards (keyboard keys 1-4), and instant color feedback (green for correct, red for wrong)
    with detailed educational explanations.
  </p>
  
  <h3 class="subsec-head">Screen 7.6: Daily Challenge &amp; Shareable Wordle-Style Modal (/daily)</h3>
  <p>
    Presents the UTC-seeded 10-question challenge. Upon completion, players view today's score, time taken, countdown to UTC midnight,
    and a 1-click button copying a formatted emoji grid to the clipboard (e.g., 🟩🟩🟩🟩🟥🟩🟩🟩🟩🟩) via the Web Share API.
  </p>
  
  <h3 class="subsec-head">Screen 7.7: Analytics Dashboard &amp; Heatmap (/stats)</h3>
  <p>
    Provides Recharts visualizations tracking accuracy over time, per-region competence radar, weakest countries targeted practice CTA,
    and a progressive achievement badge wall ("First Victory", "Speed Demon", "Continent Master").
  </p>
  
  <h3 class="subsec-head">Screen 7.8: Mobile-First Responsive App Shell</h3>
  <p>
    On mobile viewports, the desktop top navigation collapses into a persistent bottom tab bar (Home, Explore, Play, Compare, Stats).
    Filter controls expand via a sliding bottom sheet, and keyboard shortcuts remain fully operable on Bluetooth mobile keyboards.
  </p>
</div>
"""

CHP5_TESTS = f"""
<div class="page" style="padding: 20px 10px;">
  <div style="float:right; font-weight:bold; color:#64748b;">35</div>
  <h2 class="sec-head">5.3 Test Cases &amp; Verification Suite</h2>
  <p>
    The project maintains an automated test matrix consisting of <strong>58 Vitest unit/component tests</strong> (100% passing)
    and <strong>4 Playwright end-to-end browser specs</strong> incorporating automated <code>@axe-core/playwright</code> accessibility audits:
  </p>
  <table>
    <tr>
      <th style="width:10%;">ID</th>
      <th style="width:25%;">Test Scenario</th>
      <th style="width:40%;">Expected Behavior</th>
      <th style="width:25%;">Test Suite File</th>
    </tr>
    <tr><td>TC01</td><td>Batched API Merging</td><td>Batches 1 &amp; 2 merge correctly on cca3 without field loss</td><td>src/tests/data-layer.test.ts</td></tr>
    <tr><td>TC02</td><td>10-Field Limit Compliance</td><td>URL queries never exceed 10 fields per REST request</td><td>src/tests/data-layer.test.ts</td></tr>
    <tr><td>TC03</td><td>Offline Embedded Fallback</td><td>Returns FALLBACK_COUNTRIES on network abort / 500 error</td><td>src/tests/data-layer.test.ts</td></tr>
    <tr><td>TC04</td><td>Zustand Persist &amp; Migrations</td><td>Upgrades v1 storage to v2 schema without dropping streaks</td><td>src/tests/stores.test.ts</td></tr>
    <tr><td>TC05</td><td>Mulberry32 PRNG Determinism</td><td>Identical seed produces 100% identical question sequences</td><td>src/tests/quiz-engine.test.ts</td></tr>
    <tr><td>TC06</td><td>Regional Distractor Matching</td><td>Distractors strictly prioritize identical geographical regions</td><td>src/tests/quiz-engine.test.ts</td></tr>
    <tr><td>TC07</td><td>Scoring Multipliers</td><td>Correct answers scale from 1.0x to 3.0x multiplier on streak</td><td>src/tests/quiz-engine.test.ts</td></tr>
    <tr><td>TC08</td><td>Fuse.js Fuzzy Matching</td><td>Matches typo "Geramy" &rarr; Germany, "Jpn" &rarr; Japan</td><td>src/tests/explore.test.tsx</td></tr>
    <tr><td>TC09</td><td>Multi-Nation Comparison</td><td>Accurately highlights highest population and area winners</td><td>src/tests/explore.test.tsx</td></tr>
    <tr><td>TC10</td><td>Playwright Quiz Journey</td><td>Completes 10-question quiz using keyboard 1-4 shortcuts</td><td>e2e/quiz.spec.ts</td></tr>
    <tr><td>TC11</td><td>Playwright Explorer Flow</td><td>Applies region filter, updates URL, navigates to country</td><td>e2e/explorer.spec.ts</td></tr>
    <tr><td>TC12</td><td>WCAG 2.2 AA Axe Audit</td><td>Zero accessibility violations across all primary routes</td><td>e2e/accessibility.spec.ts</td></tr>
  </table>
  <p style="margin-top:14px;">
    <strong>Verification Commands:</strong> <code>pnpm test</code> (58/58 unit tests passing in Vitest), <code>pnpm typecheck</code> (0 TypeScript errors),
    <code>pnpm lint</code> (0 ESLint errors), and <code>pnpm build</code> (Next.js compiles 42 static &amp; SSG pages).
  </p>
</div>
"""
