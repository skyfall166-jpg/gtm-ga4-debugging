\# Bug 1 — add\_to\_cart Missing items\[]



\*\*Finding ID:\*\* F1  

\*\*Severity:\*\* Critical  

\*\*Confidence:\*\* Confirmed  

\*\*Surface:\*\* \[GA4] \[NETWORK]  

\*\*Status:\*\* Open



\## Symptom



add\_to\_cart events fire without a populated GA4 items\[] array.



\## Evidence



Network payload inspection showed add\_to\_cart requests missing expected GA4 ecommerce item parameters including:



\- item\_id

\- item\_name

\- item\_category

\- item\_brand



Product information was available elsewhere in browser-observable data structures.



\## Root Cause



GA4 ecommerce item mapping appears incomplete.



Product metadata exists but is not being consistently transferred into GA4-native items\[] parameters.



\## Business Impact



\- Product-level add-to-cart attribution is incomplete

\- Product funnel analysis becomes unreliable

\- Merchandising teams lose visibility into cart activity by SKU

\- Ecommerce reporting lacks product context



\## Fix



Map product data into GA4 items\[] structure before firing add\_to\_cart.



Validate all required GA4 ecommerce fields.



\## Verification



Network payload should contain:



\- items.0.item\_id

\- items.0.item\_name

\- items.0.item\_category



for every add\_to\_cart event.

