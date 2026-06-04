# Mamaearth Product Page Audit

**Audit ID:** audit-013
**Website:** Mamaearth
**Page Type:** Product Detail Page (PDP)
**Audit Method:** External Browser-Based Audit
**Tools Used:** Chrome DevTools (Network, Console)
**Date:** 04-06-2026

---

## Audit Scope

This audit was conducted using publicly accessible browser-side data only.

### Access Constraints

* No GTM container access
* No GA4 property access
* No server-side tagging visibility
* No GTM Preview mode

All findings are based on:

* Network request inspection
* dataLayer inspection
* GA4 payload analysis

---

## Business Impact Overview

Audit identified **4 confirmed** and **1 suspected** finding on the Mamaearth product page.

If left unresolved:

* **Pageview counts are inflated** due to duplicate `page_view` firing, affecting page-level reporting and conversion analysis (Bug 1)
* **Product-level ecommerce reporting may be incomplete or unreliable** because `view_item` is sending UA-format product encoding that GA4 does not natively process (Bug 2)
* **Revenue reporting carries data quality risk** due to string-based numeric values and missing currency attribution (Bug 3, Bug 4)
* **User segmentation may be inconsistent** because returning-user classification differs between the dataLayer and GA4 payload (Bug 5)

Analytics-based decisions on product performance, conversion optimisation, and audience targeting may be affected by data quality issues until these findings are investigated and resolved.

---

## Findings Summary

| Bug   | Finding                                          | Severity   | Confidence |
| ----- | ------------------------------------------------ | ---------- | ---------- |
| Bug 1 | Duplicate page_view firing                       | High       | Confirmed  |
| Bug 2 | UA Enhanced Ecommerce payload present in GA4 hit | High       | Confirmed  |
| Bug 3 | Price and quantity passed as strings             | Low/Medium | Confirmed  |
| Bug 4 | Currency missing from ecommerce payload          | Medium     | Confirmed  |
| Bug 5 | userType mismatch with Customer_Type_Analytics   | Medium     | Suspected  |

---

## Audit Statistics

| Metric              | Count |
| ------------------- | ----- |
| Total Findings      | 5     |
| Confirmed Findings  | 4     |
| Suspected Findings  | 1     |
| High Severity       | 2     |
| Medium Severity     | 2     |
| Low/Medium Severity | 1     |

---

## Key Findings

### Bug 1 — Duplicate page_view Firing

**Symptom:** Two `page_view` hits fired on a single product page load with no user interaction.

**Evidence:** Network tab showed two `collect?v=2&tid=G-NEB3G7SX9B` requests containing `en=page_view`, differentiated by `rcb=10` and `rcb=11`.

**Impact:** Inflated pageview counts, distorted landing page reporting, and artificially lower conversion rates when pageviews are used as the denominator.

---

### Bug 2 — UA Enhanced Ecommerce Payload Present in GA4 Hit

**Symptom:** The `view_item` network hit contains UA-style `pr1` product encoding inside a GA4 request.

**Evidence:** Payload contained:

`pr1=nmVitamin C Daily Glow Face Serum...~pr339.00~brMamaearth`

while the dataLayer simultaneously contained a GA4-compatible `ecommerce.items` structure.

**Impact:** Product-level reporting may be incomplete or inaccurate because product data is not being transmitted in a GA4-native format.

---

### Bug 3 — Numeric Values Passed as Strings

**Symptom:** `price` and `quantity` are pushed as strings rather than numeric values.

**Evidence:**

`price: "339.00"`

`quantity: "1"`

**Impact:** Creates data quality risk and potential downstream inconsistencies in BigQuery exports, Looker Studio, and type-sensitive reporting environments.

---

### Bug 4 — Currency Missing from Ecommerce Payload

**Symptom:** No `currency` or `cu=` parameter was observed in the `view_item` payload.

**Evidence:** Full payload review confirmed no currency parameter at event level or item level.

**Impact:** GA4 falls back to the property-level default currency. This increases implementation risk if multi-currency reporting is introduced in the future.

---

### Bug 5 — User Classification Mismatch

**Symptom:** `userType: "returning"` in the dataLayer conflicts with `ep.Customer_Type_Analytics = Not_Repeat` in the GA4 payload.

**Evidence:** Both values were observed during the same session and page load.

**Impact:** Returning-user segmentation, audience creation, CRM syncing, and lifecycle reporting may produce inconsistent results.

---

## Repository Structure

```text
audit-011-mamaearth-product-page/
│
├── screenshots/
│
├── bug-01-duplicate-pageview.md
├── bug-02-ua-payload-on-ga4.md
├── bug-03-string-price-quantity.md
├── bug-04-currency-missing.md
├── bug-05-usertype-mismatch.md
│
├── executive-summary.md
└── README.md
```

---

## Skills Demonstrated

* GA4 Debugging
* GTM Troubleshooting
* Ecommerce Tracking Audits
* Network Payload Analysis
* dataLayer Validation
* Root Cause Investigation
* Browser-Based Analytics QA

---

## Disclaimer

This audit reflects only client-side observations available through browser inspection.

Root cause attribution beyond browser-visible evidence requires GTM container access, GA4 property access, or server-side implementation review.

All findings are constrained to externally observable evidence collected during a single browser session.
