# Exploration Report: Test Plans (List, Detail, Create, Edit) - Admin

Date: 2026-04-19
Base URL: http://localhost:5173
Role: admin (admin/admin123)

## Scope and Flow Executed

1. Logged in as admin (Reset Data button is not available on public login page).
2. Clicked footer Reset Data button after login to re-seed data.
3. Explored Test Plan List at /test-plans.
4. Explored Test Plan Detail at /test-plans/1 (Overview, Test Cases, Execution History tabs).
5. Explored Create Test Plan at /test-plans/new (wizard steps + validation).
6. Explored Edit Test Plan at /test-plans/1/edit (differences vs create).
7. Logged out.

---

## Test Plan List (/test-plans)

### Page Structure

- Header: "Test Plans" + "New Test Plan" link.
- Controls row:
  - Search input
  - Status select filter
  - Project select filter
- Data table with sortable headers.
- Pagination/footer block with page-size selector + Previous/Next buttons.

### Elements (data-testid)

| data-testid                           | Type             | Notes                                          |
| ------------------------------------- | ---------------- | ---------------------------------------------- |
| testplan-list-page                    | container        | Main page root                                 |
| testplan-list-btn-new                 | link             | Navigates to /test-plans/new                   |
| testplan-list-input-search            | text input       | Free text filtering                            |
| testplan-list-select-status-filter    | select           | Status filter                                  |
| testplan-list-select-projectId-filter | select           | Project filter                                 |
| testplan-list-table                   | container        | Wraps table/filter block                       |
| testplan-list-btn-sort-name           | sortable header  | Sort by name                                   |
| testplan-list-btn-sort-projectId      | sortable header  | Sort by project                                |
| testplan-list-btn-sort-status         | sortable header  | Sort by status                                 |
| testplan-list-btn-sort-testCases      | header           | Present as sort id                             |
| testplan-list-btn-sort-assigneeId     | header           | Present as sort id                             |
| testplan-list-btn-sort-updatedAt      | sortable header  | Sort by updated date                           |
| testplan-list-row-1,2,3               | table rows       | Clickable rows                                 |
| testplan-list-cell-\*-1..3            | table cells      | Name/project/status/testCases/assignee/updated |
| testplan-list-pagination              | pagination block | Hidden when no rows                            |
| testplan-list-select-page-size        | select           | 5/10/25/50                                     |
| testplan-list-btn-page-prev           | button           | Disabled on single page                        |
| testplan-list-btn-page-next           | button           | Disabled on single page                        |

### Table Columns

- Name
- Project
- Status
- Test Cases
- Assignee
- Updated

### Search, Filters, Sorting, Pagination Behavior

- Initial seeded rows: 3
  - Phoenix Login & Authentication
  - Phoenix Defect Management Workflow
  - Atlas Navigation & Map Features
- Search "Phoenix": 2 rows remain.
- Search "zzzz-no-match": no rows, "No data found" shown, pagination block disappears.
- Status filter options (values):
  - "" (Status)
  - draft
  - active
  - completed
  - archived
- Project filter options (values):
  - "" (Project)
  - Project Phoenix
  - Project Atlas
  - Project Nebula
- Sorting by Updated:
  - Click 1 reordered to oldest-first (Atlas -> Phoenix Login -> Phoenix Defect Workflow).
  - Click 2 reordered to newest-first (Phoenix Defect Workflow -> Phoenix Login -> Atlas).
- Pagination:
  - With 3 records total, Previous and Next remain disabled.
  - Page size options: 5, 10, 25, 50.

### Edge Cases / Notes

- Potential defect observed: selecting Project Atlas filter resulted in "No data found" even though one visible row belongs to Project Atlas in the unfiltered list.
- Pagination block is conditionally removed when result count is 0.

---

## Test Plan Detail (/test-plans/1)

### Page Structure

- Header: back button, title, Edit link, Execute Test Run button.
- Tabs:
  - Overview
  - Test Cases (badge count)
  - Execution History (badge count)

### Elements (data-testid)

| data-testid                          | Type            | Notes                        |
| ------------------------------------ | --------------- | ---------------------------- |
| testplan-detail-page                 | container       | Page root                    |
| testplan-detail-btn-edit             | link            | /test-plans/1/edit           |
| testplan-detail-btn-execute          | button          | Starts run flow              |
| testplan-detail-tabs                 | container       | Tabs wrapper                 |
| testplan-detail-tab-overview         | tab button      | Default selected             |
| testplan-detail-tab-cases            | tab button      | Shows test cases content     |
| testplan-detail-tab-badge-cases      | badge           | Count value                  |
| testplan-detail-tab-history          | tab button      | Shows execution history      |
| testplan-detail-tab-badge-history    | badge           | Count value                  |
| testplan-detail-overview             | section         | Overview content             |
| testplan-detail-status               | badge/text      | Plan status                  |
| testplan-detail-assignee-avatar      | assignee widget | Initials + role              |
| testplan-detail-assignee-avatar-role | text            | Role label                   |
| testplan-detail-history              | section         | History tab body             |
| testplan-history-table               | table           | Execution history table      |
| testplan-history-btn-sort-executorId | sortable header | Sort executor                |
| testplan-history-btn-sort-status     | sortable header | Sort status                  |
| testplan-history-btn-sort-results    | sortable header | Sort results                 |
| testplan-history-btn-sort-startedAt  | sortable header | Sort date                    |
| testplan-history-row-1               | row             | Clickable run row            |
| testplan-history-cell-\*             | cells           | executor/status/results/date |

### Sections Observed

- Overview tab:
  - Plan Information: status, project, description, assignee, created, updated.
  - Summary cards: Test Cases, Total Steps, Last Run Pass Rate.
- Test Cases tab:
  - List of case cards with title, short description, and priority label.
- Execution History tab:
  - Table of runs with executed by, status, results, date.

### Warning: Missing test IDs in Test Cases List

- In Test Cases tab, individual case cards/titles appeared without dedicated data-testid values.
- Fallback selectors (potentially flaky):
  - CSS: div.flex.items-center.justify-between.cursor-pointer
  - XPath by title text, example:
    - //h4[normalize-space()='Valid login with correct credentials']

---

## Create Test Plan (/test-plans/new)

### Page Structure

- 3-step wizard:
  - Step 1: Plan Details
  - Step 2: Test Cases
  - Step 3: Review

### Elements (data-testid)

| data-testid                          | Type        | Notes                    |
| ------------------------------------ | ----------- | ------------------------ |
| testplan-form-page                   | container   | Form page root           |
| testplan-form-wizard                 | container   | Wizard root              |
| testplan-form-wizard-step-indicator  | container   | Step indicator           |
| testplan-form-wizard-step-1/2/3      | step marker | Current step highlighted |
| testplan-form-step-1                 | section     | Plan details fields      |
| testplan-form-input-name             | text input  | Required                 |
| testplan-form-select-project         | select      | Required                 |
| testplan-form-input-description      | textarea    | Required                 |
| testplan-form-select-assignee        | select      | Optional                 |
| testplan-form-wizard-btn-cancel      | button      | Returns to list          |
| testplan-form-wizard-btn-next        | button      | Advances wizard          |
| testplan-form-step-2                 | section     | Test case builder        |
| testplan-form-btn-add-case           | button      | Adds test case editor    |
| testplan-form-case-0-name            | input       | Required                 |
| testplan-form-case-0-priority        | select      | Default Medium           |
| testplan-form-case-0-description     | textarea    | Optional                 |
| testplan-form-case-0-preconditions   | textarea    | Optional                 |
| testplan-form-case-0-step-0-action   | input       | Required                 |
| testplan-form-case-0-step-0-expected | input       | Required                 |
| testplan-form-case-0-step-0-remove   | button      | Remove step              |
| testplan-form-case-0-btn-add-step    | button      | Add additional step      |
| testplan-form-case-0-btn-remove      | button      | Remove whole case        |

### Dropdown Options and Values

- Project select (testplan-form-select-project):
  - value "" -> Select a project (disabled placeholder)
  - value "1" -> Project Phoenix
  - value "2" -> Project Atlas
  - value "3" -> Project Nebula
- Assignee select (testplan-form-select-assignee):
  - value "" -> - None -
  - value "1" -> Tom Tester
  - value "2" -> Laura Lead
  - value "3" -> Alex Admin
- Test case priority (testplan-form-case-0-priority):
  - value high -> High
  - value medium -> Medium (default)
  - value low -> Low

### Validation Behavior

- Step 1 clicking Next with empty fields shows:
  - "Test plan name is required"
  - "Project is required"
  - "Description is required"
- Step 2 clicking Next with no cases shows:
  - "At least one test case is required"
- Step 2 with blank case fields shows:
  - "Test case name is required"
  - "Action is required"
  - "Expected result is required"

### Review Step (Step 3)

- Shows Plan Summary (name, project, description, assignee).
- Shows Test Cases list with count and step totals.
- Primary action changes from Next to Submit.

---

## Edit Test Plan (/test-plans/1/edit)

### Elements (data-testid)

- Same form/wizard IDs as create page (shared component structure), including:
  - testplan-form-input-name
  - testplan-form-select-project
  - testplan-form-input-description
  - testplan-form-select-assignee
  - testplan-form-wizard-btn-cancel
  - testplan-form-wizard-btn-next

### Differences vs Create Form

- Fields are pre-populated from existing plan data.
  - Name: Phoenix Login & Authentication
  - Project: value 1 (Project Phoenix)
  - Description: existing long text populated
  - Assignee: value 1 (Tom Tester)
- Breadcrumb path includes plan id before Edit.
- Project/Assignee selects do not include placeholder selected by default (existing values selected).

### Validation Check

- Clearing name and clicking Next shows:
  - "Test plan name is required"

---

## Footer / Global Notes

- Footer on authenticated pages includes:
  - footer-version
  - footer-btn-reset
- Reset Data was executed successfully via footer-btn-reset after login.

---

## Logout

- Logout via sidebar-btn-logout redirected to /login successfully.

## Potential Issues to Retest

1. Project filter mismatch on /test-plans for Project Atlas (expected 1 row, observed 0).
2. Missing data-testid on test-case cards/titles in detail tab Test Cases (requires CSS/XPath fallback).
