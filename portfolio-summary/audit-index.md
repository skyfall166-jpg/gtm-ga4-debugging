# Audit Index — GTM/GA4 Debugging Portfolio

All findings documented with:
Problem → Evidence → Root Cause → Fix → Validation → Business Impact

---

## Nykaa.com — Real Site Audit
**Container:** GTM-TJ4ZB5M
**Stack:** GTM + GA4 + CleverTap + Legacy UA
**Date:** 19 May 2026
**A/B Testing:** 5 flags active on load

| Case | Finding | Severity | Failure Surface |
|---|---|---|---|
| 001 | Missing ecommerce fields on add_to_cart | CRITICAL | DATALAYER TAG GA4 |
| 002 | Duplicate purchase event | CRITICAL | GTM TAG GA4 |
| 003 | Non-standard field names breaking GA4 spec | HIGH | DATALAYER GA4 |
| 004 | CleverTap reading PDP keys on listing pages | HIGH | DATALAYER TAG |
| 005 | Legacy UA ID in active container | MEDIUM | GTM TAG |

**Audit Summary:**
- Critical findings: 2
- High findings: 2
- Medium findings: 1
- JS errors on 100% page loads: 1
- Post-sunset tracking IDs: 1
- Schema violations: 2

---

## Simulated Audit Cases — Real Scenarios
**Source:** Public ecommerce debugging practice
**Date:** 29 May 2026

| Case | Finding | Severity | Failure Surface |
|---|---|---|---|
| 006 | Consent Mode failure — events before consent | CRITICAL | GTM TAG GA4 |
| 007 | Cross-domain attribution loss | HIGH | GTM GA4 NETWORK |
| 008 | Network payload mismatch | HIGH | NETWORK GA4 TAG |
| 009 | DataLayer schema conflict | HIGH | DATALAYER GTM TAG |
| 010 | Meta Pixel / GA4 event mismatch | MEDIUM | TAG NETWORK GA4 |

---

## Severity Distribution

| Severity | Count |
|---|---|
| CRITICAL | 3 |
| HIGH | 5 |
| MEDIUM | 2 |
| **Total** | **10** |

---

## Failure Surface Distribution

| Surface | Count |
|---|---|
| DATALAYER | 5 |
| GTM | 6 |
| TAG | 7 |
| NETWORK | 4 |
| GA4 | 6 |

---

## Failure Surface Key
- DATALAYER — push schema, field names, timing, key conflicts
- GTM — trigger config, tag setup, variable mapping, container hygiene
- TAG — firing sequence, dependencies, duplicate tags, consent gates
- NETWORK — payload structure, parameter values, hit receipt confirmation
- GA4 — spec compliance, ecommerce object, report population

---

## Full Case Files
Location: `/audit-cases/`
Each file: audit-001 through audit-010