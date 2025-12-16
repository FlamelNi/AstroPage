---
title: "Deployment Guide"
description: "Deploy your site to production"
---

This guide covers everything you need to deploy your site to production. We'll walk through the build process, hosting options, and common configuration.

## Build Process Overview

Before deploying, you need to build your site. The build process:

1. Compiles Astro components to static HTML
2. Processes and optimizes images
3. Bundles and minifies CSS and JavaScript
4. Generates the final output in the `dist/` directory

### Building Your Site

Run the build command:

```bash
npm run build
```

This creates a `dist/` folder containing your production-ready site.

### Previewing the Build

Test your build locally before deploying:

```bash
npm run preview
```

Visit `http://localhost:4321` to verify everything works correctly.

## Deployment Options

Choose a hosting platform based on your needs.

### Vercel (Recommended)

Vercel offers the simplest deployment experience with automatic builds.

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Deploy

```bash
vercel
```

Follow the prompts to link your project and deploy.

#### Step 3: Configure for Production

```bash
vercel --prod
```

#### Automatic Deployments

Connect your GitHub repository for automatic deployments on every push:

1. Go to [vercel.com](https://vercel.com)
2. Import your repository
3. Vercel automatically detects Astro and configures builds

### Netlify

Netlify provides excellent static hosting with a generous free tier.

#### Option 1: Netlify CLI

```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

#### Option 2: Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `dist/` folder
3. Or connect your GitHub repository for automatic deploys

#### Build Settings

If using Git integration, configure these settings:

| Setting       | Value           |
|---------------|-----------------|
| Build command | `npm run build` |
| Publish directory | `dist`      |

### Static Hosting (GitHub Pages, S3, etc.)

For any static host, simply upload the contents of the `dist/` folder.

#### GitHub Pages

1. Build your site: `npm run build`
2. Push the `dist/` folder to a `gh-pages` branch
3. Enable GitHub Pages in repository settings

Or use GitHub Actions for automatic deployment:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Environment Variables

Configure environment variables for production builds.

### Setting Variables

Create a `.env` file for local development:

```bash
PUBLIC_API_URL=https://api.example.com
SECRET_KEY=your-secret-key
```

### Accessing Variables

In your Astro code:

```astro
---
// Public variables (exposed to client)
const apiUrl = import.meta.env.PUBLIC_API_URL;

// Secret variables (server-side only)
const secret = import.meta.env.SECRET_KEY;
---
```

### Platform-Specific Configuration

#### Vercel

Add variables in the Vercel dashboard:
1. Go to Project Settings
2. Click "Environment Variables"
3. Add your variables

#### Netlify

Add variables in Netlify dashboard:
1. Go to Site Settings
2. Click "Environment variables"
3. Add your variables

## Post-Deployment Checklist

After deploying, verify these items:

- [ ] All pages load correctly
- [ ] Images and assets display properly
- [ ] Links work (no 404 errors)
- [ ] Forms submit correctly (if applicable)
- [ ] Meta tags and SEO content appear correctly
- [ ] Site works on mobile devices
- [ ] HTTPS is enabled
- [ ] Custom domain is configured (if applicable)

## Troubleshooting

### Build Fails

Check for these common issues:

```bash
# Clear cache and rebuild
rm -rf dist node_modules/.astro
npm run build
```

### Missing Assets

Ensure assets are in the `public/` folder and referenced with absolute paths:

```html
<!-- Correct -->
<img src="/images/logo.png" alt="Logo" />

<!-- Incorrect -->
<img src="images/logo.png" alt="Logo" />
```

### 404 Errors on Refresh

For SPAs or dynamic routes, configure your host to redirect all requests to `index.html`. Check your platform's documentation for SPA configuration.

### Environment Variables Not Working

- Ensure public variables are prefixed with `PUBLIC_`
- Rebuild after changing environment variables
- Verify variables are set in your hosting platform

## Next Steps

- [Guides Overview](/docs/guides/) - Explore more guides
- [Testing Guide](/docs/development/testing/) - Test before you deploy
- [Development Overview](/docs/development/) - Learn about the development workflow
