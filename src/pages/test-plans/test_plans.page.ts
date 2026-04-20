import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base_page.page.ts";
import { CreatePlanDetailsPage } from "./new-test-plan-wizzard/plan_details.page.ts";

export class TestPlansPage extends BasePage {
  private readonly createTestPlanButton: Locator;

  constructor(page: Page) {
    super(page);
    this.createTestPlanButton = page.locator(
      '[data-testid="testplan-list-btn-new"]',
    );
  }

  clickCreateTestPlan() {
    this.createTestPlanButton.click();
    return new CreatePlanDetailsPage(this.page);
  }
}
