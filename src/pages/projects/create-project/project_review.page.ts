import { Page } from "@playwright/test";
import { BasePage } from "../../base_page.page.ts";
import { WizardComponent } from "../../components/wizard.comp.ts";
import { ProjectsPage } from "../projects.page.ts";
import { ProjectDetailPage } from "../project_detail.page.ts";
import { ProjectEnvironmentsPage } from "./project_environments.page.ts";

export class ProjectReviewPage extends BasePage {
  private readonly wizardComponent: WizardComponent<this>;

  constructor(page: Page) {
    super(page);
    this.wizardComponent = new WizardComponent(this.page, this, "project");
  }

  async clickSubmit() {
    return await this.wizardComponent.clickSubmit(ProjectDetailPage);
  }

  async clickBack() {
    return await this.wizardComponent.clickBack(ProjectEnvironmentsPage);
  }

  async clickCancel() {
    return await this.wizardComponent.clickCancel(ProjectsPage);
  }
}
