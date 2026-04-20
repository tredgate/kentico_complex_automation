import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../base_page.page.ts";
import { CreateTestCaseComponent } from "../../components/test-case/create_test_case.comp.ts";
import { WizardComponent as WizardComponent } from "../../components/wizard.comp.ts";
import { CreatePlanDetailsPage } from "./plan_details.page.ts";
import { TestPlansPage } from "../test_plans.page.ts";
import { ReviewPlanPage } from "./review_plan.page.ts";
import { TestCase } from "../../../test-data/types.ts";

export class CreatePlanTestCasesPage extends BasePage {
  addTestCasesButton: Locator;
  numberOfTestCases = 0;
  testCases: CreateTestCaseComponent<this>[];
  wizardComponent: WizardComponent<this>;

  constructor(page: Page) {
    super(page);
    this.testCases = [];
    this.addTestCasesButton = page.locator(
      `[data-testid="testplan-form-btn-add-case"]`,
    );
    this.wizardComponent = new WizardComponent(this.page, this, "testplan");
  }

  async clickAddTestCase() {
    await this.addTestCasesButton.click();
    this.numberOfTestCases++;
    const testCase = new CreateTestCaseComponent(
      this.page,
      this,
      this.numberOfTestCases - 1,
    );
    this.testCases.push(testCase);
    return testCase; // ? Decide in future if we want to return the page or the created test case component
  }

  onTestCase(testCaseIndex: number) {
    return this.testCases[testCaseIndex];
  }

  async clickNext() {
    return await this.wizardComponent.clickNext(ReviewPlanPage);
  }

  async clickBack() {
    return await this.wizardComponent.clickBack(CreatePlanDetailsPage);
  }

  async clickCancel() {
    return await this.wizardComponent.clickCancel(TestPlansPage);
  }

  async fillTestCasesForm(testCases: TestCase[]) {
    for (const testCase of testCases) {
      const testCaseComponent = await this.clickAddTestCase();
      await testCaseComponent.fillTestCase(testCase);
    }
    return this;
  }
}
