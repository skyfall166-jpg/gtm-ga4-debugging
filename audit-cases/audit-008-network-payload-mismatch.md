# Audit Case 008 — Network Payload Mismatch

**Site:** Ecommerce (Simulated)
**Container:** GTM (Demo)
**Stack:** GTM + GA4
**Date:** 29 May 2026
**Severity:** HIGH
**Failure Surface:** [NETWORK][GA4][TAG]

---

## Problem
GTM Preview shows event firing correctly.
GA4 DebugView shows event received.
GA4 Reports show incorrect or missing values.
Discrepancy between what GTM sends
and what GA4 actually records.

---

## Evidence
- GTM Preview: purchase event fires ✅
- Tag output: revenue = 1499 ✅
- GA4 DebugView: purchase event visible ✅
- GA4 Reports: revenue = 0 or (not set) ❌
- Network tab raw payload:
  value parameter = undefined
  currency parameter = absent

---

## Root Cause
[TAG][NETWORK] GTM variable resolving correctly
in Preview but sending undefined in actual network payload.

Cause A: Type mismatch
GTM reads string "1499", GA4 requires number 1499
String passed → GA4 drops value silently

Cause B: Timing
dataLayer.push() happens AFTER GTM tag reads variable
→ variable empty at read time

Cause C: Missing currency
GA4 requires currency alongside value
Missing currency → value field ignored entirely

---

## Fix
Fix A: Force numeric conversion
function() {
  return parseFloat({{dlv - purchase_value}});
}

Fix B: Ensure dataLayer.push() fires BEFORE trigger

Fix C: Add currency to GA4 event tag
Hard-code: INR
Or read: {{dlv - currency}}

---

## Validation
1. Network tab → inspect raw GA4 hit payload
2. value = number (not string, not undefined) ✅
3. currency = present ✅
4. GA4 DebugView → purchase shows revenue value ✅
5. GA4 Reports → revenue populating ✅

---

## Business Impact
- Revenue reporting shows zero despite real transactions
- ROAS calculations broken
- Conversion value absent from Google Ads if linked

---

## Debugging Mental Model
input → Purchase fires, GTM reads variable as string
process → String passed to GA4 tag value parameter
output → GA4 drops non-numeric value silently

Rule: Always inspect raw network payload —
not just GTM Preview or DebugView.
GTM Preview shows variable resolution.
Network tab shows what GA4 actually receives.
These are not always the same.