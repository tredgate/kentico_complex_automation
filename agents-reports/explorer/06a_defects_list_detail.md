# Exploration Report: Defects List and Detail (Admin)

Date: 2026-04-19
Role used: admin
Base URL: http://localhost:5173

## Scope Covered

- Defect List: `/defects`
- Defect Detail: `/defects/1` (opened by clicking first row on `/defects`)

## Login and Entry

Credentials used:

- Username: `admin`
- Password: `admin123`

Result:

- Login successful, redirected to `/dashboard`, then navigated to `/defects`.

---

## 1) Defect List (`/defects`)

### Snapshot

Snapshot captured on `/defects`.
Observed key visible structure:

- Page header: `Defects`
- Primary action: `Report Defect`
- Search input + 4 filter dropdowns
- Data table with sortable headers
- Pagination footer with page-size selector and Previous/Next buttons

### Elements (data-testid)

Full extraction found 160 `data-testid` elements on page load (includes sidebar/breadcrumb/footer shell plus table row/cell instances).

#### Core list controls

| data-testid                         | Type                     | Notes                                                                                |
| ----------------------------------- | ------------------------ | ------------------------------------------------------------------------------------ |
| defect-list-page                    | container                | Root page wrapper                                                                    |
| defect-list-btn-new                 | button                   | "Report Defect"                                                                      |
| defect-list-table                   | container                | Holds filters + table                                                                |
| defect-list-input-search            | text input               | Search defects                                                                       |
| defect-list-select-severity-filter  | select                   | Severity filter                                                                      |
| defect-list-select-status-filter    | select                   | Status filter                                                                        |
| defect-list-select-priority-filter  | select                   | Priority filter                                                                      |
| defect-list-select-projectId-filter | select                   | Project filter                                                                       |
| defect-list-btn-sort-id             | table header (clickable) | Sort by ID                                                                           |
| defect-list-btn-sort-title          | table header (clickable) | Sort by Title                                                                        |
| defect-list-btn-sort-projectId      | table header (clickable) | Sort by Project                                                                      |
| defect-list-btn-sort-severity       | table header (clickable) | Sort by Severity                                                                     |
| defect-list-btn-sort-priority       | table header (clickable) | Sort by Priority                                                                     |
| defect-list-btn-sort-status         | table header (clickable) | Sort by Status                                                                       |
| defect-list-btn-sort-assigneeId     | table header             | Present in same style; no visible sort indicator but clickable header element exists |
| defect-list-btn-sort-updatedAt      | table header (clickable) | Sort by Updated                                                                      |
| defect-list-pagination              | container                | Showing range + controls                                                             |
| defect-list-select-page-size        | select                   | Page size                                                                            |
| defect-list-btn-page-prev           | button                   | Disabled on first page                                                               |
| defect-list-btn-page-next           | button                   | Enabled on first page                                                                |

#### Table row/cell pattern (dynamic)

| Pattern                          | Type  | Example observed                         |
| -------------------------------- | ----- | ---------------------------------------- |
| defect-list-row-<id>             | row   | defect-list-row-1 ... defect-list-row-10 |
| defect-list-cell-id-<id>         | cell  | defect-list-cell-id-1                    |
| defect-list-cell-title-<id>      | cell  | defect-list-cell-title-1                 |
| defect-list-cell-projectId-<id>  | cell  | defect-list-cell-projectId-1             |
| defect-list-cell-severity-<id>   | cell  | defect-list-cell-severity-1              |
| defect-list-cell-priority-<id>   | cell  | defect-list-cell-priority-1              |
| defect-list-cell-status-<id>     | cell  | defect-list-cell-status-1                |
| defect-list-cell-assigneeId-<id> | cell  | defect-list-cell-assigneeId-1            |
| defect-list-cell-updatedAt-<id>  | cell  | defect-list-cell-updatedAt-1             |
| defect-badge-severity-<id>       | badge | defect-badge-severity-1                  |
| defect-badge-priority-<id>       | badge | defect-badge-priority-1                  |
| defect-badge-status-<id>         | badge | defect-badge-status-1                    |

#### Shared shell elements seen on this page

| data-testid                                | Type           |
| ------------------------------------------ | -------------- |
| sidebar-nav, sidebar-logo, sidebar-link-\* | navigation     |
| sidebar-btn-logout, sidebar-btn-collapse   | buttons        |
| breadcrumbs-nav, breadcrumbs-link          | breadcrumb nav |
| page-header, page-header-title             | page heading   |
| footer, footer-version, footer-btn-reset   | footer         |

### Table columns

Observed headers in order:

1. ID
2. Title
3. Project
4. Severity
5. Priority
6. Status
7. Assignee
8. Updated

### Dropdown options

- `defect-list-select-severity-filter`
  - empty: Severity
  - critical
  - major
  - minor
  - trivial

- `defect-list-select-status-filter`
  - empty: Status
  - new
  - assigned
  - in_progress
  - resolved
  - verified
  - closed
  - rejected
  - reopened

- `defect-list-select-priority-filter`
  - empty: Priority
  - P1
  - P2
  - P3
  - P4

- `defect-list-select-projectId-filter`
  - empty: Project
  - value `1`: Project Phoenix
  - value `2`: Project Atlas
  - value `3`: Project Nebula

- `defect-list-select-page-size`
  - 5
  - 10
  - 25
  - 50

### Flow Script: Search / Filter / Sort / Pagination

| Step | Action                                       | Result                                                               |
| ---- | -------------------------------------------- | -------------------------------------------------------------------- |
| 1    | Open `/defects`                              | 10 rows visible (IDs 1-10), Previous disabled, Next enabled          |
| 2    | Search `emoji` in `defect-list-input-search` | Rows filtered to ID 1 only                                           |
| 3    | Clear search                                 | Full list view restored                                              |
| 4    | Set severity filter to `critical`            | Rows reduced to IDs 1, 4, 14; all visible severity badges = Critical |
| 5    | Reset severity; set status filter to `new`   | Rows reduced to IDs 1, 9, 13; all visible status badges = New        |
| 6    | Reset status; set page size to 5             | 5 rows shown (IDs 1-5), page indicator becomes page 1 of 3           |
| 7    | Click Next                                   | Rows become IDs 6-10, page indicator page 2 of 3, Previous enabled   |
| 8    | Return to page 1; set page size back to 10   | Restored 10-row view                                                 |
| 9    | Click Title header once                      | Order changes to ascending-by-title-like order                       |
| 10   | Click Title header again                     | Order changes to descending-by-title-like order                      |

### Observed quirks

- Pagination status text is concatenated without spacing separators in raw text extraction (UI still readable visually).

---

## 2) Defect Detail (`/defects/1`)

### Navigation into detail

Flow used:

- From `/defects`, clicked first defect row (`defect-list-row-1`)
- URL changed to `/defects/1`

### Snapshot

Snapshot captured on `/defects/1`.
Observed key visible structure:

- Header with defect identifier/title
- Action buttons: Assign, Edit
- Main content sections: Description, Comments, Status card, Assignment card, Details card, History timeline

### Elements (data-testid)

Extraction found 43 `data-testid` elements on this page.

#### Detail page core elements

| data-testid                       | Type             | Notes                                                       |
| --------------------------------- | ---------------- | ----------------------------------------------------------- |
| defect-detail-page                | container        | Root detail wrapper                                         |
| defect-detail-btn-assign          | button           | Enabled                                                     |
| defect-detail-btn-edit            | link/button-like | Navigates to `/defects/1/edit`                              |
| defect-detail-description         | container        | Description + steps                                         |
| defect-detail-comments            | container        | Comment list and add-comment area                           |
| defect-detail-comment-1           | container        | Existing comment block                                      |
| defect-detail-input-comment-label | label            | Add-comment label                                           |
| defect-detail-input-comment       | textarea         | Comment input                                               |
| defect-detail-btn-add-comment     | button           | Disabled until input has text                               |
| defect-detail-card-status         | card             | Current status, severity, priority                          |
| defect-badge-status-1             | badge            | Current status value (New)                                  |
| defect-badge-severity-1           | badge            | Severity value (Critical)                                   |
| defect-badge-priority-1           | badge            | Priority value (P1)                                         |
| defect-detail-card-assignment     | card             | Reporter + assignee                                         |
| defect-detail-card-details        | card             | Project/environment/created/updated                         |
| defect-detail-timeline            | container        | History section                                             |
| defect-detail-timeline-entry-1    | entry            | Timeline item test id reused (duplicate id observed in DOM) |

#### Comment and avatar-related detail elements

| data-testid                  | Type                      |
| ---------------------------- | ------------------------- |
| defect-comment-avatar-1      | avatar container          |
| defect-comment-avatar-1-role | avatar role text          |
| defect-reporter-avatar       | reporter avatar container |
| defect-reporter-avatar-role  | reporter role text        |

#### Shared shell elements seen on this page

| data-testid                                          | Type               |
| ---------------------------------------------------- | ------------------ |
| sidebar-nav, sidebar-link-_, sidebar-btn-_           | navigation/actions |
| breadcrumbs-nav, breadcrumbs-link                    | breadcrumb nav     |
| page-header, page-header-btn-back, page-header-title | heading/back       |
| footer, footer-version, footer-btn-reset             | footer             |

### Tabs check (Overview / Comments / History)

Requested tabs were explicitly checked.

Result:

- No tab components found (no `[role="tab"]`, no `data-testid` containing `tab`, no clickable Overview/Comments/History tab controls).
- `Comments` and `History` are present as section headings (`h3`) within the same page layout, not as switchable tabs.
- `Overview` label was not found on this page.

Potential fallback selectors (flaky, because they are headings and not tab controls):

- Comments heading CSS: `h3.text-lg.font-semibold.text-white.mb-4` (ambiguous; multiple sections share this class)
- Comments heading XPath: `//h3[normalize-space()='Comments']`
- History heading XPath: `//h3[normalize-space()='History']`

### Flow Script: Detail + Comments + History Checks

| Step | Action                                               | Result                                                             |
| ---- | ---------------------------------------------------- | ------------------------------------------------------------------ |
| 1    | Open `/defects` and click row `defect-list-row-1`    | Navigates to `/defects/1`                                          |
| 2    | Inspect header/actions                               | Assign button visible and enabled; Edit control visible            |
| 3    | Inspect status area                                  | Status badge shows New; Severity Critical; Priority P1             |
| 4    | Inspect comments area                                | Existing comment visible; add-comment textarea present             |
| 5    | Attempt tabs discovery for Overview/Comments/History | No tab controls exist; sections are inline headings                |
| 6    | Inspect history area                                 | Timeline container and entries present (`defect-detail-timeline*`) |

### Additional observed issues

- Console error appears on detail page: duplicate React key warning (`Encountered two children with the same key '1'`).
- Duplicate `data-testid` observed for timeline entry (`defect-detail-timeline-entry-1` appears more than once), which may affect strict selector uniqueness.

---

## Admin-role-only findings relevant to this scope

- Sidebar on defects pages includes admin-only links visible in this role (Reports, Settings).
- Defects list/detail functionality itself appears available and functional for admin.
