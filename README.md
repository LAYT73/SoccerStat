# SoccerStat

Frontend project on React + TypeScript + Vite with a focus on convenient day-to-day development workflow.

## Stack

- React 19
- TypeScript 5
- Vite 8
- ESLint 9 (flat config)
- Prettier 3
- Husky + lint-staged

## Quick Start

```bash
yarn
yarn dev
```

## Scripts

- `yarn dev` - run dev server
- `yarn dev:host` - run dev server and expose over local network
- `yarn build` - type-check and production build
- `yarn analyze` - production build with bundle visualizer report
- `yarn preview` - preview production build locally
- `yarn typecheck` - run TypeScript project references check
- `yarn lint` - run ESLint checks
- `yarn lint:fix` - auto-fix lint issues where possible
- `yarn format` - format project files with Prettier
- `yarn format:check` - verify formatting without writing
- `yarn validate` - standard local quality gate (`typecheck + lint`)
- `yarn validate:strict` - strict local quality gate (`validate + format:check`)
