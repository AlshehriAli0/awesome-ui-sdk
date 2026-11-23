export const categories = [
  { id: 'libraries', label: 'Libraries', heading: 'Component libraries' },
  { id: 'adapters', label: 'Adapters', heading: 'Framework adapters' },
  { id: 'tools', label: 'Tools', heading: 'Tools' },
  { id: 'showcases', label: 'Showcases', heading: 'Examples and showcases' },
  { id: 'official', label: 'Official', heading: 'Official resources' },
] as const;

export type Category = (typeof categories)[number]['id'];
const categoryForHeading = new Map<string, Category>(categories.map((category) => [category.heading, category.id]));
const headingForCategory = new Map<Category, string>(categories.map((category) => [category.id, category.heading]));

export const frameworks = [
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'svelte', label: 'Svelte' },
  { id: 'solid', label: 'Solid' },
  { id: 'web-components', label: 'Web Components' },
  { id: 'angular', label: 'Angular' },
  { id: 'ember', label: 'Ember' },
  { id: 'octane', label: 'Octane' },
] as const;

export type Framework = (typeof frameworks)[number]['id'];
export const frameworkFilters = [{ id: 'all', label: 'All frameworks' }, ...frameworks] as const;
export type FrameworkFilter = (typeof frameworkFilters)[number]['id'];
const frameworkIds = new Set<string>(frameworks.map(({ id }) => id));

export type Resource = {
  name: string;
  url: string;
  description: string;
  category: Category;
  frameworks: Framework[];
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

    const [, name, url, text] = entry;
    const metadata = text.match(/\s*<!-- frameworks:\s*([\w -]+?)\s*-->\s*$/);
    const body = metadata ? text.slice(0, metadata.index) : text;
    const runtimeIds = metadata?.[1].split(/\s+/) ?? [];
    const links = [...body.matchAll(/\[([^\]]+)\]\((https:\/\/[^)]+)\)/g)];
    const description = body.slice(0, links[0]?.index ?? body.length).trim();
    resources.push({
      name,
      url,
      category,
      description,
      frameworks: [...new Set(runtimeIds.filter((id): id is Framework => frameworkIds.has(id)))],
      links: links.map((link) => ({ label: link[1], url: link[2] })),
    });
  }

  return resources;
}

export function filterResources(
  resources: Resource[],
  query: string,
  category: Category | 'all',
  framework: FrameworkFilter = 'all',
) {
  const words = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return resources.filter((resource) => {
    const categoryName = headingForCategory.get(resource.category);
    const text = `${resource.name} ${resource.description} ${categoryName} ${resource.url}`.toLocaleLowerCase();
    return (category === 'all' || resource.category === category)
      && (framework === 'all' || resource.frameworks.includes(framework))
      && words.every((word) => text.includes(word));
  });
}
