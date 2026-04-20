---
description: "Scaffold a new Page Object class for a given page in the Tredgate QA Hub app"
agent: "agent"
argument-hint: "Page name, e.g. DefectList"
---

Create a new Page Object for the **$input** page in the Tredgate QA Hub app.

## Context

- Reference [app_in_test_overview.md](../app_in_test_overview.md) for routes, test IDs, and data model.
- Determine which approach (spaghetti / standard-pom / advanced) from the target folder.
- Follow the matching `.instructions.md` for that approach.

## For Advanced Approach

1. Use Fluent API — all action methods return `this` or a new Page Object.
2. Store locators as `readonly` properties using `getByTestId()`.
3. Compose shared UI elements using Component classes.
4. Include a `navigateTo()` method using the page's route.
5. Add assertion helpers (`expectTitle()`, `expectStatus()`) for common checks.
6. Place the file in `tests/advanced/pages/<name>.page.ts`.

## For Standard POM

1. Methods return `Promise<void>`.
2. No fluent chaining, no components.
3. Place the file in `tests/standard-pom/pages/<name>.page.ts`.
