# Writing Tests — A Practical Guide

This guide walks through writing tests in each of the three approaches with concrete examples.

---

## Which Approach Should I Use?

- **Learning / demos**: Start with spaghetti to see the pain, then standard POM, then advanced.
- **Real test work**: Always use the **advanced** approach.
- **Quick prototype**: Standard POM is fine for throwaway spikes.

---

## Spaghetti Example: Login Test

```typescript
import { test, expect } from "@playwright/test";

test("user can log in", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await page.locator('[data-testid="login-input-username"]').fill("tester");
  await page.locator('[data-testid="login-input-password"]').fill("test123");
  await page.locator('[data-testid="login-btn-submit"]').click();

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator('[data-testid="dashboard-title"]')).toBeVisible();
});
```

**Notice:** Everything inline. Every test repeats these same login steps. Change the test ID? Edit 40 files.

---

## Standard POM Example: Login Test

**Page Object** (`tests/standard-pom/pages/login.page.ts`):

```typescript
import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto("/login");
  }

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

**Test** (`tests/standard-pom/login.spec.ts`):

```typescript
import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login.page";

test("user can log in", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillUsername("tester");
  await loginPage.fillPassword("test123");
  await loginPage.submit();

  await expect(page).toHaveURL(/dashboard/);
});
```

**Better:** Selectors in one place. But credentials still inline, no chaining, no reusability of login across tests.

---

## Advanced Example: Login Test

**Page Object** (`tests/advanced/pages/login.page.ts`):

```typescript
import { Page } from "@playwright/test";
import { DashboardPage } from "./dashboard.page";

export class LoginPage {
  private readonly usernameInput = this.page.getByTestId(
    "login-input-username",
  );
  private readonly passwordInput = this.page.getByTestId(
    "login-input-password",
  );
  private readonly submitButton = this.page.getByTestId("login-btn-submit");

  constructor(private readonly page: Page) {}

  async navigateTo(): Promise<this> {
    await this.page.goto("/login");
    return this;
  }

  async fillUsername(username: string): Promise<this> {
    await this.usernameInput.fill(username);
    return this;
  }

  async fillPassword(password: string): Promise<this> {
    await this.passwordInput.fill(password);
    return this;
  }

  async submit(): Promise<DashboardPage> {
    await this.submitButton.click();
    return new DashboardPage(this.page);
  }
}
```

**Procedure** (in `tests/advanced/procedures/procedures.ts`):

```typescript
async loginAs(role: 'tester' | 'lead' | 'admin'): Promise<DashboardPage> {
  const creds = this.app.data.credentialsFor(role);
  return this.app.pages.login
    .navigateTo()
    .fillUsername(creds.username)
    .fillPassword(creds.password)
    .submit();
}
```

**Test** (`tests/advanced/specs/login.spec.ts`):

```typescript
import { test } from "../fixtures/app.fixture";
import { expect } from "@playwright/test";
import { texts } from "../i18n";

test("tester can log in and see the dashboard", async ({ app }) => {
  const dashboard = await app.procedures.loginAs("tester");

  await dashboard.expectTitle(texts.dashboard.title);
});

test("invalid credentials show error message", async ({ app }) => {
  const loginPage = await app.pages.login.navigateTo();

  await loginPage.fillUsername("wrong").fillPassword("wrong").clickSubmit();

  await loginPage.expectError(texts.login.errorInvalidCredentials);
});
```

**Notice:** Tests read like business stories. No selectors, no credentials, no technical noise.

---

## Checklist for New Tests (Advanced)

1. [ ] Does a Page Object exist for the page(s) involved? If not, create one.
2. [ ] Are the needed test IDs added to the Page Object as locators?
3. [ ] Is the test data defined in `data/`? Create types and literals as needed.
4. [ ] Are assertion texts in the i18n dictionaries?
5. [ ] Is the test precondition a Procedure? If it's multi-step, add one.
6. [ ] Does the test read like a business story? Can a non-programmer understand it?
7. [ ] Is the test isolated? Does it reset state and not depend on other tests?
