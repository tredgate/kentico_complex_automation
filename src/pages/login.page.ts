import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base_page.page.ts";
import { DashboardPage } from "./dashboard.page.ts";

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-testid="login-input-username"]');
    this.passwordInput = page.locator('[data-testid="login-input-password"]');
    this.loginButton = page.locator('[data-testid="login-btn-submit"]');
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
    return this;
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
    return this;
  }

  async clickLogin() {
    await this.loginButton.click();
    return new DashboardPage(this.page);
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    return await this.clickLogin();
  }
}
