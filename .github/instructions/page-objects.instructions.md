---
description: "Use when working with Page Object classes in tests/advanced/pages/ or tests/standard-pom/pages/. Covers page object design, selectors, and method patterns."
applyTo: ["tests/advanced/pages/**", "tests/standard-pom/pages/**"]
---

# Page Object Guidelines

## Selectors

- **Always use `getByTestId()`** as the primary selector strategy.
- Test IDs follow `<module>-<element>-<modifier>` kebab-case format.
- Fall back to `getByRole()` or `getByText()` only when no `data-testid` exists.
- Store locators as `readonly` properties initialized in the constructor, or build them in methods.
- Reference [app_in_test_overview.md](../../app_in_test_overview.md) §8 for the test ID registry.

## Constructor Pattern

```typescript
export class LoginPage {
  private readonly usernameInput = this.page.getByTestId(
    "login-input-username",
  );
  private readonly passwordInput = this.page.getByTestId(
    "login-input-password",
  );
  private readonly submitButton = this.page.getByTestId("login-btn-submit");

  constructor(private readonly page: Page) {}
}
```

## Navigation

- Page Objects that represent navigable pages should have a `navigateTo()` method.
- Methods that trigger navigation to another page return an instance of that page's Page Object.
- `navigateTo()` uses `page.goto()` with the route path (baseURL is configured globally).

## Assertions

- Page Objects may include assertion helper methods (`expectTitle()`, `expectStatus()`) for readability.
- Assertions use `expect` from `@playwright/test`.
- Expected texts come from the i18n layer (advanced) or are hardcoded (standard POM).

## Composition (Advanced Only)

Compose shared UI elements using Component classes:

```typescript
class DefectListPage {
  readonly sidebar = new SidebarComponent(this.page);
  readonly table = new DataTableComponent(this.page, "defect");
}
```
