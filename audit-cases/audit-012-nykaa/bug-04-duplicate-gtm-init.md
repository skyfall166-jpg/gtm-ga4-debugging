# Bug 04 — Suspected Duplicate GTM Initialization

## Severity

High

## Surface

[GTM]

## Problem

Two gtm.js initialization events observed.

## Evidence

gtm.start

gtm.start

53ms difference

Screenshot:

console-datalayer-all.png

## Root Cause

Likely duplicate GTM installation.

## Impact

Potential double-firing across tags.

## Fix

Audit GTM deployment and remove duplicate initialization.