# Awesome UI SDK [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of component libraries, framework adapters, tools, and examples for [Vercel UI SDK](https://ui-sdk.dev/).

[UI SDK](https://github.com/vercel-labs/ui) provides a framework-free TypeScript core for UI behaviors, with adapters for React, Vue, Svelte, Solid, and Web Components. This list covers that project's ecosystem.

An independent community list, unaffiliated with Vercel.

[Browse and search the collection](https://awesome-ui-sdk.dev/).

## Contents

- [Official resources](#official-resources)
- [Component libraries](#component-libraries)
- [Framework adapters](#framework-adapters)
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

- [audio/ui](https://www.audio-ui.dev/) - Audio controls with custom UI SDK primitives for knobs, faders, pads, and other audio interfaces, with React, Vue, Svelte, and Web Components adapters. Audio processing uses the library's own engine. [Source](https://github.com/ouestlabs/audio-ui) · [UI SDK integration](https://github.com/ouestlabs/audio-ui/blob/main/packages/primitives/src/knob/knob.ts).
- [Eskais UI](https://github.com/p-otero/eskais-ui) - React components built on UI SDK with semantic theme tokens and agent support, distributed through a shadcn-style registry. In development.
- [HextaUI (UI SDK collection)](https://hextaui.com/docs/ui-sdk-color-picker) - Styled React components in HextaUI's dedicated UI SDK collection, including color picker, token input, tree, and timeline. Other parts of the library use Base UI. [Source](https://github.com/preetsuthar17/hextaui/tree/main/components/ui).
- [Keyframery](https://keyframery.com/) - Animated React components built on UI SDK, with plain CSS motion styles and a shadcn-compatible registry. [Source](https://github.com/keyframery/keyframery).
- [Lenso UI](https://ui.lenso.dev/) - React components with StyleX styling, glass materials, and UI SDK interactions. [Source](https://github.com/LioRael/lenso-ui) · [UI SDK dependencies](https://github.com/LioRael/lenso-ui/blob/main/packages/ui/package.json).
- [Sadu](https://sadu-ui.pages.dev/) - React components built on UI SDK with Al Sadu weaving-inspired styles, English and Arabic labels, and right-to-left layouts, distributed through a shadcn registry. [Source](https://github.com/y0u-0/sadu-ui) · [UI SDK integration](https://github.com/y0u-0/sadu-ui/blob/main/src/sadu/sadu-switch.tsx).
- [SPEC-01 Hardware](https://spec-01.vercel.app/) - Hardware-inspired React components and device examples built on UI SDK behaviors, distributed through a shadcn-compatible registry. [Source and integration details](https://github.com/shuding/spec-01).
- [ui-sdk-elements](https://jagreehal.github.io/ui-sdk-elements/) - Themed UI SDK Web Components and custom primitives, with an on-demand loader and a Vite plugin for building component CDNs. [Source](https://github.com/jagreehal/ui-sdk-elements) · [UI SDK integration](https://github.com/jagreehal/ui-sdk-elements/blob/main/src/components/step-grid.ts).
- [UISet](https://uiset.dev/) - Styled React components, themes, kits, and page templates built on UI SDK, installable through a shadcn registry. [Source](https://github.com/superzero11/uiset) · [UI SDK integration](https://github.com/superzero11/uiset/blob/main/registry/uiset/ui/button.tsx).
- [ViteHub Kit](https://github.com/vite-hub/vitehub/tree/main/packages/kit) - Additional headless Vue parts, a Nuxt module, and CSS styles for UI SDK. [Integration details](https://github.com/vite-hub/vitehub/blob/main/packages/kit/README.md).

## Framework adapters

- [ember-ui-sdk](https://dhaulagiri.github.io/ui-sdk-ember/) - Unofficial, experimental Ember adapter that renders UI SDK core primitives as unstyled Glimmer components. [Source](https://github.com/Dhaulagiri/ui-sdk-ember) · [UI SDK integration](https://github.com/Dhaulagiri/ui-sdk-ember/blob/main/packages/ember-ui-sdk/src/dialog/dialog.gts).
- [ngx-ui-sdk](https://efuturetoday.github.io/ui-sdk-angular/) - Unofficial, experimental Angular adapter exposing UI SDK core primitives as directives on application markup, with optional themes. [Source](https://github.com/efuturetoday/ui-sdk-angular) · [UI SDK integration](https://github.com/efuturetoday/ui-sdk-angular/blob/main/projects/core/dialog/src/dialog.ts).

## Tools

- [UI SDK Agent Inspector](https://github.com/Saif1803/uisdk-inspector) - Independent inspector for tracing agent bridge calls and linting UI SDK applications for agent readiness.

## Examples and showcases

- [Acme Board](https://ui-sdk-ember-board.vercel.app/) - Ember issue board with a custom UI SDK kanban primitive for moving cards and undo, plus an agent-operated issue editor built with ember-ui-sdk. [Source](https://github.com/Dhaulagiri/ember-board) · [UI SDK integration](https://github.com/Dhaulagiri/ember-board/blob/main/src/kanban.ts).
- [Clickwheel](https://ipod-ui-sdk.vercel.app/) - iPod-style music player with custom UI SDK click-wheel and player primitives, Web Components controls, and agent actions. Music is synthesized separately with Web Audio. [Source](https://github.com/ericvalens/clickwheel) · [UI SDK integration](https://github.com/ericvalens/clickwheel/blob/main/src/primitives.js).
- [ouuo Mechanical Keyboard](https://ouuo.dev/keyboard/) - Interactive mechanical keyboard with a custom UI SDK primitive and React slider and switch controls, plus optional sound. [Source](https://github.com/LioRael/ouuo/tree/main/apps/keyboard).
- [Perpetual](https://rolex-ui-sdk.vercel.app/) - Interactive wristwatch with custom UI SDK watch and crown primitives, Web Components bindings, and agent actions; three.js renders the watch. [Source](https://github.com/ericvalens/perpetual) · [UI SDK integration](https://github.com/ericvalens/perpetual/blob/main/src/primitives.js).
- [Radio Tuner](https://justin-cole.vercel.app/) - 3D radio with a custom UI SDK station selector and React agent bridge, using HTML-in-Canvas to display controls on the model. Requires Chrome or Edge 157 or later. [Source](https://github.com/justin-at-straker/radio-tuner) · [UI SDK integration](https://github.com/justin-at-straker/radio-tuner/blob/main/src/ui/station.ts).
- [ui-chords](https://www.ui-chords.dev/) - Browser chord instrument with a custom UI SDK joystick primitive and React transport controls for loop recording and playback. [Source](https://github.com/paisanos-io/ui-chords) · [UI SDK integration](https://github.com/paisanos-io/ui-chords/blob/main/components/joystick/joystick.ts).
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

To run the searchable resource website locally, see [development instructions](CONTRIBUTING.md#developing-the-website).

## License

This list is released under [CC0 1.0 Universal](LICENSE). Linked projects retain their own licenses.
