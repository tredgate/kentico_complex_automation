---
description: "Use when working with test data types, object literals, or data helpers in tests/advanced/data/. Covers typed test data, partial overrides, and data management patterns."
applyTo: "tests/advanced/data/**"
---

# Test Data Guidelines

## Types

Define TypeScript interfaces for every entity's test-relevant fields:

```typescript
export interface DefectData {
  title: string;
  description: string;
  severity: "critical" | "major" | "minor" | "trivial";
  priority: "P1" | "P2" | "P3" | "P4";
  project: string;
  assignee?: string;
}
```

- Types reflect what the _test_ needs, not the full app entity. Skip fields like `id`, `createdAt`.
- Use union types for enums (severity, status, priority) — mirrors the app's vocabulary.
- Reference [app_in_test_overview.md](../../app_in_test_overview.md) §6 for entity definitions.

## Object Literals

Provide named defaults that tests can use directly:

```typescript
export const defaultDefect: DefectData = {
  title: "Default test defect",
  description: "Created by automated test",
  severity: "minor",
  priority: "P3",
  project: "Project Phoenix",
};

export const criticalDefect: DefectData = {
  ...defaultDefect,
  title: "Critical production defect",
  severity: "critical",
  priority: "P1",
};
```

## Partial Helpers

Allow tests to override only the fields that matter:

```typescript
export function defectWith(overrides: Partial<DefectData>): DefectData {
  return { ...defaultDefect, ...overrides };
}
```

## Credentials

- Credentials are loaded from `.env` via dotenv in the advanced approach.
- Type: `UserCredentials { username: string; password: string; }`
- Never hardcode credentials in advanced test files — use the data layer.

## File Organization

```
tests/advanced/data/
├── types.ts           # All data interfaces
├── defects.ts         # DefectData literals and helpers
├── users.ts           # UserCredentials, role-based credential getters
├── projects.ts        # ProjectData literals
└── index.ts           # Re-exports everything
```
