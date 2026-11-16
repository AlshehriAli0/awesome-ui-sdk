import { expect, test } from 'vitest';
import { categories, filterResources, parseResources, resources } from './resources';

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
    { name: 'Inspector', url: 'https://example.com/', description: 'Inspect the bridge.', category: 'tools', links: [{ label: 'Source', url: 'https://github.com/example/tool' }] },
  ]);
});

test('search combines words, ignores case and whitespace, and intersects with the category', () => {
  expect(filterResources('  REACT   stylex ', 'all').map((resource) => resource.name)).toEqual(['Lenso UI']);
  expect(filterResources('agent', 'tools').map((resource) => resource.name)).toEqual(['UI SDK Agent Inspector']);
  expect(filterResources('lenso', 'tools')).toEqual([]);
  for (const category of categories) {
    expect(filterResources('   ', category.id).every((resource) => resource.category === category.id)).toBe(true);
  }
});
