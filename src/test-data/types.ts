export type Defect = {
  title: string;
  project: Project;
  description: string;
  severity: {
    value: DefectSeverityValue;
    label: DefectSeverityLabel;
  };
  priority: DefectPriority;
  environment: ProjectEnvironment;
  stepsToReproduce: string;
};

export type Project = {
  name: string;
  code: string;
  description: string;
  status: ProjectStatus;
  qaLead: string;
  teamMembers?: string[];
  environments?: Record<string, ProjectEnvironment>;
};

export type TestPlan = {
  name: string;
  project: Project;
  description: string;
  assignee?: string;
  testCases: TestCase[];
};

export type TestCase = {
  name: string;
  description: string;
  priority: TestCasePriority;
  preconditions?: string;
  steps?: { action: string; expectedResult: string }[];
};

export type ProjectEnvironment = {
  label: string;
  optionValue: string;
  type: EnvironmentType;
  url?: string;
};

export type EnvironmentType = "dev" | "staging" | "production";

export type DefectSeverityValue = "trivial" | "minor" | "major" | "critical";

export type DefectSeverityLabel = "Trivial" | "Minor" | "Major" | "Critical";

export type DefectPriority = "P1" | "P2" | "P3" | "P4";

export type TestCasePriority = "low" | "medium" | "high";

export type ProjectStatus = "planning" | "active" | "archived";
