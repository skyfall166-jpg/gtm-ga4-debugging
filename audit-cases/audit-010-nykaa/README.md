# Audit 011 — Nykaa Add-to-Cart Implementation Breakdown

## Summary

This audit investigates Nykaa's GA4 add_to_cart implementation using browser-side evidence.

## Findings

1. Missing ecommerce.items[] array
2. Product data exists but is not mapped
3. Triple-firing add_to_cart
4. Suspected duplicate GTM initialization
5. Non-standard ecommerce parameters
6. Generic checkout title

## Audit Assets

- Executive Summary
- 6 Individual Bug Reports
- Supporting Screenshots

## Skills Demonstrated

- GTM Debugging
- GA4 Ecommerce Validation
- dataLayer Analysis
- Network Request Inspection
- Measurement Architecture Review