# Tredgate Complex Automation — Copilot Instructions

## Project Purpose

This is a **Playwright test automation** repository for the **Tredgate QA Hub** application — a React SPA used as a training SUT (System Under Test). The repo demonstrates three progressive approaches to test automation:

1. **Spaghetti** (`tests/spaghetti/`) — intentionally bad: long procedural tests, inline data, no abstraction.
2. **Standard POM** (`tests/standard-pom/`) — classic Page Object Model, better but still limited.
3. **Advanced** (`tests/advanced/`) — production-grade architecture with Fluent API, Component Model, Procedures, i18n, and typed test data.

The three approaches exist side-by-side for **educational comparison**. Never refactor one approach into another.

The shared test automation framework lives in `src/` — see [docs/framework-guide.md](../docs/framework-guide.md) for the full human-readable guide covering the facade, fixture, page objects, components, procedures, test data, and fluent API patterns.

## Application Under Test

- **App**: Tredgate QA Hub — React 19, frontend-only, `localStorage`-backed, no real backend.
- **URL**: `http://localhost:5173` (Vite dev server, run separately).
- **Full reference**: see [app_in_test_overview.md](../app_in_test_overview.md) for login credentials, routes, data model, seed data, roles, and test IDs.

### Key Facts

- All interactive elements have `data-testid` attributes — **always prefer `getByTestId()`**.
- Test ID format: `<module>-<element>-<modifier>` (kebab-case), e.g. `login-input-username`.
- Three seeded users: `tester`/`test123`, `lead`/`lead123`, `admin`/`admin123`.
- **No network calls** — no XHR/fetch to intercept. Only React renders + localStorage.
- Reset state by clearing `localStorage` keys prefixed `tqh_`.

## Tech Stack

- **Playwright** with TypeScript
- **dotenv** for secrets (`.env` file, never commit — see `.env.example`)
- **cross-env** for setting `TEST_LANG` via npm scripts

## Architecture Rules

### Folder Structure (target)

```
tests/
├── spaghetti/              # Approach 1: messy inline tests
├── standard-pom/           # Approach 2: classic POM
│   └── pages/
└── advanced/               # Approach 3: production-grade
    ├── components/          # Reusable UI component objects
    ├── pages/               # Page Objects with fluent API
    ├── procedures/          # Business-level precondition helpers
    ├── data/                # Test data types, literals, helpers
    ├── i18n/                # Assertion text dictionaries per language
    ├── fixtures/            # Playwright fixture extensions
    └── specs/               # Actual test files
```

### Naming Conventions

| Item               | Convention               | Example                                    |
| ------------------ | ------------------------ | ------------------------------------------ |
| Page Object class  | `<Page>Page`             | `LoginPage`, `DefectDetailPage`            |
| Component class    | `<Name>Component`        | `SidebarComponent`, `DataTableComponent`   |
| Procedure function | `<verb><Noun>`           | `createDefect()`, `loginAsAdmin()`         |
| Test data type     | `<Entity>Data`           | `DefectData`, `UserCredentials`            |
| Test file          | `<feature>.spec.ts`      | `login.spec.ts`, `defect-workflow.spec.ts` |
| Fixture file       | `<scope>.fixture.ts`     | `auth.fixture.ts`                          |
| i18n key           | `texts.<page>.<element>` | `texts.login.submitButton`                 |

### Advanced Approach Patterns

#### Fluent API (method chaining)

Every Page Object method that performs an action returns `this` (or another Page Object for navigation):

```typescript
await loginPage.fillUsername("tester").fillPassword("test123").submit(); // returns DashboardPage
```

#### App Main Object

A single entry point (`App`) provides access to all pages, procedures, data, and config:

```typescript
const app = new App(page);
await app.procedures.loginAs("admin");
await app.pages.defects.createNew(defectData);
```

#### Component Model

Reusable UI chunks (sidebar, data tables, modals, toasts) are separate classes composed into Page Objects:

```typescript
class DefectListPage {
  readonly table = new DataTableComponent(this.page, "defect");
  readonly sidebar = new SidebarComponent(this.page);
}
```

#### Procedures

Business-level encapsulations used as test preconditions — they combine multiple page interactions:

```typescript
// In a test:
await app.procedures.createDefectAndAssign({
  title: "Login button broken",
  severity: "critical",
  assignee: "lead",
});
```

#### i18n Assertions

Assertion texts come from a language dictionary, selected via `TEST_LANG` env var:

```typescript
await expect(page.getByTestId("login-btn-submit")).toHaveText(
  texts.login.submitButton,
);
```

#### Test Data

- Types define shape: `DefectData`, `UserCredentials`
- Object literals hold concrete values: `defaultDefect`, `criticalDefect`
- `Partial<T>` helpers allow overriding only what matters in each test
- Data lives in `tests/advanced/data/`, never inline in tests

### Spaghetti Approach Rules

- **Intentionally bad code.** No abstractions, no page objects, no helpers.
- Hardcoded selectors, inline credentials, duplicated setup, long procedural blocks.
- Tests should look like "what a beginner writes on day one."

### Standard POM Approach Rules

- Classic Page Object Model with methods returning `void`.
- Data is passed as method parameters — no separate data layer.
- No fluent chaining, no components, no procedures.
- Represents "typical POM you find in tutorials."

## Code Style

- Use `async`/`await` consistently — never `.then()` chains.
- Prefer `getByTestId()` for selectors. Fall back to `getByRole()` or `getByText()` only when a test ID doesn't exist.
- Use `expect` from `@playwright/test` — no custom assertion libraries.
- Use TypeScript strict mode conventions: explicit types on public APIs, inferred types internally.
- No `any` types except in the spaghetti approach (where it's intentional mess).

## Testing Patterns

- Reset `localStorage` before each test or test suite for isolation.
- Use Playwright fixtures for shared setup (auth state, page context).
- Tests in `advanced/specs/` should read like business stories — no technical noise.
- Each test should be independent and runnable in isolation.

## Do NOT

- Add a real backend or API mocking — the app has no network calls.
- Refactor spaghetti tests to be cleaner — they exist to demonstrate anti-patterns.
- Use CSS selectors when a `data-testid` exists.
- Commit `.env` files — use `.env.example` as template.
- Install additional test frameworks (Jest, Mocha, etc.) — Playwright only.
- DO NOT use native Playwright selectors (e.g., `page.getByRole()`), use CSS mainly or XPath as alternative. Playwright native selectors are ambiguous and not reliable for test writing, so avoid them in exploration.
