import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createAgent } from '@ui-sdk/react/agent';
import { expect, test } from 'vitest';
import { App } from './App';
import { resources } from './resources';

const agent = createAgent();
const count = (category: string) => resources.filter((resource) => resource.category === category).length;

test('search, category selection, clearing, and empty-state reset change the rendered collection', async () => {
  const user = userEvent.setup();
  render(<App />);
  expect(screen.getAllByRole('listitem')).toHaveLength(resources.length);
  await user.click(screen.getByRole('radio', { name: /^Tools / }));
  expect(screen.getAllByRole('listitem')).toHaveLength(count('tools'));
  await user.type(screen.getByRole('searchbox'), 'lenso');
  expect(screen.getByText('No matching resources.')).toBeTruthy();
  expect(location.search).toBe('?category=tools&q=lenso');
  await user.click(screen.getByRole('button', { name: 'Clear search' }));
  expect(screen.getAllByRole('listitem')).toHaveLength(count('tools'));
  expect(document.activeElement).toBe(screen.getByRole('searchbox'));
  await user.type(screen.getByRole('searchbox'), 'not-a-resource');
  await user.click(screen.getByRole('button', { name: 'Reset filters' }));
  expect(screen.getAllByRole('listitem')).toHaveLength(resources.length);
  expect(location.search).toBe('');
});

test('a shared URL restores filters and keyboard arrows change category', async () => {
  history.replaceState(null, '', '/?category=libraries&q=react');
  const user = userEvent.setup();
  render(<App />);
  expect((screen.getByRole('searchbox') as HTMLInputElement).value).toBe('react');
  expect(screen.getByRole('heading', { name: 'Lenso UI' })).toBeTruthy();
  expect(screen.queryByRole('heading', { name: 'ViteHub Kit' })).toBeNull();
  const libraries = screen.getByRole('radio', { name: /^Libraries / });
  libraries.focus();
  await user.keyboard('{ArrowRight}');
  expect(screen.getByRole('radio', { name: /^Tools / }).getAttribute('aria-checked')).toBe('true');
  await user.keyboard('{ArrowLeft}');
  expect(libraries.getAttribute('aria-checked')).toBe('true');
  await user.click(screen.getByRole('searchbox'));
  await user.keyboard('{Escape}');
  expect(screen.getAllByRole('listitem')).toHaveLength(count('libraries'));
});

test('theme changes are visible and persist, and the search shortcut focuses the search field', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: 'Toggle color theme' }));
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(localStorage.getItem('awesome-ui-sdk-theme')).toBe('dark');
  await user.click(screen.getByRole('button', { name: 'Toggle color theme' }));
  expect(document.documentElement.dataset.theme).toBe('light');
  await user.keyboard('/');
  expect(document.activeElement).toBe(screen.getByRole('searchbox'));
});

test('the agent can find named controls and search, select a category, change the theme, and reset', async () => {
  render(<App />);
  const snapshot = agent.snapshot().filter((entry) => !entry.offPage && entry.component !== 'more');
  for (const entry of snapshot) expect(entry.label).toBeTruthy();
  expect(snapshot.map((entry) => entry.label)).toEqual(expect.arrayContaining(['Search resources', 'Resource category', 'Toggle color theme']));

  let result;
  await act(async () => {
    result = await agent.act({ steps: [{ ref: 'Search resources', action: 'setValue', args: ['lenso'] }] });
  });
  expect(result).toMatchObject({ ok: true });
  expect((screen.getByRole('searchbox') as HTMLInputElement).value).toBe('lenso');
  expect(screen.getAllByRole('listitem')).toHaveLength(1);

  const category = snapshot.find((entry) => entry.label === 'Resource category')!;
  expect(category.items).toBeTruthy();
  const tools = category.items!.find((item) => item.label.startsWith('Tools '))!;
  expect(tools).toBeTruthy();
  await act(async () => {
    result = await agent.act({ steps: [{ ref: 'Resource category', action: 'setValue', args: [tools.value] }, { ref: 'Toggle color theme', action: 'press' }] });
  });
  expect(result).toMatchObject({ ok: true });
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(screen.getByText('No matching resources.')).toBeTruthy();
  await waitFor(() => expect(agent.snapshot().some((entry) => entry.label === 'Reset filters')).toBe(true));
  await act(async () => {
    result = await agent.act({ steps: [{ ref: 'Reset filters', action: 'press' }] });
  });
  expect(result).toMatchObject({ ok: true });
  expect(screen.getAllByRole('listitem')).toHaveLength(resources.length);
});
