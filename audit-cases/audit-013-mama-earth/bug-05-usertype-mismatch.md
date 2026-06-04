# User Type Classification Mismatch

## Problem

dataLayer and GA4 payload classify the same user differently.

## Evidence

dataLayer:

userType = returning

GA4 payload:

Customer_Type_Analytics = Not_Repeat

Same page load.
Same session.

## Root Cause

[DATALAYER] [GA4]

Likely mismatch between classification sources.

Possible sources:

- Cookie logic
- CRM logic
- Incorrect GTM variable mapping

## Fix

Identify source for Customer_Type_Analytics and align with documented user classification logic.

## Business Impact

- Unreliable user segmentation
- Audience creation inaccuracies
- Inconsistent lifecycle reporting