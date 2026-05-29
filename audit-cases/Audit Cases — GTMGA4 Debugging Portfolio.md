# Audit Cases — GTM/GA4 Debugging Portfolio

10 real and simulated audit findings.
Each case: Problem → Evidence → Root Cause → Fix → Validation → Business Impact.

| Case | Issue | Severity | Failure Surface |
|------|-------|----------|-----------------|
| 001 | Missing ecommerce fields on add_to_cart | CRITICAL | DATALAYER TAG GA4 |
| 002 | Duplicate purchase event | CRITICAL | GTM TAG GA4 |
| 003 | Non-standard field names breaking GA4 spec | HIGH | DATALAYER GA4 |
| 004 | CleverTap reading PDP keys on listing pages | HIGH | DATALAYER TAG |
| 005 | Legacy UA ID in active container | MEDIUM | GTM TAG |
| 006 | Consent Mode failure — events before consent | CRITICAL | GTM TAG GA4 |
| 007 | Cross-domain attribution loss | HIGH | GTM GA4 NETWORK |
| 008 | Network payload mismatch | HIGH | NETWORK GA4 TAG |
| 009 | DataLayer schema conflict | HIGH | DATALAYER GTM TAG |
| 010 | Meta Pixel / GA4 event mismatch | MEDIUM | TAG NETWORK GA4 |

---

## Severity Key
- CRITICAL — data loss or compliance risk
- HIGH — reporting broken, business decisions affected
- MEDIUM — tech debt, future risk

## Failure Surface Key
- [DATALAYER] — push schema, field names, timing
- [GTM] — trigger, tag config, variable mapping
- [TAG] — tag firing, sequence, dependencies
- [NETWORK] — payload, hit structure, parameter values
- [GA4] — spec compliance, report population