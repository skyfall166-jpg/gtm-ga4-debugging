Findings
Bug 1 — add_to_cart Missing items[]
Classification

[GA4] — Critical

Finding

GA4 add_to_cart events fire successfully but do not contain the required items[] array.

Impact
Product attribution unavailable
Product-level cart analysis impossible
Ecommerce reporting incomplete
Evidence

Screenshots:

01-network-add-to-cart-hit.png
02-payload-no-items.png
Root Cause

Likely downstream effect of Bug 5.
