# Audit Case 006 — Consent Mode Failure: Events Firing Before Consent

**Site:** Ecommerce (Simulated)
**Container:** GTM (Demo)
**Stack:** GTM + GA4 + Consent Mode V2
**Date:** 29 May 2026
**Severity:** CRITICAL
**Failure Surface:** [GTM][TAG][GA4]

---

## Problem
GA4 events firing before user grants consent.
Consent Mode V2 implemented but not blocking tags.
Analytics data collecting on users who declined tracking.
GDPR/compliance violation risk.

---

## Evidence
- GTM Preview: GA4 tag fires on page load
  BEFORE consent banner interaction
- Network tab: GA4 hits sent immediately on load
  with no consent_state parameter
- Consent banner visible but tags not
  waiting for consent signal
- GA4 DebugView: events appearing from
  declined/pending consent sessions

---

## Root Cause
[GTM] Consent Mode V2 configured but tag trigger
not using consent-aware firing rules.

Pattern A: Tag trigger = All Pages (fires immediately)
Consent check never applied.

Pattern B: Consent Mode V2 initialization loading
AFTER GTM fires. Race condition —
GTM executes before consent state readable.

Consent Mode V2 requires:
1. Default consent state set BEFORE GTM loads
2. Tags using built-in consent checks OR
   custom trigger respecting consent state

---

## Fix
Step 1: Set default consent state in head BEFORE GTM snippet:
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  wait_for_update: 500
});

Step 2: GTM → GA4 tag → Advanced Settings
Enable consent check: analytics_storage = Granted

Step 3: Update on user acceptance:
gtag('consent', 'update', {
  analytics_storage: 'granted'
});

---

## Validation
1. Page load → GA4 tag should NOT fire ✅
2. Decline consent → GA4 tag should NOT fire ✅
3. Accept consent → GA4 tag fires immediately ✅
4. Network tab → GA4 hit only appears post-consent ✅

---

## Business Impact
- GDPR violation risk — potential regulatory fine
- Data collected on opted-out users = legally unusable
- Ad remarketing audiences potentially non-compliant
- All downstream attribution built on tainted data

---

## Debugging Mental Model
input → Page load, GTM fires All Pages trigger
process → GA4 tag executes before consent check
output → Hit sent regardless of user consent state

Rule: Consent state must be set BEFORE GTM loads.
"Consent Mode enabled" ≠ "tags are blocked correctly."