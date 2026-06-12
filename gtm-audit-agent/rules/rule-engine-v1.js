const data = $input.first().json;

const findings = [];

// GTM-01
if (data.signals.ga4ConfigTagCount === 0) {
  findings.push({
    rule: "GTM-01",
    status: "FAIL",
    severity: "CRITICAL",
    issue: "No GA4 Config Tag found",
    recommendation: "Add a GA4 Configuration tag firing on all pages"
  });
}

// GTM-02
if (data.signals.duplicateGA4ConfigRisk) {
  findings.push({
    rule: "GTM-02",
    status: "FAIL",
    severity: "HIGH",
    issue: "Multiple GA4 Config Tags found",
    recommendation: "Keep a single GA4 Configuration tag"
  });
}

// GTM-03
(data.orphanedTags || []).forEach(tag => {
  findings.push({
    rule: "GTM-03",
    status: "FAIL",
    severity: "HIGH",
    issue: `Tag "${tag.name}" has no trigger`,
    recommendation: "Assign a trigger or remove the tag"
  });
});

// GTM-04
(data.orphanedTriggers || []).forEach(trigger => {
  findings.push({
    rule: "GTM-04",
    status: "FAIL",
    severity: "LOW",
    issue: `Unused trigger "${trigger.name}"`,
    recommendation: "Remove unused trigger"
  });
});

// GTM-05
(data.unusedVariables || []).forEach(variable => {
  findings.push({
    rule: "GTM-05",
    status: "FAIL",
    severity: "LOW",
    issue: `Unused variable "${variable.name}"`,
    recommendation: "Remove unused variable if not required"
  });
});

// GTM-06
const requiredEvents = [
  "view_item",
  "add_to_cart",
  "remove_from_cart",
  "begin_checkout",
  "add_payment_info",
  "purchase"
];

const missingEvents = requiredEvents.filter(
  e => !data.signals.ecommerceEventNames.includes(e)
);

if (missingEvents.length > 0) {
  findings.push({
    rule: "GTM-06",
    status: "FAIL",
    severity: "MEDIUM",
    issue: `Missing ecommerce events: ${missingEvents.join(", ")}`,
    recommendation: "Implement missing ecommerce tracking events"
  });
}

// Health Score
const healthScore = Math.max(
  0,
  100 - findings.length * 5
);

// Risk Level
let riskLevel = "LOW";

if (
  findings.some(
    f => f.severity === "CRITICAL"
  )
) {
  riskLevel = "HIGH";
} else if (
  findings.some(
    f => f.severity === "HIGH"
  )
) {
  riskLevel = "MEDIUM";
}

return [{
  json: {
    container_name: data.container_name,
    container_id: data.container_id,
    findings_count: findings.length,
    health_score: healthScore,
    risk_level: riskLevel,
    findings
  }
}];