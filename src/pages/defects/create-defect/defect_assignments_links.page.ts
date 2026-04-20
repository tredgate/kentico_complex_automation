import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../../base_page.page.ts";
import { WizardComponent } from "../../components/wizard.comp.ts";
import { DefectsPage } from "../defects.page.ts";
import { DefectSeverity as DefectSeverity } from "../../../test-data/types.ts";
import { CreateDefectDetailsPage } from "./create_defect_details.page.ts";
import { DefectReviewPage } from "./defect_review.page.ts";

export class DefectAssignmentsLinksPage extends BasePage {
  private readonly wizardComponent: WizardComponent<this>;
  private readonly assigneeSelect: Locator;

  constructor(page: Page) {
    super(page);
    this.wizardComponent = new WizardComponent(this.page, this, "defect");
    this.assigneeSelect = page.locator(
      '[data-testid="defect-form-select-assignee"]',
    );
  }

  async clickNext() {
    await expect(this.assigneeSelect).toBeVisible(); // * Playwright is out-racing here, without this wait the select action sometimes fails on not clicking.
    // TODO Test is sometimes racing and failing on clicking before the page is fully loaded, app will develop new locators for unique identification forms pages
    return await this.wizardComponent.clickNext(DefectReviewPage);
  }

  async clickBack() {
    return await this.wizardComponent.clickBack(CreateDefectDetailsPage);
  }

  async clickCancel() {
    return await this.wizardComponent.clickCancel(DefectsPage);
  }
}
