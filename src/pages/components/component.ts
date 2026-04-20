import { Page } from "@playwright/test";

export abstract class Component<TParent> {
  protected readonly page: Page;
  protected readonly parent: TParent;

  constructor(page: Page, parent: TParent) {
    this.page = page;
    this.parent = parent;
  }

  async done() {
    return this.parent;
  }
}
