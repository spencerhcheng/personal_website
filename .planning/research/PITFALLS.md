# Domain Pitfalls: Personal Portfolio Website (Next.js)

**Domain:** Personal portfolio site for a software engineer
**Researched:** 2026-04-24
**Stack context:** Next.js App Router, Vercel/Netlify deployment, art gallery + project showcase

---

## Critical Pitfalls

Mistakes that cause rewrites, permanent abandonment, or a site that never ships.

---

### Pitfall 1: Perfectionism Loop — The Site Never Ships

**What goes wrong:** The developer (who is also the audience-proxy) keeps redesigning, refactoring, or polishing before publishing. The project sits in an eternal "almost done" state. A recruiter who visits gets a 404 or nothing.

**Why it happens:** Engineers build for engineers. The bar feels higher than it is. Every design decision feels permanently visible. The site becomes a proof-of-craft project rather than a communication tool.

**Consequences:** Zero value delivered. A blank GitHub Pages URL is worse than a simple deployed site. Opportunity cost: every week unshipped is a week recruiters can't find you.

**Prevention:**
- Define "done" as "deployed and contains real content" — not "looks exactly right."
- Set a hard ship date at the start of Phase 1 (e.g., 2 weeks). Deploy an ugly version first; aesthetics are a second commit.
- Use the constraint: if a feature takes more than one hour to implement, defer it.

**Warning signs:**
- Spending more time on animations than on project descriptions.
- Switching CSS frameworks or design systems mid-build.
- Rewriting the layout component more than twice.

**Phase to address:** Phase 1 (foundation). Bake in a "deploy early" requirement. The first milestone should end with a live URL, not a polished local build.

---

### Pitfall 2: Art Gallery Images Kill Performance (LCP / CLS)

**What goes wrong:** The gallery section ships with unoptimized high-resolution images — raw JPEGs from a camera or illustration exports at full resolution. Page load time spikes to 10–20 seconds on mobile. Lighthouse scores tank. Recruiters on mobile bounce.

**Why it happens:** Engineers treat images as files to display, not as assets to optimize. The development machine has fast hardware and a local cache, so the problem is invisible until prod.

**Consequences:** Poor Core Web Vitals (LCP >4s, high CLS from missing dimensions), bad SEO, and a gallery that feels broken on slower connections.

**Prevention:**
- Use `next/image` (`<Image>` from `next/image`) for every image — it handles WebP conversion, responsive `srcset`, and lazy loading automatically.
- For locally stored images (in `public/` or imported statically), Next.js can auto-infer dimensions — use static imports to get this for free.
- Set explicit `width` and `height` (or use `fill` with a sized container) on every `<Image>` to prevent layout shift (CLS).
- For the art gallery specifically: pre-export images at a sane max resolution (2000px wide) before adding them to the repo. Do not commit raw camera files.
- Add `priority` prop to the first above-the-fold image (hero or first gallery image) to preload it and improve LCP.

**Warning signs:**
- Image files in `public/` larger than 1MB.
- Using `<img>` tags instead of `next/image`.
- No explicit `width`/`height` on `<Image>` components with remote sources.

**Phase to address:** Phase 1 (image pipeline setup). Establish the image convention before adding gallery content, not after.

---

### Pitfall 3: Static Export Breaks `next/image` Optimization

**What goes wrong:** Developer chooses `output: 'export'` (for Netlify or GitHub Pages deployment), then discovers that `next/image`'s built-in optimization server (`/_next/image`) doesn't exist in a static export. Images render but at full unoptimized size, silently defeating the entire image optimization strategy.

**Why it happens:** The Next.js docs clearly state this limitation, but it's easy to miss when scanning deployment guides. The app works locally (dev server has the optimizer); the static build silently degrades.

**Consequences:** All the `<Image>` component ergonomics are preserved but the optimization is gone. Performance identical to a plain `<img>` tag.

**Prevention:**
- If deploying to **Vercel**: do NOT use `output: 'export'`. Vercel natively runs the Next.js image optimization server. This is the recommended path.
- If deploying to **Netlify**: use the `@netlify/plugin-nextjs` adapter (not static export) — this enables SSR features including image optimization.
- If a true static export is required (e.g., GitHub Pages): configure a custom image loader pointing to a CDN like Cloudinary that handles optimization externally. Do not rely on the default loader.
- Decision: default to Vercel deployment with no `output: 'export'` to keep the full Next.js feature set.

**Warning signs:**
- `output: 'export'` in `next.config.js` without a custom image loader configured.
- Deploying to a static host (S3, GitHub Pages) without addressing the image loader.

**Phase to address:** Phase 1 (infrastructure decision). Lock in the deployment target before writing a single `<Image>` component.

---

### Pitfall 4: Font Flash / Layout Shift from Incorrect Font Loading

**What goes wrong:** Fonts are loaded via a `<link>` tag to Google Fonts in the `<head>`, or via CSS `@import`. The browser fetches fonts from an external server on every page load, causing a flash of unstyled text (FOUT) or layout shift (CLS) while the font loads.

**Why it happens:** Copying the standard Google Fonts embed snippet is the path of least resistance. It works visually but is slow and leaks requests to Google.

**Consequences:** Visible text flash on initial load, CLS penalty in Core Web Vitals, and an external dependency that can fail or slow down.

**Prevention:**
- Use `next/font/google` — it downloads and self-hosts the font at build time. Zero runtime requests to Google. Automatic CLS prevention via `adjustFontFallback`.
- Define fonts once in a `fonts.ts` file (e.g., `app/fonts.ts`) and import from there everywhere. Do not call the font constructor in multiple files.
- Apply font to the `<html>` element in `app/layout.tsx` via `className` — not on `<body>` or individual components.
- Use variable fonts when available (e.g., `Inter` instead of `Inter_400`) to avoid loading multiple weight files.
- Do NOT manually add `<link rel="preconnect" href="https://fonts.googleapis.com">` — this is incompatible with `next/font` and counterproductive.

**Warning signs:**
- `@import url('https://fonts.googleapis.com/...')` in any CSS file.
- `<link>` to Google Fonts in a custom `<head>` component.
- Multiple files calling `Inter({ ... })` instead of sharing one instance.

**Phase to address:** Phase 1 (typography setup). Establish font loading pattern before any styling work.

---

### Pitfall 5: Over-Engineering the Project Data Structure

**What goes wrong:** Engineer builds a sophisticated project data layer — TypeScript interfaces, a content schema, a JSON/MDX file per project, a data-fetching abstraction — before writing a single rendered component. The abstraction is wrong, gets rewritten, and delays shipping by weeks.

**Why it happens:** This is a software engineer's site; they apply software engineering instincts. "I should make this maintainable" is true but the wrong priority for a 4–6 project portfolio.

**Consequences:** Complexity without benefit. A portfolio with 5 projects doesn't need a CMS or a content pipeline. It needs a typed array in a file.

**Prevention:**
- Start with the simplest possible data structure: a TypeScript array of `Project` objects in `lib/projects.ts`.
- Co-locate content with code; do not reach for MDX or a CMS unless there are 20+ projects or actual prose-heavy content.
- The data model should be defined by what the UI needs to render, not by what "feels right" architecturally.
- Add abstraction only when it solves a concrete, present problem.

**Warning signs:**
- Creating a `/content` directory with per-project MDX files before building the project card component.
- Writing a content schema/validator before shipping the first rendered page.
- Spending time on a "dynamic" project slug route when the site has 5 static projects.

**Phase to address:** Phase 1 (content modeling). Decide upfront: static array, period. Revisit only if volume grows.

---

### Pitfall 6: No Real Content at Launch — Placeholder Text Everywhere

**What goes wrong:** The site launches (or is shown to people) with "Lorem ipsum" placeholder text, generic project descriptions copied from README files, and "coming soon" sections. It communicates nothing useful.

**Why it happens:** Building the design feels like progress. Writing copy is hard and feels like a separate task. Developers default to deferring content to "after the design is done."

**Consequences:** A recruiter sees a beautiful empty shell. The site fails its only job: communicating who Spencer is and what he has built.

**Prevention:**
- Write the project descriptions and bio text before (or during) UI implementation, not after.
- Treat content as a first-class deliverable of Phase 1. The milestone should not close without real text for at least 2–3 projects and a real bio.
- The art gallery is Spencer's work — actual pieces should be in the gallery at launch, not stock photos or placeholders.
- Define a "minimum content" checklist: bio written, 3+ projects with real descriptions and outcomes, 4+ art pieces, contact links verified.

**Warning signs:**
- Any "Lorem ipsum" text in a commit.
- Project cards with descriptions like "A web application built with React."
- Gallery with fewer than 3 actual pieces at the time of deployment.

**Phase to address:** Phase 1 (content gathering). Block the "deploy" milestone on minimum real content.

---

## Moderate Pitfalls

Mistakes that degrade quality or require rework, but don't cause total failure.

---

### Pitfall 7: Missing Open Graph / Social Metadata

**What goes wrong:** The site has no `og:image`, `og:title`, or `og:description`. When shared on LinkedIn or Twitter, it shows a blank card or a random image. For a site meant to impress recruiters, this is a missed first impression.

**Prevention:**
- Add a static `opengraph-image.jpg` (1200x630px) to `app/` — Next.js picks it up automatically.
- Export a `metadata` object from `app/layout.tsx` with `title`, `description`, `openGraph.url`, and `openGraph.siteName` at minimum.
- Verify with a social preview tool (e.g., `opengraph.xyz`) before considering the site "done."

**Phase to address:** Phase 1 (metadata). Takes 30 minutes; no reason to defer.

---

### Pitfall 8: Mobile Responsiveness Treated as an Afterthought

**What goes wrong:** The site is built on a large desktop monitor. Mobile layout is tested at the end (if at all). The art gallery becomes a horizontal-scroll disaster. Project cards stack in unreadable ways. Nav breaks.

**Prevention:**
- Use a mobile-first CSS approach (Tailwind's default breakpoint model is mobile-first — use `md:` and `lg:` prefixes for larger screens, not the reverse).
- Test on a real phone or use browser dev tools at 375px width after every major layout addition, not at the end.
- The gallery grid needs explicit responsive breakpoints: 1 column on mobile, 2 on tablet, 3 on desktop.

**Phase to address:** Phase 1 (layout). Establish responsive grid early; retrofitting is painful.

---

### Pitfall 9: Accessibility Basics Neglected on Image-Heavy Pages

**What goes wrong:** Art gallery images have empty or meaningless `alt` attributes. Interactive elements have no focus states. Color contrast fails for body text. A recruiter using a screen reader gets nothing from the gallery.

**Prevention:**
- Write descriptive `alt` text for every artwork (title, medium, year is sufficient: "Illustration: Mountain at dusk, 2024").
- For purely decorative images, use `alt=""` explicitly — do not omit `alt`.
- Verify color contrast meets WCAG AA (4.5:1 for body text). Lighthouse flags this automatically.
- Ensure keyboard navigation works: tab through nav, links, and gallery items.

**Phase to address:** Phase 1 (all image and component work). Not a separate phase — bake it in from the start.

---

### Pitfall 10: Favicon and App Icons Missing at Launch

**What goes wrong:** The browser tab shows the default Next.js favicon or a blank icon. A small detail, but immediately signals the site is unfinished to anyone who notices.

**Prevention:**
- Place `favicon.ico` and `apple-icon.png` in the `app/` directory. Next.js App Router detects them automatically via file convention.
- Create a simple favicon (initials or a simple mark) — it does not need to be a full icon system.

**Phase to address:** Phase 1. Takes 10 minutes. No reason to defer.

---

## Minor Pitfalls

Small mistakes that are easy to fix but worth avoiding upfront.

---

### Pitfall 11: `'use client'` Scattered Everywhere

**What goes wrong:** Developer reaches for `'use client'` on every component because it "feels safer" or they hit a hydration error. The entire page becomes a client bundle, losing the performance benefits of Server Components.

**Prevention:**
- Default to Server Components. Only add `'use client'` at the leaf component level when a component needs interactivity (`useState`, `useEffect`, event handlers, browser APIs).
- For a mostly static portfolio, the vast majority of components should be Server Components.

**Phase to address:** Phase 1 (component architecture). Establish the pattern early.

---

### Pitfall 12: Committing Full-Resolution Art Files to the Git Repository

**What goes wrong:** High-resolution illustration files (10–20MB each) are committed directly to `public/`. Repository size explodes. Clone/deploy times grow. GitHub/Netlify start complaining about repository size.

**Prevention:**
- Pre-export images to web-ready sizes (max 2000px on the longest edge, 85% JPEG quality or equivalent).
- If original files need to be preserved, use a separate storage solution (cloud storage) — not the git repository.
- Optionally use Git LFS for any file over 1MB, but for a portfolio site, pre-export is simpler.

**Phase to address:** Phase 1 (image pipeline). Establish a clear image size policy before adding gallery content.

---

### Pitfall 13: Animation Overload

**What goes wrong:** Every element has a scroll-triggered fade-in, hover transform, or entrance animation. The page feels like a demo of animation capabilities rather than a professional portfolio. On low-power devices, it janks.

**Prevention:**
- Apply motion selectively: one or two entrance animations maximum (hero section). Everything else is instant.
- Respect `prefers-reduced-motion` media query — wrap all animations in a check or use Framer Motion's `useReducedMotion` hook.
- Animations should serve content communication, not replace it.

**Phase to address:** Phase 2 or later. Do not add animations in Phase 1.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|----------------|------------|
| Project setup / deployment config | Static export breaking `next/image` | Lock in Vercel (non-export) deployment in Phase 1, commit |
| Font integration | FOUT / external Google Fonts request | Use `next/font/google` with one shared instance in `fonts.ts` |
| Art gallery layout | Unoptimized images tanking LCP | `next/image` with static imports and explicit dimensions from day one |
| Project data structure | Over-engineered content pipeline | Typed array in `lib/projects.ts`, no MDX/CMS until it's needed |
| Content population | Launching with placeholders | Block phase completion milestone on minimum real content checklist |
| Metadata | Missing OG image for LinkedIn/recruiter shares | Add static `opengraph-image.jpg` and metadata export before first deploy |
| Component design | `'use client'` overuse | Server-first default; `'use client'` only at interactive leaf nodes |
| Iteration / polish | Perfectionism loop preventing shipping | Hard ship constraint: deploy at end of Phase 1 regardless of polish level |

---

## Sources

- Next.js Image Optimization docs (official, v16.2.4, 2026-04-21): https://nextjs.org/docs/app/getting-started/images
- Next.js Static Exports docs (official, v16.2.4, 2026-04-21): https://nextjs.org/docs/app/guides/static-exports
- Next.js Font Module docs (official, v16.2.4, 2026-04-21): https://nextjs.org/docs/app/api-reference/components/font
- Next.js Metadata and OG Images docs (official, v16.2.4, 2026-04-21): https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Confidence: HIGH for all Next.js-specific technical pitfalls (verified against official current docs)
- Confidence: HIGH for "never ships" and content pitfalls (well-documented pattern in engineering communities, consistent with project context)
