---
description: "Use when writing Playwright configuration, fixtures, or setup code. Covers dotenv, baseURL, fixture patterns, and localStorage reset."
applyTo: ["playwright.config.ts", "tests/advanced/fixtures/**"]
---

# Configuration & Fixtures Guidelines

## Playwright Config

- `baseURL` is set from `process.env.BASE_URL` (defaults to `http://localhost:5173`).
- `dotenv` is loaded at the top of `playwright.config.ts`.
- Only Chromium project is enabled by default for development speed.

## Fixtures

Extend Playwright's base test with custom fixtures:

```typescript
import { test as base } from "@playwright/test";
import { App } from "../app";

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },
});

export { expect } from "@playwright/test";
```

## localStorage Reset

Reset app state before tests for isolation:

```typescript
// In a fixture or beforeEach:
await page.goto("/");
await page.evaluate(() => {
  Object.keys(localStorage)
    .filter((k) => k.startsWith("tqh_"))
    .forEach((k) => localStorage.removeItem(k));
});
await page.reload();
```

## Environment Variables

| Variable                              | Purpose                      | Default                 |
| ------------------------------------- | ---------------------------- | ----------------------- |
| `BASE_URL`                            | App URL                      | `http://localhost:5173` |
| `TEST_LANG`                           | i18n language for assertions | `en`                    |
| `TESTER_USERNAME` / `TESTER_PASSWORD` | Tester credentials           | `tester` / `test123`    |
| `LEAD_USERNAME` / `LEAD_PASSWORD`     | QA Lead credentials          | `lead` / `lead123`      |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD`   | Admin credentials            | `admin` / `admin123`    |
