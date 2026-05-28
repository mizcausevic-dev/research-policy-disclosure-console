// SPDX-License-Identifier: AGPL-3.0-or-later

import type {
  AnalysisOptions,
  CoverageReport,
  DisclosurePacket,
  Finding,
  ResearchDisclosureExport,
} from "./types.js";

function hoursBetween(startIso: string, endIso: string) {
  return Math.max(0, (Date.parse(endIso) - Date.parse(startIso)) / 36e5);
}

function hasOpenPacket(packets: DisclosurePacket[], kind: string) {
  return packets.some((packet) => packet.kind === kind && packet.status === "OPEN");
}

export function analyze(
  payload: ResearchDisclosureExport,
  options: AnalysisOptions = {}
): CoverageReport {
  const now = options.now ?? new Date().toISOString();
  const staleAfterHours = options.staleDetectionAfterHours ?? 72;
  const findingsList: Finding[] = [];

  const onTrackProjects = payload.projects.filter((project) => project.status === "ON_TRACK").length;
  const highSeverityPackets = payload.packets.filter(
    (packet) => packet.status === "OPEN" && packet.severity === "high"
  ).length;
  const workflowGaps = payload.projects.filter((project) => !project.workflowHealthy).length;

  if (onTrackProjects === 0) {
    findingsList.push({
      code: "no-on-track-projects",
      severity: "high",
      subject: "workflow",
      subjectId: "projects",
      subjectName: "Research disclosure workflow",
      message: "No research projects are currently on track; the disclosure queue is operating entirely in exception mode."
    });
  }

  for (const project of payload.projects) {
    const projectPackets = payload.packets.filter((packet) => packet.projectId === project.id && packet.status === "OPEN");

    if (project.status === "AT_RISK" || projectPackets.length > 0) {
      findingsList.push({
        code: "research-disclosure-gap",
        severity: project.status === "AT_RISK" ? "high" : "medium",
        subject: "project",
        subjectId: project.id,
        subjectName: `${project.project} ${project.id}`,
        owner: project.owner,
        scope: project.institution,
        message: `${project.project} still has open disclosure debt against the ${project.packet} packet.`
      });
    }

    if (projectPackets.length > 0 && !hasOpenPacket(projectPackets, "Disclosure")) {
      findingsList.push({
        code: "missing-coi-proof",
        severity: "medium",
        subject: "project",
        subjectId: project.id,
        subjectName: `${project.project} ${project.id}`,
        owner: project.owner,
        scope: project.institution,
        message: "The project is in exception flow but does not currently show a clean COI disclosure packet in the queue."
      });
    }

    if (!project.workflowHealthy) {
      findingsList.push({
        code: "workflow-gap",
        severity: "medium",
        subject: "workflow",
        subjectId: project.id,
        subjectName: `${project.project} ${project.id}`,
        owner: project.owner,
        scope: project.institution,
        message: "Owner-safe routing is degraded; the disclosure, review, and approval sequence are still split across teams."
      });
    }
  }

  for (const packet of payload.packets) {
    if (packet.status !== "OPEN") continue;

    if (packet.domain === "COI" || packet.kind === "Disclosure") {
      findingsList.push({
        code: "missing-coi-proof",
        severity: packet.severity,
        subject: "packet",
        subjectId: packet.id,
        subjectName: `${packet.project} ${packet.kind}`,
        owner: packet.owner,
        scope: packet.scope,
        principal: packet.principal,
        message: packet.message
      });
    }

    if (packet.domain === "IRB" || packet.kind === "Approval") {
      findingsList.push({
        code: "missing-irb-proof",
        severity: packet.severity,
        subject: "packet",
        subjectId: packet.id,
        subjectName: `${packet.project} ${packet.kind}`,
        owner: packet.owner,
        scope: packet.scope,
        principal: packet.principal,
        message: packet.message
      });
    }

    if (packet.domain === "TRAINING" || packet.kind === "Training") {
      findingsList.push({
        code: "missing-training-proof",
        severity: packet.severity,
        subject: "packet",
        subjectId: packet.id,
        subjectName: `${packet.project} ${packet.kind}`,
        owner: packet.owner,
        scope: packet.scope,
        principal: packet.principal,
        message: packet.message
      });
    }

    if (!packet.owner && packet.severity === "high") {
      findingsList.push({
        code: "high-severity-unassigned",
        severity: "high",
        subject: "packet",
        subjectId: packet.id,
        subjectName: packet.kind,
        scope: packet.scope,
        message: "A high-severity disclosure packet is still unassigned."
      });
    }

    if (hoursBetween(packet.openedAt, now) >= staleAfterHours) {
      findingsList.push({
        code: "stale-open-packet",
        severity: packet.severity === "high" ? "high" : "medium",
        subject: "packet",
        subjectId: packet.id,
        subjectName: packet.kind,
        owner: packet.owner,
        scope: packet.scope,
        principal: packet.principal,
        message: `${packet.kind} evidence has been open longer than the research review SLA.`
      });
    }
  }

  return {
    ok: findingsList.every((finding) => finding.severity !== "high"),
    projects: payload.projects.length,
    onTrackProjects,
    packets: payload.packets.length,
    highSeverityPackets,
    workflowGaps,
    stalePackets: findingsList.filter((finding) => finding.code === "stale-open-packet").length,
    findingsList
  };
}
