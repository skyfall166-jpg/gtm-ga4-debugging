# Audit Case 003 — Non-Standard Field Names Breaking GA4 Ecommerce Spec

**Site:** Nykaa.com
**Container:** GTM-TJ4ZB5M
**Stack:** GTM + GA4 + CleverTap + Legacy UA
**Date:** 19 May 2026
**Severity:** HIGH
**Failure Surface:** [DATALAYER][GA4]

---

## Problem
dataLayer ecommerce object uses custom field names
instead of GA4 required spec.
GA4 silently accepts the event but drops all product data.
No errors thrown — failure is invisible without inspection.

---

## Evidence
- dataLayer inspection (GTM Preview / Console):
  ecommerce object fields: sku, productName, offerPrice
- GA4 Ecommerce Spec requires: item_id, item_name, price
- GA4 DebugView: event fires, items array empty
- GA4 Reports: ecommerce events show count,
  product dimension = (not set)

---

## Root Cause
[DATALAYER] Dev team built dataLayer push using
internal product schema field names, not GA4 spec.

Common when:
- Dev builds dataLayer without GA4 spec reference
- GTM implementation inherited from UA era
- No measurement plan / dataLayer spec document existed

GA4 does not throw errors for wrong field names.
It simply ignores fields it does not recognize.
Failure is completely silent in production.

---

## Fix
Step 1: Create GTM Data Layer Variables
- {{dlv - item_id}} reading sku
- {{dlv - item_name}} reading productName
- {{dlv - price}} reading offerPrice

Step 2: In GA4 Event Tag → ecommerce parameter
Map using remapped variable names, not raw dataLayer keys.

Step 3 (Long term): Align with dev team on
GA4 dataLayer spec document so future pushes
use correct field names at source.

---

## Validation
1. GTM Preview → fire add_to_cart
2. GA4 Event Tag panel → check items[] parameter
3. GA4 DebugView → items array populated with
   item_id, item_name, price values
4. GA4 Reports (next day) → product dimension populating

---

## Business Impact
- All ecommerce reports showing (not set) for product data
- Cannot run product-level conversion analysis
- Cannot build product-specific remarketing audiences
- Revenue attribution by product = impossible
- Silent failure — could go undetected for months

---

## Debugging Mental Model
input → dataLayer.push() with sku/productName/offerPrice
process → GTM reads raw keys, passes to GA4 tag as-is
output → GA4 receives unrecognized fields → drops items array

Rule: Silent acceptance ≠ correct implementation.
Always validate dataLayer field names against GA4 spec before go-live.