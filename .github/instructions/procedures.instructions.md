---
description: "Use when creating or editing procedure files in tests/advanced/procedures/. Procedures are business-level precondition helpers that combine page object actions."
applyTo: "tests/advanced/procedures/**"
---

# Procedures Guidelines

## Purpose

Procedures encapsulate multi-step business workflows used as **test preconditions**. Instead of repeating login → navigate → fill form → submit in every test, procedures provide a single call:

```typescript
await app.procedures.loginAs("tester");
await app.procedures.createDefect(criticalDefect);
```

## Rules

- Procedures call Page Object methods — they do NOT interact with `page` directly.
- Each procedure performs a complete business action (login, create entity, assign defect).
- Procedures return the Page Object the user ends up on (for chaining or further assertions).
- Naming: `<verb><Noun>` — `loginAs()`, `createDefect()`, `assignDefectTo()`.

## Shape

```typescript
export class Procedures {
  constructor(private readonly app: App) {}

  async loginAs(role: "tester" | "lead" | "admin"): Promise<DashboardPage> {
    const credentials = this.app.data.credentialsFor(role);
    return this.app.pages.login
      .navigateTo()
      .fillUsername(credentials.username)
      .fillPassword(credentials.password)
      .submit();
  }

  async createDefect(data: Partial<DefectData>): Promise<DefectDetailPage> {
    const defect = defectWith(data);
    return this.app.pages.defects
      .navigateTo()
      .clickNewDefect()
      .fillFrom(defect)
      .submit();
  }
}
```

## When to Use

- **Preconditions** in tests: "Given I am logged in as admin" → `loginAs('admin')`
- **Complex setup** that would clutter the test body
- **Cross-page workflows** that involve navigation between multiple pages

## When NOT to Use

- The action IS the thing being tested — use Page Object methods directly in that case.
- Single-page interactions — just call the Page Object method.
