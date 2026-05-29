# Day 07 — Trigger Architecture

**Date:** 28 May 2026
**Focus:** GTM trigger logic, sequencing, conditions
**Container:** GTM (Demo)

---

## Objective
Understand GTM trigger types, conditions, and sequencing.
Build triggers that fire precisely —
not too broad, not too narrow.

---

## What I Practiced
- Trigger type selection for different scenarios
- Trigger conditions and filters
- Exception triggers
- Trigger sequencing and dependencies
- Scoping triggers to correct page types

---

## GTM Trigger Types — When to Use

| Trigger Type | Use Case |
|---|---|
| Page View | Standard page loads |
| DOM Ready | Elements need to exist before firing |
| Window Loaded | Everything including async scripts loaded |
| Click — All Elements | Any click anywhere on page |
| Click — Just Links | Link clicks only |
| Element Visibility | Element scrolled into view |
| Custom Event | dataLayer.push({ event: 'name' }) |
| History Change | SPA route changes |
| Timer | Fire after X milliseconds |

---

## Trigger Conditions — Narrowing Scope