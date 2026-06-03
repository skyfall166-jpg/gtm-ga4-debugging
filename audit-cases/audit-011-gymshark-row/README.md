# audit-011 — Gymshark ROW Ecommerce Tracking Audit

## Overview

This audit evaluates the ecommerce tracking implementation on Gymshark ROW using external browser-based debugging techniques.

The objective was to assess the quality of GA4 ecommerce measurement by inspecting the dataLayer, network requests, and analytics payloads without access to the GTM container, GA4 property, or source code.

The audit identified a critical root-cause issue: Gymshark appears to have completed GA4 collection migration but not the underlying ecommerce data architecture migration from Universal Analytics (UA) Enhanced Ecommerce to GA4.

---

## Audit Information

| Field        | Value                                                         |
| ------------ | ------------------------------------------------------------- |
| Website      | row.gymshark.com                                              |
| Audit Type   | External Browser-Based Audit                                  |
| Audit Date   | 03-Jun-2026                                                   |
| Auditor      | Miss                                                          |
| Tools Used   | Chrome DevTools, Network Tab, Console, GA4 Payload Inspection |
| Access Level | No GTM, GA4, or Source Code Access                            |

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

## Audit Scope

The following user journey and implementation layers were reviewed:

### Pages

* Product Detail Page (PDP)

### Interactions

* Product page load
* Product selection
* Add-to-cart interaction

### Analytics Layers

* dataLayer
* GTM observable behavior
* GA4 network requests
* Google Ads network requests

---

## Findings Summary

| ID    | Class       | Severity      | Finding                                         |
| ----- | ----------- | ------------- | ----------------------------------------------- |
| Bug 1 | [GA4]       | Critical      | add_to_cart fires without items[]               |
| Bug 2 | [TAG]       | Medium        | 20+ experiment parameters attached to every hit |
| Bug 3 | [GA4]       | Investigative | Price mismatch between UI and payload           |
| Bug 4 | [TAG]       | Observation   | Parallel GA4 and Google Ads collection          |
| Bug 5 | [DATALAYER] | Critical      | UA Enhanced Ecommerce schema remains active     |

---

## Key Finding

The most significant issue identified during this audit is a mismatch between the site's ecommerce data architecture and GA4 measurement requirements.

Observed architecture:

```text
UA Enhanced Ecommerce dataLayer
            ↓
      GA4 Collection
            ↓
 Missing Event Mapping
            ↓
 Incomplete Ecommerce Payloads
            ↓
 Lost Product Attribution
```

Rich product data exists within the dataLayer, including:

* Product ID
* Product Name
* Product Category
* SKU
* Size Variants
* Inventory Quantities

However, this data is not consistently reaching GA4 ecommerce reports.

---

## Business Impact

Current implementation limits visibility into:

* Product detail views
* Product attribution
* Add-to-cart analysis
* Revenue by SKU
* Variant performance
* Inventory-level analytics
* Product funnel performance

---

## Audit Constraints

This assessment was conducted under the following limitations:

* External browser-based audit only
* No GTM Preview Mode access
* No GTM container access
* No GA4 property access
* No source code access

All findings are based exclusively on:

* Network request inspection
* dataLayer inspection
* Browser console analysis
* GA4 payload validation

---

## Recommended Reading Order

1. executive-summary.md
2. bug-05-ua-ga4-schema-mismatch.md
3. bug-01-add-to-cart-missing-items.md
4. bug-02-parameter-bloat.md
5. bug-03-price-discrepancy.md
6. bug-04-google-ads-observation.md

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

## Audit Outcome

The audit identified a critical ecommerce measurement architecture issue that likely contributes to multiple downstream reporting gaps.

The primary recommendation is to complete the migration from UA Enhanced Ecommerce event structures to GA4-native ecommerce events and validate that product data is passed through the GA4 items[] schema.
