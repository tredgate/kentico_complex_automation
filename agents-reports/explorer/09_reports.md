# Exploration Report: Reports Page (tester denied, lead, admin)

Date: 2026-04-19
App: http://localhost:5173

## Tester Denied Check (`/reports`)

### Flow

1. Logged in as `tester` / `test123`.
2. Navigated directly to `/reports`.
3. Denied placeholder rendered.
4. Logged out.

### Denied Placeholder

| data-testid | Type | Observed text |
| --- | --- | --- |
| `protected-route-denied` | `div` | `Permission Denied` + `You do not have access to this page.` |

### Additional elements visible in denied state

- `sidebar-nav`
- `sidebar-link-dashboard`
- `sidebar-link-projects`
- `sidebar-link-defects`
- `sidebar-link-test-plans`
- `sidebar-link-team`
- `sidebar-btn-logout`
- `breadcrumbs-nav`
- `footer`
- `footer-btn-reset`

## Lead View (`/reports`)

### Page Structure

- Header: `Reports`
- Tabs:
  - `reports-tab-defect-trends` (default)
  - `reports-tab-test-coverage`
  - `reports-tab-team-workload`
- Filters area (on Defect Trends tab):
  - `reports-filter-project` (`select`)
  - `reports-filter-date-from` (`input type=date`)
  - `reports-filter-date-to` (`input type=date`)
- Defect Trends content:
  - KPI cards: total/open/critical/avg resolve time
  - Tables: severity, status, project breakdown
- Test Coverage content:
  - KPI cards: total plans, total cases, overall pass rate
  - Table: test plan summary
- Team Workload content:
  - Table: team member summary
  - Lists/cards: top reporters, top executors

### All data-testid elements observed (lead at `/reports`)

- `reports-page`
- `page-header`
- `page-header-title`
- `reports-tabs`
- `reports-tab-defect-trends`
- `reports-tab-test-coverage`
- `reports-tab-team-workload`
- `reports-filter-project-label`
- `reports-filter-project`
- `reports-filter-date-from-label`
- `reports-filter-date-from`
- `reports-filter-date-to-label`
- `reports-filter-date-to`
- `reports-defect-stats`
- `reports-stat-total`
- `reports-stat-total-value`
- `reports-stat-open`
- `reports-stat-open-value`
- `reports-stat-critical`
- `reports-stat-critical-value`
- `reports-stat-avg`
- `reports-stat-avg-value`
- `reports-severity-table`
- `reports-status-table`
- `reports-project-table`
- `sidebar-nav`
- `sidebar-logo`
- `sidebar-link-dashboard`
- `sidebar-link-projects`
- `sidebar-link-defects`
- `sidebar-link-test-plans`
- `sidebar-link-team`
- `sidebar-link-reports`
- `sidebar-btn-logout`
- `sidebar-btn-collapse`
- `breadcrumbs-nav`
- `breadcrumbs-link`
- `footer`
- `footer-version`
- `footer-btn-reset`

### Interaction Results (lead)

1. Switched to `Test Coverage` tab: tab content changed to test-plan KPIs and summary table.
2. Switched to `Team Workload` tab: tab content changed to team summary table and top performers sections.
3. Returned to `Defect Trends` tab.
4. Changed filter project from `All Projects` to `Project Atlas`.
5. Entered date range `2026-01-01` to `2026-12-31`.

Observed KPI values after Atlas + date filter:
- Total Defects: `5`
- Open Defects: `5`
- Critical Defects: `0`
- Avg Time to Resolve: `52 hrs`

Additional edge check:
- Set `From Date` later than `To Date` (`2026-12-31` > `2026-01-01`).
- No inline validation message appeared.
- Existing filtered values remained rendered (no immediate error state visible).

## Admin View (`/reports`)

### Flow

1. Logged in as `admin` / `admin123`.
2. Navigated to `/reports`.
3. Captured page snapshot and `data-testid` inventory.
4. Logged out.

### Observed Differences vs Lead

- Core Reports page structure is the same as lead on initial load:
  - Same tabs: Defect Trends, Test Coverage, Team Workload
  - Same default Defect Trends metrics and tables
  - Same filter controls for project/date
- Sidebar includes one additional navigation item for admin role:
  - `sidebar-link-settings`

### Admin `data-testid` notes

- Reports-specific IDs matched lead view.
- Additional role-level ID present in shell navigation:
  - `sidebar-link-settings`

## Summary

- Tester is denied on `/reports` with `protected-route-denied`.
- Lead has full Reports access with interactive tabs and working project/date filtering.
- Admin has same Reports functionality as lead; practical page-level difference observed was the admin-only Settings link in sidebar shell.
- No inline validation/error message was displayed when From Date was set later than To Date.
