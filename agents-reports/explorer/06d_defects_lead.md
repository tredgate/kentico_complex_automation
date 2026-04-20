# Exploration Report: Defects (LEAD Role)

Date: 19. dubna 2026  
App: http://localhost:5173  
Role: lead (`lead` / `lead123`)

## Scope Executed

1. Login as lead
2. Open `/defects` and capture snapshot
3. Open `/defects/1` and capture snapshot
4. Trigger one status transition action from `/defects/1`
5. Open `/defects/1/edit` and capture snapshot
6. Open `/defects/5` (different status) and capture snapshot
7. Logout

## Findings

### 1) Login

- Result: Success
- Post-login route: `/dashboard`

### 2) `/defects` (list)

- Snapshot: Captured
- Visible main action button: `Report Defect` (`data-testid="defect-list-btn-new"`)
- Other visible list controls:
  - `Previous` (`defect-list-btn-page-prev`)
  - `Next` (`defect-list-btn-page-next`)
- Defect #1 row is visible and clickable.

### 3) `/defects/1` (detail, initial state)

- Snapshot: Captured
- Defect status shown: `New`
- Visible top actions:
  - `Assign` (`defect-detail-btn-assign`)
  - `Edit` (`defect-detail-btn-edit`)
- From requested transition set (`Assign/Resolve/Verify/Close/Reject/Reopen`): only `Assign` is present in initial state.

### 4) Status transition test on `/defects/1`

- Action performed: Clicked `Assign`, then selected assignee `Tom Tester` in assign modal (`modal-assign-select-assignee`).
- Observed behavior:
  - Assignment applied immediately after assignee selection (no explicit submit button observed).
  - Modal closed automatically.
  - Status changed from `New` to `Assigned`.
  - Action buttons changed to:
    - `Start Work` (additional workflow action)
    - `Reject` (`defect-detail-btn-reject`)
    - `Edit`
  - Toast appeared: `Status updated to assigned`.

### 5) `/defects/1/edit`

- Snapshot: Captured
- Result: Form loads successfully (no access denied)
- Edit wizard is visible with steps and buttons `Cancel` + `Next`.

### 6) `/defects/5` (different status)

- Snapshot: Captured
- Current status shown: `Verified`
- Visible top actions:
  - `Close` (`defect-detail-btn-close`)
  - `Reopen` (`defect-detail-btn-reopen`)
  - `Edit` (`defect-detail-btn-edit`)
- Confirms different status exposes different transition actions.

### 7) Logout

- Result: Success
- Final route: `/login`

## Notes

- Repeated React console warning observed during navigation/actions: duplicate key (`1` / occasionally `2`). Flow remained functional.
- Assign modal `Cancel` button did not expose a `data-testid` in this run. Potential fallback selector (flakier): `button:has-text("Cancel")` or XPath `//button[normalize-space()="Cancel"]`.
