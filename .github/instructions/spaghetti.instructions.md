---
description: "Use when creating or editing spaghetti tests in tests/spaghetti/. These tests are intentionally bad — no abstractions, no page objects, all inline."
applyTo: "tests/spaghetti/**"
---

# Spaghetti Test Style

These tests exist to demonstrate **anti-patterns**. They are intentionally messy.

## Rules

- **NO abstractions**: no page objects, no helpers, no shared utilities.
- **All data inline**: hardcode usernames, passwords, URLs, and expected texts directly in the test body.
- **Duplicate everything**: copy-paste setup steps across tests. Never extract shared logic.
- **Long procedural blocks**: each test should be one long sequence of actions. No functions, no composition.
- **Use raw selectors**: prefer `page.locator('[data-testid="..."]')` or even CSS selectors instead of `getByTestId()`.
- **No TypeScript types**: use `any` freely, skip type annotations.
- **No comments explaining intent**: if there are comments, make them state the obvious (`// click button`).
- **Magic strings everywhere**: repeat the same selector strings rather than storing them in variables.

## Example Shape

```typescript
test("login and create defect", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await page.locator('[data-testid="login-input-username"]').fill("tester");
  await page.locator('[data-testid="login-input-password"]').fill("test123");
  await page.locator('[data-testid="login-btn-submit"]').click();
  // ...50 more lines of the same...
});
```

## Do NOT

- Refactor these tests to be cleaner.
- Extract page objects or helpers.
- Add proper error handling or setup/teardown.
- Use `beforeEach` / `afterEach` for shared setup.
