---
description: "Create a new reusable Component class for a shared UI element in the advanced approach"
agent: "agent"
argument-hint: "Component name, e.g. DataTable, Modal, Toast"
---

Create a new Component class for the **$input** UI element.

## Context

- Reference [app_in_test_overview.md](../app_in_test_overview.md) for test ID patterns and UI structure.
- Components live in `tests/advanced/components/<name>.component.ts`.
- Follow [components.instructions.md](../instructions/components.instructions.md).

## Requirements

1. Constructor takes `Page` and any parameterization (e.g. `prefix` for module-specific test IDs).
2. Build test IDs dynamically from the prefix when the component appears in multiple modules.
3. Use `getByTestId()` for all selectors.
4. Action methods return `this` for fluent chaining where appropriate.
5. Include common interaction methods (click, fill, select, assert visibility).
6. Name the class `<Name>Component`.
