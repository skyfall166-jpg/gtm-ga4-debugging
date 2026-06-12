# Day 05 — dataLayer Inspection

**Date:** 28 May 2026
**Focus:** Reading and validating dataLayer structure
**Tool:** Browser Console + GTM Preview Data Layer panel

---

## Objective
Inspect dataLayer pushes in real time.
Validate field names, data types, push timing.
Identify schema violations and missing keys.

---

## What I Practiced
- Reading dataLayer via Console
- Mapping push sequence and timing
- Identifying schema violations
- Comparing actual vs expected structure
- Building GTM variables from dataLayer paths

---

## How to Inspect dataLayer

```javascript
// In browser Console:
dataLayer          // view full array
dataLayer[0]       // view first push
JSON.stringify(dataLayer, null, 2)  // readable format

// Watch live pushes:
// GTM Preview → Data Layer panel
// Shows each push as it happens
```

---

## dataLayer Push — Correct Structure

```javascript
// Always clear first
dataLayer.push({ ecommerce: null });

// Then push event
dataLayer.push({
  event: 'view_item',
  ecommerce: {
    currency: 'INR',
    value: 2999,
    items: [{
      item_id: 'SKU_123',
      item_name: 'Product Name',
      item_category: 'Category',
      price: 2999,
      quantity: 1
    }]
  }
});
```

---

## GTM Variable Paths

| dataLayer key | GTM DLV path |
|---|---|
| ecommerce.currency | ecommerce.currency |
| ecommerce.value | ecommerce.value |
| ecommerce.items | ecommerce.items |
| ecommerce.items[0].item_id | ecommerce.items.0.item_id |

---

## Key Learnings
- dataLayer is an array — each push appends to it
- GTM merges pushes — later values override earlier ones
- Field name case sensitive — itemId ≠ item_id
- Push timing matters — must happen before GTM reads it
- Schema must be consistent across all page types

---

## Failure Surface Reference
[DATALAYER] Field undefined → wrong path in DLV
[DATALAYER] Wrong value → push timing issue
[DATALAYER] Null on some pages → key only exists on certain page types
[DATALAYER] Schema conflict → multiple teams using different key names