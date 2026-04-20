---
description: "Use when creating or editing files in src/. This is the shared test automation framework: facade, fixtures, page objects, components, procedures, and test data. Covers architecture rules, fluent API patterns, and how all layers connect."
applyTo: "src/**"
---

# Framework Architecture Instructions (`src/`)

This directory contains the shared test automation infrastructure. Tests in `tests/` consume this framework via the custom fixture.

## Layer Overview

```
TredgateQAHubMain (facade)          src/qa_hub_main.ts
├── BasePage (abstract)             src/pages/base_page.page.ts
│   └── SidebarComponent           src/pages/components/sidebar.comp.ts
├── Page Objects                    src/pages/<module>/<page>.page.ts
│   └── Components                 src/pages/components/<name>.comp.ts
├── Procedures                     src/procedures/
├── TestData / Generators           src/test-data/
└── Custom Fixture                  src/fixtures/qa_hub_context.ts
```

## 1. Facade — `TredgateQAHubMain`

- **File:** `src/qa_hub_main.ts`
- Extends `BasePage` (has sidebar, procedures).
- Aggregates: `testData`, `credentials`, `generators`.
- `open()` → navigates to app URL, returns `LoginPage`.
- Tests access everything through this single object via the fixture (`qaHub`).

## 2. Custom Fixture

- **File:** `src/fixtures/qa_hub_context.ts`
- Extends Playwright's `test` with `{ qaHub: TredgateQAHubMain }`.
- Tests import `test` from this file instead of `@playwright/test`.
- The fixture creates `TredgateQAHubMain` and passes it via `use()`.

## 3. BasePage (Abstract)

- **File:** `src/pages/base_page.page.ts`
- All page objects extend this.
- Provides: `page` (Playwright Page), `sidebar` (SidebarComponent), `onSidebar()`, `procedures()`.
- Every page automatically gets sidebar navigation and procedure access.

## 4. Component (Abstract)

- **File:** `src/pages/components/component.ts`
- Generic `Component<TParent>` — knows its parent page type.
- Provides: `page`, `parent`, `done()` (returns to parent for chaining).
- All components extend this.

## 5. Page Objects

- **Location:** `src/pages/`
- Extend `BasePage`.
- Locators: use `page.locator('[data-testid="..."]')` — store as `private readonly` in constructor.
- **Fluent returns:** action on same page → `return this`. Navigation → `return new OtherPage(this.page)`.
- Compound methods (e.g., `login()`, `fillDefectBasicInfo()`) combine multiple actions.
- Wizard-based pages use `WizardComponent` for next/back/cancel/submit.

### Creating a new page

```typescript
import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base_page.page.ts";

export class NewPage extends BasePage {
  private readonly someElement: Locator;

  constructor(page: Page) {
    super(page);
    this.someElement = page.locator('[data-testid="module-element-name"]');
  }

  async clickSomething() {
    await this.someElement.click();
    return this; // or return new NextPage(this.page);
  }
}
```

## 6. Components

- **Location:** `src/pages/components/`
- Extend `Component<TParent>`.
- Naming: `<Name>Component` class, `<name>.comp.ts` file.
- Composed into page objects as properties.

### Existing components

| Component            | File                 | Purpose                    |
| -------------------- | -------------------- | -------------------------- |
| `SidebarComponent`   | `sidebar.comp.ts`    | App-wide navigation        |
| `DataTableComponent` | `data_table.comp.ts` | Reusable list/table views  |
| `WizardComponent`    | `wizard.comp.ts`     | Multi-step form navigation |

### Sidebar circular dependency

`SidebarComponent` uses lazy `require()` (not top-level imports) for page classes to break the cycle: BasePage → SidebarComponent → Pages → BasePage. **Always use `require()` inside sidebar navigation methods.**

## 7. Procedures

- **Location:** `src/procedures/`
- Entry point: `Procedures` class in `procedures.ts`.
- Each domain has its own procedure class (e.g., `TestPlanProcedures`).
- Procedures call page object methods — never interact with `page` directly.
- Return the page object the flow ends on.
- Naming: `<verb><Noun>` — `createTestPlan()`, `loginAs()`.

### Adding a new procedure

1. Create `src/procedures/<domain>.proc.ts` with a class.
2. Register it in `Procedures` class with a factory method.
3. Access via chain: `.procedures().then(p => p.domain()).then(d => d.action(data))`.

## 8. Test Data

- **Location:** `src/test-data/`
- `types.ts` — TypeScript types for all entities (`Defect`, `TestPlan`, `Project`, etc.).
- `qa_hub_data.ts` — `TestData` class with static data matching the app's seed data.
- `generators.ts` — `Generators` class using `@faker-js/faker` for unique data. Methods accept `Partial<T>` for overrides.
- `credential_manager.ts` — Reads credentials from `process.env` (`.env` file).

## 9. Fluent API Pattern

Tests chain using `.then()`:

```typescript
await qaHub
  .open()
  .then((login) => login.login(username, password))
  .then((dash) => dash.onSidebar())
  .then((sidebar) => sidebar.clickDefects())
  .then((defects) => defects.clickCreateDefect())
  .then((form) => form.fillDefectBasicInfo(defect))
  .then((form) => form.clickNext());
```

**Rules:**

- Every async method returns `this` or a new page/component object.
- `onSidebar()` returns `SidebarComponent` for navigation.
- `done()` on components returns the parent page.
- `procedures()` returns `Procedures` for precondition setup.

## 10. File Naming

| Type        | Pattern             | Example             |
| ----------- | ------------------- | ------------------- |
| Page Object | `<name>.page.ts`    | `login.page.ts`     |
| Component   | `<name>.comp.ts`    | `sidebar.comp.ts`   |
| Procedure   | `<name>.proc.ts`    | `test_plan.proc.ts` |
| Fixture     | `<name>_context.ts` | `qa_hub_context.ts` |
| Test Data   | `<name>.ts`         | `generators.ts`     |
| Types       | `types.ts`          | `types.ts`          |

## Critical Rules

1. **Never bypass the facade** — tests should only import the fixture, not individual pages.
2. **Never use `await import()`** in sidebar — use `require()` for lazy loading (CommonJS project).
3. **Always return `this` or a new page** from action methods — maintain the fluent chain.
4. **Selectors** — use `data-testid` via `page.locator('[data-testid="..."]')`.
5. **Credentials** — always from `.env` via `CredentialManager`, never hardcoded.
6. **Test data** — use types from `types.ts` and generators from `generators.ts`.
