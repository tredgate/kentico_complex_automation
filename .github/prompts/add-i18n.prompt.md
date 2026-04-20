---
description: "Add i18n translations for a new page or component to the language dictionaries"
agent: "agent"
argument-hint: "Page or component name, e.g. 'defect detail' or 'sidebar'"
---

Add i18n translation entries for the **$input** page/component.

## Context

- Reference [app_in_test_overview.md](../app_in_test_overview.md) for the app's UI text.
- The app's source of truth for English strings is `src/i18n/en.ts` in the SUT repo.
- Follow [i18n.instructions.md](../instructions/i18n.instructions.md).

## Steps

1. Add a new key section to the `AppTexts` interface in `tests/advanced/i18n/types.ts`.
2. Add English translations in `tests/advanced/i18n/en.ts`.
3. Add Czech translations in `tests/advanced/i18n/cs.ts` (translate or use placeholder `'TODO'`).
4. Key naming: `texts.<page>.<element>` — e.g. `texts.defectDetail.title`, `texts.sidebar.logoutButton`.
