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

Vite writes the static site to `dist/`. Deploy that directory to any static host. The page uses query parameters for shareable search and category filters; it needs no server or credentials.

The site is hosted on Vercel at [awesome-ui-sdk.dev](https://awesome-ui-sdk.dev/). Vercel is connected to this GitHub repository and deploys `main` to production. `vercel.json` runs tests before building and publishes `dist/`. GitHub Actions also checks tests and builds for pull requests and changes to `main`; it does not deploy the site.

Cloudflare manages the domain and DNS. The apex A records use Vercel's recommended addresses, and `www` uses the project's Vercel DNS CNAME with a 308 redirect to the apex domain. Records are DNS-only, so Vercel serves HTTPS directly. Read the current project domain settings in Vercel before changing DNS targets.

## Design direction

The requested reference is [ui-sdk.dev](https://ui-sdk.dev/): Geist typography, a light gray canvas, oversized regular-weight headings, square controls, fine dividers, and blue links. The website uses an independent text wordmark and identifies itself as a community collection.

Design read: a resource directory for UI SDK developers, using the official site's typographic language. ENERGY 2 / RHYTHM 1 / MOTION 1. Large type establishes the focal point; open list rows make descriptions easy to compare; the blue accent identifies resource links and keyboard focus. Motion is limited to control state transitions and respects reduced motion. Light and dark themes follow the system initially, with a saved manual override when browser storage is available.

Search checks all query words against each resource's name, description, category heading, and URL. Category filtering intersects with search. Counts on category controls describe the full collection; the result count describes the filtered view. Empty results offer a reset action. All content ships with the page, so filtering needs no loading request.

The page uses UI SDK Input, Segmented Control, Button, and shortcuts, plus the agent bridge and WebMCP registration. An agent can change search and category filters through the same callbacks as a person. Tests verify the parsed collection, filter behavior, URL restoration, keyboard navigation, theme changes, and agent actions.

Geist is bundled locally through Fontsource under its SIL Open Font License. UI SDK and all other dependencies retain their own licenses and release terms.
