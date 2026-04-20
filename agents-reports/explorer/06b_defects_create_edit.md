# Exploration Report: Defects Create and Edit Forms (admin)

Date: 2026-04-19
App URL: http://localhost:5173
Role: admin (admin/admin123)

## Create Defect (`/defects/new`)

### Snapshot (initial state)

- Wizard with 4 steps: Basic Info -> Details -> Assignment & Links -> Review.
- Page title: `Report Defect`.
- Primary action in step 1 is `Next`.

### Data-testid inventory (union across all create-form steps)

| data-testid                               | Type                      | Notes                                  |
| ----------------------------------------- | ------------------------- | -------------------------------------- |
| defect-form-page                          | container                 | Defect form page wrapper               |
| defect-form-wizard                        | container                 | Wizard wrapper                         |
| defect-form-wizard-step-indicator         | container                 | Step progress bar                      |
| defect-form-wizard-step-1                 | container                 | Basic Info step indicator              |
| defect-form-wizard-step-2                 | container                 | Details step indicator                 |
| defect-form-wizard-step-3                 | container                 | Assignment step indicator              |
| defect-form-wizard-step-4                 | container                 | Review step indicator                  |
| defect-form-wizard-content                | container                 | Current step content                   |
| defect-form-input-title                   | input:text                | Step 1                                 |
| defect-form-select-project                | select                    | Step 1                                 |
| defect-form-select-severity               | select                    | Step 1                                 |
| defect-form-select-priority               | select                    | Step 1                                 |
| defect-form-input-title-error             | validation text           | Step 1 (after invalid submit)          |
| defect-form-select-project-error          | validation text           | Step 1 (after invalid submit)          |
| defect-form-input-description             | textarea                  | Step 2                                 |
| defect-form-input-steps                   | textarea                  | Step 2                                 |
| defect-form-select-environment            | select                    | Step 2                                 |
| defect-form-input-description-error       | validation text           | Step 2 (after invalid submit)          |
| defect-form-input-steps-error             | validation text           | Step 2 (after invalid submit)          |
| defect-form-select-assignee               | select                    | Step 3                                 |
| defect-form-select-test-cases             | custom multiselect button | Step 3                                 |
| defect-form-select-test-cases-dropdown    | dropdown panel            | Step 3 (visible when expanded)         |
| defect-form-select-test-cases-option-1..9 | option rows               | Step 3 (checkbox options)              |
| defect-form-review-severity               | review badge              | Step 4                                 |
| defect-form-review-priority               | review badge              | Step 4                                 |
| defect-form-review-assignee               | review block              | Visible in create when assignee chosen |
| defect-form-review-assignee-role          | review block              | Visible in create when assignee chosen |
| defect-form-wizard-btn-cancel             | button                    | Present in all steps                   |
| defect-form-wizard-btn-back               | button                    | Present from step 2 onward             |
| defect-form-wizard-btn-next               | button                    | Steps 1-3                              |
| defect-form-wizard-btn-submit             | button                    | Step 4                                 |

### Form fields and dropdown values

#### Step 1: Basic Info

| Field        | data-testid                 | Type       | Initial value                |
| ------------ | --------------------------- | ---------- | ---------------------------- |
| Defect Title | defect-form-input-title     | text input | empty                        |
| Project      | defect-form-select-project  | select     | empty (placeholder selected) |
| Severity     | defect-form-select-severity | select     | critical                     |
| Priority     | defect-form-select-priority | select     | P1                           |

Dropdown options:

- defect-form-select-project:
  - text `Select a project`, value `` (disabled placeholder)
  - text `Project Phoenix`, value `1`
  - text `Project Atlas`, value `2`
  - text `Project Nebula`, value `3`
- defect-form-select-severity:
  - `critical`, `major`, `minor`, `trivial`
- defect-form-select-priority:
  - `P1`, `P2`, `P3`, `P4`

#### Step 2: Details

| Field              | data-testid                    | Type     | Initial value              |
| ------------------ | ------------------------------ | -------- | -------------------------- |
| Description        | defect-form-input-description  | textarea | empty                      |
| Steps to Reproduce | defect-form-input-steps        | textarea | empty                      |
| Environment        | defect-form-select-environment | select   | empty (Select environment) |

Dropdown options:

- defect-form-select-environment:
  - text `Select environment`, value ``
  - text `Dev (dev)`, value `1`
  - text `Staging (staging)`, value `2`
  - text `Production (production)`, value `3`

#### Step 3: Assignment & Links

| Field                         | data-testid                   | Type               | Initial value             |
| ----------------------------- | ----------------------------- | ------------------ | ------------------------- |
| Assign to (optional)          | defect-form-select-assignee   | select             | empty (`Select assignee`) |
| Related Test Cases (optional) | defect-form-select-test-cases | custom multiselect | `Select options...`       |

Dropdown options:

- defect-form-select-assignee:
  - `Select assignee` (empty)
  - `Laura Lead` (value `2`)
  - `Tom Tester` (value `1`)
  - `Laura Lead` (value `2`) [duplicate visible]
  - `Alex Admin` (value `3`)

Multiselect options in defect-form-select-test-cases-dropdown:

- option-1: `Valid login with correct credentials`
- option-2: `Invalid login with wrong password`
- option-3: `Login form validation - empty fields`
- option-4: `Role-based navigation visibility`
- option-5: `Session persistence across page reload`
- option-6: `Create a new defect with all fields`
- option-7: `Assign defect to team member`
- option-8: `Complete defect lifecycle: New -> Closed`
- option-9: `Reject and reopen defect`

#### Step 4: Review

- Summary shows Title, Project, Severity, Priority, Description, Steps to Reproduce, Environment.
- If assignee is selected in step 3, review includes assignee block (`defect-form-review-assignee`, `defect-form-review-assignee-role`).

### Validation behavior (empty submit attempts)

1. Step 1 invalid submit (clicked Next with empty title/project):

- `Title is required` (`defect-form-input-title-error`)
- `Project is required` (`defect-form-select-project-error`)

2. Step 2 invalid submit (clicked Next with empty description/steps):

- `Description is required` (`defect-form-input-description-error`)
- `Steps to reproduce is required` (`defect-form-input-steps-error`)

### Valid submission flow and success behavior

Flow script executed:

1. Open `/defects/new`.
2. Step 1: Fill title, select Project Phoenix, keep severity `critical` and priority `P1`.
3. Step 2: Fill Description and Steps, select Environment `Production`.
4. Step 3: Select assignee `Tom Tester`, select one related test case.
5. Step 4: Click `Submit`.

Observed success behavior:

- Redirected to new defect detail page: `/defects/15`.
- Header displayed new defect title (`#15 - Automation exploration defect 2026-04-19`).
- Toast appeared with text `Defect reported`.

Observed edge behavior after submit:

- New defect detail showed `Unknown` for Reporter/Project/Environment and `Unassigned` for Assignee, despite values chosen in wizard.
- During Step 3 rendering, browser console repeatedly logged React key warning about duplicate key `2`.
- If related-test-cases dropdown remains open, it can intercept pointer events and block clicking `Next`.

## Edit Defect (`/defects/1/edit`)

### Snapshot (initial state)

- Page title: `Edit Defect`.
- Same 4-step wizard layout and same base test IDs for form controls.
- Breadcrumb includes defect id segment (`#1`) before `Edit`.

### Data-testid inventory (union across edit-form steps)

| data-testid                               | Type               | Notes                       |
| ----------------------------------------- | ------------------ | --------------------------- |
| defect-form-page                          | container          | Same as create              |
| defect-form-wizard                        | container          | Same as create              |
| defect-form-input-title                   | input:text         | Prefilled                   |
| defect-form-select-project                | select             | Prefilled                   |
| defect-form-select-severity               | select             | Prefilled                   |
| defect-form-select-priority               | select             | Prefilled                   |
| defect-form-input-description             | textarea           | Prefilled                   |
| defect-form-input-steps                   | textarea           | Prefilled                   |
| defect-form-select-environment            | select             | Prefilled                   |
| defect-form-select-assignee               | select             | Empty in defect #1          |
| defect-form-select-test-cases             | custom multiselect | Prefilled text `1 selected` |
| defect-form-select-test-cases-dropdown    | dropdown panel     | Available when expanded     |
| defect-form-select-test-cases-option-1..9 | option rows        | Same option set as create   |
| defect-form-review-severity               | review badge       | Same as create              |
| defect-form-review-priority               | review badge       | Same as create              |
| defect-form-wizard-btn-cancel             | button             | Same as create              |
| defect-form-wizard-btn-back               | button             | Same as create              |
| defect-form-wizard-btn-next               | button             | Steps 1-3                   |
| defect-form-wizard-btn-submit             | button             | Step 4                      |

### Prefilled values observed

Step 1:

- Title: `Login button does nothing when password contains emoji`
- Project: `Project Phoenix` (value `1`)
- Severity: `critical`
- Priority: `P1`

Step 2:

- Description: prefilled long text from defect #1
- Steps to Reproduce: prefilled multiline steps
- Environment: `Production` (value `3`)

Step 3:

- Assignee: empty (`Select assignee`)
- Related test cases: prefilled as `1 selected`
- Expanded multiselect confirms option 1 checked (`Valid login with correct credentials`)

Step 4:

- Review summary prefilled from existing defect data.
- `Submit` button present.

### Differences from create form

1. Page-level text and breadcrumbs:

- Create uses title `Report Defect` and breadcrumb `Defects > New`.
- Edit uses title `Edit Defect` and breadcrumb `Defects > #1 > Edit`.

2. Prefill behavior:

- Create starts mostly empty with defaults.
- Edit is prefilled with existing defect values in all steps.

3. Project/environment select placeholders:

- Create project select includes disabled placeholder `Select a project`.
- Edit project select does not show placeholder, only real projects.
- Create environment select includes `Select environment` option.
- Edit environment select has direct environment options only (no placeholder visible).

4. Related test cases initial state:

- Create starts at `Select options...`.
- Edit starts at `1 selected` for defect #1.

5. Review assignee block:

- In create flow, review showed assignee block when an assignee was chosen.
- In edit defect #1 (currently unassigned), no assignee review block was rendered.

### User flow scripts

Create flow script:

1. Login as admin.
2. Navigate to `/defects/new`.
3. Validate step 1 errors with empty submit.
4. Fill valid step 1 data and continue.
5. Validate step 2 errors with empty submit.
6. Fill valid step 2 data and continue.
7. In step 3, choose assignee and one related test case.
8. Continue to review and submit.
9. Verify redirect and success toast.

Edit flow script:

1. Navigate to `/defects/1/edit`.
2. Capture step 1 prefilled values and options.
3. Continue to step 2 and capture prefilled fields.
4. Continue to step 3, expand related test cases, capture selected option state.
5. Continue to step 4 and capture review differences.

## Notes on selector reliability

- All interactive form controls and validation messages encountered in scope had `data-testid` attributes.
- No fallback CSS/XPath selectors were required for the required interactions in this task.
