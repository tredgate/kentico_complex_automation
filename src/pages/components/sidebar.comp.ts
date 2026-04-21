import { Locator, Page } from "@playwright/test";
import { Component } from "./component.ts";
import type { DefectsPage } from "../defects/defects.page.ts";
import type { DashboardPage } from "../dashboard.page.ts";
import type { ProjectsPage } from "../projects/projects.page.ts";
import type { TestPlansPage } from "../test-plans/test_plans.page.ts";
import type { TeamPage } from "../team/team.page.ts";
import type { ReportsPage } from "../reports/reports.page.ts";
import type { SettingsPage } from "../settings/settings.page.ts";
import type { LoginPage } from "../login.page.ts";

export class SidebarComponent<TParent> extends Component<TParent> {
  protected readonly logo: Locator;
  protected readonly logoutButton: Locator;
  protected readonly collapseButton: Locator;
  protected readonly footer: Locator;
  protected readonly footerVersion: Locator;

  constructor(page: Page, parent: TParent) {
    super(page, parent);
    this.logo = page.getByTestId("sidebar-logo");
    this.logoutButton = page.getByTestId("sidebar-btn-logout");
    this.collapseButton = page.getByTestId("sidebar-btn-collapse");

    this.footer = page.getByTestId("footer");
    this.footerVersion = page.getByTestId("footer-version");
  }

  // ! Lazy require() to break circular dependency: BasePage → SidebarComponent → Page → BasePage
  async clickDashboard(): Promise<DashboardPage> {
    const { DashboardPage } = require("../dashboard.page.ts");
    await this.page.getByTestId("sidebar-link-dashboard").click();
    return new DashboardPage(this.page);
  }

  async clickProjects(): Promise<ProjectsPage> {
    const { ProjectsPage } = require("../projects/projects.page.ts");
    await this.page.getByTestId("sidebar-link-projects").click();
    return new ProjectsPage(this.page);
  }

  async clickDefects(): Promise<DefectsPage> {
    const { DefectsPage } = require("../defects/defects.page.ts");
    await this.page.getByTestId("sidebar-link-defects").click();
    return new DefectsPage(this.page);
  }

  async clickTestPlans(): Promise<TestPlansPage> {
    const { TestPlansPage } = require("../test-plans/test_plans.page.ts");
    await this.page.getByTestId("sidebar-link-test-plans").click();
    return new TestPlansPage(this.page);
  }

  async clickTeam(): Promise<TeamPage> {
    const { TeamPage } = require("../team/team.page.ts");
    await this.page.getByTestId("sidebar-link-team").click();
    return new TeamPage(this.page);
  }

  async clickReports(): Promise<ReportsPage> {
    const { ReportsPage } = require("../reports/reports.page.ts");
    await this.page.getByTestId("sidebar-link-reports").click();
    return new ReportsPage(this.page);
  }

  async clickSettings(): Promise<SettingsPage> {
    const { SettingsPage } = require("../settings/settings.page.ts");
    await this.page.getByTestId("sidebar-link-settings").click();
    return new SettingsPage(this.page);
  }

  async clickLogout(): Promise<LoginPage> {
    const { LoginPage } = require("../login.page.ts");
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }

  async clickCollapse() {
    await this.collapseButton.click();
    return this;
  }
}
