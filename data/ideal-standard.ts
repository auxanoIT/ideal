export const idealStandardSteps = [
  {
    id: "assess", title: "Assess", short: "Understand the environment before work begins.",
    description: "We begin by understanding the requirement, the environment and the conditions that must remain protected before work starts.",
    outcome: "Clarity before action.",
    target: [458, 384], path: "M 235 145 H 320 L 458 384", area: [458, 397, 35, 55],
  },
  {
    id: "plan", title: "Plan", short: "Define the path before execution.",
    description: "We establish scope, sequencing, access, dependencies and the safest route to a controlled implementation.",
    outcome: "Fewer surprises during delivery.",
    target: [662, 248], path: "M 965 145 H 830 L 662 248", area: [662, 248, 90, 25],
  },
  {
    id: "execute", title: "Execute", short: "Put skilled hands where the work happens.",
    description: "Our onsite engineers carry out the approved technical work with precision inside live infrastructure environments.",
    outcome: "Plans become real-world execution.",
    target: [715, 384], path: "M 965 345 H 825 L 715 384", area: [715, 399, 34, 58],
  },
  {
    id: "verify", title: "Verify", short: "Confirm readiness before sign-off.",
    description: "Equipment, connectivity and deployment conditions are checked before the work is considered complete.",
    outcome: "Confidence before sign-off.",
    target: [769, 414], path: "M 965 545 H 870 L 769 414", area: [769, 418, 28, 32],
  },
  {
    id: "document", title: "Document", short: "Leave clearer records and visibility.",
    description: "We capture relevant infrastructure changes and handover information so your team retains visibility after completion.",
    outcome: "Better control of what comes next.",
    target: [662, 526], path: "M 235 545 H 435 L 662 526", area: [677, 524, 57, 40],
  },
  {
    id: "support", title: "Support", short: "Stay ready for what changes next.",
    description: "Infrastructure evolves. We remain available for maintenance, technical intervention and future change.",
    outcome: "Support beyond installation.",
    target: [254, 420], path: "M 235 345 H 210 L 254 420", area: [254, 420, 30, 50],
  },
] as const;
