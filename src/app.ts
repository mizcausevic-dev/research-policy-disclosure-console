// SPDX-License-Identifier: AGPL-3.0-or-later

import express from "express";
import { fileURLToPath } from "node:url";

import {
  payload,
  policyRouting,
  researchLane,
  reviewPosture,
  summary,
  verification
} from "./services/researchPolicyDisclosureConsoleService.js";
import {
  renderDocs,
  renderOverview,
  renderPolicyRouting,
  renderResearchLane,
  renderReviewPosture,
  renderValidation,
} from "./services/render.js";

const app = express();
const port = Number(process.env.PORT ?? 5524);
const host = process.env.HOST || "0.0.0.0";

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/research-lane", (_req, res) => res.type("html").send(renderResearchLane()));
app.get("/policy-routing", (_req, res) => res.type("html").send(renderPolicyRouting()));
app.get("/review-posture", (_req, res) => res.type("html").send(renderReviewPosture()));
app.get("/verification", (_req, res) => res.type("html").send(renderValidation()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/research-lane", (_req, res) => res.json(researchLane()));
app.get("/api/policy-routing", (_req, res) => res.json(policyRouting()));
app.get("/api/review-posture", (_req, res) => res.json(reviewPosture()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

const currentFile = fileURLToPath(import.meta.url);
const invokedDirectly = process.argv[1] !== undefined && currentFile === process.argv[1];

if (invokedDirectly) {
  app.listen(port, host, () => {
    console.log(`Research Policy Disclosure Console listening on http://${host}:${port}`);
  });
}

export default app;
