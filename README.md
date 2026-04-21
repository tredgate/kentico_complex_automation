# Tredgate Complex Automation

Playwright test automation for the **Tredgate QA Hub** — a React SPA used as a training System Under Test. This repository demonstrates three progressive approaches to test automation, from intentionally bad to production-grade.

## Three Approaches

| Approach         | Folder                | What it demonstrates                                                       |
| ---------------- | --------------------- | -------------------------------------------------------------------------- |
| **Spaghetti**    | `tests/spaghetti/`    | Anti-patterns: inline selectors, hardcoded data, no abstraction            |
| **Standard POM** | `tests/standard-pom/` | Classic Page Object Model from tutorials                                   |
| **Advanced**     | `tests/advanced/`     | Fluent API, Component Model, Procedures, i18n, typed data, App Main Object |

## Quick Start

```bash
npm install
npx playwright install
cp .env.example .env
npm test
```

> The Tredgate QA Hub app must be running at `http://localhost:5173` from a separate repository.

### App Repository (SUT)

Repository: [https://github.com/tredgate/tredgate_training_web_app](https://github.com/tredgate/tredgate_training_web_app)

If you want to run these tests locally, clone and start the app first. See the app's README for instructions, but generally it involves:

```bash
git clone https://github.com/tredgate/tredgate_training_web_app.git
cd tredgate_training_web_app
npm install
npm run dev
```

Then return to this automation repository and run the Playwright tests.

## Scripts

| Command                  | Description                  |
| ------------------------ | ---------------------------- |
| `npm test`               | Run all tests                |
| `npm run test:spaghetti` | Run spaghetti tests only     |
| `npm run test:standard`  | Run standard POM tests only  |
| `npm run test:en`        | Run advanced tests (English) |
| `npm run test:cs`        | Run advanced tests (Czech)   |
| `npm run test:headed`    | Run with visible browser     |
| `npm run test:ui`        | Run with Playwright UI       |
| `npm run test:debug`     | Debug mode                   |
| `npm run report`         | Open HTML report             |

## Documentation

| Document                                                 | Purpose                               |
| -------------------------------------------------------- | ------------------------------------- |
| [docs/getting-started.md](docs/getting-started.md)       | Setup and first run                   |
| [docs/architecture.md](docs/architecture.md)             | The three approaches explained        |
| [docs/writing-tests.md](docs/writing-tests.md)           | Practical guide with examples         |
| [docs/naming-conventions.md](docs/naming-conventions.md) | File, class, and method naming rules  |
| [app_in_test_overview.md](app_in_test_overview.md)       | Full reference for the app under test |

## AI-Assisted Development

This repo includes Copilot customization for AI-assisted test writing:

- **Instructions** (`.github/instructions/`) — auto-attach to files by approach and pattern
- **Prompts** (`.github/prompts/`) — slash commands: `/create-test`, `/create-page-object`, `/create-component`, `/create-procedure`, `/add-i18n`
- **Agents** (`.github/agents/`) — planned custom agents for each approach

## Tech Stack

- [Playwright](https://playwright.dev/) + TypeScript
- [dotenv](https://github.com/motdotla/dotenv) — environment configuration
- [cross-env](https://github.com/kentcdodds/cross-env) — cross-platform env vars for i18n
