import readme from '../../README.md?raw';

export const categories = [
  { id: 'libraries', label: 'Libraries', heading: 'Component libraries' },
  { id: 'tools', label: 'Tools', heading: 'Tools' },
  { id: 'showcases', label: 'Showcases', heading: 'Examples and showcases' },
  { id: 'official', label: 'Official', heading: 'Official resources' },
] as const;

export type Category = (typeof categories)[number]['id'];
const categoryForHeading = new Map<string, Category>(categories.map((category) => [category.heading, category.id]));
const headingForCategory = new Map<Category, string>(categories.map((category) => [category.id, category.heading]));
export type Resource = {
  name: string;
  url: string;
  description: string;
  category: Category;
  links: { label: string; url: string }[];
};

export function parseResources(markdown: string): Resource[] {
  const resources: Resource[] = [];
  let category: Category | undefined;

  for (const line of markdown.split('\n')) {
    if (line.startsWith('## ')) {
      category = categoryForHeading.get(line.slice(3));
    }
    if (!category) continue;

    const entry = line.match(/^- \[([^\]]+)\]\((https:\/\/[^)]+)\) - (.+)$/);
    if (!entry) continue;

    const [, name, url, body] = entry;
    const links = [...body.matchAll(/\[([^\]]+)\]\((https:\/\/[^)]+)\)/g)];
    const description = body.slice(0, links[0]?.index ?? body.length).trim();
    resources.push({
      name,
      url,
      category,
      description,
      links: links.map((link) => ({ label: link[1], url: link[2] })),
    });
  }

  return resources;
}

export const resources = parseResources(readme);

export function filterResources(query: string, category: Category | 'all') {
  const words = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return resources.filter((resource) => {
    const categoryName = headingForCategory.get(resource.category);
    const text = `${resource.name} ${resource.description} ${categoryName} ${resource.url}`.toLocaleLowerCase();
    return (category === 'all' || resource.category === category) && words.every((word) => text.includes(word));
  });
}
