import { Locator, Page } from "playwright/types/test";
import { BasePage } from "../../base_page.page.ts";
import { TestPlansPage } from "../test_plans.page.ts";
import { CreatePlanTestCasesPage } from "./test_cases.page.ts";
import { WizardComponent as WizardComponent } from "../../components/wizard.comp.ts";
import { TestPlan } from "../../../test-data/types.ts";

export class CreatePlanDetailsPage extends BasePage {
  private readonly nameInput: Locator;
  private readonly descriptionInput: Locator;
  private readonly projectSelect: Locator;
  private readonly assigneeSelect: Locator;
  private readonly wizardComponent: WizardComponent<this>;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.locator('[data-testid="testplan-form-input-name"]');
    this.descriptionInput = page.locator(
      '[data-testid="testplan-form-input-description"]',
    );
    this.projectSelect = page.locator(
      '[data-testid="testplan-form-select-project"]',
    );
    this.assigneeSelect = page.locator(
      '[data-testid="testplan-form-select-assignee"]',
    );
    this.wizardComponent = new WizardComponent(this.page, this, "testplan");
  }

  async fillName(name: string) {
    await this.nameInput.fill(name);
    return this;
  }

  async fillDescription(description: string) {
    await this.descriptionInput.fill(description);
    return this;
  }

  async selectProject(projectName: string) {
    await this.projectSelect.selectOption({ label: projectName });
    return this;
  }

  async selectAssignee(assigneeName: string) {
    await this.assigneeSelect.selectOption({ label: assigneeName });
    return this;
  }

  async clickNext() {
    await this.wizardComponent.clickNext(CreatePlanTestCasesPage);
    return new CreatePlanTestCasesPage(this.page);
  }

  async clickCancel() {
    return await this.wizardComponent.clickCancel(TestPlansPage);
  }

  async fillPlanDetailsForm(testPlan: TestPlan) {
    await this.fillName(testPlan.name);
    await this.fillDescription(testPlan.description);
    await this.selectProject(testPlan.project.name);
    if (testPlan.assignee) {
      await this.selectAssignee(testPlan.assignee);
    }
    return this;
  }
}
