# Exploration Report: Test Run Execution Wizard

Date: 2026-04-19
App: http://localhost:5173
Role: admin (`admin` / `admin123`)

## Scope

Requested flow:

1. Log in as admin
2. Navigate to `/test-plans/1`
3. Click `Execute` / `Start Test Run`
4. Verify navigation to `/test-plans/1/execute`
5. Snapshot + capture all `data-testid`
6. Document wizard behavior (cases, result actions, notes, completion)
7. Step through 2-3 cases
8. Log out

## Execution Summary

- Login as admin: successful.
- Navigation to `/test-plans/1`: successful.
- Execute button presence: present (`data-testid="testplan-detail-btn-execute"`, label `Execute Test Run`).
- Execute click behavior: **did not navigate**. URL stayed at `/test-plans/1`.
- Direct navigation to `/test-plans/1/execute`: page loaded, but showed **"Test Run not found"**.
- Cross-check on other plans (`/test-plans/2`, `/test-plans/3`): same result.

## Route and Transition Findings

### Detail Page (`/test-plans/1`)

- Execute button exists and is clickable in UI.
- Repeated click attempts (single click, double click, CSS-targeted click) did not transition to execute route.
- Observed URL after click: still `/test-plans/1`.

### Execute Route (`/test-plans/1/execute`)

Snapshot state:

- Heading: `Test Run not found`
- Message: `The test run you're looking for doesn't exist.`
- No wizard UI rendered (no case progression controls, no result action buttons, no notes area).

## `data-testid` Inventory on `/test-plans/1/execute`

Collected from live DOM on the execute route:

| data-testid             | Type           | Notes                        |
| ----------------------- | -------------- | ---------------------------- |
| sidebar-nav             | container      | Left navigation              |
| sidebar-logo            | branding       | Sidebar logo                 |
| sidebar-link-dashboard  | nav link       | To dashboard                 |
| sidebar-link-projects   | nav link       | To projects                  |
| sidebar-link-defects    | nav link       | To defects                   |
| sidebar-link-test-plans | nav link       | To test plans                |
| sidebar-link-team       | nav link       | To team                      |
| sidebar-btn-logout      | button         | Logout action                |
| sidebar-btn-collapse    | button         | Collapse sidebar             |
| breadcrumbs-nav         | container      | Breadcrumbs root             |
| breadcrumbs-link        | link           | Breadcrumb link(s), repeated |
| testrun-execution-page  | page container | Execute page root            |
| empty-state-not-found   | empty state    | Not found state container    |
| footer                  | container      | Footer root                  |
| footer-version          | text           | Version label                |
| footer-btn-reset        | button         | Reset seed data              |

Total `data-testid` count observed: 18 (including repeated `breadcrumbs-link`).

## Wizard Behavior Requested vs Observed

### 1) How are test cases presented (one by one)?

- **Not observable in this run.**
- Execute route renders not-found state instead of wizard.

### 2) What result buttons are available (Pass, Fail, Block, Skip)?

- **Not observable in this run.**
- No result-action controls rendered in the not-found state.

### 3) What happens when you mark a result?

- **Not observable in this run.**
- No runnable test case state was available.

### 4) Are there notes/comment fields?

- **Not observable in this run.**
- No execution form was rendered.

### 5) What happens when you complete all cases?

- **Not observable in this run.**
- Could not progress through any case because wizard did not load.

## Additional Observations

- Clicking execution history rows in plan detail opens a results view/modal (`Test Run Results`) with historical statuses and notes for previous runs, but this is separate from the execute wizard path.
- Browser console repeatedly showed React key warnings (`Encountered two children with the same key`). Not directly tied to the not-found execute state, but present during exploration.

## Edge Case / Defect Candidate

Potential defect in app behavior:

- `testplan-detail-btn-execute` is visible but does not transition to an executable run context.
- Direct execute routes (`/test-plans/1/execute`, `/test-plans/2/execute`, `/test-plans/3/execute`) consistently show `Test Run not found`.

Suggested reproduction:

1. Login as admin
2. Open any seeded test plan detail
3. Click `Execute Test Run`
4. Observe no route change
5. Open `/test-plans/<id>/execute` directly
6. Observe `Test Run not found`

## Logout

- Logout completed via sidebar logout button.
