# Exploration Report: Profile

**Date:** 2026-04-19
**App URL:** `http://localhost:5173`

---

## Profile Page (`/profile`)

### Elements

| data-testid                 | Tag      | Type  | Notes                                                    |
| --------------------------- | -------- | ----- | -------------------------------------------------------- |
| `profile-page`              | `div`    | —     | Root container for profile page                          |
| `profile-avatar`            | `div`    | —     | Avatar circle with initials + role badge                 |
| `profile-avatar-role`       | `span`   | —     | Role label inside avatar (e.g. "Test", "Lead", "Admin")  |
| `profile-input-name-label`  | `label`  | —     | Label: "Full Name"                                       |
| `profile-input-name`        | `input`  | text  | Editable full name field                                 |
| `profile-input-email-label` | `label`  | —     | Label: "Email"                                           |
| `profile-input-email`       | `input`  | email | Editable email field                                     |
| `profile-role-badge`        | `span`   | —     | Read-only role badge (e.g. "Tester", "Qa Lead", "Admin") |
| `profile-btn-save`          | `button` | —     | "Save Changes" button; always enabled                    |
| `profile-activity`          | `div`    | —     | "My Activity" section with stats cards                   |

### Static / Non-testid Elements

- Page heading: "My Profile" (`page-header-title`)
- Username field (read-only, displayed as plain text, no input)
- Role field (read-only, displayed as plain text, no input)
- "My Activity" section heading (`h2`)
- Activity stat cards: "My Defects", "Assigned to Me", "My Test Runs", "My Projects" (no individual testids on cards)

### Role-Specific Profile Data

| Field            | tester                         | lead               | admin                           |
| ---------------- | ------------------------------ | ------------------ | ------------------------------- |
| Full Name        | Tom Tester                     | Laura Lead         | Alex Admin                      |
| Email            | tom@tredgate.com               | laura@tredgate.com | alex@tredgate.com               |
| Role badge       | Tester                         | Qa Lead            | Admin                           |
| Avatar role text | Test                           | Lead               | Admin                           |
| Username         | tester                         | lead               | admin                           |
| My Defects       | 10 reported                    | 4 reported         | 0 reported                      |
| Assigned to Me   | 10 defects                     | 0 defects          | 0 defects                       |
| My Test Runs     | 2 executed                     | 0 executed         | 0 executed                      |
| My Projects      | Project Phoenix, Project Atlas | (not captured)     | Project Phoenix, Project Nebula |

### Page Structure Notes

- Profile page layout is **identical across all roles** — same fields, same structure
- Only the **data values** differ per user
- Role and Username are **read-only** (displayed as plain text, not inputs)
- Full Name and Email are **editable** inputs
- No "Cancel" or "Discard" button — only "Save Changes"

---

## Flow A: View Profile

| #   | Step                                         | Expected Result                                    |
| --- | -------------------------------------------- | -------------------------------------------------- |
| 1   | Log in as any user                           | Redirected to `/dashboard`                         |
| 2   | Navigate to `/profile`                       | Profile page loads with "My Profile" heading       |
| 3   | Verify avatar shows initials and role        | Avatar with 2-letter initials + role badge visible |
| 4   | Verify Full Name field contains current name | Input pre-filled with user's full name             |
| 5   | Verify Email field contains current email    | Input pre-filled with user's email                 |
| 6   | Verify Role shows read-only badge            | Role displayed as text (not editable)              |
| 7   | Verify Username shows read-only text         | Username displayed as text (not editable)          |
| 8   | Verify "My Activity" section shows stats     | 4 stat cards with defect/test run/project counts   |

---

## Flow B: Edit Profile — Successful Save

| #   | Step                                      | Expected Result                                          |
| --- | ----------------------------------------- | -------------------------------------------------------- |
| 1   | Log in and navigate to `/profile`         | Profile page displayed                                   |
| 2   | Clear Full Name field and type new name   | Input shows new name                                     |
| 3   | Click "Save Changes" (`profile-btn-save`) | Toast success: `toast-success` with text "User updated"  |
| 4   | Verify second toast also appears          | `toast-success` with text "Profile updated successfully" |
| 5   | Verify name field retains updated value   | Input still shows the new name                           |
| 6   | Reload page                               | Name persists (saved to localStorage)                    |

---

## Flow C: Edit Profile — Validation Error (Empty Fields)

| #   | Step                                      | Expected Result                                                    |
| --- | ----------------------------------------- | ------------------------------------------------------------------ |
| 1   | Log in and navigate to `/profile`         | Profile page displayed                                             |
| 2   | Clear the Email field (leave it empty)    | Email input is empty                                               |
| 3   | Click "Save Changes" (`profile-btn-save`) | Toast error: `toast-error` with text "Name and email are required" |
| 4   | Verify profile is NOT updated             | Previous email value not saved (empty stays)                       |

---

## Flow D: Edit Profile — Invalid Email

| #   | Step                                      | Expected Result                                                    |
| --- | ----------------------------------------- | ------------------------------------------------------------------ |
| 1   | Log in and navigate to `/profile`         | Profile page displayed                                             |
| 2   | Clear Email field and type "notanemail"   | Email input shows invalid value                                    |
| 3   | Click "Save Changes" (`profile-btn-save`) | Toast error: `toast-error` with text "Name and email are required" |
| 4   | Verify profile is NOT updated             | Invalid email not saved                                            |

---

## Edge Cases & Notes

1. **No Cancel button** — The profile form has no cancel/discard option. The only way to undo changes is to reload the page (values reload from localStorage).
2. **No unsaved changes warning** — Navigating away from the profile with unsaved changes does not trigger a confirmation dialog.
3. **Two success toasts** — Saving successfully produces two toast messages: "User updated" and "Profile updated successfully".
4. **Same error for empty and invalid email** — Both empty email and invalid email format produce the same error: "Name and email are required".
5. **Role badge text inconsistency** — The avatar role shows abbreviated text ("Test" for tester) while `profile-role-badge` shows full text ("Tester"). Lead shows "Lead" in avatar vs "Qa Lead" in badge.
6. **Activity stats are read-only** — The "My Activity" section has no interactive elements; stats are dynamically calculated from app data.
7. **No profile link in sidebar** — There is no sidebar navigation link to `/profile`. Users must navigate directly or via some other trigger (not discovered in this exploration).
8. **Toast testids** — Success toast uses `toast-success`, error toast uses `toast-error`. These are consistent across the app.
