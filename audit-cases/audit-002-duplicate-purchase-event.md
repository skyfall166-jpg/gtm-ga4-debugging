# Audit Case 002 — Duplicate Purchase Event

**Site:** Ecommerce (Simulated)
**Container:** GTM (Demo)
**Stack:** GTM + GA4
**Date:** 29 May 2026
**Severity:** CRITICAL
**Failure Surface:** [GTM][TAG][GA4]

---

## Problem
GA4 recording 2x purchase events per transaction.
Revenue doubled in reports.
Conversion count inflated.
Google Ads optimization receiving false signals.

---

## Evidence
- GA4 DebugView: purchase event fires twice
  within same session, same transaction_id
- GTM Preview: two separate tags firing
  on same trigger
- Network tab: two GA4 hits to /g/collect
  with identical transaction_id
- GA4 Reports: revenue = 2x actual Shopify revenue
- transaction_id duplication visible in
  GA4 → Explore → raw events

---

## Root Cause
[GTM] Two GA4 purchase tags active in container:

Tag A: GA4 Event Tag (new implementation)
Tag B: GA4 Configuration Tag with
purchase event in config (legacy)

Both tags fire on same purchase trigger.
GA4 receives two hits with same transaction_id
but does NOT deduplicate automatically
unless transaction_id deduplication is enabled.

Secondary cause: SPA route not clearing
previous trigger state — tag fires on
initial purchase AND on subsequent
route navigation.

---

## Fix
Step 1: Audit GTM container for all GA4 tags
List every tag that could fire purchase event

Step 2: Identify duplicate — pause legacy tag

Step 3: Verify transaction_id present on all
purchase events (enables GA4 deduplication)

Step 4: Enable GA4 purchase deduplication:
GA4 will deduplicate if same transaction_id
received within 24 hours from same client_id

Step 5: If SPA issue — add History Change trigger
condition to prevent double-fire on route change

---

## Validation
1. Complete test purchase
2. GTM Preview → only ONE purchase tag fires ✅
3. Network tab → single GA4 hit for purchase ✅
4. GA4 DebugView → purchase appears once ✅
5. transaction_id present in event params ✅
6. GA4 Reports (next day) → revenue matches
   actual transaction value ✅

---

## Business Impact
- Revenue reports showing 2x actual revenue
- Google Ads ROAS calculation overstated
- Conversion bidding optimizing on false volume
- Finance/analytics trust in GA4 destroyed
- Audit risk if revenue discrepancy noticed externally

---

## Debugging Mental Model
input → Purchase trigger fires
process → Two tags respond to same trigger
output → Two GA4 hits, same transaction_id

Rule: After any GTM migration or tag addition,
audit ALL tags that could fire on conversion events.
One trigger should fire ONE conversion tag.