# GTM / GA4 Debugging Checklist

Use this checklist on every debugging session.
Work top to bottom. Do not skip layers.

---

## Phase 1 — Before You Start

- [ ] Note the exact problem in one sentence
- [ ] Note which page / event / action triggers it
- [ ] Note which tool is reporting the issue
- [ ] Open browser Console — screenshot any existing errors
- [ ] Open Network tab — clear existing requests

---

## Phase 2 — Console Scan

- [ ] Any JavaScript errors on page load?
- [ ] Any ReferenceErrors or TypeErrors?
- [ ] Any GTM-related errors?
- [ ] Any third-party tag errors?
- [ ] Screenshot all errors before proceeding

---

## Phase 3 — dataLayer Inspection

- [ ] Type `dataLayer` in Console → Enter
- [ ] Is the event push present?
- [ ] Are field names matching GA4 spec?
- [ ] Are data types correct? (number vs string)
- [ ] Does the key exist on this page type?
- [ ] Is push timing correct? (before trigger fires)
- [ ] Is ecommerce: null pushed before ecommerce event?

---

## Phase 4 — GTM Preview

- [ ] Connect GTM Preview to page
- [ ] Perform target action
- [ ] Did correct tag fire? (check Summary panel)
- [ ] Did wrong tags fire? (check for duplicates)
- [ ] Variables panel → are values correct?
- [ ] Variables panel → any undefined values?
- [ ] Data Layer panel → push timing correct?
- [ ] Errors panel → any GTM execution errors?

---

## Phase 5 — Network Tab

- [ ] Filter: collect?v=2 or g/collect
- [ ] Fire target event
- [ ] Hit appears in Network tab?
- [ ] Click hit → Payload tab
- [ ] Event name correct?
- [ ] value parameter = number (not string)?
- [ ] currency parameter present?
- [ ] items[] array populated?
- [ ] Single hit only? (no duplicates)
- [ ] Correct Measurement ID (G-XXXXXXX)?

---

## Phase 6 — GA4 DebugView

- [ ] Event appears in DebugView?
- [ ] Event name correct?
- [ ] Parameters populated?
- [ ] items[] array populated with correct fields?
- [ ] No unexpected events firing?
- [ ] No duplicate events?

---

## Phase 7 — Root Cause

- [ ] Which layer is the failure in?
  - [ ] DATALAYER — push, schema, field names, timing
  - [ ] GTM — trigger, variable, tag config
  - [ ] TAG — firing, sequence, duplicates
  - [ ] NETWORK — payload, types, values
  - [ ] GA4 — spec, reports, filters

- [ ] Document: input → process → output
- [ ] Document: exact failure point

---

## Phase 8 — Fix and Validate

- [ ] Apply fix in GTM (Preview only — do not publish yet)
- [ ] Repeat Phase 3 → 6
- [ ] All checklist items pass?
- [ ] Publish GTM container
- [ ] Re-validate on live site
- [ ] Document finding in audit case format

---

## Severity Reference

| Severity | Definition |
|---|---|
| CRITICAL | Data loss, compliance risk, revenue reporting broken |
| HIGH | Reports broken, business decisions affected |
| MEDIUM | Tech debt, future risk, container hygiene |
| LOW | Minor inconsistency, cosmetic issue |

---

## Failure Surface Reference

| Surface | What to check |
|---|---|
| DATALAYER | Field names, types, push timing, schema consistency |
| GTM | Trigger conditions, variable paths, tag config |
| TAG | Firing sequence, duplicates, consent gates |
| NETWORK | Payload parameters, value types, hit count |
| GA4 | Spec compliance, items[], report population |