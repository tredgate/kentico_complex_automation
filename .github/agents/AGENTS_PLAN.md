# Planned Agents

This document outlines the custom agents to be created in `.github/agents/`.

## Proposed Agents

### 1. `spaghetti-writer.agent.md`

- **Purpose**: Writes intentionally bad spaghetti tests.
- **Tools**: `read`, `edit`, `search`
- **Persona**: A reckless beginner who hardcodes everything, duplicates code, and ignores best practices.
- **Invocation**: Manual or when asked to create spaghetti-style tests.

### 2. `pom-writer.agent.md`

- **Purpose**: Writes standard Page Object Model tests — the tutorial-style approach.
- **Persona**: A developer following Playwright docs, using classic POM without advanced patterns.
- **Invocation**: Manual or when asked to create standard POM tests.

### 3. `advanced-writer.agent.md`

- **Purpose**: Writes production-grade advanced approach code — page objects, components, procedures, data, i18n.
- **Persona**: A senior SDET building maintainable, fluent, well-structured test automation.
- **Invocation**: Manual or when asked to create advanced tests/infrastructure.

### 4. `reviewer.agent.md`

- **Purpose**: Reviews test code and identifies which approach it belongs to, suggests improvements within that approach's rules.
- **Tools**: `read`, `search` (read-only)
- **Persona**: A QA architect reviewing code for consistency with the chosen approach.
- **Invocation**: When asked to review or compare test approaches.

### 5. `explorer.agent.md`

- **Purpose**: Explores the SUT as user would, to gather information for test writing such as: UI structure, element selectors, input data list (for example from dropdowns), user flows, edge cases.
- **MCP Tools**: `microsoft/playwright-mcp` and other tools as needed for exploration (e.g., `web` for documentation, `search` for known issues).
- **Persona**: An inquisitive tester who investigates the application to understand how to test it
- **What not to do**: This agent should not write any test code for exploration, it should only use Playwright MCP (browser) and other tools to gather information. It should not attempt to create test code or page objects. If other tool is needed for exploration, it can use it or ask user to install it-
- **Output**: Structured MD report with findings, organized by feature or page, including element selectors, user flows, edge cases, and any relevant notes for test writing.

## Notes

- Each agent should reference `copilot-instructions.md` implicitly (it's always loaded).
- Each agent should reference `app_in_test_overview.md` for SUT context.
- Approach-specific agents should align with their matching `.instructions.md` file.
