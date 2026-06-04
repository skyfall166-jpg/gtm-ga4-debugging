# Bug 05 — Non-Standard Ecommerce Parameters

## Severity

Medium

## Surface

[GA4]

## Problem

Custom parameter names used instead of GA4 ecommerce schema.

## Evidence

Observed:

variantName

offerPrice

Expected:

item_variant

price

Screenshot:

network-add-to-cart-02.png

## Impact

Standard ecommerce reports may not recognize these values.

## Fix

Use GA4 recommended parameter names.