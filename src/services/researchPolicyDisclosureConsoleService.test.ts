import { describe, expect, test } from "vitest";

import {
  payload,
  policyRouting,
  researchLane,
  reviewPosture,
  summary,
  validation
} from "./researchPolicyDisclosureConsoleService.js";

describe("research policy disclosure console service", () => {
  test("summary reports project and packet counts", () => {
    const result = summary();
    expect(result.projects).toBe(3);
    expect(result.onTrackProjects).toBe(1);
    expect(result.packets).toBe(5);
  });

  test("lane and review packets are present", () => {
    expect(researchLane()).toHaveLength(4);
    expect(reviewPosture()).toHaveLength(3);
  });

  test("payload includes routing findings and verification", () => {
    expect(policyRouting().length).toBeGreaterThan(0);
    expect(validation()).toHaveLength(5);
    expect(payload().sample.projects[0]?.project).toBe("AI Tutoring Outcomes Study");
  });
});
