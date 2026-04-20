# Naming Conventions

Consistent naming makes the codebase navigable without documentation. Follow these rules for all new files and symbols.

---

## Files

| Type        | Pattern               | Example                                           |
| ----------- | --------------------- | ------------------------------------------------- |
| Test spec   | `<feature>.spec.ts`   | `login.spec.ts`, `defect-workflow.spec.ts`        |
| Page Object | `<name>.page.ts`      | `login.page.ts`, `defect-detail.page.ts`          |
| Component   | `<name>.component.ts` | `sidebar.component.ts`, `data-table.component.ts` |
| Fixture     | `<scope>.fixture.ts`  | `app.fixture.ts`, `auth.fixture.ts`               |
| Data file   | `<entity>.ts`         | `defects.ts`, `users.ts`, `projects.ts`           |
| i18n file   | `<language-code>.ts`  | `en.ts`, `cs.ts`                                  |
| i18n types  | `types.ts`            | `types.ts`                                        |

All filenames are **kebab-case** (lowercase, hyphens).

## Classes

| Type        | Pattern           | Example                                           |
| ----------- | ----------------- | ------------------------------------------------- |
| Page Object | `<Page>Page`      | `LoginPage`, `DefectDetailPage`, `DefectListPage` |
| Component   | `<Name>Component` | `SidebarComponent`, `DataTableComponent`          |
| App entry   | `App`             | `App`                                             |
| Procedures  | `Procedures`      | `Procedures`                                      |

Classes are **PascalCase**.

## Methods

| Context              | Pattern           | Example                                               |
| -------------------- | ----------------- | ----------------------------------------------------- |
| Page action          | `<verb><Element>` | `fillUsername()`, `clickSubmit()`, `selectSeverity()` |
| Page navigation      | `navigateTo()`    | `navigateTo()`                                        |
| Page compound action | `fillFrom(data)`  | `fillFrom(defectData)`                                |
| Page assertion       | `expect<Thing>`   | `expectTitle()`, `expectStatus()`                     |
| Procedure            | `<verb><Noun>`    | `loginAs()`, `createDefect()`, `assignDefectTo()`     |

Methods are **camelCase**.

## Test Data

| Type            | Pattern               | Example                             |
| --------------- | --------------------- | ----------------------------------- |
| Interface       | `<Entity>Data`        | `DefectData`, `UserCredentials`     |
| Default literal | `default<Entity>`     | `defaultDefect`, `defaultProject`   |
| Variant literal | `<adjective><Entity>` | `criticalDefect`, `archivedProject` |
| Helper function | `<entity>With()`      | `defectWith()`, `projectWith()`     |

## i18n Keys

Nested structure: `texts.<page>.<element>`

```typescript
texts.login.submitButton; // "Log In"
texts.dashboard.title; // "Dashboard"
texts.sidebar.defectsLink; // "Defects"
texts.defectDetail.statusLabel; // "Status"
```

## Test IDs (in the SUT)

Test IDs in the app follow: `<module>-<element>-<modifier>` (kebab-case)

```
login-input-username
sidebar-link-defects
defect-detail-tab-comments
dashboard-card-open-defects
```

Your Page Object locators should mirror these:

```typescript
private readonly usernameInput = this.page.getByTestId('login-input-username');
```
