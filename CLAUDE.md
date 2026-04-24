# Spencer Cheng — Personal Website

This is a Next.js personal portfolio website showcasing Spencer's engineering projects and visual art.

## Project Context

**Core Value**: A visitor can quickly understand Spencer's technical depth, see his creative personality, and know how to reach him.

**Tech Stack**: Next.js 16 + TypeScript + Tailwind CSS v4 + Vercel deployment

**Key Sections**:
- Engineering project portfolio with outcomes
- Visual art gallery (illustrations, paintings, digital art) 
- Professional bio and contact links
- Dark/light mode support

## Current Phase

See `.planning/STATE.md` for current status and active phase.

## Constraints & Decisions

- **Hosting**: Vercel (free tier) — enables Next.js Image optimization
- **Content Management**: TypeScript data files in `data/` — no CMS needed
- **Images**: Use `next/image` for all artwork — automatic optimization
- **No contact form** — GitHub/LinkedIn/email links only
- **Responsive-first** — mobile experience is critical

## Implementation Notes

- **Dark mode**: CSS custom properties required from Phase 1 — can't retrofit easily
- **Image strategy**: Store originals in `public/images/`, use `next/image` wrapper
- **Performance**: Core Web Vitals compliance mandatory (LCP < 2.5s, CLS < 0.1)
- **Real content required**: No Lorem ipsum — defeats the site's purpose

## Anti-Patterns to Avoid

Per research findings:
- ❌ Skill bars/percentage charts (mocked in engineering circles)
- ❌ Over-engineering data layer (simple TypeScript arrays sufficient)
- ❌ Contact forms (adds complexity, no benefit)
- ❌ Perfectionism loops (ship early, iterate)

## Files & Planning

- `.planning/PROJECT.md` — Full project context
- `.planning/REQUIREMENTS.md` — 12 v1 requirements mapped to phases
- `.planning/ROADMAP.md` — 3 phases from foundation to polish
- `.planning/research/` — Stack, features, architecture, and pitfalls research

---

Ready for `/gsd-plan-phase 1` to start implementation.