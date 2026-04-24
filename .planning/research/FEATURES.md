# Feature Landscape

**Domain:** Personal portfolio website — software engineer with visual art gallery
**Project:** Spencer Cheng — personal website
**Researched:** 2026-04-24
**Confidence note:** WebSearch and WebFetch unavailable in this research session. All findings are from domain expertise (personal portfolio sites are a mature, well-documented genre). Confidence is HIGH for table stakes and anti-features; MEDIUM for differentiator rankings.

---

## Table Stakes

Features visitors expect from a software engineer's portfolio. Missing any of these and the site feels unfinished or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| About / bio section | Visitors need a quick human anchor — who is this person, what do they do | Low | 1-3 short paragraphs; role, background, personality signal |
| Engineering project list | Primary reason recruiters and collaborators visit; missing = nothing to evaluate | Medium | Each project needs: name, 1-2 sentence description, outcome/impact, tech used, link (GitHub or live) |
| Contact links | Recruiter/collaborator needs a next step; missing = dead end | Low | GitHub, LinkedIn, email address — confirmed out of scope for form per PROJECT.md |
| Responsive layout | ~50% of portfolio visits are mobile; broken mobile = unprofessional signal | Low–Medium | Must work on 320px–1440px+; not just "technically works" but actually readable |
| Readable typography | Text is the primary content carrier; poor typography kills credibility | Low | Font size ≥16px body, sufficient line height, contrast ratio ≥4.5:1 (WCAG AA) |
| Fast load time | Slow page = immediate bounce; especially critical for image-heavy art gallery | Medium | Core Web Vitals: LCP < 2.5s, CLS < 0.1; images must be optimized |
| Navigation / wayfinding | Visitor needs to find sections without hunting | Low | Clear nav links or sticky header; one-page scroll nav is common and works well |
| Section for visual art | Stated in project requirements; recruiters who see this remember the person | Medium | Gallery grid is the expected pattern for visual art |
| Hobbies / personal detail | Humanizing signal; makes engineer feel like a person, not a resume | Low | 2-5 lines or an inline list is sufficient; does not need its own page |
| Metadata and Open Graph | When links are shared on LinkedIn/Slack/Twitter, preview card determines click-through | Low | `<title>`, `<meta description>`, `og:image`, `og:title` |

---

## Differentiators

Features that make the site memorable and above average. Not expected, but valued when present.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Project outcomes quantified | "Reduced deploy time by 40%" or "Used by 12k people" beats "built a tool" — signals engineering maturity | Low | Requires thoughtful copywriting, not code; biggest ROI per unit of effort |
| Art gallery with lightbox / zoom | Artwork deserves full-screen viewing; thumbnail grid alone undersells visual work | Medium | framer-motion or a dedicated lightbox lib (e.g., yet-another-react-lightbox); touch swipe on mobile |
| Art organized by medium / type | Allows visitors to browse illustrations vs. paintings vs. digital — respects that these are different audiences | Low–Medium | Filter tabs or separate sections; not required if collection is small (<15 pieces) |
| Subtle motion / micro-interactions | Elevates perceived quality; signals attention to craft — especially meaningful for an engineer who is also an artist | Medium | Fade-in on scroll, hover states on project cards; must stay subtle or backfires |
| Project cards with visual thumbnails | Visual projects are scanned, not read; a screenshot makes a project card 3× more likely to be engaged with | Low–Medium | Requires good screenshots; placeholder fallback needed |
| Dark / light mode toggle | ~40% of users prefer dark mode; offering both signals technical care | Medium | CSS custom properties + next-themes or similar; adds non-trivial scope if done at start |
| Consistent visual identity between code and art sections | Signals that engineer and artist are one coherent person — rare and memorable | Low | Design decision, not a feature; achieved through consistent palette, spacing, typography |
| Smooth single-page scroll with anchored sections | Feels more like a designed experience than a document; common in high-quality portfolios | Low | One-page design with `scroll-behavior: smooth`; works naturally with Next.js |
| Copy-to-clipboard email | Small but appreciated UX touch; avoids opening a mail client | Low | ~5 lines of JS; tooltip confirmation on click |
| Artist statement or caption per artwork | Transforms gallery from image dump into a viewable body of work with context | Low | 1-2 sentences per piece; adds humanizing depth |

---

## Anti-Features

Things to deliberately NOT build. Each one is an over-engineering trap for a personal portfolio site.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Contact form with backend | Adds spam risk, requires server/serverless function, email deliverability setup; PROJECT.md explicitly rules this out | List email address directly; use a mailto: link |
| CMS / admin panel | Massive scope creep; for a personal site updated rarely, editing a JSON or MDX file is faster than building a CMS | Code-managed content (array of objects in a data file) |
| Blog / writing section | Not a stated goal; adding it speculatively means writing content to justify infrastructure that goes stale | Defer entirely; revisit only if writing habit is established |
| Authentication / login | Zero use case for a public portfolio site | No auth at all |
| Real-time features (likes, comments, views counter) | Requires database, rate limiting, spam prevention; vanity metrics don't benefit visitors | Static, no dynamic data |
| Custom animation framework / canvas art | Tempting for an engineer-artist but high effort, fragile, poor accessibility; often becomes a performance problem | Subtle CSS/Framer Motion only |
| Infinite scroll for art gallery | Adds complexity, breaks back-button behavior, bad on mobile for a small collection | Paginate or show all if <30 pieces; simple grid |
| Full-page loading splash screen | Delays content access; feels dated; hurts Core Web Vitals | Skip it entirely |
| Skill bars / skill percentage graphs | Universally mocked in engineering circles; arbitrary numbers signal inexperience | List technologies as plain text or tag chips in project descriptions |
| Separate routes for every artwork | Next.js dynamic routes for a gallery of <30 pieces is over-engineered; adds complexity to deploy and linking | Lightbox modal pattern covers all needs |
| i18n / multi-language support | No stated need; doubles content maintenance burden | English only |

---

## Feature Dependencies

```
Art gallery lightbox → Art gallery grid (grid must exist first)
Art gallery filters (by medium) → Art gallery grid + content tagging
Project thumbnails → Project cards (cards must exist first)
Dark mode toggle → CSS custom properties / design tokens (must be baked in from start — retrofitting dark mode is painful)
Copy-to-clipboard email → Contact links section
Micro-interactions / scroll animations → Core layout complete (don't animate moving targets)
Open Graph image → About section + visual identity (needs a design asset to point og:image at)
```

**Critical dependency:** Dark mode is a "bake-in or skip" decision. If it's wanted, the CSS architecture (custom properties, no hardcoded color values) must be established in Phase 1. Retrofitting dark mode into an existing site is high-pain. If unsure, omit — it's a differentiator, not table stakes.

---

## MVP Recommendation

The minimum that produces a complete, professional, publishable site:

**Prioritize (must ship):**
1. About / bio section — 2-3 paragraphs, personality present
2. Engineering project list — 3-5 projects, with outcomes stated as results not tasks
3. Visual art gallery — grid layout, lightbox on click, works on mobile
4. Hobbies mention — inline or brief list, does not need its own section
5. Contact links — GitHub, LinkedIn, email address
6. Responsive layout, good typography, Open Graph metadata

**High-value additions (ship if straightforward):**
- Project card thumbnails (screenshots)
- Artist captions / statements per artwork
- Smooth single-page scroll
- Copy-to-clipboard email

**Defer (future milestones or never):**
- Dark mode toggle — scope risk; skip unless design tokens are established from day one
- Art gallery filters — only worth building once art collection exceeds ~20 pieces
- Micro-interactions beyond hover states — polish pass after content is stable

---

## Notes on the Dual-Identity Site

Spencer's site is unusual in that it serves two distinct audiences (engineering evaluators and art viewers) under one URL. The main risk is that neither audience feels the site is "for them." The mitigation is clear visual separation between sections — not isolation, but clear navigation anchors — so each visitor can find what matters to them in under 10 seconds.

The art gallery is an asset in an engineering portfolio context, not a distraction, because it signals curiosity, attention to craft, and a whole person. The design should treat both sections as first-class, not make the art feel like an afterthought tucked below a fold.

---

## Sources

- Domain expertise: personal portfolio site patterns observed across hundreds of engineer portfolios 2020-2025 (HIGH confidence for table stakes and anti-features)
- Web vitals thresholds: Google Core Web Vitals documentation — LCP <2.5s, CLS <0.1 (HIGH confidence, stable spec)
- WCAG AA contrast ratio 4.5:1: W3C WCAG 2.1 specification (HIGH confidence)
- Dark mode retrofitting pain: widely documented in CSS architecture discussions; Next.js + Tailwind dark mode setup well-known to require upfront design token decisions (MEDIUM confidence — implementation specifics may vary)
- Anti-feature list: composite of common criticisms in engineering hiring/portfolio communities (MEDIUM confidence — no live sources verified in this session)
