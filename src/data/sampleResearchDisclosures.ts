// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ResearchDisclosureExport } from "../types.js";

export const sampleResearchDisclosurePayload: ResearchDisclosureExport = {
  projects: [
    {
      id: "RPD-1042",
      project: "AI Tutoring Outcomes Study",
      investigator: "Dr. Nia Patel",
      institution: "North Harbor University",
      owner: "Research Compliance",
      status: "AT_RISK",
      workflowHealthy: false,
      daysToReview: 2,
      packet: "COI and IRB amendment packet",
      excerpt: "Annual review found missing sponsor-interest appendix and incomplete IRB amendment acknowledgment.",
      nextAction: "Route the COI appendix and IRB amendment signoff before the disclosure committee review."
    },
    {
      id: "RPD-2077",
      project: "Student Mobility Access Lab",
      investigator: "Prof. Elena Brooks",
      institution: "Metro State Research Center",
      owner: "Office of Sponsored Programs",
      status: "ON_TRACK",
      workflowHealthy: true,
      daysToReview: 5,
      packet: "Funding attestation packet",
      excerpt: "Funding disclosure packet is complete; only committee acknowledgment is pending.",
      nextAction: "Keep the packet ready and hold for committee signoff."
    },
    {
      id: "RPD-3109",
      project: "Media Bias Annotation Grant",
      investigator: "Dr. Omar Singh",
      institution: "Civic Data Institute",
      owner: "Policy Administration",
      status: "AT_RISK",
      workflowHealthy: false,
      daysToReview: 1,
      packet: "Training and publication exception packet",
      excerpt: "Disclosure reopened after publication conflict note and stale ethics-training proof.",
      nextAction: "Repair the publication exception explanation and finalize the annual training evidence bundle."
    }
  ],
  packets: [
    {
      id: "PKT-001",
      projectId: "RPD-1042",
      project: "AI Tutoring Outcomes Study",
      investigator: "Dr. Nia Patel",
      institution: "North Harbor University",
      owner: "Research Compliance",
      domain: "COI",
      kind: "Disclosure",
      severity: "high",
      status: "OPEN",
      scope: "Annual disclosure review",
      principal: "Sponsor-interest appendix",
      message: "COI packet is still missing the sponsor-interest appendix referenced in the annual review.",
      openedAt: "2026-05-24T08:00:00Z",
      dueAt: "2026-05-30T18:00:00Z"
    },
    {
      id: "PKT-002",
      projectId: "RPD-1042",
      project: "AI Tutoring Outcomes Study",
      investigator: "Dr. Nia Patel",
      institution: "North Harbor University",
      owner: "IRB Administration",
      domain: "IRB",
      kind: "Approval",
      severity: "medium",
      status: "OPEN",
      scope: "IRB amendment review",
      principal: "Amendment signoff",
      message: "IRB amendment packet does not yet reconcile the revised protocol acknowledgment.",
      openedAt: "2026-05-26T12:00:00Z",
      dueAt: "2026-05-30T18:00:00Z"
    },
    {
      id: "PKT-003",
      projectId: "RPD-3109",
      project: "Media Bias Annotation Grant",
      investigator: "Dr. Omar Singh",
      institution: "Civic Data Institute",
      owner: "Policy Administration",
      domain: "PUBLICATION",
      kind: "Exception",
      severity: "high",
      status: "OPEN",
      scope: "Publication disclosure exception",
      principal: "External publication note",
      message: "Exception packet is missing the final chronology tying the publication conflict note to the approval path.",
      openedAt: "2026-05-23T09:30:00Z",
      dueAt: "2026-05-29T21:00:00Z"
    },
    {
      id: "PKT-004",
      projectId: "RPD-3109",
      project: "Media Bias Annotation Grant",
      investigator: "Dr. Omar Singh",
      institution: "Civic Data Institute",
      owner: "Training Operations",
      domain: "TRAINING",
      kind: "Training",
      severity: "medium",
      status: "OPEN",
      scope: "Annual ethics training",
      principal: "Training completion proof",
      message: "Annual ethics-training proof needs reattached evidence after the reopened disclosure review.",
      openedAt: "2026-05-25T16:00:00Z",
      dueAt: "2026-05-29T21:00:00Z"
    },
    {
      id: "PKT-005",
      projectId: "RPD-2077",
      project: "Student Mobility Access Lab",
      investigator: "Prof. Elena Brooks",
      institution: "Metro State Research Center",
      owner: "Office of Sponsored Programs",
      domain: "SPONSORSHIP",
      kind: "Attestation",
      severity: "low",
      status: "RESOLVED",
      scope: "Funding disclosure packet",
      principal: "Sponsor funding attestation",
      message: "Funding attestation packet was accepted on the last committee touchpoint.",
      openedAt: "2026-05-22T10:00:00Z",
      dueAt: "2026-05-28T17:00:00Z"
    }
  ]
};

export const researchLanePackets = [
  {
    id: "intake-lane",
    lane: "Disclosure intake and packet triage",
    owner: "Research Compliance",
    focus: "Missing packet capture and committee-ready disclosure context",
    status: "RED",
    nextAction: "Repair the two at-risk packets before committee posture hardens.",
    note: "The intake desk should surface which projects are missing proof, not just form counts."
  },
  {
    id: "coi-lane",
    lane: "COI and sponsorship disclosure",
    owner: "Research Compliance",
    focus: "Conflict-of-interest appendices and sponsor visibility",
    status: "YELLOW",
    nextAction: "Close the sponsor-interest appendix gap for RPD-1042.",
    note: "COI packets need owner-safe routing before they become audit exceptions."
  },
  {
    id: "irb-lane",
    lane: "IRB and policy approval proof",
    owner: "IRB Administration",
    focus: "Amendment signoff and committee acknowledgment",
    status: "YELLOW",
    nextAction: "Complete IRB amendment reconciliation for the annual review cycle.",
    note: "Approval drift stays visible before it contaminates the disclosure packet."
  },
  {
    id: "training-lane",
    lane: "Training and publication exceptions",
    owner: "Policy Administration",
    focus: "Annual ethics training and publication disclosure routing",
    status: "RED",
    nextAction: "Finalize the publication exception path and repair stale training proof.",
    note: "Research-policy packets must stay readable to both administrators and reviewers."
  }
];

export const reviewPackets = [
  {
    packetId: "RPK-14",
    lane: "AI Tutoring annual disclosure",
    owner: "Research Compliance",
    completenessScore: 58,
    status: "RED",
    blocker: "Sponsor-interest appendix still missing",
    launchWindowHours: 18,
    decisionNote: "Do not clear the review until the COI appendix and IRB amendment signoff are bundled together."
  },
  {
    packetId: "RPK-18",
    lane: "Mobility funding attestation",
    owner: "Office of Sponsored Programs",
    completenessScore: 91,
    status: "GREEN",
    blocker: "No active blocker",
    launchWindowHours: 42,
    decisionNote: "Packet is safe for committee confirmation and operator follow-up."
  },
  {
    packetId: "RPK-22",
    lane: "Media Bias disclosure exception",
    owner: "Policy Administration",
    completenessScore: 63,
    status: "YELLOW",
    blocker: "Training proof is stale",
    launchWindowHours: 12,
    decisionNote: "Review can clear if the training evidence is repaired in the current committee cycle."
  }
];
