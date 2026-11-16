'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@ui-sdk/react/button';
import { Input, InputClear, InputGroup } from '@ui-sdk/react/input';
import { SegmentedControl, SegmentedControlItem } from '@ui-sdk/react/segmented-control';
import { useShortcut } from '@ui-sdk/react/shortcuts';
import { categories, filterResources, type Category, type Resource } from '../lib/resources';
import { ResourceList } from './resource-list';

const repository = 'https://github.com/LioRael/awesome-ui-sdk';
const filters = [{ id: 'all', label: 'All resources' }, ...categories] as const;

function readFilters() {
  const params = new URLSearchParams(location.search);
  const category = filters.find((filter) => filter.id === params.get('category'))?.id ?? 'all';
  return { query: params.get('q') ?? '', category };
}

function ThemeButton() {
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('awesome-ui-sdk-theme', next);
    } catch {
      // Private browsing can disable storage; the current page still changes theme.
    }
  }

  return (
    <Button className="theme-button" aria-label="Toggle color theme" onClick={toggleTheme} title="Toggle light or dark theme">
      <svg data-theme-icon="light" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </svg>
      <svg data-theme-icon="dark" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.5 13.2A8.5 8.5 0 0 1 10.8 3.5a8.5 8.5 0 1 0 9.7 9.7Z" />
      </svg>
    </Button>
  );
}

export function ResourceDirectory({ resources }: { resources: Resource[] }) {
  const [selection, setSelection] = useState<{ query: string; category: Category | 'all' }>({ query: '', category: 'all' });
  const search = useRef<HTMLInputElement>(null);
  const visibleResources = filterResources(resources, selection.query, selection.category);

  useEffect(() => {
    setSelection(readFilters());
    const onPopState = () => setSelection(readFilters());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useShortcut('/', () => search.current?.focus());
  useShortcut('mod+k', () => search.current?.focus());

  function updateSelection(query: string, category: Category | 'all') {
    setSelection({ query, category });
    const url = new URL(location.href);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    if (category !== 'all') url.searchParams.set('category', category);
    else url.searchParams.delete('category');
    history.replaceState(null, '', url);
  }

  return (
    <div className="page-shell">
      <a className="skip-link" href="#resources">Skip to resources</a>
      <header className="site-header">
        <a className="wordmark" href="./" aria-label="Awesome UI SDK home">awesome <span>/</span> ui sdk</a>
        <nav aria-label="Main navigation">
          <a href="https://ui-sdk.dev/">UI SDK</a>
          <a href={repository}>GitHub</a>
          <ThemeButton />
        </nav>
      </header>

      <main>
        <section className="intro" aria-labelledby="page-title">
          <h1 id="page-title">Good things, built with<br className="desktop-break" /> UI SDK.</h1>
          <div className="intro-bottom">
            <p>Component libraries, tools, and experiments from the UI SDK community.</p>
            <a className="primary-link" href={`${repository}/blob/main/CONTRIBUTING.md`}>Submit a resource</a>
          </div>
        </section>

        <section className="directory" aria-label="Resource directory">
          <div className="search-area">
            <InputGroup className="search-group" aria-label="Search actions">
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
              <Input ref={search} type="search" aria-label="Search resources" aria-controls="resources" placeholder="Search resources..." value={selection.query} onValueChange={(value) => updateSelection(value, selection.category)} onKeyDown={(event) => { if (event.key === 'Escape') updateSelection('', selection.category); }} />
              <InputClear aria-label="Clear search" className="clear-search">Clear</InputClear>
              <kbd aria-hidden="true">/</kbd>
            </InputGroup>
          </div>

          <SegmentedControl aria-label="Resource category" className="category-filters" value={selection.category} onValueChange={(value) => {
            const category = filters.find((filter) => filter.id === value);
            if (category) updateSelection(selection.query, category.id);
          }}>
            {filters.map((filter) => (
              <SegmentedControlItem value={filter.id} key={filter.id}>
                {filter.label}{' '}<span className="filter-count">{filter.id === 'all' ? resources.length : resources.filter((resource) => resource.category === filter.id).length}</span>
              </SegmentedControlItem>
            ))}
          </SegmentedControl>

          <div className="results-meta">
            <p role="status" aria-live="polite">{visibleResources.length} {visibleResources.length === 1 ? 'resource' : 'resources'}{selection.query.trim() && <> matching <span className="search-term">“{selection.query.trim()}”</span></>}</p>
            <a href={repository}>Curated on GitHub</a>
          </div>

          <div id="resources" tabIndex={-1}>
            {visibleResources.length ? <ResourceList resources={visibleResources} /> : (
              <div className="empty-state">
                <h2>No matching resources.</h2>
                <p>Try a different search or browse all categories.</p>
                <Button className="primary-link" onClick={() => { updateSelection('', 'all'); search.current?.focus(); }}>Reset filters</Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>An independent community collection. Unaffiliated with Vercel.</p>
        <a href={`${repository}/blob/main/CONTRIBUTING.md`}>Contribute on GitHub</a>
      </footer>
    </div>
  );
}
