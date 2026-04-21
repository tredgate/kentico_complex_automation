import { test } from "../../src/fixtures/qa_hub_context.ts";
import { faker } from "@faker-js/faker";
import { Project } from "../../src/test-data/types.ts";
import { DashboardPage } from "../../src/pages/dashboard.page.ts";

test.describe("Preparation for a Presentation", () => {
  let project: Project;

  test.beforeEach(async ({ qaHub }) => {
    project = await qaHub.generators.generateProject({
      name: `E2E Test Project ${faker.string.uuid()}`,
      teamMembers: [qaHub.testData.teamMembers.testers.tom],
    });
    await qaHub.credentials.setupCredentials(
      "ADMIN_USERNAME",
      "ADMIN_PASSWORD",
    );
    await qaHub
      .open()
      .then((login) =>
        login.login(
          qaHub.credentials.getUsername(),
          qaHub.credentials.getPassword(),
        ),
      );
  });

  test("End To End very long test (not finished)", async ({ qaHub }) => {
    await qaHub
      .onSidebar()
      .then((sidebar) => sidebar.clickProjects())
      .then((projects) => projects.clickCreateProject())
      .then((createProjectBasicInfo) =>
        createProjectBasicInfo.fillName(project.name),
      )
      .then((createProjectBasicInfo) =>
        createProjectBasicInfo.fillDescription(project.description),
      )
      .then((createProjectBasicInfo) =>
        createProjectBasicInfo.fillCode(project.code),
      )
      .then((createProjectBasicInfo) =>
        createProjectBasicInfo.selectStatus(project.status),
      )
      .then((createProjectBasicInfo) => createProjectBasicInfo.clickNext())
      .then((createProjectTeam) =>
        createProjectTeam.selectQaLead(project.qaLead),
      )
      .then((createProjectTeam) =>
        createProjectTeam.selectTeamMember(project.teamMembers![0]),
      )
      .then((createProjectTeam) => createProjectTeam.clickNext());
  });
});
