"""
Report content, SVGs, and templates for FlagForge Academic Project Report.
Matches Bibliotheca_Project_Report-1.pdf
"""

COLLEGE_NAME = "G.K.S. COLLEGE OF ARTS, COMMERCE & SCIENCE"
COLLEGE_AFFILIATION = "(Affiliated to University of Mumbai)"
COLLEGE_ADDRESS = "KHADAVALI-421 605. MAHARASHTRA"
DEPARTMENT = "DEPARTMENT OF COMPUTER SCIENCE"
DEGREE = "BACHELOR OF SCIENCE (COMPUTER SCIENCE)"
ACADEMIC_YEAR = "2026-2027"
CANDIDATE_NAME = "Kaushal Rajput"
PROJECT_TITLE = "Geography & Culture Learning Platform"
PROJECT_ACRONYM = "FlagForge"
COORDINATOR_NAME = "Shri. Manoj Kaurav"

SVG_SEAL = '''<svg width="140" height="140" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="92" fill="#fff" stroke="#1e3a8a" stroke-width="4"/>
  <circle cx="100" cy="100" r="82" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="4,3"/>
  <path id="curve-top" d="M 30,100 A 70,70 0 0,1 170,100" fill="none"/>
  <text font-size="10.5" font-weight="bold" fill="#1e3a8a" text-anchor="middle">
    <textPath href="#curve-top" startOffset="50%">G.K.S. COLLEGE OF ARTS &amp; COMMERCE</textPath>
  </text>
  <path id="curve-bot" d="M 170,105 A 70,70 0 0,1 30,105" fill="none"/>
  <text font-size="10" font-weight="bold" fill="#1e3a8a" text-anchor="middle">
    <textPath href="#curve-bot" startOffset="50%">SCIENCE - KHADAVLI</textPath>
  </text>
  <!-- Center Emblem: Laurel & Book & Lamp -->
  <circle cx="100" cy="100" r="50" fill="#f8fafc" stroke="#1e3a8a" stroke-width="2"/>
  <!-- Torch / Pen -->
  <polygon points="100,60 93,85 107,85" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
  <rect x="96" y="85" width="8" height="28" fill="#d97706"/>
  <!-- Flame -->
  <path d="M 100,52 Q 92,60 100,70 Q 108,60 100,52 Z" fill="#ef4444"/>
  <!-- Open Book -->
  <path d="M 75,108 Q 100,100 100,118 Q 100,100 125,108 L 122,122 Q 100,114 100,128 Q 100,114 78,122 Z" fill="#ffffff" stroke="#1e3a8a" stroke-width="2"/>
  <!-- Star -->
  <polygon points="100,132 102,137 107,137 103,140 105,145 100,142 95,145 97,140 93,137 98,137" fill="#dc2626"/>
  <!-- Ribbon 2012 -->
  <path d="M 50,158 L 75,152 L 125,152 L 150,158 L 140,168 L 125,164 L 75,164 L 60,168 Z" fill="#d97706" stroke="#92400e" stroke-width="1.5"/>
  <text x="100" y="162" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">2012</text>
</svg>'''

SVG_FIG1_PROCESS = '''<svg width="650" height="110" viewBox="0 0 650 110" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arr1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7"/>
    </marker>
    <marker id="arr1-back" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#059669"/>
    </marker>
  </defs>
  <rect x="10" y="15" width="85" height="42" rx="6" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
  <text x="52" y="41" font-size="10.5" font-family="sans-serif" text-anchor="middle" font-weight="600" fill="#0f172a">Requirements</text>
  
  <line x1="95" y1="36" x2="118" y2="36" stroke="#0284c7" stroke-width="1.5" marker-end="url(#arr1)"/>
  
  <rect x="120" y="15" width="85" height="42" rx="6" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
  <text x="162" y="41" font-size="10.5" font-family="sans-serif" text-anchor="middle" font-weight="600" fill="#0f172a">Design</text>
  
  <line x1="205" y1="36" x2="228" y2="36" stroke="#0284c7" stroke-width="1.5" marker-end="url(#arr1)"/>
  
  <rect x="230" y="15" width="100" height="42" rx="6" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
  <text x="280" y="41" font-size="10.5" font-family="sans-serif" text-anchor="middle" font-weight="600" fill="#0f172a">Implementation</text>
  
  <line x1="330" y1="36" x2="353" y2="36" stroke="#0284c7" stroke-width="1.5" marker-end="url(#arr1)"/>
  
  <rect x="355" y="15" width="80" height="42" rx="6" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
  <text x="395" y="41" font-size="10.5" font-family="sans-serif" text-anchor="middle" font-weight="600" fill="#0f172a">Testing</text>
  
  <line x1="435" y1="36" x2="458" y2="36" stroke="#0284c7" stroke-width="1.5" marker-end="url(#arr1)"/>
  
  <rect x="460" y="15" width="85" height="42" rx="6" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
  <text x="502" y="41" font-size="10.5" font-family="sans-serif" text-anchor="middle" font-weight="600" fill="#0f172a">Deployment</text>
  
  <line x1="545" y1="36" x2="568" y2="36" stroke="#0284c7" stroke-width="1.5" marker-end="url(#arr1)"/>
  
  <rect x="570" y="15" width="75" height="42" rx="6" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
  <text x="607" y="41" font-size="10" font-family="sans-serif" text-anchor="middle" font-weight="600" fill="#0f172a">Maintenance</text>
  
  <!-- Feedback loop -->
  <path d="M 607,57 L 607,85 L 52,85 L 52,57" fill="none" stroke="#059669" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr1-back)"/>
  <text x="330" y="100" font-size="9.5" font-style="italic" font-family="sans-serif" text-anchor="middle" fill="#047857">feedback from API telemetry, accessibility audits and user validation</text>
</svg>'''

SVG_FIG2_WORKFLOW = '''<svg width="650" height="170" viewBox="0 0 650 170" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#3b82f6"/>
    </marker>
  </defs>
  <rect x="10" y="20" width="100" height="45" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="60" y="47" font-size="10" font-family="sans-serif" text-anchor="middle" font-weight="600">Search / Explore</text>
  
  <line x1="110" y1="42" x2="135" y2="42" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arr2)"/>
  
  <rect x="137" y="20" width="125" height="45" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="199" y="38" font-size="9.5" font-family="sans-serif" text-anchor="middle" font-weight="600">REST Countries API</text>
  <text x="199" y="52" font-size="8.5" font-family="sans-serif" text-anchor="middle" fill="#475569">Parallel Batches (&le;10 fields)</text>
  
  <line x1="262" y1="42" x2="287" y2="42" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arr2)"/>
  
  <rect x="289" y="20" width="115" height="45" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="346" y="38" font-size="9.5" font-family="sans-serif" text-anchor="middle" font-weight="600">Merge &amp; Validate</text>
  <text x="346" y="52" font-size="8.5" font-family="sans-serif" text-anchor="middle" fill="#475569">cca3 Key + Zod Normalization</text>
  
  <line x1="404" y1="42" x2="429" y2="42" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arr2)"/>
  
  <rect x="431" y="20" width="105" height="45" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="483" y="38" font-size="9.5" font-family="sans-serif" text-anchor="middle" font-weight="600">Country Details</text>
  <text x="483" y="52" font-size="8.5" font-family="sans-serif" text-anchor="middle" fill="#475569">Wiki + Capital Weather</text>
  
  <line x1="536" y1="42" x2="561" y2="42" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arr2)"/>
  
  <rect x="563" y="20" width="80" height="45" rx="6" fill="#fdf4ff" stroke="#c084fc" stroke-width="1.5"/>
  <text x="603" y="38" font-size="9.5" font-family="sans-serif" text-anchor="middle" font-weight="600">Compare</text>
  <text x="603" y="52" font-size="8" font-family="sans-serif" text-anchor="middle" fill="#701a75">Radar &amp; Bar</text>
  
  <!-- Lower row branches: Quiz & Daily & Persistent Storage -->
  <line x1="346" y1="65" x2="346" y2="100" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arr2)"/>
  
  <rect x="250" y="102" width="192" height="45" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="346" y="120" font-size="9.5" font-family="sans-serif" text-anchor="middle" font-weight="600">Quiz Engine (Mulberry32 PRNG)</text>
  <text x="346" y="134" font-size="8.5" font-family="sans-serif" text-anchor="middle" fill="#78350f">6 Game Modes &bull; Seeded Daily Challenge</text>
  
  <line x1="442" y1="124" x2="480" y2="124" stroke="#d97706" stroke-width="1.5" marker-end="url(#arr2)"/>
  
  <rect x="482" y="102" width="160" height="45" rx="6" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
  <text x="562" y="120" font-size="9.5" font-family="sans-serif" text-anchor="middle" font-weight="600">Zustand Persist (localStorage)</text>
  <text x="562" y="134" font-size="8.5" font-family="sans-serif" text-anchor="middle" fill="#065f46">Versioned Migrations (v1 &rarr; v2)</text>
</svg>'''

SVG_FIG3_1_DFD0 = '''<svg width="650" height="240" viewBox="0 0 650 240" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arr-dfd0" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e40af"/>
    </marker>
  </defs>
  <!-- Actor: User / Learner -->
  <rect x="20" y="80" width="110" height="75" rx="4" fill="#f8fafc" stroke="#475569" stroke-width="2"/>
  <text x="75" y="112" font-size="11" font-family="sans-serif" text-anchor="middle" font-weight="bold">Learner /</text>
  <text x="75" y="128" font-size="11" font-family="sans-serif" text-anchor="middle" font-weight="bold">Quiz Player</text>
  
  <!-- Central Process: FlagForge App -->
  <ellipse cx="320" cy="118" rx="85" ry="52" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2.5"/>
  <text x="320" y="112" font-size="13" font-family="sans-serif" text-anchor="middle" font-weight="bold" fill="#1e3a8a">FlagForge</text>
  <text x="320" y="129" font-size="10.5" font-family="sans-serif" text-anchor="middle" fill="#1e40af">Web Application</text>
  
  <!-- Actor: REST Countries -->
  <rect x="490" y="15" width="145" height="52" rx="4" fill="#fef3c7" stroke="#b45309" stroke-width="1.5"/>
  <text x="562" y="38" font-size="10.5" font-family="sans-serif" text-anchor="middle" font-weight="bold">REST Countries API</text>
  <text x="562" y="52" font-size="8.5" font-family="sans-serif" text-anchor="middle" fill="#78350f">Batch 1 &amp; 2 (&le;10 fields)</text>
  
  <!-- Actor: Wikipedia & Weather -->
  <rect x="490" y="88" width="145" height="52" rx="4" fill="#ecfdf5" stroke="#047857" stroke-width="1.5"/>
  <text x="562" y="111" font-size="10.5" font-family="sans-serif" text-anchor="middle" font-weight="bold">Wikipedia &amp; Weather</text>
  <text x="562" y="125" font-size="8.5" font-family="sans-serif" text-anchor="middle" fill="#065f46">Extracts &bull; Live Telemetry</text>
  
  <!-- Data Store: LocalStorage -->
  <path d="M 490,175 L 635,175 M 490,215 L 635,215" stroke="#6b21a8" stroke-width="2"/>
  <text x="562" y="196" font-size="10.5" font-family="sans-serif" text-anchor="middle" font-weight="bold" fill="#581c87">D1: Browser Storage</text>
  <text x="562" y="210" font-size="8.5" font-family="sans-serif" text-anchor="middle" fill="#6b21a8">localStorage (Zustand)</text>
  
  <!-- Flows -->
  <!-- User <-> App -->
  <line x1="130" y1="105" x2="233" y2="105" stroke="#1e40af" stroke-width="1.5" marker-end="url(#arr-dfd0)"/>
  <text x="180" y="100" font-size="8" font-family="sans-serif" text-anchor="middle">search, guess, config</text>
  
  <line x1="233" y1="130" x2="130" y2="130" stroke="#1e40af" stroke-width="1.5" marker-end="url(#arr-dfd0)"/>
  <text x="180" y="142" font-size="8" font-family="sans-serif" text-anchor="middle">countries, quiz, feedback</text>
  
  <!-- App <-> REST Countries -->
  <line x1="375" y1="85" x2="488" y2="45" stroke="#1e40af" stroke-width="1.5" marker-end="url(#arr-dfd0)"/>
  <text x="440" y="60" font-size="8" font-family="sans-serif" text-anchor="middle">batched query</text>
  <line x1="488" y1="55" x2="385" y2="95" stroke="#1e40af" stroke-width="1.5" marker-end="url(#arr-dfd0)"/>
  
  <!-- App <-> Wiki / Weather -->
  <line x1="405" y1="115" x2="488" y2="115" stroke="#1e40af" stroke-width="1.5" marker-end="url(#arr-dfd0)"/>
  
  <!-- App <-> Storage -->
  <line x1="375" y1="150" x2="488" y2="185" stroke="#1e40af" stroke-width="1.5" marker-end="url(#arr-dfd0)"/>
  <text x="420" y="178" font-size="8" font-family="sans-serif" text-anchor="middle">progress, settings</text>
</svg>'''

SVG_FIG3_2_DFD1 = '''<svg width="650" height="230" viewBox="0 0 650 230" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arr-dfd1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
    </marker>
  </defs>
  <!-- Processes -->
  <circle cx="180" cy="40" r="28" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="180" y="38" font-size="8" font-family="sans-serif" text-anchor="middle" font-weight="bold">1.0 Data Layer</text>
  <text x="180" y="48" font-size="7.5" font-family="sans-serif" text-anchor="middle">Ingest &amp; Merge</text>
  
  <circle cx="180" cy="115" r="28" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="180" y="112" font-size="8" font-family="sans-serif" text-anchor="middle" font-weight="bold">2.0 Search &amp;</text>
  <text x="180" y="122" font-size="7.5" font-family="sans-serif" text-anchor="middle">Fuzzy Filter</text>
  
  <circle cx="430" cy="65" r="28" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="430" y="62" font-size="8" font-family="sans-serif" text-anchor="middle" font-weight="bold">3.0 Quiz</text>
  <text x="430" y="72" font-size="7.5" font-family="sans-serif" text-anchor="middle">Engine</text>
  
  <circle cx="430" cy="155" r="28" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
  <text x="430" y="152" font-size="8" font-family="sans-serif" text-anchor="middle" font-weight="bold">4.0 Storage &amp;</text>
  <text x="430" y="162" font-size="7.5" font-family="sans-serif" text-anchor="middle">Analytics</text>
  
  <!-- Entities / Stores -->
  <rect x="15" y="80" width="80" height="40" rx="3" fill="#f8fafc" stroke="#475569" stroke-width="1.5"/>
  <text x="55" y="104" font-size="9" font-family="sans-serif" text-anchor="middle" font-weight="bold">Learner</text>
  
  <path d="M 270,30 L 360,30 M 270,50 L 360,50" stroke="#0284c7" stroke-width="1.5"/>
  <text x="315" y="44" font-size="8" font-family="sans-serif" text-anchor="middle" fill="#0369a1">D1: In-Memory / TanStack</text>
  
  <path d="M 530,145 L 640,145 M 530,165 L 640,165" stroke="#059669" stroke-width="1.5"/>
  <text x="585" y="159" font-size="8" font-family="sans-serif" text-anchor="middle" fill="#047857">D2: LocalStorage</text>
  
  <rect x="540" y="35" width="95" height="32" rx="3" fill="#f8fafc" stroke="#b45309" stroke-width="1.5"/>
  <text x="587" y="55" font-size="8.5" font-family="sans-serif" text-anchor="middle" font-weight="bold">REST APIs</text>
  
  <!-- Connections -->
  <line x1="95" y1="95" x2="152" y2="110" stroke="#0f172a" stroke-width="1.2" marker-end="url(#arr-dfd1)"/>
  <line x1="208" y1="40" x2="270" y2="40" stroke="#0f172a" stroke-width="1.2" marker-end="url(#arr-dfd1)"/>
  <line x1="360" y1="40" x2="402" y2="60" stroke="#0f172a" stroke-width="1.2" marker-end="url(#arr-dfd1)"/>
  <line x1="458" y1="65" x2="540" y2="55" stroke="#0f172a" stroke-width="1.2" marker-end="url(#arr-dfd1)"/>
  <line x1="430" y1="93" x2="430" y2="127" stroke="#0f172a" stroke-width="1.2" marker-end="url(#arr-dfd1)"/>
  <line x1="458" y1="155" x2="530" y2="155" stroke="#0f172a" stroke-width="1.2" marker-end="url(#arr-dfd1)"/>
  <line x1="180" y1="68" x2="180" y2="87" stroke="#0f172a" stroke-width="1.2" marker-end="url(#arr-dfd1)"/>
</svg>'''

SVG_FIG4_1_USECASE = '''<svg width="650" height="260" viewBox="0 0 650 260" xmlns="http://www.w3.org/2000/svg">
  <!-- System boundary -->
  <rect x="180" y="10" width="360" height="240" rx="8" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="360" y="28" font-size="11" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#334155">FlagForge System</text>
  
  <!-- Actor 1: Learner -->
  <circle cx="60" cy="70" r="14" fill="#fff" stroke="#1e293b" stroke-width="1.5"/>
  <line x1="60" y1="84" x2="60" y2="115" stroke="#1e293b" stroke-width="1.5"/>
  <line x1="60" y1="95" x2="40" y2="105" stroke="#1e293b" stroke-width="1.5"/>
  <line x1="60" y1="95" x2="80" y2="105" stroke="#1e293b" stroke-width="1.5"/>
  <line x1="60" y1="115" x2="45" y2="140" stroke="#1e293b" stroke-width="1.5"/>
  <line x1="60" y1="115" x2="75" y2="140" stroke="#1e293b" stroke-width="1.5"/>
  <text x="60" y="156" font-size="10" font-family="sans-serif" text-anchor="middle" font-weight="bold">Guest Learner</text>

  <!-- Actor 2: Quiz Player -->
  <circle cx="60" cy="180" r="14" fill="#fff" stroke="#1e293b" stroke-width="1.5"/>
  <line x1="60" y1="194" x2="60" y2="225" stroke="#1e293b" stroke-width="1.5"/>
  <line x1="60" y1="205" x2="40" y2="215" stroke="#1e293b" stroke-width="1.5"/>
  <line x1="60" y1="205" x2="80" y2="215" stroke="#1e293b" stroke-width="1.5"/>
  <line x1="60" y1="225" x2="45" y2="250" stroke="#1e293b" stroke-width="1.5"/>
  <line x1="60" y1="225" x2="75" y2="250" stroke="#1e293b" stroke-width="1.5"/>
  <text x="60" y="260" font-size="10" font-family="sans-serif" text-anchor="middle" font-weight="bold">Quiz Player</text>
  
  <!-- Use cases -->
  <ellipse cx="270" cy="50" rx="65" ry="16" fill="#fff" stroke="#0284c7" stroke-width="1.5"/>
  <text x="270" y="54" font-size="8.5" font-family="sans-serif" text-anchor="middle">UC1: Search &amp; Filter Countries</text>
  
  <ellipse cx="270" cy="90" rx="65" ry="16" fill="#fff" stroke="#0284c7" stroke-width="1.5"/>
  <text x="270" y="94" font-size="8.5" font-family="sans-serif" text-anchor="middle">UC2: Inspect Country Details</text>
  
  <ellipse cx="270" cy="130" rx="65" ry="16" fill="#fff" stroke="#0284c7" stroke-width="1.5"/>
  <text x="270" y="134" font-size="8.5" font-family="sans-serif" text-anchor="middle">UC3: Compare Nations (up to 3)</text>
  
  <ellipse cx="440" cy="65" rx="65" ry="16" fill="#fff" stroke="#d97706" stroke-width="1.5"/>
  <text x="440" y="69" font-size="8.5" font-family="sans-serif" text-anchor="middle">UC4: Play 6 Quiz Game Modes</text>
  
  <ellipse cx="440" cy="110" rx="65" ry="16" fill="#fff" stroke="#d97706" stroke-width="1.5"/>
  <text x="440" y="114" font-size="8.5" font-family="sans-serif" text-anchor="middle">UC5: Daily Seeded Challenge</text>
  
  <ellipse cx="440" cy="155" rx="65" ry="16" fill="#fff" stroke="#059669" stroke-width="1.5"/>
  <text x="440" y="159" font-size="8.5" font-family="sans-serif" text-anchor="middle">UC6: View Analytics Dashboard</text>
  
  <ellipse cx="360" cy="205" rx="75" ry="16" fill="#fff" stroke="#475569" stroke-width="1.5"/>
  <text x="360" y="209" font-size="8.5" font-family="sans-serif" text-anchor="middle">UC7: Manage Settings &amp; Theme</text>
  
  <!-- Association Lines -->
  <line x1="85" y1="100" x2="205" y2="55" stroke="#64748b" stroke-width="1.2"/>
  <line x1="85" y1="105" x2="205" y2="90" stroke="#64748b" stroke-width="1.2"/>
  <line x1="85" y1="110" x2="205" y2="130" stroke="#64748b" stroke-width="1.2"/>
  <line x1="85" y1="115" x2="285" y2="205" stroke="#64748b" stroke-width="1.2"/>
  
  <line x1="85" y1="200" x2="375" y2="70" stroke="#64748b" stroke-width="1.2"/>
  <line x1="85" y1="205" x2="375" y2="115" stroke="#64748b" stroke-width="1.2"/>
  <line x1="85" y1="210" x2="375" y2="160" stroke="#64748b" stroke-width="1.2"/>
  <line x1="85" y1="215" x2="285" y2="205" stroke="#64748b" stroke-width="1.2"/>
</svg>'''

SVG_FIG4_2_CLASS = '''<svg width="650" height="240" viewBox="0 0 650 240" xmlns="http://www.w3.org/2000/svg">
  <!-- Country Class -->
  <rect x="10" y="10" width="180" height="150" rx="3" fill="#f8fafc" stroke="#1e40af" stroke-width="1.5"/>
  <rect x="10" y="10" width="180" height="24" fill="#1e40af"/>
  <text x="100" y="26" font-size="10.5" font-family="sans-serif" font-weight="bold" fill="#fff" text-anchor="middle">Country</text>
  <text x="18" y="48" font-size="8.5" font-family="monospace">+ cca3: string</text>
  <text x="18" y="62" font-size="8.5" font-family="monospace">+ name: { common, official }</text>
  <text x="18" y="76" font-size="8.5" font-family="monospace">+ capital: string[]</text>
  <text x="18" y="90" font-size="8.5" font-family="monospace">+ region: Region</text>
  <text x="18" y="104" font-size="8.5" font-family="monospace">+ population: number</text>
  <text x="18" y="118" font-size="8.5" font-family="monospace">+ area: number</text>
  <text x="18" y="132" font-size="8.5" font-family="monospace">+ flags: { svg, png, alt }</text>
  <text x="18" y="146" font-size="8.5" font-family="monospace">+ borders: string[]</text>

  <!-- QuizQuestion Class -->
  <rect x="230" y="10" width="190" height="135" rx="3" fill="#f8fafc" stroke="#b45309" stroke-width="1.5"/>
  <rect x="230" y="10" width="190" height="24" fill="#b45309"/>
  <text x="325" y="26" font-size="10.5" font-family="sans-serif" font-weight="bold" fill="#fff" text-anchor="middle">QuizQuestion</text>
  <text x="238" y="48" font-size="8.5" font-family="monospace">+ id: string</text>
  <text x="238" y="62" font-size="8.5" font-family="monospace">+ mode: QuizMode</text>
  <text x="238" y="76" font-size="8.5" font-family="monospace">+ prompt: string</text>
  <text x="238" y="90" font-size="8.5" font-family="monospace">+ targetCountry: Country</text>
  <text x="238" y="104" font-size="8.5" font-family="monospace">+ options: QuizOption[4]</text>
  <text x="238" y="118" font-size="8.5" font-family="monospace">+ explanation: string</text>
  <text x="238" y="132" font-size="8.5" font-family="monospace">+ difficulty: Difficulty</text>

  <!-- ProgressState Class -->
  <rect x="460" y="10" width="180" height="150" rx="3" fill="#f8fafc" stroke="#047857" stroke-width="1.5"/>
  <rect x="460" y="10" width="180" height="24" fill="#047857"/>
  <text x="550" y="26" font-size="10.5" font-family="sans-serif" font-weight="bold" fill="#fff" text-anchor="middle">ProgressState</text>
  <text x="468" y="48" font-size="8.5" font-family="monospace">+ streak: { current, best }</text>
  <text x="468" y="62" font-size="8.5" font-family="monospace">+ totalGamesPlayed: number</text>
  <text x="468" y="76" font-size="8.5" font-family="monospace">+ totalCorrectAnswers: number</text>
  <text x="468" y="90" font-size="8.5" font-family="monospace">+ regionAccuracy: Record</text>
  <text x="468" y="104" font-size="8.5" font-family="monospace">+ modeAccuracy: Record</text>
  <text x="468" y="118" font-size="8.5" font-family="monospace">+ questionHistory: History[]</text>
  <text x="468" y="132" font-size="8.5" font-family="monospace">+ dailyChallenges: Record</text>
  <text x="468" y="146" font-size="8.5" font-family="monospace">+ achievements: Badge[]</text>

  <!-- Association / Relationships -->
  <line x1="190" y1="75" x2="230" y2="75" stroke="#475569" stroke-width="1.5"/>
  <text x="208" y="70" font-size="8" font-family="sans-serif">1..*</text>
  
  <line x1="420" y1="75" x2="460" y2="75" stroke="#475569" stroke-width="1.5"/>
  <text x="435" y="70" font-size="8" font-family="sans-serif">records</text>
  
  <text x="325" y="210" font-size="9" font-style="italic" font-family="sans-serif" fill="#475569" text-anchor="middle">Figure 4.2: Domain Class Model mapping Countries, Deterministic Questions, and Persisted Progress</text>
</svg>'''

SVG_FIG6_SYSTEM_ARCH = '''<svg width="650" height="230" viewBox="0 0 650 230" xmlns="http://www.w3.org/2000/svg">
  <!-- Presentation Layer -->
  <rect x="20" y="10" width="610" height="48" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="325" y="28" font-size="11" font-weight="bold" font-family="sans-serif" fill="#1e40af" text-anchor="middle">Presentation Layer (Next.js 15 App Router &amp; React 19)</text>
  <text x="325" y="44" font-size="8.5" font-family="sans-serif" fill="#3b82f6" text-anchor="middle">AppShell &bull; Navbar &bull; MobileTabBar &bull; Cmd+K Palette &bull; /explore &bull; /country/[code] &bull; /compare &bull; /play &bull; /daily &bull; /stats</text>

  <!-- State & Logic Layer -->
  <rect x="20" y="72" width="610" height="48" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="325" y="90" font-size="11" font-weight="bold" font-family="sans-serif" fill="#92400e" text-anchor="middle">State &amp; Domain Engine Layer</text>
  <text x="325" y="106" font-size="8.5" font-family="sans-serif" fill="#b45309" text-anchor="middle">Zustand Stores (Settings, Progress, Favorites) &bull; Mulberry32 Seeded Quiz Engine &bull; Web Audio Synthesizer</text>

  <!-- Data Integration Layer -->
  <rect x="20" y="134" width="610" height="48" rx="6" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
  <text x="325" y="152" font-size="11" font-weight="bold" font-family="sans-serif" fill="#065f46" text-anchor="middle">Data Access &amp; Federation Layer (TanStack Query &amp; API Clients)</text>
  <text x="325" y="168" font-size="8.5" font-family="sans-serif" fill="#047857" text-anchor="middle">Batched REST Countries Client (&le;10 fields) &bull; Wikipedia Summary Client &bull; Open-Meteo Weather Client &bull; Offline Fallback</text>

  <!-- External Infrastructure Layer -->
  <rect x="20" y="196" width="610" height="30" rx="4" fill="#f8fafc" stroke="#475569" stroke-width="1.2"/>
  <text x="325" y="215" font-size="9" font-family="sans-serif" fill="#334155" text-anchor="middle">External &amp; Browser Platform: REST Countries v3.1 &bull; Wikipedia API &bull; Open-Meteo &bull; LocalStorage &bull; Service Worker Cache</text>
</svg>'''

SVG_FIG4_3_ACTIVITY = '''<svg width="650" height="260" viewBox="0 0 650 260" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arr-act" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
    </marker>
  </defs>
  <!-- Start -->
  <circle cx="40" cy="130" r="12" fill="#0f172a"/>
  
  <line x1="52" y1="130" x2="80" y2="130" stroke="#1e293b" stroke-width="1.5" marker-end="url(#arr-act)"/>
  
  <!-- Step 1: Select Mode -->
  <rect x="82" y="110" width="95" height="40" rx="5" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="129" y="128" font-size="8.5" font-family="sans-serif" text-anchor="middle" font-weight="600">Select Mode &amp;</text>
  <text x="129" y="140" font-size="8" font-family="sans-serif" text-anchor="middle">Difficulty</text>
  
  <line x1="177" y1="130" x2="205" y2="130" stroke="#1e293b" stroke-width="1.5" marker-end="url(#arr-act)"/>
  
  <!-- Step 2: Render Question -->
  <rect x="207" y="110" width="100" height="40" rx="5" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="257" y="128" font-size="8.5" font-family="sans-serif" text-anchor="middle" font-weight="600">Render Question</text>
  <text x="257" y="140" font-size="8" font-family="sans-serif" text-anchor="middle">&amp; Start Timer</text>
  
  <line x1="307" y1="130" x2="335" y2="130" stroke="#1e293b" stroke-width="1.5" marker-end="url(#arr-act)"/>
  
  <!-- Decision: Answer Correct? -->
  <polygon points="370,105 415,130 370,155 325,130" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="370" y="133" font-size="8" font-family="sans-serif" text-anchor="middle" font-weight="bold">Correct?</text>
  
  <!-- Branch Yes: Streak ++ -->
  <path d="M 370,105 L 370,55 L 440,55" fill="none" stroke="#059669" stroke-width="1.5" marker-end="url(#arr-act)"/>
  <text x="385" y="75" font-size="8" font-family="sans-serif" fill="#059669" font-weight="bold">Yes</text>
  <rect x="442" y="35" width="105" height="40" rx="5" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
  <text x="494" y="52" font-size="8" font-family="sans-serif" text-anchor="middle" font-weight="600">Streak ++ &amp;</text>
  <text x="494" y="64" font-size="8" font-family="sans-serif" text-anchor="middle">Speed Multiplier</text>
  
  <!-- Branch No: Reset Streak -->
  <path d="M 370,155 L 370,205 L 440,205" fill="none" stroke="#dc2626" stroke-width="1.5" marker-end="url(#arr-act)"/>
  <text x="385" y="185" font-size="8" font-family="sans-serif" fill="#dc2626" font-weight="bold">No / Timeout</text>
  <rect x="442" y="185" width="105" height="40" rx="5" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="494" y="202" font-size="8" font-family="sans-serif" text-anchor="middle" font-weight="600">Lives - 1 &amp;</text>
  <text x="494" y="214" font-size="8" font-family="sans-serif" text-anchor="middle">Reset Streak to 0</text>
  
  <!-- Merge to check GameOver -->
  <path d="M 547,55 L 575,55 L 575,115" fill="none" stroke="#1e293b" stroke-width="1.5"/>
  <path d="M 547,205 L 575,205 L 575,145" fill="none" stroke="#1e293b" stroke-width="1.5"/>
  
  <rect x="545" y="115" width="60" height="30" rx="4" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5"/>
  <text x="575" y="132" font-size="7.5" font-family="sans-serif" text-anchor="middle">Record Stat</text>
  
  <circle cx="630" cy="130" r="10" fill="#fff" stroke="#0f172a" stroke-width="2"/>
  <circle cx="630" cy="130" r="6" fill="#0f172a"/>
  
  <line x1="605" y1="130" x2="618" y2="130" stroke="#1e293b" stroke-width="1.5" marker-end="url(#arr-act)"/>
</svg>'''

SVG_FIG4_4_SEQUENCE = '''<svg width="650" height="260" viewBox="0 0 650 260" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arr-seq" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e40af"/>
    </marker>
  </defs>
  <!-- Lifelines -->
  <rect x="25" y="10" width="85" height="28" rx="4" fill="#f8fafc" stroke="#475569" stroke-width="1.5"/>
  <text x="67" y="27" font-size="9" font-family="sans-serif" text-anchor="middle" font-weight="bold">Browser</text>
  <line x1="67" y1="38" x2="67" y2="250" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,3"/>

  <rect x="160" y="10" width="105" height="28" rx="4" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="212" y="27" font-size="9" font-family="sans-serif" text-anchor="middle" font-weight="bold">useCountries()</text>
  <line x1="212" y1="38" x2="212" y2="250" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,3"/>

  <rect x="320" y="10" width="125" height="28" rx="4" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="382" y="27" font-size="9" font-family="sans-serif" text-anchor="middle" font-weight="bold">Data Layer Adapter</text>
  <line x1="382" y1="38" x2="382" y2="250" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,3"/>

  <rect x="495" y="10" width="135" height="28" rx="4" fill="#fef3c7" stroke="#b45309" stroke-width="1.5"/>
  <text x="562" y="27" font-size="9" font-family="sans-serif" text-anchor="middle" font-weight="bold">REST Countries API</text>
  <line x1="562" y1="38" x2="562" y2="250" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,3"/>

  <!-- Messages -->
  <line x1="67" y1="58" x2="207" y2="58" stroke="#1e40af" stroke-width="1.3" marker-end="url(#arr-seq)"/>
  <text x="135" y="53" font-size="7.5" font-family="sans-serif" text-anchor="middle">1: query['countries']</text>

  <line x1="212" y1="78" x2="377" y2="78" stroke="#1e40af" stroke-width="1.3" marker-end="url(#arr-seq)"/>
  <text x="295" y="73" font-size="7.5" font-family="sans-serif" text-anchor="middle">2: getAllCountries()</text>

  <!-- Parallel batch calls -->
  <line x1="382" y1="100" x2="557" y2="100" stroke="#b45309" stroke-width="1.3" marker-end="url(#arr-seq)"/>
  <text x="470" y="95" font-size="7.5" font-family="sans-serif" text-anchor="middle">3a: Batch 1 (9 fields &le; 10)</text>

  <line x1="382" y1="120" x2="557" y2="120" stroke="#b45309" stroke-width="1.3" marker-end="url(#arr-seq)"/>
  <text x="470" y="115" font-size="7.5" font-family="sans-serif" text-anchor="middle">3b: Batch 2 (10 fields &le; 10)</text>

  <line x1="562" y1="145" x2="387" y2="145" stroke="#059669" stroke-width="1.3" stroke-dasharray="3,2" marker-end="url(#arr-seq)"/>
  <text x="470" y="140" font-size="7.5" font-family="sans-serif" text-anchor="middle">4: JSON batch responses</text>

  <rect x="340" y="160" width="85" height="24" rx="3" fill="#f0fdf4" stroke="#16a34a" stroke-width="1"/>
  <text x="382" y="175" font-size="7" font-family="sans-serif" text-anchor="middle">Merge by cca3</text>

  <line x1="382" y1="200" x2="217" y2="200" stroke="#1e40af" stroke-width="1.3" stroke-dasharray="3,2" marker-end="url(#arr-seq)"/>
  <text x="295" y="195" font-size="7.5" font-family="sans-serif" text-anchor="middle">5: Normalized Country[]</text>

  <line x1="212" y1="225" x2="72" y2="225" stroke="#1e40af" stroke-width="1.3" stroke-dasharray="3,2" marker-end="url(#arr-seq)"/>
  <text x="135" y="220" font-size="7.5" font-family="sans-serif" text-anchor="middle">6: Render Country Grid</text>
</svg>'''

SVG_FIG4_5_STORAGE = '''<svg width="650" height="210" viewBox="0 0 650 210" xmlns="http://www.w3.org/2000/svg">
  <!-- Key 1: flagforge-settings -->
  <rect x="15" y="15" width="195" height="150" rx="4" fill="#f8fafc" stroke="#2563eb" stroke-width="1.5"/>
  <rect x="15" y="15" width="195" height="24" fill="#2563eb"/>
  <text x="112" y="31" font-size="9.5" font-weight="bold" fill="#fff" font-family="sans-serif" text-anchor="middle">flagforge-settings (v2)</text>
  <text x="25" y="55" font-size="8" font-family="monospace">theme: 'system'|'light'|'dark'</text>
  <text x="25" y="70" font-size="8" font-family="monospace">sound: boolean (default false)</text>
  <text x="25" y="85" font-size="8" font-family="monospace">reducedMotion: boolean</text>
  <text x="25" y="100" font-size="8" font-family="monospace">units: 'metric' | 'imperial'</text>
  <text x="25" y="115" font-size="8" font-family="monospace">highContrast: boolean</text>
  <text x="25" y="130" font-size="7.5" font-family="sans-serif" fill="#2563eb">Migration: adds units &amp; contrast</text>

  <!-- Key 2: flagforge-progress -->
  <rect x="225" y="15" width="220" height="150" rx="4" fill="#f8fafc" stroke="#d97706" stroke-width="1.5"/>
  <rect x="225" y="15" width="220" height="24" fill="#d97706"/>
  <text x="335" y="31" font-size="9.5" font-weight="bold" fill="#fff" font-family="sans-serif" text-anchor="middle">flagforge-progress (v2)</text>
  <text x="235" y="55" font-size="8" font-family="monospace">streak: { current, best, date }</text>
  <text x="235" y="70" font-size="8" font-family="monospace">totalGamesPlayed: number</text>
  <text x="235" y="85" font-size="8" font-family="monospace">regionAccuracy: Record&lt;string&gt;</text>
  <text x="235" y="100" font-size="8" font-family="monospace">questionHistory: History[] (&le;200)</text>
  <text x="235" y="115" font-size="8" font-family="monospace">dailyChallenges: Record&lt;string&gt;</text>
  <text x="235" y="130" font-size="8" font-family="monospace">achievements: Achievement[]</text>
  <text x="235" y="145" font-size="7.5" font-family="sans-serif" fill="#d97706">Migration: adds per-question audit</text>

  <!-- Key 3: flagforge-favorites -->
  <rect x="460" y="15" width="175" height="150" rx="4" fill="#f8fafc" stroke="#059669" stroke-width="1.5"/>
  <rect x="460" y="15" width="175" height="24" fill="#059669"/>
  <text x="547" y="31" font-size="9.5" font-weight="bold" fill="#fff" font-family="sans-serif" text-anchor="middle">flagforge-favorites (v2)</text>
  <text x="470" y="55" font-size="8" font-family="monospace">favorites: string[] (cca3)</text>
  <text x="470" y="70" font-size="8" font-family="monospace">recentSearches: string[] (&le;10)</text>
  <text x="470" y="90" font-size="7.5" font-family="sans-serif" fill="#059669">Migration: deduplicates recents</text>
  
  <text x="325" y="190" font-size="9" font-style="italic" font-family="sans-serif" fill="#475569" text-anchor="middle">Figure 4.5: Browser LocalStorage Schemas with Versioned Zustand Migrations</text>
</svg>'''

SVG_FIG5_GANTT = '''<svg width="650" height="190" viewBox="0 0 650 190" xmlns="http://www.w3.org/2000/svg">
  <!-- Week Grid -->
  <line x1="180" y1="20" x2="630" y2="20" stroke="#cbd5e1" stroke-width="1"/>
  <line x1="180" y1="165" x2="630" y2="165" stroke="#cbd5e1" stroke-width="1"/>
  
  <text x="208" y="15" font-size="8" font-family="sans-serif" fill="#64748b" text-anchor="middle">W1</text>
  <text x="264" y="15" font-size="8" font-family="sans-serif" fill="#64748b" text-anchor="middle">W2</text>
  <text x="320" y="15" font-size="8" font-family="sans-serif" fill="#64748b" text-anchor="middle">W3</text>
  <text x="376" y="15" font-size="8" font-family="sans-serif" fill="#64748b" text-anchor="middle">W4</text>
  <text x="432" y="15" font-size="8" font-family="sans-serif" fill="#64748b" text-anchor="middle">W5</text>
  <text x="488" y="15" font-size="8" font-family="sans-serif" fill="#64748b" text-anchor="middle">W6</text>
  <text x="544" y="15" font-size="8" font-family="sans-serif" fill="#64748b" text-anchor="middle">W7</text>
  <text x="600" y="15" font-size="8" font-family="sans-serif" fill="#64748b" text-anchor="middle">W8</text>

  <!-- Bars -->
  <text x="15" y="38" font-size="8.5" font-family="sans-serif" font-weight="600">1. Architecture &amp; Data Layer</text>
  <rect x="180" y="27" width="112" height="15" rx="3" fill="#0284c7"/>

  <text x="15" y="62" font-size="8.5" font-family="sans-serif" font-weight="600">2. Design System &amp; Shell</text>
  <rect x="236" y="51" width="112" height="15" rx="3" fill="#6366f1"/>

  <text x="15" y="86" font-size="8.5" font-family="sans-serif" font-weight="600">3. Explorer &amp; Compare Nations</text>
  <rect x="292" y="75" width="112" height="15" rx="3" fill="#0ea5e9"/>

  <text x="15" y="110" font-size="8.5" font-family="sans-serif" font-weight="600">4. Quiz Engine &amp; Daily Mode</text>
  <rect x="348" y="99" width="112" height="15" rx="3" fill="#f59e0b"/>

  <text x="15" y="134" font-size="8.5" font-family="sans-serif" font-weight="600">5. Testing (Vitest &amp; Playwright)</text>
  <rect x="460" y="123" width="112" height="15" rx="3" fill="#10b981"/>

  <text x="15" y="158" font-size="8.5" font-family="sans-serif" font-weight="600">6. PWA, Audit &amp; Documentation</text>
  <rect x="544" y="147" width="86" height="15" rx="3" fill="#8b5cf6"/>

  <text x="325" y="182" font-size="9" font-style="italic" font-family="sans-serif" fill="#475569" text-anchor="middle">Figure 5: Eight-Week Development Timeline (FlagForge Engineering Roadmap)</text>
</svg>'''
