# Resource website

The directory reads the curated entries directly from the root `README.md`. Add or edit resources there; do not maintain a second resource dataset. Only the four resource section headings are parsed. Keep their entry format as documented in `CONTRIBUTING.md`.

From the repository root, with Bun installed:

```sh
bun install --frozen-lockfile
bun run dev
bun run test
bun run build
bun run preview
```

Next.js App Router pre-renders the full collection into the homepage HTML. The server reads `README.md` at build time and passes only the parsed entries to the interactive directory. Resource names, descriptions, and links are readable without JavaScript. Search and category filtering run in the browser; shared query parameters are restored after hydration. Filtered URLs canonicalize to the unfiltered homepage.

The site is hosted on Vercel at [awesome-ui-sdk.dev](https://awesome-ui-sdk.dev/). Vercel is connected to this GitHub repository and deploys `main` to production. `vercel.json` selects the Next.js framework and runs tests before building. GitHub Actions also checks tests and builds for pull requests and changes to `main`; it does not deploy the site. `bun run preview` serves the production build locally using `next start`.

Metadata uses the Next.js Metadata API: a canonical production URL, Open Graph and Twitter cards, and a generated social image. The homepage includes CollectionPage and ItemList structured data matching its actual entries and visual ordering. `/robots.txt` advertises `/sitemap.xml`, which lists the canonical homepage. Vercel preview builds are marked noindex and disallowed by their robots file. No search-engine ranking or indexing outcome is implied by these technical settings.

Cloudflare manages the domain and DNS. The apex A records use Vercel's recommended addresses, and `www` uses the project's Vercel DNS CNAME with a 308 redirect to the apex domain. Records are DNS-only, so Vercel serves HTTPS directly. Read the current project domain settings in Vercel before changing DNS targets.

## Design direction

The requested reference is [ui-sdk.dev](https://ui-sdk.dev/): Geist typography, a light gray canvas, oversized regular-weight headings, square controls, fine dividers, and blue links. The website uses an independent text wordmark and identifies itself as a community collection.

Design read: a resource directory for UI SDK developers, using the official site's typographic language. ENERGY 2 / RHYTHM 1 / MOTION 1. Large type establishes the focal point; open list rows make descriptions easy to compare; the blue accent identifies resource links and keyboard focus. Motion is limited to control state transitions and respects reduced motion. Light and dark themes follow the system initially, with a saved manual override when browser storage is available.

Search checks all query words against each resource's name, description, category heading, and URL. Category filtering intersects with search. Counts on category controls describe the full collection; the result count describes the filtered view. Empty results offer a reset action. All content ships with the page, so filtering needs no loading request.

The page uses UI SDK Input, Segmented Control, Button, and shortcuts, plus the agent bridge and WebMCP registration. Browser-only initialization happens after hydration; server and initial client renders use the same filter state. The theme script runs before paint, and CSS selects the matching theme icon without duplicating theme state in React. An agent can change search and category filters through the same callbacks as a person. Tests verify the parsed collection, server-rendered resource links, filter behavior, URL restoration, keyboard navigation, theme changes, and agent actions.

Geist is bundled locally through Fontsource under its SIL Open Font License. UI SDK and all other dependencies retain their own licenses and release terms.
