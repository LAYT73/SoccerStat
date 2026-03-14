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
- `yarn preview` - preview production build locally
- `yarn typecheck` - run TypeScript project references check
- `yarn lint` - run ESLint checks
- `yarn lint:fix` - auto-fix lint issues where possible
- `yarn format` - format project files with Prettier
- `yarn format:check` - verify formatting without writing
- `yarn check` - standard local quality gate (`typecheck + lint`)
- `yarn check:strict` - strict local quality gate (`check + format:check`)

## DX Notes

- Vite uses `vite-plugin-checker`, so TypeScript and ESLint errors are visible directly in dev overlay.
- `vite-tsconfig-paths` keeps path resolution consistent with tsconfig.
- `eslint-config-prettier` avoids conflicts between linting and formatting.
- Pre-commit runs `lint-staged` via Husky to keep changes clean before commits.
