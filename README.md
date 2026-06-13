# Tennis Performance Development System™

A premium, high-converting website for the **Tennis Performance Development System™** — a complete physical development framework for competitive junior tennis.

## Tech Stack

- **Next.js 15** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS**
- **Shadcn UI** (Button, Card, Badge, Separator)
- **Framer Motion** (scroll animations, page transitions)
- **React Three Fiber + Three.js** (interactive 3D tennis ball & racket)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage (10 sections) |
| `/system` | Product / system sales page |
| `/video-library` | Video Exercise Library™ preview |
| `/about` | Author authority page |
| `/affiliate` | Partner / affiliate program |
| `/blog` | SEO resources & blog listing |
| `/blog/[slug]` | Individual blog articles |

## Brand Positioning

The product sold is the **Tennis Performance Development System™**, not a book or video library. The manual is the **Performance System Manual™** — the foundation of the entire system.

## Design

- **Colors:** Deep charcoal, white, tennis ball yellow (#C8E632)
- **Typography:** Bebas Neue (display) + Inter (body)
- **Aesthetic:** Elite Tennis Performance Institute — Mouratoglou × Wilson × MasterClass

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── 3d/                 # React Three Fiber scene
│   ├── home/               # Homepage sections
│   ├── layout/             # Navbar, Footer
│   ├── shared/             # FadeIn animations
│   └── ui/                 # Shadcn components
├── data/                   # Content, testimonials, blog
└── lib/                    # Utils & brand constants
```
