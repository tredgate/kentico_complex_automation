import { expect, test } from "@playwright/test";
import "dotenv/config";
import { faker } from "@faker-js/faker";
import { TredgateQAHubMain } from "../../src/qa_hub_main.ts";
import { DashboardPage } from "../../src/pages/dashboard.page.ts";
import { SidebarComponent } from "../../src/pages/components/sidebar.comp.ts";
import { TestPlansPage } from "../../src/pages/test-plans/test_plans.page.ts";
import { CreatePlanDetailsPage } from "../../src/pages/test-plans/new-test-plan-wizard/plan_details.page.ts";
import { CreatePlanTestCasesPage } from "../../src/pages/test-plans/new-test-plan-wizard/test_cases.page.ts";
import { CreateTestCaseComponent } from "../../src/pages/components/test-case/create_test_case.comp.ts";
import { ReviewPlanPage } from "../../src/pages/test-plans/new-test-plan-wizard/review_plan.page.ts";
import { DefectsPage } from "../../src/pages/defects/defects.page.ts";
import { LoginPage } from "../../src/pages/login.page.ts";
import { DefectBasicInfoPage } from "../../src/pages/defects/create-defect/defect_basic_info.page.ts";
import { CreateDefectDetailsPage } from "../../src/pages/defects/create-defect/create_defect_details.page.ts";
import { DefectAssignmentsLinksPage } from "../../src/pages/defects/create-defect/defect_assignments_links.page.ts";
import { DefectReviewPage } from "../../src/pages/defects/create-defect/defect_review.page.ts";
import { DefectDetailPage } from "../../src/pages/defects/defect_detail.page.ts";

test.describe("Simple POM Example", () => {
  test("Create New Defect (simple PO)", async ({ page }) => {
    const credentials = {
      username: process.env.LEAD_USERNAME as string,
      password: process.env.LEAD_PASSWORD as string,
    };

    const testPlan = {
      name: `Simple PO Test Plan ${faker.string.uuid()}`,
      description: "Plan created by a simple page object test.",
      projectName: "Project Phoenix",
    };

    const testCase = {
      name: `Simple PO Test Case ${faker.string.uuid()}`,
      description: "Verify that the login page loads.",
      priority: "high" as const,
      preconditions: "App is running locally.",
      step: {
        action: "Open the login page.",
        expectedResult: "Login form is displayed.",
      },
    };

    const defect = {
      title: `Simple PO Defect ${faker.string.uuid()}`,
      description: "Login button does absolutely nothing.",
      projectName: "Project Phoenix",
      severityValue: "critical" as const,
      severityLabel: "Critical",
      priority: "P1" as const,
      environmentOption: "1",
      stepsToReproduce:
        "1. Open the app\n2. Click the login button\n3. Nothing happens",
    };

    const qaHubMain = new TredgateQAHubMain(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const sidebar = new SidebarComponent(page, dashboardPage);
    const testPlansPage = new TestPlansPage(page);
    const createPlanDetailsPage = new CreatePlanDetailsPage(page);
    const createPlanTestCasesPage = new CreatePlanTestCasesPage(page);
    const createTestCaseComponent = new CreateTestCaseComponent(
      page,
      createPlanTestCasesPage,
      0,
    );
    const reviewPlanPage = new ReviewPlanPage(page);
    const defectsPage = new DefectsPage(page);
    const defectBasicInfoPage = new DefectBasicInfoPage(page);
    const createDefectDetailsPage = new CreateDefectDetailsPage(page);
    const defectAssignmentsLinksPage = new DefectAssignmentsLinksPage(page);
    const defectReviewPage = new DefectReviewPage(page);
    const defectDetailPage = new DefectDetailPage(page);

    await qaHubMain.open();
    await loginPage.fillUsername(credentials.username);
    await loginPage.fillPassword(credentials.password);
    await loginPage.clickLogin();
    await sidebar.clickTestPlans();
    await testPlansPage.clickCreateTestPlan();
    await createPlanDetailsPage.fillName(testPlan.name);
    await createPlanDetailsPage.fillDescription(testPlan.description);
    await createPlanDetailsPage.selectProject(testPlan.projectName);
    await createPlanDetailsPage.clickNext();
    await createPlanTestCasesPage.clickAddTestCase();
    await createTestCaseComponent.fillName(testCase.name);
    await createTestCaseComponent.selectPriority(testCase.priority);
    await createTestCaseComponent.fillDescription(testCase.description);
    await createTestCaseComponent.fillPreconditions(testCase.preconditions);
    await createTestCaseComponent.addStep(
      testCase.step.action,
      testCase.step.expectedResult,
    );
    await createPlanTestCasesPage.clickNext();
    await reviewPlanPage.clickSubmit();
    await sidebar.clickDefects();
    await defectsPage.clickCreateDefect();
    await defectBasicInfoPage.fillTitle(defect.title);
    await defectBasicInfoPage.selectProject(defect.projectName);
    await defectBasicInfoPage.selectSeverity(defect.severityValue);
    await defectBasicInfoPage.selectPriority(defect.priority);
    await defectBasicInfoPage.clickNext();
    await createDefectDetailsPage.fillDescription(defect.description);
    await createDefectDetailsPage.selectEnvironment(defect.environmentOption);
    await createDefectDetailsPage.fillStepsToReproduce(defect.stepsToReproduce);
    await createDefectDetailsPage.clickNext();
    await defectAssignmentsLinksPage.clickNext();
    await defectReviewPage.clickSubmit();
    await sidebar.clickDefects();
    await defectsPage.searchDefectByTitle(defect.title);

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
    ).toHaveText(defect.title);
    await expect(
      page.locator("td[data-testid='defect-list-cell-projectId-0']"),
      "Defect project cell matches the selected project",
    ).toHaveText(defect.projectName);
    await expect(
      page.locator("td[data-testid='defect-list-cell-severity-0']"),
      "Defect severity cell matches the selected severity",
    ).toContainText(defect.severityLabel);
  });
});
