import { categories, type Resource } from '../lib/resources';

export function ResourceList({ resources }: { resources: Resource[] }) {
  return categories.map((category) => {
    const entries = resources.filter((resource) => resource.category === category.id);
    if (!entries.length) return null;

    return (
      <section className="resource-section" key={category.id} aria-labelledby={`heading-${category.id}`}>
        <h2 id={`heading-${category.id}`}>{category.heading}</h2>
        <ol className="resource-list">
          {entries.map((resource, index) => (
            <li className="resource-row" key={resource.url}>
              <span className="resource-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div className="resource-info">
                <h3><a href={resource.url}>{resource.name}</a></h3>
                <p>{resource.description}</p>
              </div>
              <div className="resource-links">
                <a href={resource.url} aria-label={`${resource.url.startsWith('https://github.com/') ? 'Repository' : 'Website'} for ${resource.name}`}>
                  {resource.url.startsWith('https://github.com/') ? 'Repository' : 'Website'}
                </a>
                {resource.links.slice(0, 1).map((link) => (
                  <a key={link.url} href={link.url} aria-label={`${resource.name}: ${link.label}`}>{link.label.startsWith('Source') ? 'Source' : link.label === 'Integration details' ? 'Details' : link.label}</a>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </section>
    );
  });
}
