---
title: "Environment Setup"
description: "Complete guide to setting up your development environment"
---

Setting up a proper development environment is the first step to productive coding. This guide walks you through everything you need to get started.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Node.js** (version 18 or higher)
- **A package manager** (npm, pnpm, or yarn)
- **A code editor** (VS Code recommended)
- **Git** for version control

### Checking Your Node.js Version

Open your terminal and run:

```bash
node --version
```

If you see a version number below 18, you'll need to update Node.js. Visit [nodejs.org](https://nodejs.org) to download the latest LTS version.

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Using pnpm (recommended for faster installs):

```bash
pnpm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Your site should now be running at `http://localhost:4321`.

## VS Code Configuration

For the best development experience, install these VS Code extensions:

- **Astro** - Syntax highlighting and IntelliSense for Astro files
- **Prettier** - Code formatting
- **ESLint** - Code linting
- **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes

### Recommended Settings

Add these to your `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "files.associations": {
    "*.astro": "astro"
  }
}
```

## Troubleshooting

### Port Already in Use

If you see an error that port 4321 is already in use:

```bash
# Find and kill the process using the port
npx kill-port 4321

# Or start on a different port
npm run dev -- --port 3000
```

### Dependencies Not Installing

Try clearing your package manager cache:

```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### TypeScript Errors

Make sure your editor is using the workspace version of TypeScript:

1. Open any `.ts` or `.astro` file
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "Select TypeScript Version"
4. Choose "Use Workspace Version"

## Next Steps

Now that your environment is set up, explore these related guides:

- [Development Overview](/docs/development/) - Learn about the development workflow
- [Testing Guide](/docs/development/testing/) - Set up and run tests
- [Getting Started Tutorial](/docs/tutorials/getting-started/) - Build your first page
