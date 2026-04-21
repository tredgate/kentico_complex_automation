import { Locator, Page } from "playwright/types/test";
import { BasePage } from "../../base_page.page.ts";
import { TestPlansPage } from "../test_plans.page.ts";
import { CreatePlanTestCasesPage } from "./test_cases.page.ts";
import { WizardComponent as WizardComponent } from "../../components/wizard.comp.ts";

export class ReviewPlanPage extends BasePage {
  private readonly wizardComponent: WizardComponent<this>;

  constructor(page: Page) {
    super(page);
    this.wizardComponent = new WizardComponent(this.page, this, "testplan");
  }

  async clickSubmit() {
    return await this.wizardComponent.clickSubmit(TestPlansPage);
  }

  async clickBack() {
    return await this.wizardComponent.clickBack(CreatePlanTestCasesPage);
  }

  async clickCancel() {
    return await this.wizardComponent.clickCancel(TestPlansPage);
  }
}
