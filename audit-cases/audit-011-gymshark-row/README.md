# Gymshark ROW Ecommerce Tracking Audit

**Audit ID:** audit-011
**Website:** Gymshark ROW
**Page Type:** Product Detail Page (PDP)
**Audit Method:** External Browser-Based Audit
**Tools Used:** Chrome DevTools (Network, Console)
**Date:** 01-06-2026

---

## Audit Scope

This audit was conducted using publicly accessible browser-side data only.

### Access Constraints

* No GTM container access
* No GA4 property access
* No server-side tagging visibility
* No GTM Preview mode
* No source code access

All findings are based on:

* Network request inspection
* dataLayer inspection
* Browser console analysis
* GA4 payload validation

---

## Business Impact Overview

Audit identified **4 confirmed findings** and **1 investigative finding** affecting Gymshark's ecommerce measurement implementation.

If left unresolved:

* **GA4 cannot reliably attribute add_to_cart activity to products** because add_to_cart events fire without the required items[] array (Bug 1)

* **Product metadata remains trapped in the UA-style ecommerce architecture** and is not consistently reaching GA4 ecommerce reports (Bug 5)

* **Product performance reporting may be incomplete** because rich product information exists but is not mapped into GA4-native ecommerce structures (Bug 1, Bug 5)

* **Payload bloat increases implementation complexity** and introduces unnecessary debugging overhead through dozens of experiment-related parameters attached to ecommerce hits (Bug 2)

* **Revenue validation becomes more difficult** when product pricing differs between the UI and analytics payloads (Bug 3)

Analytics-based decisions on product attribution, ecommerce funnel analysis, SKU performance, variant performance, and revenue reporting may be affected until these findings are investigated and resolved.

---

## Findings Summary

| Bug   | Finding                                  | Severity      | Confidence    |
| ----- | ---------------------------------------- | ------------- | ------------- |
| Bug 1 | add_to_cart missing items[]              | Critical      | Confirmed     |
| Bug 2 | Parameter bloat on ecommerce hits        | Medium        | Confirmed     |
| Bug 3 | Price discrepancy between UI and payload | Investigative | Investigative |
| Bug 4 | Parallel GA4 and Google Ads collection   | Observation   | Confirmed     |
| Bug 5 | UA-GA4 ecommerce schema mismatch         | Critical      | Confirmed     |

---

## Audit Statistics

| Metric                 | Count |
| ---------------------- | ----- |
| Total Findings         | 5     |
| Confirmed Findings     | 4     |
| Investigative Findings | 1     |
| Critical Severity      | 2     |
| Medium Severity        | 1     |
| Observation            | 1     |
| Investigative          | 1     |

---

## Key Findings

### Bug 1 — add_to_cart Missing items[]

**Symptom:** add_to_cart events fire without a populated GA4 items[] array.

**Evidence:** Network payload inspection showed add_to_cart requests missing expected GA4 item parameters such as item_id, item_name, item_category, and item_brand. Product information was available elsewhere in browser-side data structures.

**Impact:** GA4 cannot reliably attribute cart activity to specific products, reducing visibility into product-level ecommerce performance.

---

### Bug 2 — Parameter Bloat on Ecommerce Hits

**Symptom:** Ecommerce payloads contain a large number of experiment and testing-related parameters.

**Evidence:** Network requests contained 20+ additional parameters unrelated to core ecommerce measurement.

**Impact:** Increased implementation complexity, larger payloads, and more difficult debugging and validation workflows.

---

### Bug 3 — Price Discrepancy Between UI and Payload

**Symptom:** Product pricing observed in the analytics payload differs from the price displayed to users.

**Evidence:** Product price shown on the product page did not match the value transmitted within ecommerce measurement payloads.

**Impact:** Revenue validation becomes more difficult and pricing-related reporting requires additional verification.

---

### Bug 4 — Parallel GA4 and Google Ads Collection

**Symptom:** Ecommerce interactions generate both GA4 and Google Ads collection requests.

**Evidence:** Network inspection identified simultaneous requests being sent to GA4 and Google Ads endpoints during ecommerce interactions.

**Impact:** Observation only. Dual collection is common but should be reviewed to ensure measurement consistency and avoid unintended duplication.

---

### Bug 5 — UA-GA4 Ecommerce Schema Mismatch

**Symptom:** Ecommerce implementation continues to rely on UA-style Enhanced Ecommerce structures while collection occurs through GA4.

**Evidence:** Rich product metadata exists within browser-observable ecommerce objects, but equivalent GA4 items[] mappings were not consistently present in network payloads.

**Impact:** Product attribution, SKU analysis, variant reporting, and ecommerce funnel measurement may be incomplete because product data is not consistently reaching GA4-native ecommerce reports.

---

## Repository Structure

```text
audit-011-gymshark-row/
│
├── README.md
├── executive-summary.md
│
├── bug-01-add-to-cart-missing-items.md
├── bug-02-parameter-bloat.md
├── bug-03-price-discrepancy.md
├── bug-04-google-ads-observation.md
├── bug-05-ua-ga4-schema-mismatch.md
│
└── screenshots/
    ├── 01-network-add-to-cart-hit.png
    ├── 02-payload-no-items.png
    ├── 03-payload-test-data-params.png
    ├── 04-datalayer-ee-events.png
    ├── 05-console-product-object.png
    └── 06-dual-collect-hits.png
```

---

## Skills Demonstrated

* GA4 Debugging
* Google Tag Manager Auditing
* Ecommerce Measurement Analysis
* dataLayer Inspection
* Network Payload Analysis
* Root Cause Investigation
* Tracking Architecture Review
* Analytics QA Methodology

---

## Disclaimer

This audit reflects only client-side observations available through browser inspection.

Root cause attribution beyond browser-visible evidence requires GTM container access, GA4 property access, or server-side implementation review.

All findings are constrained to externally observable evidence collected during the audit session.
