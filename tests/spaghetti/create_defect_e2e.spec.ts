import { test, expect } from "@playwright/test";
import "dotenv/config";

test("Create New Defect (🍝)", async ({ page }) => {
  const url = "http://localhost:5173";
  const password = "lead123";
  const testPlanDescription = "Plan created by a spaghetti test.";
  const testPlanProjectName = "Project Phoenix";
  const testCaseName =
    "Spaghetti Test Case " + Math.floor(Math.random() * 100000);
  const defectTitle = "Spaghetti Defect " + Math.floor(Math.random() * 100000);
  const defectSteps =
    "1. Open the app\n2. Click the login button\n3. Nothing happens";
  for (let i = 0; i < 5; i++) {
    let testSuccess = false;
    await page.goto(url);
    await page.locator('[data-testid="login-input-username"]').fill("lead");
    await page.locator('[data-testid="login-input-password"]').fill(password);
    await page.locator('[data-testid="login-btn-submit"]').click();
    await page.waitForTimeout(2500);
    for (let j = 0; j < 10; j++) {
      const sidebarVisible = await page
        .locator('[data-testid="sidebar-link-projects"]')
        .isVisible();
      if (sidebarVisible) {
        await page.locator('[data-testid="sidebar-link-test-plans"]').click();
        await page.locator('[data-testid="testplan-list-btn-new"]').click();
        await page
          .locator('[data-testid="testplan-form-input-name"]')
          .fill("Spaghetti Test Plan " + Math.floor(Math.random() * 100000));
        await page
          .locator('[data-testid="testplan-form-input-description"]')
          .fill(testPlanDescription);
        await page
          .locator('[data-testid="testplan-form-select-project"]')
          .selectOption({ label: testPlanProjectName });
        await page
          .locator('[data-testid="testplan-form-wizard-btn-next"]')
          .click();
        await page
          .locator('[data-testid="testplan-form-btn-add-case"]')
          .click();
        await page
          .locator('[data-testid="testplan-form-case-0-name"]')
          .fill(testCaseName);
        await expect(
          page.locator('[data-testid="testplan-form-case-0-priority"]'),
        ).toBeVisible();
        await page
          .locator('[data-testid="testplan-form-case-0-priority"]')
          .selectOption("high");
        await page
          .locator('[data-testid="testplan-form-case-0-description"]')
          .fill("Verify that the login page loads.");
        await page
          .locator('[data-testid="testplan-form-case-0-preconditions"]')
          .fill("App is running locally.");
        await page
          .locator('[data-testid="testplan-form-case-0-step-0-action"]')
          .fill("Open the login page.");
        await page
          .locator('[data-testid="testplan-form-case-0-step-0-expected"]')
          .fill("Login form is displayed.");
        await page
          .locator('[data-testid="testplan-form-wizard-btn-next"]')
          .click();
        await page
          .locator('[data-testid="testplan-form-wizard-btn-submit"]')
          .click();
        await page.locator('[data-testid="sidebar-link-defects"]').click();
        await page.locator('[data-testid="defect-list-btn-new"]').click();
        await page
          .locator('[data-testid="defect-form-input-title"]')
          .fill(defectTitle);
        await expect(
          page.locator('[data-testid="defect-form-select-severity"]'),
        ).toBeVisible();
        await page
          .locator('[data-testid="defect-form-select-project"]')
          .selectOption("Project Phoenix");
        await page
          .locator('[data-testid="defect-form-select-severity"]')
          .selectOption("critical");
        await page
          .locator('[data-testid="defect-form-select-priority"]')
          .selectOption("P1");
        await page.waitForTimeout(2500);
        await page
          .locator('[data-testid="defect-form-wizard-btn-next"]')
          .click();
        await page
          .locator('[data-testid="defect-form-input-description"]')
          .fill("defectDescription");
        await page
          .locator('[data-testid="defect-form-select-environment"]')
          .selectOption("1");
        await page
          .locator('[data-testid="defect-form-input-steps"]')
          .fill(defectSteps);
        await page
          .locator('[data-testid="defect-form-wizard-btn-next"]')
          .click();
        await expect(
          page.locator('[data-testid="defect-form-select-assignee"]'),
        ).toBeVisible();
        await page
          .locator('[data-testid="defect-form-wizard-btn-next"]')
          .click();
        await page
          .locator('[data-testid="defect-form-wizard-btn-submit"]')
          .click();
        await page.locator('[data-testid="sidebar-link-defects"]').click();
        await page
          .locator('[data-testid="defect-list-input-search"]')
          .fill(defectTitle);
        await expect(
          page.locator('[data-testid="defect-list-row-0"]'),
          "First row is visible after searching",
        ).toBeVisible();
        await expect(
          page.locator("td[data-testid='defect-list-cell-id-0']"),
          "Defect ID cell is visible",
        ).toBeVisible();
        await expect(
          page.locator("td[data-testid='defect-list-cell-title-0']"),
          "Defect title cell matches the created title",
        ).toHaveText(defectTitle);
        await expect(
          page.locator("td[data-testid='defect-list-cell-projectId-0']"),
          "Defect project cell matches the selected project",
        ).toHaveText("Project Phoenix");
        await expect(
          page.locator("td[data-testid='defect-list-cell-severity-0']"),
          "Defect severity cell matches the selected severity",
        ).toContainText("Critical");
        testSuccess = true;
        break; // exit the retry loop on success
      } else {
        // If login failed, wait a bit before retrying
        await page.waitForTimeout(2000);
      }
    }
    if (testSuccess) {
      break; // exit the outer loop if the test succeeded
    }
  }
});
