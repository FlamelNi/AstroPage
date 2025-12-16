---
title: "Getting Started"
description: "Your first steps with the project"
---

Welcome! This tutorial will guide you through setting up the project and creating your first page. By the end, you'll have a running development server and understand the project structure.

## Quick Start

Get up and running in three steps:

### Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/your-username/your-project.git

# Navigate to the project directory
cd your-project

# Install dependencies
npm install
```

### Step 2: Start the Development Server

```bash
npm run dev
```

### Step 3: Open in Browser

Visit `http://localhost:4321` to see your site.

You should see the homepage. Any changes you make will automatically refresh the browser.

## Project Structure

Here's an overview of the important directories:

```
your-project/
├── public/              # Static assets (images, fonts)
├── src/
│   ├── components/      # Reusable UI components
│   ├── content/         # Blog posts and documentation
│   │   ├── blog/        # Blog post markdown files
│   │   └── docs/        # Documentation markdown files
│   ├── layouts/         # Page layout templates
│   ├── lib/             # Utility functions and helpers
│   ├── pages/           # File-based routing
│   └── styles/          # Global CSS styles
├── astro.config.mjs     # Astro configuration
├── package.json         # Project dependencies
└── tsconfig.json        # TypeScript configuration
```

### Key Directories Explained

- **`src/pages/`** - Each file here becomes a route. `index.astro` is the homepage, `about.astro` becomes `/about`.
- **`src/components/`** - Reusable pieces of UI. Import these into pages or other components.
- **`src/content/`** - Markdown files for blog posts and documentation. These are processed by Astro's content collections.
- **`src/layouts/`** - Templates that wrap page content. Define common elements like headers and footers here.

## Creating Your First Page

Let's create a simple "About" page.

### Step 1: Create the File

Create a new file at `src/pages/about.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
---

<BaseLayout title="About">
  <main>
    <h1>About Us</h1>
    <p>Welcome to our site! We're building something awesome.</p>
  </main>
</BaseLayout>
```

### Step 2: View Your Page

Navigate to `http://localhost:4321/about` in your browser.

Congratulations! You've created your first page.

### Step 3: Add Some Style

Add styles directly in your component:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
---

<BaseLayout title="About">
  <main class="about-page">
    <h1>About Us</h1>
    <p>Welcome to our site! We're building something awesome.</p>
  </main>
</BaseLayout>

<style>
  .about-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    color: var(--accent-color);
  }
</style>
```

## Understanding Astro Components

Astro components have two main parts:

1. **Frontmatter** (between `---` fences) - JavaScript that runs at build time
2. **Template** - HTML-like markup that defines the output

```astro
---
// This is the frontmatter - runs at build time
import Component from './Component.astro';
const title = "Hello World";
const items = ['one', 'two', 'three'];
---

<!-- This is the template - generates HTML -->
<h1>{title}</h1>
<ul>
  {items.map(item => <li>{item}</li>)}
</ul>
<Component />
```

## Common Tasks

### Adding Images

Place images in the `public/` directory:

```astro
<img src="/images/hero.jpg" alt="Hero image" />
```

### Linking Between Pages

Use standard anchor tags:

```astro
<a href="/about">About Us</a>
<a href="/blog">Read our Blog</a>
```

### Using Components

Import and use components in your pages:

```astro
---
import Button from '@/components/Button.astro';
import Card from '@/components/Card.astro';
---

<Card title="Welcome">
  <p>This is card content.</p>
  <Button>Click Me</Button>
</Card>
```

## Next Steps

Now that you have the basics down, continue learning:

- [Creating Content](/docs/tutorials/creating-content/) - Add blog posts and documentation
- [Tutorials Overview](/docs/tutorials/) - Explore more tutorials
- [Environment Setup](/docs/development/environment-setup/) - Configure your editor
