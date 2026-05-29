# Audit Case 001 — Missing Ecommerce Fields on add_to_cart

**Site:** Nykaa.com
**Container:** GTM-TJ4ZB5M
**Stack:** GTM + GA4 + CleverTap + Legacy UA
**Date:** 19 May 2026
**Severity:** CRITICAL
**Failure Surface:** [DATALAYER][TAG][GA4]

---

## Problem
add_to_cart event firing in GA4 but ecommerce object incomplete.
Missing: item_id, item_name, price, currency.
GA4 ecommerce reports show event count but zero product data.

---

## Evidence
- GTM Preview: add_to_cart trigger fires on button click ✅
- dataLayer inspection: ecommerce object present but fields are
  sku, productName, offerPrice — non-standard GA4 spec
- GA4 DebugView: event received, ecommerce array empty
- Network tab: GA4 hit payload missing items[] array

---

## Root Cause
[DATALAYER] Dev team pushed custom field names instead of GA4 spec:

| Actual Field | Required GA4 Field |
|---|---|
| sku | item_id |
| productName | item_name |
| offerPrice | price |

GTM variable mapping not remapping to GA4 spec before tag fires.
Result: GA4 receives the event, ignores the malformed ecommerce object.

---

## Fix
Option A (Preferred): Update GTM variable mapping
- Create Data Layer Variables for each field
- Remap: sku → item_id, productName → item_name, offerPrice → price
- Pass remapped variables into GA4 Event Tag ecommerce parameter

Option B: Request dev to update dataLayer push to GA4 spec directly

---

## Validation
1. GTM Preview → trigger add_to_cart
2. dataLayer panel → confirm items[] array has correct field names
3. GA4 DebugView → event appears with item_id, item_name, price
4. Network tab → GA4 hit payload shows populated items[]

---

## Business Impact
- GA4 ecommerce reports show zero product-level data
- Cannot identify top add-to-cart products
- Conversion funnel analysis broken at step 1
- Any remarketing audience built on product data = unreliable

---

## Debugging Mental Model
input → dataLayer.push() with non-standard fields
process → GTM reads fields, passes raw to GA4 tag
output → GA4 receives event, drops malformed ecommerce object

Rule: Always validate dataLayer field names === GA4 spec field names.