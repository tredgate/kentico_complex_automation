import { Locator, Page } from "@playwright/test";
import { Component } from "./component.ts";

export class WizardComponent<TParent> extends Component<TParent> {
  readonly nextButton: Locator;
  readonly backButton: Locator;
  readonly cancelButton: Locator;
  readonly submitButton: Locator;

  constructor(page: Page, parent: TParent, formPrefix: string) {
    super(page, parent);
    this.nextButton = page.locator(
      `[data-testid="${formPrefix}-form-wizard-btn-next"]`,
    );
    this.backButton = page.locator(
      `[data-testid="${formPrefix}-form-wizard-btn-back"]`,
    );
    this.cancelButton = page.locator(
      `[data-testid="${formPrefix}-form-wizard-btn-cancel"]`,
    );
    this.submitButton = page.locator(
      `[data-testid="${formPrefix}-form-wizard-btn-submit"]`,
    );
  }

  /**
   *
   * This method is used to click on the next button and navigate to the next page of the wizard. It takes a class of the next page as a parameter and returns an instance of that page. This allows us to chain the methods of the next page after clicking the next button.
   *
   * @param nextPage
   * @returns
   */
  async clickNext<TNextPage>(nextPage: new (page: Page) => TNextPage) {
    await this.nextButton.click();
    return new nextPage(this.page);
  }

  async clickBack<TBackPage>(backPage: new (page: Page) => TBackPage) {
    await this.backButton.click();
    return new backPage(this.page);
  }

  async clickCancel<TCancelPage>(cancelPage: new (page: Page) => TCancelPage) {
    await this.cancelButton.click();
    return new cancelPage(this.page);
  }

  async clickSubmit<TSubmitPage>(submitPage: new (page: Page) => TSubmitPage) {
    await this.submitButton.click();
    return new submitPage(this.page);
  }
}
