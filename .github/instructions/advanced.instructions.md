---
description: "Use when creating or editing advanced approach files in tests/advanced/. Production-grade architecture with Fluent API, Component Model, Procedures, i18n, typed test data, and App Main Object."
applyTo: "tests/advanced/**"
---

# Advanced Approach Style

Production-grade test automation architecture. Every pattern exists to make tests readable, maintainable, and easy to onboard.

## Core Patterns

### 1. Fluent API — Method Chaining

Every Page Object action method returns `this` (same page) or a new Page Object (navigation). This enables chaining:

```typescript
// Returns this (stays on same page)
async fillTitle(title: string): Promise<this> {
  await this.page.getByTestId('defect-input-title').fill(title);
  return this;
}

// Returns another page (navigates)
async submit(): Promise<DefectDetailPage> {
  await this.page.getByTestId('defect-btn-submit').click();
  return new DefectDetailPage(this.page);
}
```

### 2. App Main Object

Single entry point combining all pages, procedures, data, and config:

```typescript
class App {
  readonly pages: Pages;
  readonly procedures: Procedures;
  readonly data: TestDataManager;
  readonly config: AppConfig;

  constructor(public readonly page: Page) { ... }
}
```

### 3. Component Model

Reusable UI elements as separate classes, composed into Page Objects:

```typescript
class DataTableComponent {
  constructor(private page: Page, private prefix: string) {}

  async getRowCount(): Promise<number> { ... }
  async clickRow(id: string): Promise<void> { ... }
}
```

Components: `SidebarComponent`, `DataTableComponent`, `ModalComponent`, `ToastComponent`, `BreadcrumbComponent`.

### 4. Procedures

Business-level precondition helpers — combine multiple page interactions into single calls:

```typescript
async loginAs(role: 'tester' | 'lead' | 'admin'): Promise<DashboardPage> { ... }
async createDefect(data: Partial<DefectData>): Promise<DefectDetailPage> { ... }
```

### 5. i18n Assertions

All expected UI texts come from language dictionaries, selected by `TEST_LANG` env var:

```typescript
// texts.login.submitButton resolves to "Log In" (en) or "Přihlásit" (cs)
await expect(element).toHaveText(texts.login.submitButton);
```

Structure: `tests/advanced/i18n/en.ts`, `tests/advanced/i18n/cs.ts`, `tests/advanced/i18n/index.ts`.

### 6. Typed Test Data

- **Types** define shape: `DefectData`, `UserCredentials`
- **Object literals** hold concrete values: `defaultDefect`, `criticalDefect`
- **Partial helpers** let tests override only what matters
- All data lives in `tests/advanced/data/`

### 7. Fixtures

Extend Playwright's test fixtures for shared setup (authenticated page, app instance):

```typescript
export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },
});
```

## Naming Conventions

| Item         | Pattern               | Example                           |
| ------------ | --------------------- | --------------------------------- |
| Page Object  | `<Page>Page`          | `LoginPage`, `DefectListPage`     |
| Component    | `<Name>Component`     | `SidebarComponent`                |
| Procedure    | `<verb><Noun>`        | `createDefect()`, `loginAs()`     |
| Data type    | `<Entity>Data`        | `DefectData`                      |
| Data literal | `<adjective><Entity>` | `defaultDefect`, `criticalDefect` |

## Test Readability

Tests must read like business stories. A non-programmer should understand the intent:

```typescript
test("tester reports a critical defect", async ({ app }) => {
  await app.procedures.loginAs("tester");

  const detailPage = await app.pages.defects
    .navigateTo()
    .clickNewDefect()
    .fillFrom(criticalDefect)
    .submit();

  await detailPage.expectTitle(criticalDefect.title);
  await detailPage.expectSeverity("critical");
});
```
