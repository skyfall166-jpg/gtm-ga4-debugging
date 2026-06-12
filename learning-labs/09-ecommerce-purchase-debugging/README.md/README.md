# Day 09 - Ecommerce Purchase Event Debugging

## Objective
Debug GA4 ecommerce purchase tracking using GTM Preview Mode.

## Key Findings

### Issue 1
Missing Data Layer Variable Reference

Evidence:
- DLV item_name returned undefined.
- GTM validation error displayed.

### Investigation
Verified variables in GTM Preview Mode.

### Resolution
Corrected Data Layer Variable configuration.

### Verification
Purchase event variables:
- item_name
- currency
- value

successfully populated.