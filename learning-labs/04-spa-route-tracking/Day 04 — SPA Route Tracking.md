# Day 04 — SPA Route Tracking

**Date:** 28 May 2026
**Focus:** Single Page Application tracking patterns
**Challenge:** Traditional page view tracking breaks on SPAs

---

## Objective
Understand why GTM page view triggers fail on SPAs.
Learn History Change trigger as solution.
Validate virtual page view tracking.

---

## What I Practiced
- Identifying SPA routing behavior
- History Change trigger configuration
- Virtual page view setup in GTM
- Preventing duplicate events on route change
- dataLayer clearing on route change

---

## Why SPA Tracking Breaks

Traditional sites:
Browser navigates → new page loads → GTM fires → GA4 records page view

SPA sites:
JavaScript updates content → URL changes → GTM does NOT fire
Page view never recorded → GA4 shows single page session

---

## GTM Solution — History Change Trigger