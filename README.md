# Awesome UI SDK [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of component libraries, tools, and examples for [Vercel UI SDK](https://ui-sdk.dev/).

[UI SDK](https://github.com/vercel-labs/ui) provides a framework-free TypeScript core for UI behaviors, with adapters for React, Vue, Svelte, Solid, and Web Components. This list covers that project's ecosystem.

An independent community list, unaffiliated with Vercel.

[Browse and search the collection](https://liorael.github.io/awesome-ui-sdk/).

## Contents

- [Official resources](#official-resources)
- [Component libraries](#component-libraries)
- [Tools](#tools)
- [Examples and showcases](#examples-and-showcases)
- [Selection criteria](#selection-criteria)
- [Contributing](#contributing)
- [License](#license)

## Official resources

- [UI SDK](https://ui-sdk.dev/) - Official documentation and component reference. [Source](https://github.com/vercel-labs/ui).
- [Build a Component](https://ui-sdk.dev/docs/guides/build-a-component) - Walkthrough of building a reactions bar with UI SDK state, behaviors, and styling.
- [Built for Agents](https://ui-sdk.dev/docs/agents) - Documentation for the agent bridge, component actions, and WebMCP integration.
- [UI SDK Skill](https://ui-sdk.dev/docs/agents/skills) - Official skill for coding agents building with UI SDK.
- [LLM documentation index](https://ui-sdk.dev/llms.txt) - Entry point to machine-readable core, framework, agent, and guide documentation.

## Component libraries

- [Lenso UI](https://ui.lenso.dev/) - React components with StyleX styling, glass materials, and UI SDK interactions. [Source](https://github.com/LioRael/lenso-ui) · [UI SDK dependencies](https://github.com/LioRael/lenso-ui/blob/main/packages/ui/package.json).
- [SPEC-01 Hardware](https://spec-01.vercel.app/) - Hardware-inspired React components and device examples built on UI SDK behaviors, distributed through a shadcn-compatible registry. [Source and integration details](https://github.com/shuding/spec-01).
- [ViteHub Kit](https://github.com/vite-hub/vitehub/tree/main/packages/kit) - Additional headless Vue parts, a Nuxt module, and CSS styles for UI SDK. [Integration details](https://github.com/vite-hub/vitehub/blob/main/packages/kit/README.md).

## Tools

- [UI SDK Agent Inspector](https://github.com/Saif1803/uisdk-inspector) - Independent inspector for tracing agent bridge calls and linting UI SDK applications for agent readiness.

## Examples and showcases

- [ouuo Mechanical Keyboard](https://ouuo.dev/keyboard/) - Interactive mechanical keyboard with a custom UI SDK primitive and React slider and switch controls, plus optional sound. [Source](https://github.com/LioRael/ouuo/tree/main/apps/keyboard).
- [ui-chords](https://www.ui-chords.dev/) - Browser chord instrument with a joystick, loop recording, and keyboard controls; the site identifies UI SDK as its foundation.
- [UI SDK Demo](https://ui-sdkdemo.vercel.app/) - React and Next.js examples of toggles, forms, tabs, overlays, and other UI SDK components, with an exposed agent bridge.
- [Winamp UI SDK](https://github.com/rauchg/winamp-ui-sdk) - Web Components recreation of a music player using UI SDK controls, custom primitives, and WebMCP integration. [Demo](https://winamp-ui-sdk.vercel.app/).

## Selection criteria

- Resources must directly use, extend, teach, or inspect UI SDK from [vercel-labs/ui](https://github.com/vercel-labs/ui).
- For libraries and tools, provide source imports, package dependencies, or documentation showing the integration. A copied skill file or migration plan alone does not establish adoption.
- A showcase without public source may qualify when its live site explicitly identifies UI SDK usage. Such attribution is not an independent source-code audit.
- Describe the specific integration. A project using UI SDK for some controls does not imply its rendering, audio, or other application logic uses the SDK.
- Prefer resources with a usable demo, documented setup, or a clear workflow. Inclusion does not certify compatibility with every UI SDK release or independently tested behavior.

General UI libraries and tools without a demonstrated UI SDK integration are outside this list's scope. Each linked project retains its own license and release status.

## Contributing

Suggest a resource or improve an entry through a pull request. Include evidence of its UI SDK integration and follow the [contribution guidelines](CONTRIBUTING.md).

To run the searchable resource website locally, see [website development](website/README.md).

## License

This list is released under [CC0 1.0 Universal](LICENSE). Linked projects retain their own licenses.
