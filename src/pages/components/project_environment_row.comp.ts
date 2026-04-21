import { Locator, Page } from "@playwright/test";
import { Component } from "./component.ts";
import { EnvironmentType, ProjectEnvironment } from "../../test-data/types.ts";

export class ProjectEnvironmentRowComponent<
  TParent,
> extends Component<TParent> {
  readonly index: number;
  private readonly row: Locator;
  private readonly nameInput: Locator;
  private readonly typeSelect: Locator;
  private readonly urlInput: Locator;
  private readonly removeButton: Locator;

  constructor(page: Page, parent: TParent, index: number) {
    super(page, parent);
    this.index = index;
    this.row = page.locator(`[data-testid="project-form-env-row-${index}"]`);
    this.nameInput = page.locator(
      `[data-testid="project-form-env-name-${index}"]`,
    );
    this.typeSelect = page.locator(
      `[data-testid="project-form-env-type-${index}"]`,
    );
    this.urlInput = page.locator(
      `[data-testid="project-form-env-url-${index}"]`,
    );
    this.removeButton = page.locator(
      `[data-testid="project-form-btn-remove-env-${index}"]`,
    );
  }

  async fillName(name: string) {
    await this.nameInput.fill(name);
    return this;
  }

  async selectType(type: EnvironmentType) {
    await this.typeSelect.selectOption(type);
    return this;
  }

  async fillUrl(url: string) {
    await this.urlInput.fill(url);
    return this;
  }

  async clickRemove() {
    await this.removeButton.click();
    return this.parent;
  }

  async fillEnvironment(environment: ProjectEnvironment) {
    await this.fillName(environment.label);
    await this.selectType(environment.type);
    if (environment.url) {
      await this.fillUrl(environment.url);
    }
    return this;
  }
}
