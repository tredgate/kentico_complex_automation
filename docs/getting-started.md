# Getting Started

This guide gets you from zero to running tests in under 10 minutes.

---

## Prerequisites

- **Node.js** 18+ installed
- **The Tredgate QA Hub app** running locally (separate repo)
- **Git** for cloning

## Setup

### 1. Clone and Install

```bash
git clone <repo-url>
cd kentico_complex_automation
npm install
```

### 2. Install Playwright Browsers

```bash
npx playwright install
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` if your app runs on a different port or you need different credentials.

### 4. Start the App Under Test

In a **separate terminal**, start the Tredgate QA Hub app:

```bash
# In the QA Hub app repository:
npm install
npm run dev
```

The app should be running at `http://localhost:5173`.

### 5. Run Tests

```bash
# Run all tests
npm test

# Run only spaghetti tests
npm run test:spaghetti

# Run only standard POM tests
npm run test:standard

# Run only advanced tests (English)
npm run test:en

# Run only advanced tests (Czech)
npm run test:cs

# Run in headed mode (see the browser)
npm run test:headed

# Run with Playwright UI
npm run test:ui

# Debug tests step-by-step
npm run test:debug
```

### 6. View Report

After running tests:

```bash
npm run report
```

---

## Project Structure Overview

```
├── .env.example              # Environment variable template
├── .env                      # Your local config (gitignored)
├── playwright.config.ts      # Playwright configuration
├── app_in_test_overview.md   # Full SUT reference document
├── docs/                     # Human documentation
├── tests/
│   ├── spaghetti/            # Approach 1: intentionally bad
│   ├── standard-pom/         # Approach 2: classic POM
│   └── advanced/             # Approach 3: production-grade
└── .github/
    ├── copilot-instructions.md   # AI coding guidelines
    ├── instructions/             # File-specific AI instructions
    ├── prompts/                  # Reusable AI task templates
    └── agents/                   # Custom AI agents (planned)
```

## What's Next?

1. Read [docs/architecture.md](architecture.md) to understand the three approaches and why they exist.
2. Read [app_in_test_overview.md](../app_in_test_overview.md) to understand the app you're testing.
3. Look at existing tests in each approach to see the patterns in action.
4. Start writing tests! Use the Copilot prompts (`/create-test`, `/create-page-object`) for scaffolding help.

## Troubleshooting

| Problem                              | Solution                                                                          |
| ------------------------------------ | --------------------------------------------------------------------------------- |
| Tests fail with "connection refused" | Make sure the QA Hub app is running on port 5173                                  |
| Stale data in tests                  | Clear `localStorage` or click the app's Reset button                              |
| `TEST_LANG` not working              | Use the npm scripts (`test:en`, `test:cs`) — they set the env var via `cross-env` |
| Missing `.env`                       | Copy from `.env.example`: `cp .env.example .env`                                  |
