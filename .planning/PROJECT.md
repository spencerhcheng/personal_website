# Spencer Cheng — Personal Website

## What This Is

A personal website for Spencer Cheng, a software engineer, that serves as a professional signal for recruiters, clients, and collaborators. The site showcases engineering projects with outcomes, a gallery of visual art (illustrations, paintings, digital art), and brief hobby mentions — all wrapped in a clean, professional, modern design.

## Core Value

A visitor — whether recruiter or collaborator — can quickly understand Spencer's technical depth, see his creative personality, and know how to reach him.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Project portfolio section: featured engineering projects with descriptions and outcomes
- [ ] Visual art gallery: curated collection of illustrations, paintings, and digital art
- [ ] Brief hobbies section: humanizing detail without a full dedicated section
- [ ] About/bio section: professional summary and personality
- [ ] Contact links: GitHub, LinkedIn, email address (no contact form)
- [ ] Clean, professional, modern design with good typography and whitespace
- [ ] Responsive layout that works on mobile and desktop

### Out of Scope

- Contact form — links to external profiles are sufficient; form adds complexity with no clear benefit
- Blog/writing section — not a stated goal; deferred to future if content emerges
- CMS or admin panel — content will be managed via code; no dynamic data entry needed
- Authentication — public-facing portfolio site, no login required

## Context

- Spencer is a software engineer building his own portfolio site
- Art is visual: illustrations, paintings, digital art, and photography
- Hobbies are supporting context ("humanizing detail"), not a primary section
- Tech choice: Next.js + React — modern, familiar to a software engineer, easy to deploy on Vercel/Netlify
- Design direction: clean, professional, modern — let content be the focus, not decoration

## Constraints

- **Tech stack**: Next.js + React — selected by user; all implementation should follow Next.js conventions
- **Hosting**: Expected deployment to Vercel or Netlify — static export or SSR both viable
- **Content**: Managed in code (no CMS); images stored in public/ or served from CDN

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js + React | User's preference; modern stack well-suited to portfolio sites, easy Vercel deploy | — Pending |
| Links-only contact | Simpler, no backend needed, email/GitHub/LinkedIn cover all real-world contact paths | — Pending |
| No CMS | For a personal site, code-managed content is sufficient and reduces complexity | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-24 after initialization*
