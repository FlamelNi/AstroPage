---
title: "Development"
description: "Development guides and best practices"
---

# Development

This section covers development guides and best practices for working with the project. Whether you're setting up your environment or diving into advanced workflows, you'll find the information you need here.

## Environment Setup

Before you begin development, ensure you have the following prerequisites installed:

- **Node.js** (version 18 or higher)
- **npm** or your preferred package manager
- A code editor (we recommend VS Code)

## Project Structure

Understanding the project structure is key to efficient development. Here's a quick overview:

```
src/
├── content/     # Markdown content (docs & blog)
├── components/  # Reusable Astro components
├── layouts/     # Page layouts
├── pages/       # Route pages
├── lib/         # Utilities and configuration
└── styles/      # Global styles and design tokens
```

## Development Workflow

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Make your changes and see them live at `http://localhost:4321`

## Best Practices

- Keep components small and focused
- Follow the established naming conventions
- Write meaningful commit messages
- Test your changes locally before pushing

For more detailed guides on specific topics, explore the subsections in the sidebar.
