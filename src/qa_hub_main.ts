import { Page } from "@playwright/test";
import { TestData } from "./test-data/qa_hub_data.js";
import { BasePage } from "./pages/base_page.page.js";
import { LoginPage } from "./pages/login.page.js";
import { CredentialManager as CredentialsManager } from "./test-data/credential_manager.js";
import { Generators } from "./test-data/generators.js";

export class TredgateQAHubMain extends BasePage {
  testData = new TestData();
  credentials = new CredentialsManager();
  generators = new Generators();

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.page.goto(this.testData.url);
    return new LoginPage(this.page);
  }
}
