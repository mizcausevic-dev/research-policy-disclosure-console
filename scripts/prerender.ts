// SPDX-License-Identifier: AGPL-3.0-or-later

import { mkdir, writeFile } from "node:fs/promises";

import {
  payload,
  policyRouting,
  researchLane,
  reviewPosture,
  summary,
  verification
} from "../src/services/researchPolicyDisclosureConsoleService.js";
import {
  renderDocs,
  renderOverview,
  renderPolicyRouting,
  renderResearchLane,
  renderReviewPosture,
  renderValidation
} from "../src/services/render.js";

async function writePage(route: string, html: string) {
  const directory = route === "/" ? "site" : `site${route}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html, "utf8");
}

async function writeJson(name: string, value: unknown) {
  await mkdir("site/api", { recursive: true });
  await writeFile(`site/api/${name}.json`, JSON.stringify(value, null, 2), "utf8");
}

await writePage("/", renderOverview());
await writePage("/research-lane", renderResearchLane());
await writePage("/policy-routing", renderPolicyRouting());
await writePage("/review-posture", renderReviewPosture());
await writePage("/verification", renderValidation());
await writePage("/docs", renderDocs());

await writeJson("summary", summary());
await writeJson("research-lane", researchLane());
await writeJson("policy-routing", policyRouting());
await writeJson("review-posture", reviewPosture());
await writeJson("verification", verification());
await writeJson("sample", payload());
