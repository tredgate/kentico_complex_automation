# Exploration Report: Team Page (tester vs admin)

Date: 2026-04-19
App: http://localhost:5173

## Scope Executed

1. Logged in as `tester` (`tester` / `test123`)
2. Opened `/team`, captured initial snapshot, extracted `data-testid` values
3. Clicked a team member row from list
4. Navigated directly to `/team/1`
5. Logged out
6. Logged in as `admin` (`admin` / `admin123`)
7. Opened `/team`, captured snapshot and role differences
8. Clicked a team member row to open detail (`/team/1`)
9. Captured detail snapshot, extracted `data-testid` values
10. Logged out

## Access Matrix

| Role   | Route                  | Result                                                                |
| ------ | ---------------------- | --------------------------------------------------------------------- |
| tester | `/team`                | Allowed                                                               |
| tester | `/team/1` (row click)  | URL changes to `/team/1`, page shows **Permission Denied**            |
| tester | `/team/1` (direct URL) | Allowed to route shell, but content denied (`protected-route-denied`) |
| admin  | `/team`                | Allowed                                                               |
| admin  | `/team/1` (row click)  | Allowed, full team member detail page visible                         |

## Team List (`/team`)

### Page Structure

- Global shell: sidebar, breadcrumbs, page header, footer
- Team content:
  - Search input
  - Role filter select
  - Status filter select
  - Data table with sortable columns
  - Pagination + page size selector

### Team Table Structure

Columns observed:

1. Avatar
2. Name (sortable)
3. Email (sortable)
4. Role (sortable)
5. Projects
6. Status (sortable)

Rows observed in seed state:

- Tom Tester
- Laura Lead
- Alex Admin

### Elements (`data-testid`) - Team List

Key interactive/list elements:

- `team-list-page`
- `team-list-table`
- `team-list-input-search`
- `team-list-select-role-filter`
- `team-list-select-isActive-filter`
- `team-list-btn-sort-avatar`
- `team-list-btn-sort-fullName`
- `team-list-btn-sort-email`
- `team-list-btn-sort-role`
- `team-list-btn-sort-projectIds`
- `team-list-btn-sort-isActive`
- `team-list-row-1`, `team-list-row-2`, `team-list-row-3`
- `team-list-cell-avatar-1`, `team-list-cell-fullName-1`, `team-list-cell-email-1`, `team-list-cell-role-1`, `team-list-cell-projectIds-1`, `team-list-cell-isActive-1`
- `team-list-cell-avatar-2`, `team-list-cell-fullName-2`, `team-list-cell-email-2`, `team-list-cell-role-2`, `team-list-cell-projectIds-2`, `team-list-cell-isActive-2`
- `team-list-cell-avatar-3`, `team-list-cell-fullName-3`, `team-list-cell-email-3`, `team-list-cell-role-3`, `team-list-cell-projectIds-3`, `team-list-cell-isActive-3`
- `team-list-avatar-1`, `team-list-avatar-2`, `team-list-avatar-3`
- `team-list-badge-role`
- `team-list-pagination`
- `team-list-select-page-size`
- `team-list-btn-page-prev`
- `team-list-btn-page-next`

Shared layout elements:

- `sidebar-nav`, `sidebar-logo`
- `sidebar-link-dashboard`, `sidebar-link-projects`, `sidebar-link-defects`, `sidebar-link-test-plans`, `sidebar-link-team`
- `sidebar-btn-logout`, `sidebar-btn-collapse`
- `breadcrumbs-nav`, `breadcrumbs-link`
- `page-header`, `page-header-title`
- `footer`, `footer-version`, `footer-btn-reset`

Admin-only sidebar additions on list view:

- `sidebar-link-reports`
- `sidebar-link-settings`

### Dropdown / Select Options

Observed options:

- `team-list-select-role-filter`: `Role`, `tester`, `qa_lead`, `admin`
- `team-list-select-isActive-filter`: `Status`, `true`, `false`
- `team-list-select-page-size`: `5 per page`, `10 per page`, `25 per page`, `50 per page`

### Button States (Initial)

- `team-list-btn-page-prev`: disabled (single page data)
- `team-list-btn-page-next`: disabled (single page data)
- Sort buttons: enabled
- Row click targets: enabled/clickable

## Tester Behavior on Team Member Row and Direct Detail URL

### Row Click

- Clicking `team-list-row-1` navigates to `/team/1`.
- Tester does **not** receive detail content.
- Page renders denied state with heading: `Permission Denied` and text `You do not have access to this page.`

### Direct URL `/team/1`

- Same denied behavior as row click.
- `data-testid` on denied view includes:
  - `protected-route-denied`

### Denied View Test IDs

- `protected-route-denied`
- Plus shared shell IDs (`sidebar-*`, `breadcrumbs-*`, `footer-*`)

## Admin Team Member Detail (`/team/1`)

### Detail Page Structure

- Header area:
  - Back button to `/team`
  - User name title
  - `Edit Role` action button
- Main content:
  - Profile card with avatar, full name, email, role badge
  - Recent Defects Reported list (links to defect detail)
  - Recent Test Runs list with status badges
  - Projects list (links to project detail)
  - Stats cards: Defects Reported, Defects Assigned, Test Runs Executed

### Elements (`data-testid`) - Team Member Detail

- `user-detail-page`
- `page-header`
- `page-header-btn-back`
- `page-header-title`
- `user-detail-btn-edit`
- `user-detail-profile`
- `user-avatar-1`
- `user-avatar-1-role`
- `user-badge-role`
- `user-detail-activity`
- `defect-badge-status-13`
- `defect-badge-status-9`
- `defect-badge-status-1`
- `defect-badge-status-2`
- `defect-badge-status-3`
- `run-badge-status-2`
- `run-badge-status-1`
- `user-detail-projects`
- `user-detail-stats`
- Shared shell: `sidebar-*`, `breadcrumbs-*`, `footer-*`

## Role Differences: Tester vs Admin

1. Sidebar differs:
   - Admin has `Reports` and `Settings` navigation links.
   - Tester does not have these links.
2. Team list UI itself appears functionally the same across roles.
3. Critical difference is route authorization at `/team/:userId`:
   - Tester: denied (`protected-route-denied`)
   - Admin: full detail page
4. Row click from list always changes URL to `/team/:id`; authorization then decides displayed content.

## Validation / Error / Feedback Notes

- No form validation messages observed on `/team` list page (search and filters are non-blocking controls).
- No toast/success feedback shown for row navigation in this flow.
- Denied access feedback is clear and deterministic on tester detail attempt.

## Missing `data-testid` Warnings

- During this exploration, no critical interactive elements were found that lacked a stable `data-testid` anchor.
- No CSS/XPath fallback was required for the tested flows.

## Practical Automation Notes

- For role-based tests, assert both URL and rendered authorization state:
  - Tester row click: URL `/team/1` + `protected-route-denied`
  - Admin row click: URL `/team/1` + `user-detail-page`
- Row click behavior itself is not role-blocked; content access is.
