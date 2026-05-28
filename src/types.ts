// SPDX-License-Identifier: AGPL-3.0-or-later

export type ProjectStatus = "ON_TRACK" | "AT_RISK";
export type PacketStatus = "OPEN" | "RESOLVED";
export type Severity = "high" | "medium" | "low" | "info";
export type EvidenceKind = "Disclosure" | "Approval" | "Training" | "Attestation" | "Exception" | string;
export type DisclosureDomain = "COI" | "IRB" | "SPONSORSHIP" | "TRAINING" | "PUBLICATION" | string;

export interface ResearchProject {
  id: string;
  project: string;
  investigator: string;
  institution: string;
  owner: string;
  status: ProjectStatus;
  workflowHealthy: boolean;
  daysToReview: number;
  packet: string;
  excerpt: string;
  nextAction: string;
}

export interface DisclosurePacket {
  id: string;
  projectId: string;
  project: string;
  investigator: string;
  institution: string;
  owner?: string;
  domain: DisclosureDomain;
  kind: EvidenceKind;
  severity: Severity;
  status: PacketStatus;
  scope: string;
  principal?: string;
  message: string;
  openedAt: string;
  dueAt: string;
}

export interface ResearchDisclosureExport {
  projects: ResearchProject[];
  packets: DisclosurePacket[];
}

export type FindingCode =
  | "no-on-track-projects"
  | "research-disclosure-gap"
  | "missing-coi-proof"
  | "missing-irb-proof"
  | "missing-training-proof"
  | "workflow-gap"
  | "stale-open-packet"
  | "high-severity-unassigned";

export interface Finding {
  code: FindingCode;
  severity: Severity;
  subject: "project" | "packet" | "workflow";
  subjectId: string;
  subjectName?: string;
  owner?: string;
  scope?: string;
  principal?: string;
  message: string;
}

export interface AnalysisOptions {
  now?: string;
  staleDetectionAfterHours?: number;
}

export interface CoverageReport {
  ok: boolean;
  projects: number;
  onTrackProjects: number;
  packets: number;
  highSeverityPackets: number;
  workflowGaps: number;
  stalePackets: number;
  findingsList: Finding[];
}
