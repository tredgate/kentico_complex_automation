# Exploration Report: Defects (ADMIN)

Date: 19. dubna 2026  
App: http://localhost:5173  
Role: admin (`admin` / `admin123`)

## Scope Executed

1. Logged in as admin
2. Clicked footer `Reset Data` (seed reset) before exploration
3. Opened `/defects` and captured snapshot
4. Opened `/defects/2` and captured snapshot
5. Checked `/defects/3`
6. Checked `/defects/7`
7. Opened `/defects/2/edit` and captured snapshot
8. Logged out

## Findings

### `/defects` (after reset)

- Snapshot: captured
- Primary visible action button:
  - `Report Defect` (`data-testid="defect-list-btn-new"`)
- Pagination buttons visible:
  - `Previous` (`defect-list-btn-page-prev`, disabled on page 1)
  - `Next` (`defect-list-btn-page-next`)
- Relevant row/status baseline:
  - Defect `#2` status `Assigned`
  - Defect `#3` status `In Progress`
  - Defect `#7` status `Rejected`

### `/defects/2`

- Snapshot: captured
- Current status: `Assigned` (`data-testid="defect-badge-status-2"`)
- Visible top action controls:
  - `Start Work` (`defect-detail-btn-start`)
  - `Reject` (`defect-detail-btn-reject`)
  - `Edit` (`defect-detail-btn-edit`)

### `/defects/3`

- Current status: `In Progress` (`defect-badge-status-3`)
- Visible top action controls:
  - `Resolve` (`defect-detail-btn-resolve`)
  - `Edit` (`defect-detail-btn-edit`)

### `/defects/7`

- Current status: `Rejected` (`defect-badge-status-7`)
- Visible top action controls:
  - `Reopen` (`defect-detail-btn-reopen`)
  - `Edit` (`defect-detail-btn-edit`)

### `/defects/2/edit`

- Snapshot: captured
- Result: edit form loads successfully
- Stepper and form controls are present (Basic Info step visible with `Cancel` and `Next` buttons)

### Logout

- Logout successful
- Final route: `/login`

## Notes

- Status action buttons are state-dependent and differ as expected across #2, #3, and #7.
- Repeated React console warning observed during detail navigation: duplicate key (`2`), but flow remained functional.
