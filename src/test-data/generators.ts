import { TestData } from "./qa_hub_data.ts";
import {
  Defect,
  Project,
  ProjectEnvironment,
  TestCase,
  TestPlan,
} from "./types.ts";
import { faker } from "@faker-js/faker";

export class Generators {
  testData = new TestData();

  async generateDefect(defect?: Partial<Defect>): Promise<Defect> {
    // Set default for the required fields and merge with provided partial defect data
    return {
      title: `Defect ${faker.string.uuid()}`,
      description: "Default defect description.",
      severity: {
        value: "minor",
        label: "Minor",
      },
      priority: "P3",
      project: this.testData.projects.phoenix,
      environment: this.testData.projects.phoenix.environments.dev,
      stepsToReproduce: "Default steps to reproduce.",
      ...defect,
    };
  }

  async generateTestPlan(testPlan?: Partial<TestPlan>): Promise<TestPlan> {
    return {
      name: `Test Plan ${faker.string.uuid()}`,
      description: "Default test plan description.",
      project: this.testData.projects.phoenix,
      testCases: [
        {
          name: `Test Case ${faker.string.uuid()}`,
          description: "Default test case description.",
          priority: "medium",
          preconditions: "Default preconditions.",
          steps: [
            {
              action: "Default action.",
              expectedResult: "Default expected result.",
            },
          ],
        },
      ],
      ...testPlan,
    };
  }

  async generateTestCase(testCase?: Partial<TestCase>): Promise<TestCase> {
    return {
      name: `Test Case ${faker.string.uuid()}`,
      description: "Default test case description.",
      priority: "medium",
      preconditions: "Default preconditions.",
      steps: [
        {
          action: "Default action.",
          expectedResult: "Default expected result.",
        },
      ],
      ...testCase,
    };
  }

  async generateProject(project?: Partial<Project>): Promise<Project> {
    const uniqueToken = faker.string.alphanumeric(6).toUpperCase();
    // Placeholder only for create-project form compatibility. Persisted IDs are assigned by the app.
    const createWizardPlaceholderOptionValue = "create-wizard-placeholder";
    const defaultEnvironment: ProjectEnvironment = {
      label: "Dev (dev)",
      optionValue: createWizardPlaceholderOptionValue,
      type: "dev",
      url: `https://dev.${faker.internet.domainWord()}.example.com`,
    };

    return {
      name: `Project ${uniqueToken}`,
      code: `PRJ${uniqueToken}`,
      description: "Default project description.",
      status: "planning",
      qaLead: "2",
      teamMembers: ["1"],
      environments: {
        dev: defaultEnvironment,
      },
      ...project,
    };
  }
}
