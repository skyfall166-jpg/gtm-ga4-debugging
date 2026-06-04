# Nykaa Add-to-Cart Audit

**Audit ID:** audit-012
**Website:** Nykaa
**Page Type:** Product Detail Page (PDP)
**Audit Method:** External Browser-Based Audit
**Tools Used:** Chrome DevTools (Network, Console)
**Date:** 02-06-2026

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

Audit identified **5 confirmed** and **1 suspected** finding affecting Nykaa's add_to_cart implementation.

If left unresolved:

* **Cart activity may be overstated up to 3×** due to duplicate add_to_cart firing, making funnel conversion rates, cart abandonment metrics, and ecommerce engagement reporting unreliable (Bug 3)

* **GA4 product-level cart reporting is incomplete** because add_to_cart events are missing the required ecommerce.items[] structure, preventing accurate product attribution (Bug 1)

* **Product data exists but never reaches GA4 ecommerce reports** because available product information is not mapped into the GA4 schema correctly (Bug 2)

* **Non-standard ecommerce parameters may be ignored by GA4**, reducing visibility into product performance and creating reporting inconsistencies (Bug 5)

* **Potential duplicate GTM execution paths increase measurement risk**, creating conditions for inflated event counts and inconsistent reporting (Bug 4)

* **Generic checkout metadata reduces reporting clarity**, limiting meaningful ecommerce analysis and debugging capabilities (Bug 6)

Analytics-based decisions around product performance, add-to-cart rate, checkout behaviour, and ecommerce funnel optimisation may be affected until these findings are investigated and resolved.

---

## Findings Summary

| Bug   | Finding                                | Severity | Confidence |
| ----- | -------------------------------------- | -------- | ---------- |
| Bug 1 | add_to_cart missing ecommerce.items[]  | High     | Confirmed  |
| Bug 2 | Product data exists but is not mapped  | High     | Confirmed  |
| Bug 3 | Triple-firing add_to_cart events       | High     | Confirmed  |
| Bug 4 | Suspected duplicate GTM initialization | Medium   | Suspected  |
| Bug 5 | Non-standard ecommerce parameters      | Medium   | Confirmed  |
| Bug 6 | Generic checkout title                 | Low      | Confirmed  |

---

## Audit Statistics

| Metric             | Count |
| ------------------ | ----- |
| Total Findings     | 6     |
| Confirmed Findings | 5     |
| Suspected Findings | 1     |
| High Severity      | 3     |
| Medium Severity    | 2     |
| Low Severity       | 1     |

---

## Key Findings

### Bug 1 — Missing ecommerce.items[] Array

**Symptom:** add_to_cart event fires without a populated ecommerce.items[] array.

**Evidence:** Network payload for add_to_cart contained no GA4 item parameters such as item_name, item_id, item_brand, or item_category. Console inspection confirmed ecommerce activity but required product item data was absent from the event payload.

**Impact:** Product-level cart attribution is incomplete. GA4 cannot reliably identify which products are being added to cart.

---

### Bug 2 — Product Data Exists but is Not Mapped

**Symptom:** Product information exists on the page but is not mapped into the GA4 ecommerce structure.

**Evidence:** Product metadata was available within browser-side data structures, but corresponding GA4 ecommerce item fields were not present in the add_to_cart request.

**Impact:** Valuable product information never reaches GA4 ecommerce reports, reducing visibility into product performance.

---

### Bug 3 — Triple-Firing add_to_cart Events

**Symptom:** Three add_to_cart requests were observed for a single user action.

**Evidence:** Network tab captured three separate add_to_cart requests generated from a single click interaction. Requests occurred within the same session and action sequence.

**Impact:** Cart activity may be significantly overstated, inflating ecommerce engagement metrics and distorting funnel analysis.

---

### Bug 4 — Suspected Duplicate GTM Initialization

**Symptom:** Multiple execution paths appear to be contributing to ecommerce event generation.

**Evidence:** Repeated ecommerce activity patterns observed during event firing suggest multiple tag execution sources may exist. GTM container access was unavailable, preventing direct confirmation.

**Impact:** Increased risk of duplicate event generation, measurement inflation, and inconsistent reporting.

---

### Bug 5 — Non-Standard Ecommerce Parameters

**Symptom:** Ecommerce payload contains parameters that do not align with GA4 recommended ecommerce schema.

**Evidence:** Network inspection identified custom ecommerce parameters in place of expected GA4 ecommerce item fields.

**Impact:** Non-standard fields may be ignored by GA4, causing reporting gaps and loss of product-level insights.

---

### Bug 6 — Generic Checkout Title

**Symptom:** Generic values were passed where product-specific metadata was expected.

**Evidence:** Checkout-related payloads contained non-descriptive values that provided limited business context for reporting.

**Impact:** Ecommerce reporting becomes harder to interpret, reducing analytical value and debugging efficiency.

---

## Repository Structure

```text
audit-010-nykaa-add-to-cart/
│
├── screenshots/
│
├── bug-01-add-to-cart-missing-items.md
├── bug-02-product-data-not-mapped.md
├── bug-03-triple-fire.md
├── bug-04-duplicate-gtm-init.md
├── bug-05-ga4-schema-mismatch.md
├── bug-06-generic-checkout-title.md
│
├── executive-summary.md
└── README.md
```

---

## Skills Demonstrated

* GTM Debugging
* GA4 Ecommerce Validation
* dataLayer Analysis
* Network Request Inspection
* Ecommerce Tracking Audits
* Measurement Architecture Review
* Root Cause Investigation

---

## Disclaimer

This audit reflects only client-side observations available through browser inspection.

Root cause attribution beyond browser-visible evidence requires GTM container access, GA4 property access, or server-side implementation review.

All findings are constrained to externally observable evidence collected during the audit session.
