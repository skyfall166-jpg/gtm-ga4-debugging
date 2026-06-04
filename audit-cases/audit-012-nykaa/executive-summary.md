# Nykaa — Add to Cart Implementation Breakdown

## Audit Overview

Website: Nykaa.com

Audit Type: Browser-side GTM / GA4 Audit

Container: GTM-TJ4ZB5M

Properties Observed:

- G-JQ1CQHSX
- G-LKNEBVRZRG

## Key Findings

| ID | Finding | Severity |
|----|----------|----------|
| 01 | Missing ecommerce items[] array | Critical |
| 02 | Product data exists but not mapped | Critical |
| 03 | Triple firing add_to_cart | Critical |
| 04 | Duplicate GTM initialization | High |
| 05 | Non-standard ecommerce schema | Medium |
| 06 | Generic checkout page title | Low |

## Business Impact

- Product attribution unavailable
- Item Performance reports degraded
- add_to_cart inflated
- Funnel reporting unreliable
- Revenue attribution impacted

## Audit Method

- Chrome DevTools
- Network Analysis
- dataLayer Inspection
- Browser-side Observation

No GTM Preview Access

No GA4 Admin Access