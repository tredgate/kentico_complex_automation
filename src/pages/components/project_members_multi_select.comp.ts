import { Locator, Page } from "@playwright/test";
import { Component } from "./component.ts";

export class ProjectMembersMultiSelectComponent<
  TParent,
> extends Component<TParent> {
  private readonly trigger: Locator;
  private readonly dropdown: Locator;
  private readonly options: Locator;

  constructor(page: Page, parent: TParent) {
    super(page, parent);
    this.trigger = page.locator('[data-testid="project-form-select-members"]');
    this.dropdown = page.locator(
      '[data-testid="project-form-select-members-dropdown"]',
    );
    this.options = page.locator(
      '[data-testid^="project-form-select-members-option-"]',
    );
  }

  async open() {
    if (!(await this.dropdown.isVisible())) {
      await this.trigger.click();
    }
    return this;
  }

  async close() {
    if (await this.dropdown.isVisible()) {
      await this.trigger.click();
    }
    return this;
  }

  private optionByUserId(userId: string | number) {
    return this.page.locator(
      `[data-testid="project-form-select-members-option-${userId.toString()}"]`,
    );
  }

  private optionByLabel(label: string) {
    return this.options.filter({ hasText: label }).first();
  }

  async selectMemberByUserId(userId: string | number) {
    await this.open();
    await this.optionByUserId(userId).click();
    return this;
  }

  async selectMemberByLabel(label: string) {
    await this.open();
    await this.optionByLabel(label).click();
    return this;
  }

  async selectMembersByUserIds(userIds: Array<string | number>) {
    for (const userId of userIds) {
      await this.selectMemberByUserId(userId);
    }
    return this;
  }

  async selectMembersByLabels(labels: string[]) {
    for (const label of labels) {
      await this.selectMemberByLabel(label);
    }
    return this;
  }

  async selectMembers(userIdsOrLabels: string[]) {
    for (const value of userIdsOrLabels) {
      if (/^\d+$/.test(value)) {
        await this.selectMemberByUserId(value);
        continue;
      }
      await this.selectMemberByLabel(value);
    }
    return this;
  }
}
