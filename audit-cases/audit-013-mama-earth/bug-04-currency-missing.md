# Currency Missing from Ecommerce Payload

## Problem

No currency value found in the view_item payload.

## Evidence

Network payload reviewed.

Not found:

cu=
currency=

Console:

items[0].currency

returns undefined.

## Root Cause

[DATALAYER]

Currency not included in ecommerce implementation.

## Fix

Add:

currency: "INR"

at event level.

## Business Impact

- Reliance on GA4 property default currency
- Increased risk during future international expansion
- Ecommerce data quality degradation