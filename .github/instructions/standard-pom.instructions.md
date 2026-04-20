---
description: "Use when creating or editing standard POM tests in tests/standard-pom/. Classic Page Object Model without fluent API or advanced patterns."
applyTo: "tests/standard-pom/**"
---

# Standard POM Style

Classic Page Object Model — the typical pattern from Playwright tutorials.

## Rules

- **Page Object classes**: one class per page, methods return `void` (not `this`).
- **No fluent chaining**: each method call is a separate `await` statement.
- **Data as parameters**: pass values directly to page object methods. No typed data objects, no data layer.
- **No Component Model**: page objects contain all selectors and actions, even for shared UI elements like sidebars or tables.
- **No procedures**: tests set up preconditions by calling page object methods directly.
- **No i18n**: hardcode expected texts in English.
- **Use `getByTestId()`**: selectors are better than spaghetti, but still mixed into page classes.

## Page Object Shape

```typescript
export class LoginPage {
  constructor(private page: Page) {}

  async fillUsername(username: string): Promise<void> {
    await this.page.getByTestId("login-input-username").fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.page.getByTestId("login-input-password").fill(password);
  }

  async submit(): Promise<void> {
    await this.page.getByTestId("login-btn-submit").click();
  }
}
```

## Test Shape

```typescript
test("login as tester", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.fillUsername("tester");
  await loginPage.fillPassword("test123");
  await loginPage.submit();
  await expect(page).toHaveURL("/dashboard");
});
```

## Do NOT

- Add fluent API (method chaining) — that belongs in the advanced approach.
- Create component objects — keep everything in page classes.
- Create a data layer or typed test data.
- Use procedures or an App main object.
