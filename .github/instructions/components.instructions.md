---
description: "Use when creating or editing component objects in tests/advanced/components/. Covers reusable UI component abstraction patterns."
applyTo: "tests/advanced/components/**"
---

# Component Model Guidelines

## Purpose

Components represent reusable UI chunks that appear on multiple pages: sidebar, data tables, modals, toasts, breadcrumbs. They are composed into Page Objects rather than duplicated.

## Class Shape

```typescript
export class DataTableComponent {
  constructor(
    private readonly page: Page,
    private readonly prefix: string, // e.g. 'defect', 'project'
  ) {}

  // Builds test IDs dynamically: defect-table-row-1, project-table-row-3
  private rowLocator(id: string) {
    return this.page.getByTestId(`${this.prefix}-table-row-${id}`);
  }

  async clickRow(id: string): Promise<void> {
    await this.rowLocator(id).click();
  }

  async getRowCount(): Promise<number> {
    return this.page.getByTestId(`${this.prefix}-table-row`).count();
  }
}
```

## Composition

Page Objects compose components as `readonly` properties:

```typescript
class DefectListPage {
  readonly table = new DataTableComponent(this.page, "defect");
  readonly sidebar = new SidebarComponent(this.page);
}
```

## Naming

- Class: `<Name>Component` — e.g. `SidebarComponent`, `ModalComponent`
- File: `<name>.component.ts` — e.g. `sidebar.component.ts`

## Common Components

| Component             | UI Element                  | Parameterized by       |
| --------------------- | --------------------------- | ---------------------- |
| `SidebarComponent`    | Left navigation sidebar     | —                      |
| `DataTableComponent`  | List/table views            | `prefix` (module name) |
| `ModalComponent`      | Confirmation/input modals   | `prefix`               |
| `ToastComponent`      | Success/error notifications | —                      |
| `BreadcrumbComponent` | Top breadcrumb bar          | —                      |

## Fluent API

Component methods follow the same fluent pattern as Page Objects — return `this` for chainable actions when it makes sense.
