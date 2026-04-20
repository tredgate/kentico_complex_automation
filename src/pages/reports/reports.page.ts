import { Page } from "@playwright/test";
import { BasePage } from "../base_page.page.ts";

export class ReportsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
