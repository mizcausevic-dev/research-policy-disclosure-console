import { describe, expect, test } from "vitest";

import { renderDocs, renderOverview } from "./render.js";

describe("render surfaces", () => {
  test("overview carries the new research disclosure title", () => {
    expect(renderOverview()).toContain("Research Policy Disclosure Console");
    expect(renderOverview()).toContain("/research-lane");
  });

  test("docs route exposes the CLI and API shape", () => {
    const html = renderDocs();
    expect(html).toContain("research-policy-console");
    expect(html).toContain("/api/policy-routing");
  });
});
