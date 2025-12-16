---
title: "Creating Content"
description: "Learn how to add blog posts and documentation"
---

This tutorial teaches you how to create and organize content using Astro's content collections. You'll learn to write blog posts, documentation pages, and use markdown effectively.

## Understanding Content Collections

Content collections are Astro's way of managing groups of related content. This project uses two collections:

- **`blog/`** - Blog posts organized by topic
- **`docs/`** - Documentation pages organized by category

Each collection has its own schema defining required frontmatter fields.

## Creating Blog Posts

Blog posts live in `src/content/blog/` and are organized by topic.

### Step 1: Choose a Topic

Blog posts are organized into topics like `devlog` or `daily-life`. Check existing topics in `src/content/blog/` or create a new topic folder.

### Step 2: Create the File

Create a new markdown file in the appropriate topic folder:

```
src/content/blog/devlog/my-first-post.md
```

### Step 3: Add Frontmatter

Every blog post needs frontmatter at the top:

```markdown
---
title: "My First Blog Post"
description: "A brief description of what this post is about"
pubDate: 2024-01-15
---

Your content starts here...
```

### Required Frontmatter Fields

| Field         | Description                          | Example                    |
|---------------|--------------------------------------|----------------------------|
| `title`       | The post title                       | `"My First Post"`          |
| `description` | Brief summary for SEO and previews   | `"Learn how to..."`        |
| `pubDate`     | Publication date                     | `2024-01-15`               |

### Optional Frontmatter Fields

| Field         | Description                          | Example                    |
|---------------|--------------------------------------|----------------------------|
| `updatedDate` | Last update date                     | `2024-02-01`               |
| `heroImage`   | Path to header image                 | `"/images/hero.jpg"`       |

### Complete Example

```markdown
---
title: "Building a REST API with Node.js"
description: "Step-by-step guide to creating a RESTful API"
pubDate: 2024-01-15
updatedDate: 2024-01-20
heroImage: "/images/api-tutorial.jpg"
---

In this tutorial, we'll build a complete REST API...

## Prerequisites

Before starting, make sure you have:

- Node.js installed
- Basic JavaScript knowledge
- A code editor

## Getting Started

First, create a new directory...
```

## Writing Documentation

Documentation pages live in `src/content/docs/` and are organized by category.

### Step 1: Choose or Create a Category

Documentation is organized into categories like `tutorials`, `development`, or `guides`. Each category has its own folder with an `index.md` file.

### Step 2: Create the File

Add a new markdown file in the category folder:

```
src/content/docs/tutorials/my-tutorial.md
```

### Step 3: Add Documentation Frontmatter

```markdown
---
title: "My Tutorial"
description: "What this tutorial covers"
---

Tutorial content here...
```

Documentation uses a simpler schema than blog posts - just `title` and `description` are required.

## Markdown Features

Make your content engaging with these markdown features.

### Headings

Use headings to structure your content:

```markdown
# Main Title (H1) - Usually set by frontmatter title
## Major Section (H2)
### Subsection (H3)
#### Minor Heading (H4)
```

### Code Blocks

Add syntax-highlighted code blocks:

````markdown
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```
````

Supported languages include: `javascript`, `typescript`, `python`, `bash`, `json`, `css`, `html`, and many more.

### Lists

Create ordered and unordered lists:

```markdown
Unordered list:
- First item
- Second item
- Third item

Ordered list:
1. Step one
2. Step two
3. Step three
```

### Links

Link to other pages:

```markdown
[External link](https://example.com)
[Internal link](/docs/tutorials/)
[Relative link](./another-page/)
```

### Images

Add images from the public folder:

```markdown
![Alt text](/images/screenshot.png)
```

### Blockquotes

Highlight important information:

```markdown
> **Note:** This is an important callout that readers should pay attention to.
```

### Tables

Present data in tables:

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

## Organizing Content with Topics

Topics help readers find related content. When creating content:

1. **Choose the right topic/category** - Place content where users expect to find it
2. **Use descriptive filenames** - `getting-started.md` is better than `gs.md`
3. **Link related content** - Add "Next Steps" sections with links to related pages
4. **Keep a consistent structure** - Use similar heading patterns across pages

## Content Tips

### Write Clear Titles

- Be specific: "Setting Up VS Code for Astro" not "Editor Setup"
- Use action words for tutorials: "Creating Your First Component"
- Keep titles concise but descriptive

### Write Good Descriptions

Descriptions appear in search results and social shares:

- Summarize the content in one sentence
- Include relevant keywords
- Keep under 160 characters

### Structure for Scanning

Readers often scan before reading:

- Use descriptive headings
- Keep paragraphs short (3-4 sentences)
- Use lists for multiple items
- Highlight key terms in **bold**

## Next Steps

- [Tutorials Overview](/docs/tutorials/) - Explore more tutorials
- [Getting Started](/docs/tutorials/getting-started/) - Set up your project
- [Deployment Guide](/docs/guides/deployment/) - Publish your content
