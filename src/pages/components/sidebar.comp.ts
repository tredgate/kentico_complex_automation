import { Locator, Page } from "@playwright/test";
import { Component } from "./component.ts";
import type { DefectsPage } from "../defects/defects.page.ts";
export class SidebarComponent<TParent> extends Component<TParent> {
  // Sidebar
  protected readonly nav: Locator;
  protected readonly logo: Locator;
  protected readonly logoutButton: Locator;
  protected readonly collapseButton: Locator;

  // Footer
  protected readonly footer: Locator;
  protected readonly footerVersion: Locator;
  protected readonly footerResetButton: Locator;

  constructor(page: Page, parent: TParent) {
    super(page, parent);

    this.nav = page.getByTestId("sidebar-nav");
    this.logo = page.getByTestId("sidebar-logo");
    this.logoutButton = page.getByTestId("sidebar-btn-logout");
    this.collapseButton = page.getByTestId("sidebar-btn-collapse");

    this.footer = page.getByTestId("footer");
    this.footerVersion = page.getByTestId("footer-version");
    this.footerResetButton = page.getByTestId("footer-btn-reset");
  }

  // --- Navigation link methods ---
  // ! Lazy require() to break circular dependency: BasePage → SidebarComponent → Page → BasePage

  async clickDashboard() {
    const { DashboardPage } = require("../dashboard.page.ts");
    await this.page.getByTestId("sidebar-link-dashboard").click();
    return new DashboardPage(this.page);
  }

  async clickProjects() {
    const { ProjectsPage } = require("../projects/projects.page.ts");
    await this.page.getByTestId("sidebar-link-projects").click();
    return new ProjectsPage(this.page);
  }

  async clickDefects(): Promise<DefectsPage> {
    const { DefectsPage } = require("../defects/defects.page.ts");
    await this.page.getByTestId("sidebar-link-defects").click();
    return new DefectsPage(this.page);
  }

  async clickTestPlans() {
    const { TestPlansPage } = require("../test-plans/test_plans.page.ts");
    await this.page.getByTestId("sidebar-link-test-plans").click();
    return new TestPlansPage(this.page);
  }

  async clickTeam() {
    const { TeamPage } = require("../team/team.page.ts");
    await this.page.getByTestId("sidebar-link-team").click();
    return new TeamPage(this.page);
  }

  async clickReports() {
    const { ReportsPage } = require("../reports/reports.page.ts");
    await this.page.getByTestId("sidebar-link-reports").click();
    return new ReportsPage(this.page);
  }

  async clickSettings() {
    const { SettingsPage } = require("../settings/settings.page.ts");
    await this.page.getByTestId("sidebar-link-settings").click();
    return new SettingsPage(this.page);
  }

  // --- Action methods ---

  async clickLogout() {
    await this.logoutButton.click();
    return this;
  }

  async clickCollapse() {
    await this.collapseButton.click();
    return this;
  }

  async clickResetData() {
    await this.footerResetButton.click();
    return this;
  }
}
