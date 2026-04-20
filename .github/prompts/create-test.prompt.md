---
description: "Create a new test spec file for a feature of the Tredgate QA Hub app"
agent: "agent"
argument-hint: "Feature name and approach, e.g. 'login (spaghetti)' or 'defect workflow (advanced)'"
---

Create a new test spec for **$input**.

## Context

- Reference [app_in_test_overview.md](../app_in_test_overview.md) for app behavior, routes, test IDs, and seed data.
- Determine the approach from the input (spaghetti / standard-pom / advanced).
- Follow the matching `.instructions.md` for that approach.

## For Advanced Approach

1. Use the `app` fixture — not raw `page`.
2. Tests should read like business stories.
3. Use procedures for preconditions (login, data setup).
4. Use the i18n `texts` object for all assertion strings.
5. Use typed test data from `tests/advanced/data/`.
6. Place in `tests/advanced/specs/<feature>.spec.ts`.

## For Standard POM

1. Instantiate Page Objects manually in tests.
2. Hardcode test data as method parameters.
3. Place in `tests/standard-pom/<feature>.spec.ts`.

## For Spaghetti

1. Write one long procedural test — no abstractions.
2. Inline everything: selectors, credentials, assertions.
3. Place in `tests/spaghetti/<feature>.spec.ts`.

## Test Isolation

Every test must:

- Reset `localStorage` (clear `tqh_*` keys) before running.
- Be independent — runnable in isolation, no dependency on other tests.
