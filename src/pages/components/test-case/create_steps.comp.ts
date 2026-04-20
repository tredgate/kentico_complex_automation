import { Locator, Page } from "@playwright/test";
import { Component } from "../component.ts";

export class CreateStepsComponent<TParent> extends Component<TParent> {
  private readonly actionInput: Locator;
  private readonly expectedResultInput: Locator;
  private readonly removeStepButton: Locator;

  constructor(
    page: Page,
    parent: TParent,
    stepOrder: number,
    testCaseOrder: number,
  ) {
    super(page, parent);
    this.actionInput = page.locator(
      `[data-testid="testplan-form-case-${testCaseOrder}-step-${stepOrder}-action"]`,
    );
    this.expectedResultInput = page.locator(
      `[data-testid="testplan-form-case-${testCaseOrder}-step-${stepOrder}-expected"]`,
    );
    this.removeStepButton = page.locator(
      `[data-testid="testplan-form-case-${testCaseOrder}-step-${stepOrder}-remove"]`,
    );
  }

  async fillAction(action: string) {
    await this.actionInput.fill(action);
    return this;
  }

  async fillExpectedResult(expectedResult: string) {
    await this.expectedResultInput.fill(expectedResult);
    return this;
  }

  async removeStep() {
    await this.removeStepButton.click();
    return this.parent;
  }
}
