# Project Research Summary

**Project:** Spencer Cheng Personal Website
**Domain:** Personal portfolio website for software engineer with visual art gallery
**Researched:** 2026-04-24
**Confidence:** HIGH

## Executive Summary

This is a personal portfolio website for a software engineer who is also a visual artist. The research shows this is a mature, well-documented domain with established patterns. The recommended approach is a single-origin, statically-exported Next.js site using App Router with TypeScript data files for content management.

The key recommendation is Next.js 16 with App Router, Tailwind CSS v4, and Vercel deployment. Content should live in TypeScript files (not MDX or CMS) for this scale. The architecture should be a long-scroll single page with anchor sections plus individual artwork detail routes.

The highest risk is the perfectionism loop — engineers building for engineers often never ship because they over-polish. The mitigation is setting a hard deploy deadline and treating "deployed with real content" as the only success metric for Phase 1.

## Key Findings

### Recommended Stack

The stack research shows high confidence in Next.js 16 as the foundation with specific version requirements and integration patterns. All versions were verified against official docs (version 16.2.4, updated 2026-04-21).

**Core technologies:**
- Next.js 16.x: Full framework — App Router gives static export + server components + image optimization + font optimization in one package
- Tailwind CSS 4.x: Utility-first styling — CSS-first config is simpler than v3, no PostCSS complexity
- next/font/google: Web fonts — downloads fonts at build time, zero layout shift, zero Google requests
- next/image: Image optimization — automatically converts to WebP, lazy-loads, prevents layout shift
- motion: Scroll-triggered animations — for fade-in-on-scroll gallery items, scope to client components only
- Vercel: Deployment — zero-config for Next.js, native App Router support, automatic image optimization

### Expected Features

Feature research identified clear table stakes vs. differentiators for engineering portfolios, with specific complexity assessments.

**Must have (table stakes):**
- About/bio section — visitors need human anchor
- Engineering project list — primary evaluation content for recruiters
- Contact links — GitHub, LinkedIn, email (no form needed per PROJECT.md)
- Responsive layout — 50% of visits are mobile
- Visual art gallery — stated requirement, makes engineer memorable
- Fast load time — Core Web Vitals: LCP < 2.5s, CLS < 0.1

**Should have (competitive):**
- Project outcomes quantified — "Reduced deploy time by 40%" signals engineering maturity
- Art gallery with lightbox/zoom — artwork deserves full-screen viewing
- Subtle motion/micro-interactions — elevates perceived quality
- Project cards with thumbnails — visual projects are scanned, not read

**Defer (v2+):**
- Dark mode toggle — scope risk, requires upfront CSS architecture decisions
- Art gallery filters by medium — only worth building with 20+ pieces
- Blog/writing section — not a stated goal, adds content maintenance burden

### Architecture Approach

The architecture research shows a clear single-page application pattern with TypeScript data files for content management. This avoids the complexity of MDX or CMS for the small scale (5 projects, <30 artworks).

**Major components:**
1. Single-page route (/) — hero, projects, art grid, hobbies, contact sections
2. Individual art routes (/art/[slug]) — lightbox fallback with canonical URLs
3. Server Components for all sections — only NavBar needs client-side interactivity
4. TypeScript data files — projects.ts, art.ts, site.ts for type-safe content management
5. Static export with unoptimized images — or Vercel deployment with full next/image optimization

### Critical Pitfalls

Research identified 6 critical pitfalls that cause rewrites or abandonment, plus 10 moderate/minor pitfalls.

1. **Perfectionism Loop** — site never ships due to endless polishing; prevent with hard deploy deadline
2. **Image Performance** — unoptimized gallery images kill LCP/CLS; use next/image with explicit dimensions
3. **Static Export Breaking Images** — next/image optimization doesn't work in static export; choose Vercel or custom loader
4. **Font Flash/Layout Shift** — external Google Fonts cause FOUT; use next/font/google for self-hosting
5. **Over-Engineered Data Structure** — MDX/CMS for 5 projects adds complexity; use TypeScript arrays
6. **No Real Content** — launching with placeholders defeats the purpose; block deploy on minimum content

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation & Core Content
**Rationale:** Must establish infrastructure decisions (deployment, fonts, images) before any content work to avoid the critical static export and font loading pitfalls
**Delivers:** Deployed site with real content — bio, 3+ projects with outcomes, basic art gallery
**Addresses:** All table stakes features from research — about section, project list, contact links, responsive layout
**Avoids:** Perfectionism loop (hard deploy deadline), image performance issues (next/image from start), content gaps (real content requirement)

### Phase 2: Visual Polish & Gallery Enhancement
**Rationale:** With foundation stable, add differentiators that make the site memorable
**Delivers:** Project thumbnails, art lightbox/zoom, artist statements, smooth scrolling
**Uses:** motion for subtle animations, tailwind-merge for component variants
**Implements:** Individual artwork routes with generateStaticParams, improved gallery UX
**Addresses:** Competitive features from research — quantified outcomes, visual project cards, art gallery optimization

### Phase 3: Optimization & Launch
**Rationale:** Performance and metadata optimization after content is stable
**Delivers:** Open Graph metadata, favicon, analytics, final mobile optimization
**Addresses:** Social sharing (LinkedIn/recruiter shares), Core Web Vitals optimization
**Avoids:** Animation overload (selective motion), accessibility gaps (alt text, contrast)

### Phase Ordering Rationale

- Phase 1 must come first to avoid all 6 critical pitfalls — particularly deployment config, image pipeline, and content gaps
- Phase 2 can only happen after Phase 1 because differentiator features (lightbox, thumbnails) depend on the basic gallery existing
- Phase 3 is polish-only work that should happen after content is stable to avoid premature optimization

### Research Flags

Phases with standard patterns (skip research-phase):
- **Phase 1:** Well-documented Next.js patterns, official docs coverage is comprehensive
- **Phase 2:** Established gallery/lightbox patterns, motion library is mature
- **Phase 3:** Standard web optimization practices, Vercel deployment is well-documented

No phases require additional research — this is a solved domain with mature tooling.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified against Next.js 16.2.4 official docs (2026-04-21) |
| Features | HIGH | Table stakes/anti-features from domain expertise, well-established patterns |
| Architecture | HIGH | Sourced from official Next.js App Router docs and established patterns |
| Pitfalls | HIGH | Critical pitfalls verified against official docs, moderate pitfalls from domain experience |

**Overall confidence:** HIGH

### Gaps to Address

No significant research gaps identified. All technical decisions have clear documentation and established patterns.

- Performance validation: Lighthouse testing should be done in Phase 3 to validate LCP/CLS assumptions with real content
- Content volume: Art gallery filtering decision (Phase 2 vs. defer) depends on final artwork count

## Sources

### Primary (HIGH confidence)
- Next.js 16 Installation docs: https://nextjs.org/docs/app/getting-started/installation (version 16.2.4, updated 2026-04-21)
- Next.js CSS/Tailwind guide: https://nextjs.org/docs/app/getting-started/css (version 16.2.4, updated 2026-04-21)
- Next.js Font Module docs: https://nextjs.org/docs/app/api-reference/components/font (version 16.2.4, updated 2026-04-21)
- Next.js Image Optimization docs: https://nextjs.org/docs/app/getting-started/images (version 16.2.4, updated 2026-04-21)
- Next.js Static Exports guide: https://nextjs.org/docs/app/guides/static-exports (version 16.2.4, updated 2026-04-21)

### Secondary (MEDIUM confidence)
- npm package versions verified: next@16.2.4, react@19.2.5, tailwindcss@4.2.4, motion@12.38.0 (npm registry, 2026-04-24)
- Domain expertise: personal portfolio site patterns observed across engineering portfolios 2020-2025
- WCAG AA contrast ratio 4.5:1: W3C WCAG 2.1 specification

### Tertiary (LOW confidence)
- Anti-feature recommendations: composite of engineering hiring/portfolio community feedback (no live sources verified)
- Dark mode retrofitting complexity: widely documented in CSS architecture discussions but implementation specifics may vary

---
*Research completed: 2026-04-24*
*Ready for roadmap: yes*