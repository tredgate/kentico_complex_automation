import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../base_page.page.ts";
import { WizardComponent } from "../../components/wizard.comp.ts";
import { DefectsPage } from "../defects.page.ts";
import {
  Defect,
  DefectSeverity as DefectSeverity,
} from "../../../test-data/types.ts";
import { DefectBasicInfoPage } from "./defect_basic_info.page.ts";
import { DefectReviewPage } from "./defect_review.page.ts";
import { DefectAssignmentsLinksPage } from "./defect_assignments_links.page.ts";

export class CreateDefectDetailsPage extends BasePage {
  private readonly wizardComponent: WizardComponent<this>;
  private readonly descriptionInput: Locator;
  private readonly environmentSelect: Locator;
  private readonly stepsToReproduceInput: Locator;

  constructor(page: Page) {
    super(page);
    this.wizardComponent = new WizardComponent(this.page, this, "defect");
    this.descriptionInput = page.locator(
      '[data-testid="defect-form-input-description"]',
    );
    this.environmentSelect = page.locator(
      '[data-testid="defect-form-select-environment"]',
    );
    this.stepsToReproduceInput = page.locator(
      '[data-testid="defect-form-input-steps"]',
    );
  }

  async fillDescription(description: string) {
    await this.descriptionInput.fill(description);
    return this;
  }

  async selectEnvironment(environment: string) {
    await this.environmentSelect.selectOption(environment);
    return this;
  }

  async fillStepsToReproduce(steps: string) {
    await this.stepsToReproduceInput.fill(steps);
    return this;
  }

  async clickNext() {
    return await this.wizardComponent.clickNext(DefectAssignmentsLinksPage);
  }

  async clickBack() {
    return await this.wizardComponent.clickBack(DefectBasicInfoPage);
  }

  async clickCancel() {
    return await this.wizardComponent.clickCancel(DefectsPage);
  }

  async fillDefectDetails(defectData: Defect) {
    await this.fillDescription(defectData.description);
    await this.selectEnvironment(defectData.environment.optionValue);
    await this.fillStepsToReproduce(defectData.stepsToReproduce);
    return this;
  }
}
