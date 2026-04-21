import { Locator, Page } from "@playwright/test";
import { Component } from "./component.ts";
import { ProjectEnvironment } from "../../test-data/types.ts";
import { ProjectEnvironmentRowComponent } from "./project_environment_row.comp.ts";

export class ProjectEnvironmentsComponent<TParent> extends Component<TParent> {
  private readonly addEnvironmentButton: Locator;

  constructor(page: Page, parent: TParent) {
    super(page, parent);
    this.addEnvironmentButton = page.locator(
      '[data-testid="project-form-btn-add-env"]',
    );
  }

  private rowLocator(index: number) {
    return this.page.locator(`[data-testid="project-form-env-row-${index}"]`);
  }

  onEnvironmentRow(index: number) {
    return new ProjectEnvironmentRowComponent(this.page, this, index);
  }

  async clickAddEnvironment() {
    await this.addEnvironmentButton.click();
    return this;
  }

  private async waitForRowAttachment(index: number) {
    try {
      await this.rowLocator(index).waitFor({
        state: "attached",
        timeout: 400,
      });
      return true;
    } catch {
      return false;
    }
  }

  private async ensureRowExists(index: number) {
    const maxAddAttempts = index + 1;

    for (let attempt = 0; attempt <= maxAddAttempts; attempt++) {
      if ((await this.rowLocator(index).count()) > 0) {
        return this;
      }

      if (attempt < maxAddAttempts) {
        await this.clickAddEnvironment();
        if (await this.waitForRowAttachment(index)) {
          return this;
        }
      }
    }

    throw new Error(
      `Failed to create project environment row ${index} after ${maxAddAttempts} add attempts.`,
    );
  }

  async fillEnvironmentRow(index: number, environment: ProjectEnvironment) {
    await this.ensureRowExists(index);
    await this.onEnvironmentRow(index).fillEnvironment(environment);
    return this;
  }

  async removeEnvironmentRow(index: number) {
    await this.onEnvironmentRow(index).clickRemove();
    return this;
  }

  async fillEnvironments(environments: ProjectEnvironment[]) {
    for (const [index, environment] of environments.entries()) {
      await this.fillEnvironmentRow(index, environment);
    }
    return this;
  }
}
