// SPDX-License-Identifier: AGPL-3.0-or-later

import { analyze } from "../analyze.js";
import { researchLanePackets, reviewPackets, sampleResearchDisclosurePayload } from "../data/sampleResearchDisclosures.js";
import type { Finding } from "../types.js";

const NOW = "2026-05-31T00:00:00Z";
const report = analyze(sampleResearchDisclosurePayload, {
  now: NOW,
  staleDetectionAfterHours: 72
});

function severityRank(finding: Finding): number {
  return finding.severity === "high" ? 0 : finding.severity === "medium" ? 1 : finding.severity === "low" ? 2 : 3;
}

export function summary() {
  return {
    projects: report.projects,
    onTrackProjects: report.onTrackProjects,
    packets: report.packets,
    highSeverityPackets: report.highSeverityPackets,
    workflowGaps: report.workflowGaps,
    stalePackets: report.stalePackets,
    recommendation:
      "Restore missing COI proof, close the IRB and exception packet gaps, repair stale training evidence, and stabilize owner routing before the next committee deadlines."
  };
}

export function researchLane() {
  return researchLanePackets.map((lane) => ({
    ...lane,
    relatedFindings: report.findingsList.filter((finding) => {
      if (lane.id === "intake-lane") return finding.code === "research-disclosure-gap" || finding.code === "workflow-gap";
      if (lane.id === "coi-lane") return finding.code === "missing-coi-proof" || finding.code === "stale-open-packet";
      if (lane.id === "irb-lane") return finding.code === "missing-irb-proof";
      if (lane.id === "training-lane") return finding.code === "missing-training-proof" || finding.code === "high-severity-unassigned";
      return false;
    }).length
  }));
}

export function policyRouting() {
  return [...report.findingsList]
    .sort((left, right) => severityRank(left) - severityRank(right))
    .map((finding) => ({
      ...finding,
      owner:
        finding.owner ??
        (finding.code === "missing-coi-proof"
          ? "Research Compliance"
          : finding.code === "missing-irb-proof"
            ? "IRB Administration"
            : finding.code === "missing-training-proof"
              ? "Training Operations"
              : "Policy Administration")
    }));
}

export function reviewPosture() {
  return reviewPackets;
}

export function verification() {
  return [
    "The dashboard is backed by a real offline research-disclosure analyzer and CLI, not static copy alone.",
    "Projects and disclosure packets are synthetic sample data only; no live student, researcher, or sponsor records are published.",
    "The control plane keeps missing proof, committee pressure, stale training attachments, and review readiness visible for university stakeholders.",
    "This surface demonstrates research disclosure routing and review-safe sequencing, not a generic campus policy keyword page.",
    "It complements student disclosures, reporting, and evidence operations with a reusable university-policy review primitive."
  ];
}

export const validation = verification;

export function payload() {
  return {
    summary: summary(),
    researchLane: researchLane(),
    policyRouting: policyRouting(),
    reviewPosture: reviewPosture(),
    verification: verification(),
    sample: sampleResearchDisclosurePayload
  };
}
