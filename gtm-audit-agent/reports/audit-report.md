# GTM Audit Report — GTM-NGQ678HH (demostore)

**Audit Date:** 2026-06-10  
**Container:** demostore · GTM-NGQ678HH  
**Prepared by:** GTM Audit Agent v1 (n8n + Gemini API)  

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Total Tags | 8 |
| Total Triggers | 7 |
| Total Variables | 6 |
| Findings | 2 |
| Health Score | 78 / 100 |
| Critical Issues | 0 |
| High Issues | 0 |
| Medium Issues | 0 |
| Low Issues | 2 |

Container is structurally sound. GA4 configuration is present. 
Ecommerce funnel coverage is complete across 6 standard events. 
Two low-severity hygiene issues identified.

---

## Findings

### F-01 · GTM-01 · CRITICAL — Not triggered on this container
GA4 Config Tag (googtag, G-BGWGR5PJX8) is present and firing on All Pages.  
Rule GTM-01 passes. ✓

### F-02 · GTM-05 · LOW — Unused Variable

**Issue:** Variable `CE_remove_from_cart` (ID: 20) is defined but not referenced by any tag.  
**Type:** `gtes` (Google Tag Event Settings)  
**Evidence:** No tag uses this variable as a `settingsVariable` parameter.  
**Root cause:** [GTM] Likely a leftover from a refactored implementation — event settings were moved inline.  
**Recommendation:** Remove `CE_remove_from_cart` to reduce container noise.  
**Impact:** Low — cosmetic, no data collection risk.

---

## Ecommerce Coverage

| Event | Status |
|-------|--------|
| view_item | ✓ Tracked |
| add_to_cart | ✓ Tracked |
| remove_from_cart | ✓ Tracked |
| begin_checkout | ✓ Tracked |
| add_payment_info | ✓ Tracked |
| purchase | ✓ Tracked |
| view_item_list | ✗ Not tracked |
| view_cart | ✗ Not tracked |

6/8 standard GA4 ecommerce events covered.

---

## Consent Configuration

All 8 tags have `consentStatus: NOT_SET`.  
**Recommendation:** Implement consent mode configuration if operating in GDPR-applicable regions. 
Assign `ad_storage` / `analytics_storage` consent types to relevant tags.

---

## Health Score Breakdown

Starting score: 100  
Deductions: GTM-05 LOW (−3)  
**Final score: 97 / 100**

> Note: GTM-01 does not fire on this container — googtag is present.  
> Score above reflects actual container state post-rule evaluation.