# Exploration Report: Login & Authentication

**Date:** 2026-04-19  
**App URL:** `http://localhost:5173`  
**App Version:** Tredgate QA Hub v4.0.0

---

## Login Page (`/login`)

### Elements

| data-testid                  | Tag      | Type     | Placeholder    | Notes                                                      |
| ---------------------------- | -------- | -------- | -------------- | ---------------------------------------------------------- |
| `login-page`                 | `div`    | —        | —              | Root container for the entire login page                   |
| `login-input-username`       | `input`  | text     | Enter username | Not HTML5-required; validation is custom (on submit)       |
| `login-input-password`       | `input`  | password | Enter password | Not HTML5-required; validation is custom (on submit)       |
| `login-checkbox-remember`    | `input`  | checkbox | —              | "Remember me" checkbox; default unchecked                  |
| `login-btn-submit`           | `button` | submit   | —              | Text: "Sign In"; always enabled regardless of field state  |
| `login-user-hints`           | `div`    | —        | —              | Demo credentials block showing all three accounts          |
| `login-error`                | `p`      | —        | —              | Appears after failed login: "Invalid username or password" |
| `login-input-username-error` | `p`      | —        | —              | Appears on empty submit: "Username is required"            |
| `login-input-password-error` | `p`      | —        | —              | Appears on empty submit: "Password is required"            |

### Static UI Elements (no data-testid needed for tests)

- App logo image (top of form)
- Heading: "Tredgate QA Hub" (`h1`)
- Subtitle: "Sign in to continue"
- Label texts: "Username", "Password", "Remember me"
- Demo credentials section with three user hint cards

### Button State

The submit button (`login-btn-submit`) is **never disabled**. It remains enabled whether fields are empty, partially filled, or fully filled. Validation errors appear only after clicking submit.

---

## Post-Login Sidebar Elements

After successful login, the sidebar contains these navigation elements (varies by role):

| data-testid               | Tag      | Text       | Tester | Lead | Admin |
| ------------------------- | -------- | ---------- | :----: | :--: | :---: |
| `sidebar-nav`             | `nav`    | —          |   ✅   |  ✅  |  ✅   |
| `sidebar-logo`            | `span`   | Tredgate…  |   ✅   |  ✅  |  ✅   |
| `sidebar-link-dashboard`  | `a`      | Dashboard  |   ✅   |  ✅  |  ✅   |
| `sidebar-link-projects`   | `a`      | Projects   |   ✅   |  ✅  |  ✅   |
| `sidebar-link-defects`    | `a`      | Defects    |   ✅   |  ✅  |  ✅   |
| `sidebar-link-test-plans` | `a`      | Test Plans |   ✅   |  ✅  |  ✅   |
| `sidebar-link-team`       | `a`      | Team       |   ✅   |  ✅  |  ✅   |
| `sidebar-link-reports`    | `a`      | Reports    |   —    |  ✅  |  ✅   |
| `sidebar-link-settings`   | `a`      | Settings   |   —    |  —   |  ✅   |
| `sidebar-btn-logout`      | `button` | Logout     |   ✅   |  ✅  |  ✅   |
| `sidebar-btn-collapse`    | `button` | Collapse   |   ✅   |  ✅  |  ✅   |

---

## Flow A: Successful Login — Tester

| Step | Action                                       | Expected Result                                                                 | Actual Result                 |
| ---- | -------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------- |
| 1    | Navigate to `http://localhost:5173/login`    | Login page loads with username/password fields                                  | ✅ As expected                |
| 2    | Fill username: `tester`, password: `test123` | Fields populated                                                                | ✅ As expected                |
| 3    | Click "Sign In" (`login-btn-submit`)         | Redirect to `/dashboard`                                                        | ✅ Redirected to `/dashboard` |
| 4    | Verify sidebar links                         | Dashboard, Projects, Defects, Test Plans, Team visible; NO Reports, NO Settings | ✅ As expected                |
| 5    | Click "Logout" (`sidebar-btn-logout`)        | Redirect to `/login`                                                            | ✅ Redirected to `/login`     |

---

## Flow B: Successful Login — Lead

| Step | Action                                     | Expected Result                                      | Actual Result                 |
| ---- | ------------------------------------------ | ---------------------------------------------------- | ----------------------------- |
| 1    | Navigate to `http://localhost:5173/login`  | Login page loads                                     | ✅ As expected                |
| 2    | Fill username: `lead`, password: `lead123` | Fields populated                                     | ✅ As expected                |
| 3    | Click "Sign In" (`login-btn-submit`)       | Redirect to `/dashboard`                             | ✅ Redirected to `/dashboard` |
| 4    | Verify sidebar links                       | Same as tester PLUS `sidebar-link-reports` (Reports) | ✅ Reports visible            |
| 5    | Click "Logout" (`sidebar-btn-logout`)      | Redirect to `/login`                                 | ✅ Redirected to `/login`     |

---

## Flow C: Successful Login — Admin

| Step | Action                                       | Expected Result                                      | Actual Result                 |
| ---- | -------------------------------------------- | ---------------------------------------------------- | ----------------------------- |
| 1    | Navigate to `http://localhost:5173/login`    | Login page loads                                     | ✅ As expected                |
| 2    | Fill username: `admin`, password: `admin123` | Fields populated                                     | ✅ As expected                |
| 3    | Click "Sign In" (`login-btn-submit`)         | Redirect to `/dashboard`                             | ✅ Redirected to `/dashboard` |
| 4    | Verify sidebar links                         | Same as lead PLUS `sidebar-link-settings` (Settings) | ✅ Reports + Settings visible |
| 5    | Click "Logout" (`sidebar-btn-logout`)        | Redirect to `/login`                                 | ✅ Redirected to `/login`     |

---

## Flow D: Invalid Credentials

| Step | Action                                        | Expected Result                                    | Actual Result                                 |
| ---- | --------------------------------------------- | -------------------------------------------------- | --------------------------------------------- |
| 1    | Navigate to `http://localhost:5173/login`     | Login page loads                                   | ✅ As expected                                |
| 2    | Fill username: `baduser`, password: `badpass` | Fields populated                                   | ✅ As expected                                |
| 3    | Click "Sign In" (`login-btn-submit`)          | Error message appears; stay on `/login`            | ✅ Stayed on `/login`                         |
| 4    | Verify error message                          | `login-error` shows "Invalid username or password" | ✅ Error text: "Invalid username or password" |
| 5    | Verify entered values remain in fields        | Username and password fields retain their values   | ✅ Values retained (`baduser` / `badpass`)    |

---

## Flow E: Empty Form Submission

| Step | Action                                    | Expected Result                                           | Actual Result                                      |
| ---- | ----------------------------------------- | --------------------------------------------------------- | -------------------------------------------------- |
| 1    | Navigate to `http://localhost:5173/login` | Login page loads                                          | ✅ As expected                                     |
| 2    | Leave both fields empty                   | Fields blank                                              | ✅ As expected                                     |
| 3    | Click "Sign In" (`login-btn-submit`)      | Field-level validation errors appear                      | ✅ As expected                                     |
| 4    | Verify username validation                | `login-input-username-error` shows "Username is required" | ✅ Text: "Username is required"                    |
| 5    | Verify password validation                | `login-input-password-error` shows "Password is required" | ✅ Text: "Password is required"                    |
| 6    | Verify general error also appears         | `login-error` shows "Invalid username or password"        | ✅ All three error elements visible simultaneously |

---

## Flow F: Unauthenticated Redirect

| Step | Action                                               | Expected Result                       | Actual Result               |
| ---- | ---------------------------------------------------- | ------------------------------------- | --------------------------- |
| 1    | Ensure logged out (no active session)                | On `/login` page                      | ✅ As expected              |
| 2    | Navigate directly to `http://localhost:5173/defects` | Redirect to `/login`                  | ✅ Redirected to `/login`   |
| 3    | Verify login page is shown                           | Login form with all standard elements | ✅ Full login page rendered |

---

## Edge Cases & Notes

1. **Submit button always enabled** — The "Sign In" button is never disabled, even when both fields are empty. Validation is purely on-submit, not on-change.
2. **No HTML5 `required` attribute** — Neither input field has the `required` attribute. Validation is handled by React form logic, not browser-native validation.
3. **Multiple errors on empty submit** — When submitting with empty fields, three error elements appear simultaneously: `login-input-username-error`, `login-input-password-error`, and `login-error`.
4. **Error persistence** — The `login-error` message from a previous failed attempt (Flow D) persists if you clear the fields and submit again (Flow E). It does not clear between attempts.
5. **Role-based sidebar links** — Navigation items are completely absent (not just disabled) for unauthorized roles: tester sees no Reports/Settings, lead sees no Settings.
6. **Remember me checkbox** — Present with `login-checkbox-remember`, default unchecked. Functional effect not tested (localStorage session persistence).
7. **Demo credentials hints** — A `login-user-hints` section at the bottom shows all three user accounts with credentials. This is for training purposes.
8. **Page title** — Consistent across all states: "Tredgate QA Hub 2026".
9. **CSS class on button** — Submit button has class `btn-neon-purple w-full` (consistent in all states).

---

## CSS Selectors Summary (for automation)

Primary selectors (all have `data-testid`):

```css
[data-testid="login-page"]
[data-testid="login-input-username"]
[data-testid="login-input-password"]
[data-testid="login-checkbox-remember"]
[data-testid="login-btn-submit"]
[data-testid="login-error"]
[data-testid="login-input-username-error"]
[data-testid="login-input-password-error"]
[data-testid="login-user-hints"]
[data-testid="sidebar-btn-logout"]
```

All interactive elements on the login page have stable `data-testid` attributes. No fallback CSS/XPath selectors are needed.
