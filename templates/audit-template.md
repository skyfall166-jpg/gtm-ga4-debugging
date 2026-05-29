# Audit Case [NUMBER] — [ISSUE TITLE]

**Site:** [Site name / URL]
**Container:** [GTM Container ID]
**Stack:** [GTM + GA4 + other tools]
**Date:** [DD MMM YYYY]
**Severity:** [CRITICAL / HIGH / MEDIUM / LOW]
**Failure Surface:** [DATALAYER][GTM][TAG][NETWORK][GA4]

---

## Problem
[One or two sentences. What is broken?
What is missing, duplicated, or malformed?]

---

## Evidence
- GTM Preview: [what you saw]
- dataLayer inspection: [what you saw]
- Network tab: [what you saw]
- GA4 DebugView: [what you saw]
- Console: [any errors]

---

## Root Cause
[FAILURE SURFACE] [Explanation of why this happened.
What misconfiguration, schema issue, or
implementation error caused this?]

---

## Fix
Option A (Preferred):
[Step by step fix]

Option B:
[Alternative approach if applicable]

---

## Validation
1. [First validation step]
2. [Second validation step]
3. [Confirm in GTM Preview]
4. [Confirm in GA4 DebugView]
5. [Confirm in Network tab]

---

## Business Impact
- [What breaks if this is not fixed]
- [Which reports are affected]
- [Which decisions are made on bad data]
- [Revenue / compliance / attribution impact]

---

## Debugging Mental Model
input → [what triggered the event]
process → [what GTM / tag did with it]
output → [what GA4 received]

Rule: [One sentence principle learned from this case]