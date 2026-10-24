# FlagForge Design System Specification

## 1. Vision & Aesthetic Identity

**FlagForge** is a modern, high-precision interactive world atlas and vexillology arena. Its visual language merges:

- **Cartographic Precision**: Crisp geographic grids, latitude/longitude line accents, compass roses, and nautical coordinates.
- **Oceanic Indigo & Warm Terracotta**: Deep seafaring navy and azure indigo palettes paired with vibrant terracotta, amber, and sunlit gold accents.
- **Museum-grade Vexillology**: Flags are treated as premier cultural artifacts—framed with micro-borders for high visibility against both light and dark backgrounds, with strict aspect-ratio preservation (3:2 standard).
- **Uncompromising Accessibility**: Full WCAG 2.2 Level AA compliance, 3:1 contrast focus rings, 4.5:1 text contrast ratios, high-contrast mode, and reduced-motion fallbacks.

---

## 2. Color System & Design Tokens

FlagForge supports three distinct modes: **Light Mode**, **Dark Mode (Default)**, and **High-Contrast Mode**.

### 2.1 CSS Variables Reference Table

| Token                      | Light Mode         | Dark Mode (Default) | High Contrast Mode  | Description                               |
| :------------------------- | :----------------- | :------------------ | :------------------ | :---------------------------------------- |
| `--background`             | `hsl(210 40% 98%)` | `hsl(222 47% 7%)`   | `hsl(0 0% 0%)`      | Main viewport canvas                      |
| `--foreground`             | `hsl(222 47% 11%)` | `hsl(210 40% 98%)`  | `hsl(0 0% 100%)`    | Primary reading text                      |
| `--card`                   | `hsl(0 0% 100%)`   | `hsl(217 33% 12%)`  | `hsl(0 0% 4%)`      | Container surfaces                        |
| `--card-foreground`        | `hsl(222 47% 11%)` | `hsl(210 40% 98%)`  | `hsl(0 0% 100%)`    | Card body text                            |
| `--popover`                | `hsl(0 0% 100%)`   | `hsl(217 33% 12%)`  | `hsl(0 0% 4%)`      | Tooltips, dropdowns, popups               |
| `--popover-foreground`     | `hsl(222 47% 11%)` | `hsl(210 40% 98%)`  | `hsl(0 0% 100%)`    | Popover text                              |
| `--primary`                | `hsl(201 96% 32%)` | `hsl(199 89% 48%)`  | `hsl(199 100% 65%)` | Oceanic indigo brand color                |
| `--primary-foreground`     | `hsl(210 40% 98%)` | `hsl(222 47% 7%)`   | `hsl(0 0% 0%)`      | Text on primary                           |
| `--secondary`              | `hsl(210 40% 93%)` | `hsl(217 33% 18%)`  | `hsl(0 0% 15%)`     | Secondary surfaces / subtle pills         |
| `--secondary-foreground`   | `hsl(222 47% 11%)` | `hsl(210 40% 98%)`  | `hsl(0 0% 100%)`    | Text on secondary                         |
| `--muted`                  | `hsl(210 40% 94%)` | `hsl(217 33% 16%)`  | `hsl(0 0% 12%)`     | Inactive tracks, dividers                 |
| `--muted-foreground`       | `hsl(215 16% 47%)` | `hsl(215 20% 65%)`  | `hsl(0 0% 85%)`     | Subtitles, helper text                    |
| `--accent`                 | `hsl(28 95% 45%)`  | `hsl(32 98% 54%)`   | `hsl(40 100% 60%)`  | Terracotta / Amber action accent          |
| `--accent-foreground`      | `hsl(0 0% 100%)`   | `hsl(222 47% 7%)`   | `hsl(0 0% 0%)`      | Text on accent                            |
| `--destructive`            | `hsl(0 84% 60%)`   | `hsl(0 72% 51%)`    | `hsl(0 100% 65%)`   | Danger, error, wrong guess                |
| `--destructive-foreground` | `hsl(0 0% 100%)`   | `hsl(210 40% 98%)`  | `hsl(0 0% 0%)`      | Text on destructive                       |
| `--success`                | `hsl(142 71% 45%)` | `hsl(142 76% 40%)`  | `hsl(142 100% 55%)` | Correct answer, victory                   |
| `--warning`                | `hsl(38 92% 50%)`  | `hsl(38 92% 50%)`   | `hsl(45 100% 55%)`  | Streak warning, timer alert               |
| `--border`                 | `hsl(214 32% 88%)` | `hsl(217 33% 22%)`  | `hsl(0 0% 100%)`    | Structural borders                        |
| `--input`                  | `hsl(214 32% 88%)` | `hsl(217 33% 22%)`  | `hsl(0 0% 100%)`    | Form field borders                        |
| `--ring`                   | `hsl(201 96% 32%)` | `hsl(199 89% 48%)`  | `hsl(60 100% 50%)`  | Accessible focus indicator (yellow in HC) |
| `--radius`                 | `0.75rem` (12px)   | `0.75rem` (12px)    | `0.5rem` (8px)      | Base corner radius                        |

---

## 3. Typography Scale

FlagForge utilizes **Plus Jakarta Sans** for prominent headings and display numbers, paired with **Inter** for UI copy, data grids, and body text.

| Level         | Size            | Line Height | Tracking | Weight               | Usage                                       |
| :------------ | :-------------- | :---------- | :------- | :------------------- | :------------------------------------------ |
| `display-2xl` | 3.75rem (60px)  | 1.05        | -0.03em  | 800 (Bold/Extrabold) | Hero headline                               |
| `display-xl`  | 3.00rem (48px)  | 1.10        | -0.025em | 700 (Bold)           | Major section titles, game victory scores   |
| `display-lg`  | 2.25rem (36px)  | 1.15        | -0.02em  | 700 (Bold)           | Page headers, modal titles                  |
| `heading-md`  | 1.50rem (24px)  | 1.25        | -0.015em | 600 (Semibold)       | Card titles, quiz questions                 |
| `heading-sm`  | 1.25rem (20px)  | 1.35        | -0.01em  | 600 (Semibold)       | Stat titles, feature names                  |
| `body-base`   | 1.00rem (16px)  | 1.50        | 0em      | 400 (Regular)        | Primary paragraphs, description copy        |
| `body-sm`     | 0.875rem (14px) | 1.45        | 0em      | 500 (Medium)         | Navigation links, button labels, inputs     |
| `caption-xs`  | 0.75rem (12px)  | 1.40        | +0.02em  | 500 (Medium)         | Badges, micro-stats, footnotes, coordinates |

---

## 4. Spacing & Radius System

A strict **4px (0.25rem)** incremental spacing scale:

- `space-1`: 4px
- `space-2`: 8px
- `space-3`: 12px
- `space-4`: 16px
- `space-6`: 24px
- `space-8`: 32px
- `space-12`: 48px
- `space-16`: 64px

### Border Radii

- `radius-sm`: `calc(var(--radius) - 4px)` (8px) — Badges, chips, small inputs
- `radius-md`: `calc(var(--radius) - 2px)` (10px) — Buttons, form controls
- `radius-lg`: `var(--radius)` (12px) — Standard cards, dialogs
- `radius-xl`: `calc(var(--radius) + 4px)` (16px) — Hero banners, feature grids
- `radius-full`: `9999px` — Avatars, pill badges, compass indicators

---

## 5. Shadows & Elevation

Layering is designed with cartographic subtle glows:

- `shadow-sm`: `0 1px 2px 0 rgb(0 0 0 / 0.05)`
- `shadow-md`: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`
- `shadow-lg`: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`
- `shadow-glow-ocean`: `0 0 20px -3px rgba(56, 189, 248, 0.25)`
- `shadow-glow-terracotta`: `0 0 20px -3px rgba(249, 115, 22, 0.3)`

---

## 6. Motion & Micro-Interactions

Transitions feel deliberate, smooth, and tactile:

- **Standard Curve**: `cubic-bezier(0.16, 1, 0.3, 1)` (spring-like natural easeOut).
- **Durations**:
  - Micro (hover, focus ring, tooltip): `150ms`
  - Standard (card expand, dropdown menu, modal fade): `250ms`
  - Deliberate (sheet slide-in, confetti burst, quiz question swap): `350ms`
- **Accessibility (`prefers-reduced-motion`)**:
  - When the user prefers reduced motion, all animations drop to `0.01ms`, transforms are replaced with instant visibility shifts, and confetti is replaced with static victory badges.

---

## 7. Accessibility Rules (WCAG 2.2 AA)

1. **Focus Ring Guarantee**:
   All interactive elements must exhibit `:focus-visible` with:
   ```css
   outline: 2px solid var(--ring);
   outline-offset: 2px;
   ```
   No `outline: none` without a custom replacement. High-contrast mode upgrades the focus ring to a vibrant `3px solid #FFFF00` (safety yellow).
2. **Flag Presentation**:
   Every flag image must render a subtle border (`border border-border/40`) to prevent white-field flags (Japan, Poland, Finland, England) from bleeding into light mode backgrounds.
   Every flag must carry descriptive `alt` text or fall back to `Flag of {Country Name}`.
3. **Screen Reader Live Regions**:
   - Quiz score updates, timer changes, and toast notifications use `role="status"` or `aria-live="polite"`.
   - Error banners use `role="alert"` and `aria-live="assertive"`.
4. **Touch Target Size**:
   All interactive buttons and mobile tab items maintain a minimum tap target of `44px x 44px`.
