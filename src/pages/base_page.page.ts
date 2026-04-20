import { Page } from "@playwright/test";
import { SidebarComponent } from "./components/sidebar.comp.ts";
import { Procedures } from "../procedures/procedures.ts";

export abstract class BasePage {
  protected page: Page;
  sidebar: SidebarComponent<this>;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = new SidebarComponent(this.page, this);
  }

  async onSidebar() {
    return this.sidebar;
  }

  async procedures() {
    return new Procedures(this.page);
  }
}
