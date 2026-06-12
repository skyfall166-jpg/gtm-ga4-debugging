# Day 06 — Runtime Event Interception

**Date:** 28 May 2026
**Focus:** Intercepting and inspecting browser events at runtime
**Tool:** Browser Console + DevTools Event Listeners

---

## Objective
Intercept DOM events and network requests at runtime.
Understand how GTM listens for user interactions.
Debug event firing without GTM Preview.

---

## What I Practiced
- Intercepting click events via Console
- Monitoring dataLayer pushes in real time
- Using getEventListeners in DevTools
- Overriding dataLayer.push to log calls
- Inspecting event objects

---

## Monitor All dataLayer Pushes Live

```javascript
// Intercept every dataLayer.push call
var originalPush = dataLayer.push;
dataLayer.push = function() {
  console.log('dataLayer.push called:', arguments[0]);
  return originalPush.apply(this, arguments);
};
```

Paste in Console before performing actions.
Every push logged with full payload.

---

## Inspect Click Event on Element

```javascript
// Click any element and log event details
document.addEventListener('click', function(e) {
  console.log('Element clicked:', e.target);
  console.log('Classes:', e.target.className);
  console.log('ID:', e.target.id);
  console.log('Text:', e.target.innerText);
});
```

---

## Check Current dataLayer State

```javascript
// Find all events in dataLayer
dataLayer.filter(d => d.event).map(d => d.event)
// Returns array of all event names pushed
```

---

## Key Learnings
- GTM Click trigger listens to DOM click events
- GTM reads dataLayer after each push completes
- Race condition: push after trigger = variable undefined
- Overriding dataLayer.push is safest debug method
  when GTM Preview is unavailable

---

## When to Use This
- GTM Preview not connecting
- Debugging third-party tag behaviour
- Validating push timing
- Debugging Shopify Custom Pixels
  (GTM Preview blocked in sandbox)

---

## Failure Surface Reference
[DATALAYER] Push logged but GTM not reading →
  timing issue, push after trigger evaluated
[GTM] Trigger not firing → element not matching
  CSS selector in GTM Click trigger