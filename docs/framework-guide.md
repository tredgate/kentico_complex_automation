# Framework Guide

This document explains the internal architecture of the `src/` test automation framework — the shared infrastructure used by advanced-approach tests. It covers every layer, from the single entry point down to test data generators.

---

## Table of Contents

1. [Overview](#overview)
2. [Facade — `TredgateQAHubMain`](#1-facade--tredgateqahubmain)
3. [Custom Fixture](#2-custom-fixture)
4. [BasePage & Component Abstracts](#3-basepage--component-abstracts)
5. [Page Objects](#4-page-objects)
6. [Components](#5-components)
7. [Procedures](#6-procedures)
8. [Test Data & Types](#7-test-data--types)
9. [Fluent API & Chaining](#8-fluent-api--chaining)
10. [Writing a Test — End-to-End Example](#9-writing-a-test--end-to-end-example)
11. [How to Add New Tests](#10-how-to-add-new-tests)

---

## Overview

The framework lives in `src/` and is structured as a layered architecture:

```
Test Spec (.spec.ts)
  └── imports custom fixture (qaHub)
        └── TredgateQAHubMain (facade)
              ├── .open()          → LoginPage
              ├── .onSidebar()     → SidebarComponent (navigate anywhere)
              ├── .procedures()    → Procedures (multi-step preconditions)
              ├── .testData        → TestData (projects, team members, URLs)
              ├── .credentials     → CredentialManager (env-var secrets)
              └── .generators      → Generators (random Defects, TestPlans, etc.)
```

**Key principle:** Tests only import the custom fixture. Everything else is accessed through the `qaHub` object.

---

## 1. Facade — `TredgateQAHubMain`

**File:** [`src/qa_hub_main.ts`](../src/qa_hub_main.ts)

The facade is the single entry point for all test interactions. It extends `BasePage` (so it has sidebar navigation built in) and aggregates test data, credentials, and generators.

```typescript
export class TredgateQAHubMain extends BasePage {
  testData = new TestData();
  credentials = new CredentialsManager();
  generators = new Generators();

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.page.goto(this.testData.url);
    return new LoginPage(this.page);
  }
}
```

### What it provides

| Property/Method | Returns             | Purpose                                        |
| --------------- | ------------------- | ---------------------------------------------- |
| `open()`        | `LoginPage`         | Navigate to the app and return the login page  |
| `onSidebar()`   | `SidebarComponent`  | Access sidebar navigation from anywhere        |
| `procedures()`  | `Procedures`        | Access business-level precondition helpers     |
| `testData`      | `TestData`          | Static test data (projects, team members, URL) |
| `credentials`   | `CredentialManager` | Read credentials from `.env` variables         |
| `generators`    | `Generators`        | Generate random defects, test plans, etc.      |

### Why a facade?

- Tests have **one import** (the fixture) and **one object** (`qaHub`).
- New testers don't need to know the internals — they explore through autocomplete.
- Reduces coupling: if internal structure changes, only the facade adapts.

---

## 2. Custom Fixture

**File:** [`src/fixtures/qa_hub_context.ts`](../src/fixtures/qa_hub_context.ts)

The custom Playwright fixture replaces the default `{ page }` with `{ qaHub }`, providing a pre-configured `TredgateQAHubMain` instance:

```typescript
import { TredgateQAHubMain } from "../qa_hub_main.ts";
import { test as base } from "@playwright/test";

type QaHubFixtures = {
  qaHub: TredgateQAHubMain;
};

export const test = base.extend<QaHubFixtures>({
  qaHub: async ({ page }, use) => {
    const qaHubMain = new TredgateQAHubMain(page);
    await use(qaHubMain);
  },
});
```

### How to use in tests

```typescript
import { test } from "../src/fixtures/qa_hub_context.ts";

test("my test", async ({ qaHub }) => {
  // qaHub is ready — no manual setup needed
  await qaHub.open().then((login) => login.login(username, password));
});
```

### Why a custom fixture?

- Eliminates boilerplate: no `new TredgateQAHubMain(page)` in every test.
- Guarantees consistent setup across all tests.
- Can be extended later to add `beforeEach`/`afterEach` hooks (e.g., localStorage reset).

---

## 3. BasePage & Component Abstracts

### BasePage

**File:** [`src/pages/base_page.page.ts`](../src/pages/base_page.page.ts)

Every page object extends `BasePage`. It provides:

- Access to the Playwright `page` instance.
- A `SidebarComponent` instance (since the sidebar appears on every page).
- Access to `Procedures` for precondition setup.

```typescript
export abstract class BasePage {
  protected page: Page;
  sidebar: SidebarComponent<this>;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = new SidebarComponent(this.page, this);
  }

  async onSidebar() {
    return this.sidebar;
  }

  async procedures() {
    return new Procedures(this.page);
  }
}
```

**Key points:**

- `abstract` — you never instantiate `BasePage` directly; always a concrete page like `LoginPage`.
- `onSidebar()` enables chaining: `await page.onSidebar().then(sb => sb.clickDefects())`.
- Every page automatically has sidebar navigation without any extra code.

### Component (Abstract)

**File:** [`src/pages/components/component.ts`](../src/pages/components/component.ts)

The base class for all reusable UI components. It's generic over `TParent` so a component knows what page it belongs to:

```typescript
export abstract class Component<TParent> {
  protected readonly page: Page;
  protected readonly parent: TParent;

  constructor(page: Page, parent: TParent) {
    this.page = page;
    this.parent = parent;
  }

  async done() {
    return this.parent;
  }
}
```

**Key points:**

- `TParent` generic — the component knows its parent page type for fluent return.
- `done()` — returns to the parent page after interacting with the component. Enables: `await sidebar.clickCollapse().then(sb => sb.done())` → returns the parent page.

---

## 4. Page Objects

**Location:** `src/pages/`

Each page in the application has a corresponding Page Object class. Page objects:

- Extend `BasePage`.
- Define locators as `private readonly` properties in the constructor.
- Expose action methods that return `this` (fluent) or a new page object (navigation).

### Example: LoginPage

**File:** [`src/pages/login.page.ts`](../src/pages/login.page.ts)

```typescript
export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-testid="login-input-username"]');
    this.passwordInput = page.locator('[data-testid="login-input-password"]');
    this.loginButton = page.locator('[data-testid="login-btn-submit"]');
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
    return this; // stays on LoginPage — enables chaining
  }

  async clickLogin() {
    await this.loginButton.click();
    return new DashboardPage(this.page); // navigates — returns new page
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    return await this.clickLogin(); // compound method for convenience
  }
}
```

### Page object rules

1. **Selectors** — Use `data-testid` attributes via `page.locator('[data-testid="..."]')`.
2. **Return types** — Action on same page → `return this`. Navigation → `return new OtherPage(this.page)`.
3. **Compound methods** — Combine multiple actions for convenience (e.g., `login()` = fill + click).
4. **Assertions** — Pages can have assertion helpers like `assertDefectContent()`.

### Wizard pages

Multi-step forms (defect creation, test plan creation) use the `WizardComponent` and are split into separate page objects per step:

```
src/pages/defects/create-defect/
├── defect_basic_info.page.ts     # Step 1
├── create_defect_details.page.ts  # Step 2
├── defect_assignments_links.page.ts # Step 3
└── defect_review.page.ts         # Step 4 (submit)
```

Each wizard step's `clickNext()` returns the next step's page object.

---

## 5. Components

**Location:** `src/pages/components/`

Components are reusable UI pieces that appear on multiple pages.

### SidebarComponent

**File:** [`src/pages/components/sidebar.comp.ts`](../src/pages/components/sidebar.comp.ts)

Navigation sidebar present on every page. Provides methods to navigate to any section:

```typescript
await sidebar.clickDashboard(); // → DashboardPage
await sidebar.clickDefects(); // → DefectsPage
await sidebar.clickTestPlans(); // → TestPlansPage
await sidebar.clickTeam(); // → TeamPage
await sidebar.clickReports(); // → ReportsPage
await sidebar.clickSettings(); // → SettingsPage
```

Also provides: `clickLogout()`, `clickCollapse()`, `clickResetData()`.

> **Note:** Sidebar uses lazy `require()` for page imports to break a circular dependency (BasePage → Sidebar → Pages → BasePage).

### DataTableComponent

**File:** [`src/pages/components/data_table.comp.ts`](../src/pages/components/data_table.comp.ts)

Reusable for any list/table view (defects, projects, test plans). Parameterized by `tablePrefix`:

```typescript
this.dataTableComponent = new DataTableComponent(this.page, this, "defect");

// Then use:
await this.dataTableComponent.search("Login bug");
await this.dataTableComponent.setPageSize("25");
await this.dataTableComponent.clickNextPage();
```

### WizardComponent

**File:** [`src/pages/components/wizard.comp.ts`](../src/pages/components/wizard.comp.ts)

Handles multi-step form navigation (next, back, cancel, submit). Uses TypeScript generics so `clickNext()` returns the correct next page type:

```typescript
// In DefectBasicInfoPage:
async clickNext() {
  return await this.wizardComponent.clickNext(CreateDefectDetailsPage);
}
```

The `WizardComponent.clickNext<T>()` method accepts a page class constructor and returns an instance of it.

---

## 6. Procedures

**Location:** `src/procedures/`

Procedures are business-level helpers for test preconditions. They combine multiple page object calls into a single method.

### Procedures (entry point)

**File:** [`src/procedures/procedures.ts`](../src/procedures/procedures.ts)

```typescript
export class Procedures {
  async testPlan() {
    return new TestPlanProcedures(this.page);
  }
}
```

### TestPlanProcedures

**File:** [`src/procedures/test_plan.proc.ts`](../src/procedures/test_plan.proc.ts)

```typescript
async createTestPlan(testPlan: TestPlan) {
  const sidebar = new SidebarComponent(this.page, this);
  return await sidebar
    .clickTestPlans()
    .then((tp) => tp.clickCreateTestPlan())
    .then((details) => details.fillPlanDetailsForm(testPlan))
    .then((details) => details.clickNext())
    .then((cases) => cases.fillTestCasesForm(testPlan.testCases))
    .then((cases) => cases.clickNext())
    .then((review) => review.clickSubmit());
}
```

### When to create a procedure

- The same multi-step setup appears in **2+ tests** as a precondition.
- The steps are **business-level** (e.g., "create a test plan"), not technical (e.g., "fill three fields").
- The test's focus is on what happens **after** the precondition.

### How to use in tests

```typescript
await qaHub
  .open()
  .then((login) => login.login(username, password))
  .then((dashboard) => dashboard.procedures())
  .then((proc) => proc.testPlan())
  .then((tp) => tp.createTestPlan(testPlanData));
```

---

## 7. Test Data & Types

**Location:** `src/test-data/`

### Types

**File:** [`src/test-data/types.ts`](../src/test-data/types.ts)

TypeScript interfaces for all test entities:

```typescript
type Defect = {
  title: string;
  project: Project;
  description: string;
  severity: DefectSeverity;
  priority: DefectPriority;
  environment: ProjectEnvironment;
  stepsToReproduce: string;
};

type TestPlan = {
  name: string;
  project: Project;
  description: string;
  assignee?: string;
  testCases: TestCase[];
};
```

Also defines string literal types: `DefectSeverity`, `DefectPriority`, `ProjectStatus`, etc.

### TestData (static data)

**File:** [`src/test-data/qa_hub_data.ts`](../src/test-data/qa_hub_data.ts)

Contains pre-seeded application data that tests can reference:

```typescript
qaHub.testData.url; // "http://localhost:5173"
qaHub.testData.projects.phoenix; // { name, code, environments, ... }
qaHub.testData.projects.atlas; // another project
qaHub.testData.teamMembers.testLeads.laura; // "Laura Smith"
```

### Generators (random data)

**File:** [`src/test-data/generators.ts`](../src/test-data/generators.ts)

Generate test entities with sensible defaults, overridable via `Partial<T>`:

```typescript
// Full defaults
const defect = await qaHub.generators.generateDefect();

// Override specific fields
const defect = await qaHub.generators.generateDefect({
  severity: "critical",
  project: qaHub.testData.projects.atlas,
});

// Same for test plans
const plan = await qaHub.generators.generateTestPlan({
  project: qaHub.testData.projects.phoenix,
});
```

Uses `@faker-js/faker` for unique titles (`Defect <uuid>`, `Test Plan <uuid>`).

### CredentialManager

**File:** [`src/test-data/credential_manager.ts`](../src/test-data/credential_manager.ts)

Reads credentials from environment variables (`.env` file):

```typescript
const creds = await qaHub.credentials.setupCredentials(
  "LEAD_USERNAME", // env var key for username
  "LEAD_PASSWORD", // env var key for password
);
// creds.username, creds.password
```

**Security:** Credentials never appear in test code. They come from `.env` (gitignored).

---

## 8. Fluent API & Chaining

The framework uses `.then()` chaining for fluent, readable test flows. Every async method returns either `this` (same page) or a new page object (navigation), enabling:

```typescript
await qaHub
  .open() // → LoginPage
  .then((login) => login.login(username, password)) // → DashboardPage
  .then((dashboard) => dashboard.onSidebar()) // → SidebarComponent
  .then((sidebar) => sidebar.clickDefects()) // → DefectsPage
  .then((defects) => defects.clickCreateDefect()) // → DefectBasicInfoPage
  .then((form) => form.fillDefectBasicInfo(defect)) // → DefectBasicInfoPage (this)
  .then((form) => form.clickNext()) // → CreateDefectDetailsPage
  .then((details) => details.fillDefectDetails(defect)) // → CreateDefectDetailsPage (this)
  .then((details) => details.clickNext()) // → DefectReviewPage
  .then((review) => review.clickSubmit()); // → DefectDetailPage
```

### Rules

| Method does...         | Returns...               | Chaining continues with... |
| ---------------------- | ------------------------ | -------------------------- |
| Fills a field          | `return this`            | Same page object           |
| Clicks navigation link | `return new OtherPage()` | New page object            |
| Opens sidebar          | `return this.sidebar`    | SidebarComponent           |
| Component's `done()`   | `return this.parent`     | Parent page object         |

---

## 9. Writing a Test — End-to-End Example

**File:** [`tests/e2e_example.spec.ts`](../tests/e2e_example.spec.ts)

```typescript
import { test } from "../src/fixtures/qa_hub_context.ts";
import { Defect } from "../src/test-data/types.ts";

test.describe("E2E Example Structure", () => {
  let defect: Defect;

  test.beforeEach(async ({ qaHub }) => {
    // Arrange — set up credentials and test data
    const credentials = await qaHub.credentials.setupCredentials(
      "LEAD_USERNAME",
      "LEAD_PASSWORD",
    );
    const testPlan = await qaHub.generators.generateTestPlan({
      project: qaHub.testData.projects.phoenix,
    });
    defect = await qaHub.generators.generateDefect({
      project: qaHub.testData.projects.phoenix,
    });

    // Arrange — login and create precondition (test plan)
    await qaHub
      .open()
      .then((login) => login.login(credentials.username, credentials.password))
      .then((login) => login.procedures())
      .then((proc) => proc.testPlan())
      .then((tp) => tp.createTestPlan(testPlan));
  });

  test("Create New Defect", async ({ qaHub }) => {
    // Act — navigate to defects and create one
    await qaHub
      .onSidebar()
      .then((sidebar) => sidebar.clickDefects())
      .then((defects) => defects.clickCreateDefect())
      .then((form) => form.fillDefectBasicInfo(defect))
      .then((form) => form.clickNext())
      .then((details) => details.fillDefectDetails(defect))
      .then((details) => details.clickNext())
      .then((review) => review.clickSubmit())
      .then((defects) => defects.onSidebar())
      .then((sidebar) => sidebar.clickDefects())
      .then((defects) => defects.searchDefectByTitle(defect.title))
      // Assert — verify defect was created
      .then((defects) => defects.assertDefectContent(defect, 0));
  });
});
```

### What to notice

1. **Single import** — only the fixture, plus types as needed.
2. **Arrange/Act/Assert** — clear separation using comments.
3. **Generated data** — unique per run, no collisions.
4. **Procedures** — preconditions (test plan) created via procedures.
5. **Fluent chain** — the whole test flow reads top-to-bottom.

---

## 10. How to Add New Tests

### Checklist

1. **Does a Page Object exist?** Check `src/pages/`. If not, create one extending `BasePage`.
2. **Are the selectors defined?** Add `data-testid` locators to the page object.
3. **Is test data needed?** Add types to `src/test-data/types.ts`, generator methods to `generators.ts`.
4. **Is there a multi-step precondition?** Add a Procedure in `src/procedures/`.
5. **Is the component reusable?** If a UI element appears on 2+ pages, extract it to `src/pages/components/`.

### Creating a new Page Object

```typescript
// src/pages/my-feature/my_feature.page.ts
import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base_page.page.ts";

export class MyFeaturePage extends BasePage {
  private readonly someButton: Locator;

  constructor(page: Page) {
    super(page);
    this.someButton = page.locator('[data-testid="feature-btn-action"]');
  }

  async clickAction() {
    await this.someButton.click();
    return this; // or return new NextPage(this.page);
  }
}
```

### Creating a new Procedure

```typescript
// src/procedures/my_feature.proc.ts
import { Page } from "@playwright/test";

export class MyFeatureProcedures {
  constructor(private readonly page: Page) {}

  async setupFeature(data: MyFeatureData) {
    // Combine multiple page object calls
    const sidebar = new SidebarComponent(this.page, this);
    return await sidebar
      .clickMyFeature()
      .then((page) => page.fillForm(data))
      .then((page) => page.submit());
  }
}
```

Then register it in `src/procedures/procedures.ts`:

```typescript
async myFeature() {
  return new MyFeatureProcedures(this.page);
}
```

### Creating a new test

```typescript
// tests/my_feature.spec.ts
import { test } from "../src/fixtures/qa_hub_context.ts";

test.describe("My Feature", () => {
  test("should do something", async ({ qaHub }) => {
    const creds = await qaHub.credentials.setupCredentials(
      "USERNAME",
      "PASSWORD",
    );

    await qaHub
      .open()
      .then((login) => login.login(creds.username, creds.password))
      .then((dash) => dash.onSidebar())
      .then((sb) => sb.clickMyFeature())
      .then((page) => page.clickAction());
  });
});
```

---

## Directory Map

```
src/
├── qa_hub_main.ts                          # Facade — single entry point
├── configs/
│   ├── qa_hub_config.ts                    # App configuration
│   └── types.ts                            # Config types
├── fixtures/
│   └── qa_hub_context.ts                   # Custom Playwright fixture
├── pages/
│   ├── base_page.page.ts                   # Abstract base for all pages
│   ├── login.page.ts                       # Login page object
│   ├── dashboard.page.ts                   # Dashboard page object
│   ├── components/
│   │   ├── component.ts                    # Abstract base for all components
│   │   ├── sidebar.comp.ts                 # Sidebar navigation component
│   │   ├── data_table.comp.ts              # Reusable data table component
│   │   └── wizard.comp.ts                  # Multi-step form wizard component
│   ├── defects/                            # Defect pages (list, detail, create wizard)
│   ├── projects/                           # Projects page
│   ├── test-plans/                         # Test plans pages (list, create wizard)
│   ├── team/                               # Team page
│   ├── reports/                            # Reports page
│   └── settings/                           # Settings page
├── procedures/
│   ├── procedures.ts                       # Procedure entry point
│   └── test_plan.proc.ts                   # Test plan precondition procedures
└── test-data/
    ├── types.ts                            # Entity type definitions
    ├── qa_hub_data.ts                      # Static test data (projects, members)
    ├── generators.ts                       # Random data generators (faker)
    └── credential_manager.ts              # Env-var credential reader
```
