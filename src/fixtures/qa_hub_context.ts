// This file contains the fixture for the QA Hub Page which is used in the tests instead of the Playwright's Page fixture. It returns the qa_hub_main page which is the main objects for the tests (there are page objects, test data and config and other support features). Tester than have only one way to interact which is helping learning curve and also better readability of the tests (test does not have any other import or objects than the qa_hub_main page)
// https://playwright.dev/docs/test-fixtures#creating-a-fixture

import { Page } from "@playwright/test";
import { TredgateQAHubMain } from "../qa_hub_main.ts";
import { test as base } from "@playwright/test";

type QaHubFixtures = {
  qaHub: TredgateQAHubMain;
};

export const test = base.extend<QaHubFixtures>({
  qaHub: async ({ page }, use) => {
    const qaHubMain = new TredgateQAHubMain(page);
    await use(qaHubMain);
  },
});
