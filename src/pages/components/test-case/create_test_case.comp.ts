import { expect, Locator, Page, test } from "@playwright/test";
import { Component } from "../component.ts";
import { CreateStepsComponent } from "./create_steps.comp.ts";
import { TestCase, TestCasePriority } from "../../../test-data/types.ts";

export class CreateTestCaseComponent<TParent> extends Component<TParent> {
  testCaseIndex: number;
  private readonly nameInput: Locator;
  private readonly prioritySelect: Locator;
  private readonly descriptionInput: Locator;
  private readonly preconditionsInput: Locator;
  private readonly addStepButton: Locator;

  stepsList: CreateStepsComponent<this>[];
  private stepsCount: number = 1;

  constructor(page: Page, parent: TParent, testCaseIndex: number) {
    super(page, parent);
    this.testCaseIndex = testCaseIndex;
    this.nameInput = page.locator(
      `[data-testid="testplan-form-case-${testCaseIndex}-name"]`,
    );
    this.prioritySelect = page.locator(
      `[data-testid="testplan-form-case-${testCaseIndex}-priority"]`,
    );
    this.descriptionInput = page.locator(
      `[data-testid="testplan-form-case-${testCaseIndex}-description"]`,
    );
    this.preconditionsInput = page.locator(
      `[data-testid="testplan-form-case-${testCaseIndex}-preconditions"]`,
    );
    this.addStepButton = page.locator(
      `[data-testid="testplan-form-case-${testCaseIndex}-btn-add-step"]`,
    );
    this.stepsList = [];
  }

  async fillName(name: string) {
    await this.nameInput.fill(name);
    return this;
  }

  async selectPriority(priority: TestCasePriority) {
    await expect(this.prioritySelect).toBeVisible(); // * Playwright is out-racing here, without this wait the select action sometimes fails on: `Error: locator.selectOption: Error: Element is not a <select> element`
    await this.prioritySelect.selectOption(priority);
    return this;
  }

  async fillDescription(description: string) {
    await this.descriptionInput.fill(description);
    return this;
  }

  async fillPreconditions(preconditions: string) {
    await this.preconditionsInput.fill(preconditions);
    return this;
  }

  async addStep(action: string, expectedResult: string) {
    await test.step(`Add and Fill Test Case Step: ${this.stepsCount}`, async () => {
      const stepComponent = new CreateStepsComponent(
        this.page,
        this,
        this.stepsCount - 1, // This is index, we need to take a count and subtract 1 to get the right index for the step
        this.testCaseIndex,
      );
      // * First step is added by default, so we need to click add button only if we want to add more steps
      if (this.stepsCount > 1) {
        await this.addStepButton.click();
      }
      await stepComponent.fillAction(action);
      await stepComponent.fillExpectedResult(expectedResult);
      this.stepsList.push(stepComponent);
      this.stepsCount++;
    });

    return this;
  }

  async removeStep(stepOrder: number) {
    await this.stepsList[stepOrder].removeStep();
    this.stepsList.splice(stepOrder, 1);
    this.stepsCount--;
    return this;
  }

  async editStep(stepOrder: number, action: string, expectedResult: string) {
    const stepComponent = this.stepsList[stepOrder];
    await stepComponent.fillAction(action);
    await stepComponent.fillExpectedResult(expectedResult);
    return this;
  }

  async fillTestCase(testCase: TestCase) {
    await test.step("Fill Test Case", async () => {
      await this.fillName(testCase.name);
      await this.selectPriority(testCase.priority);
      await this.fillDescription(testCase.description);
      if (testCase.preconditions) {
        await this.fillPreconditions(testCase.preconditions);
      }
      if (testCase.steps) {
        for (const step of testCase.steps) {
          await this.addStep(step.action, step.expectedResult);
        }
      }
    });

    return this;
  }
}
