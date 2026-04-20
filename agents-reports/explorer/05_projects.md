# Exploration Report: Projects Module (`/projects`)

- Date: 2026-04-19
- App URL: http://localhost:5173
- Explored roles: `tester`, `lead` (`qa_lead`), `admin`

## Role Comparison (Visible/Hidden UI)

| UI / Capability                    | Tester  | Lead    | Admin   | Notes                                  |
| ---------------------------------- | ------- | ------- | ------- | -------------------------------------- |
| Sidebar `Projects` link            | Visible | Visible | Visible | `sidebar-link-projects`                |
| Sidebar `Reports` link             | Hidden  | Visible | Visible | `sidebar-link-reports`                 |
| Sidebar `Settings` link            | Hidden  | Hidden  | Visible | `sidebar-link-settings`                |
| Projects list `New Project` button | Hidden  | Visible | Visible | `project-list-btn-new`                 |
| Project detail `Edit` button       | Hidden  | Visible | Visible | link to `/projects/:id/edit`           |
| Access `/projects/new`             | Allowed | Allowed | Allowed | Unexpected for tester (see Edge Cases) |
| Access `/projects/:id/edit`        | Allowed | Allowed | Allowed | Unexpected for tester (see Edge Cases) |

## 1) Project List (`/projects`)

### Elements (All Roles, with role variance)

| data-testid                         | Type                 | Notes                                     |
| ----------------------------------- | -------------------- | ----------------------------------------- |
| `project-list-page`                 | page container       | Main page root                            |
| `project-list-btn-new`              | button/link          | Visible for lead/admin, hidden for tester |
| `project-list-table`                | table container      | Project data table                        |
| `project-list-input-search`         | text input           | Placeholder: `Search projects...`         |
| `project-list-select-status-filter` | select               | Status filter                             |
| `project-list-btn-sort-code`        | sort button          | Sorts by project code                     |
| `project-list-btn-sort-name`        | sort button          | Sorts by project name                     |
| `project-list-btn-sort-status`      | sort button          | Sorts by status                           |
| `project-list-btn-sort-leadId`      | sort button          | Sorts by lead                             |
| `project-list-btn-sort-memberIds`   | sort button          | Sorts by member count/list                |
| `project-list-btn-sort-updatedAt`   | sort button          | Sorts by last update                      |
| `project-list-row-<id>`             | row                  | Click opens detail                        |
| `project-list-cell-code-<id>`       | cell                 | Code (e.g., PHOENIX)                      |
| `project-list-cell-name-<id>`       | cell                 | Name (e.g., Project Phoenix)              |
| `project-list-cell-status-<id>`     | cell                 | Status (Active/Planning/...)              |
| `project-list-cell-leadId-<id>`     | cell                 | Lead                                      |
| `project-list-cell-memberIds-<id>`  | cell                 | Members                                   |
| `project-list-cell-updatedAt-<id>`  | cell                 | Last updated                              |
| `project-list-pagination`           | pagination container | Pager + size selector                     |
| `project-list-select-page-size`     | select               | `5`, `10`, `25`, `50` per page            |
| `project-list-btn-page-prev`        | button               | Previous page                             |
| `project-list-btn-page-next`        | button               | Next page                                 |

### Table Columns

- Code
- Name
- Status
- Lead
- Members
- Last Updated

### Search / Filter / Sorting / Pagination Behavior

| Feature                  | Steps                                                    | Result                                   |
| ------------------------ | -------------------------------------------------------- | ---------------------------------------- |
| Search (positive)        | Enter `Atlas` in `project-list-input-search`             | 1 row remains: Project Atlas             |
| Search (no match)        | Enter `zzzz-nope` in `project-list-input-search`         | 0 rows; text `No projects found` visible |
| Status filter `planning` | Select `planning` in `project-list-select-status-filter` | Only Planning rows shown                 |
| Status filter `active`   | Select `active`                                          | Only Active rows shown                   |
| Sort by code             | Click `project-list-btn-sort-code` twice                 | Order toggles (asc/desc)                 |
| Sort by name             | Click `project-list-btn-sort-name`                       | Name order changes                       |
| Pagination controls      | Inspect prev/next on seed data                           | Both visible but disabled on single page |
| Page size select         | Open `project-list-select-page-size`                     | Options: 5/10/25/50 per page             |

### Dropdown Options Found

- `project-list-select-status-filter`
  - `""` -> `Status`
  - `planning` -> `planning`
  - `active` -> `active`
  - `archived` -> `archived`
- `project-list-select-page-size`
  - `5` -> `5 per page`
  - `10` -> `10 per page`
  - `25` -> `25 per page`
  - `50` -> `50 per page`

## 2) Project Detail (`/projects/:id`)

### Elements (Top-level)

| data-testid                        | Type           | Notes        |
| ---------------------------------- | -------------- | ------------ |
| `project-detail-page`              | page container | Detail root  |
| `project-detail-tabs`              | tabs container | Holds 4 tabs |
| `project-detail-tab-overview`      | tab            | Overview     |
| `project-detail-tab-defects`       | tab            | Defects      |
| `project-detail-tab-badge-defects` | badge          | Defect count |
| `project-detail-tab-plans`         | tab            | Test Plans   |
| `project-detail-tab-badge-plans`   | badge          | Plan count   |
| `project-detail-tab-team`          | tab            | Team         |
| `project-detail-tab-badge-team`    | badge          | Team count   |
| `page-header-btn-back`             | button         | Back to list |

### Tab: Overview

| data-testid                                 | Type       | Notes              |
| ------------------------------------------- | ---------- | ------------------ |
| `project-detail-badge-status`               | badge      | Project status     |
| `project-detail-lead-avatar`                | avatar     | Lead avatar        |
| `project-detail-lead-avatar-role`           | role badge | Lead role          |
| `project-detail-env-table`                  | table      | Environments table |
| `project-detail-stat-defects` / `...-value` | stat card  | Defect count       |
| `project-detail-stat-plans` / `...-value`   | stat card  | Plan count         |
| `project-detail-stat-members` / `...-value` | stat card  | Member count       |

Overview environment columns: `Name`, `URL`.

### Tab: Defects

| data-testid                                  | Type        | Notes              |
| -------------------------------------------- | ----------- | ------------------ |
| `project-detail-defects-table`               | table       | Related defects    |
| `project-detail-defects-btn-sort-title`      | sort button | Sort title         |
| `project-detail-defects-btn-sort-severity`   | sort button | Sort severity      |
| `project-detail-defects-btn-sort-status`     | sort button | Sort status        |
| `project-detail-defects-btn-sort-assigneeId` | sort button | Sort assignee      |
| `project-detail-defects-row-<id>`            | row         | Defect row         |
| `project-detail-defects-pagination`          | pagination  | Per-tab pagination |
| `project-detail-defects-select-page-size`    | select      | Per-tab page size  |
| `project-detail-defects-btn-page-prev`       | button      | Previous page      |
| `project-detail-defects-btn-page-next`       | button      | Next page          |

Defects columns: `Title`, `Severity`, `Status`, `Assignee`.

### Tab: Test Plans

| data-testid                               | Type        | Notes                |
| ----------------------------------------- | ----------- | -------------------- |
| `project-detail-plans-table`              | table       | Related plans        |
| `project-detail-plans-btn-sort-name`      | sort button | Sort name            |
| `project-detail-plans-btn-sort-status`    | sort button | Sort status          |
| `project-detail-plans-btn-sort-testCases` | sort button | Sort test case count |
| `project-detail-plans-btn-sort-updatedAt` | sort button | Sort updated date    |
| `project-detail-plans-row-<id>`           | row         | Plan row             |
| `project-detail-plans-pagination`         | pagination  | Per-tab pagination   |
| `project-detail-plans-select-page-size`   | select      | Per-tab page size    |
| `project-detail-plans-btn-page-prev`      | button      | Previous             |
| `project-detail-plans-btn-page-next`      | button      | Next                 |

Test Plans columns: `Name`, `Status`, `Test Cases`, `Last Updated`.

### Tab: Team

| data-testid                | Type           | Notes             |
| -------------------------- | -------------- | ----------------- |
| `project-detail-team-list` | list container | Team members list |

Warning (no child testids in team rows):

- Team item rows appear without dedicated child `data-testid` attributes.
- Reliable fallback selector (may be more flaky than testid): `.space-y-4 > .rounded-lg.border` under `[data-testid="project-detail-team-list"]`.
- XPath fallback: `//*[@data-testid='project-detail-team-list']//*[contains(@class,'rounded-lg') and contains(@class,'border')]`

### Edit Button Presence by Role

- Tester: not visible on detail page
- Lead: visible (link to `/projects/1/edit`)
- Admin: visible (link to `/projects/1/edit`)

## 3) Create Project (`/projects/new`)

### Step 1: Basic Info

| data-testid                      | Type           | Notes      |
| -------------------------------- | -------------- | ---------- |
| `project-form-step-1`            | step container | Basic info |
| `project-form-input-name`        | text input     | Required   |
| `project-form-input-code`        | text input     | Required   |
| `project-form-input-description` | textarea       | Required   |
| `project-form-select-status`     | select         | Required   |
| `project-form-wizard-btn-next`   | button         | Next step  |
| `project-form-wizard-btn-cancel` | button         | Cancel     |

Validation observed on empty submit:

- `Project name is required`
- `Project code is required`
- `Description is required`

Dropdown options:

- `project-form-select-status`
  - `planning` -> `Planning`
  - `active` -> `Active`
  - `archived` -> `Archived`

### Step 2: Team Assignment

| data-testid                    | Type                 | Notes                     |
| ------------------------------ | -------------------- | ------------------------- |
| `project-form-step-2`          | step container       | Team assignment           |
| `project-form-select-lead`     | select               | Required                  |
| `project-form-select-members`  | multi-select trigger | Optional in observed flow |
| `project-form-wizard-btn-back` | button               | Back                      |
| `project-form-wizard-btn-next` | button               | Next                      |

Validation observed:

- `QA Lead is required`

Dropdown options:

- `project-form-select-lead`
  - `""` -> `Select QA Lead`
  - `2` -> `Laura Lead`
  - `3` -> `Alex Admin`

### Step 3: Environments

| data-testid                     | Type           | Notes                |
| ------------------------------- | -------------- | -------------------- |
| `project-form-step-3`           | step container | Environments         |
| `project-form-btn-add-env`      | button         | Adds environment row |
| `project-form-env-row-0`        | row container  | First env row        |
| `project-form-env-name-0`       | text input     | Required             |
| `project-form-env-type-0`       | select         | Required             |
| `project-form-env-url-0`        | text input     | URL field            |
| `project-form-btn-remove-env-0` | button         | Remove env row       |
| `project-form-envs-error`       | error text     | Seen when no envs    |

Validation observed:

- `At least one environment is required` (when no rows)
- `Environment name is required` (row added but name empty)

Dropdown options:

- `project-form-env-type-0`
  - `dev` -> `Dev`
  - `staging` -> `Staging`
  - `production` -> `Production`

### Step 4: Review

| data-testid                      | Type           | Notes           |
| -------------------------------- | -------------- | --------------- |
| `project-form-step-4`            | step container | Review summary  |
| `project-form-wizard-btn-submit` | submit button  | Label: `Submit` |
| `project-form-wizard-btn-back`   | button         | Back            |
| `project-form-wizard-btn-cancel` | button         | Cancel          |

Review sections observed:

- `Project Details`
- `Team Information`
- `Environments`

## 4) Edit Project (`/projects/:id/edit`)

Edit uses the same 4-step wizard and test IDs as Create, with prefilled values.

### Prefilled Basic Info (Project 1)

| Field       | testid                           | Observed value                |
| ----------- | -------------------------------- | ----------------------------- |
| Name        | `project-form-input-name`        | `Project Phoenix`             |
| Code        | `project-form-input-code`        | `PHOENIX`                     |
| Description | `project-form-input-description` | Prefilled project description |
| Status      | `project-form-select-status`     | `active`                      |

### Team Step (Observed)

- `project-form-select-lead` preselected value: `2` (`Laura Lead`)
- `project-form-select-members` present

### Environment Step (Observed)

- Existing rows preloaded: `project-form-env-row-0`, `project-form-env-row-1`, `project-form-env-row-2`
- Fields prefilled from current environments
- `project-form-btn-add-env` available

### Review/Submit

- Step 4 visible after progressing through steps
- Submit control: `project-form-wizard-btn-submit` (`Submit`)

## Flow Scripts (Step/Result)

### A) Viewing Project List

| Step                       | Result                                                       |
| -------------------------- | ------------------------------------------------------------ |
| Login and open `/projects` | List loads with table, search, status filter, and pagination |
| Use search `Atlas`         | Table narrows to one matching row                            |
| Use search with no match   | `No projects found` message shown                            |
| Apply status filter        | Rows limited to selected status                              |
| Click sort buttons         | Row order changes and toggles                                |
| Inspect role-level actions | `New Project` hidden for tester; visible for lead/admin      |

### B) Viewing Project Detail

| Step                          | Result                                          |
| ----------------------------- | ----------------------------------------------- |
| Click a project row from list | Navigates to `/projects/:id`                    |
| Check tabs                    | Overview, Defects, Test Plans, Team are present |
| Open each tab                 | Tab-specific table/list content shown           |
| Check edit action by role     | Hidden for tester, visible for lead/admin       |

### C) Creating Project

| Step                                     | Result                                 |
| ---------------------------------------- | -------------------------------------- |
| Open `/projects/new`                     | 4-step wizard opens                    |
| Submit Step 1 empty                      | Required field validation appears      |
| Complete Step 1                          | Moves to Team Assignment               |
| Submit Step 2 without QA Lead            | `QA Lead is required`                  |
| Set QA Lead and continue                 | Moves to Environments                  |
| Continue without environments            | `At least one environment is required` |
| Add environment row and leave name empty | `Environment name is required`         |
| Fill valid environment and continue      | Review step appears with submit button |

### D) Editing Project

| Step                    | Result                                  |
| ----------------------- | --------------------------------------- |
| Open `/projects/1/edit` | Edit wizard opens with prefilled values |
| Move through steps      | Team and environment data pre-populated |
| Reach review            | Submit button available                 |

### E) Role Restriction Checks

| Step                            | Expected                      | Actual                                |
| ------------------------------- | ----------------------------- | ------------------------------------- |
| Tester opens `/projects/new`    | Access denied                 | Create form is accessible             |
| Tester opens `/projects/1/edit` | Access denied                 | Edit form is accessible               |
| Tester on list/detail actions   | No create/edit action buttons | New/Edit buttons hidden in visible UI |

## Edge Cases / Notes

1. Permission mismatch observed: tester cannot see create/edit action buttons, but direct URL access to `/projects/new` and `/projects/:id/edit` is allowed.
2. `No projects found` message appears for empty search results but no dedicated `data-testid` was found for that empty-state text.
   - CSS fallback: `table tbody tr td[colspan]` (inside `project-list-table`)
   - XPath fallback: `//*[@data-testid='project-list-table']//tbody//td[@colspan]`
3. Team tab has only container-level testid (`project-detail-team-list`); child rows do not expose stable testids.
4. Pagination controls are present even on a single page; prev/next are disabled in this state.
