import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../base_page.page.ts";
import { WizardComponent } from "../../components/wizard.comp.ts";
import { Project } from "../../../test-data/types.ts";
import { ProjectMembersMultiSelectComponent } from "../../components/project_members_multi_select.comp.ts";
import { ProjectsPage } from "../projects.page.ts";
import { ProjectBasicInfoPage } from "./project_basic_info.page.ts";
import { ProjectEnvironmentsPage } from "./project_environments.page.ts";

export class ProjectTeamAssignmentPage extends BasePage {
  private readonly wizardComponent: WizardComponent<this>;
  private readonly qaLeadSelect: Locator;
  private readonly selectAttemptTimeoutMs: number;
  readonly membersMultiSelect: ProjectMembersMultiSelectComponent<this>;

  constructor(page: Page) {
    super(page);
    this.wizardComponent = new WizardComponent(this.page, this, "project");
    this.qaLeadSelect = page.locator(
      '[data-testid="project-form-select-lead"]',
    );
    this.selectAttemptTimeoutMs = 3000;
    this.membersMultiSelect = new ProjectMembersMultiSelectComponent(
      this.page,
      this,
    );
  }

  private mapLegacyLeadLabelToValues(qaLeadIdOrName: string) {
    const knownLeadMappings: Record<string, string[]> = {
      "Laura Smith": ["2"],
    };

    return knownLeadMappings[qaLeadIdOrName] ?? [];
  }

  private async trySelectLeadByValue(value: string) {
    try {
      await this.qaLeadSelect.selectOption(value, {
        timeout: this.selectAttemptTimeoutMs,
      });
      return true;
    } catch {
      return false;
    }
  }

  private async trySelectLeadByLabel(label: string) {
    try {
      await this.qaLeadSelect.selectOption(
        { label },
        {
          timeout: this.selectAttemptTimeoutMs,
        },
      );
      return true;
    } catch {
      return false;
    }
  }

  private async selectByValueOrLabel(valueOrLabel: string) {
    await this.qaLeadSelect.waitFor({ state: "visible" });

    if (await this.trySelectLeadByValue(valueOrLabel)) {
      return this;
    }

    if (await this.trySelectLeadByLabel(valueOrLabel)) {
      return this;
    }

    const mappedValues = this.mapLegacyLeadLabelToValues(valueOrLabel);
    for (const mappedValue of mappedValues) {
      if (await this.trySelectLeadByValue(mappedValue)) {
        return this;
      }
    }

    const mappedValuesDetail =
      mappedValues.length > 0 ? mappedValues.join(", ") : "none";

    throw new Error(
      `Unable to select QA lead "${valueOrLabel}". Tried selecting by value, by label, and legacy mapped values (${mappedValuesDetail}).`,
    );
  }

  async selectQaLead(qaLeadIdOrName: string) {
    await this.selectByValueOrLabel(qaLeadIdOrName);
    return this;
  }

  async onMembersMultiSelect() {
    return this.membersMultiSelect;
  }

  async selectTeamMemberByUserId(userId: string | number) {
    await this.membersMultiSelect.selectMemberByUserId(userId);
    return this;
  }

  async selectTeamMembers(userIdsOrNames: string[]) {
    await this.membersMultiSelect.selectMembers(userIdsOrNames);
    await this.membersMultiSelect.close();
    return this;
  }

  async clickNext() {
    return await this.wizardComponent.clickNext(ProjectEnvironmentsPage);
  }

  async clickBack() {
    return await this.wizardComponent.clickBack(ProjectBasicInfoPage);
  }

  async clickCancel() {
    return await this.wizardComponent.clickCancel(ProjectsPage);
  }

  async fillTeamAssignment(project: Project) {
    await this.selectQaLead(project.qaLead);
    if (project.teamMembers && project.teamMembers.length > 0) {
      await this.selectTeamMembers(project.teamMembers);
    }
    return this;
  }
}
