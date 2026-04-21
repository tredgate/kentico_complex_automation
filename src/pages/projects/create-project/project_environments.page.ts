import { Page } from "@playwright/test";
import { BasePage } from "../../base_page.page.ts";
import { WizardComponent } from "../../components/wizard.comp.ts";
import { Project, ProjectEnvironment } from "../../../test-data/types.ts";
import { ProjectEnvironmentsComponent } from "../../components/project_environments.comp.ts";
import { ProjectsPage } from "../projects.page.ts";
import { ProjectTeamAssignmentPage } from "./project_team_assignment.page.ts";
import { ProjectReviewPage } from "./project_review.page.ts";

export class ProjectEnvironmentsPage extends BasePage {
  private readonly wizardComponent: WizardComponent<this>;
  readonly environmentsComponent: ProjectEnvironmentsComponent<this>;

  constructor(page: Page) {
    super(page);
    this.wizardComponent = new WizardComponent(this.page, this, "project");
    this.environmentsComponent = new ProjectEnvironmentsComponent(
      this.page,
      this,
    );
  }

  async onEnvironments() {
    return this.environmentsComponent;
  }

  async clickAddEnvironment() {
    await this.environmentsComponent.clickAddEnvironment();
    return this;
  }

  async fillEnvironmentRow(index: number, environment: ProjectEnvironment) {
    await this.environmentsComponent.fillEnvironmentRow(index, environment);
    return this;
  }

  async removeEnvironmentRow(index: number) {
    await this.environmentsComponent.removeEnvironmentRow(index);
    return this;
  }

  async clickNext() {
    return await this.wizardComponent.clickNext(ProjectReviewPage);
  }

  async clickBack() {
    return await this.wizardComponent.clickBack(ProjectTeamAssignmentPage);
  }

  async clickCancel() {
    return await this.wizardComponent.clickCancel(ProjectsPage);
  }

  async fillEnvironments(project: Project) {
    const environments = Object.values(project.environments ?? {});
    if (environments.length === 0) {
      return this;
    }

    await this.environmentsComponent.fillEnvironments(environments);
    return this;
  }
}
