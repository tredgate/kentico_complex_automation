# Exploration Report: Test Plans Role Differences (tester vs lead)

Date: 2026-04-19
App: http://localhost:5173

## Scope Executed

1. Logged in as `tester` (`tester` / `test123`)
2. Checked `/test-plans`, `/test-plans/1`, `/test-plans/new`
3. Logged out
4. Logged in as `lead` (`lead` / `lead123`)
5. Checked `/test-plans`, `/test-plans/1`
6. Logged out

## Findings Matrix

| Role   | Route             | New Test Plan visible | Edit visible | Execute visible | Access result                   |
| ------ | ----------------- | --------------------- | ------------ | --------------- | ------------------------------- |
| tester | `/test-plans`     | No                    | N/A          | N/A             | Allowed                         |
| tester | `/test-plans/1`   | N/A                   | No           | Yes             | Allowed                         |
| tester | `/test-plans/new` | N/A                   | N/A          | N/A             | **Allowed** (create form opens) |
| lead   | `/test-plans`     | Yes                   | N/A          | N/A             | Allowed                         |
| lead   | `/test-plans/1`   | N/A                   | Yes          | Yes             | Allowed                         |

## Notes

- Tester list page did not show `New Test Plan` action.
- Tester detail page showed `Execute Test Run` but not `Edit`.
- Direct tester navigation to `/test-plans/new` was not denied; the full create wizard loaded.
- Lead behaved as expected for elevated permissions: `New Test Plan` on list, and both `Edit` + `Execute` on detail.

## Relevant Selectors / Test IDs Observed

- `testplan-list-btn-new` (New Test Plan link on list)
- `testplan-detail-btn-edit` (Edit link on detail)
- `testplan-detail-btn-execute` (Execute Test Run button on detail)
- `testplan-form-page` (Create form container on `/test-plans/new`)
