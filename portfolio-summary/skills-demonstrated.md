# Skills Demonstrated — Evidence Based

Not claims. Each skill backed by specific audit case evidence.

---

## GTM Container Auditing

**What it means:**
Inspect a live GTM container — map tags, triggers, variables,
identify conflicts, legacy code, misconfiguration.

**Evidence:**
- Nykaa audit: identified legacy UA tag (Case 005)
  firing post-sunset with 200 OK masking failure
- Identified CleverTap tag scoped incorrectly
  across all pages (Case 004)
- Identified Custom HTML tag with ReferenceError
  firing on 100% of page loads (Case 002)
- Identified two GA4 tags firing on same
  conversion trigger (Case 002)

---

## dataLayer Inspection

**What it means:**
Read and validate dataLayer push structure,
field names, data types, push timing via
GTM Preview and browser Console.

**Evidence:**
- Identified non-standard field names
  sku/productName/offerPrice vs GA4 spec
  item_id/item_name/price (Case 001, 003)
- Identified schema conflict across
  multiple dev team codebases (Case 009)
- Identified PDP-specific keys absent
  on listing pages causing null push (Case 004)
- Identified dataLayer push timing failure
  causing variable undefined at tag read time (Case 008)

---

## Network Payload Validation

**What it means:**
Inspect raw GA4 hit in browser Network tab.
Verify parameters, values, data types
in actual payload — not just GTM Preview.

**Evidence:**
- Identified revenue = undefined in network payload
  despite GTM Preview showing correct value (Case 008)
- Identified missing currency parameter
  causing GA4 to drop value field entirely (Case 008)
- Identified absent _gl parameter on
  cross-domain navigation (Case 007)
- Identified dual GA4 hits per purchase
  in network tab (Case 002)
- Verified UA hits still sending to
  google-analytics.com/collect post-sunset (Case 005)

---

## GA4 Ecommerce Spec Compliance

**What it means:**
Validate GA4 ecommerce event structure
against official spec:
items[] array, required fields,
data types, currency pairing.

**Evidence:**
- Mapped 3 non-standard field names
  to correct GA4 spec equivalents (Case 001, 003)
- Identified items[] array arriving empty
  in GA4 DebugView despite GTM tag firing (Case 001)
- Identified string vs number type mismatch
  on revenue parameter (Case 008)
- Validated purchase event deduplication
  using transaction_id (Case 002)

---

## Consent Mode V2

**What it means:**
Implement and validate consent-aware tag firing.
Default deny → update on acceptance.
Verify tags blocked before consent granted.

**Evidence:**
- Identified GA4 firing before consent banner
  interaction (Case 006)
- Identified race condition: GTM loading
  before consent state initialized (Case 006)
- Documented correct implementation:
  default deny → wait_for_update →
  update on acceptance (Case 006)

---

## Cross-Domain Tracking

**What it means:**
Configure GA4 to maintain client_id and
session continuity across domains/subdomains.
Validate _gl parameter passage.

**Evidence:**
- Identified missing _gl parameter on
  checkout subdomain navigation (Case 007)
- Identified new session_start firing
  on domain crossing (Case 007)
- Documented GA4 Connected Domains fix
  and GTM linker configuration (Case 007)

---

## Multi-Platform Conversion Alignment

**What it means:**
Identify and resolve discrepancies between
GA4, Meta Pixel, and other platform
conversion counts caused by trigger mismatch.

**Evidence:**
- Identified 28% purchase count discrepancy
  between Meta (847) and GA4 (612) (Case 010)
- Root caused to different trigger mechanisms
  for same conversion event (Case 010)
- Documented alignment fix: single trigger
  source for all conversion tags (Case 010)

---

## Debugging Methodology

**What it means:**
Structured, reproducible approach to
any analytics failure — not random guessing.

**Evidence:**
- All 10 cases follow identical structure:
  Problem → Evidence → Root Cause →
  Fix → Validation → Business Impact
- Failure surface labeled on every case:
  DATALAYER / GTM / TAG / NETWORK / GA4
- Debugging mental model documented
  on every case: input → process → output