# Audit Case 004 — CleverTap Reading PDP Keys on Listing Pages

**Site:** Nykaa.com
**Container:** GTM-TJ4ZB5M
**Stack:** GTM + GA4 + CleverTap + Legacy UA
**Date:** 19 May 2026
**Severity:** HIGH
**Failure Surface:** [DATALAYER][TAG]

---

## Problem
CleverTap tag configured to read Product Detail Page (PDP)
dataLayer keys on all pages including listing pages.
Keys do not exist on listing pages → null errors in CleverTap data.
User segmentation and personalization built on corrupted data.

---

## Evidence
- GTM Preview on Category/Listing page:
  CleverTap tag fires on page load
- dataLayer on listing page: PDP-specific keys
  (product_id, product_price, product_category)
  not present → returns undefined
- CleverTap profile data: null/undefined values
  in product fields for listing page sessions
- Console: no hard errors but CleverTap
  receives null payload silently

---

## Root Cause
[GTM] CleverTap tag trigger set to All Pages —
not scoped to PDP only.
Tag reads PDP-specific dataLayer variables
which are only pushed on product detail pages.
On listing pages those variables = undefined.
CleverTap receives and stores null values,
contaminating user profile and event data.

---

## Fix
Option A (Preferred): Scope CleverTap tag trigger
Add trigger condition:
Page Path contains /product/
OR
Custom dataLayer variable pageType equals PDP

Option B: Create separate CleverTap tags per page type
- CleverTap PDP Tag → fires only on PDP
- CleverTap Listing Tag → fires with listing-specific keys
- CleverTap Generic Tag → fires everywhere with common keys only

Option C: Add null guard in tag custom code
Only send product fields if they are defined.

---

## Validation
1. GTM Preview on listing page
2. Confirm CleverTap tag does NOT fire
   OR fires without product-specific keys
3. GTM Preview on PDP
4. Confirm CleverTap tag fires with
   populated product_id, product_price values
5. CleverTap dashboard → null values eliminated

---

## Business Impact
- CleverTap user profiles contain corrupted product data
- Push notifications based on product interest = unreliable
- Personalization engine receiving null signals
- A/B test segmentation potentially compromised
- All downstream CleverTap automation affected

---

## Debugging Mental Model
input → Page load on listing page
process → CleverTap tag fires, reads PDP dataLayer keys
output → keys undefined → null sent to CleverTap

Rule: Trigger scope = data availability scope.
Tags reading page-specific dataLayer keys
must be scoped to only the pages where those keys exist.