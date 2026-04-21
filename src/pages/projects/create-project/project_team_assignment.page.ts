import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../base_page.page.ts";
import { WizardComponent } from "../../components/wizard.comp.ts";
import { ProjectsPage } from "../projects.page.ts";
import { ProjectBasicInfoPage } from "./project_basic_info.page.ts";
import { ProjectEnvironmentsPage } from "./project_environments.page.ts";

export class ProjectTeamAssignmentPage extends BasePage {
  private readonly wizardComponent: WizardComponent<this>;
  private readonly teamSelectButton;
  private readonly teamMemberNameOptionXpath =
    '//div[@data-testid="project-form-select-members-dropdown"]//span[contains(text(),"{fullName}")]';
  private readonly qaLeadSelect: Locator;

  constructor(page: Page) {
    super(page);
    this.wizardComponent = new WizardComponent(this.page, this, "project");
    this.qaLeadSelect = page.locator(
      '[data-testid="project-form-select-lead"]',
    );
    this.teamSelectButton = page.locator(
      '[data-testid="project-form-select-members"]',
    );
  }

  async selectQaLead(qaLeadFullName: string) {
    await this.qaLeadSelect.selectOption({ label: qaLeadFullName });
    return this;
  }

  async selectTeamMember(teamMemberFullName: string) {
    const teamMemberSelector = this.teamMemberNameOptionXpath.replace(
      "{fullName}",
      teamMemberFullName,
    );
    await this.teamSelectButton.click();
    await this.page.locator(teamMemberSelector).click();
    await this.teamSelectButton.click();

    return this;
  }

  async clickNext() {
    return await this.wizardComponent.clickNext(ProjectEnvironmentsPage);
  }

  async clickBack() {
    return await this.wizardComponent.clickBack(ProjectBasicInfoPage);
  }

  async clickCancel() {
    return await this.wizardComponent.clickCancel(ProjectsPage);
  }
}
