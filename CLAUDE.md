# CLAUDE.md — Tredgate Complex Automation

Guidance for Claude Code when working in this repository. Mirrors [.github/copilot-instructions.md](.github/copilot-instructions.md) with pointers into the richer per-area instruction files so you always load the right rules for the file you're touching.

## Project Purpose

Playwright + TypeScript test automation for the **Tredgate QA Hub** — a React 19 SPA training SUT. The repo is a teaching artifact that demonstrates three **progressive, side-by-side** test-automation approaches. Never refactor one approach into another — they exist for comparison.

| Approach         | Folder                | What it demonstrates                                                       |
| ---------------- | --------------------- | -------------------------------------------------------------------------- |
| **Spaghetti**    | `tests/spaghetti/`    | Anti-patterns: inline selectors, hardcoded data, no abstraction            |
| **Standard POM** | `tests/standard-pom/` | Classic Page Object Model from tutorials                                   |
| **Advanced**     | `tests/advanced/`     | Fluent API, Component Model, Procedures, i18n, typed data, App Main Object |

The shared framework under `src/` is consumed by the advanced approach via a custom fixture.

## Application Under Test

- **App**: Tredgate QA Hub — React 19, frontend-only, `localStorage`-backed, no real backend.
- **URL**: `http://localhost:5173` (Vite dev server, run separately).
- **Full reference**: [app_in_test_overview.md](app_in_test_overview.md) — login credentials, routes, data model, seed data, roles, test IDs.
- All interactive elements have `data-testid` — always prefer a test-id-based locator.
- Test-ID format: `<module>-<element>-<modifier>` (kebab-case), e.g. `login-input-username`.
- Seeded users: `tester/test123`, `lead/lead123`, `admin/admin123`.
- No network calls — only React renders + `localStorage` (keys prefixed `tqh_`).

## Tech Stack

- Playwright + TypeScript (strict)
- `dotenv` for secrets (`.env`, never commit — see `.env.example`)
- `cross-env` for `TEST_LANG` in npm scripts
- `@faker-js/faker` for generated test data
- CommonJS (`"type": "commonjs"`) — use `require()` for lazy imports inside circular dep chains (see Sidebar note below)

## Repository Layout

```
src/                                    # Shared framework consumed by advanced tests
├── qa_hub_main.ts                      # Facade (TredgateQAHubMain)
├── fixtures/qa_hub_context.ts          # Custom fixture exposing `qaHub`
├── pages/
│   ├── base_page.page.ts               # Abstract BasePage
│   ├── components/                     # sidebar, data_table, wizard, ...
│   └── <module>/<page>.page.ts         # Page Objects per module
├── procedures/                         # Business-level precondition helpers
├── test-data/                          # types.ts, qa_hub_data.ts, generators.ts, credential_manager.ts
├── i18n.ts/                            # Language dictionaries
└── configs/                            # App config (URL, env)

tests/
├── spaghetti/                          # Approach 1
├── standard-pom/                       # Approach 2
└── advanced/                           # Approach 3 (consumes src/)

.github/
├── copilot-instructions.md             # Source of truth (Copilot)
├── instructions/                       # Area-specific instructions (see table below)
├── agents/                             # Persona specs for approach-specific writing
└── prompts/                            # Slash-command prompt templates

docs/
├── framework-guide.md                  # Human-readable full framework walkthrough
├── architecture.md
├── writing-tests.md
├── naming-conventions.md
└── getting-started.md
```

## Instruction Map — Load Before Editing

When editing or creating files in these paths, read the matching instructions file first:

| Path you're editing                                            | Read this                                                                                  |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `src/**`                                                       | [.github/instructions/framework.instructions.md](.github/instructions/framework.instructions.md)           |
| `tests/advanced/**`                                            | [.github/instructions/advanced.instructions.md](.github/instructions/advanced.instructions.md)             |
| `tests/advanced/components/**` or `src/pages/components/**`    | [.github/instructions/components.instructions.md](.github/instructions/components.instructions.md)         |
| `tests/advanced/pages/**` or `tests/standard-pom/pages/**`     | [.github/instructions/page-objects.instructions.md](.github/instructions/page-objects.instructions.md)     |
| `tests/advanced/procedures/**` or `src/procedures/**`          | [.github/instructions/procedures.instructions.md](.github/instructions/procedures.instructions.md)         |
| `tests/advanced/data/**` or `src/test-data/**`                 | [.github/instructions/test-data.instructions.md](.github/instructions/test-data.instructions.md)           |
| `tests/advanced/i18n/**` or `src/i18n.ts/**`                   | [.github/instructions/i18n.instructions.md](.github/instructions/i18n.instructions.md)                     |
| `playwright.config.ts` or fixtures                             | [.github/instructions/config-fixtures.instructions.md](.github/instructions/config-fixtures.instructions.md) |
| `tests/spaghetti/**`                                           | [.github/instructions/spaghetti.instructions.md](.github/instructions/spaghetti.instructions.md)           |
| `tests/standard-pom/**`                                        | [.github/instructions/standard-pom.instructions.md](.github/instructions/standard-pom.instructions.md)     |

## Naming Conventions

| Item               | Convention               | Example                                    |
| ------------------ | ------------------------ | ------------------------------------------ |
| Page Object class  | `<Page>Page`             | `LoginPage`, `DefectDetailPage`            |
| Component class    | `<Name>Component`        | `SidebarComponent`, `DataTableComponent`   |
| Procedure function | `<verb><Noun>`           | `createDefect()`, `loginAs()`              |
| Test data type     | `<Entity>Data`           | `DefectData`, `UserCredentials`            |
| Test file          | `<feature>.spec.ts`      | `login.spec.ts`, `defect-workflow.spec.ts` |
| Page Object file   | `<name>.page.ts`         | `login.page.ts`                            |
| Component file     | `<name>.comp.ts`         | `sidebar.comp.ts`                          |
| Procedure file     | `<name>.proc.ts`         | `test_plan.proc.ts`                        |
| Fixture file       | `<scope>_context.ts`     | `qa_hub_context.ts`                        |
| i18n key           | `texts.<page>.<element>` | `texts.login.submitButton`                 |

## Core Patterns (Advanced Approach)

- **Facade** `TredgateQAHubMain` (`src/qa_hub_main.ts`) extends `BasePage`; aggregates `testData`, `credentials`, `generators`; `open()` navigates and returns `LoginPage`.
- **Custom fixture** (`src/fixtures/qa_hub_context.ts`) exposes `{ qaHub: TredgateQAHubMain }`. Tests import `test` from the fixture file, not from `@playwright/test`.
- **Fluent API**: every action method returns `this` (same page) or a new Page Object (on navigation). Components expose `done()` to return to their parent.
- **Component model**: reusable UI chunks as classes extending generic `Component<TParent>` — composed into Page Objects as `readonly` properties.
- **Procedures**: business-level workflows that call Page Object methods (never `page` directly) and return the landing Page Object.
- **i18n**: assertion text comes from `texts.<page>.<element>`, resolved at import time from `TEST_LANG` (`en` default, `cs` supported).
- **Typed test data**: types in `types.ts`, static seed data in `qa_hub_data.ts`, faker-driven `Generators` accepting `Partial<T>` overrides. Credentials via `CredentialManager` reading `process.env`.

## Code Style

- `async`/`await` everywhere — never `.then()` chains in production code.
- Selectors: `page.locator('[data-testid="..."]')` for the shared framework (`src/`). Tests may use `getByTestId()` where the approach-specific instructions allow.
- `copilot-instructions.md` explicitly discourages native Playwright role/text selectors as primary — fall back to them only when no test-id exists.
- TypeScript strict; no `any` except in `tests/spaghetti/` (intentional mess).
- `expect` from `@playwright/test` — no custom assertion libraries.

## Hard Rules

1. **Never bypass the facade** — advanced tests go through the `qaHub` fixture, not individual pages.
2. **Never refactor** spaghetti or standard-POM tests into something cleaner — they exist to demonstrate anti-patterns / tutorial-grade code.
3. **Sidebar lazy-loading**: `SidebarComponent` uses `require()` (CommonJS) inside methods to break the `BasePage → Sidebar → Pages → BasePage` cycle. Never switch these to top-level `import` or `await import()`.
4. **Fluent returns**: action methods return `this` or a new page — never `void` in the advanced approach.
5. **Selectors**: `data-testid` first; role/text only when no test-id exists.
6. **Credentials**: always from `.env` via `CredentialManager` — never hardcoded in advanced tests.
7. **No network mocking / backend** — the app is localStorage-only. Reset state by clearing `localStorage` keys prefixed `tqh_` and reloading.
8. **Don't commit `.env`** — update `.env.example` if new variables are introduced.
9. **Playwright only** — don't add Jest/Mocha/Vitest/etc.

## Scripts

| Command                  | Description                  |
| ------------------------ | ---------------------------- |
| `npm test`               | Run all tests                |
| `npm run test:spaghetti` | Spaghetti suite              |
| `npm run test:standard`  | Standard POM suite           |
| `npm run test:advanced`  | Advanced suite               |
| `npm run test:en`        | Advanced, English assertions |
| `npm run test:cs`        | Advanced, Czech assertions   |
| `npm run test:headed`    | Visible browser              |
| `npm run test:ui`        | Playwright UI                |
| `npm run test:debug`     | Debug mode                   |
| `npm run report`         | Open HTML report             |

## Environment Variables

| Variable                              | Purpose                      | Default                 |
| ------------------------------------- | ---------------------------- | ----------------------- |
| `BASE_URL`                            | App URL                      | `http://localhost:5173` |
| `TEST_LANG`                           | i18n language for assertions | `en`                    |
| `TESTER_USERNAME` / `TESTER_PASSWORD` | Tester credentials           | `tester` / `test123`    |
| `LEAD_USERNAME` / `LEAD_PASSWORD`     | QA Lead credentials          | `lead` / `lead123`      |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD`   | Admin credentials            | `admin` / `admin123`    |

## Working with Tests

- Each test should be independent and runnable in isolation.
- Reset `localStorage` (`tqh_*`) before each test or suite as needed.
- Advanced tests should read like business stories — push technical steps into procedures/page objects.
- Use Playwright fixtures for shared setup (e.g. authenticated `qaHub`).
- The app must be running at `BASE_URL` before tests execute.

## Further Reading

- [.github/copilot-instructions.md](.github/copilot-instructions.md) — canonical Copilot instructions (source of truth; re-read if this file and that one disagree)
- [docs/framework-guide.md](docs/framework-guide.md) — full framework walkthrough
- [docs/architecture.md](docs/architecture.md) — the three approaches explained
- [docs/writing-tests.md](docs/writing-tests.md) — practical examples
- [docs/naming-conventions.md](docs/naming-conventions.md) — detailed naming rules
- [app_in_test_overview.md](app_in_test_overview.md) — SUT reference (routes, test IDs, seed data)
