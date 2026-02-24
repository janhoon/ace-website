# Operations Dashboard Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor the Ace website from a glowy neon dark theme to a professional "Operations Dashboard" aesthetic with mixed dark/light sections, emerald accent color, and data-inspired decorative elements.

**Architecture:** Pure visual redesign — modify global CSS, then update each component file sequentially. No new dependencies, no structural changes to the Astro build. OverviewSection merges into HeroSection. ScreenshotsSection merges into FeaturesSection. All other sections get restyled in place.

**Tech Stack:** Astro 5.17, Tailwind CSS 4.1, static HTML/CSS only

---

### Task 1: Update global.css — new color system and remove glowy effects

**Files:**
- Modify: `src/styles/global.css` (all 59 lines rewritten)

**Step 1: Rewrite global.css**

Replace the entire content of `src/styles/global.css` with:

```css
@import "tailwindcss";

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    font-family: "Space Grotesk", "Segoe UI", sans-serif;
    line-height: 1.5;
    background: #f8fafc;
    color: #475569;
    min-height: 100vh;
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: "Space Grotesk", "Segoe UI", sans-serif;
    letter-spacing: -0.02em;
  }

  code,
  kbd,
  pre,
  samp {
    font-family: "IBM Plex Mono", "Cascadia Mono", monospace;
  }
}

@layer components {
  .section-band {
    @apply w-full py-20 px-6 md:px-12 lg:px-20;
  }

  .section-inner {
    @apply mx-auto w-full max-w-6xl;
  }

  .dark-section {
    background: #0f172a;
    color: #94a3b8;
  }

  .dark-section h1,
  .dark-section h2,
  .dark-section h3,
  .dark-section h4 {
    color: #f1f5f9;
  }

  .light-section {
    background: #f8fafc;
    color: #475569;
  }

  .light-section h1,
  .light-section h2,
  .light-section h3,
  .light-section h4 {
    color: #0f172a;
  }
}
```

Key changes:
- Body background changes from `#020617` (near-black) to `#f8fafc` (slate-50) since most sections are now light
- Heading letter-spacing tightened from `-0.01em` to `-0.02em`
- Heading color removed from base (set per section via `.dark-section` / `.light-section`)
- `.site-sheen` removed entirely (the grid overlay effect)
- Added `.dark-section` and `.light-section` utility classes for section theming

**Step 2: Verify build still works**

Run: `cd /home/janhoon/projects/dash-website && npx astro build`
Expected: Build succeeds (visual changes only, no structural breaks)

**Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "style: update global CSS — new color system, remove glowy effects"
```

---

### Task 2: Update index.astro — remove glowy elements, drop OverviewSection

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Update index.astro**

Make these changes to `src/pages/index.astro`:

1. Remove the OverviewSection import (line 5):
```
- import OverviewSection from '../components/landing/OverviewSection.astro';
```

2. Change `<meta name="theme-color" content="#0f172a" />` (line 30) — already correct, keep as-is.

3. Change the skip-to-content link colors (lines 63-67). Replace:
```
focus:bg-amber-400 focus:text-slate-950
```
with:
```
focus:bg-emerald-600 focus:text-white
```

4. Remove the entire gradient orbs div (lines 69-73). Delete:
```html
<div aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
  <div class="absolute -top-40 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl"></div>
  <div class="absolute bottom-0 left-[-10%] h-[20rem] w-[20rem] rounded-full bg-amber-400/5 blur-3xl"></div>
  <div class="absolute right-[-8%] top-1/2 h-[22rem] w-[22rem] -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl"></div>
</div>
```

5. Remove `site-sheen` class from `<body>` (line 62). Change:
```html
<body class="site-sheen">
```
to:
```html
<body>
```

6. Remove `<OverviewSection />` from the main content (line 80).

7. Update the nav reference in `src/data/landing.ts` — change the SiteNavigationElement `name` and `url` arrays. Remove 'Overview' / '/#overview' entries since that section is gone. Replace with section IDs that still exist.

The final `<main>` block should be:
```html
<main id="main-content">
  <HeroSection />
  <FeaturesSection />
  <TestimonialsSection />
  <ComparisonSection />
  <TiersSection />
  <CtaSection />
</main>
```

Note: ScreenshotsSection is also removed (merged into Features in Task 6).

**Step 2: Remove OverviewSection.astro file**

```bash
rm src/components/landing/OverviewSection.astro
```

**Step 3: Verify build**

Run: `cd /home/janhoon/projects/dash-website && npx astro build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add -u && git add src/pages/index.astro
git commit -m "refactor: remove glowy elements, drop OverviewSection from page"
```

---

### Task 3: Update HeaderNav.astro — solid dark header, emerald CTA

**Files:**
- Modify: `src/components/landing/HeaderNav.astro`

**Step 1: Rewrite HeaderNav.astro**

Replace the entire content with:

```astro
<div class="px-3 pt-4 md:px-6 md:pt-6">
  <header class="mx-auto w-full max-w-6xl border-b border-slate-800 bg-slate-900 px-4 py-3 md:px-5">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <a href="/" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-100 no-underline">
        <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 font-mono text-xs font-bold text-white" aria-hidden="true">A</span>
        <span class="font-mono text-xs uppercase tracking-[0.16em] text-slate-200">Ace</span>
      </a>
      <nav class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm" aria-label="Landing navigation">
        <a class="text-slate-400 transition hover:text-white" href="#features">Features</a>
        <a class="text-slate-400 transition hover:text-white" href="#comparison">Compare</a>
        <a class="text-slate-400 transition hover:text-white" href="#tiers">Pricing</a>
        <a class="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white no-underline transition hover:bg-emerald-700" href="/login">Sign in</a>
      </nav>
    </div>
  </header>
</div>
```

Key changes:
- Removed `rounded-2xl` (no pill shape)
- Removed `backdrop-blur`, `bg-slate-900/80` (no glassmorphism) → solid `bg-slate-900`
- Removed `shadow-[0_12px_35px_...]` (no glow shadow)
- Removed `border-slate-700/70` → clean `border-b border-slate-800`
- Logo mark: `bg-amber-500` → `bg-emerald-600`, text color `text-slate-950` → `text-white`
- Nav links: `text-slate-200 hover:text-amber-300` → `text-slate-400 hover:text-white`
- Sign-in button: border outline style → solid `bg-emerald-600` button
- Removed Overview and Screenshots nav links (sections merged/removed)
- Added Pricing link

**Step 2: Verify build**

Run: `cd /home/janhoon/projects/dash-website && npx astro build`

**Step 3: Commit**

```bash
git add src/components/landing/HeaderNav.astro
git commit -m "style: redesign header — solid dark bg, emerald CTA, no glassmorphism"
```

---

### Task 4: Update HeroSection.astro — emerald accent, absorb overview copy, clean screenshot

**Files:**
- Modify: `src/components/landing/HeroSection.astro`

**Step 1: Rewrite HeroSection.astro**

Replace the entire content with:

```astro
---
import StatsBar from './StatsBar.astro';
---

<section class="section-band dark-section pt-10 md:pt-16" aria-labelledby="landing-title">
  <div class="section-inner">
    <div class="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
      <div>
        <p class="m-0 font-mono text-xs uppercase tracking-[0.17em] text-emerald-400">Open-source observability</p>
        <h1 id="landing-title" class="mt-2 max-w-[16ch] text-4xl font-semibold leading-tight md:text-5xl">Ace is a truly open-source dashboard for metrics, logs, and traces.</h1>
        <p class="mt-4 max-w-2xl text-base text-slate-300">
          One place for Prometheus metrics, Loki logs, Tempo traces, and VictoriaMetrics — built for teams that need fast answers with no license-gated features.
        </p>

        <div class="mt-6 flex flex-wrap items-center gap-3">
          <a class="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white no-underline transition hover:bg-emerald-700" href="https://github.com/janhoon/ace" target="_blank" rel="noreferrer">Get Started Free</a>
          <a class="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-100 no-underline transition hover:border-slate-400 hover:text-white" href="https://github.com/janhoon/ace" target="_blank" rel="noreferrer">View on GitHub</a>
        </div>
      </div>

      <div class="overflow-hidden rounded-xl border border-slate-700 bg-slate-950" aria-label="Ace application preview">
        <picture>
          <source srcset="/landing-hero.webp" type="image/webp" />
          <img
            class="block h-auto w-full"
            src="/landing-hero.jpg"
            alt="Ace monitoring dashboard screenshot showing metrics, logs, and traces panels"
            width="1600"
            height="900"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>
    </div>

    <StatsBar />
  </div>
</section>
```

Key changes:
- `bg-[#020617]` → `dark-section` class
- Monospace label: `text-amber-400` → `text-emerald-400`, shortened to "Open-source observability"
- Hero paragraph absorbs overview section's value prop
- Primary CTA: `bg-amber-500 shadow-lg shadow-amber-500/20 hover:bg-amber-400` → `bg-emerald-600 hover:bg-emerald-700` (no shadow)
- Secondary CTA: `border-slate-600/80 hover:border-amber-400/70 hover:text-amber-300` → `border-slate-600 hover:border-slate-400 hover:text-white`
- Screenshot container: removed `bg-slate-950/70` (opacity) → `bg-slate-950` (solid), removed `shadow-[...]` (no glow), `border-slate-700/80` → `border-slate-700` (solid)

**Step 2: Verify build**

Run: `cd /home/janhoon/projects/dash-website && npx astro build`

**Step 3: Commit**

```bash
git add src/components/landing/HeroSection.astro
git commit -m "style: redesign hero — emerald accent, absorb overview, remove glow"
```

---

### Task 5: Update StatsBar.astro — monospace values, sparkline decorations

**Files:**
- Modify: `src/components/landing/StatsBar.astro`

**Step 1: Rewrite StatsBar.astro**

Replace the entire content with:

```astro
---
const stats = [
  {
    value: '8+',
    label: 'Datasources',
    sparkline: 'M0,8 L3,6 L6,7 L9,4 L12,5 L15,3 L18,4 L21,2 L24,3',
  },
  {
    value: '100%',
    label: 'Open Source',
    sparkline: 'M0,4 L4,4 L8,4 L12,4 L16,4 L20,4 L24,4',
  },
  {
    value: '16K+',
    label: 'GitHub Stars',
    sparkline: 'M0,10 L4,9 L8,7 L12,6 L16,4 L20,3 L24,2',
  },
  {
    value: 'Zero',
    label: 'Paid Tiers',
    sparkline: 'M0,4 L4,4 L8,4 L12,4 L16,4 L20,4 L24,4',
  },
];
---

<div class="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0 md:divide-x md:divide-slate-700" aria-label="Key product stats">
  {
    stats.map((stat) => (
      <div class="flex flex-col items-center text-center md:px-6">
        <div class="flex items-end gap-2">
          <span class="font-mono text-4xl font-bold text-white md:text-5xl">{stat.value}</span>
          <svg class="mb-2 h-3 w-6 text-emerald-500/40" viewBox="0 0 24 12" fill="none" aria-hidden="true">
            <path d={stat.sparkline} stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <span class="mt-1 font-mono text-xs uppercase tracking-wider text-slate-400">{stat.label}</span>
      </div>
    ))
  }
</div>
```

Key changes:
- Values: `text-amber-400` → `text-white`, added `font-mono` for data feel
- Labels: added `font-mono text-xs uppercase tracking-wider` for technical look
- Dividers: `divide-slate-700/60` → `divide-slate-700` (solid)
- Added decorative sparkline SVGs next to each value (subtle emerald, 40% opacity)

**Step 2: Verify build**

Run: `cd /home/janhoon/projects/dash-website && npx astro build`

**Step 3: Commit**

```bash
git add src/components/landing/StatsBar.astro
git commit -m "style: redesign stats bar — monospace values, sparkline decorations"
```

---

### Task 6: Merge ScreenshotsSection into FeaturesSection — light background, dashboard-panel cards

**Files:**
- Modify: `src/components/landing/FeaturesSection.astro` (full rewrite)
- Delete: `src/components/landing/ScreenshotsSection.astro`

**Step 1: Rewrite FeaturesSection.astro**

Replace the entire content with:

```astro
---
import { screenshotGallery, type LandingScreenshot } from '../../data/landing';

type FeatureCard = {
  id: string;
  title: string;
  description: string;
  iconLabel: string;
  paths: string[];
  screenshot?: LandingScreenshot;
};

const featureCards: FeatureCard[] = [
  {
    id: 'feature-multi-datasource-title',
    title: 'Multi-datasource monitoring',
    description: 'Query Prometheus metrics, Loki logs, Tempo traces, and VictoriaMetrics data from a single interface.',
    iconLabel: 'Multi-datasource icon',
    paths: [
      'M4 6.5a8 3 0 1 0 16 0a8 3 0 1 0 -16 0',
      'M4 6.5v5a8 3 0 0 0 16 0v-5',
      'M4 11.5v5a8 3 0 0 0 16 0v-5',
    ],
    screenshot: screenshotGallery.find((s) => s.id === 'dashboard-overview'),
  },
  {
    id: 'feature-self-hosted-title',
    title: 'Self-hosted deployment',
    description: 'Run Ace in your own environment and keep full control of your data and network.',
    iconLabel: 'Self-hosted icon',
    paths: ['M12 3l9 4.5v4.7c0 5.3-3.5 8.6-9 9.8c-5.5-1.2-9-4.5-9-9.8V7.5L12 3z', 'M9 12l2 2l4-4'],
    screenshot: screenshotGallery.find((s) => s.id === 'datasource-config'),
  },
  {
    id: 'feature-grafana-title',
    title: 'Grafana dashboard import',
    description: 'Import existing Grafana JSON dashboards and start monitoring without rebuilding.',
    iconLabel: 'Grafana migration icon',
    paths: ['M4 6h9v12H4z', 'M11 9h9v12h-9z', 'M7 10h3M7 13h3M14 13h3M14 16h3'],
    screenshot: screenshotGallery.find((s) => s.id === 'query-editor'),
  },
  {
    id: 'feature-alerting-title',
    title: 'Alerting workflows',
    description: 'Create alert rules from datasource queries and investigate incidents in one place.',
    iconLabel: 'Alerting icon',
    paths: [
      'M12 4a5 5 0 0 1 5 5v3.5l1.6 2.7c.2.3 0 .8-.4.8H5.8c-.4 0-.6-.5-.4-.8L7 12.5V9a5 5 0 0 1 5-5z',
      'M10 18a2 2 0 0 0 4 0',
    ],
    screenshot: screenshotGallery.find((s) => s.id === 'alerts'),
  },
  {
    id: 'feature-sso-title',
    title: 'SSO and access control',
    description: 'Configure Google or Microsoft SSO, manage members, and apply role-based permissions.',
    iconLabel: 'SSO icon',
    paths: ['M7 11a4 4 0 1 1 0-8a4 4 0 0 1 0 8zM17 21a4 4 0 1 0 0-8a4 4 0 0 0 0 8z', 'M10.5 8.5l3 3M13.5 15.5l3-3'],
    screenshot: screenshotGallery.find((s) => s.id === 'organization-settings'),
  },
  {
    id: 'feature-themes-title',
    title: 'Light and dark themes',
    description: 'Choose themes that keep dashboards readable during day shifts and on-call sessions.',
    iconLabel: 'Themes icon',
    paths: ['M12 3a9 9 0 1 0 9 9a7 7 0 0 1-9-9z'],
    screenshot: screenshotGallery.find((s) => s.id === 'dark-theme'),
  },
];
---

<section id="features" class="section-band light-section" aria-labelledby="features-title">
  <div class="section-inner">
    <h2 id="features-title" class="m-0 text-2xl font-semibold md:text-3xl">Core features for observability teams</h2>
    <p class="mt-4 max-w-3xl text-slate-600">
      Dashboards, querying, alerting, and access control in one open-source product — no paid-only features.
    </p>

    <ul class="mt-8 grid list-none gap-4 p-0 md:grid-cols-2 xl:grid-cols-3" aria-label="Ace platform feature list">
      {
        featureCards.map((feature) => (
          <li class="m-0">
            <article aria-labelledby={feature.id} class="grid h-full gap-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
              {feature.screenshot && (
                <picture class="border-b border-slate-200">
                  <source srcset={feature.screenshot.webp} type="image/webp" />
                  <img
                    class="block h-auto w-full"
                    src={feature.screenshot.jpg}
                    alt={feature.screenshot.alt}
                    width="1280"
                    height="720"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              )}
              <div class="grid gap-2 p-4">
                <div class="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" role="img" aria-label={feature.iconLabel} class="h-5 w-5 stroke-emerald-600" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                    {feature.paths.map((path) => <path d={path}></path>)}
                  </svg>
                  <h3 id={feature.id} class="m-0 text-sm font-semibold leading-6">{feature.title}</h3>
                </div>
                <p class="m-0 text-sm text-slate-500">{feature.description}</p>
              </div>
            </article>
          </li>
        ))
      }
    </ul>
  </div>
</section>
```

Key changes:
- Background: `bg-[#020617]` → `light-section` (white/slate-50)
- Cards: `border-slate-700/50 bg-[#0a1628]` → `border-slate-200 bg-white` (dashboard panels)
- Icons: `stroke-amber-400` → `stroke-emerald-600`
- Text: adapted for light background
- Each feature card now includes a matched screenshot from the gallery
- Screenshots appear at top of card with `border-b border-slate-200` separator
- Feature titles shortened for tighter cards

**Step 2: Delete ScreenshotsSection.astro**

```bash
rm src/components/landing/ScreenshotsSection.astro
```

**Step 3: Remove ScreenshotsSection import from index.astro**

Remove the import line and the `<ScreenshotsSection />` component usage from `src/pages/index.astro` (if not already done in Task 2).

**Step 4: Verify build**

Run: `cd /home/janhoon/projects/dash-website && npx astro build`

**Step 5: Commit**

```bash
git add -u && git add src/components/landing/FeaturesSection.astro
git commit -m "feat: merge screenshots into features — dashboard-panel cards on light bg"
```

---

### Task 7: Update ComparisonSection.astro — light background, proper data table

**Files:**
- Modify: `src/components/landing/ComparisonSection.astro`

**Step 1: Rewrite ComparisonSection.astro**

Replace the entire content with:

```astro
<section id="comparison" class="section-band light-section" aria-labelledby="comparison-title">
  <div class="section-inner">
    <h2 id="comparison-title" class="m-0 text-2xl font-semibold md:text-3xl">Ace vs Grafana</h2>
    <p class="mt-4 max-w-3xl text-slate-600">
      Compare Ace and Grafana for self-hosted teams evaluating open-source monitoring tools.
    </p>

    <div class="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table class="min-w-[760px] w-full border-collapse text-left text-sm">
        <caption class="px-4 pt-4 pb-2 text-left text-xs text-slate-400">
          Feature comparison across dashboards, access control, and migration.
        </caption>
        <thead>
          <tr class="bg-slate-900 font-mono text-xs uppercase tracking-[0.07em] text-slate-300">
            <th scope="col" class="px-4 py-3">Feature</th>
            <th scope="col" class="px-4 py-3">Ace</th>
            <th scope="col" class="px-4 py-3">Grafana</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-slate-100 align-top bg-emerald-50">
            <th scope="row" class="w-[28%] px-4 py-3 font-semibold text-slate-900">Deployment model</th>
            <td class="px-4 py-3 text-slate-700">Self-hosted first with straightforward local setup</td>
            <td class="px-4 py-3 text-slate-500">Cloud and self-hosted options with a wider set of products and plans</td>
          </tr>
          <tr class="border-b border-slate-100 align-top bg-emerald-50">
            <th scope="row" class="px-4 py-3 font-semibold text-slate-900">Source model</th>
            <td class="px-4 py-3 text-slate-700">Truly open-source codebase with no paid-only features</td>
            <td class="px-4 py-3 text-slate-500">Open-source core with enterprise and cloud offerings</td>
          </tr>
          <tr class="border-b border-slate-100 align-top">
            <th scope="row" class="px-4 py-3 font-semibold text-slate-900">Prometheus metrics</th>
            <td class="px-4 py-3 text-slate-500">Native support for Prometheus-compatible metrics queries</td>
            <td class="px-4 py-3 text-slate-500">Native support for Prometheus-compatible metrics queries</td>
          </tr>
          <tr class="border-b border-slate-100 align-top">
            <th scope="row" class="px-4 py-3 font-semibold text-slate-900">Loki logs</th>
            <td class="px-4 py-3 text-slate-500">Integrated Explore flow for logs and related telemetry</td>
            <td class="px-4 py-3 text-slate-500">Integrated Explore flow for logs and related telemetry</td>
          </tr>
          <tr class="border-b border-slate-100 align-top">
            <th scope="row" class="px-4 py-3 font-semibold text-slate-900">Tempo traces</th>
            <td class="px-4 py-3 text-slate-500">Trace search and timeline views in the same interface</td>
            <td class="px-4 py-3 text-slate-500">Trace support through Tempo integrations and trace views</td>
          </tr>
          <tr class="border-b border-slate-100 align-top bg-emerald-50">
            <th scope="row" class="px-4 py-3 font-semibold text-slate-900">Dashboard migration</th>
            <td class="px-4 py-3 text-slate-700">Built-in Grafana conversion flow and YAML import path</td>
            <td class="px-4 py-3 text-slate-500">Native format for existing Grafana JSON dashboards</td>
          </tr>
          <tr class="border-b border-slate-100 align-top bg-emerald-50">
            <th scope="row" class="px-4 py-3 font-semibold text-slate-900">Configuration as code</th>
            <td class="px-4 py-3 text-slate-700">YAML export and import for easy review and repeatable setup</td>
            <td class="px-4 py-3 text-slate-500">JSON export commonly used for dashboard portability</td>
          </tr>
          <tr class="border-b border-slate-100 align-top bg-emerald-50">
            <th scope="row" class="px-4 py-3 font-semibold text-slate-900">Organization access control</th>
            <td class="px-4 py-3 text-slate-700">Admin, editor, and viewer roles are simple to apply</td>
            <td class="px-4 py-3 text-slate-500">Role behavior varies by deployment and edition</td>
          </tr>
          <tr class="border-b border-slate-100 align-top bg-emerald-50">
            <th scope="row" class="px-4 py-3 font-semibold text-slate-900">SSO administration</th>
            <td class="px-4 py-3 text-slate-700">Provider setup available in organization settings</td>
            <td class="px-4 py-3 text-slate-500">Provider setup depends on deployment mode and edition features</td>
          </tr>
          <tr class="align-top bg-emerald-50">
            <th scope="row" class="px-4 py-3 font-semibold text-slate-900">Operational scope</th>
            <td class="px-4 py-3 text-slate-700">Focused product centered on monitoring and incident debugging</td>
            <td class="px-4 py-3 text-slate-500">Broad ecosystem with many plugins and product extensions</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="mt-4 max-w-4xl text-sm text-slate-500">
      Ace is a strong fit for teams that want truly open-source, self-hosted monitoring with metrics, logs,
      traces, and access control in one product. Grafana remains a mature option with a larger plugin ecosystem.
    </p>
  </div>
</section>
```

Key changes:
- Section: `bg-[#020617]` → `light-section`
- Table container: `border-slate-700/50 bg-[#0a1628]` → `border-slate-200 bg-white`
- Header row: `border-b border-slate-700/70 text-slate-400` → `bg-slate-900 text-slate-300` (dark header row)
- Body borders: `border-slate-700/50` → `border-slate-100`
- Ace advantages: `bg-amber-500/10` → `bg-emerald-50`
- Text colors adapted for light background

**Step 2: Verify build**

Run: `cd /home/janhoon/projects/dash-website && npx astro build`

**Step 3: Commit**

```bash
git add src/components/landing/ComparisonSection.astro
git commit -m "style: redesign comparison table — light bg, emerald highlights, dark header row"
```

---

### Task 8: Update TestimonialsSection.astro — light background, emerald accent line

**Files:**
- Modify: `src/components/landing/TestimonialsSection.astro`

**Step 1: Rewrite TestimonialsSection.astro**

Replace the entire content with:

```astro
---
const testimonials = [
  {
    quote:
      'We migrated from Grafana Cloud in a weekend. Having metrics, logs, and traces in one self-hosted tool cut our debugging time in half.',
    name: 'Marta Kowalski',
    role: 'SRE Lead, Kubert Systems',
  },
  {
    quote:
      'The Grafana dashboard import actually worked. Dropped in our JSON files and everything rendered correctly — no manual re-creation.',
    name: 'Daniel Osei',
    role: 'Platform Engineer, Meridian Health',
  },
  {
    quote:
      'No feature gates. No surprise invoices. Our team has full access to alerting, SSO, and RBAC without negotiating an enterprise contract.',
    name: 'Yuki Tanaka',
    role: 'DevOps Manager, Flyweight Labs',
  },
];
---

<section id="testimonials" class="section-band light-section" aria-labelledby="testimonials-title">
  <div class="section-inner">
    <h2 id="testimonials-title" class="m-0 text-2xl font-semibold md:text-3xl">What engineers are saying</h2>
    <p class="mt-4 max-w-3xl text-slate-600">Teams running Ace in production share their experience.</p>

    <ul class="mt-8 grid list-none gap-6 p-0 md:grid-cols-3" aria-label="User testimonials">
      {
        testimonials.map((t) => (
          <li class="m-0">
            <blockquote class="grid h-full gap-4 rounded-xl border border-slate-200 border-l-emerald-600 border-l-2 bg-white p-6">
              <p class="m-0 text-sm leading-relaxed text-slate-600">&ldquo;{t.quote}&rdquo;</p>
              <footer class="mt-auto">
                <cite class="not-italic">
                  <span class="block text-sm font-semibold text-slate-900">{t.name}</span>
                  <span class="block text-xs text-slate-400">{t.role}</span>
                </cite>
              </footer>
            </blockquote>
          </li>
        ))
      }
    </ul>
  </div>
</section>
```

Key changes:
- Section: `bg-[#0a1628]` → `light-section`
- Cards: `border-slate-700/50 bg-[#0f1d32]` → `border-slate-200 bg-white` with `border-l-emerald-600 border-l-2` (left accent line)
- Quote text: `italic text-slate-300` → non-italic `text-slate-600`
- Name: `text-slate-100` → `text-slate-900`
- Role: stays `text-slate-400`

**Step 2: Verify build**

Run: `cd /home/janhoon/projects/dash-website && npx astro build`

**Step 3: Commit**

```bash
git add src/components/landing/TestimonialsSection.astro
git commit -m "style: redesign testimonials — light bg, emerald left accent, white cards"
```

---

### Task 9: Update TiersSection.astro — light background, emerald accent

**Files:**
- Modify: `src/components/landing/TiersSection.astro`

**Step 1: Rewrite TiersSection.astro**

Replace the entire content with:

```astro
---
const openSourceFeatures = [
  'All dashboard and query features',
  'Prometheus, Loki, Tempo, VictoriaMetrics',
  'Grafana dashboard import',
  'Alerting with datasource queries',
  'Light and dark themes',
  'YAML configuration as code',
  'Self-hosted in your environment',
  'Free forever — MIT licence',
];

const proFeatures = [
  'Everything in Open Source',
  'Priority support channels',
  'SSO with Google & Microsoft',
  'Team and member management',
  'Role-based access control',
  'Organisation-level settings',
  'SLA guarantees',
  'Dedicated onboarding',
];
---

<section id="tiers" class="section-band light-section" aria-labelledby="tiers-title">
  <div class="section-inner">
    <h2 id="tiers-title" class="m-0 text-center text-2xl font-semibold md:text-3xl">Everything you need. No paid tiers.</h2>
    <p class="mx-auto mt-4 max-w-2xl text-center text-slate-600">
      Both options give you the full product. Choose the deployment model that fits your team.
    </p>

    <div class="mt-10 grid gap-6 md:grid-cols-2">
      <div class="rounded-xl border border-slate-200 bg-white p-8">
        <h3 class="m-0 text-lg font-semibold">Open Source</h3>
        <p class="mt-2 text-sm text-slate-500">Full-featured. Self-hosted. MIT licence.</p>
        <ul class="mt-6 grid list-none gap-3 p-0">
          {
            openSourceFeatures.map((f) => (
              <li class="flex items-start gap-2 text-sm text-slate-600">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                {f}
              </li>
            ))
          }
        </ul>
      </div>

      <div class="rounded-xl border-2 border-emerald-600 bg-white p-8">
        <div class="flex items-center gap-2">
          <h3 class="m-0 text-lg font-semibold">Self-Hosted Pro</h3>
          <span class="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">Recommended</span>
        </div>
        <p class="mt-2 text-sm text-slate-500">Everything in Open Source, plus team features.</p>
        <ul class="mt-6 grid list-none gap-3 p-0">
          {
            proFeatures.map((f) => (
              <li class="flex items-start gap-2 text-sm text-slate-600">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                {f}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  </div>
</section>
```

Key changes:
- Section: `bg-[#020617]` → `light-section`
- Cards: `border-slate-700/50 bg-[#0a1628]` → `border-slate-200 bg-white`
- Pro card: `border-amber-500/30` → `border-2 border-emerald-600`, added `Recommended` badge in emerald
- Pro title: `text-amber-400` → regular heading color (handled by `.light-section`)
- Checkmarks: `text-amber-400` → `text-emerald-600`
- Text colors adapted for light background

**Step 2: Verify build**

Run: `cd /home/janhoon/projects/dash-website && npx astro build`

**Step 3: Commit**

```bash
git add src/components/landing/TiersSection.astro
git commit -m "style: redesign pricing tiers — light bg, emerald accents, recommended badge"
```

---

### Task 10: Update CtaSection.astro — dark background, emerald buttons

**Files:**
- Modify: `src/components/landing/CtaSection.astro`

**Step 1: Rewrite CtaSection.astro**

Replace the entire content with:

```astro
<section id="cta" class="section-band dark-section" aria-labelledby="cta-title">
  <div class="section-inner">
    <h2 id="cta-title" class="m-0 text-2xl font-semibold md:text-3xl">Run Ace in your own environment</h2>
    <p class="mt-4 max-w-3xl text-slate-400">
      Start with a truly open-source dashboard for metrics, logs, and traces — no paid tiers or
      license-gated features.
    </p>

    <div class="mt-6 flex flex-wrap gap-3">
      <a class="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white no-underline transition hover:bg-emerald-700" href="https://github.com/janhoon/ace" target="_blank" rel="noreferrer">Get Started Free</a>
      <a class="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-100 no-underline transition hover:border-slate-400 hover:text-white" href="https://github.com/janhoon/ace" target="_blank" rel="noreferrer">View on GitHub</a>
    </div>

    <div class="mt-5 flex flex-wrap gap-2" aria-label="GitHub stats badges">
      <a class="inline-flex" href="https://github.com/janhoon/ace/stargazers" target="_blank" rel="noreferrer" aria-label="Ace GitHub stars">
        <img
          src="https://img.shields.io/github/stars/janhoon/ace?style=flat-square&label=GitHub%20Stars"
          alt="GitHub stars badge"
          loading="lazy"
          decoding="async"
        />
      </a>
      <a class="inline-flex" href="https://github.com/janhoon/ace/network/members" target="_blank" rel="noreferrer" aria-label="Ace GitHub forks">
        <img
          src="https://img.shields.io/github/forks/janhoon/ace?style=flat-square&label=GitHub%20Forks"
          alt="GitHub forks badge"
          loading="lazy"
          decoding="async"
        />
      </a>
      <a class="inline-flex" href="https://github.com/janhoon/ace/commits/main" target="_blank" rel="noreferrer" aria-label="Ace latest commit activity">
        <img
          src="https://img.shields.io/github/last-commit/janhoon/ace?style=flat-square&label=Last%20Commit"
          alt="GitHub last commit badge"
          loading="lazy"
          decoding="async"
        />
      </a>
    </div>
  </div>
</section>
```

Key changes:
- Section: `bg-[#0a1628]` → `dark-section`
- Primary CTA: `bg-amber-500 shadow-lg shadow-amber-500/20 hover:bg-amber-400` → `bg-emerald-600 hover:bg-emerald-700` (no shadow)
- Secondary CTA: `border-slate-600/80 hover:border-amber-400/70 hover:text-amber-300` → `border-slate-600 hover:border-slate-400 hover:text-white`
- Body text: `text-slate-300` → `text-slate-400`

**Step 2: Verify build**

Run: `cd /home/janhoon/projects/dash-website && npx astro build`

**Step 3: Commit**

```bash
git add src/components/landing/CtaSection.astro
git commit -m "style: redesign CTA section — emerald buttons, no glow shadows"
```

---

### Task 11: Update FooterSection.astro — clean dark footer

**Files:**
- Modify: `src/components/landing/FooterSection.astro`

**Step 1: Rewrite FooterSection.astro**

Replace the entire content with:

```astro
<footer class="section-band dark-section py-12" aria-label="Footer navigation">
  <div class="section-inner">
    <h2 class="sr-only">Footer links</h2>
    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <section aria-labelledby="footer-product-title">
        <h3 id="footer-product-title" class="m-0 font-mono text-xs uppercase tracking-[0.12em] text-slate-500">Product</h3>
        <ul class="mt-3 grid list-none gap-2 p-0 text-sm">
          <li><a class="text-slate-400 transition hover:text-white" href="#features">Features</a></li>
          <li><a class="text-slate-400 transition hover:text-white" href="#comparison">Ace vs Grafana</a></li>
          <li><a class="text-slate-400 transition hover:text-white" href="#tiers">Pricing</a></li>
        </ul>
      </section>

      <section aria-labelledby="footer-resources-title">
        <h3 id="footer-resources-title" class="m-0 font-mono text-xs uppercase tracking-[0.12em] text-slate-500">Resources</h3>
        <ul class="mt-3 grid list-none gap-2 p-0 text-sm">
          <li><a class="text-slate-400 transition hover:text-white" href="https://github.com/janhoon/ace#readme" target="_blank" rel="noreferrer">Documentation</a></li>
          <li><a class="text-slate-400 transition hover:text-white" href="https://github.com/janhoon/ace/releases" target="_blank" rel="noreferrer">Releases</a></li>
          <li><a class="text-slate-400 transition hover:text-white" href="https://github.com/janhoon/ace/issues" target="_blank" rel="noreferrer">Issue tracker</a></li>
          <li><a class="text-slate-400 transition hover:text-white" href="https://github.com/janhoon/ace/discussions" target="_blank" rel="noreferrer">Discussions</a></li>
        </ul>
      </section>

      <section aria-labelledby="footer-community-title">
        <h3 id="footer-community-title" class="m-0 font-mono text-xs uppercase tracking-[0.12em] text-slate-500">Community</h3>
        <ul class="mt-3 grid list-none gap-2 p-0 text-sm">
          <li><a class="text-slate-400 transition hover:text-white" href="https://github.com/janhoon/ace" target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a class="text-slate-400 transition hover:text-white" href="https://github.com/janhoon?tab=followers" target="_blank" rel="noreferrer">Follow maintainer</a></li>
          <li><a class="text-slate-400 transition hover:text-white" href="https://github.com/janhoon/ace/stargazers" target="_blank" rel="noreferrer">Star the project</a></li>
          <li><a class="text-slate-400 transition hover:text-white" href="https://github.com/janhoon/ace/fork" target="_blank" rel="noreferrer">Contribute a fork</a></li>
        </ul>
      </section>

      <section aria-labelledby="footer-legal-title">
        <h3 id="footer-legal-title" class="m-0 font-mono text-xs uppercase tracking-[0.12em] text-slate-500">Legal</h3>
        <ul class="mt-3 grid list-none gap-2 p-0 text-sm">
          <li><a class="text-slate-400 transition hover:text-white" href="https://github.com/janhoon/ace/security" target="_blank" rel="noreferrer">Security policy</a></li>
          <li><a class="text-slate-400 transition hover:text-white" href="https://github.com/janhoon/ace/blob/main/SECURITY.md" target="_blank" rel="noreferrer">Security disclosure</a></li>
          <li><a class="text-slate-400 transition hover:text-white" href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noreferrer">Privacy notice</a></li>
          <li><a class="text-slate-400 transition hover:text-white" href="https://docs.github.com/en/site-policy/github-terms/github-terms-of-service" target="_blank" rel="noreferrer">Terms of service</a></li>
        </ul>
      </section>
    </div>
    <p class="mt-6 border-t border-slate-800 pt-4 text-sm text-slate-500">Ace is truly open source and free to use.</p>
  </div>
</footer>
```

Key changes:
- Footer: `bg-[#020617]` → `dark-section`
- Section labels: `text-slate-400` → `text-slate-500` (more muted)
- Links: `text-slate-300 hover:text-amber-300` → `text-slate-400 hover:text-white`
- Bottom border: `border-slate-700/70` → `border-slate-800`
- Footer text: `text-slate-400` → `text-slate-500`
- Removed Overview and Screenshots links (sections no longer exist)
- Added Pricing link

**Step 2: Verify build**

Run: `cd /home/janhoon/projects/dash-website && npx astro build`

**Step 3: Commit**

```bash
git add src/components/landing/FooterSection.astro
git commit -m "style: redesign footer — clean dark section, updated nav links"
```

---

### Task 12: Update landing.ts structured data — fix navigation references

**Files:**
- Modify: `src/data/landing.ts`

**Step 1: Update siteNavigationStructuredData**

In `src/data/landing.ts`, find the `siteNavigationStructuredData` object (near line 271) and update the `name` and `url` arrays to reflect the new page structure:

Replace:
```typescript
const siteNavigationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'SiteNavigationElement',
  name: ['Overview', 'Features', 'Comparison', 'Screenshots', 'Get Started'],
  url: ['/#overview', '/#features', '/#comparison', '/#screenshots', '/login'],
};
```

With:
```typescript
const siteNavigationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'SiteNavigationElement',
  name: ['Features', 'Comparison', 'Pricing', 'Get Started'],
  url: ['/#features', '/#comparison', '/#tiers', '/login'],
};
```

**Step 2: Verify build**

Run: `cd /home/janhoon/projects/dash-website && npx astro build`

**Step 3: Commit**

```bash
git add src/data/landing.ts
git commit -m "fix: update structured data navigation to match new page structure"
```

---

### Task 13: Final build verification and visual check

**Step 1: Full build**

Run: `cd /home/janhoon/projects/dash-website && npx astro build`
Expected: Clean build, no warnings

**Step 2: Dev server check**

Run: `cd /home/janhoon/projects/dash-website && npx astro dev`
Expected: Site loads at localhost, visual check for:
- Dark header with emerald logo/CTA
- Dark hero with emerald accent text, no gradient orbs
- Stats bar with monospace values and sparklines
- Light features section with white dashboard-panel cards containing screenshots
- Light comparison table with dark header row and emerald highlights
- Light testimonials with emerald left accent line
- Light pricing with emerald-bordered Pro card
- Dark CTA with emerald buttons
- Dark footer with clean links

**Step 3: Commit (if any cleanup needed)**

```bash
git add -A
git commit -m "style: operations dashboard redesign complete"
```
