# Audit Case 005 — Legacy UA ID in Active GTM Container

**Site:** Nykaa.com
**Container:** GTM-TJ4ZB5M
**Stack:** GTM + GA4 + CleverTap + Legacy UA
**Date:** 19 May 2026
**Severity:** MEDIUM
**Failure Surface:** [GTM][TAG]

---

## Problem
Legacy Universal Analytics tracking ID (UA-31866293-9)
still present and firing in active GTM container.
UA was sunset by Google in July 2023.
All UA hits silently dropped — no data collected.
Tag consuming GTM execution resources on every fire.

---

## Evidence
- GTM Preview: UA tag visible and firing
- Tracking ID: UA-31866293-9 confirmed in tag config
- Network tab: UA hit sent to
  www.google-analytics.com/collect
- Server response: 200 OK returned
  (Google endpoint still accepts but discards)
- GA4 DebugView: no corresponding data from UA tag
- Universal Analytics interface: no longer accessible

---

## Root Cause
[GTM] UA tag never removed during GA4 migration.
Common pattern:
- Team adds GA4 tag alongside existing UA tag
- GA4 goes live, UA sunset ignored operationally
- No container cleanup audit performed post-migration
- UA tag continues firing indefinitely

Google's UA endpoint returns 200 OK even post-sunset.
No console error, no visible failure signal.
Tag appears healthy — failure only visible
through absence of data.

---

## Fix
Step 1: Confirm GA4 fully operational
Step 2: Pause UA tag in GTM (non-destructive)
Step 3: Monitor 2 weeks — confirm no breakage
Step 4: Delete UA tag permanently
Step 5: Remove UA-specific variables and triggers

---

## Validation
1. Pause UA tag
2. GTM Preview → UA tag shows as Paused ✅
3. Network tab → no hits to
   www.google-analytics.com/collect ✅
4. GA4 data unaffected ✅
5. After 2 weeks → delete + cleanup

---

## Business Impact
- Zero data loss (UA data already being discarded)
- Performance: removes unnecessary tag execution
- Container hygiene: reduces debugging noise
- Compliance: eliminates unnecessary data transmission
- Operational: removes confusion during future audits

---

## Debugging Mental Model
input → Page load / event trigger fires
process → UA tag executes, sends hit to UA endpoint
output → Google discards hit silently, returns 200 OK

Rule: 200 OK does not mean data is being collected.
Always verify data receipt, not just request success.
Container audits must check tag utility, not just tag health.