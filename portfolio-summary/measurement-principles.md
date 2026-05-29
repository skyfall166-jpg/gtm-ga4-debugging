# Measurement Principles — Mental Models for Analytics QA

Core principles that guide every audit and implementation.
Built from debugging practice, not theory.

---

## Principle 1 — Trust the Network Tab, Not the Preview

GTM Preview shows what GTM thinks it sent.
The Network tab shows what actually left the browser.
These are not always the same.

A tag can show correct values in Preview
and send undefined in the actual payload
due to type mismatch, timing, or serialization.

**Rule:** Final validation always happens in Network tab.
Preview is hypothesis. Network is truth.

---

## Principle 2 — Absence of Error ≠ Presence of Data

GA4 never tells you when it ignores your data.
Wrong field names → silent drop.
Wrong data type → silent drop.
Missing currency → silent drop of value.
Post-sunset UA endpoint → 200 OK, data discarded.

**Rule:** Always verify data receipt, not just request success.
Confirm the data exists in reports, not just that the hit fired.

---

## Principle 3 — The dataLayer is a Contract

The dataLayer is a contract between
the dev team and the analytics implementation.
When either side changes without telling the other,
tracking breaks silently.

Common contract violations:
- Dev renames field without telling analytics team
- Analytics team adds new variable path that doesn't exist
- A/B test loads different page variant with different schema
- Third-party plugin pushes conflicting keys

**Rule:** Measurement plan / dataLayer spec document
must exist and be maintained.
One source of truth. Shared with all teams.

---

## Principle 4 — Scope Tags to Data Availability

A tag can only reliably read data
that exists on the pages it fires on.

Firing a tag on All Pages when it reads
PDP-specific keys means it reads undefined
on every non-PDP page.
Undefined sent to third-party tools = corrupted profiles.

**Rule:** Trigger scope must match data availability scope.
If the data only exists on page type X,
the tag must only fire on page type X.

---

## Principle 5 — One Conversion Event, One Tag

Every additional tag listening to a conversion trigger
is a potential duplicate.
Duplicates are invisible in normal operation
and catastrophic in reports.

Revenue doubling, conversion inflation,
bidding algorithms optimizing on false signals —
all from one extra tag on one trigger.

**Rule:** Audit all tags that fire on conversion events
after any migration, addition, or container change.
One trigger. One conversion tag.

---

## Principle 6 — Consent Must Come Before GTM

Consent Mode V2 is only effective if
the default consent state is set
before GTM loads and executes.

If GTM loads first, tags fire before
consent state is readable.
Race condition = compliance violation.

**Rule:** Consent initialization code lives
in <head> BEFORE the GTM snippet.
Not after. Not alongside. Before.

---

## Principle 7 — Cross-Domain = Broken by Default

GA4 treats every domain as a separate universe
unless explicitly told otherwise.
Cross-domain tracking is opt-in, not automatic.

Every ecommerce site with a separate
checkout domain or subdomain
has broken attribution by default
until Connected Domains is configured.

**Rule:** Any domain that processes revenue
must be in GA4 Connected Domains.
Verify _gl parameter in URL on every domain crossing.

---

## Principle 8 — Platform Discrepancy is a Trigger Problem

When Meta shows 847 purchases and GA4 shows 612,
the answer is almost never "one platform is wrong."
The answer is almost always:
they are measuring two different things
using two different trigger mechanisms.

**Rule:** All conversion tags for the same event
must use identical trigger mechanisms.
If triggers differ, counts will differ.
Align triggers before comparing platforms.

---

## Principle 9 — Intermittent Failures = Schema Inconsistency

If (not set) appears on some pages but not others,
and the event fires on all pages,
the data exists somewhere but not everywhere.

Root cause is almost always:
multiple teams pushing the same data
under different key names on different page types.

**Rule:** Map ALL dataLayer push variations
across all page types and all dev team codebases
before writing GTM variables.
Build fallback chains for critical fields.

---

## Principle 10 — Clean Container = Reliable Debugging

Every unused tag, legacy variable, and
orphaned trigger is noise during debugging.
Noise masks real failures.
A ReferenceError from a legacy tag
firing on every page load
hides the real errors you need to find.

**Rule:** Container hygiene is not cosmetic.
It is operational.
Audit and remove unused tags regularly.
A clean container debugs faster and fails less.

---

## The Core Mental Model

Every analytics failure follows this structure:

input → process → output

input:   What triggered the event?
         (user action, page load, dataLayer push)

process: What did GTM do with it?
         (trigger evaluation, variable resolution, tag execution)

output:  What did GA4 receive?
         (network payload, parameter values, data types)

Failure lives at exactly one point in this chain.
The job is to find which point.
Evidence at each layer eliminates the others.