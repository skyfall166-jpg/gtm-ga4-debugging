# Bug 01 — add_to_cart Missing ecommerce.items[]

## Severity

Critical

## Surface

[DATALAYER] → [TAG] → [GA4]

## Problem

The add_to_cart event reaches GA4 but does not contain a valid ecommerce.items[] array.

## Evidence

Observed:

en=add_to_cart

ep.item_id=397719

ep.item_name=Oral-B Cross Action Battery Powered Toothbrush

No ecommerce.items[] structure present.

Screenshot:

network-add-to-cart-01.png

## Root Cause

Product information is sent as flat parameters rather than GA4 ecommerce schema.

## Impact

- Item Performance report unavailable
- Product attribution broken
- Revenue reporting degraded

## Fix

Populate ecommerce.items[] before GA4 dispatch.