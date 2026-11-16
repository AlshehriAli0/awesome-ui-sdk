import { App } from '../website/src/App';
import { resources } from '../website/src/content.server';
import { categories } from '../website/src/resources';
import { siteDescription, siteUrl } from '../website/src/site';

export default function HomePage() {
  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Awesome UI SDK',
    url: siteUrl,
    description: siteDescription,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: resources.length,
      itemListElement: categories.flatMap((category) => resources.filter((resource) => resource.category === category.id)).map((resource, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: { '@type': 'WebPage', name: resource.name, url: resource.url, description: resource.description },
      })),
    },
  };

  return (
    <>
      <App resources={resources} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection).replace(/</g, '\\u003c') }} />
    </>
  );
}
