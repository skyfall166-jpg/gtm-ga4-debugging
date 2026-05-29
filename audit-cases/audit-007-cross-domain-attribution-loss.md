# Audit Case 007 — Cross-Domain Attribution Loss

**Site:** Ecommerce (Simulated)
**Container:** GTM (Demo)
**Stack:** GTM + GA4
**Date:** 29 May 2026
**Severity:** HIGH
**Failure Surface:** [GTM][GA4][NETWORK]

---

## Problem
Users crossing from main domain to checkout subdomain
recorded as new sessions in GA4.
Source/medium resets to (direct)/(none) on checkout pages.
Revenue attribution broken — all purchases showing
direct traffic regardless of actual acquisition source.

---

## Evidence
- GA4 Reports: checkout sessions show
  source = (direct), medium = (none)
- GA4 DebugView: new session_start fires
  on checkout subdomain entry
- Network tab: _gl parameter absent in
  cross-domain navigation URLs
- GA4 → Admin → Connected Domains:
  checkout domain not listed

---

## Root Cause
[GA4] Cross-domain measurement not configured.
GA4 uses _gl URL parameter to pass client_id across domains.
Without it:
- Each domain creates new GA4 session
- Original acquisition source lost
- Client ID mismatch = new user recorded

---

## Fix
Option A: GA4 Admin
GA4 → Admin → Data Streams → Web Stream
→ Configure Tag Settings → Connected Domains
Add: checkout.yourdomain.com

Option B: GTM
gtag('config', 'G-XXXXXXX', {
  linker: {
    domains: ['checkout.yourdomain.com']
  }
});

---

## Validation
1. Navigate main site → checkout
2. Network tab: URL contains _gl= parameter ✅
3. GA4 DebugView: NO new session_start on crossing ✅
4. GA4 Reports: checkout shows original source ✅

---

## Business Impact
- 100% of checkout revenue attributed to (direct)
- Paid campaign ROI unmeasurable
- Budget allocation decisions made on false data

---

## Debugging Mental Model
input → User clicks from domain-a to domain-b
process → _gl parameter absent → GA4 reads no client_id
output → New session created, source reset to direct

Rule: Any revenue-generating subdomain MUST be
in GA4 Connected Domains.
Always verify _gl parameter in URL on domain crossing.