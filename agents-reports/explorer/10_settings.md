# Exploration Report: Settings Page (tester denied, lead denied, admin access)

Date: 2026-04-19
App: http://localhost:5173

## Tester Denied Check (`/settings`)

### Flow

1. Logged in as `tester` / `test123`.
2. Navigated directly to `/settings`.
3. Verified denied placeholder.
4. Logged out.

### Denied State Elements

| data-testid | Type | Notes |
| --- | --- | --- |
| `protected-route-denied` | container | Shows denied icon + message |
| `sidebar-nav` | nav | Sidebar visible while route content is denied |
| `sidebar-link-dashboard` | link | Present |
| `sidebar-link-projects` | link | Present |
| `sidebar-link-defects` | link | Present |
| `sidebar-link-test-plans` | link | Present |
| `sidebar-link-team` | link | Present |
| `sidebar-btn-logout` | button | Works |
| `breadcrumbs-nav` | nav | Breadcrumb still renders |
| `footer-btn-reset` | button | Present in global footer |

### Denied Text

- `Permission Denied`
- `You do not have access to this page.`

## Lead Denied Check (`/settings`)

### Flow

1. Logged in as `lead` / `lead123`.
2. Navigated directly to `/settings`.
3. Verified denied placeholder.
4. Logged out.

### Denied State Elements

Same denied placeholder behavior as tester, plus lead-only shell nav item:

- `sidebar-link-reports` is present for lead.
- `protected-route-denied` renders with the same denied text.

### Denied Text

- `Permission Denied`
- `You do not have access to this page.`

## Admin Full Access (`/settings`)

### Initial Snapshot Summary

Admin can open full Settings page with:

- Page title: `Settings`
- Section: `Data Management`
- Section: `System Info`
- Cards: entity counts and localStorage usage

### All `data-testid` Elements Observed

- `sidebar-nav`
- `sidebar-logo`
- `sidebar-link-dashboard`
- `sidebar-link-projects`
- `sidebar-link-defects`
- `sidebar-link-test-plans`
- `sidebar-link-team`
- `sidebar-link-reports`
- `sidebar-link-settings`
- `sidebar-btn-logout`
- `sidebar-btn-collapse`
- `breadcrumbs-nav`
- `breadcrumbs-link`
- `settings-page`
- `page-header`
- `page-header-title`
- `settings-btn-reset`
- `settings-btn-clear`
- `settings-btn-export`
- `settings-btn-import`
- `settings-system-info`
- `footer`
- `footer-version`
- `footer-btn-reset`

Modal-related IDs observed during interaction:

- `settings-clear-modal`
- `settings-clear-modal-title`
- `settings-clear-modal-btn-close`
- `settings-reset-modal`
- `settings-import-modal`
- `settings-import-modal-title`
- `settings-import-modal-btn-close`
- `settings-import-file-label`
- `settings-import-file`

### Forms / Inputs / Toggles / Buttons

No traditional settings form fields were found (no text inputs, no select dropdowns, no toggles on main page).

Primary actions are buttons:

| data-testid | Label | State | Behavior |
| --- | --- | --- | --- |
| `settings-btn-reset` | Reset to Seed Data | Enabled | Opens confirmation modal |
| `settings-btn-clear` | Clear All Data | Enabled | Opens confirmation modal |
| `settings-btn-export` | Export Data | Enabled | Triggers export success toast |
| `settings-btn-import` | Import Data | Enabled | Opens import modal |

Import modal controls:

- `settings-import-file` (file upload trigger area)
- `Import` button is disabled until a file is selected
- `Cancel` button closes modal

### System Info (initial admin values)

- App Version: `1.0.0`
- localStorage Usage: `29.94 KB`
- Users: `3`
- Projects: `3`
- Defects: `14`
- Test Plans: `3`
- Test Runs: `2`

### Interaction Results

1. Export Data:
- Clicked `settings-btn-export`.
- Success feedback appeared:
  - `Data exported as tqh-export-2026-04-19T18-36-45-671Z.json`
- Entity counts unchanged.

2. Clear All Data (cancel path):
- Clicked `settings-btn-clear`.
- Confirmation modal appeared with warning text:
  - `This will delete all data from localStorage. This cannot be undone.`
- Clicked `Cancel`.
- Data unchanged.

3. Clear All Data (confirm path):
- Reopened clear modal and confirmed `Clear`.
- Success feedback appeared:
  - `All data cleared. Reloading...`
- Immediately after action, system info showed zeros:
  - Users/Projects/Defects/Test Plans/Test Runs = `0`
  - localStorage usage showed `0.00 KB`

4. Reset to Seed Data (confirm path):
- Opened reset modal and confirmed `Reset`.
- Success feedback appeared:
  - `Data reset to seed state. Reloading...`
- Immediate post-click view showed zero counts before reload completed.
- After manual page reload, seeded values were restored:
  - Users `3`, Projects `3`, Defects `14`, Test Plans `3`, Test Runs `2`

5. Import Data:
- Clicked `settings-btn-import`.
- Import modal opened with guidance text:
  - `Select a JSON file exported from a previous backup.`
- Import action button stayed disabled without selected file.
- Cancel closed modal.

### Validation / Feedback Observed

- Confirmation modals are used for destructive operations (`Clear`, `Reset`).
- Toast success messages appear for completed actions (`Export`, `Clear`, `Reset`).
- No inline field validation on the main Settings page (no form fields present).
- Import modal enforces disabled Import button until file selection.

### Dropdown Options

- None observed on `/settings`.

### Edge Cases / Notes

- `Clear` and `Reset` toasts mention reloading; UI may briefly display zeroed counts before reload finalizes.
- A manual browser reload confirmed seeded data restoration after reset workflow.

### Missing `data-testid` Warnings (potentially flaky selectors)

The following interactive modal buttons did not expose dedicated `data-testid` values and may require text/CSS-based fallback selectors:

- Clear modal confirm button (`Clear`):
  - CSS fallback: `button.btn.btn-danger` scoped inside `[data-testid="settings-clear-modal"]`
  - XPath fallback: `//div[@data-testid='settings-clear-modal']//button[normalize-space()='Clear']`

- Reset modal confirm button (`Reset`):
  - CSS fallback: `button.btn.btn-danger` scoped inside `[data-testid="settings-reset-modal"]`
  - XPath fallback: `//div[@data-testid='settings-reset-modal']//button[normalize-space()='Reset']`

- Modal cancel buttons (`Cancel`):
  - CSS fallback: `[data-testid="settings-clear-modal"] button.btn.btn-secondary` and `[data-testid="settings-reset-modal"] button.btn.btn-secondary`
  - XPath fallback: `//div[@data-testid='settings-clear-modal']//button[normalize-space()='Cancel']` and `//div[@data-testid='settings-reset-modal']//button[normalize-space()='Cancel']`

## Final Role Outcome

- Tester: denied on `/settings` (`protected-route-denied`).
- Lead: denied on `/settings` (`protected-route-denied`).
- Admin: full Settings access with data-management actions, confirmation modals, and toast feedback.
