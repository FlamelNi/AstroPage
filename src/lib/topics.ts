export type Topic = {
  slug: string;
  label: string;
  type: "docs" | "blog";
};

export const TOPICS: Topic[] = [
  { slug: "tutorials", label: "Tutorials", type: "docs" },
  { slug: "development", label: "Development", type: "docs" },
  { slug: "devlog", label: "Dev Log", type: "blog" },
  { slug: "daily-life", label: "Daily Life", type: "blog" },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return TOPICS.find((topic) => topic.slug === slug);
}

export function getDocTopics(): Topic[] {
  return TOPICS.filter((topic) => topic.type === "docs");
}

/**
 * Derives doc topics from the docs content collection.
 * Returns unique top-level categories based on the first segment of doc slugs.
 */
export async function getDocTopicsFromCollection(): Promise<Topic[]> {
  const { getCollection } = await import("astro:content");
  const docs = await getCollection("docs");

  // Extract unique top-level slugs (first segment before any slash)
  const topLevelSlugs = new Set<string>();
  for (const doc of docs) {
    const firstSegment = doc.slug.split("/")[0];
    if (firstSegment) {
      topLevelSlugs.add(firstSegment);
    }
  }

  // Convert slugs to Topic objects
  const topics: Topic[] = Array.from(topLevelSlugs).map((slug) => ({
    slug,
    label: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
    type: "docs" as const,
  }));

  return topics.sort((a, b) => a.label.localeCompare(b.label));
}

export function getBlogTopics(): Topic[] {
  return TOPICS.filter((topic) => topic.type === "blog");
}
