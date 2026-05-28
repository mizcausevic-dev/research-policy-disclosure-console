// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  policyRouting,
  researchLane,
  reviewPosture,
  summary
} from "../src/services/researchPolicyDisclosureConsoleService.js";

console.log("research-policy-disclosure-console demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(`research lanes: ${researchLane().length}`);
console.log(`policy routing findings: ${policyRouting().length}`);
console.log(`review packets: ${reviewPosture().length}`);
