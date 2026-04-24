# Technology Stack

**Project:** Spencer Cheng Personal Website
**Researched:** 2026-04-24
**Confidence:** HIGH — all versions and installation patterns verified against official Next.js docs (version 16.2.4, last updated 2026-04-21)

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 16.x (latest) | Full framework | Project constraint; App Router gives static export + server components + image optimization + font optimization in one package. Turbopack is now the default bundler, making dev startup ~76% faster. |
| React | 19.x (latest) | UI library | Required by Next.js 16 App Router. React 19 is stable and GA. |
| TypeScript | 6.x (latest) | Type safety | Default in `create-next-app`; removes a class of bugs for a solo developer maintaining this site long-term. |

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x (latest) | Utility-first styling | The official Next.js recommended default since v4.0 GA. v4 drops `tailwind.config.js` for most use cases — config lives in `globals.css` via `@theme`. No PostCSS config complexity: one line `@import 'tailwindcss'` in `globals.css` and `@tailwindcss/postcss` in `postcss.config.mjs`. CSS-first config is more intuitive for a portfolio where you control all the design tokens. |
| tailwind-merge | 3.x (latest) | Merge Tailwind class strings | Prevents class conflicts when composing components. Use with `clsx` for conditional classes. Essential as soon as you have variant-heavy components (gallery cards, project cards). |
| clsx | 2.x (latest) | Conditional class names | Pairs with tailwind-merge. Tiny utility, no overhead. |

### Fonts

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next/font/google | (built into Next.js) | Web fonts | Downloads fonts at build time and self-hosts them. Zero layout shift (CLS), zero requests to Google at runtime. Use CSS variable mode (`variable: '--font-sans'`) to integrate with Tailwind's `@theme` — then `font-sans` utility class just works. |

### Image Handling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next/image | (built into Next.js) | Responsive image optimization | Automatically converts to WebP, lazy-loads by default, prevents layout shift with width/height, supports `placeholder="blur"` for gallery art. Critical for an art-heavy portfolio — raw PNGs/JPGs from art tools are large; `next/image` cuts bandwidth without manual work. |
| sharp | (auto-used by Next.js) | Image processing | Next.js 16 uses `sharp` automatically for `next start` and standalone mode. No manual install needed. Only install manually if self-hosting outside of Vercel/standalone mode. |

### Animation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| motion | 12.x (latest) | Scroll-triggered animations, transitions | The library formerly known as Framer Motion, rebranded in 2024. Supports React 18 and 19. Use for: fade-in-on-scroll for gallery items, page transition between sections, hover effects on project cards. Scope to `"use client"` components only — don't pull it into Server Components. Avoid if the design turns out to not need animation; Tailwind CSS transitions handle simple hover/focus states fine. |

### Deployment

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel | (hosting platform) | Deployment + CDN | Zero-config for Next.js; native App Router support, automatic image optimization via its CDN, preview deploys on every PR. No infra management needed for a portfolio site. |
| @vercel/analytics | 2.x (latest) | Page view analytics | Single script import, privacy-respecting, zero config on Vercel. Gives visitor data without cookies or GDPR complexity. Add to root layout once and done. |
| @vercel/speed-insights | 2.x (latest) | Core Web Vitals monitoring | Replaced the deprecated auto-instrumentation removed in Next.js 15+. Add once, tracks LCP/CLS/FID. Free on Vercel hobby plan. |

### Development Tooling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| ESLint | 9.x (latest) | Linting | Default in `create-next-app`; flat config format (`eslint.config.mjs`). |
| Prettier | 3.x (latest) | Code formatting | Keeps code consistent; pair with `prettier-plugin-tailwindcss` to auto-sort Tailwind classes. |
| prettier-plugin-tailwindcss | latest | Sort Tailwind utility classes | Enforces the canonical class order; prevents merge conflicts from class reordering. |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Styling | Tailwind CSS v4 | CSS Modules | CSS Modules require writing CSS manually; Tailwind is faster to iterate on and is the official Next.js recommendation. CSS Modules are good for escape hatches when Tailwind utilities aren't sufficient — use both if needed. |
| Styling | Tailwind CSS v4 | styled-components / Emotion | CSS-in-JS libraries add runtime overhead and have rough edges with React Server Components. They are moving to zero-runtime approaches but aren't there yet. Avoid for new projects in 2026. |
| Styling | Tailwind CSS v4 | Tailwind CSS v3 | v3 requires `tailwind.config.js`, a `content` array, and separate `postcss.config`. v4 is simpler: CSS-native config, faster build, and is the current recommendation per official Next.js docs. Only choose v3 if you need IE11/very old browser support (unlikely for a portfolio). |
| Animation | motion | GSAP | GSAP is more powerful but overkill for a portfolio. `motion` integrates naturally with React, has simpler API for scroll-triggered effects, and is the community standard for React animation. |
| Animation | motion | CSS transitions only | Valid choice for minimal animation. If the design is clean and minimal, Tailwind's `transition` and `hover:` utilities may be sufficient — add `motion` only if you need scroll-triggered reveal animations or more complex effects. |
| Fonts | next/font | Google Fonts CDN link | CDN link blocks rendering, causes layout shift, and sends requests to Google. `next/font` is strictly better. |
| Deployment | Vercel | Netlify | Both are valid for Next.js. Vercel has the tightest Next.js integration (they build Next.js), better image optimization CDN, and edge runtime support if needed. Netlify is a fine backup option. |

---

## Installation

```bash
# Bootstrap with recommended defaults (TypeScript, Tailwind v4, ESLint, App Router, Turbopack)
npx create-next-app@latest personal-website --yes

# Animation (add only if design needs scroll/transition animations)
npm install motion

# Deployment tooling
npm install @vercel/analytics @vercel/speed-insights

# Class name utilities
npm install clsx tailwind-merge

# Dev: formatter + Tailwind class sorter
npm install -D prettier prettier-plugin-tailwindcss
```

---

## Tailwind v4 Integration Pattern with next/font

This is the correct pattern for v4 — the docs-confirmed approach as of Next.js 16:

```tsx
// app/layout.tsx
import { Inter, Lora } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
```

```css
/* app/globals.css */
@import 'tailwindcss';

@theme inline {
  --font-sans: var(--font-sans);       /* maps to Inter */
  --font-display: var(--font-display); /* maps to Lora */
}
```

Note: v4 uses `@theme inline { }` in CSS instead of `theme.extend.fontFamily` in a JS config file.

---

## What NOT to Use

| Technology | Reason to Avoid |
|------------|-----------------|
| styled-components | Runtime CSS-in-JS has Server Component incompatibilities in Next.js App Router. Adds bundle weight. |
| Emotion | Same reasons as styled-components. |
| CSS-in-JS (general) | The entire category is problematic with React Server Components. Tailwind sidesteps this entirely. |
| next/legacy/image | The old image component removed in Next.js 14+. Use `next/image`. |
| `@next/font` package | Was merged into Next.js core as `next/font` in v13.2. No separate package needed. |
| Pages Router | App Router is the current recommendation and default. Pages Router is maintained for legacy projects only. |
| Webpack | Turbopack is now the default dev bundler and is stable. Only use `--webpack` flag if a specific plugin requires it. |
| React Server Components for animation | `motion` components must be used in `"use client"` components. Keep animations at the leaf level, not in layouts. |

---

## Project Structure Recommendation

```
personal-website/
├── app/
│   ├── layout.tsx          # Root layout: fonts, analytics, global nav
│   ├── globals.css         # @import 'tailwindcss'; @theme; base styles
│   ├── page.tsx            # Home / hero section
│   ├── projects/
│   │   └── page.tsx
│   ├── art/
│   │   └── page.tsx
│   └── about/
│       └── page.tsx
├── components/
│   ├── ui/                 # Reusable primitives (Card, Badge, etc.)
│   └── sections/           # Page sections (Hero, ProjectGrid, ArtGallery)
├── lib/
│   └── utils.ts            # cn() helper: clsx + tailwind-merge
├── public/
│   └── images/             # Art files stored here; served directly
└── content/
    ├── projects.ts         # Project data as typed TypeScript arrays
    └── art.ts              # Art metadata (titles, dimensions, files)
```

The `cn()` utility is standard across the ecosystem:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Sources

- Next.js 16 Installation docs: https://nextjs.org/docs/app/getting-started/installation (version 16.2.4, updated 2026-04-21) — HIGH confidence
- Next.js CSS guide (Tailwind v4 setup): https://nextjs.org/docs/app/getting-started/css (version 16.2.4, updated 2026-04-21) — HIGH confidence
- Next.js Font Module docs: https://nextjs.org/docs/app/api-reference/components/font (version 16.2.4, updated 2026-04-21) — HIGH confidence
- Next.js Image Optimization docs: https://nextjs.org/docs/app/getting-started/images (version 16.2.4, updated 2026-04-21) — HIGH confidence
- Next.js 15 release notes (React 19, Turbopack stable, sharp auto-use): https://nextjs.org/blog/next-15 — HIGH confidence
- npm package versions verified: next@16.2.4, react@19.2.5, tailwindcss@4.2.4, motion@12.38.0, typescript@6.0.3, clsx@2.1.1, tailwind-merge@3.5.0, @vercel/analytics@2.0.1, @vercel/speed-insights@2.0.0 — HIGH confidence (npm registry, 2026-04-24)
