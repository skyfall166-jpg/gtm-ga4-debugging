# Duplicate page_view Firing

## Problem

A single product page load triggers two GA4 page_view events with no user interaction.

## Evidence

Network tab shows:

Hit 1

en=page_view
cid=391867328.1780545501
sid=1780545501
rcb=10

Hit 2

en=page_view
cid=391867328.1780545501
sid=1780545501
rcb=11

Same page load.
Same session.
Different execution batch.

## Root Cause

[GTM] [TAG]

Multiple page_view generation paths suspected:

- Multiple GA4 Config tags
- Config tag + send_page_view enabled elsewhere
- Hardcoded gtag.js plus GTM

Container access required for confirmation.

## Fix

- Audit all GA4 Config tags
- Ensure only one page_view source exists
- Remove duplicate implementations
- Validate with GTM Preview

## Business Impact

- Inflated pageview counts
- Distorted landing page reporting
- Lower apparent conversion rates
- Inaccurate funnel entry volumes