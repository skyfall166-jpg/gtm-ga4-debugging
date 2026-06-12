# Day 02 — GTM Preview Mode Debugging

**Date:** 28 May 2026
**Focus:** GTM Preview Mode as primary debugging tool
**Container:** GTM (Demo)

---

## Objective
Use GTM Preview Mode to debug tag firing,
trigger conditions, and variable resolution.

---

## What I Practiced
- Connecting GTM Preview to target page
- Reading tag firing summary
- Inspecting variable values in tag output
- Identifying trigger conditions
- Tracing event firing sequence

---

## GTM Preview — Key Panels

### Summary Panel
Shows all tags that fired and did not fire.
Green = fired. Red = blocked or not triggered.

### Variables Panel
Shows all variable values at time of tag fire.
Use this to verify dataLayer variable resolution.

### Data Layer Panel
Shows complete dataLayer state at each event.
Scroll through events to see push sequence.

### Errors Panel
Shows any GTM execution errors.
Check this first on any debugging session.

---

## Debugging Sequence in Preview