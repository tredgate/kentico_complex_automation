import { Page } from "@playwright/test";
import { BasePage } from "../../base_page.page.ts";
import { WizardComponent } from "../../components/wizard.comp.ts";
import { DefectsPage } from "../defects.page.ts";
import { DefectAssignmentsLinksPage } from "./defect_assignments_links.page.ts";
import { DefectDetailPage } from "../defect_detail.page.ts";

export class DefectReviewPage extends BasePage {
  private readonly wizardComponent: WizardComponent<this>;

  constructor(page: Page) {
    super(page);
    this.wizardComponent = new WizardComponent(this.page, this, "defect");
  }

  async clickSubmit() {
    return await this.wizardComponent.clickSubmit(DefectDetailPage);
  }

  async clickBack() {
    return await this.wizardComponent.clickBack(DefectAssignmentsLinksPage);
  }

  async clickCancel() {
    return await this.wizardComponent.clickCancel(DefectsPage);
  }
}
