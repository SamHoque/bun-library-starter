# Bun TypeScript Library Starter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Bun](https://img.shields.io/badge/Runtime-Bun-black?logo=bun)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Bunup](https://img.shields.io/badge/Build-Bunup-F0DB4F)](https://bunup.dev)
[![Biome](https://img.shields.io/badge/Lint%2FFormat-Biome-60A5FA)](https://biomejs.dev/)

A modern, production-ready starter template for building and publishing TypeScript libraries with Bun. Comes with dual ESM/CJS output, strict type checking, automated code quality enforcement, and git hook integration -- all zero-config out of the box.

---

## Features

- **Dual module output** -- Builds to both ESM (`index.js`) and CommonJS (`index.cjs`) with TypeScript declaration files, fully compatible with the `exports` field in `package.json`
- **Bun runtime** -- Uses Bun as the package manager, script runner, and native test runner for maximum speed
- **[Bunup](https://bunup.dev)** -- Blazing-fast build tool powered by Bun's native bundler with watch mode support
- **Bun Test** -- Built-in test runner with native coverage reporting, no extra dependencies needed
- **[Biome](https://biomejs.dev/)** -- Rust-based formatter and linter enforcing consistent style (tab indentation, double quotes, sorted imports)
- **[ESLint](https://eslint.org/)** -- Complementary linting with TypeScript-ESLint and SonarJS rules for deeper code quality checks
- **[Knip](https://knip.dev/)** -- Detects and removes unused files, exports, and dependencies
- **[Lefthook](https://evilmartians.com/chronicles/lefthook-fast-and-powerful-hooks-manager-for-git)** -- Git hooks runner that enforces quality on `pre-commit`, `commit-msg`, and `pre-push`
- **Commitlint + Gitmoji** -- Structured, emoji-prefixed commit messages validated automatically
- **Strict TypeScript** -- `strict: true` plus `noUncheckedIndexedAccess`, `noImplicitOverride`, `noUnusedLocals`, and more
- **License banner** -- MIT license header automatically prepended to every output file

---

## Prerequisites

| Tool | Minimum version | Install |
|------|----------------|---------|
| [Bun](https://bun.sh) | 1.x | `curl -fsSL https://bun.sh/install \| bash` |
| Git | 2.x | [git-scm.com](https://git-scm.com) |

---

## Installation

### Option 1 -- GitHub Template

Click **[Use this template](https://github.com/SamHoque/bun-library-starter/generate)** on GitHub to create a new repository pre-populated with all files.

### Option 2 -- Bun Create

```bash
bun create SamHoque/bun-library-starter my-awesome-lib
cd my-awesome-lib
```

### Option 3 -- Clone manually

```bash
git clone https://github.com/SamHoque/bun-library-starter.git my-awesome-lib
cd my-awesome-lib
rm -rf .git && git init
```

### Post-installation setup

```bash
# 1. Install dependencies
bun install

# 2. Register git hooks
bunx lefthook install

# 3. Personalise the package
#    Edit package.json -- set name, version, description, author, repository, bugs, homepage
```

---

## Usage

### Development

Run the build in watch mode so the `dist/` folder rebuilds automatically on every file change:

```bash
bun run dev
```

### Build

Produce a production build (ESM + CJS + type declarations) inside `dist/`:

```bash
bun run build
```

### Testing

```bash
# Run the full test suite once
bun run test

# Generate a coverage report
bun run test:coverage
```

### Linting and Formatting

```bash
# ESLint -- report issues
bun run lint

# ESLint -- auto-fix issues
bun run lint:fix

# Biome -- report formatting and lint issues
bun run biome

# Biome -- auto-fix issues
bun run biome:fix

# Run ESLint + Biome + Knip together
bun run check

# Auto-fix everything that can be fixed
bun run check:fix
```

### Dead-code / dependency analysis

```bash
# Find unused files, exports, and dependencies
bun run knip

# Auto-fix safe removals
bun run knip:fix

# Production-only analysis (ignores devDependencies)
bun run knip:production

# Watch mode
bun run knip:watch
```

### Publishing

```bash
# 1. Bump the version (patch | minor | major)
npm version patch

# 2. Build (also runs automatically via prepublishOnly)
bun run build

# 3. Publish to npm
npm publish
```

The `prepublishOnly` hook guarantees a fresh build is always included in the published package.

---

## Scripts Reference

| Script | Description |
|--------|-------------|
| `bun run dev` | Watch mode -- rebuild `dist/` on every source change |
| `bun run build` | One-shot production build via bunup |
| `bun run test` | Run all tests with Bun's native test runner |
| `bun run test:coverage` | Run tests with built-in coverage report |
| `bun run lint` | Run ESLint |
| `bun run lint:fix` | Run ESLint with auto-fix |
| `bun run biome` | Run Biome formatter + linter checks |
| `bun run biome:fix` | Run Biome with auto-fix (`--write`) |
| `bun run knip` | Find unused files, exports, and dependencies |
| `bun run knip:fix` | Remove unused items automatically |
| `bun run knip:production` | Knip analysis scoped to production code |
| `bun run knip:watch` | Knip in watch mode |
| `bun run check` | Run lint + biome + knip in sequence |
| `bun run check:fix` | Auto-fix all lint, format, and knip issues |

---

## Project Structure

```
bun-library-starter/
├── .config/                        # Tooling configuration
│   ├── commitlint.config.ts        # Commitlint rules (Gitmoji convention)
│   └── eslint.config.ts            # ESLint flat config (TypeScript + SonarJS)
├── src/
│   └── index.ts                    # Library entry point -- export your public API here
├── test/
│   └── index.test.ts               # Unit tests (Bun test runner)
├── dist/                           # Build output (git-ignored, generated by `bun run build`)
│   ├── index.js                    # ESM bundle
│   ├── index.cjs                   # CommonJS bundle
│   ├── index.d.ts                  # ESM TypeScript declarations
│   └── index.d.cts                 # CJS TypeScript declarations
├── biome.json                      # Biome formatter + linter config
├── knip.json                       # Knip unused-code config
├── lefthook.yml                    # Git hooks (pre-commit, commit-msg, pre-push)
├── tsconfig.json                   # TypeScript compiler options
├── package.json
├── bun.lock
└── LICENSE                         # MIT
```

---

## Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository and create a feature branch:
   ```bash
   git checkout -b feat/my-feature
   ```
2. Install dependencies and hooks:
   ```bash
   bun install && bunx lefthook install
   ```
3. Make your changes. All commits must follow the **Gitmoji** convention -- the `commit-msg` hook validates this automatically. Example:
   ```
   feat: add new utility function
   fix: correct edge case in parser
   docs: update README examples
   ```
4. Ensure all checks pass before pushing:
   ```bash
   bun run check && bun run test && bun run build
   ```
5. Open a pull request against `main`.

### Git Hook Summary

| Hook | Checks run |
|------|-----------|
| `pre-commit` | ESLint, Biome, Knip (parallel) |
| `commit-msg` | Commitlint (Gitmoji format) |
| `pre-push` | Bun test, bunup build, Knip production (parallel) |

---

## License

[MIT](./LICENSE) -- Copyright (c) 2025 Sam Hoque
