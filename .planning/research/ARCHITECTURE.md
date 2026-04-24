# Architecture Patterns

**Domain:** Personal portfolio website (Next.js App Router, static export)
**Researched:** 2026-04-24
**Confidence:** HIGH — sourced from official Next.js 16.x docs (lastUpdated 2026-04-21)

---

## Recommended Architecture

Single-origin, statically-exported Next.js App Router site. All content lives in TypeScript data files (not MDX, not a CMS). Images live in `public/` and are served through `next/image` with the `unoptimized` flag on static export (or a custom Cloudinary loader if image optimization at scale becomes important). No server, no API routes, no database.

The site is structured as a **long-scroll single page** (`/`) with named anchor sections (`#projects`, `#art`, `#hobbies`, `#contact`) plus a standalone `/art/[slug]` route for individual artwork lightbox/detail views. This avoids the jarring context-switch of navigating away from a portfolio page while still giving images their own canonical URL for sharing.

---

## Route Map

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Full portfolio — hero, projects, art grid, hobbies, contact |
| `/art/[slug]` | `app/art/[slug]/page.tsx` | Individual artwork detail / lightbox fallback |
| (none) | `app/layout.tsx` | Root layout — html/body, fonts, global CSS |
| (none) | `app/not-found.tsx` | 404 page |

No `/projects/[slug]` route is needed at MVP — project cards display their full content inline on the home page. This can be added later if descriptions grow long.

No `/hobbies` route — hobbies are a supporting section, not a navigation destination.

---

## Component Boundaries

### Page-Level Components (in `app/`)

| Component | File | Responsibility |
|-----------|------|---------------|
| RootLayout | `app/layout.tsx` | HTML shell, global fonts, global metadata |
| HomePage | `app/page.tsx` | Assembles all sections in order; no logic |
| ArtworkPage | `app/art/[slug]/page.tsx` | Single artwork view; reads from art data |

### Section Components (in `components/sections/`)

These are Server Components. They receive typed props from their parent page — no data fetching inside.

| Component | File | Renders |
|-----------|------|---------|
| HeroSection | `components/sections/HeroSection.tsx` | Name, title, one-liner bio, CTA link |
| AboutSection | `components/sections/AboutSection.tsx` | Professional bio paragraph, skills/tech hints |
| ProjectsSection | `components/sections/ProjectsSection.tsx` | List of ProjectCard components |
| ArtGallerySection | `components/sections/ArtGallerySection.tsx` | Masonry/grid of ArtThumbnail components |
| HobbiesSection | `components/sections/HobbiesSection.tsx` | Short prose or icon list; minimal |
| ContactSection | `components/sections/ContactSection.tsx` | GitHub, LinkedIn, email links |

### Reusable UI Components (in `components/ui/`)

| Component | File | Purpose |
|-----------|------|---------|
| ProjectCard | `components/ui/ProjectCard.tsx` | Single project: title, description, outcomes, links |
| ArtThumbnail | `components/ui/ArtThumbnail.tsx` | Image tile in gallery grid; links to `/art/[slug]` |
| ArtworkDetail | `components/ui/ArtworkDetail.tsx` | Full image + metadata on the `/art/[slug]` page |
| NavBar | `components/ui/NavBar.tsx` | Sticky top nav with anchor links; Client Component for active-section highlight |
| SectionAnchor | `components/ui/SectionAnchor.tsx` | Invisible anchor tag wrapper for scroll-to navigation |

### Data Layer (in `data/`)

Pure TypeScript — no runtime fetching, no MDX compilation.

| File | Exports | Used By |
|------|---------|---------|
| `data/projects.ts` | `Project[]` | ProjectsSection |
| `data/art.ts` | `Artwork[]` | ArtGallerySection, ArtworkPage |
| `data/site.ts` | `SiteConfig` | RootLayout (metadata), HeroSection, ContactSection |

---

## Data Patterns

### Decision: TypeScript data files, not MDX or JSON

**Why not MDX:** MDX is valuable when content has rich formatting, embedded components, or needs to be authored by non-developers. Spencer's project descriptions are short and structured (title, description, outcomes, links). MDX adds a compilation step, a content directory to manage, and gray-matter parsing complexity for no benefit here.

**Why not JSON:** Plain JSON has no TypeScript type safety, no IDE autocomplete, and cannot export computed values or helper functions. TypeScript data files are equally simple to edit and provide immediate type errors on malformed entries.

**Why TypeScript data files:** Zero-dependency, type-safe, co-located with the code, trivially imported by Server Components. The right choice when content is structured and maintained by the same developer as the code.

### `data/projects.ts` shape

```typescript
export interface Project {
  id: string
  title: string
  description: string
  outcomes: string[]           // bullet points of measurable results
  techStack: string[]
  links: {
    github?: string
    live?: string
    writeup?: string
  }
  featured: boolean            // controls ordering on page
}

export const projects: Project[] = [ /* ... */ ]
```

### `data/art.ts` shape

```typescript
export type ArtMedium = 'illustration' | 'painting' | 'digital' | 'photography'

export interface Artwork {
  slug: string                 // used in /art/[slug] URL
  title: string
  medium: ArtMedium
  year: number
  description?: string         // optional; shown on detail page
  imagePath: string            // e.g. '/art/forest-study.jpg' — relative to public/
  dimensions?: {               // known width/height avoids layout shift
    width: number
    height: number
  }
  featured: boolean            // subset shown on home page gallery
}

export const artworks: Artwork[] = [ /* ... */ ]
```

### `data/site.ts` shape

```typescript
export interface SiteConfig {
  name: string
  title: string
  description: string
  email: string
  links: {
    github: string
    linkedin: string
  }
}

export const siteConfig: SiteConfig = { /* ... */ }
```

---

## Image Strategy

### Static Export Constraint

The default `next/image` loader runs a Node.js optimization server that is **not available in static export mode**. Two valid options:

**Option A (recommended for MVP): `unoptimized` flag**
Add `images: { unoptimized: true }` to `next.config.ts`. Images are served directly from `public/` without resizing. This is the simplest approach and fully correct for a personal site with a modest image count. The developer controls image dimensions manually (export at appropriate sizes before committing).

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

**Option B (if performance becomes a concern): Custom loader + Cloudinary**
Register artworks on Cloudinary's free tier, store only the Cloudinary public IDs in `data/art.ts`, and configure a custom loader in `next.config.ts`. Cloudinary handles resizing, WebP conversion, and CDN delivery. This is the right upgrade path if the gallery grows to 50+ images or if LCP scores become a concern.

**Recommendation:** Start with Option A. Migrate to Option B as a discrete step if needed.

### Storing Images

All images go in `public/art/` and `public/projects/` (screenshots, logos). File naming convention: lowercase kebab-case matching the `slug` field in `data/art.ts` (e.g., `public/art/forest-study.jpg`).

### Gallery Grid: `fill` + `sizes` Pattern

For the gallery grid where image dimensions vary, use `fill` on each tile with a fixed-aspect-ratio container:

```tsx
// ArtThumbnail.tsx
<div style={{ position: 'relative', aspectRatio: '4/3' }}>
  <Image
    src={artwork.imagePath}
    alt={artwork.title}
    fill
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    style={{ objectFit: 'cover' }}
  />
</div>
```

`sizes` is required when using `fill` — without it, the browser assumes 100vw for every image.

### Hero and Above-Fold Images

For the hero section (if a portrait photo is used), use `fetchPriority="high"` and `loading="eager"` to avoid LCP penalty. Do not use `placeholder="blur"` for static imports — Next.js generates the blur data URL automatically for static imports, but with `unoptimized: true` this has no effect.

### Artwork Detail Page

On `/art/[slug]`, display the full image with explicit `width` and `height` from the `dimensions` field in the data file. This prevents layout shift and lets the browser reserve correct space.

---

## Data Flow

```
data/projects.ts ──► HomePage (Server Component)
                       └──► ProjectsSection
                              └──► ProjectCard (repeating)

data/art.ts ──────► HomePage (Server Component)
                       └──► ArtGallerySection
                              └──► ArtThumbnail (repeating, links to /art/[slug])

data/art.ts ──────► ArtworkPage (Server Component, reads params.slug)
                       └──► ArtworkDetail

data/site.ts ──────► RootLayout (metadata export)
              ──────► HeroSection
              ──────► ContactSection
```

All data reading happens in Server Components at build time. No `useState`, no `useEffect`, no client-side fetching for content. `NavBar` is the only Client Component (needs `useState` for mobile menu toggle and scroll-position tracking for active section highlight).

---

## `generateStaticParams` for Art Routes

The `/art/[slug]` route must export `generateStaticParams` so Next.js can pre-render all artwork detail pages at build time (required for static export):

```typescript
// app/art/[slug]/page.tsx
import { artworks } from '@/data/art'

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }))
}
```

Without this, the dynamic route is incompatible with `output: 'export'`.

---

## File Structure

```
personal_website/
├── app/
│   ├── layout.tsx              # RootLayout — html/body, fonts, global metadata
│   ├── page.tsx                # HomePage — assembles all sections
│   ├── not-found.tsx           # 404
│   └── art/
│       └── [slug]/
│           └── page.tsx        # ArtworkPage
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ArtGallerySection.tsx
│   │   ├── HobbiesSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── NavBar.tsx          # 'use client'
│       ├── ProjectCard.tsx
│       ├── ArtThumbnail.tsx
│       ├── ArtworkDetail.tsx
│       └── SectionAnchor.tsx
├── data/
│   ├── projects.ts
│   ├── art.ts
│   └── site.ts
├── public/
│   ├── art/                    # artwork image files
│   └── projects/               # project screenshot/logo files
├── styles/
│   └── globals.css
└── next.config.ts              # output: 'export', images: { unoptimized: true }
```

---

## Suggested Build Order

The rationale: build the structural skeleton first (layout + routing), then wire up data, then build content sections from simplest to most complex. The art gallery is last because it has the most image-handling complexity.

### Phase 1: Project Foundation
1. Initialize Next.js App Router project with TypeScript
2. Configure `next.config.ts` for static export
3. Create `app/layout.tsx` with global fonts and metadata from `data/site.ts`
4. Create `data/site.ts`, `data/projects.ts`, `data/art.ts` with placeholder/real content
5. Stub all section components (renders `<section>` with a heading — no content yet)
6. Wire `app/page.tsx` to render all stubs in order with anchor IDs
7. Build `NavBar` as a client component with anchor links

**Rationale:** The navigation and page skeleton must exist before any section work. Data files should be stubbed early so every subsequent component has real types to work against.

### Phase 2: Core Content Sections
8. Build `HeroSection` (name, title, bio, CTA — no images)
9. Build `AboutSection` (prose bio)
10. Build `ProjectCard` and `ProjectsSection` (reads from `data/projects.ts`)
11. Build `HobbiesSection` (short text/icons)
12. Build `ContactSection` (icon links to GitHub, LinkedIn, email)

**Rationale:** These sections have no image complexity. Getting them working validates the data flow pattern before tackling gallery work.

### Phase 3: Art Gallery
13. Add artwork images to `public/art/`
14. Populate `data/art.ts` with real slugs, paths, dimensions
15. Build `ArtThumbnail` with `fill` + `sizes` pattern
16. Build `ArtGallerySection` with responsive grid layout
17. Build `app/art/[slug]/page.tsx` with `generateStaticParams`
18. Build `ArtworkDetail` component

**Rationale:** Gallery is built last because it depends on real image files being present, and the `fill`/`sizes`/`generateStaticParams` patterns require more care.

### Phase 4: Polish
19. Responsive layout pass (mobile breakpoints for grid, nav)
20. Typography and spacing refinement
21. `next build` + static export verification
22. Vercel/Netlify deployment

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: MDX for Structured Content
**What:** Using MDX files in `content/` for project descriptions and artwork metadata.
**Why bad:** Adds `@next/mdx` or `contentlayer` dependency, requires frontmatter parsing, introduces a build-time pipeline for content that is inherently structured (not prose). The content here is short fields, not long-form writing.
**Instead:** TypeScript data files in `data/`.

### Anti-Pattern 2: Client Components for Static Content
**What:** Adding `'use client'` to section components to use hooks for anything other than interactivity.
**Why bad:** Defeats Server Component rendering, pushes content into JavaScript bundle, hurts initial load performance, disables automatic static rendering.
**Instead:** Keep all section components as Server Components. Only `NavBar` (mobile toggle + active section tracking) needs `'use client'`.

### Anti-Pattern 3: `<img>` Tags for Gallery
**What:** Using raw `<img>` tags with `/public/` paths to avoid `next/image` configuration.
**Why bad:** No lazy loading, no `sizes` hints, no blur placeholders, and triggers the Next.js `no-img-element` lint warning. Image-heavy gallery will have poor LCP and layout shift.
**Instead:** `next/image` with `images: { unoptimized: true }` in `next.config.ts` — this gives lazy loading and `sizes`/`srcset` benefits even without server-side resizing.

### Anti-Pattern 4: `priority` Prop on All Gallery Images
**What:** Setting `priority` (or the new `preload={true}`) on every artwork thumbnail to "make them load faster."
**Why bad:** Causes the browser to preload every image eagerly, defeating lazy loading entirely. Only the hero image (if above the fold) should use `fetchPriority="high"`.
**Instead:** Let gallery images use default lazy loading (`loading="lazy"`). Only the LCP image in the hero uses eager loading.

### Anti-Pattern 5: Hardcoding Contact Info in JSX
**What:** Writing email addresses and social links directly in `ContactSection.tsx`.
**Why bad:** When links change, they must be hunted across JSX files. Minor but adds friction.
**Instead:** All contact info lives in `data/site.ts` and is read by both the layout metadata and the ContactSection.

---

## Scalability Considerations

This is a personal portfolio site — scalability of infrastructure is not a concern. The relevant scalability dimension is **content scalability** (how easy is it to add projects and artwork over time?).

| Concern | Current approach | When to upgrade |
|---------|-----------------|-----------------|
| Adding a project | Edit `data/projects.ts`, push | Works indefinitely |
| Adding artwork | Add image to `public/art/`, edit `data/art.ts`, push | Viable to ~100 images; beyond that, image repo size becomes a concern |
| Image optimization | `unoptimized: true` (manual sizing) | Switch to Cloudinary loader if LCP scores degrade or gallery grows to 50+ images |
| Project detail pages | Inline on home page | Add `/projects/[slug]` route when descriptions exceed 3-4 sentences |
| Blog | Out of scope | Add `app/writing/` with MDX when content actually exists |

---

## Sources

- Next.js App Router routing docs: https://nextjs.org/docs/app/getting-started/layouts-and-pages (v16.2.4, 2026-04-21)
- Next.js static export guide: https://nextjs.org/docs/app/guides/static-exports (v16.2.4, 2026-04-21)
- Next.js Image component reference: https://nextjs.org/docs/app/api-reference/components/image (v16.2.4, 2026-04-21)
- Context7 CLI docs for `/websites/nextjs` — image fill/sizes patterns, metadata API, Server Component data fetching patterns
