# Exploration Report: Sidebar & Navigation

> **Explored on:** 2026-04-19  
> **App URL:** http://localhost:5173  
> **App Version:** Tredgate QA Hub v4.0.0

---

## 1. Role-Comparison Table — Sidebar Items Visibility

| Sidebar Item | `data-testid`             | Tester | QA Lead | Admin |
| ------------ | ------------------------- | :----: | :-----: | :---: |
| Dashboard    | `sidebar-link-dashboard`  |   ✅   |   ✅    |  ✅   |
| Projects     | `sidebar-link-projects`   |   ✅   |   ✅    |  ✅   |
| Defects      | `sidebar-link-defects`    |   ✅   |   ✅    |  ✅   |
| Test Plans   | `sidebar-link-test-plans` |   ✅   |   ✅    |  ✅   |
| Team         | `sidebar-link-team`       |   ✅   |   ✅    |  ✅   |
| Reports      | `sidebar-link-reports`    |   ❌   |   ✅    |  ✅   |
| Settings     | `sidebar-link-settings`   |   ❌   |   ❌    |  ✅   |

**Key observations:**

- Items forbidden for a role are **not rendered** (absent from DOM), not disabled.
- Tester sees 5 nav links; QA Lead sees 6 (+ Reports); Admin sees 7 (+ Reports + Settings).

---

## 2. Elements Table — All Sidebar, Breadcrumb & Footer `data-testid` Attributes

### 2.1 Sidebar Elements

| `data-testid`             | HTML Tag   | Type            | Text (expanded)     | Notes                                                                                                  |
| ------------------------- | ---------- | --------------- | ------------------- | ------------------------------------------------------------------------------------------------------ |
| `sidebar-nav`             | `<nav>`    | Container       | _(all nav content)_ | Root sidebar container. CSS classes include `w-60` when expanded, `w-16` when collapsed.               |
| `sidebar-logo`            | `<span>`   | Text            | `Tredgate QA Hub`   | Shows "TQH" when collapsed. Parent is a `<div>`, not clickable (no link).                              |
| `sidebar-link-dashboard`  | `<a>`      | Navigation link | `Dashboard`         | `href="/dashboard"`                                                                                    |
| `sidebar-link-projects`   | `<a>`      | Navigation link | `Projects`          | `href="/projects"`                                                                                     |
| `sidebar-link-defects`    | `<a>`      | Navigation link | `Defects`           | `href="/defects"`                                                                                      |
| `sidebar-link-test-plans` | `<a>`      | Navigation link | `Test Plans`        | `href="/test-plans"`                                                                                   |
| `sidebar-link-team`       | `<a>`      | Navigation link | `Team`              | `href="/team"`                                                                                         |
| `sidebar-link-reports`    | `<a>`      | Navigation link | `Reports`           | `href="/reports"` — Only visible to QA Lead and Admin.                                                 |
| `sidebar-link-settings`   | `<a>`      | Navigation link | `Settings`          | `href="/settings"` — Only visible to Admin.                                                            |
| `sidebar-btn-logout`      | `<button>` | Action button   | `Logout`            | Logs out user, redirects to `/login`. Text hidden when collapsed.                                      |
| `sidebar-btn-collapse`    | `<button>` | Toggle button   | `Collapse`          | Toggles sidebar collapsed/expanded. Text hidden when collapsed. **Same `data-testid` in both states.** |

### 2.2 Breadcrumb Elements

| `data-testid`      | HTML Tag | Type           | Notes                                                                                                                                                                                      |
| ------------------ | -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `breadcrumbs-nav`  | `<nav>`  | Container      | Root breadcrumb container. Contains "Home" link + current page segment(s).                                                                                                                 |
| `breadcrumbs-link` | `<a>`    | Clickable link | **⚠️ All breadcrumb links share the same `data-testid`!** On detail pages (e.g. `/defects/1`) there are multiple `<a>` elements with `data-testid="breadcrumbs-link"`. See §5 for details. |

**⚠️ WARNING:** The current page label in breadcrumbs (e.g., "Dashboard", "Team", "#1") is a plain `<span class="text-gray-200">` with **no `data-testid`**. To target it, use CSS: `[data-testid="breadcrumbs-nav"] span.text-gray-200` (may be fragile).

### 2.3 Footer Elements

| `data-testid`      | HTML Tag   | Type          | Text                       | Notes                                            |
| ------------------ | ---------- | ------------- | -------------------------- | ------------------------------------------------ |
| `footer`           | `<footer>` | Container     | _(version + reset button)_ | Root footer container.                           |
| `footer-version`   | `<span>`   | Text          | `Tredgate QA Hub v4.0.0`   | Version string, always visible.                  |
| `footer-btn-reset` | `<button>` | Action button | `Reset Data`               | Wipes all `tqh_*` localStorage keys and reloads. |

---

## 3. Sidebar Structure — DOM Layout

The sidebar `<nav data-testid="sidebar-nav">` has three sections (children `<div>` elements):

| Section   | CSS class (partial)                              | Contents                                                 |
| --------- | ------------------------------------------------ | -------------------------------------------------------- |
| 1. Logo   | `flex items-center gap-2 px-4 py-5 border-b ...` | Logo image `<img>` + `<span data-testid="sidebar-logo">` |
| 2. Nav    | `flex-1 py-4 space-y-1 px-2 overflow-y-auto`     | Navigation links (5–7 depending on role)                 |
| 3. Bottom | `border-t border-white/10 p-2 space-y-1`         | Logout button + Collapse button                          |

**Active link indicator:**

- Active link gets `aria-current="page"` attribute.
- Active link CSS classes: `bg-neon-purple/20 text-neon-purple` (instead of `text-gray-400 hover:text-white hover:bg-white/5` for inactive links).

---

## 4. Navigation Flows — Step/Result Tables

### 4.1 Sidebar Navigation (per role)

#### Role: Tester

| Step | Action                                   | Expected Result                                                                                                     |
| ---- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 1    | Log in as `tester` / `test123`           | Redirected to `/dashboard`. Sidebar shows 5 links.                                                                  |
| 2    | Click `sidebar-link-dashboard`           | URL: `/dashboard`. Heading: "Dashboard". Active link: `sidebar-link-dashboard`. Breadcrumb: "Home > Dashboard".     |
| 3    | Click `sidebar-link-projects`            | URL: `/projects`. Heading: "Projects". Active link: `sidebar-link-projects`. Breadcrumb: "Home > Projects".         |
| 4    | Click `sidebar-link-defects`             | URL: `/defects`. Heading: "Defects". Active link: `sidebar-link-defects`. Breadcrumb: "Home > Defects".             |
| 5    | Click `sidebar-link-test-plans`          | URL: `/test-plans`. Heading: "Test Plans". Active link: `sidebar-link-test-plans`. Breadcrumb: "Home > Test Plans". |
| 6    | Click `sidebar-link-team`                | URL: `/team`. Heading: "Team". Active link: `sidebar-link-team`. Breadcrumb: "Home > Team".                         |
| 7    | Verify `sidebar-link-reports` is absent  | Element not in DOM.                                                                                                 |
| 8    | Verify `sidebar-link-settings` is absent | Element not in DOM.                                                                                                 |

#### Role: QA Lead

| Step | Action                                   | Expected Result                                                                                         |
| ---- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1    | Log in as `lead` / `lead123`             | Redirected to `/dashboard`. Sidebar shows 6 links.                                                      |
| 2–6  | _(Same as Tester steps 2–6)_             | _(Same results)_                                                                                        |
| 7    | Click `sidebar-link-reports`             | URL: `/reports`. Heading: "Reports". Active link: `sidebar-link-reports`. Breadcrumb: "Home > Reports". |
| 8    | Verify `sidebar-link-settings` is absent | Element not in DOM.                                                                                     |

#### Role: Admin

| Step | Action                         | Expected Result                                                                                             |
| ---- | ------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| 1    | Log in as `admin` / `admin123` | Redirected to `/dashboard`. Sidebar shows 7 links.                                                          |
| 2–7  | _(Same as QA Lead steps 2–7)_  | _(Same results)_                                                                                            |
| 8    | Click `sidebar-link-settings`  | URL: `/settings`. Heading: "Settings". Active link: `sidebar-link-settings`. Breadcrumb: "Home > Settings". |

---

### 4.2 Sidebar Collapse / Expand

| Step | Action                                      | Expected Result                                                                                                                                              |
| ---- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Log in as any user, verify sidebar expanded | Sidebar width: **240px**. Logo text: "Tredgate QA Hub". All link labels visible. Collapse button text: "Collapse".                                           |
| 2    | Click `sidebar-btn-collapse`                | Sidebar width: **64px**. Logo text changes to **"TQH"**. All link labels hidden (only icons remain). Logout button text hidden. Collapse button text hidden. |
| 3    | Verify `data-testid` values unchanged       | All `data-testid` attributes remain the same in both states. `sidebar-btn-collapse` keeps same testid (does **not** change to `sidebar-btn-expand`).         |
| 4    | Click `sidebar-btn-collapse` again          | Sidebar expands back to 240px. Logo text restored. Link labels and button labels visible again.                                                              |

---

### 4.3 Breadcrumb Verification

| Step | Page / Route                | Breadcrumb Structure         | Links                                           |
| ---- | --------------------------- | ---------------------------- | ----------------------------------------------- |
| 1    | `/dashboard`                | **Home** > Dashboard         | "Home" → `/dashboard`                           |
| 2    | `/projects`                 | **Home** > Projects          | "Home" → `/dashboard`                           |
| 3    | `/defects`                  | **Home** > Defects           | "Home" → `/dashboard`                           |
| 4    | `/test-plans`               | **Home** > Test Plans        | "Home" → `/dashboard`                           |
| 5    | `/team`                     | **Home** > Team              | "Home" → `/dashboard`                           |
| 6    | `/reports`                  | **Home** > Reports           | "Home" → `/dashboard`                           |
| 7    | `/settings`                 | **Home** > Settings          | "Home" → `/dashboard`                           |
| 8    | `/defects/1` (detail page)  | **Home** > **Defects** > #1  | "Home" → `/dashboard`, "Defects" → `/defects`   |
| 9    | `/projects/1` (detail page) | **Home** > **Projects** > #1 | "Home" → `/dashboard`, "Projects" → `/projects` |

**Breadcrumb structure notes:**

- Top-level pages: 2-level breadcrumb ("Home" link + current page text).
- Detail pages: 3-level breadcrumb ("Home" link + parent section link + item identifier).
- Separator is a chevron-right SVG icon (`<svg class="lucide lucide-chevron-right">`).
- "Home" always links to `/dashboard`.

---

### 4.4 Logout Flow

| Step | Action                     | Expected Result                                |
| ---- | -------------------------- | ---------------------------------------------- |
| 1    | Click `sidebar-btn-logout` | URL changes to `/login`. Login form displayed. |
| 2    | Navigate to `/dashboard`   | Redirected to `/login`. Login form displayed.  |

---

### 4.5 Permission Denied — Direct URL Access

| Step | Action                                           | Expected Result                                                                                                                                                                             |
| ---- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | As **tester**, navigate to `/reports`            | URL stays at `/reports`. Page shows `data-testid="protected-route-denied"` with text "🚫 Permission Denied — You do not have access to this page." Sidebar still visible (no Reports link). |
| 2    | As **tester**, navigate to `/settings`           | Same denied message. Sidebar visible (no Settings link).                                                                                                                                    |
| 3    | As **QA Lead**, navigate to `/settings`          | Same denied message. Sidebar visible (no Settings link).                                                                                                                                    |
| 4    | As **any role**, navigate to `/nonexistent-page` | URL stays. Page shows `data-testid="not-found-page"` with text "🔍 Page Not Found — The page you are looking for does not exist." Sidebar still visible.                                    |

---

## 5. Edge Cases & Observations

### 5.1 Duplicate `data-testid` on Breadcrumb Links

**⚠️ All breadcrumb links share the same `data-testid="breadcrumbs-link"`.** On detail pages (e.g., `/defects/1`), there are two `<a>` elements with `data-testid="breadcrumbs-link"`: one for "Home" and one for "Defects". Using `[data-testid="breadcrumbs-link"]` as a selector will match multiple elements. Use `:nth-of-type()` or filter by text/href to disambiguate.

### 5.2 Current Page Label Has No `data-testid`

The current page label in breadcrumbs (the last segment, e.g., "Dashboard", "#1") is a `<span class="text-gray-200">` with no `data-testid`. A **potentially fragile** CSS selector for it:

```css
[data-testid="breadcrumbs-nav"] span.text-gray-200
```

### 5.3 Collapse Button `data-testid` Does Not Change

The collapse/expand toggle keeps `data-testid="sidebar-btn-collapse"` in both states. There is no `sidebar-btn-expand` testid. Differentiate state by checking sidebar width, logo text, or link text visibility.

### 5.4 Logo Is Not Clickable

The `sidebar-logo` is a `<span>` inside a `<div>` — not a link. It does not navigate anywhere when clicked.

### 5.5 Sidebar Nav Sections Have No `data-testid`

The three structural `<div>` sections within the sidebar (logo area, nav links, bottom buttons) do not have `data-testid` attributes. Only individual links and buttons inside them do.

### 5.6 Active Link Detection

Active sidebar link is indicated by:

- `aria-current="page"` attribute (reliable, accessibility-compliant).
- CSS classes `bg-neon-purple/20 text-neon-purple` (less reliable for testing, Tailwind-specific).

**Recommended selector for active link:** `[data-testid="sidebar-nav"] [aria-current="page"]`.

### 5.7 React Console Errors on Defect Detail

Navigating to `/defects/1` triggers React console errors:

> "Encountered two children with the same key... Keys should be unique..."

This is a **React rendering bug** in the app, not a test infrastructure issue. The duplicate key is `1`, likely from the breadcrumb or history rendering code.

### 5.8 Unauthenticated Redirect

Navigating to any protected route while logged out silently redirects to `/login`. The URL changes immediately — no flash of protected content.

### 5.9 Permission Denied vs 404

- **Permission Denied:** `data-testid="protected-route-denied"`, contains `<h2>Permission Denied</h2>` + `<p>You do not have access to this page.</p>`. Sidebar is visible.
- **404 Not Found:** `data-testid="not-found-page"`, contains `<h2>Page Not Found</h2>` + `<p>The page you are looking for does not exist.</p>`. Sidebar is visible.

### 5.10 Footer Is Identical Across All Roles

The footer is always visible and identical for all authenticated users:

- Version text: "Tredgate QA Hub v4.0.0"
- Reset Data button always present and enabled.
