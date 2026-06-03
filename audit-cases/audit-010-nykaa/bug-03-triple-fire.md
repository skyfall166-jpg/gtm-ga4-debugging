# Bug 03 — add_to_cart Fires Three Times

## Severity

Critical

## Surface

[GTM] → [GA4]

## Problem

Single Add to Bag click generates three collect requests.

## Evidence

Observed:

Property A → 2 hits

Property B → 1 hit

Screenshot:

network-triple-fire.png

## Root Cause

Multiple measurement paths appear to execute for the same interaction.

## Impact

- Inflated add_to_cart counts
- Audience inflation
- Funnel distortion

## Fix

Ensure one user action generates one measurement event.