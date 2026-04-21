import { test } from "../../src/fixtures/qa_hub_context.ts";
import { Defect } from "../../src/test-data/types.ts";

test.describe("E2E Example Structure", () => {
  let defect: Defect;

  test.beforeEach(async ({ qaHub }) => {
    // * Arrange
    const credentials = await qaHub.credentials.setupCredentials(
      "LEAD_USERNAME",
      "LEAD_PASSWORD",
    );
    const project = qaHub.testData.projects.phoenix;
    const testPlan = await qaHub.generators.generateTestPlan({
      project,
    });
    defect = await qaHub.generators.generateDefect({
      project,
    });

    await qaHub
      .open()
      .then((login) => login.login(credentials.username, credentials.password))
      .then((login) => login.procedures())
      .then((procedures) => procedures.testPlan())
      .then((testPlanProcedures) =>
        testPlanProcedures.createTestPlan(testPlan),
      );
  });

  test("Create New Defect", async ({ qaHub }) => {
    // * Act
    await qaHub
      .onSidebar()
      .then((sidebar) => sidebar.clickDefects())
      .then((defects) => defects.clickCreateDefect())
      .then((defectBasicInfo) => defectBasicInfo.fillDefectBasicInfo(defect))
      .then((defectBasicInfo) => defectBasicInfo.clickNext())
      .then((defectDetails) => defectDetails.fillDefectDetails(defect))
      .then((defectDetails) => defectDetails.clickNext())
      .then((defectAssignmentsLinks) => defectAssignmentsLinks.clickNext())
      .then((defectReview) => defectReview.clickSubmit())
      .then((defectDetail) => defectDetail.onSidebar())
      .then((sidebar) => sidebar.clickDefects())
      .then((defects) => defects.searchDefectByTitle(defect.title))
      // * Assert
      .then((defectDetails) => defectDetails.assertDefectContent(defect, 0));
  });
});
