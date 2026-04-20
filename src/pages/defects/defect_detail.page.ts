import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base_page.page.ts";

export class DefectDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
