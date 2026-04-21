import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../../base_page.page.ts";
import { WizardComponent } from "../../components/wizard.comp.ts";
import { DefectsPage } from "../defects.page.ts";
import {
  Defect,
  DefectPriority,
  DefectSeverityValue,
} from "../../../test-data/types.ts";
import { CreateDefectDetailsPage } from "./create_defect_details.page.ts";

export class DefectBasicInfoPage extends BasePage {
  private readonly wizardComponent: WizardComponent<this>;
  private readonly titleInput: Locator;
  private readonly projectSelect: Locator;
  private readonly severitySelect: Locator;
  private readonly prioritySelect: Locator;

  constructor(page: Page) {
    super(page);
    this.wizardComponent = new WizardComponent(this.page, this, "defect");
    this.titleInput = page.locator('[data-testid="defect-form-input-title"]');
    this.projectSelect = page.locator(
      '[data-testid="defect-form-select-project"]',
    );
    this.severitySelect = page.locator(
      '[data-testid="defect-form-select-severity"]',
    );
    this.prioritySelect = page.locator(
      '[data-testid="defect-form-select-priority"]',
    );
  }

  async fillTitle(title: string) {
    await this.titleInput.fill(title);
    return this;
  }

  async selectProject(projectName: string) {
    await expect(this.severitySelect).toBeVisible(); // * Playwright is out-racing here, without this wait the select action sometimes fails on: `Error: locator.selectOption: Error: Element is not a <select> element`
    await this.projectSelect.selectOption(projectName);
    return this;
  }

  async selectSeverity(severityValue: DefectSeverityValue) {
    await expect(this.severitySelect).toBeVisible(); // * Playwright is out-racing here, without this wait the select action sometimes fails on: `Error: locator.selectOption: Error: Element is not a <select> element`
    await this.severitySelect.selectOption(severityValue);
    return this;
  }

  async selectPriority(priority: DefectPriority) {
    await expect(this.prioritySelect).toBeVisible(); // * Playwright is out-racing here, without this wait the select action sometimes fails on: `Error: locator.selectOption: Error: Element is not a <select> element`
    await this.prioritySelect.selectOption(priority);
    return this;
  }

  async clickNext() {
    await expect(this.prioritySelect).toBeVisible(); // * Playwright is out-racing here, without this wait the select action sometimes fails.
    await this.page.waitForTimeout(500); // * Temporary solution until the racing issue is resolved, without this wait the next page is sometimes loaded before the assertion in the test, which causes it to fail.
    return await this.wizardComponent.clickNext(CreateDefectDetailsPage);
  }

  async clickCancel() {
    return await this.wizardComponent.clickCancel(DefectsPage);
  }

  async fillDefectBasicInfo(defectData: Defect) {
    await this.fillTitle(defectData.title);
    await this.selectProject(defectData.project.name);
    await this.selectSeverity(defectData.severity.value);
    await this.selectPriority(defectData.priority);
    return this;
  }
}
