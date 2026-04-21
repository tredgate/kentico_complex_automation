import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../base_page.page.ts";
import { WizardComponent } from "../../components/wizard.comp.ts";
import { Project, ProjectStatus } from "../../../test-data/types.ts";
import { ProjectsPage } from "../projects.page.ts";
import { ProjectTeamAssignmentPage } from "./project_team_assignment.page.ts";

export class ProjectBasicInfoPage extends BasePage {
  private readonly wizardComponent: WizardComponent<this>;
  private readonly nameInput: Locator;
  private readonly codeInput: Locator;
  private readonly descriptionInput: Locator;
  private readonly statusSelect: Locator;

  constructor(page: Page) {
    super(page);
    this.wizardComponent = new WizardComponent(this.page, this, "project");
    this.nameInput = page.locator('[data-testid="project-form-input-name"]');
    this.codeInput = page.locator('[data-testid="project-form-input-code"]');
    this.descriptionInput = page.locator(
      '[data-testid="project-form-input-description"]',
    );
    this.statusSelect = page.locator(
      '[data-testid="project-form-select-status"]',
    );
  }

  async fillName(name: string) {
    await this.nameInput.fill(name);
    return this;
  }

  async fillCode(code: string) {
    await this.codeInput.fill(code);
    return this;
  }

  async fillDescription(description: string) {
    await this.descriptionInput.fill(description);
    return this;
  }

  async selectStatus(status: ProjectStatus) {
    await this.statusSelect.selectOption(status);
    return this;
  }

  async clickNext() {
    return await this.wizardComponent.clickNext(ProjectTeamAssignmentPage);
  }

  async clickCancel() {
    return await this.wizardComponent.clickCancel(ProjectsPage);
  }

  async fillBasicInfo(project: Project) {
    await this.fillName(project.name);
    await this.fillCode(project.code);
    await this.fillDescription(project.description);
    await this.selectStatus(project.status);
    return this;
  }
}
