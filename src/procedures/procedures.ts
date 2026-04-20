import { Page } from "@playwright/test";
import { TestPlanProcedures } from "./test_plan.proc.ts";

export class Procedures {
  private readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async testPlan() {
    return new TestPlanProcedures(this.page);
  }
}
