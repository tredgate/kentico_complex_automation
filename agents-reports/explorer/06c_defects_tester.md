# Exploration Report: Defects (Tester Role)

Date: 19. dubna 2026
App: http://localhost:5173
Role: tester (`tester` / `test123`)

## Scope Executed

1. Login as tester
2. Open `/defects` and capture snapshot
3. Open `/defects/1` and capture snapshot
4. Open `/defects/1/edit` and capture snapshot
5. Open `/defects/new` and capture snapshot
6. Logout

## Findings

### 1) Login as tester

- Result: Success
- Post-login route: `/dashboard`

### 2) `/defects`

- Snapshot: captured
- `Report Defect` button: Present and visible
- Additional role signal: Sidebar shows `Dashboard`, `Projects`, `Defects`, `Test Plans`, `Team` (no `Reports`, no `Settings`)

### 3) `/defects/1`

- Snapshot: captured
- `Edit` button/link: Present and visible (links to `/defects/1/edit`)
- Visible action buttons on detail page:
  - `Edit` (top-right)
  - `Add Comment` (visible, disabled when comment textarea is empty)

### 4) `/defects/1/edit`

- Snapshot: captured
- Access result: Allowed (edit wizard/form loads, not denied)
- Observed controls: `Cancel`, `Next`, editable title/project/severity/priority fields

### 5) `/defects/new`

- Snapshot: captured
- Access result: Allowed
- Create form result: Loaded (`Report Defect` multi-step form visible)

### 6) Logout

- Result: Success
- Final route: `/login`

## Notes

- During navigation to `/defects/1`, browser console reported React warning about duplicate key `1` (non-blocking for this flow).
