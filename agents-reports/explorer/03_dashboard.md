# Exploration Report: Dashboard (`/dashboard`)

> **Date**: 2026-04-19
> **App version**: Tredgate QA Hub v4.0.0
> **URL**: `http://localhost:5173/dashboard`
> **Tested roles**: tester, lead (qa_lead), admin

---

## Role-Comparison: Dashboard Sections Visibility

| Dashboard Section           | Tester | QA Lead | Admin |
| --------------------------- | :----: | :-----: | :---: |
| Page Header ("Dashboard")   |   ✅   |   ✅    |  ✅   |
| Stats Cards (4)             |   ✅   |   ✅    |  ✅   |
| My Assigned Defects table   |   ✅   |   ✅    |  ✅   |
| My Recent Test Runs table   |   ✅   |   ✅    |  ✅   |
| Unassigned Defects table    |   —    |   ✅    |  ✅   |
| Awaiting Verification table |   —    |   ✅    |  ✅   |
| System Overview cards (3)   |   —    |    —    |  ✅   |
| Recent Activity timeline    |   ✅   |   ✅    |  ✅   |

### Sidebar Links per Role

| Sidebar Link              | Tester | QA Lead | Admin |
| ------------------------- | :----: | :-----: | :---: |
| `sidebar-link-dashboard`  |   ✅   |   ✅    |  ✅   |
| `sidebar-link-projects`   |   ✅   |   ✅    |  ✅   |
| `sidebar-link-defects`    |   ✅   |   ✅    |  ✅   |
| `sidebar-link-test-plans` |   ✅   |   ✅    |  ✅   |
| `sidebar-link-team`       |   ✅   |   ✅    |  ✅   |
| `sidebar-link-reports`    |   —    |   ✅    |  ✅   |
| `sidebar-link-settings`   |   —    |    —    |  ✅   |

### Counter Values per Role (Seed Data)

| Counter Card  | Tester | QA Lead | Admin |
| ------------- | :----: | :-----: | :---: |
| Total Defects |   10   |   14    |  14   |
| Open Defects  |   9    |   12    |  12   |
| Test Plans    |   2    |    3    |   3   |
| Pass Rate     |  56%   |   56%   |  56%  |

> **Note**: Tester sees project-scoped counts (only projects they belong to). Lead and Admin see all projects.

---

## Elements: Stats Cards

| data-testid                          | Type | Tag | Notes                                           |
| ------------------------------------ | ---- | --- | ----------------------------------------------- |
| `dashboard-card-total-defects`       | card | div | Contains icon, value, and label. Not clickable. |
| `dashboard-card-total-defects-value` | text | p   | Numeric value (e.g. "14")                       |
| `dashboard-card-open-defects`        | card | div | Not clickable.                                  |
| `dashboard-card-open-defects-value`  | text | p   | Numeric value                                   |
| `dashboard-card-test-plans`          | card | div | Not clickable.                                  |
| `dashboard-card-test-plans-value`    | text | p   | Numeric value                                   |
| `dashboard-card-pass-rate`           | card | div | Not clickable.                                  |
| `dashboard-card-pass-rate-value`     | text | p   | Percentage string (e.g. "56%")                  |

> Cards parent container has no `data-testid`. CSS selector: `[data-testid="dashboard-page"] .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4`

---

## Elements: System Overview Cards (Admin Only)

| data-testid                            | Type | Tag | Notes                    |
| -------------------------------------- | ---- | --- | ------------------------ |
| `dashboard-card-total-users`           | card | div | Not clickable.           |
| `dashboard-card-total-users-value`     | text | p   | Numeric value (e.g. "3") |
| `dashboard-card-total-projects`        | card | div | Not clickable.           |
| `dashboard-card-total-projects-value`  | text | p   | Numeric value (e.g. "3") |
| `dashboard-card-active-projects`       | card | div | Not clickable.           |
| `dashboard-card-active-projects-value` | text | p   | Numeric value (e.g. "2") |

> Cards parent container has no `data-testid`. CSS selector: `[data-testid="dashboard-page"] .grid.grid-cols-1.md\\:grid-cols-3`

---

## Elements: My Assigned Defects Table

| data-testid                                      | Type          | Tag | Notes                                                                                                                                  |
| ------------------------------------------------ | ------------- | --- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `dashboard-my-defects-table`                     | table wrapper | div | Contains heading + table. **Note:** also reused as `data-testid` on badge `<span>` elements inside cells (severity, status, priority). |
| `dashboard-my-defects-btn-sort-title`            | column header | th  | **Sortable** (cursor: pointer). Click toggles asc/desc. Sort icon SVG appears when active.                                             |
| `dashboard-my-defects-btn-sort-projectId`        | column header | th  | Not sortable (cursor: auto). Label: "Project"                                                                                          |
| `dashboard-my-defects-btn-sort-severity`         | column header | th  | Not sortable. Label: "Severity"                                                                                                        |
| `dashboard-my-defects-btn-sort-status`           | column header | th  | Not sortable. Label: "Status"                                                                                                          |
| `dashboard-my-defects-btn-sort-priority`         | column header | th  | Not sortable. Label: "Priority"                                                                                                        |
| `dashboard-my-defects-row-{defectId}`            | data row      | tr  | **Clickable** (cursor: pointer). Navigates to `/defects/{defectId}`.                                                                   |
| `dashboard-my-defects-cell-title-{defectId}`     | cell          | td  | Defect title text                                                                                                                      |
| `dashboard-my-defects-cell-projectId-{defectId}` | cell          | td  | Project name                                                                                                                           |
| `dashboard-my-defects-cell-severity-{defectId}`  | cell          | td  | Contains badge `<span>` with severity text                                                                                             |
| `dashboard-my-defects-cell-status-{defectId}`    | cell          | td  | Contains badge `<span>` with status text                                                                                               |
| `dashboard-my-defects-cell-priority-{defectId}`  | cell          | td  | Contains badge `<span>` with priority text                                                                                             |

### Empty State

When the logged-in user has no assigned defects (observed for lead and admin), the table body shows a single row with `colspan="5"` containing: **"No assigned defects"**.

> **Warning**: The empty state `<td>` has no `data-testid`. CSS selector: `[data-testid="dashboard-my-defects-table"] td[colspan="5"]`

### Tester's Assigned Defects (Seed Data)

| Row testid                   | Title                                                          | Project         | Severity | Status      | Priority |
| ---------------------------- | -------------------------------------------------------------- | --------------- | -------- | ----------- | -------- |
| `dashboard-my-defects-row-2` | Shopping cart shows negative item count after rapid clicking   | Project Phoenix | Major    | Assigned    | P2       |
| `dashboard-my-defects-row-3` | Search returns results from parallel universe                  | Project Phoenix | Major    | In Progress | P2       |
| `dashboard-my-defects-row-4` | Checkout form accepts 'yesterday' as a credit card expiry date | Project Phoenix | Critical | Resolved    | P1       |
| `dashboard-my-defects-row-5` | Product images load upside down on Safari                      | Project Phoenix | Minor    | Verified    | P3       |
| `dashboard-my-defects-row-6` | Footer copyright shows year 1970                               | Project Phoenix | Trivial  | Closed      | P4       |

---

## Elements: My Recent Test Runs Table

| data-testid                                 | Type          | Tag | Notes                                                                     |
| ------------------------------------------- | ------------- | --- | ------------------------------------------------------------------------- |
| `dashboard-my-runs-table`                   | table wrapper | div | Contains heading + table. Also reused on badge `<span>` elements.         |
| `dashboard-my-runs-btn-sort-testPlanId`     | column header | th  | Not sortable. Label: "Test Plan"                                          |
| `dashboard-my-runs-btn-sort-status`         | column header | th  | Not sortable. Label: "Status"                                             |
| `dashboard-my-runs-btn-sort-results`        | column header | th  | Not sortable. Label: "Results"                                            |
| `dashboard-my-runs-btn-sort-startedAt`      | column header | th  | Not sortable. Label: "Date"                                               |
| `dashboard-my-runs-row-{runId}`             | data row      | tr  | **Clickable** (cursor: pointer). Navigates to `/test-plans/{testPlanId}`. |
| `dashboard-my-runs-cell-testPlanId-{runId}` | cell          | td  | Test plan name text                                                       |
| `dashboard-my-runs-cell-status-{runId}`     | cell          | td  | Contains badge `<span>` with status text                                  |
| `dashboard-my-runs-cell-results-{runId}`    | cell          | td  | Results string (e.g. "2/4 passed")                                        |
| `dashboard-my-runs-cell-startedAt-{runId}`  | cell          | td  | Date string (e.g. "18. 3. 2025")                                          |

### Empty State

When no test runs exist for the user (lead, admin), the table shows: **"No test runs"** (`colspan="4"`).

> **Warning**: The empty state `<td>` has no `data-testid`. CSS selector: `[data-testid="dashboard-my-runs-table"] td[colspan="4"]`

### Tester's Test Runs (Seed Data)

| Row testid                | Test Plan                          | Status      | Results    | Date        |
| ------------------------- | ---------------------------------- | ----------- | ---------- | ----------- |
| `dashboard-my-runs-row-2` | Phoenix Defect Management Workflow | In Progress | 2/4 passed | 18. 3. 2025 |
| `dashboard-my-runs-row-1` | Phoenix Login & Authentication     | Completed   | 3/5 passed | 15. 3. 2025 |

---

## Elements: Unassigned Defects Table (Lead & Admin Only)

| data-testid                                       | Type          | Tag | Notes                                              |
| ------------------------------------------------- | ------------- | --- | -------------------------------------------------- |
| `dashboard-unassigned-table`                      | table wrapper | div | Also reused on badge `<span>` elements.            |
| `dashboard-unassigned-btn-sort-title`             | column header | th  | **Sortable** (cursor: pointer). Toggles asc/desc.  |
| `dashboard-unassigned-btn-sort-projectId`         | column header | th  | Not sortable. Label: "Project"                     |
| `dashboard-unassigned-btn-sort-severity`          | column header | th  | Not sortable. Label: "Severity"                    |
| `dashboard-unassigned-btn-sort-reporterId`        | column header | th  | Not sortable. Label: "Reporter"                    |
| `dashboard-unassigned-btn-sort-createdAt`         | column header | th  | Not sortable. Label: "Created"                     |
| `dashboard-unassigned-row-{defectId}`             | data row      | tr  | **Clickable**. Navigates to `/defects/{defectId}`. |
| `dashboard-unassigned-cell-title-{defectId}`      | cell          | td  | Defect title text                                  |
| `dashboard-unassigned-cell-projectId-{defectId}`  | cell          | td  | Project name                                       |
| `dashboard-unassigned-cell-severity-{defectId}`   | cell          | td  | Contains severity badge `<span>`                   |
| `dashboard-unassigned-cell-reporterId-{defectId}` | cell          | td  | Reporter name                                      |
| `dashboard-unassigned-cell-createdAt-{defectId}`  | cell          | td  | Date string                                        |

### Unassigned Defects (Seed Data)

| Row testid                    | Title                                                  | Project         | Severity | Reporter   | Created     |
| ----------------------------- | ------------------------------------------------------ | --------------- | -------- | ---------- | ----------- |
| `dashboard-unassigned-row-1`  | Login button does nothing when password contains emoji | Project Phoenix | Critical | Tom Tester | 20. 3. 2025 |
| `dashboard-unassigned-row-9`  | Map pins cluster into a single point at zoom level 0   | Project Atlas   | Major    | Tom Tester | 20. 3. 2025 |
| `dashboard-unassigned-row-13` | Search autocomplete suggests locations in Narnia       | Project Atlas   | Minor    | Tom Tester | 20. 3. 2025 |

---

## Elements: Awaiting Verification Table (Lead & Admin Only)

| data-testid                                         | Type          | Tag | Notes                                              |
| --------------------------------------------------- | ------------- | --- | -------------------------------------------------- |
| `dashboard-verification-table`                      | table wrapper | div | Also reused on badge `<span>` elements.            |
| `dashboard-verification-btn-sort-title`             | column header | th  | **Sortable** (cursor: pointer).                    |
| `dashboard-verification-btn-sort-projectId`         | column header | th  | Not sortable. Label: "Project"                     |
| `dashboard-verification-btn-sort-severity`          | column header | th  | Not sortable. Label: "Severity"                    |
| `dashboard-verification-btn-sort-assigneeId`        | column header | th  | Not sortable. Label: "Assigned To"                 |
| `dashboard-verification-row-{defectId}`             | data row      | tr  | **Clickable**. Navigates to `/defects/{defectId}`. |
| `dashboard-verification-cell-title-{defectId}`      | cell          | td  | Defect title text                                  |
| `dashboard-verification-cell-projectId-{defectId}`  | cell          | td  | Project name                                       |
| `dashboard-verification-cell-severity-{defectId}`   | cell          | td  | Contains severity badge `<span>`                   |
| `dashboard-verification-cell-assigneeId-{defectId}` | cell          | td  | Assignee name                                      |

### Awaiting Verification Defects (Seed Data)

| Row testid                      | Title                                                          | Project         | Severity | Assigned To |
| ------------------------------- | -------------------------------------------------------------- | --------------- | -------- | ----------- |
| `dashboard-verification-row-4`  | Checkout form accepts 'yesterday' as a credit card expiry date | Project Phoenix | Critical | Tom Tester  |
| `dashboard-verification-row-12` | Export to PDF generates a haiku instead of a report            | Project Atlas   | Major    | Tom Tester  |

---

## Elements: Recent Activity Timeline

| data-testid                                   | Type             | Tag | Notes                                                                                    |
| --------------------------------------------- | ---------------- | --- | ---------------------------------------------------------------------------------------- |
| `dashboard-activity-timeline`                 | timeline wrapper | div | Contains all timeline entries.                                                           |
| `dashboard-activity-timeline-entry-{entryId}` | timeline entry   | div | Individual activity entry. No child `data-testid` elements. Inner structure is CSS-only. |

### Timeline Entry Internal Structure (no testids)

Each entry contains:

- A colored circle icon (SVG) — no testid
- User name (e.g. "Tom Tester") — no testid
- Date (e.g. "20. 3. 2025") — no testid
- Activity description paragraph (e.g. "Defect reported") — no testid

> **Warning**: Timeline entry child elements lack `data-testid` attributes. For targeting inner text, use CSS selectors relative to the entry:
>
> - User name: `[data-testid="dashboard-activity-timeline-entry-{id}"] div > div > div:first-child`
> - Date: `[data-testid="dashboard-activity-timeline-entry-{id}"] div > div > div:first-child + span` (or last child of same container)
> - Description: `[data-testid="dashboard-activity-timeline-entry-{id}"] p`

### Timeline Entries Observed

**Tester** sees 10 entries. **Lead** and **Admin** see 11 entries (activity across all projects).

| Entry testid (seed)                    | User       | Date        | Activity                             |
| -------------------------------------- | ---------- | ----------- | ------------------------------------ |
| `dashboard-activity-timeline-entry-41` | Tom Tester | 20. 3. 2025 | Defect reported                      |
| `dashboard-activity-timeline-entry-31` | Tom Tester | 20. 3. 2025 | Defect reported                      |
| `dashboard-activity-timeline-entry-1`  | Tom Tester | 20. 3. 2025 | Defect reported                      |
| `dashboard-activity-timeline-entry-44` | Tom Tester | 20. 3. 2025 | Adding file type validation          |
| `dashboard-activity-timeline-entry-43` | Laura Lead | 19. 3. 2025 | Assigned to Tom — urgent             |
| `dashboard-activity-timeline-entry-42` | Laura Lead | 19. 3. 2025 | Defect reported                      |
| `dashboard-activity-timeline-entry-33` | Laura Lead | 19. 3. 2025 | Assigned to Tom Tester               |
| `dashboard-activity-timeline-entry-3`  | Laura Lead | 19. 3. 2025 | Assigned to Tom Tester               |
| `dashboard-activity-timeline-entry-30` | Tom Tester | 19. 3. 2025 | Text color not updated for dark mode |
| `dashboard-activity-timeline-entry-32` | Laura Lead | 19. 3. 2025 | Defect reported                      |
| `dashboard-activity-timeline-entry-2`  | Tom Tester | 19. 3. 2025 | Defect reported                      |
| `dashboard-activity-timeline-entry-29` | Tom Tester | 18. 3. 2025 | Flash is gone but text is invisible  |
| `dashboard-activity-timeline-entry-6`  | Tom Tester | 18. 3. 2025 | Investigation started                |
| `dashboard-activity-timeline-entry-36` | Tom Tester | 18. 3. 2025 | Fixing floor list configuration      |
| `dashboard-activity-timeline-entry-5`  | Laura Lead | 17. 3. 2025 | Assigned to Tom Tester               |

> **Note**: Tester does not see entries 44, 43, 42, 32 (which belong to other projects or roles). Lead and Admin see the full cross-project set.

---

## Elements: Common (non-dashboard-specific)

| data-testid         | Type         | Tag    | Notes                                     |
| ------------------- | ------------ | ------ | ----------------------------------------- |
| `dashboard-page`    | page wrapper | div    | Root container for the dashboard content. |
| `page-header`       | header       | div    | Contains the page title.                  |
| `page-header-title` | heading      | h1     | Text: "Dashboard"                         |
| `breadcrumbs-nav`   | navigation   | nav    | Breadcrumb bar.                           |
| `breadcrumbs-link`  | link         | a      | "Home" link → `/dashboard`                |
| `footer`            | footer       | footer | Contains version and reset button.        |
| `footer-version`    | text         | span   | "Tredgate QA Hub v4.0.0"                  |
| `footer-btn-reset`  | button       | button | Resets localStorage seed data.            |

---

## Section Headings (No testids)

> **Warning**: All section `<h2>` headings lack `data-testid` attributes. They share the CSS class `text-lg font-semibold text-white mb-3`. Target them with CSS text-based selectors relative to the dashboard page.

| Heading Text          | Visible For | CSS selector alternative                                 |
| --------------------- | ----------- | -------------------------------------------------------- |
| My Assigned Defects   | All roles   | `[data-testid="dashboard-page"] h2` (1st)                |
| My Recent Test Runs   | All roles   | `[data-testid="dashboard-page"] h2` (2nd)                |
| Unassigned Defects    | Lead, Admin | `[data-testid="dashboard-page"] h2` (3rd for lead/admin) |
| Awaiting Verification | Lead, Admin | `[data-testid="dashboard-page"] h2` (4th for lead/admin) |
| System Overview       | Admin only  | `[data-testid="dashboard-page"] h2` (5th for admin)      |
| Recent Activity       | All roles   | Last `h2` within `[data-testid="dashboard-page"]`        |

---

## Sorting Behaviour

- Only the **"Title"** column header is sortable in each table (cursor: pointer).
- All other column headers have `cursor: auto` and are not clickable.
- **First click**: sorts ascending (A→Z).
- **Second click**: sorts descending (Z→A).
- A sort direction icon (SVG arrow) appears in the header after the first click.
- No `aria-sort` attribute is set on any header.
- Sorting is client-side and immediate (no loading state).

---

## User Flows

### Flow 1: View Dashboard as Tester

| Step | Action                                         | Result                                                                              |
| ---- | ---------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1    | Navigate to `/login`                           | Login page displays                                                                 |
| 2    | Enter `tester` / `test123`, click Sign In      | Redirected to `/dashboard`                                                          |
| 3    | Observe stats cards                            | 4 cards: Total Defects (10), Open Defects (9), Test Plans (2), Pass Rate (56%)      |
| 4    | Observe "My Assigned Defects" table            | 5 rows of assigned defects with columns: Title, Project, Severity, Status, Priority |
| 5    | Observe "My Recent Test Runs" table            | 2 rows of test runs with columns: Test Plan, Status, Results, Date                  |
| 6    | Observe "Recent Activity" timeline             | 10 timeline entries with activity from the tester's projects                        |
| 7    | Confirm "Unassigned Defects" is NOT present    | Section does not exist in DOM                                                       |
| 8    | Confirm "Awaiting Verification" is NOT present | Section does not exist in DOM                                                       |
| 9    | Confirm "System Overview" is NOT present       | Section does not exist in DOM                                                       |

### Flow 2: View Dashboard as QA Lead

| Step | Action                                   | Result                                                                                    |
| ---- | ---------------------------------------- | ----------------------------------------------------------------------------------------- |
| 1    | Log in as `lead` / `lead123`             | Redirected to `/dashboard`                                                                |
| 2    | Observe stats cards                      | 4 cards: Total Defects (14), Open Defects (12), Test Plans (3), Pass Rate (56%)           |
| 3    | Observe "My Assigned Defects" table      | Shows "No assigned defects" (empty state)                                                 |
| 4    | Observe "My Recent Test Runs" table      | Shows "No test runs" (empty state)                                                        |
| 5    | Observe "Unassigned Defects" table       | 3 rows of defects without assignees. Columns: Title, Project, Severity, Reporter, Created |
| 6    | Observe "Awaiting Verification" table    | 2 rows of resolved defects. Columns: Title, Project, Severity, Assigned To                |
| 7    | Observe "Recent Activity" timeline       | 11 timeline entries with cross-project activity                                           |
| 8    | Confirm "System Overview" is NOT present | Section does not exist in DOM                                                             |

### Flow 3: View Dashboard as Admin

| Step | Action                                | Result                                                            |
| ---- | ------------------------------------- | ----------------------------------------------------------------- |
| 1    | Log in as `admin` / `admin123`        | Redirected to `/dashboard`                                        |
| 2    | Observe stats cards                   | Same 4 cards as Lead (14, 12, 3, 56%)                             |
| 3    | Observe "My Assigned Defects" table   | Shows "No assigned defects" (empty state)                         |
| 4    | Observe "My Recent Test Runs" table   | Shows "No test runs" (empty state)                                |
| 5    | Observe "Unassigned Defects" table    | Same 3 rows as Lead                                               |
| 6    | Observe "Awaiting Verification" table | Same 2 rows as Lead                                               |
| 7    | Observe "System Overview" section     | 3 cards: Total Users (3), Total Projects (3), Active Projects (2) |
| 8    | Observe "Recent Activity" timeline    | 11 entries (same as Lead)                                         |

### Flow 4: Click Defect Row → Defect Detail

| Step | Action                                                   | Result                             |
| ---- | -------------------------------------------------------- | ---------------------------------- |
| 1    | As tester, click on a row in "My Assigned Defects" table | Navigates to `/defects/{defectId}` |
| 2    | As lead, click on a row in "Unassigned Defects" table    | Navigates to `/defects/{defectId}` |
| 3    | As lead, click on a row in "Awaiting Verification" table | Navigates to `/defects/{defectId}` |

### Flow 5: Click Test Run Row → Test Plan Detail

| Step | Action                                                   | Result                                  |
| ---- | -------------------------------------------------------- | --------------------------------------- |
| 1    | As tester, click on a row in "My Recent Test Runs" table | Navigates to `/test-plans/{testPlanId}` |

### Flow 6: Sort Table by Title

| Step | Action                            | Result                                                     |
| ---- | --------------------------------- | ---------------------------------------------------------- |
| 1    | Click "Title" column header       | Rows sort alphabetically A→Z. Sort icon appears in header. |
| 2    | Click "Title" column header again | Rows sort reverse Z→A. Sort icon changes direction.        |

---

## Edge Cases and Observations

1. **`data-testid` reuse on badge spans**: The testid `dashboard-my-defects-table`, `dashboard-unassigned-table`, `dashboard-verification-table`, and `dashboard-my-runs-table` are reused on the wrapper `<div>` AND on inner `<span>` badge elements (severity, status, priority pills). Using `document.querySelector('[data-testid="dashboard-my-defects-table"]')` returns the first match (the div wrapper), but `querySelectorAll` returns multiple elements. **This is a potential selector ambiguity for test automation.**

2. **Non-sortable columns have `btn-sort` in testid**: Despite testids like `dashboard-my-defects-btn-sort-projectId` suggesting sortability, only the "Title" columns actually respond to clicks. Other headers have `cursor: auto` and no click handler.

3. **Empty state text lacks testid**: "No assigned defects" and "No test runs" are rendered in `<td colspan>` elements with no `data-testid`. CSS fallback: `[data-testid="dashboard-my-defects-table"] td[colspan]`.

4. **Section headings lack testid**: All `<h2>` section headings ("My Assigned Defects", "My Recent Test Runs", etc.) have no `data-testid`. Their position in the DOM changes per role (e.g., "Recent Activity" is the 3rd `h2` for tester but the 6th for admin).

5. **Cards not interactive**: All stats cards and system overview cards have `cursor: auto` and no click handlers — they are display-only.

6. **Counter values are role-scoped**: Tester sees project-scoped counts (10 defects, 9 open, 2 plans). Lead and Admin see all-project counts (14 defects, 12 open, 3 plans). Pass rate is the same across roles (56%).

7. **Test run row navigates to test plan, not test run**: Clicking a row in "My Recent Test Runs" navigates to `/test-plans/{testPlanId}` (the test plan detail), not to a test run-specific route.

8. **Timeline entry IDs are non-sequential**: Entry IDs (e.g., 41, 31, 1, 44, 43) correspond to activity/history entry IDs from the data model, not sequential positions in the timeline.

9. **Role-hidden sections are not rendered**: Sections restricted by role (e.g., "System Overview" for tester) are completely absent from the DOM — not hidden, not disabled, just not rendered. Tests should check for absence with `expect(locator).toHaveCount(0)`.

10. **No `aria-sort` attribute**: Sorted column headers do not set `aria-sort` despite showing a visual sort indicator SVG. Accessibility concern.

11. **Timeline entries not clickable**: Activity timeline entries have no cursor pointer and no navigation behavior — they are informational only.

12. **Breadcrumb "Dashboard" segment has no testid**: The breadcrumb `<span>` showing "Dashboard" has the generic testid from the breadcrumb component but not a page-specific one. The "Home" link (`breadcrumbs-link`) navigates to `/dashboard`.
