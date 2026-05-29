# Measurement Plan — [Project / Client Name]

**Date:** [DD MMM YYYY]
**Site:** [URL]
**Platform:** [Shopify / WordPress / Custom]
**Stack:** [GTM + GA4 + other tools]
**Author:** [Your name]

---

## Business Objectives

1. [What does the business want to measure?]
2. [What decisions will this data support?]
3. [What is the primary conversion action?]

---

## Key Events to Track

| Event Name | Trigger | Priority |
|---|---|---|
| page_view | Page load / route change | HIGH |
| view_item | Product page load | HIGH |
| add_to_cart | Add to cart button click | CRITICAL |
| begin_checkout | Checkout start | CRITICAL |
| purchase | Order confirmation | CRITICAL |
| search | Search submit | MEDIUM |
| login | User login | MEDIUM |
| sign_up | Account creation | MEDIUM |

---

## dataLayer Schema

### add_to_cart
```javascript
dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: 'add_to_cart',
  ecommerce: {
    currency: 'INR',
    value: [price],
    items: [{
      item_id: '[sku]',
      item_name: '[product name]',
      item_category: '[category]',
      price: [price],
      quantity: [qty]
    }]
  }
});
```

### purchase
```javascript
dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: '[order_id]',
    currency: 'INR',
    value: [order_total],
    tax: [tax],
    shipping: [shipping],
    items: [{
      item_id: '[sku]',
      item_name: '[product name]',
      item_category: '[category]',
      price: [price],
      quantity: [qty]
    }]
  }
});
```

---

## GTM Implementation Plan

| Tag | Trigger | Variables Needed |
|---|---|---|
| GA4 Configuration | All Pages | Measurement ID |
| GA4 — view_item | Custom Event: view_item | ecommerce object |
| GA4 — add_to_cart | Custom Event: add_to_cart | ecommerce object |
| GA4 — begin_checkout | Custom Event: begin_checkout | ecommerce object |
| GA4 — purchase | Custom Event: purchase | ecommerce object |

---

## Validation Plan

| Event | GTM Preview | DebugView | Network Tab |
|---|---|---|---|
| page_view | [ ] | [ ] | [ ] |
| view_item | [ ] | [ ] | [ ] |
| add_to_cart | [ ] | [ ] | [ ] |
| begin_checkout | [ ] | [ ] | [ ] |
| purchase | [ ] | [ ] | [ ] |

---

## Known Constraints

- [ ] Consent Mode required? Y / N
- [ ] Cross-domain tracking required? Y / N
- [ ] SPA routing present? Y / N
- [ ] Shopify Custom Pixels needed? Y / N
- [ ] Server-side GTM needed? Y / N

---

## Risks and Dependencies

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Dev team uses non-standard field names | HIGH | CRITICAL | Provide spec doc before implementation |
| dataLayer push timing issues | MEDIUM | HIGH | Test on staging before production |
| Consent Mode race condition | MEDIUM | CRITICAL | Set default deny before GTM loads |
| Duplicate events on SPA routes | MEDIUM | HIGH | History Change trigger + ecommerce null clear |

---

## Sign-off Checklist

- [ ] All events validated in GTM Preview
- [ ] All events validated in GA4 DebugView
- [ ] All network payloads inspected
- [ ] Revenue values matching test transactions
- [ ] No duplicate events confirmed
- [ ] Consent Mode validated (if applicable)
- [ ] Cross-domain validated (if applicable)
- [ ] GTM container published
- [ ] GA4 reports populating correctly