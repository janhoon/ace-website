# Ace Website Redesign: "Operations Dashboard"

## Problem

The current site uses a glowy neon-ish dark theme (blurred gradient orbs, glassmorphic cards, glowing button shadows) that is overused across tech landing pages. It needs to look more professional, enterprise-credible, and distinctive.

## Design Direction

**Tone:** Data/enterprise - credibility-first, dashboard-like (think Datadog, PagerDuty)
**Theme:** Mixed - dark hero/stats/footer, light content sections
**Accent:** Emerald-600 (#059669) - muted, institutional, mature
**Texture:** Data-inspired (subtle chart-line patterns, decorative sparklines)
**Structure:** Consolidated - Overview merged into Hero, Screenshots merged into Features

## Color System

### Dark sections (Hero, Stats Bar, CTA, Footer)

| Role | Color | Tailwind |
|------|-------|----------|
| Background | #0f172a | slate-900 |
| Heading text | #f1f5f9 | slate-100 |
| Body text | #94a3b8 | slate-400 |
| Borders | #1e293b | slate-800 |

### Light sections (Features, Comparison, Testimonials, Pricing)

| Role | Color | Tailwind |
|------|-------|----------|
| Background | #f8fafc | slate-50 |
| Card background | #ffffff | white |
| Card border | #e2e8f0 | slate-200 |
| Heading text | #0f172a | slate-900 |
| Body text | #475569 | slate-600 |

### Accent (Emerald)

| Role | Color | Tailwind |
|------|-------|----------|
| Primary CTA | #059669 | emerald-600 |
| CTA hover | #047857 | emerald-700 |
| Badge/highlight bg | #ecfdf5 | emerald-50 |
| Check icons | #059669 | emerald-600 |
| CTA text on dark | #6ee7b7 | emerald-300 |

## What to Remove

- All blurred gradient orbs (the three fixed-position amber circles)
- `.site-sheen` grid overlay pattern
- Glowing button shadows (`shadow-amber-500/20`)
- Semi-transparent card borders (`border-slate-700/50`)
- Glassmorphic header (`bg-slate-900/80 backdrop-blur`)
- All amber color references

## What to Add

- Subtle SVG time-series chart pattern in dark section backgrounds (opacity 0.03-0.05)
- Small decorative sparkline SVGs next to stat values
- Thin accent line on testimonial card left edge
- Proper data-table styling for comparison section
- Clean monospace labels for technical content

## Typography

- **Keep:** Space Grotesk (headings/body), IBM Plex Mono (technical labels)
- **Change:** Tighten heading letter-spacing to -0.02em
- **Expand:** Use monospace more aggressively for stats, versions, metric labels

## Page Structure (Consolidated)

### 1. Header Nav (dark)
- Solid `slate-900` background, no glassmorphism
- Logo mark + "Ace" text
- Nav links: `slate-400`, hover to `white`
- Single emerald CTA button
- Bottom border: 1px `slate-800`

### 2. Hero (dark) - absorbs Overview
- Two columns: copy left, screenshot right
- Monospace label "Open-source observability" in `emerald-300`
- Large heading in white, body in `slate-300`
- Two buttons: emerald primary + outline secondary
- Screenshot: solid 1px `slate-700` border, no glow/shadow

### 3. Stats Bar (dark)
- 4-column horizontal strip
- Large monospace values in white
- Small labels in `slate-400`
- Vertical 1px `slate-700` dividers
- Decorative sparkline SVGs

### 4. Features + Screenshots (light) - merged
- `slate-50` background
- 2-3 column grid of cards
- Each card: white bg, 1px `slate-200` border, no shadow
- Top: screenshot thumbnail
- Bottom: icon + title + description
- Cards feel like dashboard widget panels

### 5. Comparison Table (light)
- Clean data table
- Header: `slate-900` bg, white text
- Body: alternating white/`slate-50` rows
- Ace advantages: `emerald-50` tint
- 1px borders throughout

### 6. Testimonials (light)
- 3 white cards in a row
- `slate-200` border
- Emerald accent line on left edge
- Quote in `slate-600`, attribution in `slate-900` bold

### 7. Pricing Tiers (light)
- Two cards side by side
- Open Source: white card, `slate-200` border
- Pro: `emerald-600` border, emerald badge

### 8. CTA (dark)
- Centered text, bold heading
- Single emerald button
- Minimal, no clutter

### 9. Footer (dark)
- 4-column link grid
- Monospace section labels
- `slate-400` links, hover to white

## Design Principles

1. **No glows, no gradients, no blur** - flat, solid colors only
2. **Borders are 1px solid** - no opacity tricks
3. **Cards are white panels** - like dashboard widgets
4. **Green is for actions and status** - not decoration
5. **Monospace signals technical** - use it for data, labels, metrics
6. **Whitespace is structure** - generous but purposeful
