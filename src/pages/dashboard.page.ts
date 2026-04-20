import { Page } from "@playwright/test";
import { BasePage } from "./base_page.page.ts";
import { SidebarComponent } from "./components/sidebar.comp.ts";

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
