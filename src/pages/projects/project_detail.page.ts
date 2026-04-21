import { Page } from "@playwright/test";
import { BasePage } from "../base_page.page.ts";

export class ProjectDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
