# Executive Summary — audit-011 Gymshark ROW

## Overview

This audit evaluated the ecommerce tracking implementation on Gymshark ROW using browser-based inspection of the dataLayer, network requests, and GA4 collection payloads.

The review identified multiple measurement issues affecting ecommerce data quality, product attribution, and reporting completeness.

The most significant finding is a mismatch between the site's Universal Analytics (UA) Enhanced Ecommerce dataLayer schema and the GA4 ecommerce event model. While rich product data exists in the dataLayer, it is not consistently reaching GA4 ecommerce reports.

---

## Audit Scope

The following areas were reviewed:

* Product Detail Page (PDP)
* Add-to-Cart interaction
* dataLayer implementation
* GA4 network requests
* Google Ads collection requests

---

## Audit Constraints

* External browser-based audit only
* No GTM container access
* No GA4 property access
* No source code access
* Findings based solely on observable browser behavior

---

## Key Findings

### Critical Findings

#### Bug 1 — add_to_cart Missing items[] `[GA4]`

GA4 add_to_cart events fire successfully but do not contain the required items[] array.

Impact:

* Product attribution unavailable
* Product-level cart analysis impossible
* Ecommerce reporting incomplete

#### Bug 5 — UA Enhanced Ecommerce Schema Not Migrated `[DATALAYER]`

The dataLayer continues to emit:

* ee-productView
* ee-addToCart
* ee-productClick
* ee-productImpression

GA4-standard ecommerce events were not observed.

Impact:

* Product data exists but is not available through GA4-standard ecommerce reporting
* SKU, variant, category, and inventory data are not reaching GA4
* Product-detail measurement is incomplete

---

### Medium Findings

#### Bug 2 — Experiment Parameter Bloat `[TAG]`

More than 20 experiment-related parameters are attached to nearly every GA4 event.

Impact:

* Consumes GA4 custom parameter capacity
* Increases payload size
* Adds reporting complexity
* Creates maintenance overhead

#### Bug 3 — Price Discrepancy `[GA4]`

Observed event value differs from the displayed product price.

Status:

* Requires internal validation
* Cannot be confirmed externally

Potential Impact:

* Revenue attribution inaccuracies
* Product performance reporting discrepancies

---

### Observation

#### Bug 4 — Parallel GA4 and Google Ads Collection `[TAG]`

GA4 and Google Ads requests fire together for ecommerce interactions.

Assessment:

* Expected implementation pattern
* No defect observed

Watch Point:

Future ecommerce fixes should be validated across both platforms.

---

## Root Cause Summary

The primary implementation issue appears to be an incomplete Universal Analytics (UA) to GA4 migration.

Current architecture:

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

This root cause likely contributes directly to multiple downstream measurement issues identified during the audit, including missing product attribution and incomplete ecommerce reporting.

---

## Business Impact

| Area                    | Current State           |
| ----------------------- | ----------------------- |
| Product Detail Views    | Not reliably measurable |
| Product Attribution     | Incomplete              |
| Add-to-Cart Analysis    | Product data missing    |
| Revenue by SKU          | Limited visibility      |
| Variant Performance     | Not measurable          |
| Inventory Analytics     | Not available           |
| Product Funnel Analysis | Incomplete              |

---

## Recommended Action Plan

### Priority 1 — Critical

* Migrate ecommerce dataLayer schema to GA4 standards
* Ensure items[] is populated for ecommerce events
* Validate view_item, add_to_cart, select_item, and view_item_list tracking

### Priority 2 — Medium

* Consolidate experiment parameters into a controlled structure
* Establish parameter governance and cleanup procedures

### Priority 3 — Validation

* Verify product pricing logic and revenue field mapping
* Confirm Google Ads receives corrected ecommerce data after remediation

---

## Final Assessment

The site demonstrates a partially completed GA4 implementation with significant ecommerce measurement gaps.

The most critical issue is the continued reliance on UA Enhanced Ecommerce event structures, which prevents available product data from flowing cleanly into GA4 reporting.

Addressing the dataLayer-to-GA4 migration issue is expected to resolve or materially improve multiple downstream tracking problems identified during this audit.
