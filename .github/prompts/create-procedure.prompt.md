---
description: "Create a new Procedure function for a business-level workflow in the advanced approach"
agent: "agent"
argument-hint: "Workflow name, e.g. 'create defect and assign to lead'"
---

Create a new Procedure for the **$input** workflow.

## Context

- Reference [app_in_test_overview.md](../app_in_test_overview.md) for app behavior and data model.
- Follow [procedures.instructions.md](../instructions/procedures.instructions.md).

## Requirements

1. The procedure calls Page Object methods — no direct `page` interactions.
2. Uses typed test data from `tests/advanced/data/`.
3. Returns the Page Object the user ends up on after the workflow.
4. Naming: `<verb><Noun>` — e.g. `createDefect()`, `assignDefectTo()`.
5. Add the method to the `Procedures` class in `tests/advanced/procedures/`.
6. Accept `Partial<T>` data where appropriate to allow callers to override only what matters.
