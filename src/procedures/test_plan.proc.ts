import { Page } from "@playwright/test";
import { SidebarComponent } from "../pages/components/sidebar.comp.ts";
import { TestPlan } from "../test-data/types.ts";

export class TestPlanProcedures {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async createTestPlan(testPlan: TestPlan) {
    const sidebar = new SidebarComponent(this.page, this);
    return await sidebar
      .clickTestPlans()
      .then((testPlan) => testPlan.clickCreateTestPlan())
      .then((planDetails) => planDetails.fillPlanDetailsForm(testPlan))
      .then((planDetails) => planDetails.clickNext())
      .then((testCases) => testCases.fillTestCasesForm(testPlan.testCases))
      .then((testCases) => testCases.clickNext())
      .then((reviewPlan) => reviewPlan.clickSubmit());
  }
}
