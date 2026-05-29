# Audit Case 009 — DataLayer Schema Conflict

**Site:** Ecommerce (Simulated)
**Container:** GTM (Demo)
**Stack:** GTM + GA4 + Multiple Dev Teams
**Date:** 29 May 2026
**Severity:** HIGH
**Failure Surface:** [DATALAYER][GTM][TAG]

---

## Problem
Multiple dataLayer.push() calls using
conflicting key names for same data.
GTM reads wrong value depending on
push order and page type.
Intermittent (not set) in GA4 reports —
hard to reproduce, harder to diagnose.

---

## Evidence
- dataLayer inspection: same product data pushed
  under different key names across page types:
  Team A: ecommerce.items[0].item_id
  Team B: ecommerce.products[0].id
  Team C: product.sku
- GTM variables: reading item_id path
  returns undefined on Team B/C pages
- GA4 Reports: product dimension populates
  on some pages, (not set) on others
- No consistent reproduction — depends on
  which team's code runs on that page

---

## Root Cause
[DATALAYER] No single dataLayer specification
shared across dev teams.
Each team built their own push schema
based on internal naming conventions.

Creates:
- Three versions of product ID in same container
- GTM variables hardcoded to one schema only
- Silent failures when wrong schema loads

---

## Fix
Immediate: GTM variable fallback chain
function() {
  return {{dlv - item_id}}
    || {{dlv - product_id}}
    || {{dlv - sku}}
    || undefined;
}

Short term: Audit all dataLayer.push() calls
Map all key name variants across codebase

Long term: Create Measurement Plan /
dataLayer Specification document
Single source of truth for all key names
Shared with all dev teams before implementation

---

## Validation
1. Test on pages from each team's codebase
2. GTM Preview: product ID resolves on all variants ✅
3. GA4 DebugView: item_id populated on all
   ecommerce events ✅
4. GA4 Reports: (not set) eliminated ✅

---

## Business Impact
- Intermittent data gaps — hardest class of bug to fix
- Product reports unreliable across site sections
- Data team loses confidence in GA4
- Root cause invisible without cross-team investigation

---

## Debugging Mental Model
input → Page load from Team B codebase
process → GTM reads item_id path → undefined
         (Team B uses products[0].id)
output → GA4 receives event with no product data

Rule: Intermittent (not set) almost always means
schema inconsistency across page types or teams.
Map ALL dataLayer push variations before
writing GTM variables.