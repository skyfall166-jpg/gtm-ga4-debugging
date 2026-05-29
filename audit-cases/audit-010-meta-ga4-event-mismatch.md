# Audit Case 010 — Meta Pixel / GA4 Event Mismatch

**Site:** Ecommerce (Simulated)
**Container:** GTM (Demo)
**Stack:** GTM + GA4 + Meta Pixel
**Date:** 29 May 2026
**Severity:** MEDIUM
**Failure Surface:** [TAG][NETWORK][GA4]

---

## Problem
Meta Pixel purchase firing on different trigger than GA4.
Meta Ads reporting higher conversions than GA4.
Attribution comparison impossible.
Budget decisions made on mismatched data.

---

## Evidence
- Meta Events Manager: purchase count = 847 (30 days)
- GA4 Reports: purchase count = 612 (30 days)
- GTM Preview: Meta fires on page load (order-confirmation)
- GTM Preview: GA4 fires on dataLayer event
  purchase_confirmed (1–2 seconds later)
- Some sessions: Meta fires, dataLayer push fails
  → GA4 purchase never fires
- Delta: 235 purchases (28% discrepancy)

---

## Root Cause
[TAG] Two different trigger mechanisms
for the same conversion event:

Meta Pixel: Page view trigger on /order-confirmation
GA4: Custom event trigger on purchase_confirmed

Failure scenario:
- User lands on /order-confirmation ✅
- Meta fires immediately ✅
- dataLayer push fails (JS error / race condition) ❌
- GA4 purchase never fires ❌

235 purchase gap = page loaded but
dataLayer push did not execute.

---

## Fix
Option A (Preferred): Align both tags to same trigger
Use dataLayer purchase_confirmed for BOTH.
If push fails → both fail together.
Discrepancy eliminated. Failure visible.

Option B: Add error monitoring on dataLayer push
Failure triggers fallback tag + alert

Option C (Shopify): Move both to Custom Pixel
using analytics.subscribe() on checkout_completed
Single source of truth for both platforms.

---

## Validation
1. Align triggers → both tags use same event
2. GTM Preview: Meta + GA4 fire simultaneously ✅
3. Network tab: both hits in same request window ✅
4. 30-day comparison: delta reduces to <5% ✅

---

## Business Impact
- 28% conversion count discrepancy
- Meta Ads optimization on inflated conversion signal
- ROAS overstated in Meta Ads Manager
- Budget shifting to Meta based on false performance

---

## Debugging Mental Model
input → User completes purchase, lands on confirmation
process → Meta fires on page load,
          GA4 waits for dataLayer push that fails
output → GA4 misses purchase, Meta records it

Rule: All conversion tags for same event
must use identical trigger mechanism.
Mismatched triggers = guaranteed discrepancy.