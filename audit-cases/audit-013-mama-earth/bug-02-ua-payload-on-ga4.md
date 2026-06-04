# UA Enhanced Ecommerce Payload Present in GA4

## Problem

view_item request contains UA-style pr1 product encoding inside a GA4 payload.

## Evidence

Network payload:

pr1=nmVitamin C Daily Glow Face Serum...
~pr339.00
~brMamaearth

GA4 hit:

v=2
tid=G-NEB3G7SX9B

dataLayer contains GA4 ecommerce.items array.

## Root Cause

[GTM]

UA Enhanced Ecommerce payload generation remains present somewhere in the tagging stack.

Possible sources:

- Legacy UA tag
- Custom template
- Migration shim
- Third-party vendor script

## Fix

- Audit all ecommerce tags
- Remove UA payload generation
- Ensure GA4 event tags read ecommerce.items
- Validate in GTM Preview

## Business Impact

- Product reporting may be incomplete
- Item-level attribution becomes unreliable
- Ecommerce performance reporting may be partially blind