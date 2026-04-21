import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base_page.page.ts";
import { DataTableComponent } from "../components/data_table.comp.ts";
import { ProjectBasicInfoPage } from "./create-project/project_basic_info.page.ts";
import { ProjectDetailPage } from "./project_detail.page.ts";

export class ProjectsPage extends BasePage {
  private readonly createProjectButton: Locator;
  dataTableComponent: DataTableComponent<this>;

  constructor(page: Page) {
    super(page);
    this.createProjectButton = page.locator(
      '[data-testid="project-list-btn-new"]',
    );
    this.dataTableComponent = new DataTableComponent(
      this.page,
      this,
      "project-list",
    );
  }

  async clickCreateProject() {
    await this.createProjectButton.click();
    return new ProjectBasicInfoPage(this.page);
  }

  async openProjectById(projectId: string | number) {
    await this.page
      .locator(`[data-testid="project-list-row-${projectId.toString()}"]`)
      .click();
    return new ProjectDetailPage(this.page);
  }
}
