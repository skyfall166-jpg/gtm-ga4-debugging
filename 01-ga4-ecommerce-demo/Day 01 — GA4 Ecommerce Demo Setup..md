# Day 01 — GA4 Ecommerce Demo Setup

**Date:** 28 May 2026
**Focus:** GA4 ecommerce tracking setup and validation
**Container:** GTM (Demo)

---

## Objective
Set up GA4 ecommerce tracking from scratch.
Validate event flow: dataLayer → GTM → GA4 DebugView.

---

## What I Practiced
- GA4 ecommerce event structure
- dataLayer.push() syntax for ecommerce events
- GTM Data Layer Variable setup
- GA4 Event Tag configuration
- items[] array structure and required fields

---

## GA4 Ecommerce Event Structure
```javascript
dataLayer.push({ ecommerce: null }); // clear previous
dataLayer.push({
  event: 'add_to_cart',
  ecommerce: {
    currency: 'INR',
    value: 1499,
    items: [{
      item_id: 'SKU_001',
      item_name: 'Product Name',
      price: 1499,
      quantity: 1
    }]
  }
});
```

---

## Required Fields — GA4 Ecommerce Spec

| Field | Type | Required |
|---|---|---|
| item_id | string | YES |
| item_name | string | YES |
| price | number | YES |
| currency | string | YES |
| quantity | number | recommended |

---

## Key Learnings
- Always push `{ ecommerce: null }` before new ecommerce event
- Prevents stale data contamination from previous push
- GA4 silently drops malformed ecommerce objects
- No error thrown for wrong field names
- Validate in DebugView — check items[] array populated

---

## Validation Checklist
- [ ] dataLayer shows correct push structure
- [ ] GTM Preview — tag fires on correct trigger
- [ ] GA4 DebugView — event appears
- [ ] GA4 DebugView — items[] array populated
- [ ] Network tab — items[] in raw payload

---

## Failure Surface Reference
[DATALAYER] Wrong field names → silent drop
[TAG] Missing ecommerce parameter → empty items[]
[GA4] items[] array empty → (not set) in reports