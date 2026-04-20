# Architecture Guide

This document explains the **three test automation approaches** in this repository, why they exist, and how they are structured. Use it as your orientation guide before writing any tests.

---

## Why Three Approaches?

This repository is a **training tool**. It demonstrates three progressively better ways to automate tests against a complex application. Each approach exists side-by-side so you can compare them directly.

| Approach         | Folder                | Quality           | Purpose                                    |
| ---------------- | --------------------- | ----------------- | ------------------------------------------ |
| **Spaghetti**    | `tests/spaghetti/`    | Intentionally bad | Show what NOT to do                        |
| **Standard POM** | `tests/standard-pom/` | Decent            | The typical tutorial pattern               |
| **Advanced**     | `tests/advanced/`     | Production-grade  | The goal: maintainable, scalable, readable |

> **Rule:** Never refactor one approach into another. They exist for comparison.

---

## Approach 1: Spaghetti

**What it looks like:** One long `test()` block with everything inline — selectors, credentials, setup, assertions. Copy-pasted across files. No abstractions.

**Why it exists:** To show beginners what happens when you "just start writing tests" without thinking about architecture. It works for 5 tests. It breaks at 50.

**Key problems it demonstrates:**

- Changing a selector means editing every test
- Changing a credential means find-and-replace across files
- No reusability — every test repeats the same login steps
- Unreadable — you can't tell what the test is _about_

```
tests/spaghetti/
└── login.spec.ts          # 100+ lines of inline everything
```

---

## Approach 2: Standard Page Object Model

**What it looks like:** Page Object classes with methods for each action. Tests instantiate page objects and call methods. Data is passed as parameters.

**Why it exists:** To show the improvement over spaghetti — but also the limitations of basic POM.

**What's better:**

- Selectors live in one place (the page object)
- Tests are shorter and more readable
- Some reusability via page object methods

**What's still limited:**

- Methods return `void` — no chaining
- No typed test data — magic strings in tests
- No component reuse — sidebar code duplicated in every page object
- No business-level procedures — login steps repeated in every test
- No i18n — text changes break all assertions

```
tests/standard-pom/
├── pages/
│   ├── login.page.ts
│   └── dashboard.page.ts
└── login.spec.ts
```

---

## Approach 3: Advanced

**What it looks like:** A fully architected test framework with fluent API, component model, typed data, i18n, procedures, and a single App entry point.

**Why it exists:** To show what production-grade test automation looks like — where a new tester can write tests without understanding the framework internals.

### Key Patterns

#### Fluent API (Method Chaining)

Every action method returns `this` or a new Page Object, enabling expressive chains:

```typescript
await loginPage.fillUsername("tester").fillPassword("test123").submit(); // → DashboardPage
```

#### App Main Object

One object to rule them all. The `App` class provides access to everything:

```typescript
const app = new App(page);
await app.procedures.loginAs("admin");
await app.pages.defects.navigateTo();
```

#### Component Model

Shared UI elements (sidebar, data tables, modals, toasts) are reusable Component classes composed into Page Objects:

```typescript
class DefectListPage {
  readonly table = new DataTableComponent(this.page, "defect");
  readonly sidebar = new SidebarComponent(this.page);
}
```

#### Procedures

Business-level helpers for test preconditions. They compose Page Object calls:

```typescript
await app.procedures.createDefect({
  title: "Login broken",
  severity: "critical",
});
```

#### i18n

All assertion texts come from language dictionaries. Switch language via `npm run test:en` or `npm run test:cs`:

```typescript
await expect(button).toHaveText(texts.login.submitButton);
```

#### Typed Test Data

Data interfaces, default objects, and partial helpers:

```typescript
const myDefect = defectWith({ title: "Custom title", severity: "major" });
```

### Folder Structure

```
tests/advanced/
├── components/          # Reusable UI component objects
│   ├── sidebar.component.ts
│   ├── data-table.component.ts
│   ├── modal.component.ts
│   └── toast.component.ts
├── pages/               # Page Objects with fluent API
│   ├── login.page.ts
│   ├── dashboard.page.ts
│   ├── defect-list.page.ts
│   └── defect-detail.page.ts
├── procedures/          # Business-level precondition helpers
│   └── procedures.ts
├── data/                # Typed test data
│   ├── types.ts
│   ├── defects.ts
│   ├── users.ts
│   └── index.ts
├── i18n/                # Multi-language assertion texts
│   ├── types.ts
│   ├── en.ts
│   ├── cs.ts
│   └── index.ts
├── fixtures/            # Playwright fixture extensions
│   └── app.fixture.ts
├── app.ts               # App Main Object
└── specs/               # Actual test files
    ├── login.spec.ts
    └── defect-workflow.spec.ts
```

---

## How the Pieces Fit Together

```
Test Spec
  └── uses App (via fixture)
        ├── .procedures  →  calls Page Objects in sequence
        ├── .pages       →  Page Objects with fluent methods
        │     └── compose Components (sidebar, table, modal)
        ├── .data        →  typed test data + credential helpers
        └── .config      →  env vars, base URL, language
                               └── selects i18n texts
```

---

## Decision Guide: "Where Do I Put This?"

| You want to...                                | Put it in...                     |
| --------------------------------------------- | -------------------------------- |
| Add a selector for a new element              | The Page Object that contains it |
| Add a reusable UI chunk (appears on 2+ pages) | A Component class                |
| Add a multi-step test precondition            | A Procedure method               |
| Add expected UI text for assertions           | The i18n dictionaries            |
| Add a new entity's test data shape            | `data/types.ts` + a data file    |
| Add a new test                                | `specs/<feature>.spec.ts`        |
| Add shared test setup                         | A fixture in `fixtures/`         |
