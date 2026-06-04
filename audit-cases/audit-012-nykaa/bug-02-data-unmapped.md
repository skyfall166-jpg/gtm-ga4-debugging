# Bug 02 — Product Data Exists But Is Not Mapped

## Severity

Critical

## Surface

[DATALAYER] → [GTM]

## Problem

Product information exists inside cartItems[] but is not observed reaching GA4 ecommerce schema.

## Evidence

Observed:

addToCartSuccess

cartAdditionSuccess

cartItems[]

Screenshot:

console-cartitems-expanded.png

## Root Cause

No browser-side evidence shows transformation from cartItems[] to ecommerce.items[].

## Impact

GA4 receives incomplete ecommerce information.

## Fix

Map cartItems[] into ecommerce.items[] before tag execution.