import { expect, test } from 'vitest';
import { categories, filterResources, parseResources } from '../src/lib/resources';
import { resources } from '../src/lib/resource-content';

test('the collection includes the supplied ecosystem projects once, with valid links', () => {
  expect(resources.length).toBeGreaterThan(0);
  expect(new Set(resources.map((resource) => resource.url)).size).toBe(resources.length);
  for (const name of ['Lenso UI', 'SPEC-01 Hardware', 'UI SDK Agent Inspector', 'ui-chords', 'UI SDK Demo', 'ouuo Mechanical Keyboard']) {
    expect(resources.some((resource) => resource.name === name)).toBe(true);
  }
  for (const resource of resources) {
    expect(new URL(resource.url).protocol).toBe('https:');
    expect(resource.description).not.toContain('](');
    expect(resource.description.endsWith('.')).toBe(true);
  }
});

test('only curated category entries become resources; supporting links stay with their entry', () => {
  expect(parseResources(`## Tools\n- [Inspector](https://example.com/) - Inspect the bridge. [Source](https://github.com/example/tool).\n## Contributing\n- [Not a resource](https://example.com/contribute) - Contribute here.`)).toEqual([
    { name: 'Inspector', url: 'https://example.com/', description: 'Inspect the bridge.', category: 'tools', frameworks: [], links: [{ label: 'Source', url: 'https://github.com/example/tool' }] },
  ]);
});

test('framework metadata supports multiple runtimes without changing descriptions or links', () => {
  const input = `## Tools\n- [Inspector](https://example.com/) - Inspect the bridge. <!-- frameworks: react vue react unknown -->\n- [Second tool](https://example.org/) - Second tool. [Source](https://github.com/example/tool). <!-- frameworks: web-components -->`;
  const [first, second] = parseResources(input);
  expect(first).toMatchObject({ description: 'Inspect the bridge.', frameworks: ['react', 'vue'], links: [] });
  expect(second).toMatchObject({ description: 'Second tool.', frameworks: ['web-components'], links: [{ label: 'Source', url: 'https://github.com/example/tool' }] });
});

test('framework filtering intersects with search and category, including cross-framework resources', () => {
  expect(filterResources(resources, 'audio', 'libraries', 'vue').map(({ name }) => name)).toEqual(['audio/ui']);
  expect(filterResources(resources, 'audio', 'libraries', 'solid')).toEqual([]);
  expect(filterResources(resources, '', 'adapters', 'octane').map(({ name }) => name)).toEqual(['ui-sdk-octane']);
  expect(filterResources(resources, 'web', 'showcases', 'web-components').map(({ name }) => name)).toContain('Perpetual');
});

test('search combines words, ignores case and whitespace, and intersects with the category', () => {
  expect(filterResources(resources, '  REACT   stylex ', 'all').map((resource) => resource.name)).toEqual(['Lenso UI']);
  expect(filterResources(resources, 'agent', 'tools').map((resource) => resource.name)).toEqual(['UI SDK Agent Inspector']);
  expect(filterResources(resources, 'lenso', 'tools')).toEqual([]);
  for (const category of categories) {
    expect(filterResources(resources, '   ', category.id).every((resource) => resource.category === category.id)).toBe(true);
  }
});

test('framework adapters are parsed into their own category and excluded from libraries', () => {
  const adapters = filterResources(resources, '', 'adapters');
  expect(adapters.map((resource) => resource.name)).toEqual(['ember-ui-sdk', 'ngx-ui-sdk', 'ui-sdk-octane']);
  expect(filterResources(resources, 'framework angular', 'adapters').map((resource) => resource.name)).toEqual(['ngx-ui-sdk']);
  for (const adapter of adapters) {
    expect(filterResources(resources, adapter.name, 'libraries')).toEqual([]);
  }
});
