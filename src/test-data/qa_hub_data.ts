import { Project } from "./types.ts";

export class TestData {
  url = "http://localhost:5173";
  teamMembers = {
    testLeads: {
      laura: "Laura Smith",
    },
    testers: {
      tom: "Tom Tester",
    },
    admins: {
      alex: "Alex Admin",
    },
  };

  projects = {
    phoenix: {
      name: "Project Phoenix",
      code: "PHOENIX",
      description:
        "The flagship e-commerce platform rebuild. Rising from the ashes of the legacy monolith.",
      status: "active",
      qaLead: this.teamMembers.testLeads.laura,
      environments: {
        dev: {
          label: "Dev (dev)",
          optionValue: "1",
          type: "dev",
          url: "https://dev.phoenix.tredgate.com",
        },
        staging: {
          label: "Staging (staging)",
          optionValue: "2",
          type: "staging",
          url: "https://staging.phoenix.tredgate.com",
        },
        production: {
          label: "Production (production)",
          optionValue: "3",
          type: "production",
          url: "https://phoenix.tredgate.com",
        },
      },
    },
    atlas: {
      name: "Project Atlas",
      code: "ATLAS",
      description:
        "Internal mapping and navigation tool for the QA team. Because we got lost in our own test cases.",
      status: "active",
      qaLead: this.teamMembers.testLeads.laura,
      environments: {
        dev: {
          label: "Dev (dev)",
          optionValue: "4",
          type: "dev",
          url: "https://dev.atlas.tredgate.com",
        },
        staging: {
          label: "Staging (staging)",
          optionValue: "5",
          type: "staging",
          url: "https://staging.atlas.tredgate.com",
        },
      },
    },
    projectNebula: {
      name: "Project Nebula",
      code: "NEBULA",
      description:
        "Next-gen analytics dashboard. Still in the cosmic planning phase — nobody knows what it does yet.",
      status: "planning",
      qaLead: this.teamMembers.testLeads.laura,
      environments: {
        dev: {
          label: "Dev (dev)",
          optionValue: "6",
          type: "dev",
          url: "https://dev.nebula.tredgate.com",
        },
      },
    },
  } satisfies Record<string, Project>;
}
