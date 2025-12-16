# My Site

A documentation and blog site built with Astro + Starlight.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Runs on http://localhost:4321

# Build for production
npm run build
```

## Content Structure

### Documentation

Add `.md` files to `src/content/docs/` — Starlight automatically generates the sidebar navigation.

```
src/content/docs/
├── index.md              # Docs landing page
├── tutorials/
│   └── index.md          # Tutorials section
└── development/
    └── index.md          # Development guides
```

### Blog Posts

Add `.md` files to `src/content/blog/<topic>/` with the required frontmatter:

```yaml
---
title: "Post Title"
date: 2024-12-01
description: "Brief description"
tags: ["tag1", "tag2"]
draft: false
---
```

```
src/content/blog/
├── devlog/
│   └── first-post.md
└── daily-life/
    └── morning-routine.md
```

## Adding New Topics

1. Edit `src/lib/topics.ts` to add a new topic to the `TOPICS` array:

```typescript
export const TOPICS = [
  { slug: "tutorials", label: "Tutorials", type: "docs" },
  { slug: "development", label: "Development", type: "docs" },
  { slug: "devlog", label: "Dev Log", type: "blog" },
  { slug: "daily-life", label: "Daily Life", type: "blog" },
  // Add new topic here
];
```

2. Create the corresponding content folder:
   - For `type: "docs"` → create folder in `src/content/docs/<slug>/`
   - For `type: "blog"` → create folder in `src/content/blog/<slug>/`

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/docs/` | Documentation (Starlight) |
| `/topics/` | Topics hub |
| `/blog/` | Blog topics index |
| `/blog/<topic>/` | Posts in topic (date-sorted) |
| `/blog/<topic>/<slug>/` | Individual post |
| `/contact/` | Contact page |
