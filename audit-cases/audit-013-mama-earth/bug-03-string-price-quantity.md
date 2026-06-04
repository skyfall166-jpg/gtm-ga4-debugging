# Price and Quantity Passed as Strings

## Problem

price and quantity are pushed as strings instead of numeric values.

## Evidence

Console:

price: "339.00"
quantity: "1"

Expected:

price: 339
quantity: 1

## Root Cause

[DATALAYER]

Product values are stringified before being pushed to the dataLayer.

## Fix

Cast values before push.

Example:

price: Number(price)
quantity: Number(quantity)

## Business Impact

- Data quality risk
- Potential downstream reporting inconsistencies
- BigQuery and BI tooling may require additional type handling