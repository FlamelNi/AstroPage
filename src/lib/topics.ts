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

export function getBlogTopics(): Topic[] {
  return TOPICS.filter((topic) => topic.type === "blog");
}
